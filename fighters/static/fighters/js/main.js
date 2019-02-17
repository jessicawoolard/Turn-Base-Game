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


        function displayWelcomeScreen() {
            $('.app').html(welcomeScreenTemplate());

            // Register event handler for the next button
            var activeFighter;

            $('#next-button').on('click', function (e) {
                e.preventDefault();
                var selectedHero = $('#hero_menu').val(':selected').text();
                var i;
                for (i = 0; i < heroes.length; i++) {
                    var currentHero = heroes[i];
                    if (currentHero.playerName === selectedHero) {
                        selectedHero = activeFighter;
                        break
                    }
                }
                console.log(selectedHero);

                displayNextScreen();
            });
        }

        function displayNextScreen() {
            var context = {
                'name': 'Dan'
            };

            $('.app').html(nextScreenTemplate(context));

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
                console.log(hitOutcome)
            });
        }

        // Run the program for the first time!
        displayWelcomeScreen();

        // Characters

        var hitOutcome = [];
        (function swiftHit(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            var result = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            hitOutcome.push(result)
        }(15, 20));

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

        var strongHitOutcome = [];
        (function strongHit(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            var result2 = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            strongHitOutcome.push(result2)
        }(25, 40));


        var fiona = new Hero({
            playerName: "Fiona",
            attack1: hitOutcome.toString(),
            attack2: strongHitOutcome.toString(),
            specialPower: 'snatch and grab'
        });
        console.log(fiona);
        var frank = new Villain({
            playerName: "Frank",
            attack1: villainHitOutcome.toString(),
            attack2: villainStrongHitOutcome.toString(),
            villainPower: 'drunk joke here'
        });
        console.log(frank);

        var michael = new Hero({
            playerName: "Michael",
            attack1: hitOutcome.toString(),
            attack2: strongHitOutcome.toString(),
            specialPower: 'lonely punch'
        });
        console.log(michael);

        var prisonMike = new Villain({
            playerName: "Prison Mike",
            attack1: villainHitOutcome.toString(),
            attack2: villainStrongHitOutcome.toString(),
            villainPower: 'drunk joke here'
        });
        console.log(prisonMike);
        var will = new Hero({
            playerName: "Will",
            attack1: hitOutcome.toString(),
            attack2: strongHitOutcome.toString(),
            specialPower: 'snatch and grab'
        });
        console.log(will);
        var carlton = new Villain({
            playerName: "Carlton",
            attack1: villainHitOutcome.toString(),
            attack2: villainStrongHitOutcome.toString(),
            villainPower: 'drunk joke here'
        });
        console.log(carlton);
        var zack = new Hero({
            playerName: "Zack Morris",
            attack1: hitOutcome.toString(),
            attack2: strongHitOutcome.toString(),
            specialPower: 'snatch and grab'
        });
        console.log(zack);
        var belding = new Villain({
            playerName: "Mr. Belding",
            attack1: villainHitOutcome.toString(),
            attack2: villainStrongHitOutcome.toString(),
            villainPower: 'drunk joke here'
        });
        console.log(belding);
        var eric = new Hero({
            playerName: "Eric",
            attack1: hitOutcome.toString(),
            attack2: strongHitOutcome.toString(),
            specialPower: 'snatch and grab'
        });
        console.log(eric);
        var red = new Villain({
            playerName: "Red",
            attack1: villainHitOutcome.toString(),
            attack2: villainStrongHitOutcome.toString(),
            villainPower: 'drunk joke here'
        });
        console.log(red);

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

        });


        $("#rand").on('click', function () {
            console.log(rand)
        });
        var rand = villains[Math.floor(Math.random() * villains.length)];


    });
}(jQuery));