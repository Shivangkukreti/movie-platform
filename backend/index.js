const express = require('express');
//const express=require('express')
//const router=express.Router()  paste in the router pages
//module.exports=router
const app = express();
const cors = require('cors');
require('dotenv').config();
const { clerkMiddleware } = require('@clerk/express');
// const clerkweb = require('xyz'); 
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
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

app.get('/', (req, res) => {
  res.send('working');
});

// app.post('/webhooks', clerkweb); // write and require the file first
