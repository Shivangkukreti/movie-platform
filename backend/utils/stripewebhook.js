const Stripe = require("stripe");
const booking = require("../models/booking");

const stripewebhook = async (req, res) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];

    console.log("========== STRIPE WEBHOOK ==========");

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        console.log("✅ Webhook verified");
        console.log("Event Type:", event.type);

    } catch (error) {
        console.log("❌ Signature Verification Failed");
        console.log(error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        switch (event.type) {

            case "payment_intent.succeeded": {

                console.log("✅ payment_intent.succeeded received");

                const paymentIntent = event.data.object;

                console.log("Payment Intent ID:", paymentIntent.id);

                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });

                console.log("Sessions Found:", sessionList.data.length);
                console.log(sessionList.data);

                const session = sessionList.data[0];

                if (!session) {
                    console.log("❌ No checkout session found");
                    return res.status(400).send("Session not found");
                }

                console.log("Checkout Session ID:", session.id);
                console.log("Metadata:", session.metadata);

                const bookingId = session.metadata?.bookingId;

                console.log("Booking ID:", bookingId);

                if (!bookingId) {
                    console.log("❌ bookingId missing in metadata");
                    return res.status(400).send("Booking ID missing");
                }

                const updatedBooking = await booking.findByIdAndUpdate(
                    bookingId,
                    {
                        isPaid: true,
                        paymentLink: "",
                    },
                    { new: true }
                );

                console.log("Updated Booking:");
                console.log(updatedBooking);

                if (!updatedBooking) {
                    console.log("❌ Booking not found in database");
                } else {
                    console.log("✅ Booking updated successfully");
                }

                break;
            }

            default:
                console.log("Unhandled Event:", event.type);
        }

        console.log("========== WEBHOOK FINISHED ==========");
        return res.status(200).json({ received: true });

    } catch (error) {
        console.log("❌ Internal Error");
        console.log(error);
        return res.status(400).send(error.message);
    }
};

module.exports = stripewebhook;