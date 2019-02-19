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
        // The first three sets of variables are grabbing an element id from the html
        // Each id is in a script tag that has what we want to be a 'page'
        // then, we are making an html template with handlebars' compile method.
        // refer to dan's 7.1 demo to see a better way to organize this with classes
        // because it currently is more like Do Repeat Yourself
        var nextScreen = document.getElementById("next-screen").innerHTML;
        var nextScreenTemplate = Handlebars.compile(nextScreen);

        var welcomeScreen = document.getElementById("welcome-screen").innerHTML;
        var welcomeScreenTemplate = Handlebars.compile(welcomeScreen);

        var gameOverScreen = document.getElementById("gameover-screen").innerHTML;
        var gameOverScreenTemplate = Handlebars.compile(gameOverScreen);

        //this is just the variables that represent the object that is the active hero and the active villain.
        // each of these variables is filled from below (we'll get to that). Just know that at this point, each of these
        // variables is = to one of the heroes, and their array or one of the villains and their array.
        // for example, activeHero could be [playerName:'Michael Scott', image:'whatever his picture is called', specialPower:'flavortexthere']
        var activeHero;
        var activeVillain;

        var gamePrimaryKey;

        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('gameID')) {
            gamePrimaryKey = searchParams.get('gameID');
        }

        //This is just setting their starting health to 100 each.
        var heroHealth = 100;
        var villainHealth = 100;

        function createGame() {
            $.ajax('/api/game/', {
                'method': 'POST',
                'data': {
                    "heroHealth": 100,
                    "villainHealth": 100
                },
                'success': function (data) {
                    console.log("Game Created!");
                    gamePrimaryKey = data["pk"];
                    document.cookie = gamePrimaryKey + "&" + activeHero.playerName + "&" + activeVillain.playerName;
                },
                'error': function (xhr) {
                    console.log(xhr.statusText);
                }
            });
        }

        function updateGame() {
            $.ajax('/api/game/' + gamePrimaryKey, {
                'method': 'PUT',
                'data': {
                    "heroHealth": heroHealth,
                    "villainHealth": villainHealth
                },
                'success': function (data) {
                    console.log("Game Updated!");
                },
                'error': function (xhr) {
                    console.log(xhr.statusText);
                }
            });
        }

        function getGameByID(pk) {
            $.ajax('/api/game/' + pk, {
                'method': 'GET',
                'success': function (data) {
                    console.log("Got Game!");
                    console.log(data);
                },
                'error': function (xhr) {
                    console.log(xhr.statusText);
                }
            });
        }

        // This function is what it means to display the welcome screen, or the home screen
        function displayWelcomeScreen() {
            // here, we use jquery to say that in the app id (from the html), we want to add the html that is in
            // welcomeScreenTemplate. You can see above that the welcomeScreenTemplate is compiled into html thanks to handlebars
            $('.app').html(welcomeScreenTemplate());
            // This function is going to update the active hero based on the selection you pick in the dropdown menu.
            function updateSelectedHero(){
                // This is saying let the selectedHero variable be equal to the selected option
                // link to info about jquery selected (https://api.jquery.com/selected-selector/)
                let selectedHero = $('#hero_menu option:selected').val();
                // this is a for loop that is basically saying that for each hero in the hero array (bottom of page),
                // get out the playerName. if the playerName is equal to the selected hero from above,
                // make that the activeHero
                for (var i = 0; i < heroes.length; i++) {
                    let currentHero = heroes[i];
                    if (currentHero.playerName === selectedHero) {
                        activeHero = currentHero;
                        break
                    }
                }
            }
            // this is just updating the hero_avatar with css, and the css is adding a background, which is the
            // url path + the activeHero image + a couple of quotes and apostrophes to close everything up.
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
            // this just makes the random villain selected as soon as the first page loads by using the
            // built-in Math object to get a random villain from the villain array.
            function updateSelectedVillain() {
                activeVillain = villains[Math.floor(Math.random() * villains.length)];
            }
            //this is connected to the fight button. when you click it, it has a function event that will
            //prevent the default action of the click function, and then it has a setTimeout on it, which lets you
            //set a timer so the things in that function don't happen until the timeout time has elapsed.
            // this time it's 2500 milliseconds, or 2.5 seconds
            $('#next-button').on('click', function (e) {
                e.preventDefault();


                // so it will take 2 1/2 seconds for the displayNextScreen to happen, and for the updated stuff to
                // carry over to that template.
                setTimeout(function () {
                updateSelectedHero();
                updateSelectedVillain();
                createGame();
                displayNextScreen();
                updateHeroAvatar();
                updateVillainAvatar();
                },2500);
            });
        }
        // This is setting up a function that will make randomAttack a random number between two variables
        function randomAttack(min, max) {
            min = Math.floor(min);
            max = Math.ceil(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        // this is basically the same idea as the function displayWelcomeScreen
        function displayNextScreen() {

            $('.app').html(nextScreenTemplate());
            // this is going and finding the disappear id (tied to parent of fight.gif), and saying bring in saint,
            // the id that's tied to the actual gif, after 6 seconds with the show method, and then another timeout
            //that will hide it after half a second.
            $(document).ready(setTimeout(runGif, 5500));

            $('#attack-button').css('visibility', 'hidden');

            function runGif(){
                $('#saint').show(function(){
                    $('#attack-button').css('visibility', 'visible');
                    setTimeout(function () {
                        $('#saint').hide(1000);
                    });
                });
            }

            // this is what gets the player name's to show under the health bars
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
                updateGame();

                $("#compHealthBar").animate({
                    width: villainHealth + "%",
                }, 1000, function () {
                     if (villainHealth <= 0){
                         $('#attack-button').addClass(disabled);
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
                updateGame();

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

                $('#attack-button').css('visibility', 'hidden');

                setTimeout(function () {
                    let soundEffect = new Audio('../../../static/fighters/media/punch.mp3')
                    soundEffect.play();
                    villainAttack();
                    setTimeout(function () {
                        $('#attack-button').css('visibility', 'visible');
                    }, 500);
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

        // Run the program for the first time!f
        if (document.cookie != null) {
            console.log(document.cookie);
            displayWelcomeScreen();
        } else {
            displayWelcomeScreen();
        }


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