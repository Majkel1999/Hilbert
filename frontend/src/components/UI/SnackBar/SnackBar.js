import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import './SnackBar.scss';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const SnackBar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));

  return (
    <div className="snackbar" id={showSnackbar ? 'show' : 'hide'}>
      <div className="symbol">
        {props.type === 'success' ? (
          <DoneIcon color="success" fontSize="large" />
        ) : (
          <ClearIcon color="warning" fontSize="large" />
        )}
      </div>
      <div className="message">{props.message}</div>
    </div>
  );
});

export default SnackBar;
SnackBar.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

SnackBar.defaultProps = {
  message: '',
  type: '',
};
