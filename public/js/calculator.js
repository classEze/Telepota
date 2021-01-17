
 document.querySelector('button.calculate').addEventListener('click', calculate_fare)
 document.querySelector('button.request').addEventListener('click', e=>request_ride(e,riderLocation.lng, riderLocation.lat))
 const to = document.querySelector("input[name='pick_up']")
 const from = document.querySelector("input[name='destination']")

 function calculate_fare(e){
    e.preventDefault();
    document.querySelector('.search_info').classList.add('hide')
     if(!riderLocation.lat || !riderLocation.lng || !destinationLocation.lat || !destinationLocation.lng)
     return alert('Please Enter valid addresses in both fields, better still choose from the options appearing while you type')

     //IF WE HAVE RIDER COORDS AND DESTINATION COORDS, GET ROUTES && DISTANCE
     let directionsService = new google.maps.DirectionsService();
     const route = {
      origin: riderLocation,
      destination: destinationLocation,
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC
  }
  directionsService.route(route,
    function(response, status) { 
      if (status !== 'OK') {
        return alert('Directions request failed due to ' + status);
      } 
      else {
        var directionsData = response.routes[0].legs[0];
        if (!directionsData) {
         return alert('Directions request failed');
        }
        else {
          show_ride_summary("5000 naira", directionsData.distance.text, directionsData.duration.text)
        }
      }
    });
  }
  document.querySelector('.close').addEventListener('click', e=>{
      document.querySelector('.search_info').classList.add('hide');
      document.querySelector('button.calculate').classList.add('hide');
  })

  document.querySelector('.match_result > span.close').addEventListener('click', e=>{
    document.querySelector('.match_result').classList.add('hide');
})


  function request_ride(e,longitude, latitude){
    e.preventDefault();
    if(!riderLocation.lat || !riderLocation.lng || !destinationLocation.lat || !destinationLocation.lng)
    return alert('Please Enter valid addresses in both fields, better still choose from the options appearing while you type')

    document.querySelector('.search_info').classList.add('hide');
    fetch('/ride/user',
        {
            method:"POST",
             headers:{'content-type':'application/json'},
             body:JSON.stringify({longitude,latitude, to:to.value, from:from.value}),
             withCredentials:true
           })
           .then(res=>res.json())
           .then(parsed=>{
            const {car,name,plate,phone,email} = parsed
            name?show_match(name,phone,email,car,plate):alert(parsed.message)
           })
           .catch(err=>console.log(err))
  }


  function show_match(name,phone,email,car,plate){
    document.querySelector('.match_result .dname').textContent += name
    document.querySelector('.match_result .dphone').textContent += phone
    document.querySelector('.match_result .demail').textContent += email
    document.querySelector('.match_result .dcar').textContent += car
    document.querySelector('.match_result .dplate').textContent += plate
    document.querySelector('.match_result').classList.remove('hide');
  }

  function show_ride_summary(price,distance,duration){
    document.querySelector('.search_info .price').textContent+=price
    document.querySelector('.search_info .distance').textContent+=distance
    document.querySelector('.search_info .time').textContent+=duration
    document.querySelector('.search_info').classList.remove('hide');
  }
  
