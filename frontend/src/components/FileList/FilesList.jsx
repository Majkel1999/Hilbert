import PropTypes from 'prop-types';

export default function FilesList({ files }) {
  return (
    <div className="filesListContainer">
      <h2>Files uploaded to project</h2>
      <ul>
        {files.map((element, index) => (
          <li key={index.toString() + 2}>{element.name}</li>
        ))}
      </ul>
    </div>
  );
}

FilesList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

FilesList.defaultProps = {
  files: [],
};
