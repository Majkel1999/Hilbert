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
  enableAddingTag,
  displayDeleteIcon,
  onTagClickHandler,
  inputRef,
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
            onChipClickHandler={() => onTagClickHandler(tag.name)}
          />
        ))}
      {enableAddingTag && (
        <Chip
          chipText={
            <div className="addInputContainer">
              <Input showLabel={false} inputRef={inputRef} />
              <FontAwesomeIcon
                icon="fa-solid fa-plus-circle"
                onClick={(e) => addNewTagHandler(e, true)}
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
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ),
  addNewTagHandler: PropTypes.func,
  removeTagHandler: PropTypes.func,
  onTagClickHandler: PropTypes.func,
  enableAddingTag: PropTypes.bool,
  displayDeleteIcon: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.any,
};

TagList.defaultProps = {
  tags: [],
  onTagClickHandler: () => {},
  addNewTagHandler: () => {},
  removeTagHandler: () => {},
  enableAddingTag: true,
  displayDeleteIcon: true,
  inputRef: null,
};
