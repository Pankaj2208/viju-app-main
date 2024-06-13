import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  getStudentDetails,
  getTeacherDetails,
  getEmployeeDetail,
} from '../../firebase/masterAPIS';

const UserList = () => {
  const [loading, setLoading] = useState(true); // State variable to track loading
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');
  const [boardOptions, setBoardOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [boardFilter, setBoardFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [studentIDFilter, setStudentIDFilter] = useState('');
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);

  const usersPerPage = 2;

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before fetching

      try {
        if (filter === 'Student') {
          const studentDetails = await getStudentDetails();
          if (studentDetails && studentDetails.status) {
            setUsers(studentDetails.data);

            const boardSet = new Set(
              studentDetails.data.map((user) => user.student_details.boardname)
            );
            const gradeSet = new Set(
              studentDetails.data.map((user) => user.student_details.grade)
            );

            setBoardOptions(['', ...Array.from(boardSet)]);
            setGradeOptions(['', ...Array.from(gradeSet)]);
          }
        } else if (filter === 'Teacher') {
          const teacherDetails = await getTeacherDetails();
          if (teacherDetails && teacherDetails.status) {
            setTeachers(teacherDetails.data);
          }
        } else if (filter === 'Sub-Admin') {
          const employeeDetails = await getEmployeeDetail();
          if (employeeDetails && employeeDetails.status) {
            setEmployees(employeeDetails.data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchData();
  }, [filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, boardFilter, gradeFilter, studentIDFilter]);

  const handleConfirmDelete = (id) => {
    setDeleteUserId(id);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirmed = () => {
    const updatedUsers = users.filter((user) => user.id !== deleteUserId);
    setUsers(updatedUsers);
    setDeleteUserId(null);
    setShowDeletePopup(false);
  };

  const handleModify = (id, newName, newEmail) => {
    const modifiedUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          student_name: newName,
          student_emailaddress: newEmail,
        };
      }
      return user;
    });
    setUsers(modifiedUsers);
    setShowModifyPopup(true);
  };

  const handlePopupClose = () => {
    setShowDeletePopup(false);
    setShowModifyPopup(false);
  };

  const handleStudentDetails = (studentUid) => {
    const studentDetails = users.find(
      (user) => user.student_details.student_uid === studentUid
    );
    setSelectedStudentDetails(studentDetails);
  };

  const filteredUsers =
    filter === 'Student'
      ? users.filter((user) => {
          const board = user.student_details?.boardname
            ? user.student_details.boardname.toLowerCase()
            : '';
          const grade = user.student_details?.grade
            ? user.student_details.grade.toLowerCase()
            : '';
          const username = user.student_name
            ? user.student_name.toLowerCase()
            : '';
          const email = user.student_emailaddress
            ? user.student_emailaddress.toLowerCase()
            : '';

          return (
            (filter === '' || filter === 'Student') &&
            (!boardFilter || board.includes(boardFilter.toLowerCase())) &&
            (!gradeFilter || grade.includes(gradeFilter.toLowerCase())) &&
            (!studentIDFilter ||
              user.student_details.student_uid.includes(
                studentIDFilter.toLowerCase()
              )) &&
            (username.includes(searchTerm.toLowerCase()) ||
              email.includes(searchTerm.toLowerCase()))
          );
        })
      : filter === 'Teacher'
      ? teachers.filter((teacher) => {
          const board = teacher.teacher_details.boardname
            ? teacher.teacher_details.boardname.toLowerCase()
            : '';
          const username = teacher.teacher_name
            ? teacher.teacher_name.toLowerCase()
            : '';
          const email = teacher.teacher_emailaddress
            ? teacher.teacher_emailaddress.toLowerCase()
            : '';

          return (
            (filter === '' || filter === 'Teacher') &&
            (!boardFilter || board.includes(boardFilter.toLowerCase())) &&
            (username.includes(searchTerm.toLowerCase()) ||
              email.includes(searchTerm.toLowerCase()))
          );
        })
      : employees.filter((employee) => {
          const username = employee.employee_name
            ? employee.employee_name.toLowerCase()
            : '';
          const email = employee.employee_emailaddress
            ? employee.employee_emailaddress.toLowerCase()
            : '';

          return (
            (filter === '' || filter === 'Sub-Admin') &&
            (!boardFilter || board.includes(boardFilter.toLowerCase())) &&
            (username.includes(searchTerm.toLowerCase()) ||
              email.includes(searchTerm.toLowerCase()))
          );
        });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container py-4">
      <div
        className="card shadow"
        style={{ height: '20vh', display: 'flex', justifyContent: 'center' }}
      >
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center me-2">
            <FontAwesomeIcon icon={faFilter} />
            <h4 className="me-2 ms-2 mb-0">Filter</h4>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <div className="filter-section me-2">
                <select
                  className="form-select form-select-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ width: '200px' }} // Set a fixed width for the dropdown
                >
                  <option value="">-- Select Role --</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                  <option value="Sub-Admin">Admin</option>
                </select>
              </div>
              {filter === 'Student' && (
                <>
                  <div className="filter-section me-2">
                    <select
                      className="form-select form-select-sm"
                      value={boardFilter}
                      onChange={(e) => setBoardFilter(e.target.value)}
                      style={{ width: '200px' }} // Set the same fixed width for the dropdown
                    >
                      <option value="">-- Select Board --</option>
                      {boardOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-section me-2">
                    <select
                      className="form-select form-select-sm"
                      value={gradeFilter}
                      onChange={(e) => setGradeFilter(e.target.value)}
                      style={{ width: '200px' }} // Set the same fixed width for the dropdown
                    >
                      <option value="">-- Select Grade --</option>
                      {gradeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div
                className="filter-section me-2"
                style={{ height: 'fit-content' }}
              >
                <div className="input-group" style={{ height: '100%' }}>
                  <div
                    className="input-group-text bg-transparent border-0"
                    style={{ height: '100%' }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Name and Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '200px',
                      height: '30px',
                      marginTop: 7,
                      borderRadius: 5,
                      outline: 'none',
                      borderColor: '#ccc', // Set the border color to medium grey
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="filter-section me-2">
              <Button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setBoardFilter('');
                  setGradeFilter('');
                  setStudentIDFilter('');
                  setSearchTerm('');
                  setFilter('');
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="container py-4">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className="container py-4">
              {filter && (
                <>
                  <div className="card shadow">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              <th
                                className="table-header"
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: '1.2em',
                                  textAlign: 'center',
                                }}
                              >
                                Name
                              </th>
                              <th
                                className="table-header"
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: '1.2em',
                                  textAlign: 'center',
                                }}
                              >
                                Email
                              </th>
                              {filter === 'Student' && (
                                <>
                                  <th
                                    className="table-header"
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: '1.2em',
                                      textAlign: 'center',
                                    }}
                                  >
                                    Board
                                  </th>
                                  <th
                                    className="table-header"
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: '1.2em',
                                      textAlign: 'center',
                                    }}
                                  >
                                    Grade
                                  </th>
                                </>
                              )}
                              <th
                                className="table-header"
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: '1.2em',
                                  textAlign: 'center',
                                }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsers
                              .slice(
                                (currentPage - 1) * usersPerPage,
                                currentPage * usersPerPage
                              )
                              .map((user) => (
                                <tr key={user.id}>
                                  <td
                                    className="table-cell"
                                    style={{
                                      fontSize: '1em',
                                      color: 'black',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {user.hasOwnProperty('student_name')
                                      ? user.student_name
                                      : user.hasOwnProperty('teacher_name')
                                      ? user.teacher_name
                                      : user.employee_name}
                                  </td>
                                  <td
                                    className="table-cell"
                                    style={{
                                      fontSize: '1em',
                                      color: 'black',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {user.hasOwnProperty('student_emailaddress')
                                      ? user.student_emailaddress
                                      : user.hasOwnProperty(
                                          'teacher_emailaddress'
                                        )
                                      ? user.teacher_emailaddress
                                      : user.employee_emailaddress}
                                  </td>
                                  {filter === 'Student' && (
                                    <>
                                      <td
                                        className="table-cell"
                                        style={{
                                          fontSize: '1em',
                                          color: 'black',
                                          textAlign: 'center',
                                        }}
                                      >
                                        {user.student_details
                                          ? user.student_details.boardname
                                          : ''}
                                      </td>
                                      <td
                                        className="table-cell"
                                        style={{
                                          fontSize: '1em',
                                          color: 'black',
                                          textAlign: 'center',
                                        }}
                                      >
                                        {user.student_details
                                          ? user.student_details.grade
                                          : ''}
                                      </td>
                                    </>
                                  )}
                                  <td
                                    className="table-cell"
                                    style={{
                                      fontSize: '1em',
                                      color: 'black',
                                      textAlign: 'center',
                                    }}
                                  >
                                    <Button
                                      variant="warning"
                                      className="btn-sm table-action-button me-2"
                                      onClick={() =>
                                        handleModify(
                                          user.id,
                                          user.hasOwnProperty('student_name')
                                            ? user.student_name
                                            : user.hasOwnProperty(
                                                'teacher_name'
                                              )
                                            ? user.teacher_name
                                            : user.employee_name,
                                          user.hasOwnProperty(
                                            'student_emailaddress'
                                          )
                                            ? user.student_emailaddress
                                            : user.hasOwnProperty(
                                                'teacher_emailaddress'
                                              )
                                            ? user.teacher_emailaddress
                                            : user.employee_emailaddress
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                      variant="danger" // Use outline-danger for light red color
                                      className="btn-sm table-action-button"
                                      onClick={() =>
                                        handleConfirmDelete(user.id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="warning"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="primary"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}

      <Modal show={showDeletePopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopupClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModifyPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modify user form goes here...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopupClose}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={!!selectedStudentDetails}
        onHide={() => setSelectedStudentDetails(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudentDetails && (
            <div>
              <p>
                <strong>Name:</strong> {selectedStudentDetails.student_name}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                {selectedStudentDetails.student_emailaddress}
              </p>
              <p>
                <strong>Board:</strong>{' '}
                {selectedStudentDetails.student_details.boardname}
              </p>
              <p>
                <strong>Grade:</strong>{' '}
                {selectedStudentDetails.student_details.grade}
              </p>
              <p>
                <strong>Student ID:</strong>{' '}
                {selectedStudentDetails.student_details.student_uid}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setSelectedStudentDetails(null)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
