import { useState } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import './FileUploader.scss';

export default function FileUploader() {
  const [filesToUpload, setFilesToUpload] = useState([]);

  const onFileChange = (event) => {
    setFilesToUpload({ selectedFile: event.target.files[0] });
  };

  const onFileUpload = () => {
    const formData = new FormData();
    console.log(filesToUpload);
    formData.append('myFile', filesToUpload);
  };
  return (
    <div>
      <Input type="file" onChangeHandler={onFileChange} />
      <Button onClickHandler={onFileUpload} text="Upload file" />
    </div>
  );
}
