import { useEffect, useState, useRef } from 'react';
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
  const [checked, setCheckBoxChecked] = useState('');
  const inputRef = useRef('');
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

  const addNewTag = (e, addedByClick) => {
    const handledTag = inputRef.current.value;
    const tagIndex = enteredTags.findIndex((item) => item === handledTag);
    const addNewTagValidator = tagIndex < 0 && handledTag;

    if (
      (addedByClick && addNewTagValidator) ||
      (e.key === 'Enter' && addNewTagValidator)
    ) {
      setEnteredTags([...enteredTags, handledTag]);
    }
  };
  const removeTag = (tagName) => {
    setEnteredTags(enteredTags.filter((item) => item !== tagName));
  };

  const createProject = () => {
    const isMultiLabel = checked === checkBoxes[0].id;
    if (enteredTags.length && isMultiLabel && projectName) {
      dispatch(
        sendProjectsData({
          name: projectName,
          tags: enteredTags,
          is_multi_label: isMultiLabel,
        }),
      );
    }
    onCloseHandler();
  };

  const checkboxHandler = (name) => {
    if (name !== checked) setCheckBoxChecked(name);
  };

  useEffect(() => {
    document.addEventListener('keypress', addNewTag);
    return () => {
      document.removeEventListener('keypress', addNewTag);
    };
  }, [enteredTags]);

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
        inputRef={inputRef}
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
