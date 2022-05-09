import React from 'react';
import PropTypes from 'prop-types';
import './SnackBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STATUS } from '../../../constants/snackBarStatus';

const SnackBar = ({ type, show, message }) => {
  const snackBarContainers = {
    [STATUS.SUCCESS]: (
      <FontAwesomeIcon icon="fa-solid fa-check" color="white" fontSize="6x" />
    ),
    [STATUS.ERROR]: (
      <FontAwesomeIcon icon="fa-solid fa-xmark" color="white" fontSize="6x" />
    ),
    [STATUS.INFO]: (
      <FontAwesomeIcon icon="fa-solid fa-xmark" color="white" fontSize="6x" />
    ),
  };
  const selectedSnackBar = (type) => snackBarContainers[type];

  return (
    <div className={`snackbar ${type}`} id={show ? 'show' : 'hide'}>
      <div className="symbol">{selectedSnackBar(type) || null}</div>
      <div className="message">{message}</div>
    </div>
  );
};

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
