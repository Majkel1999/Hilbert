import React from 'react';
import PropTypes from 'prop-types';
import './SnackBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SnackBar = ({ type, show, message }) => (
  <div className={`snackbar ${type}`} id={show ? 'show' : 'hide'}>
    <div className="symbol">
      {type === 'success' ? (
        <FontAwesomeIcon icon="fa-solid fa-check" color="white" fontSize="6x" />
      ) : (
        <FontAwesomeIcon icon="fa-solid fa-xmark" color="white" fontSize="6x" />
      )}
    </div>
    <div className="message">{message}</div>
  </div>
);

export default SnackBar;
SnackBar.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  show: PropTypes.bool,
};

SnackBar.defaultProps = {
  message: '',
  type: '',
  show: false,
};
