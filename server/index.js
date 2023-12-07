// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const db = require('./db');
const registrationRoutes = require('./routes/registrationRoutes');
const waitingListRoutes=require('./routes/waitingListRoutes');

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());

// Use eventRoutes from the separate file
app.use('/api', eventRoutes);
app.use('/register', registrationRoutes);
app.use('/waitinglist', waitingListRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
