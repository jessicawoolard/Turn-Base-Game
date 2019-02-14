# 6.4 Turn Based Game

Create a Final Fantasy style game

--------------------


## Objectives

### Learning Objectives

After completing this assignment, you should:

 * Understand how and why to use inheritance
 * Know how to make post/get requests to a RESTful API to save data

### Performance Objectives

After completing this assignment, you be able to effectively use

* Classes and inheritance in a JavaScript applicaiton
* Django Rest Framework for a RESTful API

## Details

### Deliverables

* A repo containing your project
* A link to the project deployed and running on the internet

### Requirements

* No JSHint warnings or errors
* PEP8 and PEP20 compliant code

## I'm a Full Stack Developer Mode

You will be building a turn based battle game. If you're familiar with older
video games, think of Pokemon or Final Fantasy. The UI can be very very basic,
just some headings for names and info, a dropdown, and a couple of buttons. If
you have no idea what any of this means, read through
[this](http://en.wikipedia.org/wiki/Gameplay_of_Final_Fantasy#Parties_and_battles)
and/or [watch this](http://youtube.com/watch?v=MNmKNhm-1Js).

 - The gameplay should go back and forth between an enemy and the player, each
  inflicting damage on the other when they launch a successful attack.
 - There should be multiple player types.
 - There should be multiple enemy types.
 - You should be able to select the player type from a dropdown.
 - The enemy type should be randomly generated.
 - The player should manually select the "Fight" action to attack.
 - The enemy should automatically attack when it is its turn.
 - You should use constructors and prototypes for the players and enemies.
 - The player's health should be visible.
 - The enemies health may be visible, at your discretion.
 - The state of the game should be saved using a RESTful API so that if you
   refresh the screen you resume where you left off.
 - Each view in your django project should have a test.

## Mikey I Think He Likes It Mode

 - The player should be able to either "Fight" or "Use Magic", or some similar
  setup. Each player type should have different types of attack and/or magic.
 - Give the player the ability to use items, such as items that regain health or
  increase attack.
 - Make a party of players, rather than just one (a la Final Fantasy). The game
  play would cycle between Player 1 -> Enemy -> Player 2 -> Enemy, etc.
 - Implement "ailments". E.g. being poisoned makes you weaker, being put to sleep
  makes you skip your turn.

## Caffeinated Mode

 - Use your API to make the game multiplayer. You could either have multiple players, 
   or have one person control the enemy and one control the player.


## Additional Resources

- Artwork is not required, but if you'd like to include artwork, [this might
  help](http://opengameart.org). Maybe [this too](http://open.commonly.cc). Get
  your game working before you introduce artwork. If you have a beautiful page
  that doesn't work, it will be considered an incomplete assignment.

## Notes

### SPOILERS

### ALERT!!! ALERT!!!

### SPOILERS

### SPOILERS

### SPOILERS

### ALERT!!! ALERT!!!

### SPOILERS

### SPOILERS

### SPOILERS

### ALERT!!! ALERT!!!

### SPOILERS

### SPOILERS

### SPOILERS

### ALERT!!! ALERT!!!

### SPOILERS

### SPOILERS

### SPOILERS

The use of custom events might make this project *much* simpler. For instance, you could have an "attack:enemy" event that allows you to separate your click handler from your data layer:

```js
// index.js
$('.attack-button').on('click', function(e) {
  if(itsMyTurn){
    $(document).trigger('attack:enemy');
  }
});

// models.js
// Declare a variable that will later store the selected character and enemy
var selectedCharacter;
var selectedEnemy;

// Define a class
class Character {
	constructor(params){
		super();
		this = Object.assign(this, params);
	}
	
	// Give all characters an attack function
	attack(enemy) {
	  enemy.health = enemy.health - this.attack;
	  $(document).trigger('health:changed');
	}
};

// Create some character instances
window.characters = {
  'Bulbasaur': new Character({
    health: 12,
    attack: 1
  }),

  'Charizard': new Character({
    health: 6,
    attack: 2
  })
};

$(document).on('character:selected', function(event, character) {
  selectedCharacter = character;
});

$(document).on('enemy:selected', function(event, enemy) {
  selectedEnemy = enemy;
});

$(document).on('attack:enemy', function(event) {
  selectedCharacter.attack(selectedEnemy);
});
```
