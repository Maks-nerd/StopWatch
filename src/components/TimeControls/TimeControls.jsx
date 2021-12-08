//Модули
import React from 'react';
import PropTypes from 'prop-types';

//Хелперы
import setTimeFormat from '../../helpers/timeFormat';

const TimeControls = ({ time, startTime, stopTime, resetTime, waitTime }) => (
  <>
    <div className="text-center">
      <h1 className="text-primary">StopWatch</h1>
      <h1>{setTimeFormat(time)}</h1>
    </div>
    <div className="text-center mt-3">
      <button type="button" className="btn btn-primary me-3" onClick={startTime}>
        Start
      </button>
      <button type="button" className="btn btn-secondary me-3" onClick={stopTime}>
        Stop
      </button>
      <button type="button" className="btn btn-success me-3" onClick={resetTime}>
        Reset
      </button>
      <button type="button" className="btn btn-warning" onClick={waitTime}>
        Wait
      </button>
    </div>
  </>
);

TimeControls.propTypes = {
  time: PropTypes.number.isRequired,
  startTime: PropTypes.func.isRequired,
  stopTime: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  waitTime: PropTypes.func.isRequired,
};

export default TimeControls;
