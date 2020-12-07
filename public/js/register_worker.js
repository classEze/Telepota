if(!('serviceWorker' in navigator)){
    console.log('Service Worker Not available in this browser. Some features may not work properly');
}
else{
    navigator.serviceWorker.register('../worker.js').then(worker=>console.log('Worker Registered', worker.scope)).catch(err=>console.log(err))
}
