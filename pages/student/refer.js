'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import * as utility from '../../libraries/utility';

import {
  FaCheckCircle,
  FaInfoCircle,
  FaThumbsUp,
  FaTimes,
} from 'react-icons/fa';
var Promise = require('promise');


const ReferralCode = () => {
  const [formData, setFormData] = useState({
    referralCode: '',
    friendContact: '',
    message: '',
  });
  const [showMessage, setShowMessage] = useState({
    success: false,
    error: false,
    errorMessage: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    utility.hideloading();
  });
  const handleReferClick = (e) => {
    e.preventDefault();

    const isValidContact = validateContact(formData.friendContact);
    if (!isValidContact) {
      setShowMessage({
        error: true,
        errorMessage: 'Please enter a valid email or mobile number.',
      });
      return;
    }

    // Simulating sending email or SMS
    sendReferralMessage(
      formData.referralCode,
      formData.friendContact,
      formData.message
    )
      .then(() => {
        setShowMessage({ success: true });
        setFormData({
          ...formData,
          friendContact: '',
          message: '',
        });

        setTimeout(() => {
          setShowMessage({ success: false });
        }, 3000);
      })
      .catch(() => {
        setShowMessage({
          error: true,
          errorMessage:
            'Failed to send referral message. Please try again later.',
        });
      });
  };

  const validateContact = (contact) => {
    // Basic validation for email or mobile number
    //const emailPattern = /\S+@\S+\.\S+/;
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobilePattern = /^[0-9]{10}$/;
    return emailPattern.test(contact) || mobilePattern.test(contact);
  };

  const sendReferralMessage = (code, contact, message) => {
    // Simulating sending email or SMS
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          `Referral message sent for code ${code} to ${contact} with message: ${message}`
        );
        resolve();
      }, 2000);
    }); 
  };

  const handleCloseError = () => {
    setShowMessage({ ...showMessage, error: false, errorMessage: '' });
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column align-items-center p-3"
      style={{
        background: 'linear-gradient(to bottom right, #74ebd5, #acb6e5)',
      }}
    >
      <div className="row">
        <div className="col-lg-6">
          <img
            src="https://img.freepik.com/free-vector/online-telecommuting-concept_23-2148479235.jpg?size=626&ext=jpg&ga=GA1.1.1882026082.1706351453&semt=ais"
            alt="Refer & Win Image"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-lg-6">
          <div className="py-5 text-dark">
            <h2
              className="display-5"
              style={{
                fontWeight: 'bold',
                color: '#1a237e',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Refer & WIN
            </h2>
            <p className="lead">
              <span style={{ color: '#e91e63', marginRight: '0.5rem' }}>
                🌟
              </span>
              Copy the Code to Refer your buddies and start learning on academy
              with your friends and earn exciting rewards
            </p>
            <form onSubmit={handleReferClick}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="friendContact"
                  placeholder="Friend's email or mobile number"
                  value={formData.friendContact}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="message"
                  placeholder="Message (optional)"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-outline-light"
                  style={{
                    backgroundColor: '#1a237e',
                    color: '#ffffff',
                    border: 'none',
                    transition: 'background-color 0.3s',
                  }}
                >
                  Refer
                </button>
              </div>
            </form>
            {showMessage.success && (
              <div
                className="alert alert-success d-flex align-items-center"
                role="alert"
              >
                <FaCheckCircle style={{ marginRight: '0.5rem' }} />
                Referral message sent! You earned rewards!{' '}
                <FaThumbsUp style={{ marginLeft: '0.5rem' }} />
              </div>
            )}
            {showMessage.error && (
              <div
                className="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <FaTimes
                  style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                  onClick={handleCloseError}
                />
                {showMessage.errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <div className="text-center mb-4">
          <h1 style={{ textDecoration: 'underline' }}>How It Works</h1>
        </div>
        <div className="row justify-content-center">
          <FeatureCard
            icon={<FaInfoCircle />}
            title="INVITE FRIENDS"
            description="Share your referral code with friends."
          />
          <FeatureCard
            icon={<FaCheckCircle />}
            title="COLLECT REWARDS"
            description="Earn rewards for each successful referral."
          />
          <FeatureCard
            icon={<FaThumbsUp />}
            title="REDEEM PRIZES"
            description="Redeem your rewards for exciting prizes."
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div
      className="card text-center p-4 shadow"
      style={{ borderRadius: '10px', backgroundColor: '#f8f9fa' }}
    >
      <div className="card-body" style={{ color: '#1a237e' }}>
        <h3>
          {icon} {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default ReferralCode;
export async function getStaticProps() {
  return {
    props: { module: 'STUDENTHOME', onlyAdminAccess: false },
  };
}