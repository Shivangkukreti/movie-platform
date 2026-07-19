const { Inngest, cron } = require("inngest");
const user=require("../models/user");
const booking = require("../models/booking");
const nodemailer=require('nodemailer')
// Create a client to send and receive events
const inngest = new Inngest({ id: "my-app" });




const syncusercreation = inngest.createFunction(
    {
    id: "sync-user-created",
    triggers: [{ event: "clerk/user.created" }],
  },
    async ({event})=>{
        const {id,email_addresses,first_name,last_name,profile_image_url}=event.data
        const userdata={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+" "+last_name,
            image:profile_image_url
        }
    await user.create(userdata)
    }
)

const syncuserdeletion = inngest.createFunction(
    {
    id: "sync-user-deleted",
    triggers: [{ event: "clerk/user.deleted" }],
  },
    async ({event})=>{
        const {id} = event.data
        await user.deleteOne({_id: id})
    }
)

const syncuserupdate = inngest.createFunction(
    {
    id: "sync-user-updated",
    triggers: [{ event: "clerk/user.updated" }],
  },
    async ({event})=>{
        const {id,email_addresses,first_name,last_name,profile_image_url}=event.data
        const userdata={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+" "+last_name,
            image:profile_image_url
        }
    await user.findByIdAndUpdate(id,userdata)
    }
)

const releaseBooking = inngest.createFunction(
    {
    id: "release-booking",
    triggers: [{ event: "app/checkpayment" }],
    },
    async ({event,step})=>{
        const aftertenminutes = new Date(Date.now() + 10 * 60 * 1000);
        await step.sleepUntil('wait-for-10-min',aftertenminutes) // 10 minutes ago
        await step.run('checkpayment', async()=>{
            const bookingId = event.data.bookingId;
            const book=await booking.findById(bookingId)
            if(book && !book.isPaid){
                // Release the booking
                const myshow=await show.findById(book.show)
                if(myshow){
                    book.bookedSeats.forEach((seat)=>{
                        delete myshow.occupiedSeats[seat]
                    })
                    myshow.markModified("occupiedSeats");
                    await myshow.save();
                    await booking.findByIdAndDelete(bookingId);
                }
            }
        });
    })



const deleteoldshowsandbookings = inngest.createFunction(
    {
    id: "delete-old-shows-and-bookings",
    triggers: [{ cron: "0 0 * * *" }],
    },
    
    async ({step})=>{
        const afteroneday = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await step.sleepUntil('wait-for-1-day',afteroneday) // 1 day ago    
    await step.run('deleteoldshowsandbookings', async()=>{
        const currentDate = new Date();
        const oldShows = await show.find({ showDateTime: { $lt: currentDate } });
        const oldBookings = await booking.find({ createdAt: { $lt: currentDate } });

        // Delete old shows and their associated bookings
        for (const show of oldShows) {
            await booking.deleteMany({ show: show._id });
            await show.deleteOne();
        }

        // Delete old bookings
        for (const booking of oldBookings) {
            await booking.deleteOne();
        }
    });
})


const sentemail = inngest.createFunction(
    
  {
    id: "send-email",
    triggers: [{ event: "app/send-email" }],
  },
  async ({ event }) => {
    console.log(event);
    
    const { bookingId } = event.data;

    const x = await booking.findById(bookingId).populate("user");

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mail = {
      from: process.env.SENDER_EMAIL,
      to: x.user.email,
      subject: "Booking confirmed",
      text: "Enjoy your show",
    };

    await transporter.sendMail(mail);
  }
);

const functions = [syncusercreation, syncuserdeletion, syncuserupdate, releaseBooking, deleteoldshowsandbookings, sentemail];

module.exports = { inngest, functions };