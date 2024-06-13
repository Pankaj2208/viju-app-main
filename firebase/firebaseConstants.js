export const MASTERMODULE = {
  label: 'Masters',
  modules: {
    EMPLOYEES: { label: 'Employees', path: '../masters/employees' },
    // TEACHERSMASTER: { label: 'Teachers', path: '../masters/teachers' },
    // STUDENTMASTER: { label: 'Students', path: '../masters/students' },
  },
};
export const COURSESMODULE = {
  label: 'Grades',
  modules: {
    ACTIVITYMASTER: { label: 'Activitys', path: '../masters/activitys' },

    BOARDMASTER: { label: 'Boards', path: '../masters/boards' },
    COURSEMASTER: { label: 'Grades', path: '../masters/courses' },
    SUBJECTMASTER: { label: 'Subjects', path: '../masters/subjects' },
    QUESTIONS: { label: 'Questions', path: '../masters/questions' },

    GKBOARDMASTER: { label: 'GK Board', path: '../masters/boards-gk' },
    GKCOURSEMASTER: { label: ' GK Grades', path: '../masters/courses-gk' },
    GKSUBJECTMASTER: { label: ' GK Subjects', path: '../masters/subjects-gk' },
    GKQUESTIONS: { label: 'Gk Questions', path: '../masters/questions-gk' },
  },
};
export const NAVIGATIONPAGES = {
  EMPLOYEES: '../masters/employees',
  TEACHERSMASTER: '../masters/teachers',
  STUDENTMASTER: '../masters/students',
};
export const STUDENTMODULE = {
  label: 'Home',
  modules: {
    STUDENTHOME: { label: 'Home', path: '../student/home' },
    ATTEMPTEDASSESSMENTS: {
      label: 'Attempted Assessments',
      path: '../student/attempted-assessments',
    },
    Subscription: { label: 'Subscription', path: '../student/paypage' },
  },
};

export const TEACHERMODULE = {
  label: 'Home',
  modules: {
    TEACHERHOME: { label: 'Home', path: '../teachers/home' },
    // ATTEMPTEDASSESSMENTS: {
    //   label: 'Attempted Assessments',
    //   path: '../student/attempted-assessments',
    // },
    DATAUPLOAD: {
      label: 'Add Content',
      path: '../teachers/data-upload',
    },
  },
};

export const PARENTMODULE = {
  label: 'Home',
  modules: {
    PARENTHOME: { label: 'Home', path: '../parent/home' },
  },
};
export const EMPLOYEE_COLLECTION = 'EmployeeDetails';
export const EMPLOYEE_KEY = 'employee';
export const EMPLOYEE_UID = 'employee_uid';
export const EMPLOYEE_NAME = 'employee_name';
export const EMPLOYEE_CODE = 'employee_code';
export const EMPLOYEE_EMAILADDRESS = 'employee_emailaddress';
export const EMPLOYEE_MODULES = 'employee_modules';
export const EMPLOYEE_STATUS = 'employee_status';
export const EMPLOYEE_ISADMIN = 'employee_isadmin';
export const EMPLOYEE_ISSIGNEDUP = 'employee_issignedup';
export const EMPLOYEE_PASSWORD = 'employee_password';
export const EMPLOYEE_SESSIONDETAILS = 'employee_sessiondetails';

export const TEACHER_COLLECTION = 'TeachersDetails';
export const TEACHER_KEY = 'teacher';
export const TEACHER_UID = 'teacher_uid';
export const TEACHER_NAME = 'teacher_name';
export const TEACHER_PHONENUMBER = 'teacher_phonenumber';
export const TEACHER_EMAILADDRESS = 'teacher_emailaddress';
export const TEACHER_MODULES = 'teacher_modules';
export const TEACHER_STATUS = 'teacher_status';
export const TEACHER_ISADMIN = 'teacher_isadmin';
export const TEACHER_ISSIGNEDUP = 'teacher_issignedup';
export const TEACHER_PASSWORD = 'teacher_password';
export const TEACHER_SESSIONDETAILS = 'teacher_sessiondetails';
export const TEACHER_DETAILS = 'teacher_details';

export const BOARD_COLLECTION = 'BoardsDetails';
export const BOARD_KEY = 'board';
export const BOARD_UID = 'board_uid';
export const BOARD_NAME = 'board_name';
export const BOARD_CODE = 'board_code';
export const BOARD_BOARD = 'board_board';
export const BOARD_FIELD = 'board_field';
export const BOARD_ACTIVITY = 'board_activity';
export const BOARD_ACCESSUSERUIDARRAY = 'board_accessuseruidarray';
export const BOARD_KEYWORDS = 'board_keywords';
export const BOARD_STATUS = 'board_status';
export const BOARD_THUMBNAILURL = 'board_thumbnailurl';
export const BOARD_LOGS = 'board_logs';

