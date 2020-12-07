
//application Server key
const applicationServerKey='BFbQUcHfNQtmJXBq0xsHhUq_AyoOEjclxWLsFueEw9UlWIWXnprgFfBNugGDWW26Mgafgzbm29fgrJJkm_MaMbc';

navigator.serviceWorker.ready.then(reg=>{
    reg.pushManager.getSubscription().then(existing_sub=>{

        //if user already subscribed
        if(existing_sub) return send_sub(existing_sub)

        //if there is no existing sub
        handle_new_sub(reg)
    }).catch(err=>console.log(err))
})

//function to send sub to the server
async function send_sub(sub){
    try{
        const sub_sent=await fetch('/subscribe/rider',
        {
            method:"post",
             headers:{'content-type':'application/json'},
             body:JSON.stringify({sub}),
             withCredentials:true
           })
           console.log('Existing Sub Saved', sub)
          const parsed= await sub_sent.json();
           console.log(parsed.msg, parsed.sub)
           return;
        }
    catch(err){
        console.log(err) 
    } 
}

//function to ask for new sub and handle it
async function handle_new_sub(reg){
   const new_sub=await reg.pushManager.subscribe({userVisibleOnly:true, applicationServerKey:urlBase64ToUint8Array(applicationServerKey)})
   if(new_sub){
       console.log('New Asked Sub')
    return send_sub(new_sub)
   } 
   alert('You need to subscribe to be able to use this service well')
}


// Function to convert app server key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }