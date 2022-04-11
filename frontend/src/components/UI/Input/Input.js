import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../utils/utils';
import './Input.scss';

const Input = ({ type, id, onChangeHandler, labelName, showLabel, multiple }) => (
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
      placeholder={`${labelName}`}
      multiple={multiple}
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
  multiple: PropTypes.bool
};

Input.defaultProps = {
  type: 'text',
  id: '',
  labelName: '',
  onChangeHandler: () => { },
  showLabel: true,
  multiple: false
};
