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
}) {
  return (
    <div className="tagList">
      {tags &&
        tags.map((tag) => (
          <Chip
            chipText={tag}
            key={uuid()}
            displayDeleteIcon
            removeTagHandler={() => removeTagHandler(tag)}
          />
        ))}
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
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  addNewTagHandler: PropTypes.func,
  removeTagHandler: PropTypes.func,
  setTagName: PropTypes.func,
};

TagList.defaultProps = {
  tags: [],
  setTagName: () => {},
  addNewTagHandler: () => {},
  removeTagHandler: () => {},
};
