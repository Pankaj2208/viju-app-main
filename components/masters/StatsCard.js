import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const StatsCard = () => {
  return (
    <div className="container">
      <div className="row justify-content-around">
        <div className="col-lg-3 col-md-6 col-sm-12 mb-3 text-center">
          <div className="card bg-info text-white shadow p-3 mb-5 bg-white rounded">
            <div className="card-body d-flex align-items-center">
              <FontAwesomeIcon icon={faUsers} style={{ fontSize: '2em', marginRight: '0.5em' }} />
              <span className="count-name" style={{ fontSize: '1.5em' }}>
                List
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
