use super::*;
use soroban_sdk::{testutils::Address as _, Env, String, Vec};

#[test]
fn test_deploy_defense_and_challenge() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(GlaciaBattleContract, ());
    let client = GlaciaBattleContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.initialize(&admin);

    let defender = Address::generate(&env);
    let mut def_guardians = Vec::new(&env);
    def_guardians.push_back(Guardian {
        id: 1,
        name: String::from_str(&env, "Frost Wyrm"),
        element: Element::Frost,
        hp: 100,
        max_hp: 100,
        attack: 25,
        defense: 10,
        position: 0,
    });

    client.deploy_defense(&defender, &def_guardians);

    let retrieved = client.get_defense(&defender).unwrap();
    assert_eq!(retrieved.guardians.len(), 1);
    assert_eq!(retrieved.wins, 0);

    // Attacker attacks with Flame (Strong vs Frost)
    let attacker = Address::generate(&env);
    let mut att_guardians = Vec::new(&env);
    att_guardians.push_back(Guardian {
        id: 2,
        name: String::from_str(&env, "Flame Drake"),
        element: Element::Flame,
        hp: 120,
        max_hp: 120,
        attack: 30,
        defense: 12,
        position: 5,
    });

    let result = client.challenge(&attacker, &defender, &att_guardians);
    assert_eq!(result.winner, attacker);
    assert!(result.turns_elapsed > 0);

    let updated_def = client.get_defense(&defender).unwrap();
    assert_eq!(updated_def.losses, 1);
}
