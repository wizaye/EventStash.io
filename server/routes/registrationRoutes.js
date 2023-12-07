// routes/registrationRoutes.js
const cors=require('cors')
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const qrCode = require('qrcode');
const bodyParser = require('body-parser');
const Event = require('../models/EventModel');
const userSchema= require('../models/UserModel');
const WaitingList=require('../models/WaitingListModel');
const sendConfirmationEmail=require('../middlewares/sendConfirmationEmail');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/:eventId', async (req, res) => {
  try {
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId);

      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      // Read the HTML template file
      const templatePath = path.join(__dirname, '..', 'templates', 'registration-form.html');
      const templateContent = fs.readFileSync(templatePath, 'utf8');

      // Replace placeholders with dynamic content
      const renderedTemplate = templateContent
      .replace('{{eventName}}', `${event.eventName}`)
      .replace('{{eventDetails}}', `Date: ${event.eventDate}, Type: ${event.eventMode}`)
      .replace('{{eventId}}', `${event._id}`)
      .replace('{{imageURL}}', event.eventBanner);

    res.send(renderedTemplate);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
//   try {
//     const eventId = req.params.eventId;
//     const { name, email, /* add other form fields here */ } = req.body;

//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     if (event.hostPermission === 'Yes' || event.hostPermission === 'yes') {
//       // Display a message indicating that the registration request has been sent to the host
//       return res.send('Your registration request has been sent to the host. Please wait for confirmation via email.');
//     }

//     // Generate unique ticket number
//     const ticketNumber = uuid.v4();

//     // Save the generated ticket number in the event document
//     event.ticketNumber = ticketNumber;

//     // Generate QR code
//     const qrCodeData = `Event Name: ${event.eventName}\n` +
//                        `User Name: ${name}\n` +
//                        `User Email: ${email}\n` +
//                        `Ticket Number: ${ticketNumber}\n`;
//                        // Include additional fields in the QR code data

//     const qrCodeDir = path.join(__dirname, 'qr-codes');
//     if (!fs.existsSync(qrCodeDir)) {
//       fs.mkdirSync(qrCodeDir);
//     }

//     const qrCodePath = path.join(qrCodeDir, `${event._id}.png`);
//     await qrCode.toFile(qrCodePath, qrCodeData);

//     // Save user registration details to the user schema
//     const newUser = new userSchema({
//       name,
//       email,
//       ticketNumber,
//       qrCodePath,
//       eventId: event._id, // Store the eventId in the user schema to establish a relationship
//       // additionalField, // Include additional fields in the user schema
//       // status: 'Pending', // You can update the status as needed
//     });

//     await newUser.save();

//     // Check if event.users is defined, if not, initialize it as an empty array
//     if (!event.users) {
//       event.users = [];
//     }

//     // Update the event with the user's reference
//     event.users.push(newUser._id);

//     await Promise.all([event.save(), sendConfirmationEmail(email, event.eventName, ticketNumber, qrCodePath)]);

//     // Read the HTML file for the registration success message
//     const successPath = path.join(__dirname, '..', 'templates', 'registration-success.html');
//     const successContent = fs.readFileSync(successPath, 'utf8');

//     // Encode the QR code image as base64
//     const qrCodeImageBase64 = fs.readFileSync(qrCodePath, { encoding: 'base64' });

//     // Replace placeholders with dynamic content
//     const renderedSuccessMessage = successContent
//       .replace('{{name}}', name)
//       .replace('{{eventName}}', event.eventName)
//       .replace('{{email}}', email)
//       .replace('{{ticketNumber}}', ticketNumber)
//       .replace('{{qrCodeImageBase64}}', qrCodeImageBase64);

//     // Send the rendered success message as HTML response
//     res.send(renderedSuccessMessage);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// ... (existing imports and code)

// router.post('/:eventId/submit', async (req, res) => {
//   try {
//     const eventId = req.params.eventId;
//     const { name, email, /* add other form fields here */ } = req.body;

//     const event = await Event.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     // Check host permission
//     if (event.hostPermission === 'Yes' || event.hostPermission === 'yes') {
//       // Display a message indicating that the registration request has been sent to the host

//       // Create an invitation request for the host
//       const userRequest = new userSchema({
//         name,
//         email,
//         ticketNumber: null, // Set to null as it's not confirmed yet
//         qrCodePath: null, // Set to null as it's not confirmed yet
//         eventId: event._id,
//         status: 'Pending', // Status indicating the request is pending
//       });

//       await userRequest.save();

//       return res.send('Your registration request has been sent to the host. Please wait for confirmation via email.');
//     }

//     // Rest of the code for processing registration when hostPermission is not 'Yes'
//     // Generate unique ticket number
//     const ticketNumber = uuid.v4();

//     // Save the generated ticket number in the event document
//     event.ticketNumber = ticketNumber;

//     // Generate QR code
//     const qrCodeData = `Event Name: ${event.eventName}\n` +
//                        `User Name: ${name}\n` +
//                        `User Email: ${email}\n` +
//                        `Ticket Number: ${ticketNumber}\n`;
//                        // Include additional fields in the QR code data

