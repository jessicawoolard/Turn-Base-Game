
 (function($){
    $(function(){

         var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
     $.ajaxSetup({
       beforeSend: function(xhr, settings) {
           if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
               xhr.setRequestHeader("X-CSRFToken", csrftoken);
           }
       },
     });

       $('.button').on('click', function(e) {
        console.log('works')
           });
        var nextScreen = document.getElementById("next-screen").innerHTML;
        var nextScreenTemplate = Handlebars.compile(nextScreen);

        var welcomeScreen = document.getElementById("welcome-screen").innerHTML;
        var welcomeScreenTemplate = Handlebars.compile(welcomeScreen);


    function displayWelcomeScreen(){
      $('.app').html(welcomeScreenTemplate());

      // Register event handler for the next button
      $('#next-button').on('click', function(e){
        e.preventDefault();
        displayNextScreen();
      });
    }

    // $.ajax('game/', {success: displayNextScreen});

    function displayNextScreen(){
      var context = {
        'name': 'Dan'
      };

      $('.app').html(nextScreenTemplate(context));

      $('#back-button').on('click', function(e){
        e.preventDefault();
        displayWelcomeScreen();
      })
    }

    // Run the program for the first time!
    displayWelcomeScreen();
    });
}(jQuery));