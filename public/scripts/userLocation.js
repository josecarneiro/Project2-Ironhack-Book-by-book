let $userLngInput = document.getElementById('user-lng-input');
let $userLatInput = document.getElementById('user-lat-input');

let options2 = {
  enableHighAccuracy: true,
  timeout: 15000, // max time to wait geo
  maximumAge: 0
};
const getUserPosition = function(options) {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

getUserPosition(options2)
  .then((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    $userLatInput.value = pos.lat;
    $userLngInput.value = pos.lng;
    console.log(pos)
  })
  .catch((error) => {
    console.log(error);
  });