import { USER_FULLNAME, USER_ID } from '@/constants/appconstants';
import { db, storage } from '@/firebase/firebaseconfig';
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import $ from 'jquery';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { ulid } from 'ulid';
import { SUPPORTEDMIMETYPES } from '../../constants/acceptedFileMIMETypes';
import * as fbc from '../../firebase/firebaseConstants';
import * as utility from '../../libraries/utility';
var formatFileNames = [];
var formatFiles = [];

const AddorUpdateTeacherData = ({
  addNewContentDetails,
  selectedContent,
  setTeacherContentModal,
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [allBoardDocs, setBoardDocs] = useState([]);
  const [boardchoices, setBoardschoices] = useState(null);
  const [coursechoices, setCourseschoices] = useState(null);
  const [subjectchoices, setSubjectschoices] = useState(null);
  const [lessonchoices, setLessonschoices] = useState(null);
  const [allUsers, setallUsers] = useState([]);

  const showsnackbar = (variant, message) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });
  };
  const errorCallback = (err) => {
    utility.hideloading();
    showsnackbar('error', err.message);
  };
  useEffect(() => {
    browseMultipleFiles();
    initModal();
  }, []);

  useEffect(() => {
    if (boardchoices === undefined || boardchoices === null) {
      return;
    }

    boardchoices.passedElement.element.addEventListener(
      'addItem',
      function (event) {
        if (event.detail.value !== '') {
          getAllCourses(event.detail.value);
        }
      },
      false
    );
    getAllBoards();
  }, [boardchoices]);

  useEffect(() => {
    if (coursechoices === undefined || coursechoices === null) {
      return;
    }

    coursechoices.passedElement.element.addEventListener(
      'addItem',
      function (event) {
        if (event.detail.value !== '') {
          getAllSubjects(event.detail.value);
        }
      },
      false
    );
  }, [coursechoices]);

  useEffect(() => {
    if (subjectchoices === undefined || subjectchoices === null) {
      return;
    }

    subjectchoices.passedElement.element.addEventListener(
      'addItem',
      function (event) {
        if (event.detail.value !== '') {
          getAllLessons(event.detail.value);
        }
      },
      false
    );
  }, [subjectchoices]);

  async function getAllSubjects(course_uid) {
    $('#contentdiv').empty();
    console.log(course_uid);
    utility.showloading();
    try {
      const ref = collection(db, fbc.SUBJECT_COLLECTION);
      var allSubjects = [];
      var params = [];

      const q = query(
        ref,
        ...params,
        where(fbc.SUBJECT_COURSE + '.uid', '==', course_uid),
        orderBy(fbc.SUBJECT_CODE)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allSubjects.push(doc.data());
      });

      console.log('Data' + course_uid);

      var subjectArray = [
        {
          value: '',
          label: 'Select Subject',
          placeholder: true,
          disabled: true,
          selected: true,
        },
      ];
      allSubjects.map((board) => {
        subjectArray.push({
          value: board[fbc.SUBJECT_UID],
          customProperties: board,
          label: board[fbc.SUBJECT_NAME],
        });
      });
      subjectchoices.clearChoices().setChoices(subjectArray);
    } catch (error) {
      console.log('Unsuccessful returned error', error);
      errorCallback(error);
    }

    utility.hideloading();
  }
  async function getAllLessons(subject_uid) {
    $('#contentdiv').empty();
    console.log(subject_uid);
    utility.showloading();
    try {
      const ref = collection(db, fbc.LESSON_COLLECTION);
      var allLessons = [];

      var params = [];

      const q = query(
        ref,
        ...params,
        where(fbc.LESSON_SUBJECT + '.uid', '==', subject_uid),
        orderBy(fbc.LESSON_CODE)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allLessons.push(doc.data());
      });

      var lessonArray = [
        {
          value: '',
          label: 'Select Lesson',
          placeholder: true,
          disabled: true,
          selected: true,
        },
      ];
      allLessons.map((board) => {
        lessonArray.push({
          value: board[fbc.LESSON_UID],
          customProperties: board,
          label: board[fbc.LESSON_NAME],
        });
      });
      lessonchoices.clearChoices().setChoices(lessonArray);
    } catch (error) {
      console.log('Unsuccessful returned error', error);
      errorCallback(error);
    }

    utility.hideloading();
  }
  async function getAllCourses(board_uid) {
    $('#contentdiv').empty();
    utility.showloading();
    try {
      const ref = collection(db, fbc.COURSE_COLLECTION);
      var allCourses = [];

      var params = [];

      const q = query(
        ref,
        ...params,
        where(fbc.COURSE_BOARD + '.uid', '==', board_uid),
        orderBy(fbc.COURSE_NAME)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allCourses.push(doc.data());
      });

      console.log('Data' + board_uid);
      //console.log('Data' + board_uid);

      var courseArray = [
        {
          value: '',
          label: 'Select Course',
          placeholder: true,
          disabled: true,
          selected: true,
        },
      ];
      allCourses.map((board) => {
        courseArray.push({
          value: board[fbc.COURSE_UID],
          customProperties: board,
          label: board[fbc.COURSE_NAME],
        });
      });
      coursechoices.clearChoices().setChoices(courseArray);
    } catch (error) {
      console.log('Unsuccessful returned error', error);
      errorCallback(error);
    }

    utility.hideloading();
  }

  async function getAllBoards() {
    $('#contentdiv').empty();
    utility.showloading();
    try {
      const BoardReF = collection(db, fbc.BOARD_COLLECTION);
      var allBoards = [];
      var params = [];
      // if (!utility.get_keyvalue(USER_ISADMIN)) {
      //   params.push(
      //     where(
      //       fbc.BOARD_ACCESSUSERUIDARRAY,
      //       'array-contains',
      //       utility.get_keyvalue(USER_ID)
      //     )
      //   );
      // }
      let q = query(BoardReF, ...params, orderBy(fbc.BOARD_NAME));
      const querySnapshot = await getDocs(q);
      console.log('size L ' + querySnapshot.size);
      querySnapshot.forEach((doc) => {
        allBoards.push({
          details: {
            field: doc.data()[fbc.BOARD_FIELD],
            code: doc.data()[fbc.BOARD_CODE],
            uid: doc.id,
            name: doc.data()[fbc.BOARD_NAME],
          },
          uid: doc.id,
          name: doc.data()[fbc.BOARD_NAME],
        });
      });

      var boardsArray = [
        {
          value: '',
          label: 'Select Board',
          placeholder: true,
          disabled: true,
          selected: true,
        },
      ];
      allBoards.map((board) => {
        boardsArray.push({
          value: board.uid,
          customProperties: board,
          label: board.name,
        });
      });
      boardchoices.clearChoices().setChoices(boardsArray);
    } catch (error) {
      console.log('Unsuccessful returned error', error);
      errorCallback(error);
    }
    utility.hideloading();
  }

  async function getAllUsers() {
    var allUsers = [];
    utility.showloading();
    try {
      const EmployeeReF = collection(db, fbc.EMPLOYEE_COLLECTION);

      const q = query(
        EmployeeReF,
        where(fbc.EMPLOYEE_MODULES, 'array-contains', 'COURSEMASTER'),
        where(fbc.EMPLOYEE_STATUS, '==', true),
        orderBy(fbc.EMPLOYEE_NAME)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allUsers.push({
          type: 'EMPLOYEE',
          uid: doc.id,
          name: doc.data()[fbc.EMPLOYEE_NAME],
        });
      });
    } catch (error) {
      console.log('Unsuccessful returned error', error);
      errorCallback(error);
    }
    try {
      const TeacherReF = collection(db, fbc.TEACHER_COLLECTION);
      const q = query(
        TeacherReF,
        where(fbc.TEACHER_MODULES, 'array-contains', 'COURSEMASTER'),
        where(fbc.TEACHER_STATUS, '==', true),
        orderBy(fbc.TEACHER_NAME)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allUsers.push({
          type: 'TEACHER',
          uid: doc.id,
          name: doc.data()[fbc.TEACHER_NAME],
        });
      });
    } catch (error) {
      console.log('Unsuccessful returned error', error);
      errorCallback(error);
    }
    setallUsers(allUsers);
    utility.hideloading();
  }

  useEffect(() => {
    if (allUsers.length == 0) {
      return;
    }
    var usersArray = [];
    allUsers.map((user) => {
      usersArray.push({
        value: user.uid,
        customProperties: user,
        label: user.name,
      });
    });

    setBoardschoices(
      new Choices($('#boardselect')[0], {
        addItems: true,
        placeholder: true,
        removeItemButton: false,
        resetScrollPosition: false,
        placeholderValue: '',
        itemSelectText: '',
        classNames: {
          containerInner:
            'choices__inner bg-white rounded d-flex text-dark fw-bold text-sm',
          item: 'choices__item pe-2 mb-0 text-sm',
          listSingle: 'choices__list--single my-auto',
        },
        choices: [
          {
            value: '',
            label: 'Select Course',
            placeholder: true,
            disabled: true,
            selected: true,
          },
        ],
      })
    );

    setCourseschoices(
      new Choices($('#courseselect')[0], {
        addItems: true,
        placeholder: true,
        removeItemButton: false,
        resetScrollPosition: false,
        placeholderValue: '',
        itemSelectText: '',
        classNames: {
          containerInner:
            'choices__inner bg-white rounded d-flex text-dark fw-bold text-sm',
          item: 'choices__item pe-2 mb-0 text-sm',
          listSingle: 'choices__list--single my-auto',
        },
        choices: [
          {
            value: '',
            label: 'Select Grade',
            placeholder: true,
            disabled: true,
            selected: true,
          },
        ],
      })
    );

    setSubjectschoices(
      new Choices($('#subjectselect')[0], {
        addItems: true,
        placeholder: true,
        removeItemButton: false,
        resetScrollPosition: false,
        placeholderValue: '',
        itemSelectText: '',
        classNames: {
          containerInner:
            'choices__inner bg-white rounded d-flex text-dark fw-bold text-sm',
          item: 'choices__item pe-2 mb-0 text-sm',
          listSingle: 'choices__list--single my-auto',
        },
        choices: [
          {
            value: '',
            label: 'Select Subject',
            placeholder: true,
            disabled: true,
            selected: true,
          },
        ],
      })
    );

    setLessonschoices(
      new Choices($('#lessonselect')[0], {
        addItems: true,
        placeholder: true,
        removeItemButton: false,
        resetScrollPosition: false,
        placeholderValue: '',
        itemSelectText: '',
        classNames: {
          containerInner:
            'choices__inner bg-white rounded d-flex text-dark fw-bold text-sm',
          item: 'choices__item pe-2 mb-0 text-sm',
          listSingle: 'choices__list--single my-auto',
        },
        choices: [
          {
            value: '',
            label: 'Select Lesson',
            placeholder: true,
            disabled: true,
            selected: true,
          },
        ],
      })
    );
  }, [allUsers]);

  useEffect(() => {
    console.log({ selectedContent });
    if (selectedContent == null) {
      return;
    }

    boardchoices.setChoiceByValue(
      selectedContent[fbc.TEACHER_CONTENT_BOARD].uid
    );
    coursechoices.setChoiceByValue(
      selectedContent[fbc.TEACHER_CONTENT_COURSE].uid
    );
  }, [selectedContent]);

  function clearAll() {
    $('.form-control').val('');
    $('#fileselect')[0].value = null;
    formatFileNames = [];
    formatFiles = [];
    // $('#accesstypeswitch').prop('checked', false).trigger('change');
  }

  function browseMultipleFiles() {
    $('#fileselect').on('change', function () {
      var allFiles = Array.from($('#fileselect')[0].files);

      var SUPPORTEDMIMETYPESArray = [];
      Object.keys(SUPPORTEDMIMETYPES).map((key) => {
        SUPPORTEDMIMETYPESArray.push(key);
      });

      if (allFiles.length > 1) {
        var message = 'Please Select Max 1 File.';
        utility.showtippy('fileselect', message, 'danger');
        showsnackbar('error', message);
        $('#fileselect')[0].value = null;
        return;
      }

      allFiles.map((file) => {
        var message = '';
        if (!formatFileNames.includes(file.name)) {
          var fileSize = file.size; // in bytes
          if (fileSize > 1e7) {
            message = 'Please Select Max 10MB File, ' + file.name;
            utility.showtippy('fileselect', message, 'danger');
            showsnackbar('error', message);
            $('#fileselect')[0].value = null;
            return false;
          } else if (
            !SUPPORTEDMIMETYPESArray.includes(
              file.name.split('.').pop().toLowerCase()
            )
          ) {
            message = 'Invalid File Format, ' + file.name;
            utility.showtippy('fileselect', message, 'danger');
            showsnackbar('error', message);
            $('#fileselect')[0].value = null;
            return false;
          } else {
            formatFileNames.push(file.name);
            formatFiles.push({
              fileextenstion: file.name.split('.').pop().toLowerCase(),
              mime: SUPPORTEDMIMETYPES[
                file.name.split('.').pop().toLowerCase()
              ],
              filename: file.name,
              file: file,
            });
          }
        }
      });

      formatFiles.sort(function (x, y) {
        let a = x.filename,
          b = y.filename;
        return a == b ? 0 : a > b ? 1 : -1;
      });

      formatFileNames.sort(function (x, y) {
        let a = x,
          b = y;
        return a == b ? 0 : a > b ? 1 : -1;
      });
      refereshFileDiv();
      console.log(formatFiles);
      console.log(formatFileNames);
    });
  }

  function refereshFileDiv() {
    $('#filesselecteddiv').empty();
    formatFiles.map((file, index) => {
      var item = ` <div class="d-flex flex-row bg-white border rounded py-2 px-5 w-100 justify-content-between mb-2">

          <div class="d-flex flex-column">

            <span class="fs-5 fw-bold">${file.filename}</span>

            <span class="text-xs text-muted">File Type: ${file.mime}</span>
          </div>


          <div class='d-flex flex-row gap-2 py-2'>
           
            <button id="${index}_remove" class="btn text-xs px-2 py-1 btn-sm btn-secondary">
              <i class="ri-delete-bin-6-fill fs-5"></i>
              Remove
            </button>
          </div>

        </div>`;

      $('#filesselecteddiv').append(item);
      $(`#${index}_remove`).on('click', function (e) {
        e.preventDefault();
        removeFileFromList(Number(this.id.replaceAll('_remove', '')));
      });
    });

    $('#fileselect')[0].value = null;
  }

  function removeFileFromList(index) {
    formatFileNames.splice(index, 1);
    formatFiles.splice(index, 1);
    console.log(formatFiles);
    console.log(formatFileNames);
    refereshFileDiv();
  }

  function initModal() {
    var element;
    var submitButton;
    var cancelButton;
    var closeButton;
    var form;
    var modal;

    element = document.querySelector('#modal_addcontent');
    modal = new bootstrap.Modal(element);
    setTeacherContentModal(modal);
    submitButton = document.querySelector('#modal_addcontent_submit');
    cancelButton = document.querySelector('#modal_addcontent_cancel');
    closeButton = document.querySelector('#modal_addcontent_close');
    getAllUsers();
    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
      modal.hide();
    });
    cancelButton.addEventListener('click', function (e) {
      e.preventDefault();
      modal.hide();
    });
  }

  function checkifDataisCorrect() {
    $('.is-invalid').removeClass('is-invalid');
    var message = '';

    // if (addNewContentDetails == null) {
    //   message = 'Failed To Proceed, Please Reload.';
    //   showsnackbar('error', message);
    //   return false;
    // } else

    if (utility.isInputEmpty('heading')) {
      $('#heading').addClass('is-invalid');
      message = 'Please Add Heading.';
      utility.showtippy('heading', message, 'danger');
      showsnackbar('error', message);
      return false;
    }
    // else if (boardchoices.getValue(true).length == 0) {
    //   message = 'Please Add Grade Board.';
    //   boardchoices.showdropdown();
    //   showsnackbar('error', message);
    //   return false;
    // } else if (coursechoices.getValue(true).length == 0) {
    //   message = 'Please Add Course.';
    //   coursechoices.showdropdown();
    //   showsnackbar('error', message);
    //   return false;
    // } else if (subjectchoices.getValue(true).length == 0) {
    //   message = 'Please Add Subject.';
    //   subjectchoices.showdropdown();
    //   showsnackbar('error', message);
    //   return false;
    // } else if (lessonchoices.getValue(true).length == 0) {
    //   message = 'Please Add Lesson.';
    //   lessonchoices.showdropdown();
    //   showsnackbar('error', message);
    //   return false;
    // }
    else if (utility.isInputEmpty('description')) {
      $('#description').addClass('is-invalid');
      message = 'Please Add Description.';
      utility.showtippy('description', message, 'danger');
      showsnackbar('error', message);
      return false;
    } else if (formatFiles.length == 0) {
      message = 'Please Select At Least 01 File.';
      utility.showtippy('fileselect', message, 'danger');
      showsnackbar('error', message);
      return false;
    } else {
      return true;
    }
  }

  const uploadContent = async () => {
    if (checkifDataisCorrect()) {
      utility.info_alert(
        `Upload ${formatFiles.length} Files.`,
        'Are you sure you want to continue.',
        'UPLOAD',
        'CANCEL',
        () => {
          utility.showloading();
          utility.updateloadingstatus('Uploading Files');
          uploadFiles(0);
        },
        null
      );

      var fileURLs = [];

      var uploadFiles = async function (index) {
        var file = formatFiles[index].file;
        var filename = formatFiles[index].filename;
        formatFiles.map((filedetails) => {
          file = filedetails.file;
        });
        var uploadRef = ref(storage, 'TechContent/' + filename);

        uploadBytes(uploadRef, file)
          .then(async (snapshot) => {
            getDownloadURL(snapshot.ref).then(async (downloadURL) => {
              fileURLs.push({
                ...formatFiles[index],
                url: downloadURL,
              });

              await uploadData(index, downloadURL);

              if (fileURLs.length === formatFiles.length) {
                utility.hideloading();
                utility.success_alert(
                  'Content Uploaded Successfully.',
                  'Details Added successfully.',
                  'OKAY',
                  () => {
                    $(`#content_tabbtn_${addNewContentDetails}`).click();
                    $(`#modal_addcontent_close`).click();
                  },
                  null
                );
              } else {
                utility.updateloadingstatus(
                  index + 1 + '/' + formatFiles.length + ' Files Uploaded'
                );

                uploadFiles(index + 1);
              }
            });
          })
          .catch((error) => {
            utility.hideloading();
            var message =
              'Failed To Upload File : ' + filename + ', ' + error.message;
            console.log(filename);
            showsnackbar('error', message);
          });
      };

      var uploadData = async function (index, url) {
        var techcontentUID = ulid();
        var log = {
          message:
            'TechContent ' + (selectedContent !== null ? 'Updated' : 'Added'),
          name: utility.get_keyvalue(USER_FULLNAME),
          uid: utility.get_keyvalue(USER_ID),
          date: utility.getDateandTime(),
          timestamp: utility.getTimestamp(),
        };

        var filedetails = formatFiles[index];
        delete filedetails['file'];

        var contentObj = {
          [fbc.TEACHER_CONTENT_UID]: techcontentUID,
          [fbc.TEACHER_CONTENT_HEADING]: utility.getinputValue('heading'),
          [fbc.TEACHER_CONTENT_DESCRIPTION]:
            utility.getinputValue('description'),
          // [fbc.TEACHER_CONTENT_BOARD]:
          //   boardchoices.getValue().customProperties.details,
          // [fbc.TEACHER_CONTENT_COURSE]:
          //   coursechoices.getValue().customProperties.details,
          // [fbc.TEACHER_CONTENT_SUBJECT]:
          //   subjectchoices.getValue().customProperties.details,
          // [fbc.TEACHER_CONTENT_LESSON]:
          //   lessonchoices.getValue().customProperties.details,

          [fbc.TEACHER_CONTENT_STATUS]: true,
          [fbc.TEACHER_CONTENT_LOGS]: arrayUnion(log),
          [fbc.TEACHER_CONTENT_FILE]: {
            ...filedetails,
            url,
          },
        };
        console.log(contentObj);
        const batch = writeBatch(db);
        const contentRef = doc(
          db,
          fbc.TEACHER_CONTENT_COLLECTION,
          techcontentUID
        );

        batch.set(contentRef, contentObj);

        await batch.commit();
        return true;
      };
    }
  };
  return (
    <div
      data-backdrop="static"
      data-keyboard="false"
      className="modal fade"
      id="modal_addcontent"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-xl">
        <div className="modal-content">
          <div className="modal-header p-5" id="modal_addcontent_header">
            <h4 className="fw-bold">Add / Modify Content</h4>

            <button
              onClick={(e) => clearAll()}
              id="modal_addcontent_close"
              className="btn-icon btn btn-sm btn-active-light-primary rounded-circle"
            >
              <span className="ri-close-line fs-1"></span>
            </button>
          </div>

          <div className="modal-body">
            <div className="row align-items-end d-flex">
              <div className="fv-row mb-7 col-md-4">
                <label className="required fs-6 fw-semibold mb-2">
                  Content Heading
                </label>

                <input
                  id="heading"
                  type="text"
                  className="form-control fw-bold text-dark"
                  placeholder=""
                />
              </div>
              <div className="fv-row mb-7 col-md-8">
                <label className="required fs-6 fw-semibold mb-2">
                  Content Short Description
                </label>

                <input
                  id="description"
                  type="text"
                  className="form-control fw-bold text-dark"
                  placeholder=""
                />
              </div>

              <label className="required fs-6 fw-semibold mb-2">
                Kindly maintain the Board-Grade-Subject-Lesson on each file
              </label>
              <div className="fv-row mb-7 col-md-4">
                <label className="required fs-6 fw-semibold mb-2">
                  Select Content Files
                </label>

                <input
                  id="fileselect"
                  type="file"
                  accept={Object.keys(SUPPORTEDMIMETYPES).map((key) => {
                    return '.' + key;
                  })}
                  title="Single File Max 10MB."
                  className="form-control fw-bold text-dark"
                  placeholder=""
                />
              </div>
              {/* <div className="row">
                <div className="d-flex flex-row gap-2 me-4 border-end pe-4">
                  <div className="fv-row" style={{ width: '200px' }}>
                    <select id="boardselect"></select>
                  </div>
                  <div className="fv-row" style={{ width: '200px' }}>
                    <select id="courseselect"></select>
                  </div>
                  <div className="fv-row" style={{ width: '200px' }}>
                    <select id="subjectselect"></select>
                  </div>
                  <div className="fv-row" style={{ width: '200px' }}>
                    <select id="lessonselect"></select>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="d-flex row g-9 my-4"></div>

            <div id="filesselecteddiv" className="d-flex row px-3 my-4"></div>
          </div>

          <div className="modal-footer flex-end p-3">
            <button
              type="reset"
              onClick={(e) => clearAll()}
              id="modal_addcontent_cancel"
              className="btn py-2 btn-light me-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="modal_addcontent_submit"
              onClick={(e) => uploadContent()}
              className="btn py-2 btn-primary"
            >
              <span>Upload Content</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddorUpdateTeacherData;
