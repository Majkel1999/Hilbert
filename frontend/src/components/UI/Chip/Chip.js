import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Chip.scss';

export default function Chip({
  chipText,
  displayDeleteIcon,
  onChipClickHandler,
  removeTagHandler,
}) {
  return (
    <div className="chipContainer">
      <span onClick={onChipClickHandler} aria-hidden="true">
        {chipText}
      </span>
      {displayDeleteIcon && (
        <FontAwesomeIcon
          icon="fa-solid fa-xmark"
          onClick={removeTagHandler}
          size="lg"
        />
      )}
    </div>
  );
}

Chip.propTypes = {
  chipText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  displayDeleteIcon: PropTypes.bool,
  removeTagHandler: PropTypes.func,
  onChipClickHandler: PropTypes.func,
};

Chip.defaultProps = {
  chipText: '',
  displayDeleteIcon: false,
  removeTagHandler: () => {},
  onChipClickHandler: () => {},
};
