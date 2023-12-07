const express = require('express');
const uuid = require('uuid');
const Event = require('../models/EventModel');
const upload = require('../middlewares/uploadMiddleware');
const xlsx=require('xlsx');
require('dotenv').config;
const userSchema= require('../models/UserModel'); 
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/create-event', upload.single('eventBanner'), async (req, res) => {
  
  try {
    const eventId = uuid.v4();
    const registrationLink = `${process.env.SERVER_URL}/register/${eventId}`;

    const newEvent = new Event({
      _id: eventId,
      eventName: req.body.eventName,
      description: req.body.description,
      eventBanner: req.file.buffer.toString('base64'),
      eventMode: req.body.eventMode,
      expectedAudience: req.body.expectedAudience,
      ticketPrice: req.body.ticketPrice,
      techFocus: req.body.techFocus,
      agenda: req.body.agenda,
      sponsorName: req.body.sponsorName,
      sponsorLink: req.body.sponsorLink,
      hostName: req.body.hostName,
      eventDate: req.body.eventDate,
      contactEmail: req.body.contactEmail,
      country: req.body.country,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      socialLink: req.body.socialLink,
      hostPermission: req.body.hostPermission,
      targetAudience: req.body.targetAudience,
      userEmail: req.body.userEmail,
      registrationLink: registrationLink,
    });

    if (req.body.userEmail) {
      newEvent.userEmail = req.body.userEmail;
    }


    await newEvent.save();

    

    res.status(201).json({ message: 'Event created successfully!', registrationLink });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event.' });
  }
});

router.post('/get-events', async (req, res) => {
  try {
    const { userEmail } = req.body;

    const events = await Event.find({ userEmail });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/delete-event/:eventId', async (req, res) => {
    try {
      const eventId = req.params.eventId;
  
      // Check if the event exists
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Event exists, proceed with deletion
      await Event.deleteOne({ _id: eventId });
  
      res.status(200).json({ message: 'Event deleted successfully!' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Failed to delete event.' });
    }
});

// router.get('/download-user-data/:eventId', async (req, res) => {
//   try {
//     const eventId = req.params.eventId;

//     // Fetch user data based on eventId from your database
//     const userData = await userSchema.find({ eventId: eventId });

//     // Check if any data is found
//     if (userData.length === 0) {
//       return res.status(404).json({ error: 'No data found for the provided eventId' });
//     }

//     // Create an Excel workbook
//     const workbook = xlsx.utils.book_new();

//     // Create a sanitized version of userData without internal fields
//     const sanitizedUserData = userData.map(user => {
//       const { __, $isNew, _doc, ...sanitizedUser } = user.toObject();
//       return sanitizedUser;
//     });

//     // Extract relevant fields for the Excel sheet
//     const dataForExcel = sanitizedUserData.map(user => ({
//       name: user.name,
//       email: user.email,
//       ticketNumber: user.ticketNumber,
//       eventName: user.eventName,
//       eventId: user.eventId,
//     }));

//     // Create a worksheet with the extracted data
//     const worksheet = xlsx.utils.json_to_sheet(dataForExcel);
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'User Data');

//     // Save the Excel workbook to a file
//     const excelFileName = `user_data_event_${userData[0].eventName}.xlsx`;
//     const excelFilePath = path.join(__dirname, excelFileName);

//     // Write the file directly without checking if it exists
//     xlsx.writeFile(workbook, excelFilePath);

//     // Set response headers for file download
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', `attachment; filename=${excelFileName}`);

//     // Send the file to the client
//     res.sendFile(excelFilePath, (err) => {
//       // Cleanup: Delete the file after it has been sent
//       fs.unlinkSync(excelFilePath);
//       if (err) {
//         console.error('Error sending file:', err);
//       }
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
router.get('/download-user-data/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Fetch user data based on eventId from your database
    const userData = await userSchema.find({ eventId: eventId });

    // Check if any data is found
    if (userData.length === 0) {
      return res.status(404).json({ error: 'No data found for the provided eventId' });
    }

    // Create a sanitized version of userData without internal fields
    const sanitizedUserData = userData.map(user => {
      const { __, $isNew, _doc, ...sanitizedUser } = user.toObject();
      return sanitizedUser;
    });

    // Extract relevant fields for the Excel sheet
    const dataForExcel = sanitizedUserData.map(user => ({
      name: user.name,
      email: user.email,
      ticketNumber: user.ticketNumber,
      eventName: user.eventName,
      eventId: user.eventId,
    }));

    // Create an Excel workbook
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(dataForExcel);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'User Data');

    // Set response headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${excelFileName}`);

    // Stream the file to the client
    xlsx.write(res, workbook);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.use('/register', registrationRoutes);
module.exports = router;