export const COURSECOLORS = {
  RED: '#FF8989',
  YELLOW: '#FFD541',
  GREEN: '#9FB670',
  BLUE: '#5ECFFF',
};

export const COURSE_COLLECTION = 'CoursesDetails';
export const COURSE_KEY = 'course';
export const COURSE_UID = 'course_uid';
export const COURSE_NAME = 'course_name';
export const COURSE_CODE = 'course_code';
export const COURSE_BOARD = 'course_board';
export const COURSE_COLOR = 'course_color';
export const COURSE_FIELD = 'course_field';
export const COURSE_ACCESSUSERUIDARRAY = 'course_accessuseruidarray';
export const COURSE_KEYWORDS = 'course_keywords';
export const COURSE_STATUS = 'course_status';
export const COURSE_THUMBNAILURL = 'course_thumbnailurl';
export const COURSE_LOGS = 'course_logs';

export const SUBJECT_COLLECTION = 'SubjectsDetails';
export const SUBJECT_KEY = 'subject';
export const SUBJECT_UID = 'subject_uid';
export const SUBJECT_COURSE = 'subject_course';
export const SUBJECT_NAME = 'subject_name';
export const SUBJECT_CODE = 'subject_code';
export const SUBJECT_ACCESSUSERUIDARRAY = 'subject_accessuseruidarray';
export const SUBJECT_KEYWORDS = 'subject_keywords';
export const SUBJECT_STATUS = 'subject_status';
export const SUBJECT_HASASSESSMENTS = 'subject_hasassessments';
export const SUBJECT_LOGS = 'subject_logs';
export const SUBJECT_LESSONSUIDARRAY = 'subject_lessonsuidarray';
export const SUBJECT_LESSONS = 'subject_lessons';
export const SUBJECT_THUMBNAILURL = 'subject_thumbnailurl';

export const LESSON_COLLECTION = 'LessonsDetails';
export const LESSON_KEY = 'lesson';
export const LESSON_UID = 'lesson_uid';
export const LESSON_COURSE = 'lesson_course';
export const LESSON_SUBJECT = 'lesson_subject';
export const LESSON_NAME = 'lesson_name';
export const LESSON_CODE = 'lesson_code';
export const LESSON_ACCESSTYPE = 'lesson_accesstype';
export const LESSON_KEYWORDS = 'lesson_keywords';
export const LESSON_STATUS = 'lesson_status';
export const LESSON_THUMBNAILURL = 'lesson_thumbnailurl';
export const LESSON_LOGS = 'lesson_logs';
export const LESSON_CONTENT = 'lesson_content';
export const LESSON_DELETEDCONTENT = 'lesson_deletedcontent';
export const LESSON_ASSESMENTUIDARRAY = 'lesson_assesmentuidarray';

export const CONTENT_COLLECTION = 'ContentDetails';
export const CONTENT_KEY = 'content';
export const CONTENT_UID = 'content_uid';
export const CONTENT_HEADING = 'content_heading';
export const CONTENT_DESCRIPTION = 'content_description';
export const CONTENT_COURSE = 'content_course';
export const CONTENT_SUBJECT = 'content_subject';
export const CONTENT_LESSON = 'content_lesson';
export const CONTENT_STATUS = 'content_status';
export const CONTENT_LOGS = 'content_logs';
export const CONTENT_FILE = 'content_file';
export const CONTENT_ACCESSTYPE = 'content_accesstype';
export const CONTENT_ONYOUTUBE = 'content_onyoutube';

export const STUDENT_COLLECTION = 'StudentDetails';
export const STUDENT_KEY = 'student';
export const STUDENT_UID = 'student_uid';
export const STUDENT_DETAILS = 'student_details';
export const SCHOOL_DETAILS = 'school_details';
export const ACCOUNT_DETAILS = 'account_details';

export const STUDENT_NAME = 'student_name';
export const STUDENT_EMAILADDRESS = 'student_emailaddress';
export const STUDENT_COURSES = 'student_courses';
export const STUDENT_STATUS = 'student_status';
export const STUDENT_ISSIGNEDUP = 'student_issignedup';

export const QUESTIONTYPENAMES = {
  FTB: 'Fill In The Blanks',
  MTF: 'Match The Following',
};
export const QUESTIONTYPE = {
  MCQ: 'MCQ',
  FTB: 'FTB',
  MTF: 'MTF',
  OQA: 'OQA',
};

