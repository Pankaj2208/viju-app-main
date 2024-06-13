import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { useEffect, useRef,useState } from 'react';
import { ulid } from 'ulid';

import { auth } from '@/firebase/firebaseconfig';
import Head from '../../components/head';
import { COMPANYNAME, WEBAPPTAGLINE } from '../../constants/appconstants';
import * as fbc from '../../firebase/firebaseConstants';
import { RequestregisterParent } from '../../firebase/masterAPIS';
import * as utility from '../../libraries/utility';
const ParentRegister = ({ selectedContent }) => {
  const state = useRef(null);
  const city = useRef(null);
  const fullname = useRef(null);
  const renterpassword = useRef(null);
  const occupation = useRef(null);
  const companyoffice = useRef(null);
  const adharno = useRef(null);
  // const country = useRef(null);
  // const address = useRef(null);
  // const pincode = useRef(null);
  const phoneno = useRef(null);
  const password = useRef(null);
  const emailaddress = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [formatFileNames, setFormatFileNames] = useState([]);
  const [formatFiles, setFormatFiles] = useState([]);

  const SUPPORTEDMIMETYPES = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // Add other supported MIME types here
  };

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
    localStorage.clear();
    browseMultipleFiles();
    utility.hideloading();
  }, []);

  function browseMultipleFiles() {
    $('#fileselect').on('change', function () {
      var allFiles = Array.from($('#fileselect')[0].files);

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
           !SUPPORTEDMIMETYPES[file.name.split('.').pop().toLowerCase()]
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
              mime: SUPPORTEDMIMETYPES[file.name.split('.').pop().toLowerCase()],
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

  const checkifDataisCorrect = () => {
    $('.form-control').removeClass('is-invalid');
    var message = '';
    if (
      utility.isInputEmpty('fullname') ||
      utility.getinputValue('fullname').length < 6
    ) {
      $('#fullname').addClass('is-invalid');
      message = 'Please Enter A Valid Full Name, Minimum 6 Characters.';
      utility.showtippy('fullname', message, 'danger');
      showsnackbar('error', message);
      return false;
    }
    // else if (utility.isInputEmpty('schoolname')) {
    //   $('#schoolname').addClass('is-invalid');
    //   message = 'Please Add A School Name';
    //   utility.showtippy('schoolname', message);
    //   showsnackbar('error', message);
    //   return false;
    // }
    // else if (utility.isInputEmpty('boardname')) {
    //   $('#boardname').addClass('is-invalid');
    //   message = 'Please Add A Board Name';
    //   utility.showtippy('boardname', message);
    //   showsnackbar('error', message);
    //   return false;
    // }
    else if (utility.isInputEmpty('companyoffice')) {
      $('#companyoffice').addClass('is-invalid');
      message = 'Please Add Company Office Name';
      utility.showtippy('companyoffice', message);
      showsnackbar('error', message);
      return false;
    } else if (utility.isInputEmpty('city')) {
      $('#city').addClass('is-invalid');
      message = 'Please Add City';
      utility.showtippy('city', message);
      showsnackbar('error', message);
      return false;
    } else if (utility.isInputEmpty('phoneno')) {
      $('#phoneno').addClass('is-invalid');
      message = 'Please Add Phone No';
      utility.showtippy('phoneno', message);
      showsnackbar('error', message);
      return false;
    } else if (utility.isInputEmpty('adharno')) {
      $('#adharno').addClass('is-invalid');
      message = 'Please Add Phone No';
      utility.showtippy('adharno', message);
      showsnackbar('error', message);
      return false;
    } else if (utility.isInputEmpty('state')) {
      $('#state').addClass('is-invalid');
      message = 'Please Add State';
      utility.showtippy('state', message);
      showsnackbar('error', message);
      return false;
    } else if (utility.isInputEmpty('occupation')) {
      $('#occupation').addClass('is-invalid');
      message = 'Please Add Occupation';
      utility.showtippy('occupation', message);
      showsnackbar('error', message);
      return false;
    } else if (
      utility.isInputEmpty('emailaddress') ||
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        utility.getinputValue('emailaddress')
      )
    ) {
      $('#emailaddress').addClass('is-invalid');
      message = 'Please Add A Valid Email Address';
      utility.showtippy('emailaddress', message);
      showsnackbar('error', message);
      return false;
    }
    if (
      utility.isInputEmpty('password') ||
      utility.getinputValue('password').length < 6
    ) {
      $('#password').addClass('is-invalid');
      message = 'Please Enter A Valid Password, Minimum 6 Characters.';
      utility.showtippy('password', message, 'danger');
      showsnackbar('error', message);
      return false;
    } else if (
      utility.isInputEmpty('renterpassword') ||
      utility.getinputValue('renterpassword').length < 6
    ) {
      $('#renterpassword').addClass('is-invalid');
      message = 'Please Enter A Valid Password, Minimum 6 Characters.';
      utility.showtippy('renterpassword', message, 'danger');
      showsnackbar('error', message);
      return false;
    } else if (
      utility.getinputValue('renterpassword') !==
      utility.getinputValue('password')
    ) {
      $('#password').addClass('is-invalid');
      $('#renterpassword').addClass('is-invalid');
      message = "Password Doesn't Match.";
      utility.showtippy('password', message, 'danger');
      utility.showtippy('renterpassword', message, 'danger');
      showsnackbar('error', message);
      return false;
    } else {
      return true;
    }
  };

  async function signUpUser() {
    if (checkifDataisCorrect()) {
      var tchuid = 'PAR' + ulid();
      var tchObj = {
        [fbc.PARENT_UID]: tchuid,
        [fbc.PARENT_DETAILS]: {
          // schoolname: utility.getinputValue('schoolname'),
          // boardname: utility.getinputValue('boardname'),
          companyoffice: utility.getinputValue('companyoffice'),
          city: utility.getinputValue('city'),
          phoneno: utility.getinputValue('phoneno'),
          adharno: utility.getinputValue('adharno'),
          state: utility.getinputValue('state'),
          occupation: utility.getinputValue('occupation'),
        },
        [fbc.PARENT_NAME]: utility.getinputValue('fullname'),
        [fbc.PARENT_EMAILADDRESS]: utility.getinputValue('emailaddress'),
        //[fbc.STUDENT_COURSES]: []
      };
      utility.showloading();
      var registerParent = await RequestregisterParent(
        tchObj,
        utility.getinputValue('password')
      );
      utility.hideloading();
      if (registerParent.status) {
        utility.showloading();
        signInWithEmailAndPassword(
          auth,
          utility.getinputAllinLowercase('emailaddress'),
          utility.getinputValue('password')
        )
          .then((userCredential) => {
            sendEmailVerification(userCredential.user)
              .then(() => {
                utility.hideloading();
                utility.success_alert(
                  'Verification Email Sent To ' +
                    utility.getMaskedEmail(userCredential.user.email),
                  'Verify Email and Login Again.',
                  'OKAY',
                  () => {
                    window.history.replaceState(null, null, '/login');
                    window.location = '/login';
                  },
                  null
                );
              })
              .catch((error) => {
                console.log(error);
                errorCallback(error);
              });
          })
          .catch((error) => {
            errorCallback(error);
          });
      } else {
        var message = 'Failed To Register, ' + registerParent.message;
        showsnackbar('error', message);
      }
    }
  }

  return (
    <main className="d-flex flex-column" style={{ height: '100vh' }}>
      <Head title={'Register'} />

      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="d-flex flex-column flex-lg-row-fluid w-lg-30 p-10 order-2 order-lg-1">
          <div className="d-flex flex-center flex-column flex-lg-row-fluid">
            <div className="w-lg-500px w-100 py-10 px-0">
              <div className="d-flex flex-center flex-column-fluid pb-5">
                <div className="d-flex flex-column w-100">
                  <div className="text-start mb-7 mb-lg-15">
                    <h1 className="text-dark fw-bolder mb-3 fs-1">
                      Sign up to continue.
                    </h1>

                    <div className="text-gray-500 fw-semibold fs-5">
                      Please Enter Your Details.
                    </div>
                  </div>

                  <div className="input-group   fv-row mb-8">
                    <span className="input-group-text">
                      <i className="ri-user-smile-fill fs-5"></i>
                    </span>
                    <input
                      type="text"
                      ref={fullname}
                      id="fullname"
                      className="form-control bg-transparent mb-0"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* <div className="row mb-8"> */}
                  {/* <div className="col-12 col-md-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          ref={schoolname}
                          id="schoolname"
                          className="form-control bg-transparent mb-0"
                          placeholder="School Name"
                        />
                      </div>
                    </div> */}
                  {/* <div className="col-12 col-md-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          ref={boardname}
                          id="boardname"
                          className="form-control bg-transparent mb-0"
                          placeholder="Board"
                        />
                      </div>
                    </div> */}
                  {/* </div> */}
                  <div className="row mb-8">
                    <div className="col-12 col-md-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          ref={companyoffice}
                          id="companyoffice"
                          className="form-control bg-transparent mb-0"
                          placeholder="Company/Office Name"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          ref={occupation}
                          id="occupation"
                          className="form-control bg-transparent mb-0"
                          placeholder="Occupation"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-8">
                    <div className="col-12 col-md-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          ref={city}
                          id="city"
                          className="form-control bg-transparent mb-0"
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          ref={state}
                          id="state"
                          className="form-control bg-transparent mb-0"
                          placeholder="State"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-8">
                    <div className="col-12 col-md-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          ref={phoneno}
                          id="phoneno"
                          className="form-control bg-transparent mb-0"
                          placeholder="Phone No"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 ">
                      <div className="input-group">
                        <input
                          type="text"
                          ref={adharno}
                          id="adharno"
                          className="form-control bg-transparent mb-0"
                          placeholder="Aadhar No"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="form-check-label fs-6 mb-2 text-warning text-start w-100">
                    Verification Email Will Be Sent To This Email Address.
                  </label>
                  <div className="input-group  fv-row mb-8">
                    <span className="input-group-text">
                      <i className="ri-at-fill fs-5"></i>
                    </span>
                    <input
                      type="text"
                      ref={emailaddress}
                      id="emailaddress"
                      className="form-control bg-transparent mb-0"
                      placeholder="Email Address"
                    />
                  </div>

                  <label className="form-check-label fs-6 mb-2 text-warning text-start w-100">
                    Create Password Minimum 6 Characters
                  </label>
                  <div id="passworddiv" className="input-group  fv-row mb-8">
                    <span className="input-group-text">
                      <i className="ri-lock-password-fill fs-5"></i>
                    </span>
                    <input
                      type="password"
                      ref={password}
                      defaultValue=""
                      id="password"
                      autoComplete="off"
                      className="form-control bg-transparent mb-0 fs-6   mb-0"
                      placeholder="Password"
                    />
                  </div>
                  <div
                    id="reenterpassworddiv"
                    className="input-group  fv-row mb-8"
                  >
                    <span className="input-group-text">
                      <i className="ri-lock-password-fill fs-5"></i>
                    </span>
                    <input
                      type="password"
                      ref={renterpassword}
                      defaultValue=""
                      autoComplete="off"
                      id="renterpassword"
                      className="form-control bg-transparent mb-0  fs-6   mb-0"
                      placeholder="Re-Enter Password"
                    />
                  </div>

                  <div className="d-grid mb-10">
                    <button
                      id="signupbtn"
                      onClick={(e) => signUpUser()}
                      className="btn btn-block  btn-primary mb-2 w-100"
                    >
                      Sign Up
                    </button>
                    <button
                      id="cancelbtn"
                      onClick={(e) => utility.reloadPage()}
                      className="btn btn-block btn-secondary mb-4 w-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-lg-500px d-flex flex-center px-10 mx-auto">
            <span className="text-muted text-center fw-semibold fs-6">
              {COMPANYNAME}
            </span>
          </div>
        </div>

        <div
          className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
          style={{
            backgroundImage: "url('../../assets/media/patterns/pattern-1.jpg')",
          }}
        >
          <div className="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
            <div className="mb-0 mb-lg-10">
              <img
                alt="Logo"
                src="../../assets/media/logos/custom-3.svg"
                className="h-40px h-lg-75px"
              />
            </div>

            <h1 className="d-block text-white mx-auto fs-lg-1qx mt-2 fw-bolder text-center mb-lg-7">
              {WEBAPPTAGLINE}
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ParentRegister;
export async function getStaticProps() {
  return {
    props: { accesstype: ['PARENTREGISTER'], onlyAdminAccess: false },
  };
}