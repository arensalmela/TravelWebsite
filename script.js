$(document).ready(function () {
  let allHotelImages = {};
  const slideContainer = $("#slideContainer");
  //Restaurant Cards Local Storage
  let eatLocalStorage = localStorage.getItem("eatLocalZip");
  if (eatLocalStorage) {
    getCardInfo(eatLocalStorage);
  }
  //End Restaurant Cards Local Storage

  //city variable and input box
  $("#hotelbtn").on("click", function () {
    $("#hotelindex").html("");
    $("#hotelErrMsg").html("");
    let hotelCityInput = $("#hotelSearch").val();
    //If statement adding text to inform user of incorrect character usage
    if (isValid(hotelCityInput)) {
      console.log("valid");
    } else {
      $("#hotelErrMsg").append($("<p>Do not include special characters</p>"));
    }

    if (hasNumber(hotelCityInput)) {
      $("#hotelErrMsg").append($("<p>Do not include numbers</p>"));
    } else {
      console.log("valid");
    }

    console.log(hotelCityInput);
    //Passing API user input
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" +
        hotelCityInput,
      method: "GET",
      headers: {
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "3902862207mshcc87b50d739a8e1p19476ajsncf5356a4c9a7",
      },
    };
    //For loop to grab hotel group info (top hotels) located at index 3 of suggestions
    $.ajax(settings).done(function (response) {
      console.log(response);
      hotelGroup = response.suggestions[3];
      console.log(hotelGroup);
      for (i = 0; i < hotelGroup.entities.length; i++) {
        var hotel = hotelGroup.entities[i];
        let hotelName = hotel.name;
        //Using destination ID to pass through photos API.
        var settings = {
          async: true,
          crossDomain: true,
          url:
            "https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=" +
            hotel.destinationId,
          method: "GET",
          headers: {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key":
              "3902862207mshcc87b50d739a8e1p19476ajsncf5356a4c9a7",
          },
        };
        //Hotel image at index 0 used for card of each hotel suggestion
        $.ajax(settings).done(function (imgresponse) {
          console.log(imgresponse);
          allHotelImages[imgresponse.hotelId] = imgresponse.hotelImages;
          let img = imgresponse.hotelImages[0].baseUrl.replace("{size}", "z");
          var rndmTxt = " ";
          var contentCard = $("<div>");
          //Dynamically adding html elements including hotel image and name.
          contentCard.html(
            `<div class="card mb-4">
          <div class="view overlay">
          <img class="card-img-top" src="${img}"
              alt="Card image cap">
            <a href="#!">
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>
      
          
          <div class="card-body">
      
            
            <h6 class="card-title">${hotelName}</h6>
            
            <p class="card-text">${rndmTxt}</p>
           
            <button type="button" class="modal-btn btn btn-primary" data-toggle="modal" data-hotel="${imgresponse.hotelId}" data-target="#basicExampleModal">
            Click here for hotel photos
          </button>
      
          </div>
        </div>
        </div>`
          );

          $("#hotelindex").append(contentCard);
        });
      }
    });
  });

  $(document).on("click", ".modal-btn", function () {
    buildCarousel($(this).data("hotel"));
  });

  function buildCarousel(hotelId) {
    //Setting carousel indicators to be empty each time it is clicked.
    document.getElementById("carousel-indicators").innerHTML = "";
    slideContainer.empty("");
    //Capping the number of hotel images populated by API to 20
    var hotelImages = allHotelImages[hotelId];
    if (hotelImages.length > 20) {
      hotelImages = hotelImages.slice(0, 20);
    }
    //Editing each hotel img URL to indicate image size
    for (let i = 0; i < hotelImages.length; i++) {
      let img = hotelImages[i].baseUrl.replace("{size}", "z");
      //Img at index 0 will load first
      if (i === 0) {
        var carouselCard = `<div class="carousel-item active">
      <img class="d-block w-100" src="${img}" alt="First slide">
      </div>`;
      } else {
        var carouselCard = `<div class="carousel-item">
        <img class="d-block w-100" src="${img}" alt="First slide">
        </div>`;
      }
      $(".carousel-indicators").append(`<li
        data-target="#carousel-example-${i + 1}z"
        data-slide-to="${i + 1}"
        ></li>`);

      slideContainer.append(carouselCard);
    }
  }

  //Start Restaurants Section
  $("#eatBtn").on("click", function () {
    $("#eatErrMsg").html("");
    let enteredZip = $("#eatLocation").val();
    if (isValid(enteredZip)) {
    } else {
      $("#eatErrMsg").append($("<p>Do not include special characters</p>"));
      return;
    }

    if (!hasNumber(enteredZip)) {
      $("#eatErrMsg").append($("<p>Do not include letters</p>"));
      return;
    } else {
    }

    let zip = $("#eatLocation").val();
    localStorage.setItem("eatLocalZip", zip);
    getCardInfo(zip);
  });
  // Call API
  function getCardInfo(zip) {
    //US Restaurant Menus API Info
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/" +
        zip,
      method: "GET",
      headers: {
        "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
        "x-rapidapi-key": "c0f1f879b4msh3cf1c40d6507b08p184f03jsndb7b9ca8ccae",
      },
    };
    //AJAX request
    $.ajax(settings).done(function (response) {
      //left card DOM

      for (i = 0; i <= 2; i++) {
        document.getElementById("bestCardText-" + (i + 1)).innerHTML = "";
        const restaurantBest = response.result.data[i];
        let restaurantBestName = restaurantBest?.restaurant_name;
        let restaurantBestCuisine = restaurantBest?.cuisines[i];
        let restaurantBestAddress = restaurantBest?.address.formatted;
        let restaurantBestPhone = restaurantBest?.restaurant_phone;
        //Left card dynamic card title
        document.querySelector(
          ".card-titleBest-" + (i + 1)
        ).textContent = restaurantBestName;
        //leave page to Google Maps with dynamic restaurant info
        const restaurantBestWeb =
          "https://www.google.com/maps/search/" +
          restaurantBestName +
          " " +
          restaurantBestAddress;
        //Dynamic left card info
        const templateBest = `
          <ul>
              <ul>Cuisine - ${restaurantBestCuisine}</ul>
              <ul>Address - ${restaurantBestAddress}</ul>
              <ul>Phone Number - ${restaurantBestPhone}</ul>
            </ul>`;

        $("#bestCardText-" + (i + 1)).prepend(templateBest);
        $("#bestCardBtn-" + (i + 1)).attr("href", restaurantBestWeb);
      }
    });
  }
});

function isValid(str) {
  return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

function hasNumber(myString) {
  return /\d/.test(myString);
}