export const QUESTION_COLLECTION = 'QuestionsDetails';
export const QUESTION_KEY = 'QUESTION';
export const QUESTION_UID = 'question_uid';
export const QUESTION_CODE = 'question_code';
export const QUESTION_TEXT = 'question_text';
export const QUESTION_IMAGEURLS = 'question_imageurls';
export const QUESTION_COMPLEXITY = 'question_complexity';
export const QUESTION_TYPE = 'question_type';
export const QUESTION_ONLYASSESSMENT = 'question_onlyassessment';
export const QUESTION_SUBTYPE = 'question_subtype';
export const QUESTION_LESSONSUID = 'question_lessonsuid';
export const QUESTION_OPTIONS = 'question_options';
export const QUESTION_COMPREHENSION = 'question_comprehension';
export const QUESTION_STATUS = 'question_status';
export const QUESTION_LOGS = 'question_logs';

export const ASMT_COLLECTION = 'AssessmentDetails';
export const ASMT_KEY = 'asmt';
export const ASMT_UID = 'asmt_uid';
export const ASMT_LESSON = 'asmt_lesson';
export const ASMT_SUBJECT = 'asmt_subject';
export const ASMT_COURSE = 'asmt_course';
export const ASMT_CODE = 'asmt_code';
export const ASMT_TITLE = 'asmt_title';
export const ASMT_GENERALINSTRUCTIONS = 'asmt_generalinstructions';
export const ASMT_DURATION = 'asmt_duration';
export const ASMT_ISPRACTICE = 'asmt_ispractice';
export const ASMT_HASNEGATIVEMARKING = 'asmt_hasnegativemarking';
export const ASMT_ISLIVE = 'asmt_islive';
export const ASMT_LOGS = 'asmt_logs';
export const ASMT_QUESTIONS = 'asmt_questions';
export const ASMT_TOTAL = 'asmt_total';
export const ASMT_STATUS = 'asmt_status';

export const STDASMT_STATUSTYPE = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CLOSED: 'CLOSED',
};
export const STDASMT_COLLECTION = 'StudentAssessments';
export const STDASMT_KEY = 'stdasmt';
export const STDASMT_UID = 'stdasmt_uid';
export const STDASMT_ASMTUID = 'stdasmt_asmtuid';
export const STDASMT_LESSON = 'stdasmt_lesson';
export const STDASMT_SUBJECT = 'stdasmt_subject';
export const STDASMT_COURSE = 'stdasmt_course';
export const STDASMT_CODE = 'stdasmt_code';
export const STDASMT_TITLE = 'stdasmt_title';
export const STDASMT_GENERALINSTRUCTIONS = 'stdasmt_generalinstructions';
export const STDASMT_DURATION = 'stdasmt_duration';
export const STDASMT_ISPRACTICE = 'stdasmt_ispractice';
export const STDASMT_HASNEGATIVEMARKING = 'stdasmt_hasnegativemarking';
export const STDASMT_LOGS = 'stdasmt_logs';
export const STDASMT_QUESTIONS = 'stdasmt_questions';
export const STDASMT_TOTAL = 'stdasmt_total';
export const STDASMT_STATUS = 'stdasmt_status';
export const STDASMT_ATTEMPTS = 'stdasmt_attempts';
export const STDASMT_ACTIVEATTEMPTUID = 'stdasmt_activeattemptuid';
export const STDASMT_LASTATTEMPTUID = 'stdasmt_lastattemptuid';
export const STDASMT_STUDENT = 'stdasmt_student';

export const ACTIVITY_COLLECTION = 'ActivitysDetails';
export const ACTIVITY_KEY = 'activity';
export const ACTIVITY_UID = 'activity_uid';
export const ACTIVITY_NAME = 'activity_name';
export const ACTIVITY_CODE = 'activity_code';
export const ACTIVITY_BOARD = 'activity_board';
export const ACTIVITY_FIELD = 'activity_field';
export const ACTIVITY_ACCESSUSERUIDARRAY = 'activity_accessuseruidarray';
export const ACTIVITY_KEYWORDS = 'activity_keywords';
export const ACTIVITY_STATUS = 'activity_status';
export const ACTIVITY_THUMBNAILURL = 'activity_thumbnailurl';
export const ACTIVITY_LOGS = 'activity_logs';

export const TEACHER_CONTENT_COLLECTION = 'TeacherContentDetails';
export const TEACHER_CONTENT_KEY = 'teachercontent';
export const TEACHER_CONTENT_UID = 'teachercontent_uid';
export const TEACHER_CONTENT_HEADING = 'teachercontent_heading';
export const TEACHER_CONTENT_DESCRIPTION = 'teachercontent_description';
export const TEACHER_CONTENT_COURSE = 'teachercontent_course';

