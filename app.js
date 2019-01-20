const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// View engine setup
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ROUTES
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const output = `
        <p>Portfolio Contact Inquiry</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD // generated ethereal password
        },
        tls: {
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"CAS PORTFOLIO" <sillscrystal@gmail.com>', // sender address
        to: "sillscrystal@gmail.com", // list of receivers
        subject: "CAS Portfolio Contact Inquiry", // Subject line
        text: "New Contact Request", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('index', {msg1: 'Your message has been sent!', msg2: 'I look forward to speaking with you in the near future.'});
    });
});


app.listen(process.env.PORT || 3000, () => console.log('server started...'));