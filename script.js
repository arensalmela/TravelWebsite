$(document).ready(function () {
  //city variable and input box
  $("#hotelbtn").on("click", function () {
    let hotelCityInput = $("#hotelSearch").val();
    console.log(hotelCityInput);
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" +
        hotelCityInput,
      method: "GET",
      headers: {
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "c0f1f879b4msh3cf1c40d6507b08p184f03jsndb7b9ca8ccae",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      hotelGroup = response.suggestions[3];
      console.log(hotelGroup);
      for (i = 0; i < hotelGroup.entities.length; i++) {
        var hotelCard = $("<div>").addClass("card");
        var hotelCardBody = $("<div>").addClass("card-body");
        var hotelIndex1 = $("<p>")
          .addClass("card-text")
          .text(hotelGroup.entities[0]);
        var hotelIndex2 = $("<p>")
          .addClass("card-text")
          .text(hotelGroup.entities[1]);
        var hotelIndex3 = $("<p>")
          .addClass("card-text")
          .text(hotelGroup.entities[2]);
      }
    });
  });

  // Flight Code
  $("#flightbtn").click(function () {
    debugger;
    let input = $("#flightLocation").val();
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" +
        input,
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "3902862207mshcc87b50d739a8e1p19476ajsncf5356a4c9a7",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  });

  // $(".flightbtn").on("click", function () {
  //   console.log("click");
  //   let input = $("#flightLocation").val();
  //   var settings = {
  //     async: true,
  //     crossDomain: true,
  //     url:
  //       "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" +
  //       input,
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host":
  //         "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
  //       "x-rapidapi-key": "3902862207mshcc87b50d739a8e1p19476ajsncf5356a4c9a7",
  //     },
  //   };

  //   $.ajax(settings).done(function (response) {
  //     console.log(response);
  //   });
  // });
});
