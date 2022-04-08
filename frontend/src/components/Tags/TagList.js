import PropTypes from 'prop-types';
import './TagList.scss';
import Chip from '../UI/Chip/Chip';

export default function TagList({ tags }) {
  return (
    <div className="tagList">
      {tags && tags.map((tag) => <Chip chipText={tag} />)}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

TagList.defaultProps = {
  tags: [],
};