export const TEACHER_CONTENT_SUBJECT = 'teachercontent_subject';
export const TEACHER_CONTENT_LESSON = 'teachercontent_lesson';
export const TEACHER_CONTENT_BOARD = 'teachercontent_board';

export const TEACHER_CONTENT_STATUS = 'teachercontent_status';
export const TEACHER_CONTENT_LOGS = 'teachercontent_logs';
export const TEACHER_CONTENT_FILE = 'teachercontent_file';
export const TEACHER_CONTENT = 'teacher_content';

export const FAQ_COLLECTION = 'FaqDetails';
export const FAQ_KEY = 'faq';
export const FAQ_UID = 'faq_uid';
export const FAQ_QUESTION = 'faq_question';
export const FAQ_ANS = 'faq_ans';
export const FAQ_STATUS = 'faq_status';

// GK start
export const GKBOARD_COLLECTION = 'GkBoardsDetails';
export const GKBOARD_KEY = 'Gkboard';
export const GKBOARD_UID = 'Gkboard_uid';
export const GKBOARD_NAME = 'Gkboard_name';
export const GKBOARD_CODE = 'Gkboard_code';
export const GKBOARD_BOARD = 'Gkboard_board';
export const GKBOARD_FIELD = 'Gkboard_field';
export const GKBOARD_ACTIVITY = 'Gkboard_activity';
export const GKBOARD_ACCESSUSERUIDARRAY = 'Gkboard_accessuseruidarray';
export const GKBOARD_KEYWORDS = 'Gkboard_keywords';
export const GKBOARD_STATUS = 'Gkboard_status';
export const GKBOARD_THUMBNAILURL = 'Gkboard_thumbnailurl';
export const GKBOARD_LOGS = 'Gkboard_logs';

export const GKCOURSECOLORS = {
  RED: '#FF8989',
  YELLOW: '#FFD541',
  GREEN: '#9FB670',
  BLUE: '#5ECFFF',
};

export const GKCOURSE_COLLECTION = 'GkCoursesDetails';
export const GKCOURSE_KEY = 'Gkcourse';
export const GKCOURSE_UID = 'Gkcourse_uid';
export const GKCOURSE_NAME = 'Gkcourse_name';
export const GKCOURSE_CODE = 'Gkcourse_code';
export const GKCOURSE_BOARD = 'Gkcourse_board';
export const GKCOURSE_COLOR = 'Gkcourse_color';
export const GKCOURSE_FIELD = 'Gkcourse_field';
export const GKCOURSE_ACCESSUSERUIDARRAY = 'Gkcourse_accessuseruidarray';
export const GKCOURSE_KEYWORDS = 'Gkcourse_keywords';
export const GKCOURSE_STATUS = 'Gkcourse_status';
export const GKCOURSE_THUMBNAILURL = 'Gkcourse_thumbnailurl';
export const GKCOURSE_LOGS = 'course_logs';

export const GKSUBJECT_COLLECTION = 'GkSubjectsDetails';
export const GKSUBJECT_KEY = 'Gksubject';
export const GKSUBJECT_UID = 'Gksubject_uid';
export const GKSUBJECT_COURSE = 'Gksubject_course';
export const GKSUBJECT_NAME = 'Gksubject_name';
export const GKSUBJECT_CODE = 'Gksubject_code';
export const GKSUBJECT_ACCESSUSERUIDARRAY = 'Gksubject_accessuseruidarray';
export const GKSUBJECT_KEYWORDS = 'Gksubject_keywords';
export const GKSUBJECT_STATUS = 'Gksubject_status';
export const GKSUBJECT_HASASSESSMENTS = 'Gksubject_hasassessments';
export const GKSUBJECT_LOGS = 'Gksubject_logs';
export const GKSUBJECT_LESSONSUIDARRAY = 'Gksubject_lessonsuidarray';
export const GKSUBJECT_LESSONS = 'Gksubject_lessons';
export const GKSUBJECT_THUMBNAILURL = 'Gksubject_thumbnailurl';

