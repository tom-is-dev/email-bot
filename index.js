const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors");
// const { ConnectionStates } = require('mongoose');


const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function confirmation(agent) {
        const { person , email } = agent.parameters;
       console.log(email)
    console.log(person.name)

       let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'interneepk.pk@gmail.com', // generated ethereal user
            pass: 'jiqnhjuvnravbhsw', // generated ethereal password
        },
    });

    let options = {
        from: "interneepk.pk@gmail.com", // sender address
        to: [email, "hammadn788@gmail.com" , "learndispatch.alfax@gmail.com"], // list of receivers
        subject: `APPOINTMENT BOOKING`, // Subject line
        text: `Hi Congratulations...! Your reservation is done successfully ${email} Persons. See you There`
    };
    
    transporter.sendMail(options, function (err, info) {  
        if (err) { 
            console.log(err);
       agent.add('Something went Wrong')
        }
        console.log(info, response)
        response.send('email sent')
    })
        agent.add(`Okay, I am forwarding your question to our manager. He will be in touch with you shortly. Thank you!`)
    }

    let intentMap = new Map();
    intentMap.set('confirmation', confirmation);
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
