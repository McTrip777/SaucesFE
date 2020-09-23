import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from 'react-toastify'

toast.configure()

const App = () => {

  const [sauce, setSauce] = useState('Original')
  const [price, setPrice] = useState(795)
  const [quantity, setQuantity] = useState(1)

  async function handleToken(token, addresses) {
    const response = await axios.post('http://localhost:5000/checkout', {
      token,
      sauce,
      price,
      quantity
    })
    const { status } = response.data
    if (status === 'success') {
      toast('Success', { type: "success" })
    }
  }

  return (
    <div className="container">
      <h3>Preachers BBQ Sauce</h3>
      <p>{sauce} Sauce - ${price / 100}</p>
      <StripeCheckout
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