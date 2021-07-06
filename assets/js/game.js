var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
// You can also log multiple values at once like this

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
//creates a random number between 40 and 60
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive 
  while(enemyHealth > 0 && playerHealth > 0) {
     //fight prompt
     
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney = Math.max(0, playerMoney - 10);
      console.log("playerMoney", playerMoney);
      break;
    }
  }
    // if player chooses to fight, then fight
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    var damage = randomNumber(playerAttack - 3, playerAttack);
    enemyHealth = Math.max(0, enemyHealth  - damage);
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );
      
    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
      
    playerMoney = playerMoney + 20;
  
    // remove player's health by subtracting the amount set in the enemyAttack variable
    break;
    } else { 
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left ');
    }
    var damage = randomNumber(enemyAttack, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );
  
    // check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      }
    // if player choses to skip;
    else {
    window.alert(playerName + " still has " + playerHealth + ' health left.');
  }
} 
};

//function to start a new game 

var startGame = function() {
  //reset player stats 
  playerAttack = 10; 
  playerMoney = 10;
  playerHealth = 100;
  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1 ));

      var pickedEnemyName = enemyNames[i];

      enemyHealth = randomNumber(40, 60);

      fight(pickedEnemyName);
      
      // enter the shop 
      if (i < enemyNames.length - 1 && playerHealth > 0){
        //ask the player if they'd like to enter the shop 
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        if(storeConfirm) {
        shop();
      }
    }

    else {
      window.alert("you have lost your robot in battle! Game Over!");
      break;
    }
  }
}

  endGame();

};

var endGame = function () {
  if(playerHealth > 0) {
    window.alert("Great job, you've survived the game! You have a score of " + playerMoney + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }

  var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
  // restart the game
  startGame();
} 
else {
  window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
}

var shop = function() {
  console.log("entered the shop");
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  switch (shopOptionPrompt) {
    case "REFILL": // new case
    case "refill":
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
  
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
  
      break;
    case "UPGRADE": // new case
    case "upgrade":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
  
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
  
      break;
    case "LEAVE": // new case
    case "leave":
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }


}

//start game when page loads
startGame();

