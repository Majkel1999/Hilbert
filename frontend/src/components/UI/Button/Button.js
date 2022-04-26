/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, onClickHandler, text, isDisabled, customClass }) => (
  <button
    type={type}
    className={customClass}
    onClick={onClickHandler}
    disabled={isDisabled}
  >
    <span>{text}</span>
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  customClass: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClickHandler: PropTypes.func,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
  customClass: '',
  isDisabled: false,
  onClickHandler: () => {},
};
export default Button;
