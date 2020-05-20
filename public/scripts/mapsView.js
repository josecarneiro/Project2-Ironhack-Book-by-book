function initMap() {
  let options = {
    enableHighAccuracy: true,
    timeout: 15000, // max time to wait geo
    maximumAge: 0
  };
  const $latinput = document.getElementById('lat-input').value;
  const $lnginput = document.getElementById('lng-input').value;
  const lat = Number($latinput);
  const lng = Number($lnginput);
  console.log(lng, lat);
  const bookPosition = { lat: lat, lng: lng };

  const map = new google.maps.Map(document.getElementById('map-view'), {
    zoom: 12,
    center: bookPosition
  });

  const marker = new google.maps.Marker({
    draggable: false,
    position: bookPosition,
    map: map,
    animation: google.maps.Animation.DROP
  });
}
