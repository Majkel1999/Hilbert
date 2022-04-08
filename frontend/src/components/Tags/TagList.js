import PropTypes from 'prop-types';
import './TagList.scss';
import { uuid } from '../../utils/utils';
import Chip from '../UI/Chip/Chip';

export default function TagList({ tags }) {
  const addNewTag = () => {
    console.log('newTag');
  };
  return (
    <div className="tagList">
      {tags &&
        tags.map((tag) => (
          <Chip chipText={tag} key={uuid()} displayDeleteIcon />
        ))}
      <Chip
        chipText={<i className="fa fa-plus" aria-hidden="true" />}
        onClick={addNewTag}
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
