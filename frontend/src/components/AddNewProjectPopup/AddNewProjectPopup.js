import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Popup from '../UI/Popup/Popup';
import Input from '../UI/Input/Input';
import { sendProjectsData } from '../../store/projects/project-actions';

import './AddNewProjectPopup.scss';
import TagList from '../Tags/TagList';

export default function AddNewProjectPopup({ open, onCloseHandler }) {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState();
  const [enteredTags, setEnteredTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const addNewTag = () => {
    const tagIndex = enteredTags.findIndex((item) => item === currentTag);
    if (tagIndex < 0) {
      setEnteredTags([...enteredTags, currentTag]);
    }
  };
  const removeTag = (tagName) => {
    setEnteredTags(enteredTags.filter((item) => item !== tagName));
  };

  const createProject = () => {
    dispatch(sendProjectsData({ name: projectName, tags: enteredTags }));
  };

  // eslint-disable-next-line no-unused-vars
  const [checkBoxes, setCheckBoxes] = useState([
    {
      id: 'multiLabel',
      text: 'Multi label',
      value: true,
    },
    {
      id: 'singleLabel',
      text: 'Single label',
      value: false,
    },
  ]);

  const checkboxHandler = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    const tempCheckboxes = checkBoxes;
    const updatedCheckBoxIndex = tempCheckboxes.findIndex(
      (item) => item.id === e.target.name,
    );
    tempCheckboxes[updatedCheckBoxIndex].value = true;

    console.log(tempCheckboxes);
    setCheckBoxes(tempCheckboxes);
  };

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
        removeTagHandler={removeTag}
        setTagName={setCurrentTag}
      />
      <div className="checkBoxContainer">
        {checkBoxes.map((item) => (
          <div key={item.id}>
            <input
              id={item.id}
              type="checkbox"
              onChange={checkboxHandler}
              value={item.value}
              checked={item.value}
              name={item.id}
            />
            <label htmlFor={item.id}>{item.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
  const popupButtons = [
    {
      text: 'Add new project',
      onClickHandler: () => createProject(),
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
