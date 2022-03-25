import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, onClick, children }) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
};
export default Button;
