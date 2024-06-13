import { useState, useEffect } from 'react';
import StatsCard from '@/components/masters/StatsCard';
import UserList from '@/components/masters/UserList';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Script from 'next/script';
import { useSnackbar } from 'notistack';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import * as fbc from '../firebase/firebaseConstants';
import { db } from '../firebase/firebaseconfig';
import * as utility from '../libraries/utility';

const Employees = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectUser, setSelectUser] = useState(null);
  const [addUserModal, setAddUserModal] = useState(null);
  const [allEmployeeDocs, setEmployeeDocs] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

  const showSnackbar = (variant, message) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
    });
  };

  const errorCallback = (err) => {
    utility.hideloading();
    showSnackbar('error', err.message);
  };

  useEffect(() => {
    if (selectUser == null) {
      return;
    }
    addUserModal.show();
  }, [selectUser]);

  function addNewUser() {
    setSelectUser(null);
    addUserModal.show();
  }

  function modifyEmployee(employee_uid) {
    setSelectUser((user) => {
      let empDoc = null;
      allEmployeeDocs.map((employeeDoc) => {
        if (employeeDoc[fbc.EMPLOYEE_UID] === employee_uid) {
          empDoc = employeeDoc;
        }
      });
      return empDoc;
    });
  }

  async function getAllEmployees() {
    utility.showloading();
    try {
      const EmployeeReF = collection(db, fbc.EMPLOYEE_COLLECTION);
      const allEmployees = [];
      const q = query(EmployeeReF, orderBy(fbc.EMPLOYEE_NAME));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allEmployees.push(doc.data());
      });
      setEmployeeDocs(allEmployees);
    } catch (error) {
      errorCallback(error);
    }
    utility.hideloading();
  }

  useEffect(() => {
    if (allEmployeeDocs.length > 0) {
      allEmployeeDocs.map((employeeDoc, index) => {
        const active = `<span class="badge p-3 fs-7 badge-light-success">Active</span>`;
        const inactive = `<span class="badge p-3 fs-7 badge-light-danger">In-Active</span>`;
        const rowitem = `<tr>
                        <td class="text-gray-800 mb-1">${index + 1}.</td>
                        <td class="text-gray-800 mb-1">${employeeDoc[fbc.EMPLOYEE_NAME]}</td>
                        <td class="text-gray-800 mb-1">${employeeDoc[fbc.EMPLOYEE_EMAILADDRESS]}</td>
                        <td class="text-gray-800 mb-1">${employeeDoc[fbc.EMPLOYEE_CODE]}</td>
                        <td>${employeeDoc[fbc.EMPLOYEE_STATUS] ? active : inactive}</td>
                        <td class="text-end">
                          <button id="${employeeDoc[fbc.EMPLOYEE_UID]}" class="btn btn-sm btn-light btn-active-light-primary m-1">
                            MODIFY
                          </button>
                        </td>
                      </tr>`;
        $('#employeestablebody').append(rowitem);
        $('#' + employeeDoc[fbc.EMPLOYEE_UID]).on('click', function () {
          modifyEmployee(this.id);
        });
      });

      const datatable = $('#employeestable').DataTable({
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
          { width: '5%', targets: [0, 5] },
          { width: '15%', targets: [2, 3, 4] },
        ],
      });

      $('#searchbox').keyup(function () {
        datatable.search(this.value).draw();
      });
      $('.dataTables_filter').addClass('d-none');
    }
  }, [allEmployeeDocs]);

  const handleReadyScript = () => {
    utility.hideloading();
  };

  const handleLoadScript = () => {
    console.log('SCRIPT LOADED');
  };

  const handleLoadErrorScript = (e) => {
    console.log('SCRIPT Error', e);
    showSnackbar('error', 'Failed To Load Script');
  };

  return (
    <>
      <div style={{ backgroundColor: '#E6E6FA' }}>
        <Script
          onReady={handleReadyScript}
          onLoad={handleLoadScript}
          onError={handleLoadErrorScript}
          src="../../../assets/plugins/datatables/datatables.bundle.js"
        />
        <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
          <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
            <Header title={'Dashboard'} />
            <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
              <Sidebar />
              {/* <div className="app-main flex-row flex-row-fluid py-4 px-4 m10" id="kt_app_main"> */}
                <div >
                  <StatsCard />
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
        <div className="py-2 px-4 m10" style={{  marginLeft: '6vw' }}>
          <UserList />
        </div>
    </>
  );
};

export default Employees;

export async function getStaticProps() {
  return {
    props: { module: 'EMPLOYEEDASHBOARD', onlyAdminAccess: false },
  };
}
