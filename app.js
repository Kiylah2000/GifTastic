var topic = ["Lion", "Tiger", "Elephant", "Dog", "Cat"];

function AnimalGame() {
    for (var i = 0; i < topic.length; i++) {
        var a = $("<button>");
        a.addClass("animal-topic");
        a.attr("data-name", topic[i]);
        a.text(topic[i]);
        $("#btn_div").append(a);
    }
}

AnimalGame();

$("#submit").click(function (event) {
    // console.log("yayyy");
    event.preventDefault();

    var temp = $("#animal").val();
    $("#animal").val("");
    topic.push(temp);
    $("#btn_div").empty();

    AnimalGame();

});



$(document).on("click", "button", function () {
    $("#gifs").empty();
    var animal_data = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal_data + "&api_key=CA9BEThjx4Sp2dDjCOIj2bXqRDiNhi4E&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var div = $("<div>");
            var p = $("<p>").text("Ratings: " + response.data[i].rating);


            var gifImg = $("<img>");
            gifImg.addClass("gif");
            gifImg.attr("src", response.data[i].images.downsized_still.url);
            gifImg.attr("data-still", response.data[i].images.downsized_still.url);
            gifImg.attr("data-animate", response.data[i].images.downsized.url);
            gifImg.attr("data-state", "still");

            div.append(p);
            div.append(gifImg);
            $("#gifs").append(div);
            console.log(response.data[i].images.downsized.url);

        };
    });
});

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });