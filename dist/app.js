let selectedPosition;

let type = document.querySelector('select').value
console.log(type)
  

function initMap() {

  let options = {

    center: { lat: -37.814, lng: 144.96332 },
    zoom: 10,
    mapTypeControl: false,
    fullscreenControl: false
  }

  map = new google.maps.Map(document.getElementById('map'), {

    options
  });

  let marker = new google.maps.Marker({
    //content: "Click the map to get price estimates!",
    position: { lat: -37.814, lng: 144.96332 },
  });
  marker.setMap(map);

  map.addListener("click", (mapsMouseEvent) => {
    if (marker && marker.setMap) marker.setMap(null);
    selectedPosition = mapsMouseEvent.latLng
    $('#input-long').val(selectedPosition.lat)
    $('#input-lat').val(selectedPosition.lng)
    
    marker = new google.maps.Marker({
      position: mapsMouseEvent.latLng,
      animation: google.maps.Animation.DROP,
    });
    marker.setMap(map);

  });

}

$('#submitBtn').click(async function(event) {
  event.preventDefault();
  let street = $('#input-street').val()
  let number = $('#input-number').val()
  let long = $('#input-long').val()
  let lat = $('#input-lat').val()

  let distance = $('#input-distance').val()
  let bathrooms = $('#input-bathroom').val()
  let rooms = $('#input-numberOfRooms').val()
  let car = $('#input-car').val()
  let landsize = $('#input-landsize').val()
  let buildingArea = $('#input-buildingArea').val()
  let yearBuilt = $('#input-yearBuilt').val()
  let propertyCount = $('#input-propertyCount').val()
  let type1 = $('#"input-typeHouse"').val()
  let type2 = $('#"input-typeUnit"').val()
  let type3 = $('#"input-typeTownhouse"').val()

  console.log("click")
  let valuesToSend = {
    type1: type1,
    type2: type2,
    type3: type3,
    rooms: rooms,
    dist: distance,
    bathroom: bathrooms,
    car: car,
    landsize: landsize,
    buildingarea: buildingArea,
    yearbuilt: yearBuilt,
    long: long,
    lat: lat
  }

  let res = await fetch('/api/prediction', {
    method: 'POST',
    body: JSON.stringify(valuesToSend)
  })

  let prediction = await res.json()
  console.log(prediction)
  $('#result').html("this is the prediction: " + prediction.predicted)
})