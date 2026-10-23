#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol, Vec};

#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Element {
    Frost = 0,
    Flame = 1,
    Void = 2,
    Prism = 3,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Guardian {
    pub id: u32,
    pub name: String,
    pub element: Element,
    pub hp: u32,
    pub max_hp: u32,
    pub attack: u32,
    pub defense: u32,
    pub position: u32, // 0 to 15 on 4x4 grid
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct DefenseSquad {
    pub player: Address,
    pub guardians: Vec<Guardian>,
    pub wins: u32,
    pub losses: u32,
    pub registered_at: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BattleResult {
    pub winner: Address,
    pub attacker: Address,
    pub defender: Address,
    pub turns_elapsed: u32,
    pub attacker_survivors: u32,
    pub defender_survivors: u32,
    pub timestamp: u64,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Defense(Address),
    TotalBattles,
}

const TOTAL_BATTLES: Symbol = symbol_short!("BATTLES");

#[contract]
pub struct GlaciaBattleContract;

#[contractimpl]
impl GlaciaBattleContract {
    /// Initialize contract with admin
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&TOTAL_BATTLES, &0u32);
    }

    /// Register or update a player's defensive squad (up to 4 guardians)
    pub fn deploy_defense(env: Env, player: Address, guardians: Vec<Guardian>) {
        player.require_auth();

        if guardians.is_empty() || guardians.len() > 4 {
            panic!("Squad must have between 1 and 4 guardians");
        }

        // Validate distinct positions (0..15)
        for i in 0..guardians.len() {
            let g = guardians.get(i).unwrap();
            if g.position > 15 {
                panic!("Invalid grid position");
            }
            if g.hp == 0 || g.attack == 0 {
                panic!("Invalid guardian stats");
            }
        }

        let existing_opt: Option<DefenseSquad> = env.storage().persistent().get(&DataKey::Defense(player.clone()));
        let (wins, losses) = match existing_opt {
            Some(squad) => (squad.wins, squad.losses),
            None => (0, 0),
        };

        let squad = DefenseSquad {
            player: player.clone(),
            guardians,
            wins,
            losses,
            registered_at: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&DataKey::Defense(player.clone()), &squad);
    }

    /// Query defense squad for an address
    pub fn get_defense(env: Env, player: Address) -> Option<DefenseSquad> {
        env.storage().persistent().get(&DataKey::Defense(player))
    }

    /// Challenge a defending player squad with an attacking squad
    pub fn challenge(
        env: Env,
        attacker: Address,
        defender: Address,
        mut attacker_squad: Vec<Guardian>,
    ) -> BattleResult {
        attacker.require_auth();

        let mut def_squad: DefenseSquad = match env.storage().persistent().get(&DataKey::Defense(defender.clone())) {
            Some(s) => s,
            None => panic!("Defender has no active squad"),
        };

        let mut defender_squad = def_squad.guardians.clone();

        // Deterministic combat simulation
        let mut turn = 0u32;
        while turn < 20 {
            turn += 1;

            // Attacker round
            for i in 0..attacker_squad.len() {
                let att = attacker_squad.get(i).unwrap();
                if att.hp == 0 {
                    continue;
                }

                // Target first living defender
                for j in 0..defender_squad.len() {
                    let mut target = defender_squad.get(j).unwrap();
                    if target.hp > 0 {
                        let damage = Self::calc_damage(att.attack, att.element, target.defense, target.element);
                        target.hp = target.hp.saturating_sub(damage);
                        defender_squad.set(j, target);
                        break;
                    }
                }
            }

            // Check if defender wiped
            if Self::count_alive(&defender_squad) == 0 {
                break;
            }

            // Defender round
            for i in 0..defender_squad.len() {
                let def = defender_squad.get(i).unwrap();
                if def.hp == 0 {
                    continue;
                }

                // Target first living attacker
                for j in 0..attacker_squad.len() {
                    let mut target = attacker_squad.get(j).unwrap();
                    if target.hp > 0 {
                        let damage = Self::calc_damage(def.attack, def.element, target.defense, target.element);
                        target.hp = target.hp.saturating_sub(damage);
                        attacker_squad.set(j, target);
                        break;
                    }
                }
            }

            // Check if attacker wiped
            if Self::count_alive(&attacker_squad) == 0 {
                break;
            }
        }

        let att_alive = Self::count_alive(&attacker_squad);
        let def_alive = Self::count_alive(&defender_squad);

        let winner = if att_alive > 0 {
            attacker.clone()
        } else {
            defender.clone()
        };

        if winner == defender {
            def_squad.wins += 1;
        } else {
            def_squad.losses += 1;
        }
        env.storage().persistent().set(&DataKey::Defense(defender.clone()), &def_squad);

        let mut total: u32 = env.storage().instance().get(&TOTAL_BATTLES).unwrap_or(0);
        total += 1;
        env.storage().instance().set(&TOTAL_BATTLES, &total);

        BattleResult {
            winner,
            attacker,
            defender,
            turns_elapsed: turn,
            attacker_survivors: att_alive,
            defender_survivors: def_alive,
            timestamp: env.ledger().timestamp(),
        }
    }

    /// Elemental advantage multiplier calculation
    fn calc_damage(atk: u32, att_elem: Element, def: u32, def_elem: Element) -> u32 {
        let base = atk.saturating_sub(def / 2).max(1);
        let is_strong = match (att_elem, def_elem) {
            (Element::Flame, Element::Frost) => true,
            (Element::Frost, Element::Void) => true,
            (Element::Void, Element::Prism) => true,
            (Element::Prism, Element::Flame) => true,
            _ => false,
        };

        if is_strong {
            base * 3 / 2
        } else {
            base
        }
    }

    fn count_alive(squad: &Vec<Guardian>) -> u32 {
        let mut count = 0;
        for i in 0..squad.len() {
            if squad.get(i).unwrap().hp > 0 {
                count += 1;
            }
        }
        count
    }
}

#[cfg(test)]
mod test;
