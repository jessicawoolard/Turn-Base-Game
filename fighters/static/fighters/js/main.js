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

        var nextScreen = document.getElementById("next-screen").innerHTML;
        var nextScreenTemplate = Handlebars.compile(nextScreen);

        var welcomeScreen = document.getElementById("welcome-screen").innerHTML;
        var welcomeScreenTemplate = Handlebars.compile(welcomeScreen);

        var activeHero;
        var activeVillain;

        var heroHealth = 100;
        var villainHealth = 100;

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
                $('#villain_avatar').css({
                    'background': "url('../../../static/fighters/media/" + activeVillain.image + "')"
                });
            }
            function updateSelectedVillain() {
                activeVillain = villains[Math.floor(Math.random() * villains.length)];
            }

            $('#next-button').on('click', function (e) {
                e.preventDefault();
                setTimeout(function () {
                updateSelectedHero();
                updateSelectedVillain();
                displayNextScreen();
                updateHeroAvatar();
                updateVillainAvatar();
                },2500);
            });
        }

        function randomAttack(min, max) {
            min = Math.floor(min);
            max = Math.ceil(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function displayNextScreen() {

            $('.app').html(nextScreenTemplate());
            $('#disappear').ready(function () {
                setTimeout(function () {
                    $('#saint').show(6000, function () {
                        setTimeout(function () {
                            $('#saint').hide(500);
                        })
                    });
                });
            });


            $('#yourName').append(activeHero.playerName);
            $('#theirName').append(activeVillain.playerName);

            console.log(activeVillain);

            function heroAttack() {
                var heroHit = 0;
                if (Math.random() < 0.8) {
                    // Swift Hit
                    heroHit = randomAttack(15, 20);
                } else {
                    // Strong hit
                    heroHit = randomAttack(25, 40);
                }


                villainHealth -= heroHit;

                $("#compHealthBar").animate({
                    width: villainHealth + "%",
                }, 1000, function () {
                     if (villainHealth <= 0){
                    displayGameOverScreen(activeHero);
                }
                });
            }

            function villainAttack() {

                var villainHit = 0;
                if (Math.random() < 0.8) {
                    villainHit = randomAttack(15, 20);
                } else {
                    villainHit = randomAttack(25, 40);
                }


                heroHealth -= villainHit;

                $("#yourHealthBar").animate({
                    width: heroHealth + "%",
                }, 1000, function () {
                    if (heroHealth <= 0) {
                    displayGameOverScreen(activeVillain);
                }
                });
            }

            $('#attack-button').click(function () {

                heroAttack();

                setTimeout(function () {
                    let soundEffect = new Audio('../../../static/fighters/media/punch.mp3')
                    soundEffect.play();
                    villainAttack();
                },1500);

                let soundEffect = new Audio('../../../static/fighters/media/punch.mp3');
                soundEffect.play();
            });
        }


        function displayGameOverScreen(character) {
            var context = {
                "playerName": character.playerName
            };
            $('.app').html(gameOverScreenTemplate(context));
            $('#wait').ready(function () {
                setTimeout(function(){
                    $('#paint').show(8000); // 10 seconds
                });
            });

        }

        // Run the program for the first time!
        displayWelcomeScreen();

        // Characters
        var fiona = new Hero({
            playerName: "Fiona Gallagher",
            image: 'fiona.png',
            specialPower: 'snatch and grab'
        });
        var frank = new Villain({
            playerName: "Frank Gallagher",
            image: 'frank.png',
            villainPower: 'drunk joke here'
        });
        var michael = new Hero({
            playerName: "Michael Scott",
            image: 'michael.png',
            specialPower: 'lonely punch'
        });
        var prisonMike = new Villain({
            playerName: "Prison Mike",
            image: 'prisonmichael.png',
            villainPower: 'drunk joke here'
        });
        var will = new Hero({
            playerName: "Will Smith",
            image: 'will.png',
            specialPower: 'snatch and grab'
        });
        var carlton = new Villain({
            playerName: "Carlton Banks",
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
            playerName: "Eric Forman",
            image: 'eric.png',
            specialPower: 'snatch and grab'
        });
        var red = new Villain({
            playerName: "Red Forman",
            image: 'red.png',
            villainPower: 'drunk joke here'
        });

        var heroes = Array(fiona, michael, will, zack, eric);
        var villains = Array(frank, prisonMike, carlton, belding, red);

        heroes.forEach(function (hero) {
            $("#hero_menu").append('<option value="' + hero.playerName + '">' + hero.playerName + '</option>');
        });

        villains.forEach(function (villains) {
            $("#villain_menu").append('<option value="' + villains.playerName + '">' + villains.playerName + '</option>');
        });

    });
}(jQuery));