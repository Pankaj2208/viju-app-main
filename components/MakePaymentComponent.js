// import { useState } from 'react';

// // Function to load a script dynamically
// async function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }

// const __DEV__ = process.env.NODE_ENV === 'development';

// function MakePaymentComponent() {
//   const [name, setName] = useState('Mehul');

//   // Function to handle payment with Razorpay
//   async function displayRazorpay() {
//     // Load Razorpay script
//     const res = await loadScript(
//       'https://checkout.razorpay.com/v1/checkout.js'
//     );

//     // Check if script loaded successfully
//     if (!res) {
//       alert('Razorpay SDK failed to load. Are you online?');
//       return;
//     }

//     try {
//       // Fetch data from backend for Razorpay payment
//       const response = await fetch('/razorpay', { method: 'POST' });
//       const data = await response.json();

//       console.log(data);

//       // Configure options for Razorpay payment
//       const options = {
//         key: __DEV__ ? 'rzp_test_uGoq5ABJztRAhk' : 'PRODUCTION_KEY',
//         currency: data.currency,
//         amount: data.amount.toString(),
//         order_id: data.id,
//         name: 'Donation',
//         description: 'Thank you for nothing. Please give us some money',
//         image: 'http://localhost:1337/logo.svg',
//         handler: function (response) {
//           alert(response.razorpay_payment_id);
//           alert(response.razorpay_order_id);
//           alert(response.razorpay_signature);
//         },
//         prefill: {
//           name,
//           email: 'sdfdsjfh2@ndsfdf.com',
//           phone_number: '9899999999',
//         },
//       };

//       // Create Razorpay instance and open payment modal
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('Error fetching Razorpay data:', error);
//       alert('Error fetching Razorpay data. Please try again later.');
//     }
//   }

//   return (
//     <div className="container">
//       <header className="mt-5 text-center">
//         <img src="/logo.svg" className="App-logo" alt="logo" />
//         <p>
//           Edit <code>pages/payment.js</code> and save to reload.
//         </p>
//         <button className="btn btn-primary" onClick={displayRazorpay}>
//           Donate $5
//         </button>
//       </header>
//     </div>
//   );
// }

// export default MakePaymentComponent;
