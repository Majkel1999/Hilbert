import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../utils/utils';
import Button from '../UI/Button';

export default function GenericForm({
  header,
  onSubmitHandler,
  formInputArray,
  buttonText,
}) {
  return (
    <div className="formContainer">
      <h1 className="formName">{header}</h1>
      <form onSubmit={onSubmitHandler}>
        {formInputArray.map((item) => (
          <div className="inputContainer" key={item.label}>
            <label htmlFor={item.label}>
              {capitalizeFirstLetter(item.label)}:
            </label>
            <input
              type={item.inputType}
              id={item.label}
              autoComplete="off"
              onChange={(e) => item.setValue(e.target.value)}
              value={item.inputValue}
              required
            />
          </div>
        ))}
        <Button type="submit">{buttonText}</Button>
      </form>
    </div>
  );
}
GenericForm.propTypes = {
  header: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmitHandler: PropTypes.func,
  formInputArray: PropTypes.arrayOf({
    label: PropTypes.string,
    inputType: PropTypes.string,
    setValue: PropTypes.func,
    value: PropTypes.string || PropTypes.number,
  }),
};
GenericForm.defaultProps = {
  header: '',
  buttonText: '',
  onSubmitHandler: () => {},
  formInputArray: [],
};
