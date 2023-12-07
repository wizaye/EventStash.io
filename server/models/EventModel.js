// models/EventModel.js

const mongoose = require('mongoose');


const Event = mongoose.model('Event', {
  _id: String,
  eventName: String,
  description: String,
  eventBanner: String,
  eventMode: String,
  expectedAudience: Number,
  ticketPrice: Number,
  techFocus: String,
  agenda: String,
  sponsorName: String,
  sponsorLink: String,
  hostName: String,
  eventDate: String,
  contactEmail: String,
  country: String,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  socialLink: String,
  hostPermission: String,
  targetAudience: Number,
  userEmail: String,
  registrationLink: String,
  ticketNumber: String, // New field for storing the ticket number
});

module.exports = Event;
