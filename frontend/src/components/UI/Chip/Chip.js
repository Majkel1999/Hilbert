import PropTypes from 'prop-types';
import './Chip.scss';

export default function Chip({ chipText }) {
  return (
    <div className="chipContainer">
      <span>{chipText}</span>
    </div>
  );
}

Chip.propTypes = {
  chipText: PropTypes.string,
};

Chip.defaultProps = {
  chipText: '',
};
