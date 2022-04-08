import PropTypes from 'prop-types';
import './Chip.scss';

export default function Chip({ chipText, displayDeleteIcon, onClickHandler }) {
  return (
    <div className="chipContainer" onClick={onClickHandler} aria-hidden="true">
      <span>{chipText}</span>
      {displayDeleteIcon && <i className="fa fa-close" aria-hidden="true" />}
    </div>
  );
}

Chip.propTypes = {
  chipText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  displayDeleteIcon: PropTypes.bool,
  onClickHandler: PropTypes.func,
};

Chip.defaultProps = {
  chipText: '',
  displayDeleteIcon: false,
  onClickHandler: () => {},
};
