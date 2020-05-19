const getPosition = function(options) {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

function initMap() {
  let options = {
    enableHighAccuracy: true,
    timeout: 15000, // max time to wait geo
    maximumAge: 0
  };
  let $lnginput = document.getElementById('lng-input');
  let $latinput = document.getElementById('lat-input');
  getPosition()
    .then((position) => {
      console.log(position);
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $latinput.value = Math.floor(pos.lat);
      $lnginput.value = pos.lng;
      console.log($lnginput.value);
      const map = new google.maps.Map(document.getElementById('map-view'), {
        zoom: 15,
        center: { lat: pos.lat, lng: pos.lng }
      });
      marker = new google.maps.Marker({
        draggable: true,
        position: pos,
        map: map
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
