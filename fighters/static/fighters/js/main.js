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
            $('#next-button').on('click', function (e) {
                e.preventDefault();
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
            })
        }

        // Run the program for the first time!
        displayWelcomeScreen();

        // Characters

        var fiona = new Hero({playerName: "Fiona", attack1: 'hit1', attack2: 'hit2', specialPower: 'snatch and grab'});
        console.log(fiona);
        var frank = new Villain({
            playerName: "Frank",
            attack1: 'hit1',
            attack2: 'hit2',
            villainPower: 'drunk joke here'
        });
        console.log(frank);
        var michael = new Hero({playerName: "Michael", attack1: 'hit1', attack2: 'hit2', specialPower: 'lonely punch'});
        console.log(michael);
        var prisonMike = new Villain({
            playerName: "Prison Mike",
            attack1: 'hit1',
            attack2: 'hit2',
            villainPower: 'drunk joke here'
        });
        console.log(prisonMike);
        var will = new Hero({playerName: "Will", attack1: 'hit1', attack2: 'hit2', specialPower: 'snatch and grab'});
        console.log(will);
        var carlton = new Villain({
            playerName: "Carlton",
            attack1: 'hit1',
            attack2: 'hit2',
            villainPower: 'drunk joke here'
        });
        console.log(carlton);
        var zack = new Hero({
            playerName: "Zack Morris",
            attack1: 'hit1',
            attack2: 'hit2',
            specialPower: 'snatch and grab'
        });
        console.log(zack);
        var belding = new Villain({
            playerName: "Mr. Belding",
            attack1: 'hit1',
            attack2: 'hit2',
            villainPower: 'drunk joke here'
        });
        console.log(belding);
        var eric = new Hero({playerName: "Eric", attack1: 'hit1', attack2: 'hit2', specialPower: 'snatch and grab'});
        console.log(eric);
        var red = new Villain({playerName: "Red", attack1: 'hit1', attack2: 'hit2', villainPower: 'drunk joke here'});
        console.log(red);

        var heroes = Array(fiona, michael, will, zack, eric);
        var villians = Array(frank, prisonMike, carlton, belding, red);

        // console.log(carlton);
        heroes.forEach(function (hero) {
            $("#hero_menu").append('<option value="' + hero.playerName + '">' + hero.playerName + '</option>');
        });

        villians.forEach(function (villians) {
            $("#villian_menu").append('<option value="' + villians.playerName + '">' + villians.playerName + '</option>');
        });


        $("#menu_contain").append("<button>" + carlton.playerName + "</button>");

        // $.ajax('game/', {success: displayNextScreen});


        //Attacking
        $('#attack-button').on('click', function () {

        });

        var rand = villians[Math.floor(Math.random()*villians.length)];
        console.log(rand)


    });
}(jQuery));
