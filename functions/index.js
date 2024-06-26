const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const { getFunctions } = require('firebase-admin/functions');
const db = admin.firestore();
var moment = require('moment');
const cors = require('cors')({ origin: true });

exports.getLiveDate = functions.https.onCall((requestData, context) => {
  const search = ' ';
  const replacer = new RegExp(search, 'g');
  const date = moment().utcOffset('+05:30').format('MMM DD YYYY').toString();
  console.log('date : ' + date);
  const dateuid = date.replace(replacer, '').toLowerCase();

  return (data = {
    status: true,
    data: dateuid,
    message: 'OK',
  });
});

exports.getStudentDetails = functions.https.onRequest(async (req, res) => {
  
  try {
    if (req.method !== 'GET') {
      return res.status(405).send({ status: false, message: 'Invalid request method' });
    }

    const studentDetailsRef = db.collection('StudentDetails');
    const snapshot = await studentDetailsRef.get();

    if (snapshot.empty) {
      console.log('No documents found in StudentDetails collection');
      return res.status(404).send({ status: false, data: [], message: 'No student details found' });
    }

    let students = [];
    snapshot.forEach(doc => {
      let studentData = doc.data();
      studentData.id = doc.id;  // Add document ID to the student data

      students.push(studentData);
    });

    console.log(`Retrieved ${students.length} student(s)`);
    return res.status(200).send({ status: true, data: students, message: 'Student details retrieved successfully' });
  } catch (error) {
    console.error('Error getting student details:', error);
    return res.status(500).send({ status: false, data: [], message: 'Error getting student details' });
  }
});

exports.getTeacherDetails = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).send({ status: false, message: 'Invalid request method' });
    }

    const teacherDetailsRef = db.collection('TeachersDetails');
    const snapshot = await teacherDetailsRef.get();

    if (snapshot.empty) {
      console.log('No documents found in TeachersDetails collection');
      return res.status(404).send({ status: false, data: [], message: 'No teacher details found' });
    }

    let teachers = [];
    snapshot.forEach(doc => {
      let teacherData = doc.data();
      teacherData.id = doc.id;  // Add document ID to the teacher data
      teachers.push(teacherData);
    });

    console.log(`Retrieved ${teachers.length} teacher(s)`);
    return res.status(200).send({ status: true, data: teachers, message: 'Filtered teacher details retrieved successfully' });
  } catch (error) {
    console.error('Error getting teacher details:', error);
    return res.status(500).send({ status: false, data: [], message: 'Error getting teacher details' });
  }
});


exports.getEmployeeDetails = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).send({ status: false, message: 'Invalid request method' });
    }
    const employeeDetailsRef = db.collection('EmployeeDetails');
    const snapshot = await employeeDetailsRef;

    if (snapshot.empty) {
      console.log('No documents found in EmployeeDetails collection');
      return res.status(404).send({ status: false, data: [], message: 'No Admin details found' });
    }

    let employee = [];
    snapshot.forEach((doc) => {
      let employeeData = doc.data();
      employeeData.id = doc.id; // Add document ID to the employee data
      employee.push(employeeData);
    });
    console.log(`Retrieved ${employee.length} teacher(s)`);
    return res.status(200).send({ status: true, data: teachers, message: 'Teachers details retrieved successfully' });
  } catch (error) {
    console.error('Error getting employee details:', error);
    return res.status(500).send({ status: false, data: [], message: 'Error getting teachers details' });
  }
})


exports.addorUpdateEmployee = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var employeeData = requestData.employee;

    const employeeRef = db.collection('EmployeeDetails');
    const ticketIDsnapshot = await employeeRef
      .where('employee_code', '==', employeeData['employee_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateEmployeeData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== employeeData['employee_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE EMPLOYEE : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updateEmployeeData();
      } else {
        return (data = {
          status: false,
          data: '',
          message:
            'Employee Code Already Exists, ' + employeeData['employee_code'],
        });
      }
    }

    function updateEmployeeData() {
      var docref = employeeRef.doc(employeeData['employee_uid']);
      batch.set(docref, employeeData, { merge: true });
      batch.commit();
      return (data = {
        status: true,
        data: '',
        message: 'OK',
      });
    }
  }
);
// exports.addorUpdateteacher = functions.https.onCall(
//   async (requestData, context) => {
//     var batch = db.batch();

