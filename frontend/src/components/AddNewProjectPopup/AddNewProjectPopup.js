import { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';
import Input from '../UI/Input/Input';

import './AddNewProjectPopup.scss';
import TagList from '../Tags/TagList';

export default function AddNewProjectPopup({ open, onCloseHandler }) {
  const [projectName, setProjectName] = useState();
  const [enteredTags, setEnteredTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const addNewTag = () => {
    const tagIndex = enteredTags.findIndex((item) => item === currentTag);
    if (tagIndex < 0) {
      setEnteredTags([...enteredTags, currentTag]);
    }
  };

  const popupBodyContent = (
    <div>
      <Input
        showLabel={false}
        labelName="Project name"
        onChangeHandler={(e) => setProjectName(e.target.value)}
        value={projectName}
        type="text"
      />
      <TagList
        tags={enteredTags}
        addNewTagHandler={addNewTag}
        setTagName={setCurrentTag}
      />
    </div>
  );
  const popupButtons = [
    {
      text: 'Add new project',
      onClickHandler: () => {},
    },
    {
      text: 'Close',
      onClickHandler: () => {},
    },
  ];

  const headerText = 'Creating new project';

  return (
    <div className="addNewProjectPopupContainer">
      <Popup
        open={open}
        onCloseHandler={() => onCloseHandler(false)}
        showCloseIcon
        bodyContent={popupBodyContent}
        headerText={headerText}
        popupButtons={popupButtons}
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
