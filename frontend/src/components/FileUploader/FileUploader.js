import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { uploadFilesToProject } from '../../store/projects/project-actions';
import { snackBarActions } from '../../store/snackBar/snackBar-slice';
import { SNACKBAR_STATUS } from '../../constants/stateStatuses';
import './FileUploader.scss';

export default function FileUploader({ openedProjectId }) {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [loadedFiles, setLoadedFiles] = useState([]);
  const dispatch = useDispatch();

  const onFileChange = (event) => {
    const selectedFiles = event.target.files;
    const allowedExtensions = /(\.txt|\.pdf|\.zip|\.csv)$/i;

    const loadedFilesToDisplay = Object.values(event.target.files).map(
      (file) => file.name,
    );
    setLoadedFiles(loadedFilesToDisplay);
    if (
      Object.values(selectedFiles).some(
        (item) => !allowedExtensions.exec(item.name),
      )
    ) {
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.ERROR,
          message: `File ${event.target.value.replace(
            /^.*[\\/]/,
            '',
          )} has incorrect extension`,
        }),
      );

      event.target.value = '';
    } else setFilesToUpload(selectedFiles);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    for (let i = 0; i < filesToUpload.length; i++) {
      formData.append('files', filesToUpload[i]);
    }
    dispatch(uploadFilesToProject(openedProjectId, formData));
    setFilesToUpload([]);
    setLoadedFiles([]);
  };

  return (
    <div className="fileUploaderContainer">
      <p>Acceptable extensions *.txt, *.pdf and *.zip</p>
      <Input
        labelText="Browse file"
        type="file"
        onChangeHandler={onFileChange}
        multiple
      />
      {loadedFiles.length !== 0 && (
        <div className="loadedFilesContainer">
          <p>Loaded Files</p>
          {loadedFiles.map((file, index) => (
            <span key={index.toString() * 2.1}>
              {file} {index === loadedFiles.length - 1 ? '' : ','}
            </span>
          ))}
        </div>
      )}
      <Button
        onClickHandler={onFileUpload}
        text="Upload file"
        isDisabled={!filesToUpload.length}
      />
    </div>
  );
}

FileUploader.propTypes = {
  openedProjectId: PropTypes.string,
};

FileUploader.defaultProps = {
  openedProjectId: '',
};
