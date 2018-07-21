$(document).ready(function () {

    function Character(name, hp, ap, cap) {
        this.name = name;
        this.hp = hp;
        this.ap = ap;
        this.cap = cap;
        this.isDefender = false;
        game.charactersArray.push(this);
        console.log("The characters array is " + game.charactersArray);

        //This function outputs the html to display the image associated with the character.
        
        this.displayHTML = function () {
            return "<img src ='assets/images/" + this.name + ".jpg'>";
        }
    }

    var game = {
        charactersArray: [],

        initialize: function (winsSoFar, lossesSoFar) {
            this.wins = winsSoFar;
            this.losses = lossesSoFar;
            this.defender = "me";
            console.log("Wins so far: " + winsSoFar);
            console.log("Losses so far " + lossesSoFar);
            this.hasDefenderBeenChosen = false;
            // character1 = Character("character1", 50, 5, 10);
            // character2 = Character("character2", 90, 10, 15);
        }

    }
    function fight(defender, enemy) {
        enemy.hp = enemy.hp - defender.ap;
        console.log(enemy.name + " hp " + enemy.hp);
        defender.ap = defender.ap + defender.ap;

    }
    function chooseDefender(character) {

        character.isDefender = true;
        game.hasDefenderBeenChosen = true;
        game.defender = character;

        console.log("The defender is " + game.defender.name);
        console.log("Has the defender been chosen " + game.hasDefenderBeenChosen);

        //Display the defender at the bottom.
        $("#defenderdiv").html(character.displayHTML());
        displayEnemies();

    }


    //this function should display the enemies in the enemy field.  It will be called after the defender is chosen.
    //It will also clear them from the top and remove the text saying to choose a defender.
    function displayEnemies() {
        for (var i = 0; i < 2; i++) {
            if (!game.charactersArray[i].isDefender) {
                $("#enemies").append(game.charactersArray[i].displayHTML());
            }
        }
    }

    //Create objects for each character.
    var character1 = new Character("character1", 40, 5, 5);
    var character2 = new Character("character2", 30, 6, 6);
    console.log(character1);
    // var character2 = new character;
    //Initialize the game with a clear record.
    game.initialize(0, 0);

    $("#1").on("click", function () {
        if (!game.hasDefenderBeenChosen) {
            chooseDefender(character1);
        }
    });

    $("#2").on("click", function () {
        if (!game.hasDefenderBeenChosen) {
            chooseDefender(character2);
        }
    });

    console.log("hello" + game.hasDefenderBeenChosen);


    console.log(character1);
    //     $("#1").on("click", fight(character1, character2));
    // fight(character1, character2);

})