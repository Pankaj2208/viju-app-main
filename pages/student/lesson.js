import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import * as fbc from '../../firebase/firebaseConstants';
import { db } from '../../firebase/firebaseconfig';
import * as utility from '../../libraries/utility';

const SubjectDetails = () => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [lessons, setlessons] = useState([]);
  const [subjectDetails, setsubjectDetails] = useState(null);
  const [lessonsDetails, setlessonsDetails] = useState(null);
  const [subjectUID, setSubjectUID] = useState(null);
  const [lessonUID, setLessonUID] = useState(null);

  useEffect(() => {
    let subjectuid = router.query.view;
    let lessonuid = router.query?.lesson || null;

    setSubjectUID(() => {
      return subjectuid;
    });
    setLessonUID(() => {
      return lessonuid;
    });
  }, []);

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
    if (subjectUID !== null && subjectUID !== undefined) {
      console.log(subjectUID);
      fetchSubjectdetails(subjectUID);
      getSubjectLessons(subjectUID);
    }
  }, [subjectUID]);
  useEffect(() => {
    console.log(lessonUID);
    if (lessonUID !== null && lessonUID !== undefined) {
      fetchLessondetails(lessonUID);
      setTimeout(() => {
        $('#content_tabbtn_' + lessonUID).click();
      }, 1500);
    }
  }, [lessonUID]);

  async function fetchLessondetails(uid) {
    utility.showloading();
    const docRef = doc(db, fbc.LESSON_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    utility.hideloading();
    if (docSnap.exists()) {
      console.log(docSnap.data());
      setlessonsDetails(docSnap.data());
    } else {
      setlessonsDetails(null);
    }
  }

  async function fetchSubjectdetails(uid) {
    utility.showloading();
    const docRef = doc(db, fbc.SUBJECT_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    utility.hideloading();
    if (docSnap.exists()) {
      console.log(docSnap.data());
      setsubjectDetails(docSnap.data());
    } else {
      setsubjectDetails(null);
    }
  }

  async function getSubjectLessons(uid) {
    const lessonRef = collection(db, fbc.LESSON_COLLECTION);
    const q = query(
      lessonRef,
      where(fbc.LESSON_SUBJECT + `.uid`, '==', uid),
      where(fbc.LESSON_STATUS, '==', true)
    );
    var lessons = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lessons.push(doc.data());
    });
    setlessons(lessons);
  }

  async function getLessonAssessments(lessonuid) {
    console.log(lessonuid);
    var allAsmts = [];
    utility.showloading();
    try {
      const asmtReF = collection(db, fbc.ASMT_COLLECTION);
      const q = query(
        asmtReF,
        where(fbc.ASMT_LESSON + '.uid', '==', lessonuid),
        where(fbc.ASMT_STATUS, '==', true),
        orderBy(fbc.ASMT_CODE)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allAsmts.push(doc.data());
      });
    } catch (error) {
      console.log(error);
      errorCallback(error);
    }
    utility.hideloading();

    $(`#assesment_${lessonuid}`).empty();
    console.log('allAsmts : ' + allAsmts.length);

    if (allAsmts.length === 0) {
      var item = ` <div class="d-flex flex-row bg-white border rounded py-2 px-5 w-100 justify-content-between mb-2 ">

          <div class="d-flex flex-column">
            <span class="fs-5 fw-bold">No Assessment Added</span>
          </div>
        </div>`;

      $(`#assesment_${lessonuid}`).append(item);
      return;
    }

    allAsmts.map((asmt) => {
      var item = ` <div id="asmtdiv_${
        asmt[fbc.ASMT_UID]
      }" class="d-flex flex-row bg-white border rounded py-2 px-5 justify-content-between mb-2">
      
      <div class="d-flex flex-row align-items-center w-75"> 
      
          <div class="d-flex flex-column ps-4">

            <span class="text-xs text-muted mb-1">${asmt[fbc.ASMT_CODE]} | ${
        asmt[fbc.ASMT_DURATION]
      }mins | ${asmt[fbc.ASMT_TOTAL]}Marks</span>
            <span class="fs-6 fw-bold text-wrap">${asmt[fbc.ASMT_TITLE]}</span>

          </div>
      </div>

          <div class='d-flex flex-row align-items-center gap-2 py-2'>
         
           
            <button
            id="viewasmt_${
              asmt[fbc.ASMT_UID]
            }_${lessonuid}" class="btn  h-30px text-xs px-2 py-1 btn-sm btn-light-primary">
              <i class="ri-eye-fill fs-5"></i>
              view
            </button>
            
          </div>

        </div>`;

      $(`#assesment_${lessonuid}`).append(item);

      $(`#viewasmt_${asmt[fbc.ASMT_UID]}_${lessonuid}`).on(
        'click',
        function (e) {
          window.open(
            window.location.origin +
              '/student/assessment?id=' +
              this.id.split('_')[1],
            '_blank'
          );
        }
      );
    });
  }

  return (
    <div>
      <div
        className="d-flex flex-column flex-root app-root mh-100"
        style={{ height: '100vh' }}
        id="kt_app_root"
      >
        <div
          className="app-page flex-column flex-column-fluid"
          id="kt_app_page"
        >
          <Header title={'Lesson Details'} />

          <div
            className="app-wrapper flex-column flex-row-fluid"
            id="kt_app_wrapper"
          >
            <Sidebar />
            <div
              className="app-main flex-column flex-row-fluid py-2 px-2 mh-100 scroll"
              id="kt_app_main"
            >
              {subjectDetails != null && lessonsDetails != null ? (
                <>
                  <div className="card h-100">
                    <div className="card-header p-4">
                      <div className="card-title d-flex flex-row justify-content-between align-items-center w-100 mb-0 m-0">
                        <div className="d-flex flex-row align-items-center gap-4">
                          {/* <img src={lessonsDetails[fbc.LESSON_THUMBNAILURL]} className="bg-white rounded  w-65px h-65px"></img> */}

                          <div className="d-flex flex-column">
                            <span className="fs-1 mb-1 fw-bolder">
                              {' '}
                              {lessonsDetails[fbc.LESSON_NAME]}
                            </span>

                            <span className="fs-6 text-muted">
                              {utility.padwithzero(
                                Object.keys(lessonsDetails[fbc.LESSON_CONTENT])
                                  .length
                              )}{' '}
                              Contents
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="card-body p-2 d-flex flex-column "
                      id="contentdiv"
                    >
                      <div
                        className="accordion accordion-icon-toggle"
                        id="subjectlessonaccordian"
                      >
                        {
                          <div
                            id={
                              'kt_accordion_body_' +
                              lessonsDetails[fbc.LESSON_UID]
                            }
                            className={
                              'accordion-collapse collapse  ' +
                              (lessonUID !== null
                                ? lessonUID === lessonsDetails[fbc.LESSON_UID]
                                  ? ' show '
                                  : ''
                                : '')
                            }
                          >
                            <div className="accordion-body p-2">
                              <ul
                                id={
                                  'lessontabs_' + lessonsDetails[fbc.LESSON_UID]
                                }
                                className="nav nav-tabs border-0 flex-nowrap text-nowrap  my-2"
                              >
                                <li className="nav-item g-5">
                                  <button
                                    className="nav-link text-xs btn btn-outline btn-active-light-primary px-4 py-1 me-2"
                                    data-bs-toggle="tab"
                                    id={
                                      'content_tabbtn_' +
                                      lessonsDetails[fbc.LESSON_UID]
                                    }
                                    href={
                                      '#content_' +
                                      lessonsDetails[fbc.LESSON_UID]
                                    }
                                  >
                                    Content
                                  </button>
                                </li>

                                {subjectDetails[fbc.SUBJECT_HASASSESSMENTS] ? (
                                  <>
                                    <li className="nav-item g-5">
                                      <button
                                        onClick={(e) =>
                                          getLessonAssessments(
                                            e.target.id.replaceAll(
                                              'assesment_tabbtn_',
                                              ''
                                            )
                                          )
                                        }
                                        className="nav-link text-xs btn btn-outline btn-active-light-primary px-4 py-1 me-2"
                                        data-bs-toggle="tab"
                                        id={
                                          'assesment_tabbtn_' +
                                          lessonsDetails[fbc.LESSON_UID]
                                        }
                                        href={
                                          '#assesment_' +
                                          lessonsDetails[fbc.LESSON_UID]
                                        }
                                      >
                                        Assesment
                                      </button>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </ul>
                              <hr className="text-muted" />
                              <div
                                className="tab-content h-100"
                                id={
                                  'lessontabContent_' +
                                  lessonsDetails[fbc.LESSON_UID]
                                }
                              >
                                <div
                                  className="tab-pane fade h-100"
                                  id={
                                    'content_' + lessonsDetails[fbc.LESSON_UID]
                                  }
                                  role="tabpanel"
                                >
                                  {Object.keys(
                                    lessonsDetails[fbc.LESSON_CONTENT]
                                  ).map((key, index) => {
                                    var content =
                                      lessonsDetails[fbc.LESSON_CONTENT][key];
                                    return (
                                      <a
                                        onClick={(e) => {
                                          // window.location =
                                          //   '/student/content?view=' +
                                          //   content[fbc.CONTENT_UID];
                                          // content[fbc.CONTENT_ACCESSTYPE];
                                        }}
                                        id={content[fbc.CONTENT_UID]}
                                        key={index}
                                        className="d-flex flex-row align-items-center gap-4 bg-light border rounded p-2 mx-0 my-2"
                                      >
                                        <div className="d-flex flex-row">
                                          <span className="fs-3 text-primary ps-3 pe-3 fw-bold border-secondary border-end my-auto">
                                            {(() => {
                                              switch (
                                                content[fbc.CONTENT_FILE].mime
                                              ) {
                                                case 'application/pdf':
                                                  return (
                                                    <>
                                                      {' '}
                                                      <i className="ri-article-fill"></i>{' '}
                                                    </>
                                                  );
                                                case 'image/jpeg':
                                                  return (
                                                    <>
                                                      <i className="ri-image-2-fill"></i>
                                                    </>
                                                  );
                                                case 'video/url':
                                                  return (
                                                    <>
                                                      <i className="ri-play-circle-fill"></i>
                                                    </>
                                                  );
                                                default:
                                                  return null;
                                              }
                                            })()}
                                          </span>

                                          <br />
                                          <div className="d-flex flex-column mb-auto  ps-4">
                                            <span className="fs-6 text-dark mb-1 fw-bold">
                                              {content[fbc.CONTENT_HEADING]}
                                            </span>
                                            <span className="fs-8 text-muted text-wrap">
                                              {content[fbc.CONTENT_DESCRIPTION]}
                                            </span>
                                          </div>
                                        </div>
                                        {content[fbc.CONTENT_ACCESSTYPE] ===
                                          'PAID' && (
                                          <FontAwesomeIcon
                                            onClick={(e) => {
                                              window.location =
                                                '/student/Payment';
                                              // content?view=' +
                                              // content[fbc.CONTENT_UID];
                                            }}
                                            icon={faLockOpen}
                                            className="lock-icon"
                                            style={{ paddingLeft: '80%' }}
                                          />
                                        )}
                                      </a>
                                    );
                                  })}
                                </div>
                                <div
                                  className="tab-pane fade h-100"
                                  id={
                                    'assesment_' +
                                    lessonsDetails[fbc.LESSON_UID]
                                  }
                                  role="tabpanel"
                                ></div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                    <div></div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubjectDetails;
export async function getStaticProps() {
  return {
    props: { module: 'STUDENTSUBJECTDETAILS', onlyAdminAccess: false },
  };
}
