if(!navigator.geolocation)
alert('Please enable your your location features for this app to work properly')
else{
    navigator.geolocation.getCurrentPosition(success_function, error_function, {enableHighAccuracy: true, timeout: 7000, maximumAge: 0})
    }
//SUCCESS CALLBACK
function success_function(position){
    const { latitude, longitude } = position.coords
    send_location(longitude,latitude)
    const map = new google.maps.Map(document.querySelector('.map_div'), { zoom: 12, center: { lat:latitude, lng:longitude }})
    new google.maps.Marker({map,position:{lat:latitude, lng:longitude}})
    map.setCenter({ lat:latitude, lng:longitude })
}
//ERROR CALLBACK
function error_function(err){
    alert(` LOCATION SERVICE UNAVAILABLE, ${err.message}`)
}
 function send_location(longitude, latitude){
  fetch('/location/user',
      {
          method:"POST",
           headers:{'content-type':'application/json'},
           body:JSON.stringify({longitude,latitude}),
           withCredentials:true
         })
         .then(parsed=>parsed.json())
         .then(res=> console.log(res.msg, res.location))
         .catch(err=>console.log(err))
}


