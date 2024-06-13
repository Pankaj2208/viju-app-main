import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Script from 'next/script';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import AddorUpdateActivity from '../../components/masters/add-update-activitys';
import Sidebar from '../../components/sidebar';
import * as fbc from '../../firebase/firebaseConstants';
import { db } from '../../firebase/firebaseconfig';
import * as utility from '../../libraries/utility';
const Activitys = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [selectActivity, setselectActivity] = useState(null);
  const [addActivityModal, setaddActivityModal] = useState(null);
  const [allActivityDocs, setActivityDocs] = useState([]);
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
    if (selectActivity == null) {
      return;
    }
    addActivityModal.show();
  }, [selectActivity]);
  function addNewActivity() {
    setselectActivity(() => {
      return null;
    });
    addActivityModal.show();
  }
  // function viewActivity(activity_uid) {
  //   window.open(
  //     window.location.origin + '/masters/activity-details?view=' + activity_uid,
  //     '_blank'
  //   );
  // }
  function modifyActivity(activity_uid) {
    setselectActivity((user) => {
      var empDoc = null;
      allActivityDocs.map((activityDoc, index) => {
        if (activityDoc[fbc.ACTIVITY_UID] === activity_uid) {
          empDoc = activityDoc;
        }
      });
      console.log({ activity_uid, empDoc });
      return empDoc;
    });
    // addBoardModal.show();
  }

  async function getAllActivitys() {
    utility.showloading();
    try {
      const activityReF = collection(db, fbc.ACTIVITY_COLLECTION);
      var allActivitys = [];
      const q = query(activityReF, orderBy(fbc.ACTIVITY_NAME));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allActivitys.push(doc.data());
      });
      setActivityDocs(allActivitys);
    } catch (error) {
      console.log('Unsuccessful returned error', error);
      errorCallback(error);
    }

    utility.hideloading();
  }

  useEffect(() => {
    if (allActivityDocs.length > 0) {
      allActivityDocs.map((activityDoc, index) => {
        var active = `<span class="badge p-3 fs-7 badge-light-success">
                            Active
                          </span>`;
        var inactive = `<span class="badge p-3 fs-7 badge-light-danger">
                            In-Active
                          </span>`;

        var rowitem = `<tr>
                        <td class="text-gray-800 mb-1">${index + 1}.</td>
                        <td class="text-gray-800 mb-1">${
                          activityDoc[fbc.ACTIVITY_NAME]
                        }</td>
                        <td class="text-gray-800 mb-1">${
                          activityDoc[fbc.ACTIVITY_CODE]
                        }</td>

                        <td>
                          ${
                            activityDoc[fbc.ACTIVITY_STATUS] ? active : inactive
                          }
                        </td>

                        <td class="text-end">
                          <button id="modify_${
                            activityDoc[fbc.ACTIVITY_UID]
                          }" class="btn btn-sm btn-light btn-active-light-primary m-1">
                            MODIFY
                          </button>
                          
                        </td>
                      </tr>`;

        $('#Activitystablebody').append(rowitem);
        $('#modify_' + activityDoc[fbc.ACTIVITY_UID]).on('click', function () {
          modifyActivity(this.id.replaceAll('modify_', ''));
        });
        // $('#view_' + activityDoc[fbc.ACTIVITY_UID]).on('click', function () {
        //   viewActivity(this.id.replaceAll('view_', ''));
        // });
      });

      var datatable = $('#Activitystable').DataTable({
        info: false,
        dom: 'Rlfrtip',
        autoWidth: false,
        orderCellsTop: true,
        scrollY: $(window).height() * 0.65 + 'px',
        scrollCollapse: true,
        paging: false,
        scrollX: true,
        fixedHeader: {
          header: true,
          footer: true,
        },
        columnDefs: [
          { width: '5%', targets: [0, 4] },
          { width: '15%', targets: [2, 3] },
        ],
      });

      $('#searchbox').keyup(function () {
        datatable.search(this.value).draw();
      });
      $('.dataTables_filter').addClass('d-none');
    }
  }, [allActivityDocs]);

  useEffect(() => {}, []);
  const handleReadyScript = () => {
    console.log('SCRIPT Ready');
    getAllActivitys();
    // KTCustomersList.init();
    // KTCustomersExport.init();
  };

  const handleLoadScript = () => {
    console.log('SCRIPT LOADED');
  };
  const handleLoadErrorScript = (e) => {
    console.log('SCRIPT Error', e);

    showsnackbar('error', 'Failed To Load Script');
  };

  return (
    <div>
      <Script
        onReady={handleReadyScript}
        onLoad={handleLoadScript}
        onError={handleLoadErrorScript}
        src="../../../assets/plugins/datatables/datatables.bundle.js"
      />
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div
          className="app-page flex-column flex-column-fluid"
          id="kt_app_page"
        >
          <Header title={'Activitys'} />

          <div
            className="app-wrapper flex-column flex-row-fluid"
            id="kt_app_wrapper"
          >
            <Sidebar />
            <div
              className="app-main flex-column flex-row-fluid py-2 px-4"
              id="kt_app_main"
            >
              <div className="card">
                <div className="card-header py-2 px-4">
                  <div className="card-title">
                    <div className="d-flex align-items-center position-relative my-1">
                      <span className="svg-icon svg-icon-1 position-absolute ms-6">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.5"
                            x="17.0365"
                            y="15.1223"
                            width="8.15546"
                            height="2"
                            rx="1"
                            transform="rotate(45 17.0365 15.1223)"
                            fill="currentColor"
                          />
                          <path
                            d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>

                      <input
                        type="text"
                        id="searchbox"
                        className="form-control form-control-solid w-250px ps-15"
                        placeholder="Search"
                      />
                    </div>
                  </div>

                  <div className="card-toolbar">
                    <div
                      className="d-flex justify-content-end"
                      data-kt-customer-table-toolbar="base"
                    >
                      <button
                        type="button"
                        className="btn btn-sm fs-5 btn-light-primary"
                        // data-bs-toggle="modal"
                        onClick={(e) => addNewActivity()}
                        // data-bs-target="#modal_adduser"
                      >
                        Add Activity
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body p-4" id="contentdiv">
                  <table
                    className="table align-middle table-row-dashed fs-6 gy-5"
                    id="Activitystable"
                  >
                    <thead>
                      <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th className="py-0 px-3">#</th>
                        <th className="py-0 px-3 min-w-125px">Name</th>
                        <th className="py-0 px-3 min-w-125px">Code</th>
                        <th className="py-0 px-3 min-w-125px">Status</th>
                        <th className="py-0 px-3 text-end min-w-70px">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody
                      id="Activitystablebody"
                      className="fw-semibold text-gray-600"
                    ></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddorUpdateActivity
        setselectActivity={setselectActivity}
        selectActivity={selectActivity}
        setActivityModal={setaddActivityModal}
      />
    </div>
  );
};

export default Activitys;
export async function getStaticProps() {
  return {
    props: { module: 'ACTIVITYMASTER', onlyAdminAccess: false },
  };
}
