const router=require('express').Router()
const twilio=require('twilio')
const client = new twilio(process.env.SMS_SID, process.env.SMS_AUTH_TOKEN)


router.post('/user', (req,res)=>{
    const sender = +19514193178
    const twilio=require('twilio')
    const client = new twilio(process.env.SMS_SID, process.env.SMS_AUTH_TOKEN)

    const  { receiver , message} = req.body
    client.messages.create({
        to:receiver,
        from:sender,
        body:message
    }).then(response=>{
        res.send(response)
        console.log(response)
    }).catch(err=>{
        console.log(err)
        res.send(err)

    })
});

send_sms(req.user.phone , rider_message)
send_sms(paired.phone , driver_message)
const driver_message = ` New ride request. You have been matched with a passenger. Name: ${req.user.name}, Email:${req.user.email}, Phone:${req.user.phone}. Please communicate with them `
const rider_message=`You have been matched with a driver.  Name: ${paired.name}, Email:${paired.email}, Phone:${paired.phone}. Please communicate with them `


module.exports=router