//Code Snippets
$(document).ready(function () {
  //city variable and input box
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=new%20york",
    method: "GET",
    headers: {
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
      "x-rapidapi-key": "c0f1f879b4msh3cf1c40d6507b08p184f03jsndb7b9ca8ccae",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});
