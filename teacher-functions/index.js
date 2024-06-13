const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
admin.initializeApp(functions.config().firebase);
const { getFunctions } = require('firebase-admin/functions');
const db = admin.firestore();
var moment = require('moment');

exports.registerTeacher = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var teacherData = requestData.teacher;
    var password = requestData.password;

    const teacherRef = db.collection('TeachersDetails');
    const ticketIDsnapshot = await teacherRef
      .where('teacher_emailaddress', '==', teacherData['teacher_emailaddress'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateTeacherData();
    } else {
      return (data = {
        status: false,
        data: '',
        message:
          'Email Address Already Exists, ' +
          teacherData['teacher_emailaddress'],
      });
    }

    function updateTeacherData() {
      var docref = teacherRef.doc(teacherData['teacher_uid']);
      batch.set(docref, teacherData, { merge: true });

      return getAuth()
        .createUser({
          uid: teacherData['teacher_uid'],
          email: teacherData['teacher_emailaddress'],
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

exports.addorUpdateTeacherData = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();
    var teacherconetntData = requestData.teachercontent;
    var log = requestData.log;
    const teachercontentRef = db.collection('TeacherContentDetails');
    const ticketIDsnapshot = await teachercontentRef
      .where(
        'Teachercontent_board',
        '==',
        teacherconetntData['Teachercontent_board']
      )
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateTeacherContentData();
    } else {
      var hasValidData = true;
      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== teacherconetntData['Teachercontent_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE content : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updateTeacherContentData();
      } else {
        return (data = {
          status: false,
          data: '',
          message:
            'content Already Exists, ' +
            teacherconetntData['Teachercontent_board'],
        });
      }
    }

    function updateTeacherContentData() {
      var docref = teachercontentRef.doc(
        teacherconetntData['Teachercontent_uid']
      );
      batch.set(
        docref,
        {
          ...teacherconetntData,
          Teachercontent_logs: admin.firestore.FieldValue.arrayUnion(log),
        },
        { merge: true }
      );
      batch.commit();
      return (data = {
        status: true,
        data: '',
        message: 'OK',
      });
    }
  }
);
