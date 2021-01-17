const cacheName='shell-V1'
const cacheArray= [
    '/',
    '/css/styles.css',
    '/css/home.css',
    '/css/home_styles.css',
    '/css/driver_home.css',
    '/css/login.css',
    '/css/signup.css',
    '/images/car.jpg',
    '/js/calculator.js',
    '/js/map.js',
    '/js/dmaps.js',
    '/js/subscribe.js',
    '/js/update_state.js',
    '/manifest.json',
    '/js/validate.js',
    '/js/changeLocation.js',
    '/js/register_worker.js',
    
      ]

self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open(cacheName).then(cache=>cache.addAll(cacheArray)).catch(err=>console.log('Error opening cache', err))
    )
    console.log('Installed')
})

self.addEventListener('activate', (e)=>{
    e.waitUntil(
    caches.keys().then(keys=>keys.forEach(key=>key !==cacheName?caches.delete(key):null )).catch(err=>console.log(err))
    )
    console.log('activated')
})
self.addEventListener('fetch', (e)=>{
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request)).catch(err=> console.log('Error matchng cache', err))
    )
})

self.addEventListener('push', async (e)=>{
    const parsed= await e.data.json();
    console.log(parsed)
    e.waitUntil(
        self.registration.showNotification( "Hello, You have been matched with a customer", {
            body:`Name: ${parsed.name}, \n Phone:${parsed.phone}},\n Email:${parsed.email},\n travelling from: ${parsed.from} \n to ${parsed.to}.\n Communicate with him/her.
            `,
            icon:'/images/icon3.png',
            image:'/images/icon3.png',
            actions:[{
                action:'Accept',
                title:'Accept ride'
            }],
            vibration:[1000,1000,500,500,800,1000,1000]

         }).then(()=>console.log('Push received oooo')).catch(err=>console.log('error' , err))
    
    )
})