//     var teacherData = requestData.teacher;

//     const teacherRef = db.collection('TeachersDetails');
//     const ticketIDsnapshot = await teacherRef
//       .where('teacher_emailaddress', '==', teacherData['teacher_emailaddress'])
//       .limit(1)
//       .get();
//     if (ticketIDsnapshot.empty) {
//       return updateteacherData();
//     } else {
//       var hasValidData = true;

//       ticketIDsnapshot.forEach((doc) => {
//         if (doc.id !== teacherData['teacher_uid']) {
//           hasValidData = false;
//           console.log('FAILED TO CREATE teacher : ALREADY EXISTS');
//         } else {
//         }
//       });

//       if (hasValidData) {
//         return updateteacherData();
//       } else {
//         return (data = {
//           status: false,
//           data: '',
//           message:
//             'Teacher Email Address Already Exists, ' +
//             teacherData['teacher_emailaddress'],
//         });
//       }
//     }

//     function updateteacherData() {
//       var docref = teacherRef.doc(teacherData['teacher_uid']);
//       batch.set(docref, teacherData, { merge: true });
//       batch.commit();
//       return (data = {
//         status: true,
//         data: '',
//         message: 'OK',
//       });
//     }
//   }
// );

exports.loginCheckEmployee = functions.https.onCall(
  async (requestData, context) => {
    var employee_emailaddress = requestData.employee_emailaddress;
    const employeeRef = db.collection('EmployeeDetails');
    const ticketIDsnapshot = await employeeRef
      .where('employee_emailaddress', '==', employee_emailaddress)
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return (data = {
        status: false,
        data: '',
        message: 'Login ID Invalid, ' + employee_emailaddress,
      });
    } else {
      var employee = null;
      ticketIDsnapshot.forEach((doc) => {
        employee = doc.data();
      });

      return (data = {
        status: true,
        data: employee,
        message: '',
      });
    }
  }
);

// exports.loginCheckteacher = functions.https.onCall(
//   async (requestData, context) => {
//     var teacher_emailaddress = requestData.teacher_emailaddress;
//     const teacherRef = db.collection('TeachersDetails');
//     const ticketIDsnapshot = await teacherRef
//       .where('teacher_emailaddress', '==', teacher_emailaddress)
//       .limit(1)
//       .get();
//     if (ticketIDsnapshot.empty) {
//       return (data = {
//         status: false,
//         data: '',
//         message: 'Email Address Invalid, ' + teacher_emailaddress,
//       });
//     } else {
//       var teacher = null;
//       ticketIDsnapshot.forEach((doc) => {
//         teacher = doc.data();
//       });

//       return (data = {
//         status: true,
//         data: teacher,
//         message: '',
//       });
//     }
//   }
// );

