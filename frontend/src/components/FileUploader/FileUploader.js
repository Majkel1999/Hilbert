import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import './FileUploader.scss';
import { uploadFilesToProject } from '../../store/projects/project-actions';

export default function FileUploader({ openedProjectId }) {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const dispatch = useDispatch();

  const onFileChange = (event) => {
    setFilesToUpload(event.target.files);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    for (let i = 0; i < filesToUpload.length; i++) {
      formData.append('files', filesToUpload[i]);
    }
    dispatch(uploadFilesToProject(openedProjectId, formData));
  };

  return (
    <div>
      <Input
        labelName="Text files *.txt, *.pdf and *.zip"
        type="file"
        onChangeHandler={onFileChange}
        multiple
      />
      <Button onClickHandler={onFileUpload} text="Upload file" />
    </div>
  );
}

FileUploader.propTypes = {
  openedProjectId: PropTypes.string,
};

FileUploader.defaultProps = {
  openedProjectId: '',
};
