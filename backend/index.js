const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();
const { clerkMiddleware } = require('@clerk/express');
const mongoose = require('mongoose');
const { inngest, functions } = require('./utils/inngestfile');
const { serve } = require("inngest/express");


const uri = process.env.MONGO_URL; 
const PORT = process.env.PORT || 5000;

main().then(() => {
  console.log('done');
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(uri); 
}

app.use(cors());
app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(clerkMiddleware());
app.use(express.urlencoded({ extended: true }));


app.use('/api/show', require('./routes/showroute'));
app.use('/api/movies', require('./routes/movieroute'));
app.use('/api/booking', require('./routes/bookingroute'));
app.use('/api/user', require('./routes/userroute'));
app.use('/api/dashboard', require('./routes/dashroute'));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

app.get('/', (req, res) => {
  res.send('working');
});
