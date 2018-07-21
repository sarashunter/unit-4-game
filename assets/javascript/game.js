$(document).ready(function () {

    function Character(name, hp, ap, cap) {
        this.name = name;
        this.hp = hp;
        this.ap = ap;
        this.cap = cap;
        this.isDefender = false;

        this.makeDefender = function () {
            this.isDefender = true;
            game.hasDefenderBeenChosen = true;
            console.log("The defender is " + this.name);
            console.log("Has the defender been chosen " + game.hasDefenderBeenChosen);
            game.defender=this.name;
        }
    }

    var game = {

        initialize: function (winsSoFar, lossesSoFar) {
            this.wins = winsSoFar;
            this.losses = lossesSoFar;
            console.log("Wins so far: " + winsSoFar);
            console.log("Losses so far " + lossesSoFar);
            this.hasDefenderBeenChosen = false;
            // dog = Character("dog", 50, 5, 10);
            // cat = Character("cat", 90, 10, 15);
        }

    }
    function fight(defender, enemy) {
        enemy.hp = enemy.hp - defender.ap;
        console.log(enemy.name + " hp " + enemy.hp);
        defender.ap = defender.ap + defender.ap;

    }


    //Create objects for each character.
    var dog = new Character("dog", 40, 5, 5);
    var cat = new Character("cat", 30, 6, 6);
    console.log(dog);
    // var cat = new character;
    //Initialize the game with a clear record.
    game.initialize(0, 0);

    $("#1").on("click", function () {
        if (!game.defenderChosen) {
            dog.makeDefender();
            console.log("The games defender is " + game.defenderChosen);
        }
    });
    console.log("hello" + game.hasDefenderBeenChosen);
    $("#2").on("click", function () { cat.makeDefender() });


console.log(dog);
//     $("#1").on("click", fight(dog, cat));
// fight(dog, cat);

})