import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { uuid } from '../../utils/utils';
import Chip from '../UI/Chip/Chip';
import {
  addTagToProject,
  removeTagFromProject,
} from '../../store/projects/project-actions';
import './TagList.scss';

export default function TagList({ tags, openedProjectId }) {
  const dispatch = useDispatch();
  const addNewTag = () => {
    dispatch(addTagToProject(openedProjectId, 'testTag'));
  };
  const removeTag = () => {
    dispatch(removeTagFromProject(openedProjectId, 'testTag'));
  };
  return (
    <div className="tagList">
      {tags &&
        tags.map((tag) => (
          <Chip
            chipText={tag}
            key={uuid()}
            displayDeleteIcon
            removeTagHandler={removeTag}
          />
        ))}
      <Chip
        chipText={<i className="fa fa-plus" aria-hidden="true" />}
        onChipClickHandler={addNewTag}
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
