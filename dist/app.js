let selectedPosition;

function initMap() {

  let options = {

    center: { lat: -37.814, lng: 144.96332 },
    zoom: 10,
    mapTypeControl: false
  }

  map = new google.maps.Map(document.getElementById('map'), {

    options
  });

  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get price estimates!",
    position: { lat: -37.814, lng: 144.96332 },
  });

  let form = {
  }

  infoWindow.open(map);
  map.addListener("click", (mapsMouseEvent) => {
    infoWindow.close();

    selectedPosition = mapsMouseEvent.latLng
    $('#input-long').val(selectedPosition.lat)
    $('#input-lat').val(selectedPosition.lng)
    
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });

    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      //"Test"
    );
    infoWindow.open(map);
  });

}

$('#submitBtn').click(async function(event) {
  event.preventDefault();
  let street = $('#input-street').val()
  let number = $('#input-number').val()
  let long = $('#input-long').val()
  let lat = $('#input-lat').val()
  console.log("click")
  let valuesToSend = {
    type1: 1,
    type2: 0,
    type3: 0,
    rooms: 2,
    dist: 2.5,
    bathroom: 1,
    car: 1,
    landsize: 202,
    buildingarea: 156,
    yearbuilt: 1966,
    long: 145,
    lat: -37,
    propertycount: 4019,
    cluster: 9
  }

  let res = await fetch('/api/prediction', {
    method: 'POST',
    body: JSON.stringify(valuesToSend)
  })

  let prediction = await res.json()
  console.log(prediction)
  $('#result').html("this is the prediction: " + prediction.predicted)
})