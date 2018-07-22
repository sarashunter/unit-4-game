$(document).ready(function () {

    function Character(name, hp, ap, cap) {
        this.name = name;
        this.hp = hp;
        this.ap = ap;
        this.cap = cap;
        this.isDefender = false;
        game.charactersArray.push(this);
        console.log("The characters array is " + game.charactersArray);

        //This function outputs the html to display the image card associated with the character.

        this.displayHTML = function () {
            return '<div class="card d-inline-block" style="width: 18rem;"><img class="card-img-top" src="assets/images/' + this.name + '.jpg" alt="Card image cap"> <div class="card-body"><p class="card-text">HP: ' + this.hp + '</p><p><button type="button" class="btn-char btn btn-primary" ' + 'value ="' + this.name + '" >Choose</button></div></div>';
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

            displayEnemies();
        }

    }
    function fight(defender, enemy) {
        enemy.hp = enemy.hp - defender.ap;
        console.log(enemy.name + " hp " + enemy.hp);
        defender.ap = defender.ap + defender.ap;

    }
    function chooseDefender(character) {
        console.log("The character passed to chooseDefender is " + character);
        character.isDefender = true;
        game.hasDefenderBeenChosen = true;
        game.defender = character;

        console.log("The defender is " + game.defender.name);
        console.log("Has the defender been chosen " + game.hasDefenderBeenChosen);

        //Display the defender at the bottom.
        $("#defenderdiv").html(character.displayHTML());
        $("#instructions").empty();
        $("#enemies").empty();
        displayEnemies();

    }


    //This function displays the enemies and the defender in the appropriate fields.
    function displayEnemies() {
        for (var i = 0; i < 4; i++) {
            if (!game.charactersArray[i].isDefender) {

                if (game.charactersArray[i].hp !== 0) {
                    $("#enemies").append(game.charactersArray[i].displayHTML());

                } else {
                    $("#defeated").append(game.charactersArray[i].displayHTML());
                }
            }
        }
    }

    //Create objects for each character.
    var character1 = new Character("character1", 40, 5, 5);
    var character2 = new Character("character2", 30, 6, 6);
    var character3 = new Character("character3", 50, 5, 6);
    var character4 = new Character("character4", 70, 6, 6);
    console.log(character1);
    // var character2 = new character;
    //Initialize the game with a clear record.
    game.initialize(0, 0);

    $("#1").on("click", function () {
        if (!game.hasDefenderBeenChosen) {
            chooseDefender(character1);
        }
    });

    $('div').on("click", ".btn-char", function () {
        console.log("Class was clicked");
        var associatedCharacter;

        //This loop gets the character object that has the same name as the value in the button.

        for (var i = 0; i < game.charactersArray.length; i++) {
            if (game.charactersArray[i].name === $(this).attr("value")) {
                associatedCharacter = game.charactersArray[i];
            }
        }
        if (!game.hasDefenderBeenChosen) {
            chooseDefender(associatedCharacter);
        } else {
            //Choose enemy?
            // console.log(this);
            // console.log("this value: " + $(this).attr("value"))
            // chooseDefender($(this).attr("value"));
        }
    })

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