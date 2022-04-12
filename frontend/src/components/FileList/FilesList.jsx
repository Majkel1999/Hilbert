import PropTypes from 'prop-types';

export default function FilesList({ files }) {
  return (
    <div className="filesListContainer">
      <h5>Files uploaded to project</h5>
      <ul>
        {files.map((element, index) => (
          <li key={index.toString() + 2}>{element}</li>
        ))}
      </ul>
    </div>
  );
}

FilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string),
};

FilesList.defaultProps = {
  files: [],
};
