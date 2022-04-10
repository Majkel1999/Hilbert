import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { uuid } from '../../utils/utils';
import Chip from '../UI/Chip/Chip';
import Input from '../UI/Input/Input';
import {
  addTagToProject,
  removeTagFromProject,
} from '../../store/projects/project-actions';
import './TagList.scss';

export default function TagList({ tags, openedProjectId }) {
  const [tagName, setTagName] = useState('');
  const dispatch = useDispatch();
  const addNewTag = () => {
    dispatch(addTagToProject(openedProjectId, tagName));
  };
  const removeTag = (tag) => {
    dispatch(removeTagFromProject(openedProjectId, tag));
  };
  return (
    <div className="tagList">
      {tags &&
        tags.map((tag) => (
          <Chip
            chipText={tag}
            key={uuid()}
            displayDeleteIcon
            removeTagHandler={() => removeTag(tag)}
          />
        ))}
      <Chip
        chipText={
          <div className="addInputContainer">
            <Input
              showLabel={false}
              onChangeHandler={(e) => setTagName(e.target.value)}
            />
            <i className="fa fa-plus" aria-hidden="true" onClick={addNewTag} />
          </div>
        }
      />
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  openedProjectId: PropTypes.string,
};

TagList.defaultProps = {
  tags: [],
  openedProjectId: '',
};
