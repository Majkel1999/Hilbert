import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Chip.scss';

export default function Chip({
  chipText,
  displayDeleteIcon,
  onChipClickHandler,
  removeTagHandler,
  customClass,
}) {
  return (
    <div className={`chipContainer ${customClass}`}>
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
  customClass: PropTypes.string,
  displayDeleteIcon: PropTypes.bool,
  removeTagHandler: PropTypes.func,
  onChipClickHandler: PropTypes.func,
};

Chip.defaultProps = {
  chipText: '',
  customClass: '',
  displayDeleteIcon: false,
  removeTagHandler: () => {},
  onChipClickHandler: () => {},
};
