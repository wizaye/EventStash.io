const mongoose = require('mongoose');
const userSchema =mongoose.model('User',{
  name: String,
  email: String,
  ticketNumber: String,
  qrCodePath: String,
  eventName:String,
  eventId:String
});

module.exports = userSchema;