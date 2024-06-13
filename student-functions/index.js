const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
var moment = require('moment');
const Razorpay = require('razorpay');
const cors = require('cors')({ origin: true });
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const razorpay = new Razorpay({
  key_id: 'rzp_test_HVZCFfDTz5rdFC',
  key_secret: 'MW4HqApp2RICQ9sV7fihqI6o',
});

exports.testRazorpayIntegration = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { orderDetails, userDetails } = req.body;

      // Check if orderDetails is defined and has an 'amount' property
      if (!orderDetails || !orderDetails.amount) {
        console.error('Invalid order details:', orderDetails);
        res.status(400).send('Invalid order details');
        return;
      }

      const amount = orderDetails.amount * 100; // Convert amount to paisa
      const options = {
        amount: amount,
        currency: 'INR',
        receipt: uuidv4(), // Generate a unique receipt ID
      };

      const order = await razorpay.orders.create(options);

      const orderData = {
        amount: orderDetails.amount,
        orderId: order.id,
        currency: order.currency,
        status: 'created',
        receiptId: options.receipt,
        userDetails, // Store user details
      };

      await admin.firestore().collection('OrdersDetails').add(orderData);

      res.status(200).json(orderData);
    } catch (error) {
      console.error('Error in creating order:', error);
      res.status(500).send('Error in creating order');
    }
  });
});

// Firestore collection to store processed event IDs
const processedEventsCollection = admin
  .firestore()
  .collection('processedEvents');

// Middleware to check for duplicate events
const checkDuplicateEvent = async (req, res, next) => {
  const eventId = req.headers['x-razorpay-event-id'];

  try {
    const docSnapshot = await processedEventsCollection.doc(eventId).get();
    if (docSnapshot.exists) {
      // Duplicate event, skip processing
      console.log(`Duplicate event with ID ${eventId}. Skipping processing.`);
      res.status(200).send();
    } else {
      // Not a duplicate, continue with the next middleware or route handler
      await processedEventsCollection
        .doc(eventId)
        .set({ processedAt: admin.firestore.FieldValue.serverTimestamp() });
      next();
    }
  } catch (error) {
    console.error('Error checking for duplicate event:', error);
    res.status(500).send('Error checking for duplicate event');
  }
};

// Webhook handling function
exports.handleRazorpayWebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Use the middleware to check for duplicate events
    checkDuplicateEvent(req, res, async () => {
      try {
        const event = req.body;
        const { type, payload } = event;

        if (type === 'payment.authorized') {
          // Handle authorized payment
          console.log('Payment authorized:', payload);
          // Update Firestore document with payment details
          const orderDocumentPath = `OrdersDetails/${payload.order.id}`;
          const orderDocRef = admin.firestore().doc(orderDocumentPath);
          await orderDocRef.update({ status: 'authorized' }, { merge: true });
        } else if (type === 'payment.failed') {
          // Handle failed payment
          console.log('Payment failed:', payload);
          // Update Firestore document with payment failure details
          const orderDocumentPath = `OrdersDetails/${payload.order.id}`;
          const orderDocRef = admin.firestore().doc(orderDocumentPath);
          await orderDocRef.update({ status: 'failed' }, { merge: true });
        }

        res.status(200).send('Webhook received');
      } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send('Error handling webhook');
      }
    });
  });
});

exports.registerStudent = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var studentData = requestData.student;
    var password = requestData.password;

    const studentRef = db.collection('StudentDetails');
    const ticketIDsnapshot = await studentRef
      .where('student_emailaddress', '==', studentData['student_emailaddress'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateStudentData();
    } else {
      return (data = {
        status: false,
        data: '',
        message:
          'Email Address Already Exists, ' +
          studentData['student_emailaddress'],
      });
    }

    function updateStudentData() {
      var docref = studentRef.doc(studentData['student_uid']);
      batch.set(docref, studentData, { merge: true });
      console.log(docref);

      return getAuth()
        .createUser({
          uid: studentData['student_uid'],
          email: studentData['student_emailaddress'],
          password,
          emailVerified: false,
        })
        .then((userRecord) => {
          console.log('Successfully created new user:', userRecord.uid);
          batch.commit();
          return (data = {
            status: true,
            data: '',
            message: 'OK',
          });
        })
        .catch((error) => {
          console.log('Error creating new user:', error);
          return (data = {
            status: false,
            data: '',
            message: error.message,
          });
        });
    }
  }
);
