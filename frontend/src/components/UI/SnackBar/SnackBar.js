import React from 'react';
import PropTypes from 'prop-types';
import './SnackBar.scss';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const SnackBar = ({ type, show, message }) => (
  <div className="snackbar" id={show ? 'show' : 'hide'}>
    <div className="symbol">
      {type === 'success' ? (
        <DoneIcon color="success" fontSize="large" />
      ) : (
        <ClearIcon color="warning" fontSize="large" />
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
