import PropTypes from 'prop-types';
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
            chipText={tag}
            key={uuid()}
            displayDeleteIcon={displayDeleteIcon}
            removeTagHandler={() => removeTagHandler(tag)}
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
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={addNewTagHandler}
              />
            </div>
          }
        />
      )}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
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
