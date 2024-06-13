import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dropdown = ({ onDropdownChange, onFilterButtonClick,setBoardschoices, setCourseschoices  }) => {
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    onDropdownChange(name, value);
  };

  const handleFilterButtonClick = () => {
    onFilterButtonClick();
  };

  useEffect(() => {
  const handleReadyScript = () => {
    console.log('SCRIPT Ready');

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
  };
  handleReadyScript();
}, [setBoardschoices, setCourseschoices]);
  return (
    <div
      className="container"
      style={{ marginBottom: '1vw', marginRight: '100px', width: '100%' }}
    >
      <div className="row">
        <div className="col">
          {/* <select className="form-select" name="board" onChange={handleDropdownChange}>
            <option value="">Select Board</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
          </select> */}
          <div className="d-flex flex-row gap-2 me-4 border-end pe-4">
            <div className="fv-row" style={{ width: '200px' }}>
              <select id="boardselect"></select>
            </div>
          </div>
        </div>
        <div className="col">
          {/* <select
            className="form-select"
            name="grade"
            onChange={handleDropdownChange}
          >
            <option value="">Select Grade</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            {/* Add more grade options as needed */}
          {/* </select> */}
          <div className="fv-row" style={{ width: '200px' }}>
            <select id="courseselect"></select>
          </div>
        </div>
        <div className="col">
          <select
            className="form-select"
            name="city"
            onChange={handleDropdownChange}
          >
            <option value="">Select City</option>
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Pune</option>
            {/* Add more city options as needed */}
          </select>
        </div>
        <div className="col">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleFilterButtonClick}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;