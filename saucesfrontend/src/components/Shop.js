import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Stripe from 'stripe'
import { toast } from 'react-toastify'
import axios from 'axios'

toast.configure()

const stripe = Stripe('pk_test_51HTvCaChrB4Xa688LL51l1lAOEwAnVu5yDb5xv8D0XcXEh0jq4VDYzRoJZk70kHjEAOQDWd0xUM1gM7iXlEwHEKX004bcYqKLz');

const Shop = () => {
    const [sauce, setSauce] = useState('Original Honey BBQ')
    const [price, setPrice] = useState(795)
    const [quantity, setQuantity] = useState(1)
    const [focus, setFocus] = useState(true)

    const quantitySet = (event) => {
        let num = event.target.value
        if (num >= 1) {
            setQuantity(num)
            newPrice(num)
        }
    }
    const newPrice = (num) => {
        setPrice(795 * num)
    }

    const checkoutButton = () => {
        stripe.redirectToCheckout({
            lineItems: [{
                // Define the product and price in the Dashboard first, and use the price
                // ID in your client-side code.
                price,
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

    const sauceChoice = (event) => {
        setSauce(event.target.value)
    }
    return (
        <div className="container">
            <h3>Preachers BBQ Sauce</h3>
            <form>
                <input type="number" value={quantity} onChange={quantitySet} />
                <select value={sauce} onChange={sauceChoice}>
                    <option value='Original Honey BBQ'>Original Honey BBQ</option>
                    <option value="Smokey Honey BBQ">Smokey Honey BBQ</option>
                </select>
            </form>

            <p>Price ${price / 100}</p>
            {(sauce === 'Original Honey BBQ' || sauce === "Smokey Honey BBQ") ?
                <StripeCheckout
                    onClick={checkoutButton}
                    stripeKey="pk_test_51HTvCaChrB4Xa688LL51l1lAOEwAnVu5yDb5xv8D0XcXEh0jq4VDYzRoJZk70kHjEAOQDWd0xUM1gM7iXlEwHEKX004bcYqKLz"
                    token={handleToken}
                    billingAddress
                    shippingAddress
                    amount={price}
                /> : null}
        </div>
    )
}

export default Shop
