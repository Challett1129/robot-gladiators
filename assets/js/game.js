// You can also log multiple values at once like this


//creates a random number between 40 and 60
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

//function to create player's name  

var getPlayerName = function() {
  var name = ""; 
  while(name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("your robot's name is " + name);
  return name; 
}
var playerInfo = { 
  health: 100,
  attack: 10, 
  money: 10,
  name: getPlayerName(), 
  reset: function() {
    this.health = 100; 
    this.money = 10; 
    this.attack = 10;
  },

  refillHealth: function() {
    if(this.money >=7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -=7;
      } else {
        window.alert("You don't have enough money!")
        shop();
      }
    },
  upgradeAttack: function() {
    if(this.money >=7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.")
      this.attack += 6;
      this.money -=7;
    } else {
      window.alert("You don't have enough money!")
      shop();
    }
  },

};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
var fightOrSkip = function() {
  //ask player if they'd like to fight or skip 
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  promptFight = promptFight.toLowerCase();

  if(promptFight === "" || promptFight === "null") {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  //if player picks "skip"
  if(promptFight === "skip") {
    //confirm
    var confirmSkip = window.confirm("Are you sure you'd like to quit?"); 
    //if true deduct money
    if(confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fiight. Goodbye!");
      playerInfo.money = playerInfo.money - 10; 
      return true;
    }
  }
}

var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};


//function to start a new game 

var startGame = function() {
  //reset player stats 
  playerInfo.reset();
  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1 ));
 
      var pickedEnemyObj = enemyInfo[i];


      pickedEnemyObj.health = randomNumber(40, 60);

      fight(pickedEnemyObj);
      
      // enter the shop 
      if (i < enemyInfo.length - 1 && playerInfo.health > 0){
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
  if(playerInfo.health > 0) {
    window.alert("The game has now ended. Let's see how you did!");

    //check local storage for a high score
    var highScore = localStorage.getItem("highscore");
      if (highScore === null) {
        highScore = 0; 
      }
      if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);
      alert(playerInfo.name + " now has the high score of " + highScore + "!"); 
      }
      else {
        alert(playerInfo.name + " did not beat the high score of " + highScore +  ". Maybe next time!");
      }
  } 
  //ask player if they'd like to play again
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
  debugger;
  console.log("entered the shop");
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1: //refills health
      playerInfo.refillHealth();
      break;
    case 2: //upgrades attack 
      playerInfo.upgradeAttack();
      break;
    case 3: //leaves store 
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

