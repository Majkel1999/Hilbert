import PropTypes from 'prop-types';
import './Chip.scss';

export default function Chip({ chipText, displayDeleteIcon }) {
  return (
    <div className="chipContainer">
      <span>{chipText}</span>
      {displayDeleteIcon && <i className="fa fa-close" aria-hidden="true" />}
    </div>
  );
}

Chip.propTypes = {
  chipText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  displayDeleteIcon: PropTypes.bool,
};

Chip.defaultProps = {
  chipText: '',
  displayDeleteIcon: false,
};
