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
    let pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    return pos;
  })
  .catch((error) => {
    console.log(error);
  });


  