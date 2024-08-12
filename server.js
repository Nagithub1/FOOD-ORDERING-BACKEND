const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('sk_test_4TbuOe7CRe0s8XjCh2S8sf9D'); // Default Stripe test key

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/order', async (req, res) => {
    const { items, email, payment_method } = req.body;

    try {
        // Create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateAmount(items), // Implement calculateAmount function
            currency: 'usd',
            payment_method,
            confirmation_method: 'manual',
            confirm: true,
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    const handleOrder = async (event) => {
      event.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
      });
  
      if (!error) {
          try {
              const { data } = await axios.post('http://localhost:5000/api/order', {
                  items,
                  email,
                  payment_method: paymentMethod.id,
              });
              console.log('Order successful', data);
              alert('Order placed successfully!');
          } catch (error) {
              console.error('Error placing order', error.response?.data || error);
              alert(`Error placing order: ${error.response?.data?.error || error.message}`);
          }
      } else {
          console.error('Stripe error:', error);
          alert(`Payment error: ${error.message}`);
      }

  };
  app.post('/api/order', async (req, res) => {
    console.log('Received order request:', req.body);
    // Your existing code
});

  
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
