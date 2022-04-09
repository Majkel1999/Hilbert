import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, onClickHandler, text }) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className="button" onClick={onClickHandler}>
    <span>{text}</span>
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  onClickHandler: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
  onClickHandler: () => {},
};
export default Button;
