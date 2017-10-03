
      var gifList = ["dogs", "cats", "lions", "monkeys"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGifInfo() {

        var gifList = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifList + "&api_key=5FXlfXlggMAN2ipj502KyeClo6E5IWcf&limit=5";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          var results = response.data;
          console.log(results);

          for (var i = 0; i < results.length; i++) {
            var holder = results[i].rating;

            var gifDiv = $("<div class='gifList'>");
            var nameOfGif = results[i].slug;
            var paragraphOne = $("<p>").text("Rating: " + holder);
            gifDiv.append(paragraphOne);
            var imgURL = results[i].url;
            var image = $("<img>").attr("src", imgURL);
            gifDiv.append(image);
            $("#gifs-view").prepend(gifDiv);

          }

        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < gifList.length; i++) {
          var button = $("<button>");
          button.addClass("gif");
          button.attr("data-name", gifList[i]);
          button.text(gifList[i]);
          $("#buttons-view").append(button);
        }
      }

      // This function handles events where a gif button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gifText = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        gifList.push(gifText);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".gifList", displayGifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();