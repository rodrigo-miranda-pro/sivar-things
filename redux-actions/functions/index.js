"use strict";

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.sendTicketEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== "POST") {
            return;
        }

        const {email, message} = req.body;

        const mailOptions = {
            from: "Sivar Things",
            to: email,
            subject: `Sivar Things`,
            html: `${message}`,
        };

        mailTransport.sendMail(mailOptions);

        res.status(200).send({ isEmailSend: true });
    });
});