//     const qrCodeDir = path.join(__dirname, 'qr-codes');
//     if (!fs.existsSync(qrCodeDir)) {
//       fs.mkdirSync(qrCodeDir);
//     }

//     const qrCodePath = path.join(qrCodeDir, `${event._id}.png`);
//     await qrCode.toFile(qrCodePath, qrCodeData);

//     // Save user registration details to the user schema
//     const newUser = new userSchema({
//       name,
//       email,
//       ticketNumber,
//       qrCodePath,
//       eventId: event._id, // Store the eventId in the user schema to establish a relationship
//       // additionalField, // Include additional fields in the user schema
//       // status: 'Pending', // You can update the status as needed
//     });

//     await newUser.save();

//     // Check if event.users is defined, if not, initialize it as an empty array
//     if (!event.users) {
//       event.users = [];
//     }

//     // Update the event with the user's reference
//     event.users.push(newUser._id);

//     await Promise.all([event.save(), sendConfirmationEmail(email, event.eventName, ticketNumber, qrCodePath)]);

//     // Read the HTML file for the registration success message
//     const successPath = path.join(__dirname, '..', 'templates', 'registration-success.html');
//     const successContent = fs.readFileSync(successPath, 'utf8');

//     // Encode the QR code image as base64
//     const qrCodeImageBase64 = fs.readFileSync(qrCodePath, { encoding: 'base64' });

//     // Replace placeholders with dynamic content
//     const renderedSuccessMessage = successContent
//       .replace('{{name}}', name)
//       .replace('{{eventName}}', event.eventName)
//       .replace('{{email}}', email)
//       .replace('{{ticketNumber}}', ticketNumber)
//       .replace('{{qrCodeImageBase64}}', qrCodeImageBase64);

//     // Send the rendered success message as HTML response
//     res.send(renderedSuccessMessage);

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
router.use(cors());
router.post('/:eventId/submit', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { name, email } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check host permission
    if (event.hostPermission === 'Yes' || event.hostPermission === 'yes') {
      // Send waiting list HTML
      const waitingUser = new WaitingList({
        name,
        email,
        eventId:  event._id,
        eventName: event.eventName,
      });

      await waitingUser.save();
      const waitingListPath = path.join(__dirname, '..', 'templates', 'waiting-list.html');
      const waitingListContent = fs.readFileSync(waitingListPath, 'utf8');

      // Replace placeholders with dynamic content
      const renderedWaitingListMessage = waitingListContent
        .replace('{{name}}', name)
        .replace('{{eventName}}', event.eventName);

      // Send the rendered waiting list message as HTML response
      return res.send(renderedWaitingListMessage);
    }


    // Rest of the code for processing registration when hostPermission is not 'Yes'
    // Generate unique ticket number
    const ticketNumber = uuid.v4();

    // Save the generated ticket number in the event document
    event.ticketNumber = ticketNumber;

    // Generate QR code
    const qrCodeData = `Event Name: ${event.eventName}\n` +
                       `User Name: ${name}\n` +
                       `User Email: ${email}\n` +
                       `Ticket Number: ${ticketNumber}\n`;
                       // Include additional fields in the QR code data

    const qrCodeDir = path.join(__dirname, 'qr-codes');
    if (!fs.existsSync(qrCodeDir)) {
      fs.mkdirSync(qrCodeDir);
    }

    const qrCodePath = path.join(qrCodeDir, `${event._id}.png`);
    await qrCode.toFile(qrCodePath, qrCodeData);

    // Save user registration details to the user schema
    const newUser = new userSchema({
      name,
      email,
      ticketNumber,
      qrCodePath,
      eventId: event._id, // Store the eventId in the user schema to establish a relationship
      // additionalField, // Include additional fields in the user schema
      // status: 'Pending', // You can update the status as needed
    });

    await newUser.save();

    // Check if event.users is defined, if not, initialize it as an empty array
    if (!event.users) {
      event.users = [];
    }

    // Update the event with the user's reference
    event.users.push(newUser._id);

    await Promise.all([event.save(), sendConfirmationEmail(email, name,event.eventName, ticketNumber, qrCodePath)]);

    // Read the HTML file for the registration success message
    const successPath = path.join(__dirname, '..', 'templates', 'registration-success.html');
    const successContent = fs.readFileSync(successPath, 'utf8');

    // Encode the QR code image as base64
    const qrCodeImageBase64 = fs.readFileSync(qrCodePath, { encoding: 'base64' });

    // Replace placeholders with dynamic content
    const renderedSuccessMessage = successContent
      .replace('{{name}}', name)
      .replace('{{eventName}}', event.eventName)
      .replace('{{email}}', email)
      .replace('{{ticketNumber}}', ticketNumber)
      .replace('{{qrCodeImageBase64}}', qrCodeImageBase64);

    // Send the rendered success message as HTML response
    res.send(renderedSuccessMessage);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = router;