export const GKLESSON_COLLECTION = 'GkLessonsDetails';
export const GKLESSON_KEY = 'Gklesson';
export const GKLESSON_UID = 'Gklesson_uid';
export const GKLESSON_COURSE = 'Gklesson_course';
export const GKLESSON_SUBJECT = 'Gklesson_subject';
export const GKLESSON_NAME = 'Gklesson_name';
export const GKLESSON_CODE = 'Gklesson_code';
export const GKLESSON_ACCESSTYPE = 'Gklesson_accesstype';
export const GKLESSON_KEYWORDS = 'Gklesson_keywords';
export const GKLESSON_STATUS = 'Gklesson_status';
export const GKLESSON_THUMBNAILURL = 'Gklesson_thumbnailurl';
export const GKLESSON_LOGS = 'lesson_logs';
export const GKLESSON_CONTENT = 'Gklesson_content';
export const GKLESSON_DELETEDCONTENT = 'Gklesson_deletedcontent';
export const GKLESSON_ASSESMENTUIDARRAY = 'Gklesson_assesmentuidarray';

export const GKCONTENT_COLLECTION = 'GkContentDetails';
export const GKCONTENT_KEY = 'Gkcontent';
export const GKCONTENT_UID = 'Gkcontent_uid';
export const GKCONTENT_HEADING = 'Gkcontent_heading';
export const GKCONTENT_DESCRIPTION = 'Gkcontent_description';
export const GKCONTENT_COURSE = 'Gkcontent_course';
export const GKCONTENT_SUBJECT = 'Gkcontent_subject';
export const GKCONTENT_LESSON = 'Gkcontent_lesson';
export const GKCONTENT_STATUS = 'Gkcontent_status';
export const GKCONTENT_LOGS = 'Gkcontent_logs';
export const GKCONTENT_FILE = 'Gkcontent_file';
export const GKCONTENT_ACCESSTYPE = 'Gkcontent_accesstype';
export const GKCONTENT_ONYOUTUBE = 'Gkcontent_onyoutube';

export const GKQUESTION_COLLECTION = 'GkQuestionsDetails';
export const GKQUESTION_KEY = 'GkQUESTION';
export const GKQUESTION_UID = 'Gkquestion_uid';
export const GKQUESTION_CODE = 'Gkquestion_code';
export const GKQUESTION_TEXT = 'Gkquestion_text';
export const GKQUESTION_IMAGEURLS = 'Gkquestion_imageurls';
export const GKQUESTION_ANS = 'Gkquestion_ans';
export const GKQUESTION_TYPE = 'Gkquestion_type';
export const GKQUESTION_ONLYASSESSMENT = 'Gkquestion_onlyassessment';
export const GKQUESTION_SUBTYPE = 'Gkquestion_subtype';
export const GKQUESTION_LESSONSUID = 'Gkquestion_lessonsuid';
export const GKQUESTION_OPTIONS = 'Gkquestion_options';
export const GKQUESTION_COMPREHENSION = 'Gkquestion_comprehension';
export const GKQUESTION_STATUS = 'Gkquestion_status';
export const GKQUESTION_LOGS = 'Gkquestion_logs';

export const GKASMT_COLLECTION = 'GkAssessmentDetails';
export const GKASMT_KEY = 'Gkasmt';
export const GKASMT_UID = 'Gkasmt_uid';
export const GKASMT_LESSON = 'Gkasmt_lesson';
export const GKASMT_SUBJECT = 'Gkasmt_subject';
export const GKASMT_COURSE = 'Gkasmt_course';
export const GKASMT_CODE = 'Gkasmt_code';
export const GKASMT_TITLE = 'Gkasmt_title';
export const GKASMT_GENERALINSTRUCTIONS = 'Gkasmt_generalinstructions';
export const GKASMT_DURATION = 'Gkasmt_duration';
export const GKASMT_ISPRACTICE = 'Gkasmt_ispractice';
export const GKASMT_HASNEGATIVEMARKING = 'Gkasmt_hasnegativemarking';
export const GKASMT_ISLIVE = 'Gkasmt_islive';
export const GKASMT_LOGS = 'Gkasmt_logs';
export const GKASMT_QUESTIONS = 'Gkasmt_questions';
export const GKASMT_TOTAL = 'Gkasmt_total';
export const GKASMT_STATUS = 'Gkasmt_status';

// GK End

export const PARENT_COLLECTION = 'ParentDetails';
export const PARENT_KEY = 'parent';
export const PARENT_UID = 'parent_uid';
export const PARENT_DETAILS = 'parent_details';
export const PARENT_NAME = 'parent_name';
export const PARENT_EMAILADDRESS = 'parent_emailaddress';
export const PARENT_STATUS = 'parent_status';
export const PARENT_ISSIGNEDUP = 'parent_issignedup';
export const PARENT_CONTENT_FILE = 'parentcontent_file';
export const PARENT_CONTENT_LOGS = 'parentcontent_logs';

export const PAYMENT_COLLECTION = 'PaymentDetails';
export const PAYMENT_KEY = 'payment';
export const PAYMENT_UID = 'payment_uid';
