import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { uuid } from '../../utils/utils';
import Chip from '../UI/Chip/Chip';
import { addTagToProject } from '../../store/projects/project-actions';
import './TagList.scss';

export default function TagList({ tags }) {
  const dispatch = useDispatch();
  const addNewTag = () => {
    dispatch(addTagToProject({ projectID: 'test', tag: 'testTag' }));
  };
  return (
    <div className="tagList">
      {tags &&
        tags.map((tag) => (
          <Chip chipText={tag} key={uuid()} displayDeleteIcon />
        ))}
      <Chip
        chipText={<i className="fa fa-plus" aria-hidden="true" />}
        onClickHandler={addNewTag}
      />
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

TagList.defaultProps = {
  tags: [],
};
