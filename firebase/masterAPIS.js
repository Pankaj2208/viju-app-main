import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebaseconfig';
const functions = getFunctions(app);

export const RequestLiveDate = async () => {
  const getLiveDate = httpsCallable(functions, 'getLiveDate');
  var data = getLiveDate()
    .then((result) => {
      console.log('DATE: ' + result.data);
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: 'na',
        message: error.message,
      });
    });

  return data;
};

export const getStudentDetails = async () => {
  const getStudentDetailsCallable = httpsCallable(functions, 'getStudentDetails');

  try {
    const result = await getStudentDetailsCallable();
    console.log('Student Details:', result.data);
    return {
      status: true,
      data: result.data, 
    };
  } catch (error) {
    console.error('Error fetching student details:', error);
    return {
      status: false,
      data: [],
      message: error.message,
    };
  }
};

export const getTeacherDetails = async () => {
  const getStudentDetailsCallable = httpsCallable(functions, 'getTeacherDetails');

  try {
    const result = await getStudentDetailsCallable();
    console.log('Teacher Details:', result.data);
    return {
      status: true,
      data: result.data, 
    };
  } catch (error) {
    console.error('Error fetching Teacher details:', error);
    return {
      status: false,
      data: [],
      message: error.message,
    };
  }
};

export const getEmployeeDetail = async () => {
  const getStudentDetailsCallable = httpsCallable(functions, 'getEmployeeDetails');

  try {
    const result = await getStudentDetailsCallable();
    console.log('Employee Details:', result.data);
    return {
      status: true,
      data: result.data, 
    };
  } catch (error) {
    console.error('Error fetching Employee details:', error);
    return {
      status: false,
      data: [],
      message: error.message,
    };
  }
};

const verifyUserToken = httpsCallable(functions, 'verifyUserToken');

export const RequestaddorUpdateEmployee = async (employeeData) => {
  const addorUpdateEmployee = httpsCallable(functions, 'addorUpdateEmployee');
  var data = addorUpdateEmployee({ employee: employeeData })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateBoard = async (board, log) => {
  const addorUpdateBoard = httpsCallable(functions, 'addorUpdateBoard');
  var data = addorUpdateBoard({
    board,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateActivity = async (activity, log) => {
  const addorUpdateActivity = httpsCallable(functions, 'addorUpdateActivity');
  var data = addorUpdateActivity({
    activity,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateCourse = async (course, log) => {
  const addorUpdateCourse = httpsCallable(functions, 'addorUpdateCourse');
  var data = addorUpdateCourse({
    course,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateSubject = async (subject, log) => {
  const addorUpdateSubject = httpsCallable(functions, 'addorUpdateSubject');
  var data = addorUpdateSubject({
    subject,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};
export const RequestaddorUpdateQuestion = async (question, log) => {
  const addorUpdateQuestion = httpsCallable(functions, 'addorUpdateQuestion');
  var data = addorUpdateQuestion({
    question,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};
export const RequestaddorUpdateAssessment = async (asmt, log) => {
  const addorUpdateAssessment = httpsCallable(
    functions,
    'addorUpdateAssessment'
  );
  var data = addorUpdateAssessment({
    asmt,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};
export const RequestcreateStudentAssessmentAttempt = async (data) => {
  const createStudentAssessmentAttempt = httpsCallable(
    functions,
    'createStudentAssessmentAttempt'
  );
  var data = createStudentAssessmentAttempt(data)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateLesson = async (lesson, log) => {
  const addorUpdateLesson = httpsCallable(functions, 'addorUpdateLesson');
  var data = addorUpdateLesson({
    lesson,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestloginCheckEmployee = async (employee_emailaddress) => {
  const loginCheckEmployee = httpsCallable(functions, 'loginCheckEmployee');
  var data = loginCheckEmployee({ employee_emailaddress })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};
export const RequestaddorUpdateTeacher = async (teacherData) => {
  const addorUpdateTeacher = httpsCallable(functions, 'addorUpdateteacher');
  var data = addorUpdateTeacher({ teacher: teacherData })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};
export const RequestloginCheckTeacher = async (teacher_emailaddress) => {
  const loginCheckTeacher = httpsCallable(functions, 'loginCheckteacher');
  var data = loginCheckTeacher({ teacher_emailaddress })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestregisterStudent = async (student, password) => {
  const registerStudent = httpsCallable(functions, 'registerStudent');
  var data = registerStudent({ student, password })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestregisterTeacher = async (teacher, password) => {
  const registerTeacher = httpsCallable(functions, 'registerTeacher');
  var data = registerTeacher({ teacher, password })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateTeacherData = async (teachercontent, log) => {
  const addorUpdateTeacherData = httpsCallable(
    functions,
    'addorUpdateTeacherData'
  );
  var data = addorUpdateTeacherData({
    teachercontent,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

// GK start
export const RequestaddorUpdateGkBoard = async (board, log) => {
  const addorUpdateGkBoard = httpsCallable(functions, 'addorUpdateGkBoard');
  var data = addorUpdateGkBoard({
    board,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateGkCourse = async (course, log) => {
  const addorUpdateGkCourse = httpsCallable(functions, 'addorUpdateGkCourse');
  var data = addorUpdateGkCourse({
    course,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateGKSubject = async (subject, log) => {
  const addorUpdateGKSubject = httpsCallable(functions, 'addorUpdateGKSubject');
  var data = addorUpdateGKSubject({
    subject,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateGKLesson = async (lesson, log) => {
  const addorUpdateGKLesson = httpsCallable(functions, 'addorUpdateGKLesson');
  var data = addorUpdateGKLesson({
    lesson,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateGKQuestion = async (question, log) => {
  const addorUpdateQuestion = httpsCallable(functions, 'addorUpdateGkQuestion');
  var data = addorUpdateQuestion({
    question,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdateGkAssessment = async (asmt, log) => {
  const addorUpdateGkAssessment = httpsCallable(
    functions,
    'addorUpdateGkAssessment'
  );
  var data = addorUpdateGkAssessment({
    asmt,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

// GK End

export const RequestregisterParent = async (parent, password) => {
  const registerParent = httpsCallable(functions, 'registerParent');
  var data = registerParent({ parent, password })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};

export const RequestaddorUpdatePayment = async (payment, log) => {
  const addorUpdatePayment = httpsCallable(functions, 'addorUpdatePayment');
  var data = addorUpdatePayment({
    payment,
    log,
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error('ERROR : ' + JSON.stringify(error));
      return (data = {
        status: false,
        data: [],
        message: error.message + ', ' + error.details,
      });
    });

  return data;
};
