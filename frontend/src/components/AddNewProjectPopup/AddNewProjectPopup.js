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
  const [projectName, setProjectName] = useState('');
  const [enteredTags, setEnteredTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [checked, setCheckBoxChecked] = useState('');

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
    const isMultiLabel = checked === checkBoxes[0].id;
    dispatch(
      sendProjectsData({
        name: projectName,
        tags: enteredTags,
        is_multi_label: isMultiLabel,
      }),
    );
  };

  const checkboxHandler = (name) => {
    if (name !== checked) setCheckBoxChecked(name);
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
            <Input
              id={item.id}
              type="checkbox"
              onChangeHandler={(e) => checkboxHandler(e.target.id)}
              checked={checked === item.id}
              labelName={item.id}
              labelText={item.text}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const popupButtons = [
    {
      text: 'Add new project',
      onClickHandler: () => createProject(),
      isDisabled: !(projectName && checked && enteredTags.length),
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
