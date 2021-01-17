const publicVapidKey= "BFbQUcHfNQtmJXBq0xsHhUq_AyoOEjclxWLsFueEw9UlWIWXnprgFfBNugGDWW26Mgafgzbm29fgrJJkm_MaMbc";
const privateVapidKey="aHtrCnE8SnUO0dy_1XBXsm7AKBV104AyRftloKTG38g";
const web_push=require('web-push');
web_push.setVapidDetails('mailto:sendezeamail@gmail.com', publicVapidKey, privateVapidKey);

exports.send_push = ( sub, message) => {
web_push.sendNotification(sub , JSON.stringify(message))
.then(()=>console.log('sent'))
.catch(err=>console.log(err))
}