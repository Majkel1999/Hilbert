import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../utils/utils';
import './Input.scss';

const Input = ({ type, id, onChangeHandler, labelName, showLabel }) => (
  <div className="inputContainer">
    {showLabel && (
      <label className="label" htmlFor={labelName}>
        {capitalizeFirstLetter(labelName)}:
      </label>
    )}
    <input
      className="input"
      type={type}
      id={id}
      onChange={onChangeHandler}
      autoComplete="off"
      required
      placeholder={`Enter ${labelName}`}
    />
  </div>
);

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  labelName: PropTypes.string,
  onChangeHandler: PropTypes.func,
  showLabel: PropTypes.bool,
};

Input.defaultProps = {
  type: 'button',
  id: '',
  labelName: '',
  onChangeHandler: () => {},
  showLabel: true,
};
