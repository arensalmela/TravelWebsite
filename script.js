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
        "x-rapidapi-key": "3902862207mshcc87b50d739a8e1p19476ajsncf5356a4c9a7",
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      hotelGroup = response.suggestions[3];
      console.log(hotelGroup);
      for (i = 0; i < hotelGroup.entities.length; i++) {
        var hotel = hotelGroup.entities[i];
        let hotelName = hotel.name;
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
  //zip code var and input box
  $("#eatBtn").on("click", function () {
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
        "x-rapidapi-key": "3902862207mshcc87b50d739a8e1p19476ajsncf5356a4c9a7",
      },
    };
    //AJAX request
    $.ajax(settings).done(function (response) {
      //left card DOM
      document.getElementById("bestCardText").textContent = "";
      const restaurantBest = response.result.data[0];
      let restaurantBestName = restaurantBest.restaurant_name;
      let restaurantBestCuisine = restaurantBest.cuisines[0];
      let restaurantBestAddress = restaurantBest.address.formatted;
      let restaurantBestPhone = restaurantBest.restaurant_phone;
      //Left card dynamic card title
      document.querySelector(
        ".card-titleBest"
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

      $("#bestCardText").prepend(templateBest);
      $("#bestCardBtn").attr("href", restaurantBestWeb);

      //Middle card DOM
      document.getElementById("greatCardText").textContent = "";
      const restaurantGreat = response.result.data[1];
      let restaurantGreatName = restaurantGreat.restaurant_name;
      let restaurantGreatCuisine = restaurantGreat.cuisines[0];
      let restaurantGreatAddress = restaurantGreat.address.formatted;
      let restaurantGreatPhone = restaurantGreat.restaurant_phone;
      //Middle card dynamic card title
      document.querySelector(
        ".card-titleGreat"
      ).textContent = restaurantGreatName;
      //leave page to Google Maps with dynamic restaurant info
      const restaurantGreatWeb =
        "https://www.google.com/maps/search/" +
        restaurantGreatName +
        " " +
        restaurantGreatAddress;
      //Dynamic middle card info
      const templateGreat = `
          <ul>
            <ul>Cuisine - ${restaurantGreatCuisine}</ul>
            <ul>Address - ${restaurantGreatAddress}</ul>
            <ul>Phone Number - ${restaurantGreatPhone}</ul>
          </ul>`;

      $("#greatCardText").prepend(templateGreat);
      $("#greatCardBtn").attr("href", restaurantGreatWeb);

      //Right card DOM
      document.getElementById("goodCardText").textContent = "";
      const restaurantGood = response.result.data[2];
      let restaurantGoodName = restaurantGood.restaurant_name;
      let restaurantGoodCuisine = restaurantGood.cuisines[0];
      let restaurantGoodAddress = restaurantGood.address.formatted;
      let restaurantGoodPhone = restaurantGood.restaurant_phone;
      //Right card dynamic card title
      document.querySelector(
        ".card-titleGood"
      ).textContent = restaurantGoodName;
      //leave page to Google Maps with dynamic restaurant info
      const restaurantGoodWeb =
        "https://www.google.com/maps/search/" +
        restaurantGoodName +
        " " +
        restaurantGoodAddress;
      //Dynamic Right card info
      const templateGood = `
          <ul>
            <ul>Cuisine - ${restaurantGoodCuisine}</ul>
            <ul>Address - ${restaurantGoodAddress}</ul>
            <ul>Phone Number - ${restaurantGoodPhone}</ul>
          </ul>`;

      $("#goodCardText").prepend(templateGood);
      $("#goodCardBtn").attr("href", restaurantGoodWeb);
    });
  }
});