exports.addorUpdateBoard = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();
    var boardData = requestData.board;
    var log = requestData.log;
    const boardRef = db.collection('BoardsDetails');
    const ticketIDsnapshot = await boardRef
      .where('board_code', '==', boardData['board_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateboardData();
    } else {
      var hasValidData = true;
      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== boardData['board_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE board : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updateboardData();
      } else {
        return (data = {
          status: false,
          data: '',
          message: 'Board Code Already Exists, ' + boardData['board_code'],
        });
      }
    }

    function updateboardData() {
      var docref = boardRef.doc(boardData['board_uid']);
      batch.set(
        docref,
        {
          ...boardData,
          board_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateCourse = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var courseData = requestData.course;
    var log = requestData.log;

    const courseRef = db.collection('CoursesDetails');
    const ticketIDsnapshot = await courseRef
      .where('course_code', '==', courseData['course_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updatecourseData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== courseData['course_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE course : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updatecourseData();
      } else {
        return (data = {
          status: false,
          data: '',
          message: 'Course Code Already Exists, ' + courseData['course_code'],
        });
      }
    }

    function updatecourseData() {
      var docref = courseRef.doc(courseData['course_uid']);
      batch.set(
        docref,
        {
          ...courseData,
          course_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateSubject = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var subjectData = requestData.subject;
    var log = requestData.log;

    const subjectRef = db.collection('SubjectsDetails');
    const ticketIDsnapshot = await subjectRef
      .where('subject_code', '==', subjectData['subject_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updatesubjectData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== subjectData['subject_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE subject : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updatesubjectData();
      } else {
        return (data = {
          status: false,
          data: '',
          message:
            'Subject Code Already Exists, ' + subjectData['subject_code'],
        });
      }
    }

    function updatesubjectData() {
      var docref = subjectRef.doc(subjectData['subject_uid']);
      batch.set(
        docref,
        {
          ...subjectData,
          subject_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateLesson = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var lessonData = requestData.lesson;
    var log = requestData.log;
    var isNewLesson = false;
    const lessonRef = db.collection('LessonsDetails');
    const ticketIDsnapshot = await lessonRef
      .where('lesson_code', '==', lessonData['lesson_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      isNewLesson = true;
      return updatelessonData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== lessonData['lesson_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE lesson : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updatelessonData();
      } else {
        return (data = {
          status: false,
          data: '',
          message: 'Lesson Code Already Exists, ' + lessonData['lesson_code'],
        });
      }
    }

    function updatelessonData() {
      if (isNewLesson) {
        const subjectRef = db.collection('SubjectsDetails');
        var subjectdocref = subjectRef.doc(lessonData['lesson_subject'].uid);

        batch.set(
          subjectdocref,
          {
            subject_lessonsuidarray: admin.firestore.FieldValue.arrayUnion(
              lessonData['lesson_uid']
            ),
            subject_lessons: {
              [lessonData['lesson_uid']]: {
                thumbnail_url: lessonData['lesson_thumbnailurl'],
                name: lessonData['lesson_name'],
                uid: lessonData['lesson_uid'],
                code: lessonData['lesson_code'],
              },
            },
          },
          { merge: true }
        );
      }

      var docref = lessonRef.doc(lessonData['lesson_uid']);
      batch.set(
        docref,
        {
          ...lessonData,
          lesson_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateQuestion = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var questionData = requestData.question;
    var log = requestData.log;

    const questionRef = db.collection('QuestionsDetails');
    const ticketIDsnapshot = await questionRef
      .where('question_code', '==', questionData['question_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updatequestionData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== questionData['question_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE question : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updatequestionData();
      } else {
        return (data = {
          status: false,
          data: '',
          message:
            'Question Code Already Exists, ' + questionData['question_code'],
        });
      }
    }

    function updatequestionData() {
      var docref = questionRef.doc(questionData['question_uid']);
      batch.set(
        docref,
        {
          ...questionData,
          question_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateAssessment = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var asmtData = requestData.asmt;
    var log = requestData.log;

    const asmtRef = db.collection('AssessmentDetails');
    const ticketIDsnapshot = await asmtRef
      .where('asmt_code', '==', asmtData['asmt_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateasmtData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== asmtData['asmt_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE asmt : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updateasmtData();
      } else {
        return (data = {
          status: false,
          data: '',
          message: 'Assessment Code Already Exists, ' + asmtData['asmt_code'],
        });
      }
    }
    function updateasmtData() {
      var docref = asmtRef.doc(asmtData['asmt_uid']);
      batch.set(
        docref,
        {
          ...asmtData,
          asmt_logs: admin.firestore.FieldValue.arrayUnion(log),
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
exports.submittedStudentAssessment = functions.firestore
  .document('StudentAssessments/{stdasmtuid}')
  .onUpdate(async (change, context) => {
    var newData = change.after.data();
    var oldData = change.before.data();
    const newStatus = newData.stdasmt_status;
    const oldStatus = oldData.stdasmt_status;
    const newactiveattemptuid = newData.stdasmt_activeattemptuid;
    const oldactiveattemptuid = oldData.stdasmt_activeattemptuid;
    if (newStatus === 'ACTIVE') {
      console.log('ASSESSMENT ACTIVE');
      return;
    }
    if (newStatus === 'COMPLETED' && newactiveattemptuid === '') {
      console.log('ASSESSMENT MARKS DONE');
      return;
    }
    if (newStatus === 'COMPLETED' && newactiveattemptuid !== '') {
      var attempt = newData['stdasmt_attempts'][newactiveattemptuid];
      var result = processAttemptgetResult(attempt);

      await db
        .collection('StudentAssessments')
        .doc(newData.stdasmt_uid)
        .set(
          {
            stdasmt_attempts: {
              [newactiveattemptuid]: { ...result },
            },
            stdasmt_activeattemptuid: '',
          },
          { merge: true }
        );
      console.log(result);
      console.log('RESULT UPDATED FOR ATTEMPT ' + newactiveattemptuid);
    }
  });

function processAttemptgetResult(attempt) {
  var correctAnswersScore = 0;
  var negativeAnswersScore = 0;
  var questions = attempt.questions;

  Object.keys(questions).map((key) => {
    var question = questions[key];
    var options = question.options;

    options.map((option) => {
      if (question.answerselected.includes(option.uid)) {
        if (option.iscorrect) {
          correctAnswersScore++;
        } else {
          if (attempt.hasnegativemarking) {
            negativeAnswersScore += question.negativemarks;
          }
        }
      }
    });
  });

  var scoredMarks = correctAnswersScore - negativeAnswersScore;
  return {
    scored: scoredMarks,
    negativemarks: negativeAnswersScore,
  };
}

exports.createStudentAssessmentAttempt = functions.https.onCall(
  async (requestData, context) => {
    var attemptuid = requestData.attemptuid;
    var asmtuid = requestData.asmtuid;
    var stduid = requestData.stduid;
    var student = requestData.student;
    var log = requestData.log;
    var questions = {};
    var asmtDetails = {};
    const stdAsmtRef = db.collection('AssessmentDetails').doc(asmtuid);
    const doc = await stdAsmtRef.get();
    if (!doc.exists) {
      return (data = {
        status: false,
        data: '',
        message: 'Assessment Unavailable',
      });
    } else {
      asmtDetails = doc.data();
    }

    var stdasmt_uid = asmtuid + '_' + stduid;
    var data = {
      stdasmt_student: student,
      stdasmt_uid: stdasmt_uid,
      stdasmt_asmtuid: asmtDetails['asmt_uid'],
      stdasmt_lesson: asmtDetails['asmt_lesson'],
      stdasmt_status: 'ACTIVE',
      stdasmt_subject: asmtDetails['asmt_subject'],
      stdasmt_course: asmtDetails['asmt_course'],
      stdasmt_code: asmtDetails['asmt_code'],
      stdasmt_title: asmtDetails['asmt_title'],
      stdasmt_generalinstructions:
        asmtDetails['asmt_generalinstructions'] || '',
      stdasmt_duration: asmtDetails['asmt_duration'],
      stdasmt_ispractice: asmtDetails['asmt_ispractice'],
      stdasmt_total: asmtDetails['asmt_total'],
      stdasmt_hasnegativemarking: asmtDetails['asmt_hasnegativemarking'],
      stdasmt_activeattemptuid: attemptuid,
      stdasmt_lastattemptuid: attemptuid,
      stdasmt_logs: admin.firestore.FieldValue.arrayUnion(log),
    };

    questions = doc.data().asmt_questions;

    if (Object.keys(questions).length === 0) {
      return (data = {
        status: false,
        data: '',
        message: 'Assessment Questions Unavailable.',
      });
    }

    for (let uid of Object.keys(questions)) {
      const quesRef = db.collection('QuestionsDetails').doc(uid);
      const quesDoc = await quesRef.get();
      questions[uid]['comprehension'] = quesDoc.data().question_comprehension;
      questions[uid]['imageurls'] = quesDoc.data().question_imageurls;
      questions[uid]['options'] = quesDoc.data().question_options;
      questions[uid]['text'] = quesDoc.data().question_text;
      questions[uid]['subtype'] = quesDoc.data().question_subtype;
      questions[uid]['scored'] = 0;
      questions[uid]['answerselected'] = [];
    }

    var attempt = {
      uid: attemptuid,
      status: 'ACTIVE',
      startdate: moment().utcOffset('+05:30').format('DD/MM/YYYY'),
      starttime: moment().utcOffset('+05:30').format('HH:mm:ss'),
      starttimestamp: moment().utcOffset('+05:30').unix(),
      enddate: '',
      endtime: '',
      endtimestamp: 0,
      questions,
      answeredquestions: {},
      total: asmtDetails['asmt_total'],
      scored: 0,
      negativemarks: 0,
      hasnegativemarking: asmtDetails['asmt_hasnegativemarking'],
    };

    data['stdasmt_attempts'] = { [attemptuid]: attempt };
    await db
      .collection('StudentAssessments')
      .doc(stdasmt_uid)
      .set(data, { merge: true });

    return (data = {
      status: true,
      data: stdasmt_uid,
      message: '',
    });
  }
);

exports.addorUpdateActivity = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var activityData = requestData.activity;
    var log = requestData.log;

    const activityRef = db.collection('ActivitysDetails');
    const ticketIDsnapshot = await activityRef
      .where('activity_code', '==', activityData['activity_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateactivityData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== activityData['activity_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE activity : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updateactivityData();
      } else {
        return (data = {
          status: false,
          data: '',
          message:
            'Activity Code Already Exists, ' + activityData['activity_code'],
        });
      }
    }

    function updateactivityData() {
      var docref = activityRef.doc(activityData['activity_uid']);
      batch.set(
        docref,
        {
          ...activityData,
          activity_logs: admin.firestore.FieldValue.arrayUnion(log),
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

// gk Start
exports.addorUpdateGkBoard = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();
    var boardData = requestData.board;
    var log = requestData.log;
    const boardRef = db.collection('GkBoardsDetails');
    const ticketIDsnapshot = await boardRef
      .where('Gkboard_code', '==', boardData['Gkboard_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateGKboardData();
    } else {
      var hasValidData = true;
      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== boardData['Gkboard_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE board : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updateGKboardData();
      } else {
        return (data = {
          status: false,
          data: '',
          message: 'Board Code Already Exists, ' + boardData['Gkboard_code'],
        });
      }
    }

    function updateGKboardData() {
      var docref = boardRef.doc(boardData['Gkboard_uid']);
      batch.set(
        docref,
        {
          ...boardData,
          board_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateGkCourse = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var courseData = requestData.course;
    var log = requestData.log;

    const courseRef = db.collection('GkCoursesDetails');
    const ticketIDsnapshot = await courseRef
      .where('Gkcourse_code', '==', courseData['Gkcourse_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateGkcourseData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== courseData['Gkcourse_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE course : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updateGkcourseData();
      } else {
        return (data = {
          status: false,
          data: '',
          message: 'Course Code Already Exists, ' + courseData['Gkcourse_code'],
        });
      }
    }

    function updateGkcourseData() {
      var docref = courseRef.doc(courseData['Gkcourse_uid']);
      batch.set(
        docref,
        {
          ...courseData,
          course_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateGKSubject = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var subjectData = requestData.subject;
    var log = requestData.log;

    const subjectRef = db.collection('GkSubjectsDetails');
    const ticketIDsnapshot = await subjectRef
      .where('Gksubject_code', '==', subjectData['Gksubject_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updatesubjectData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== subjectData['Gksubject_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE subject : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updatesubjectData();
      } else {
        return (data = {
          status: false,
          data: '',
          message:
            'Subject Code Already Exists, ' + subjectData['Gksubject_code'],
        });
      }
    }

    function updatesubjectData() {
      var docref = subjectRef.doc(subjectData['Gksubject_uid']);
      batch.set(
        docref,
        {
          ...subjectData,
          subject_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateGKLesson = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var lessonData = requestData.lesson;
    var log = requestData.log;
    var isNewLesson = false;
    const lessonRef = db.collection('GkLessonsDetails');
    const ticketIDsnapshot = await lessonRef
      .where('Gklesson_code', '==', lessonData['Gklesson_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      isNewLesson = true;
      return updatelessonData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== lessonData['Gklesson_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE lesson : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updatelessonData();
      } else {
        return (data = {
          status: false,
          data: '',
          message: 'Lesson Code Already Exists, ' + lessonData['Gklesson_code'],
        });
      }
    }

    function updatelessonData() {
      if (isNewLesson) {
        const subjectRef = db.collection('GkSubjectsDetails');
        var subjectdocref = subjectRef.doc(lessonData['Gklesson_subject'].uid);

        batch.set(
          subjectdocref,
          {
            subject_lessonsuidarray: admin.firestore.FieldValue.arrayUnion(
              lessonData['Gklesson_uid']
            ),
            subject_lessons: {
              [lessonData['Gklesson_uid']]: {
                thumbnail_url: lessonData['Gklesson_thumbnailurl'],
                name: lessonData['Gklesson_name'],
                uid: lessonData['Gklesson_uid'],
                code: lessonData['Gklesson_code'],
              },
            },
          },
          { merge: true }
        );
      }

      var docref = lessonRef.doc(lessonData['Gklesson_uid']);
      batch.set(
        docref,
        {
          ...lessonData,
          lesson_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateGkQuestion = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var questionData = requestData.question;
    var log = requestData.log;

    const questionRef = db.collection('GkQuestionsDetails');
    const ticketIDsnapshot = await questionRef
      .where('Gkquestion_code', '==', questionData['Gkquestion_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updatequestionData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== questionData['Gkquestion_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE question : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updatequestionData();
      } else {
        return (data = {
          status: false,
          data: '',
          message:
            'Question Code Already Exists, ' + questionData['Gkquestion_code'],
        });
      }
    }

    function updatequestionData() {
      var docref = questionRef.doc(questionData['Gkquestion_uid']);
      batch.set(
        docref,
        {
          ...questionData,
          question_logs: admin.firestore.FieldValue.arrayUnion(log),
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

exports.addorUpdateGkAssessment = functions.https.onCall(
  async (requestData, context) => {
    var batch = db.batch();

    var asmtData = requestData.asmt;
    var log = requestData.log;

    const asmtRef = db.collection('GkAssessmentDetails');
    const ticketIDsnapshot = await asmtRef
      .where('Gkasmt_code', '==', asmtData['Gkasmt_code'])
      .limit(1)
      .get();
    if (ticketIDsnapshot.empty) {
      return updateasmtData();
    } else {
      var hasValidData = true;

      ticketIDsnapshot.forEach((doc) => {
        if (doc.id !== asmtData['Gkasmt_uid']) {
          hasValidData = false;
          console.log('FAILED TO CREATE asmt : ALREADY EXISTS');
        } else {
        }
      });

      if (hasValidData) {
        return updateasmtData();
      } else {
        return (data = {
          status: false,
          data: '',
          message: 'Assessment Code Already Exists, ' + asmtData['Gkasmt_code'],
        });
      }
    }
    function updateasmtData() {
      var docref = asmtRef.doc(asmtData['Gkasmt_uid']);
      batch.set(
        docref,
        {
          ...asmtData,
          asmt_logs: admin.firestore.FieldValue.arrayUnion(log),
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

// GK end
