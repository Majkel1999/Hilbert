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

  const checkBoxes = [
    {
      id: 'multiLabel',
      text: 'Multi label',
    },
    {
      id: 'singleLabel',
      text: 'Single label',
    },
  ];

  const popupBodyContent = (
    <div className="bodyContent">
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
      <div className="checkBoxContainer">
        {checkBoxes.map((item) => (
          <div key={item.id}>
            <input id={item.id} type="checkbox" />
            <label htmlFor={item.id}>{item.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
  const popupButtons = [
    {
      text: 'Add new project',
      onClickHandler: () => {},
    },
    {
      text: 'Close',
      onClickHandler: () => onCloseHandler(false),
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
