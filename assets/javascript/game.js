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


        this.displayHTML = function () {
            
            var openingHTML= '<div class="card d-inline-block" style="width: 18rem;"><img class="card-img-top" src="assets/images/' + this.name + '.jpg" alt="Card image cap"> <div class="card-body"><p class="card-text">HP: ' + this.hp + '</p>'
            var buttonHTML = '<p><button type="button" class="btn-char btn btn-primary" ' + 'value ="' + this.name + '" >Choose</button></p>';
            var closingHTML = '</div></div>';

            if (this.isDefender || this.isEnemy){
                return openingHTML +closingHTML;
            }else if (!game.hasDefenderBeenChosen){
                return openingHTML + buttonHTML + closingHTML;
            }else{
                return openingHTML +buttonHTML + closingHTML;
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

            displayEnemies();
        }

    }
    function fight(defender, enemy) {
        enemy.hp = enemy.hp - defender.ap;
        defender.ap = defender.ap + defender.ap;

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

    //Initialize the game with a clear record.
    game.initialize(0, 0);

    $('#attack').on("click", function(){
        fight(game.defender, game.enemy);
        $("#defenderdiv").html(game.defender.displayHTML());
        $("#currentenemy").html(game.enemy.displayHTML());
        if(game.enemy.hp <=0){
            $("#currentenemy").empty();
            $("#defeated").append(game.enemy.displayHTML());
            game.enemy="undecided";
            $("#instructions").html("Choose your next enemy");
        }
    })

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

            //Choose your enemy
        } else {
            associatedCharacter.isEnemy=true;
            $("#currentenemy").html(associatedCharacter.displayHTML());
            displayEnemies();
            game.enemy=associatedCharacter;
            $("#instructions").html("Opponents left to defeat:");

        }
    })

})