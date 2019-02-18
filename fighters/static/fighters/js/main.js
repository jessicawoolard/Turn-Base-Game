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

        // $('.button').on('click', function (e) {
        //     console.log('works')
        // });
        var nextScreen = document.getElementById("next-screen").innerHTML;
        var nextScreenTemplate = Handlebars.compile(nextScreen);

        var welcomeScreen = document.getElementById("welcome-screen").innerHTML;
        var welcomeScreenTemplate = Handlebars.compile(welcomeScreen);

        var activeHero;
        var activeVillain;

        var heroHealth = 100;
        var villianHealth = 100;

        var gameOverScreen = document.getElementById("gameover-screen").innerHTML;
        var gameOverScreenTemplate = Handlebars.compile(gameOverScreen);

        function displayWelcomeScreen() {
            $('.app').html(welcomeScreenTemplate());

            // Register event handler for the next button
            function updateSelectedHero(){
                let selectedHero = $('#hero_menu option:selected').val();
                for (var i = 0; i < heroes.length; i++) {
                    let currentHero = heroes[i];
                    if (currentHero.playerName === selectedHero) {
                        activeHero = currentHero;
                        break
                    }
                }
            }

            function  updateHeroAvatar() {
                $('#hero_avatar').css({
                    'background': "url('../../../static/fighters/media/" + activeHero.image + "')"
                });
            }

            function  updateVillainAvatar() {
                $('#villian_avatar').css({
                    'background': "url('../../../static/fighters/media/" + activeVillain.image + "')"
                });
            }
            function updateSelectedVillain() {
                var randomVillain = villains[Math.floor(Math.random() * villains.length)];
                activeVillain = randomVillain
            }

            $('#next-button').on('click', function (e) {
                e.preventDefault();
                updateSelectedHero();
                updateSelectedVillain();
                displayNextScreen();
                updateHeroAvatar();
                updateVillainAvatar();
            });

        }

        function randomAttack(min, max) {
            min = Math.floor(min);
            max = Math.ceil(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function displayNextScreen() {

            $('.app').html(nextScreenTemplate());

            $('#back-button').on('click', function (e) {
                e.preventDefault();
                displayGameOverScreen();
            });

            function heroAttack() {
                var heroHit = 0;
                if (Math.random() < 0.8) {
                    // Swift Hit
                    heroHit = randomAttack(15, 20);
                } else {
                    // Strong hit
                    heroHit = randomAttack(25, 40);
                }

                villianHealth -= heroHit;
                $("#compHealthBar").animate({
                    width: villianHealth + "%",
                }, 1000);
            }

            function villianAttack() {

                var villianHit = 0;
                if (Math.random() < 0.8) {
                    villianHit = randomAttack(15, 20);
                } else {
                    villianHit = randomAttack(25, 40);
                }

                heroHealth -= villianHit;
                $("#yourHealthBar").animate({
                    width: heroHealth + "%",
                }, 1000);
            }

            $('#attack-button').click(function () {

                heroAttack();

                setTimeout(function () {
                    villianAttack();
                },2500);

                let soundEffect = new Audio('./media/punch.mp3');
                soundEffect.play();
            });
        }

        function ran() {

        }

        function displayGameOverScreen() {
            var context = {};
            $('.app').html(gameOverScreenTemplate());

        }

        // Run the program for the first time!
        displayWelcomeScreen();

        // Characters
        var fiona = new Hero({
            playerName: "Fiona",
            image: 'fiona.png',
            specialPower: 'snatch and grab'
        });
        var frank = new Villain({
            playerName: "Frank",
            image: 'frank.png',
            villainPower: 'drunk joke here'
        });
        var michael = new Hero({
            playerName: "Michael",
            image: 'michael.png',
            specialPower: 'lonely punch'
        });
        var prisonMike = new Villain({
            playerName: "Prison Mike",
            image: 'prisonmichael.png',
            villainPower: 'drunk joke here'
        });
        var will = new Hero({
            playerName: "Will",
            image: 'will.png',
            specialPower: 'snatch and grab'
        });
        var carlton = new Villain({
            playerName: "Carlton",
            image: 'carlton.png',
            villainPower: 'drunk joke here'
        });
        var zack = new Hero({
            playerName: "Zack Morris",
            image: 'zack.png',
            specialPower: 'snatch and grab'
        });
        var belding = new Villain({
            playerName: "Mr. Belding",
            image: 'belding.png',
            villainPower: 'drunk joke here'
        });
        var eric = new Hero({
            playerName: "Eric",
            image: 'eric.png',
            specialPower: 'snatch and grab'
        });
        var red = new Villain({
            playerName: "Red",
            image: 'red.png',
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


    });
}(jQuery));