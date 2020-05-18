function initMap() {
  console.log('hi');
  const $mapContainer = document.getElementById('map-view');
  const map = new google.maps.Map($mapContainer, {
    center: { lat: 0, lng: -9 },
    zoom: 8
  });
}
