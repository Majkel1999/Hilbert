import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../utils/utils';
import './Input.scss';

const Input = ({
  type,
  id,
  onChangeHandler,
  labelName,
  showLabel,
  multiple,
  labelText,
  checked,
}) => (
  <div className="inputContainer">
    {showLabel && (
      <label className="label" htmlFor={labelName}>
        {labelText || `${capitalizeFirstLetter(labelName)}:`}
      </label>
    )}
    <input
      className="input"
      type={type}
      id={id}
      onChange={onChangeHandler}
      autoComplete="off"
      required
      placeholder={`${labelName}`}
      multiple={multiple}
      checked={checked}
    />
  </div>
);

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  checked: PropTypes.bool,
  labelText: PropTypes.string,
  labelName: PropTypes.string,
  onChangeHandler: PropTypes.func,
  showLabel: PropTypes.bool,
  multiple: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  id: '',
  labelName: '',
  labelText: '',
  onChangeHandler: () => {},
  showLabel: true,
  multiple: false,
  checked: false,
};
