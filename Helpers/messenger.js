const twilio=require('twilio')
const client = new twilio(process.env.SMS_SID, process.env.SMS_AUTH_TOKEN)
const smsSender = +19514193178
const mailgun = require('mailgun-js')({apiKey:process.env.MAILGUN_API_KEY, domain: 'http://localhost:7000'});



exports.send_sms = (receiver,message)=>{
    client.messages.create({
        to:receiver,
        from:smsSender,
        body:message
    }).then(response=>{
        console.log(response)
    }).catch(err=>{
        console.log(err)

    })
}

exports.send_email = (receiver,email)=>{
    const data = {
        from:'sendezeamail@gmail.com',
        to: receiver,
        subject: 'Hello from Telepota',
        text:email,
      };
      
      mailgun.messages().send(data, (err, body) => {
          if(err) return console.log(err)
        console.log(body);
      });
}



