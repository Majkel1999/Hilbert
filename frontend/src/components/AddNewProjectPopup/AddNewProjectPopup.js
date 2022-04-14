import { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';
import Input from '../UI/Input/Input';

import './AddNewProjectPopup.scss';

export default function AddNewProjectPopup({ open, onCloseHandler }) {
  const [projectName, setProjectName] = useState();

  const popupBodyContent = (
    <div>
      <Input
        showLabel={false}
        labelName="Project name"
        onChangeHandler={(e) => setProjectName(e.target.value)}
        value={projectName}
        type="text"
      />
    </div>
  );
  const headerText = 'Creating new project';

  return (
    <div className="addNewProjectPopupContainer">
      <Popup
        open={open}
        onCloseHandler={() => onCloseHandler(false)}
        showCloseIcon
        bodyContent={popupBodyContent}
        headerText={headerText}
      />
    </div>
  );
}

AddNewProjectPopup.propTypes = {
  open: PropTypes.bool,
  onCloseHandler: PropTypes.func,
};

AddNewProjectPopup.defaultProps = {
  open: false,
  onCloseHandler: () => {},
};
