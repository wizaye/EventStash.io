const express = require('express');
const WaitingList = require('../models/WaitingListModel');
const userSchema= require('../models/UserModel');
const sendConfirmationEmail = require('../middlewares/sendConfirmationEmail');

const uuid = require('uuid');
const qrCode = require('qrcode');
const fs=require('fs');
const path = require('path');


const router = express.Router();

router.get('/getwaitingList/:eventId',  async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // You may want to add additional validation or checks on the eventId

    const waitingLists = await WaitingList.find({ eventId });
    res.json(waitingLists);
  } catch (error) {
    console.error('Error fetching waiting lists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//     try {
//       const waitingUserId = req.params.waitingUserId;
//       const decision = req.params.decision.toLowerCase(); // Convert decision to lowercase
  
//       const waitingUser = await WaitingList.findById(waitingUserId);
//       if (!waitingUser) {
//         return res.status(404).json({ message: 'Waiting list user not found' });
//       }
  
//       if (decision === 'accept') {
        
//         // Move user details to the users cluster
//         const newUser = new userSchema({
//           name: waitingUser.name,
//           email: waitingUser.email,
//           // Copy other fields as needed
//           eventId: waitingUser.eventId,
//           status: 'Accepted',
//         });
  
//         await newUser.save();
  
//         // Remove user from the waiting list
//         await waitingUser.deleteOne();
//         await sendConfirmationEmail(newUser.email, newUser.name, newUser.ticketNumber, newUser.qrCodePath);
//       } else if (decision === 'reject') {
//         // Remove user from the waiting list
//         await waitingUser.deleteOne();
//       } else {
//         return res.status(400).json({ message: 'Invalid decision' });
//       }
  
//       res.json({ message: 'Waiting list user processed successfully' });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
// });

router.post('/manageWaitingList/:waitingUserId/:decision', async (req, res) => {
  try {
    const waitingUserId = req.params.waitingUserId;
    const decision = req.params.decision.toLowerCase(); // Convert decision to lowercase

    const waitingUser = await WaitingList.findById(waitingUserId);
    if (!waitingUser) {
      return res.status(404).json({ message: 'Waiting list user not found' });
    }

    if (decision === 'accept') {
      // Move user details to the users cluster
      const ticketNumber = uuid.v4(); // Generate a unique ticket number

      const newUser = new userSchema({
        name: waitingUser.name,
        email: waitingUser.email,
        eventId: waitingUser.eventId,
        eventName:waitingUser.eventName,
        status: 'Accepted',
        ticketNumber: ticketNumber, // Assign the generated ticket number
      });

      await newUser.save();

      // Remove user from the waiting list
      await waitingUser.deleteOne();

      // Generate QR code
      const qrCodeData = `Event Name: ${newUser.eventName}\n` +
        `User Name: ${newUser.name}\n` +
        `User Email: ${newUser.email}\n` +
        `Ticket Number: ${newUser.ticketNumber}\n`;

      const qrCodeDir = path.join(__dirname, 'qr-codes');
      if (!fs.existsSync(qrCodeDir)) {
        fs.mkdirSync(qrCodeDir);
      }

      const qrCodePath = path.join(qrCodeDir, `${newUser._id}.png`);
      await qrCode.toFile(qrCodePath, qrCodeData);

      // Save the QR code path to the user schema
      newUser.qrCodePath = qrCodePath;
      await newUser.save();

      // Send confirmation email with QR code
      await sendConfirmationEmail(newUser.email,newUser.name ,newUser.eventName, newUser.ticketNumber, newUser.qrCodePath);
    } else if (decision === 'reject') {
      // Remove user from the waiting list
      await waitingUser.deleteOne();
    } else {
      return res.status(400).json({ message: 'Invalid decision' });
    }

    res.json({ message: 'Waiting list user processed successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
