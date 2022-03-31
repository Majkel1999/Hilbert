import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, onClick, text }) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className="button" onClick={onClick}>
    <span>{text}</span>
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
};
export default Button;
