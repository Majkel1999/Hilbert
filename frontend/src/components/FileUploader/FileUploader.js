/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { uploadFilesToProject } from '../../store/projects/project-actions';
import { snackBarActions } from '../../store/snackBar/snackBar-slice';
import { STATUS } from '../../constants/snackBarStatus';
import './FileUploader.scss';

export default function FileUploader({ openedProjectId }) {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const dispatch = useDispatch();

  const onFileChange = (event) => {
    const selectedFiles = event.target.files;
    const allowedExtensions = /(\.txt|\.pdf|\.zip|\.csv)$/i;

    if (
      Object.values(selectedFiles).some(
        (item) => !allowedExtensions.exec(item.name),
      )
    ) {
      dispatch(
        snackBarActions.setSnackBarData({
          type: STATUS.ERROR,
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
