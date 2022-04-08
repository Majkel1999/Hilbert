import PropTypes from 'prop-types';
import './TagList.scss';
import Chip from '../UI/Chip/Chip';

export default function TagList({ tags }) {
  return (
    <div className="tagList">
      {tags &&
        tags.map((tag) => <Chip chipText={tag} displayDeleteIcon="true" />)}
      <i className="fa fa-plus" aria-hidden="true" />
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

TagList.defaultProps = {
  tags: [],
};
