import PropTypes from 'prop-types';

export default function FilesList({ files }) {
    return (
        <div>
            <ul>
                {files.map((element, index) => <li key={index.toString() + 2}>{element}</li>)}
            </ul>
        </div>
    )
}

FilesList.propTypes = {
    files: PropTypes.arrayOf(PropTypes.string),
  };
  
FilesList.defaultProps = {
    files: [],
  };