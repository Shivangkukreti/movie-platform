const Stripe = require("stripe");
const booking = require("../models/booking");
const { inngest } = require("./inngestfile");

const stripewebhook = async (req, res) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;

                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });

                const session = sessionList.data[0];

                if (!session) {
                    return res.status(400).send("Session not found");
                }

                const bookingId = session.metadata?.bookingId;

                if (!bookingId) {
                    return res.status(400).send("Booking ID missing");
                }

                await booking.findByIdAndUpdate(
                    bookingId,
                    {
                        isPaid: true,
                        paymentLink: "",
                    },
                    { new: true }
                );

               

                break;
            }

            default:
                break;
        }
 await inngest.send({
                    name: "app/send-email",
                    data: {
                        bookingId: bookingId,
                    },
                });
        return res.status(200).json({ received: true });
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = stripewebhook;