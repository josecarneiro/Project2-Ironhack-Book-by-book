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
      $latinput.value = pos.lat;
      $lnginput.value = pos.lng;

      const map = new google.maps.Map(document.getElementById('map-view'), {
        zoom: 15,
        center: { lat: pos.lat, lng: pos.lng }
      });

      marker = new google.maps.Marker({
        draggable: true,
        position: pos,
        map: map
      });
      console.log('this', marker.position);

      google.maps.event.addListener(marker, 'dragend', function(event) {
        // console.log(event);

        $latinput.value = event.latLng.lat();
        $lnginput.value = event.latLng.lng();
      });

      // google.maps.event.addDomListener(window, "load", initialize()
    })
    .catch((error) => {
      console.log(error);
    });
}
