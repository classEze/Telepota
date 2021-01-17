let map;
let autocomplete1;
let autocomplete2;

let riderLocation={lat:null,lng:null}
let destinationLocation={lat:null,lng:null};
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

   autocomplete1 = new google.maps.places.Autocomplete(document.querySelector('.pick_up'), { componentRestrictions: { country: 'ng' } })
   autocomplete2 = new google.maps.places.Autocomplete(document.querySelector('.destination'), { componentRestrictions: { country: 'ng' } })

          //AUTOCOMPLETE LISTENERS
          autocomplete1.addListener('place_changed', function(){
            const result1=this.getPlace();
            riderLocation.lat=result1.geometry.location.lat();
            riderLocation.lng=result1.geometry.location.lng();
            map.setCenter(result1.geometry.location)
            new google.maps.Marker({map,position:result1.geometry.location})
              })
          autocomplete2.addListener('place_changed', function(){
            const result2=this.getPlace()
            destinationLocation.lat=result2.geometry.location.lat();
            destinationLocation.lng=result2.geometry.location.lng();
            new google.maps.Marker({map,position:result2.geometry.location})
            document.querySelector('button.calculate').classList.remove('hide');

          })
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

    



