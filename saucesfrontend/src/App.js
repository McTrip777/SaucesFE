import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Stripe from 'stripe'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import './styles/index.scss'
import Navbar from './components/Navbar'
import Home from './components/Home'


toast.configure()


const stripe = Stripe('pk_test_51HTvCaChrB4Xa688LL51l1lAOEwAnVu5yDb5xv8D0XcXEh0jq4VDYzRoJZk70kHjEAOQDWd0xUM1gM7iXlEwHEKX004bcYqKLz');

const App = () => {

  const [sauce, setSauce] = useState('Original')
  const [price, setPrice] = useState(795)
  const [quantity, setQuantity] = useState(1)

  const checkoutButton = () => {
    stripe.redirectToCheckout({
      lineItems: [{
        // Define the product and price in the Dashboard first, and use the price
        // ID in your client-side code.
        price: '{PRICE_ID}',
        quantity
      }],
      mode: 'payment',
      successUrl: 'http://localhost:5000/success',
      cancelUrl: 'http://localhost:5000/cancel'
    })
  };

  async function handleToken(token) {
    const response = await axios.post('http://localhost:5000/checkout', {
      token,
      sauce,
      price,
      quantity
    })
    const { status } = response.data
    if (status === 'success') {
      toast('Success', { type: "success" })
    } else {
      toast('Something went wrong', { type: "error" })
    }
  }

  return (
    <div className="container">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />

      </Switch>
      <h3>Preachers BBQ Sauce</h3>
      <p>{sauce} Sauce - ${price / 100}</p>
      <StripeCheckout
        onClick={checkoutButton}
        stripeKey="pk_test_51HTvCaChrB4Xa688LL51l1lAOEwAnVu5yDb5xv8D0XcXEh0jq4VDYzRoJZk70kHjEAOQDWd0xUM1gM7iXlEwHEKX004bcYqKLz"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={price}
      />
    </div>
  )
}
export default App