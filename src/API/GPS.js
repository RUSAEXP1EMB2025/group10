function convertAddress(address) {


  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${D_APIKEY}`;

  const response = UrlFetchApp.fetch(url);
  const json = JSON.parse(response.getContentText());

  if (json.status === "OK") {
    const location = json.results[0].geometry.location;
    const lat = location.lat;
    const lng = location.lng;

    const props = PropertiesService.getScriptProperties();
    props.setProperty("LATITUDE", lat.toString());
    props.setProperty("LONGITUDE", lng.toString());

    
  } 
}

