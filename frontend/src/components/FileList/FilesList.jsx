import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteFileFromProject } from '../../store/projects/project-actions';
import './FilesList.scss';

export default function FilesList({ files, openedProjectId }) {
  const dispatch = useDispatch();

  const removeFile = (file) => {
    dispatch(deleteFileFromProject(openedProjectId, file.id));
  };

  return (
    <div className="filesListContainer">
      <h2>Files uploaded to project</h2>
      <ul className="listWrapper">
        {files.map((element, index) => (
          <li className="listItem" key={index.toString() + 2}>
            <div className="fileContainer">
              <span>{element.name}</span>
              <i
                className="fa fa-close"
                aria-hidden="true"
                onClick={() => removeFile(element)}
              />
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
};

FilesList.defaultProps = {
  files: [],
  openedProjectId: PropTypes.string,
};
