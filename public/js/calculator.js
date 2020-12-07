
  document.querySelector('button').addEventListener('click', (e)=>{
    e.preventDefault();
    
    document.querySelector('.search_info').classList.add('hide')
     if(!riderLocation.lat || !riderLocation.lng || !destinationLocation.lat || !destinationLocation.lng )
     return alert('Please Enter valid addresses in both fields')

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
          alert('Directions request failed');
          return;
        }
        else {
            document.querySelector('.search_info .price').textContent=`price: #5000`
            document.querySelector('.search_info .distance').textContent=`distance:${directionsData.distance.text}`
            document.querySelector('.search_info .time').textContent=`duration:${directionsData.duration.text}`
            document.querySelector('.search_info').classList.remove('hide');
        }
      }
    });
  }
  )

  document.querySelector('.close').addEventListener('click', e=>{
      document.querySelector('.search_info').classList.add('hide')
  })
