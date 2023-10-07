const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const stripe = require("stripe")(process.env.SECRET_KEY);
// console.log(stripe)

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("heelo nura"));
app.post("/payments/create", async (req, res) => {
  try {
    const total = req.query.total;
    console.log(`payement reques this amount`, total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total),
      currency: "usd",
    });
    // console.log(paymentIntent)

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("someting went to wrong", error.message);
  }
});

app.listen(3000, (error) => {
  if (!error) {
    console.log("web server listening on port 3000");
  }
});
// exports.api = functions.https.onRequest(app)
