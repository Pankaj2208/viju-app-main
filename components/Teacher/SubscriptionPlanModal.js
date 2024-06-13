import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const SubscriptionPlanModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <motion.div
        initial={{ opacity: 0, y: "-50%", rotate: 360 }}
        animate={{ opacity: show ? 1 : 0, y: show ? "0%" : "-50%", rotate: show ? 0 : 360 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
      >
        <Modal.Header closeButton style={{ cursor: 'pointer', borderBottom: 'none', textAlign: 'center' }}>
          <Modal.Title style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
            <motion.div
              initial={{ opacity: 0, y: "-20px" }}
              animate={{ opacity: show ? 1 : 0, y: show ? "0px" : "-20px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FontAwesomeIcon icon={faMoneyBill} className="mr-2" style={{ fontSize: '32px', color: '#007bff' }} />
            </motion.div>
            Subscription Plans
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f8f9fa' }}>
          <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
            Unlock exclusive features with our premium subscription plans!
          </p>
          <Button variant="primary" onClick={onHide} style={{ cursor: 'pointer', borderRadius: '25px', fontSize: '18px', fontWeight: 'bold', padding: '12px 30px' }}>
            Subscribe Now
          </Button>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none', textAlign: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variant="secondary"
            onClick={onHide}
            style={{ cursor: 'pointer', transition: 'transform 0.3s ease', borderRadius: '25px', fontSize: '16px', fontWeight: 'bold', padding: '10px 20px' }}
          >
            Close
          </motion.button>
        </Modal.Footer>
      </motion.div>
    </Modal>
  );
};

export default SubscriptionPlanModal;
