const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
admin.initializeApp(functions.config().firebase);
const { getFunctions } = require('firebase-admin/functions');
const db = admin.firestore();
var moment = require('moment');

exports.registerParent = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var parentData = requestData.parent;
    var password = requestData.password;

    const parentRef = db.collection('ParentDetails');
    const ticketIDsnapshot = await parentRef
      .where('parent_emailaddress', '==', parentData['parent_emailaddress'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateParentData();
    } else {
      return (data = {
        status: false,
        data: '',
        message:
          'Email Address Already Exists, ' + parentData['parent_emailaddress'],
      });
    }

    function updateParentData() {
      var docref = parentRef.doc(parentData['parent_uid']);
      batch.set(docref, parentData, { merge: true });

      return getAuth()
        .createUser({
          uid: parentData['parent_uid'],
          email: parentData['parent_emailaddress'],
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
