(function ($) {
    $(function () {

        // Ajax Setup
        var csrftoken = $("[name=csrfmiddlewaretoken]").val();

        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
        });

        // Navigation

        $('.button').on('click', function (e) {
            console.log('works')
        });
        var nextScreen = document.getElementById("next-screen").innerHTML;
        var nextScreenTemplate = Handlebars.compile(nextScreen);

        var welcomeScreen = document.getElementById("welcome-screen").innerHTML;
        var welcomeScreenTemplate = Handlebars.compile(welcomeScreen);

        var activeFighter;

        var gameOverScreen = document.getElementById("gameover-screen").innerHTML;
        var gameOverScreenTemplate = Handlebars.compile(gameOverScreen);


        function displayWelcomeScreen() {
            $('.app').html(welcomeScreenTemplate());

            // Register event handler for the next button


            $('#next-button').on('click', function (e) {
                e.preventDefault();
                var selectedHero = $('#hero_menu option:selected').val();
                var i;
                for (i = 0; i < heroes.length; i++) {
                    var currentHero = heroes[i];
                    if (currentHero.playerName === selectedHero) {
                        console.log("match!");
                        activeFighter = currentHero;
                        break
                    }
                }
                console.log(activeFighter);

                displayNextScreen();
            });
        }

        function displayNextScreen() {
            var context = {

            };

            $('.app').html(nextScreenTemplate(context));
            // var playername =document.createElement()

            $('#yourName').append(rand.playerName);

            $('#back-button').on('click', function (e) {
                e.preventDefault();
                displayWelcomeScreen();
            });
            $('#attack-button').click(function () {
                var hitOutcome = [];
                (function swiftHit(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    var result = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
                    hitOutcome.push(result)
                }(15, 20));
                var strongHitOutcome = [];
                (function strongHit(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    var result2 = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
                    strongHitOutcome.push(result2)
                }(25, 40));
                var totalHit = '';
                var hit = Math.random();
                if(hit<0.8){
                    totalHit += hitOutcome.toString()
                }else{
                    totalHit += strongHitOutcome.toString()
                }
                console.log(totalHit);
                        var villainHitOutcome = [];
                        (function swiftHit(min, max) {
                            min = Math.ceil(min);
                            max = Math.floor(max);
                            var result3 = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
                            villainHitOutcome.push(result3)
                        }(15, 20));

                        var villainStrongHitOutcome = [];
                        (function strongHit(min, max) {
                            min = Math.ceil(min);
                            max = Math.floor(max);
                            var result4 = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
                            villainStrongHitOutcome.push(result4)
                        }(25, 40));
                        var totalVillainHit = '';
                        var villainHit = Math.random();
                        if (villainHit < 0.8) {
                            totalVillainHit += villainHitOutcome.toString()
                        } else {
                            totalVillainHit += villainStrongHitOutcome.toString()
                        }
                        //i'm not doing something right with the setTimeout function to create the delay
                        //between hits. kind of a bummer. i'm going to leave it alone for now, since it's purely aesthetics.
                        setTimeout(function () {
                            console.log(totalVillainHit);
                        }(2500));
                //
                // var snd = new Audio('punch.mp3');
                // snd.play();
                // snd.currentTime=0;
            });
        }

        function displayGameOverScreen(){
            var context = {};
            $('.app').html(gameOverScreenTemplate());

        }

        // Run the program for the first time!
        displayWelcomeScreen();

        // Characters
        var fiona = new Hero({
            playerName: "Fiona",
            attack1: 'flavor text',
            attack2: 'flavor text',
            specialPower: 'snatch and grab'
        });
        var frank = new Villain({
            playerName: "Frank",
            attack1: 'flavor text',
            attack2: 'flavor text',
            villainPower: 'drunk joke here'
        });
        var michael = new Hero({
            playerName: "Michael",
            attack1: 'flavor text',
            attack2: 'flavor text',
            specialPower: 'lonely punch'
        });
        var prisonMike = new Villain({
            playerName: "Prison Mike",
            attack1: 'flavor text',
            attack2: 'flavor text',
            villainPower: 'drunk joke here'
        });
        var will = new Hero({
            playerName: "Will",
            attack1: 'flavor text',
            attack2: 'flavor text',
            specialPower: 'snatch and grab'
        });
        var carlton = new Villain({
            playerName: "Carlton",
            attack1: 'flavor text',
            attack2: 'flavor text',
            villainPower: 'drunk joke here'
        });
        var zack = new Hero({
            playerName: "Zack Morris",
            attack1:'flavor text',
            attack2: 'flavor text',
            specialPower: 'snatch and grab'
        });
        var belding = new Villain({
            playerName: "Mr. Belding",
            attack1: 'flavor text',
            attack2: 'flavor text',
            villainPower: 'drunk joke here'
        });
        var eric = new Hero({
            playerName: "Eric",
            attack1: 'flavor text',
            attack2: 'flavor text',
            specialPower: 'snatch and grab'
        });
        var red = new Villain({
            playerName: "Red",
            attack1: 'flavor text',
            attack2: 'flavor text',
            villainPower: 'drunk joke here'
        });

        var heroes = Array(fiona, michael, will, zack, eric);
        var villains = Array(frank, prisonMike, carlton, belding, red);

        // console.log(carlton);
        heroes.forEach(function (hero) {
            $("#hero_menu").append('<option value="' + hero.playerName + '">' + hero.playerName + '</option>');
        });

        villains.forEach(function (villains) {
            $("#villain_menu").append('<option value="' + villains.playerName + '">' + villains.playerName + '</option>');
        });


        // $.ajax('game/', {success: displayNextScreen});


        //Attacking

        $('#attack-button').on('click', function () {
            activeFighter.powerfulAttack();
        });

        $('#attack-button2').on('click', function () {
            console.log(activeFighter.attack2);
        });


        $("#rand").on('click', function () {
            console.log(rand)
        });
        var rand = villains[Math.floor(Math.random() * villains.length)];


    });
}(jQuery));