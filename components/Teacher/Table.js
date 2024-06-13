import { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
// import Dropdown from "@/app/Components/Dropdown";
// import SubscriptionPlanModal from "@/app/Components/SubscriptionPlanModal";
import Dropdown from './Dropdown';
import SubscriptionPlanModal from './SubscriptionPlanModal';

const StudentDataTable = ({ dummyTableData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    board: '',
    grade: '',
    city: '',
  });
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [shouldShowData, setShouldShowData] = useState(false);
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    // Filter students based on selected options and city filter
    const filtered = dummyTableData.filter((student) => {
      return (
        (!selectedOptions.board || student.board === selectedOptions.board) &&
        (!selectedOptions.grade || student.grade === selectedOptions.grade) &&
        (!selectedOptions.city || student.city === selectedOptions.city) &&
        (!cityFilter || student.city.includes(cityFilter))
      );
    });
    setFilteredStudents(filtered);
    setShouldShowData(filtered.length > 0); // Check if there are filtered students
  }, [selectedOptions, dummyTableData, cityFilter]);

  const studentsPerPage = 10;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = shouldShowData
    ? filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
    : [];

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleView = () => {
    setShowModal(true);
  };

  const handleDropdownChange = (name, value) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setCurrentPage(1); // Reset current page when dropdown value changes
  };

  const handleFilterButtonClick = (cityFilter) => {
    setCityFilter(cityFilter);
  };

  return (
    <div>
      <Dropdown
        onDropdownChange={handleDropdownChange}
        onFilterButtonClick={handleFilterButtonClick}
      />
      <div
        style={{
          margin: 'auto',
          width: '80%',
          padding: '20px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Table
          striped
          bordered
          hover
          responsive="sm"
          style={{ width: '100%', fontSize: '18px' }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>City</th>
              <th>Email</th>
              <th>Grade</th>
              <th>Board</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr
                key={index}
                style={{
                  cursor: 'pointer',
                  backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#fff',
                }}
              >
                <td
                  style={{
                    width: '10%',
                    textAlign: 'center',
                    fontSize: '20px',
                    padding: '10px',
                  }}
                >
                  {indexOfFirstStudent + index + 1}
                </td>
                <td
                  style={{
                    width: '15%',
                    textAlign: 'center',
                    fontSize: '20px',
                    padding: '10px',
                  }}
                >
                  {student.name}
                </td>
                <td
                  style={{
                    width: '15%',
                    textAlign: 'center',
                    fontSize: '20px',
                    padding: '10px',
                  }}
                >
                  {student.city}
                </td>
                <td
                  style={{
                    width: '20%',
                    textAlign: 'center',
                    fontSize: '20px',
                    padding: '10px',
                  }}
                >
                  {student.email}
                </td>
                <td
                  style={{
                    width: '10%',
                    textAlign: 'center',
                    fontSize: '20px',
                    padding: '10px',
                  }}
                >
                  {student.grade}
                </td>
                <td
                  style={{
                    width: '15%',
                    textAlign: 'center',
                    fontSize: '20px',
                    padding: '10px',
                  }}
                >
                  {student.board}
                </td>
                <td
                  style={{ width: '15%', textAlign: 'center', padding: '10px' }}
                >
                  <Button
                    variant="info"
                    size="lg"
                    style={{
                      color: 'white',
                      backgroundColor: '#007bff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = '#0056b3')
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = '#007bff')
                    }
                    onClick={handleView}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
            {currentStudents.length === 0 && shouldShowData && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <SubscriptionPlanModal
            show={showModal}
            onHide={() => setShowModal(false)}
          />
        </Modal>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            variant="primary"
            size="lg"
            style={{
              color: 'white',
              backgroundColor: '#007bff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            size="lg"
            style={{
              color: 'white',
              backgroundColor: '#007bff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
              marginLeft: '10px',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDataTable;
