import PropTypes from 'prop-types';
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
        <i
          className="fa fa-close"
          aria-hidden="true"
          onClick={removeTagHandler}
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
