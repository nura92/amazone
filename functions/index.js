const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const stripe = require("stripe")(process.env.SECRET_KEY);

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("heelo nura"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log(`payement reques this amount`, total);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total),
      currency: "usd",
    });

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
