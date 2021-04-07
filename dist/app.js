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