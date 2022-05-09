import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteFileFromProject } from '../../store/projects/project-actions';
import './FilesList.scss';

export default function FilesList({ files, openedProjectId, currentTextId }) {
  const dispatch = useDispatch();

  const removeFile = (file) => {
    dispatch(deleteFileFromProject(openedProjectId, file.id));
  };

  return (
    <div className="filesListContainer">
      <h2>Files uploaded to project</h2>
      <ul className="listWrapper">
        {files.map((element, index) => (
          <li
            className={`listItem ${
              element.id === currentTextId ? 'selected' : ''
            }`}
            key={index.toString() + 2}
          >
            <div className="fileContainer">
              <span>{element.name}</span>
              {openedProjectId && (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  onClick={() => removeFile(element)}
                  size="lg"
                />
              )}
            </div>
          </li>
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
  openedProjectId: PropTypes.string,
  currentTextId: PropTypes.string,
};

FilesList.defaultProps = {
  files: [],
  openedProjectId: '',
  currentTextId: '',
};
