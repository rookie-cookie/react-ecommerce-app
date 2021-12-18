import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  //stripe wants the value in cents
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51K837MLav5EEqiNNmUZHFtRq90ddcvKbHqc3J2fW6EWU56EeirPdgKM5oKGmdrFMwMWNKj0VU6uqdlipNfIwA8lK007B9KbkJM';

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
  }

  return (
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      descriptions={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )

}

export default StripeCheckoutButton;