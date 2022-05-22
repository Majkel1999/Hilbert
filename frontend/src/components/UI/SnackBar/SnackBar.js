import React from 'react';
import PropTypes from 'prop-types';
import './SnackBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SNACKBAR_STATUS } from '../../../constants/stateStatuses';

const SnackBar = ({ type, show, message }) => {
  const snackBarContainers = {
    [SNACKBAR_STATUS.SUCCESS]: (
      <FontAwesomeIcon icon="fa-solid fa-check" color="white" />
    ),
    [SNACKBAR_STATUS.ERROR]: (
      <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" color="white" />
    ),
    [SNACKBAR_STATUS.INFO]: (
      <FontAwesomeIcon icon="fa-solid fa-circle-info" color="white" />
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
