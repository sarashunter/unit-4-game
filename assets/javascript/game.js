$(document).ready(function () {

    function Character(name, hp, ap, cap) {
        this.name = name;
        this.hp = hp;
        this.ap = ap;
        this.cap = cap;
        this.isDefender = false;
        this.isEnemy = false;
        game.charactersArray.push(this);

        //This function outputs the html to display the image card associated with the character.

        this.reInitialize = function () {
            this.name = name;
            this.hp = hp;
            this.ap = ap;
            this.cap = cap;
            this.isDefender = false;
            this.isEnemy = false;
            game.charactersArray.push(this);
        }

        this.displayHTML = function () {

            var openingHTML = '<div class="card d-inline-block" style="width: 18rem;"><img class="card-img-top" src="assets/images/' + this.name + '.jpg" alt="Card image cap"> <div class="card-body"><p class="card-text">HP: ' + this.hp + '</p>'
            var buttonHTML = '<p><button type="button" class="btn-char btn btn-primary" ' + 'value ="' + this.name + '" >Choose</button></p>';
            var closingHTML = '</div></div>';

            if (this.isDefender || this.isEnemy || this.hp <= 0) {
                return openingHTML + closingHTML;
            } else if (!game.hasDefenderBeenChosen) {
                return openingHTML + buttonHTML + closingHTML;
            } else {
                return openingHTML + buttonHTML + closingHTML;
            }
        }
    }

    var game = {
        charactersArray: [],

        initialize: function (winsSoFar, lossesSoFar) {
            this.wins = winsSoFar;
            this.losses = lossesSoFar;
            this.defender = "undecided";
            this.enemy = "undecided";
            console.log("Wins so far: " + winsSoFar);
            console.log("Losses so far " + lossesSoFar);
            this.hasDefenderBeenChosen = false;
            this.defeatedEnemyCount=0;

            displayEnemies();

            character1.reInitialize();
            character2.reInitialize();
            character3.reInitialize();
            character4.reInitialize();

            $("#currentenemy").empty();
            $("#defenderdiv").empty();
            $("#defeated").empty();
            $("#winsDiv").text(winsSoFar);
            $("#lossesDiv").text(lossesSoFar);
            $("#instructions").text("Choose your defender.");
        }


    }
    function fight(defender, enemy) {
        enemy.hp = enemy.hp - defender.ap;
        defender.ap = defender.ap + defender.ap;
        defender.hp = defender.hp - enemy.cap;
        if (defender.hp <= 0) {
            $("#instructions").html("You've lost. <p><button class='btn-restart'>Restart</button></p>");
            game.losses++;
        }

    }
    function chooseDefender(character) {
        character.isDefender = true;
        game.hasDefenderBeenChosen = true;
        game.defender = character;

        //Display the defender at the bottom.
        $("#defenderdiv").html(character.displayHTML());
        $("#instructions").text("Choose the first opponent to attack:");
        $("#enemies").empty();
        displayEnemies();

    }


    //This function displays the enemies and the defender in the appropriate fields.
    function displayEnemies() {
        $("#enemies").empty();
        for (var i = 0; i < 4; i++) {
            if (!game.charactersArray[i].isDefender && !game.charactersArray[i].isEnemy) {

                if (game.charactersArray[i].hp > 0) {
                    $("#enemies").append(game.charactersArray[i].displayHTML());

                }
            }
        }
    }

    //Create objects for each character.

    //Initialize the game with a clear record.


    $('#attack').on("click", function () {

        if (game.enemy !== "undecided") {
            fight(game.defender, game.enemy);
            $("#defenderdiv").html(game.defender.displayHTML());

            $("#currentenemy").html(game.enemy.displayHTML());

            if (game.enemy.hp <= 0) {
                $("#currentenemy").empty();
                game.defeatedEnemyCount++;
                console.log("defeatedenemy count is "+ game.defeatedEnemyCount);
                $("#defeated").append(game.enemy.displayHTML());
                game.enemy = "undecided";
                if (game.defeatedEnemyCount >= 3) {
                    $("#instructions").html("You've won. <p><button class='btn-restart'>Restart</button></p>");
                    game.wins++;
                } else {
                    $("#instructions").html("Choose your next enemy");
                }
            }
        }
    })

    $('div').on("click", ".btn-char", function () {

        var associatedCharacter;

        //This loop gets the character object that has the same name as the value in the button.

        for (var i = 0; i < game.charactersArray.length; i++) {
            if (game.charactersArray[i].name === $(this).attr("value")) {
                associatedCharacter = game.charactersArray[i];
            }
            if (game.charactersArray[i].isEnemy) {
                game.charactersArray[i].isEnemy = false;
                console.log('here');
                game.enemy = "undecided";
                displayEnemies();
            }
        }
        if (!game.hasDefenderBeenChosen) {
            chooseDefender(associatedCharacter);
            //Choose your enemy
        } else {
            associatedCharacter.isEnemy = true;
            $("#currentenemy").html(associatedCharacter.displayHTML());
            displayEnemies();
            game.enemy = associatedCharacter;
            $("#instructions").html("Opponents left to defeat:");

        }
    })

    $('div').on("click", ".btn-restart", function () {
        game.initialize(game.wins, game.losses);
    })

    

    var character1 = new Character("character1", 40, 5, 5);
    var character2 = new Character("character2", 30, 6, 6);
    var character3 = new Character("character3", 50, 5, 6);
    var character4 = new Character("character4", 5, 6, 6);

    game.initialize(0, 0);
})