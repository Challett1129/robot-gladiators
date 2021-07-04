var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
// You can also log multiple values at once like this


var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
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
      playerMoney = playerMoney - 10;
      console.log("playerMoney", playerMoney)
      break;
    }
  }
    // if player chooses to fight, then fight
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
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

    playerHealth = playerHealth - enemyAttack;
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

      enemyHealth = 50;

      fight(pickedEnemyName);
    }
    else {
      window.alert("you have lost your robot in battle! Game Over!");
      break;
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
  
//start game when page loads
startGame();

