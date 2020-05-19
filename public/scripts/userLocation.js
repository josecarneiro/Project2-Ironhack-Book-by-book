let $lnginput = document.getElementById('lng-input');
let $latinput = document.getElementById('lat-input');

let options = {
  enableHighAccuracy: true,
  timeout: 15000, // max time to wait geo
  maximumAge: 0
};
const getPosition = function(options) {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

getPosition(options)
  .then((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    $latinput.value = pos.lat;
    $lnginput.value = pos.lng;
  })
  .catch((error) => {
    console.log(error);
  });
