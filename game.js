// Initial array of movies
var animals = ["Cat", "Dog", "Bird", "Pig"];

// Function for dumping the JSON content for each button into the div
function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
   

    // https://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=cq6R7xKRbFRv7dAsP9CNhijwHdP1argH&limit=5
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=cq6R7xKRbFRv7dAsP9CNhijwHdP1argH&limit=5",
        method: "GET"
    }).then(function (response) {

        // Creating a div to hold each animal
        var animalDiv = $("<div class='animal'>");

         // Storing the rating data
        var rating = JSON.stringify(response.data[0].rating);
       
        
        // Creating an element to have the rating displayed
        var displayRating = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        animalDiv.append(displayRating);


        //creating a variable of the url of the object that gets returned
        var imageUrl = response.data[0].images.original.url


        //creating a variable with a new image element in html
        var animalImage = $("<img>");

        // creating attributes for the animalImage variable
        animalImage.attr("src", imageUrl);
        animalImage.attr("alt", "animal image");

        // Appending the image
        animalDiv.append(animalImage);

        // Putting all animal data in html div
        $("#animal-data").prepend(animalDiv);

    });
}

//make images clickable so the their states can be still or animate
$("animal-data").on("click", function() {

    //need to write an if statement for if the gif is animated or if it is still


});





// Function for displaying animals
function renderButtons() {

    // Deleting the buttons prior to adding new animals
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Dynamicaly generating buttons for each animal in the array
        // This code $("<button>") creates a new button
        var a = $("<button>");
        // Adding a class of animal to button
        a.addClass("animal");
        // Adding a data-attribute
        a.attr("data-name", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox that the user inputs 
    var animal = $("#animal-input").val().trim();

    // The animal from the textbox is then added to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our animals array
    renderButtons();

});

// Generic function for displaying the animal info
$(document).on("click", ".animal", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();