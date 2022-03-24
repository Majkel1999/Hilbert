import PropTypes from 'prop-types';

export default function GenericForm({ header }) {
  return (
    <div className="formContainer">
      <h1 className="formName">{header}</h1>
    </div>
  );
}
GenericForm.propTypes = {
  header: PropTypes.string,
};
GenericForm.defaultProps = {
  header: '',
};
