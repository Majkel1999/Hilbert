/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uuid } from '../../utils/utils';
import Chip from '../UI/Chip/Chip';
import Input from '../UI/Input/Input';
import './TagList.scss';

export default function TagList({
  tags,
  addNewTagHandler,
  removeTagHandler,
  setTagName,
  enableAddingTag,
  displayDeleteIcon,
}) {
  return (
    <div className="tagList">
      <div className="tagListHeader">
        <h2>Project tags</h2>
      </div>
      {tags &&
        tags.map((tag) => (
          <Chip
            chipText={tag.name || tag}
            key={uuid()}
            displayDeleteIcon={displayDeleteIcon}
            removeTagHandler={() => removeTagHandler(tag.name || tag)}
            customClass={tag.selected ? 'selected' : ''}
          />
        ))}
      {enableAddingTag && (
        <Chip
          chipText={
            <div className="addInputContainer">
              <Input
                showLabel={false}
                onChangeHandler={(e) => setTagName(e.target.value)}
              />
              <FontAwesomeIcon
                icon="fa-solid fa-plus-circle"
                onClick={addNewTagHandler}
                size="lg"
              />
            </div>
          }
        />
      )}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object], PropTypes.string),
  ),
  addNewTagHandler: PropTypes.func,
  removeTagHandler: PropTypes.func,
  setTagName: PropTypes.func,
  enableAddingTag: PropTypes.bool,
  displayDeleteIcon: PropTypes.bool,
};

TagList.defaultProps = {
  tags: [],
  setTagName: () => {},
  addNewTagHandler: () => {},
  removeTagHandler: () => {},
  enableAddingTag: true,
  displayDeleteIcon: true,
};
