import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import * as utility from '../../libraries/utility';

const Paypage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    utility.hideloading();
    const fetchOrderDetails = async (selectedPlanPrice) => {
      try {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const requestBody = {
          orderDetails: {
            amount: selectedPlanPrice, // Use the selected plan's price
          },
          userDetails: userDetails,
        };

        const response = await fetch(
          'https://us-central1-vijuedtech.cloudfunctions.net/testRazorpayIntegration',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        console.log('Order details:', data); // Debugging line
        setOrderDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details. Please try again later.');
        setLoading(false);
      }
    };
    fetchOrderDetails();
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully'); // Debugging line
      setLoading(false);
    };
    script.onerror = () => {
      console.error('Error loading Razorpay script'); // Debugging line
      setLoading(false);
   };
    document.body.appendChild(script);
    const plans = [
      {
        name: 'Premium',
        price: 199,
        description: 'Access to all courses and premium content',
        features: [
          'Unlimited access to all courses',
          'Exclusive access to premium content',
          'Personalized learning recommendations',
          'Interactive quizzes and assignments',
        ],
      },
      {
        name: 'Gold',
        price: 99,
        description: 'Access to premium courses and limited content',
        features: [
          'Access to premium courses',
          'Limited access to premium content',
          'Interactive quizzes and assignments',
          'Access to expert instructors',
          'Community support',
        ],
      },
      {
        name: 'Silver',
        price: 49,
        description: 'Access to basic courses and limited content',
        features: [
          'Access to basic courses',
          'Limited access to premium content',
          'Interactive quizzes and assignments',
          'Community support',
          'Progress tracking',
        ],
      },
    ];

    const subscriptionIDs = plans.reduce((acc, plan, index) => {
      acc[plan.name.toLowerCase()] = `00${index + 1}`;
      return acc;
    }, {});

    const createSubscriptionPlans = (plans) => {
      const subscriptions = plans.map((plan) => ({
        id: `${plan.name.toLowerCase()}-${
          subscriptionIDs[plan.name.toLowerCase()]
        }`,
        ...plan, // Include the rest of the plan details
      }));
      console.log(subscriptions.map((subscription) => subscription.id));
      setSubscriptionPlans(subscriptions);
    };
    createSubscriptionPlans(plans);
    return () => {
      setSubscriptionPlans([]);
    };
  }, []);

  const handlePayment = (selectedPlan) => {
    if (!orderDetails) {
      alert('Order details not available. Please try again later.');
      return;
    }
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: selectedPlan.price * 100,
      currency: 'INR',
      name: 'Apporbis Technologies Pvt Ltd',
      description: 'Subscription Plan',
      order_id: orderDetails.orderId,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.number,
      },
      notes: {
        address:
          'A-305,Space Olympia,near Garkheda Stadium,Sutgirni chauk,Sambhajinagar',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  if (loading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-fluid">
      <Header title={'Home'} />
      <div className="row">
        <div className="col-md-2 d-none d-md-block">
          <Sidebar />
        </div>
        <div
          className="col-md-9 d-flex justify-content-center align-items-center"
          style={{ marginTop: '15vh' }}
        >
          <div
            className="subscription-plans-container"
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            <h2
              style={{
                textAlign: 'center',
                marginBottom: '5vh',
                fontSize: '2.5rem',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Choose Your Subscription Plan
            </h2>
            <div
              className="row justify-content-center"
              style={{ width: '100%', padding: '0 15px' }}
            >
              {subscriptionPlans.map((plan, index) => (
                <div key={index} className="col-md-4 col-sm-6 col-12">
                  <div
                    className="card mb-4"
                    style={{
                      height: '400px',
                      position: 'relative',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div className="card-body">
                      <h1
                        className="card-title"
                        style={{ textAlign: 'center' }}
                      >
                        {plan.name}
                      </h1>
                      <h6 className="card-text" style={{ textAlign: 'center' }}>
                        {plan.description}
                      </h6>
                      <p
                        style={{
                          marginBottom: '5px',
                          fontSize: '30px',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}
                      >
                        ₹ {plan.price}
                        <span style={{ fontSize: '12px', textAlign: 'center' }}>
                          /yearly
                        </span>{' '}
                      </p>
                      {plan.features &&
                        plan.features.map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              margin: '10px 0',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <FaCheck
                              style={{ color: '#5356FF', marginRight: '5px' }}
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                    </div>
                    <div
                      className="card-footer d-flex justify-content-center align-items-center"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: '40px',
                      }}
                    >
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary center-button"
                          style={{
                            backgroundColor: '#5356FF',
                            color: 'white',
                            border: 'none',
                            fontSize: '15px',
                          }}
                          onClick={() => handlePayment(plan)} // Correctly passing plan.price
                        >
                          Choose Plan
                        </button>
                      </div>
                    </div>
                    {index === 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#F37254',
                          color: 'white',
                          padding: '5px 10px',
                          fontSize: '14px',
                          textAlign: 'center',
                          zIndex: 1,
                        }}
                      >
                        Popular Plan
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paypage;
export async function getStaticProps() {
  return {
    props: { module: 'STUDENTHOME', onlyAdminAccess: false },
  };
}
