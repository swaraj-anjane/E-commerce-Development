const Stripe = require("stripe");

const stripe = new Stripe(process.env.SECRET_KEY); 

module.exports = stripe;