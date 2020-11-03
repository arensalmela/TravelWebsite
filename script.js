$(document).ready(function () {
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
        "x-rapidapi-key": "c0f1f879b4msh3cf1c40d6507b08p184f03jsndb7b9ca8ccae",
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
              "c0f1f879b4msh3cf1c40d6507b08p184f03jsndb7b9ca8ccae",
          },
        };

        $.ajax(settings).done(function (imgresponse) {
          console.log(imgresponse);

          let img = imgresponse.hotelImages[0].baseUrl.replace("{size}", "z");
          var rndmTxt = "This is some random text";
          var contentCard = $("<div>");
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
      
            
            <h4 class="card-title">${hotelName}</h4>
            
            <p class="card-text">${rndmTxt}</p>
           
            <button type="button" class="btn btn-light-blue btn-md">Read more</button>
      
          </div>
        </div>
        </div>`
          );

          $("#hotelindex").append(contentCard);
        });

        //HOTEL ROOM IMAGES

        //let sampleImg = imgresponse.hotelimages[i].baseUrl.replace("{size}", "b")

        //var hotelCard = $("<div>").addClass("card");

        //var hotelCardBody = $("<div>").addClass("card-body");

        //var hotelIndex = $("<p>")
        //.addClass("card-text")
        //.html(hotelGroup.entities[i].caption);
        //console.log(hotelGroup.entities[i].caption);

        //hotelCardBody.append(hotelIndex);
        //hotelCard.append(hotelCardBody);
        //$("#hotelindex").append(hotelCard);
      }
    });
  });

  // <div class="view overlay">
  //   <img
  //     class="card-img-top"
  //     src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
  //     alt="Card image cap"
  //   >
  //     <a href="#!">
  //       <div class="mask rgba-white-slight"></div>
  //     </a>
  //   </div>

  //   <div class="card-body">
  //     <h4 class="card-title">Card title</h4>

  //     <p class="card-text">
  //       Some quick example text to build on the card title and make up the bulk
  //       of the card's content.
  //     </p>

  //     <button type="button" class="btn btn-light-blue btn-md">
  //       Read more
  //     </button>
  //   </div>
  // </div>;

  //Restaurants
  //zip code var and input box
  $("#eatBtn").on("click", function () {
    let zip = $("#eatLocation").val();
    console.log(zip);
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
    $.ajax(settings).done(function (response) {
      console.log(response);
      const restaurant = response.result.data[0];
      let restaurantName = restaurant.restaurant_name;
      let restaurantCuisine = restaurant.cuisines[0];
      let restaurantAddress = restaurant.address.formatted;
      let restaurantPhone = restaurant.restaurant_phone;
      const restaurantWeb =
        "https://www.google.com/search?" + restaurantPhone + restaurantAddress;
      //card info
      const template = `
          <ul>
          <ul>${restaurantName}</ul>
          <ul>${restaurantCuisine}</ul>
          <ul>${restaurantAddress}</ul>
          <ul>${restaurantPhone}</ul>
          </ul>`;

      $("#firstCardText").append(template);
      $("#secondCardBtn").attr("href", restaurantWeb);

      const restaurantGreat = response.result.data[1];
      let restaurantGreatName = restaurantGreat.restaurant_name;
      let restaurantGreatCuisine = restaurantGreat.cuisines[0];
      let restaurantGreatAddress = restaurantGreat.address.formatted;
      let restaurantGreatPhone = restaurantGreat.restaurant_phone;
      const restaurantWebGreat =
        "https://www.google.com/search?" +
        restaurantGreatPhone +
        restaurantGreatAddress;
      //card info
      const templateGreat = `
          <ul>
          <ul>${restaurantGreatName}</ul>
          <ul>${restaurantGreatCuisine}</ul>
          <ul>${restaurantGreatAddress}</ul>
          <ul>${restaurantGreatPhone}</ul>
          </ul>`;

      $("#secondCardText").append(templateGreat);
      $("#secondCardBtn").attr("href", restaurantWebGreat);

      const restaurantGood = response.result.data[2];
      let restaurantGoodName = restaurantGood.restaurant_name;
      let restaurantGoodCuisine = restaurantGood.cuisines[0];
      let restaurantGoodAddress = restaurantGood.address.formatted;
      let restaurantGoodPhone = restaurantGood.restaurant_phone;
      const restaurantWebGood =
        "https://www.google.com/search?" +
        restaurantGoodPhone +
        restaurantGoodAddress;
      //card info
      const templateGood = `
          <ul>
          <ul>${restaurantGoodName}</ul>
          <ul>${restaurantGoodCuisine}</ul>
          <ul>${restaurantGoodAddress}</ul>
          <ul>${restaurantGoodPhone}</ul>
          </ul>`;

      $("#thirdCardText").append(templateGood);
      $("#thirdCardBtn").attr("href", restaurantWebGood);
    });
  });
});
