const mongoose = require('mongoose');
const waitingListSchema = new mongoose.Schema({
    name: String,
    email: String,
    // Add other fields as needed
    eventId: String,
    eventName:String
  });
  
  const waitingList = mongoose.model('WaitingList', waitingListSchema);
  module.exports=waitingList;