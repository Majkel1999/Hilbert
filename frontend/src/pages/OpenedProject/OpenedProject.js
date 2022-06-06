import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TagList from '../../components/Tags/TagList';
import Button from '../../components/UI/Button/Button';
import FileList from '../../components/FileList/FilesList';
import {
  clearTags,
  fetchSingleProjectData,
  trainModel,
  downloadProjectFiles,
  fetchProjectMetrics,
  downloadProjectModel
} from '../../store/projects/project-actions';
import { snackBarActions } from '../../store/snackBar/snackBar-slice';
import { SNACKBAR_STATUS, MODEL_STATE } from '../../constants/stateStatuses';
import './OpenedProject.scss';
import FileUploader from '../../components/FileUploader/FileUploader';
import { ROLES } from '../../constants/roles';

export default function OpenedProject() {
  const [fetchedData, setFetchedData] = useState(false);
  const [projectTexts, setProjectTexts] = useState([]);
  const [projectTags, setProjectTags] = useState([]);
  const [inviteUrl, setInviteUrl] = useState('');

  const dispatch = useDispatch();
  const params = useParams();
  const currentProjectData = useSelector(
    (state) => state.projects.currentProject,
  );

  const trainModelHandler = () => {
    const projectId = params.id;

    currentProjectData.modelState === MODEL_STATE.TRAINING
      ? dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.ERROR,
          message: 'Model is already in training',
        }),
      )
      : dispatch(trainModel(projectId));
  };

  const copyIconClickHandler = () => {
    dispatch(
      snackBarActions.setSnackBarData({
        type: SNACKBAR_STATUS.INFO,
        message: 'Link copied to clipboard',
      }),
    );
    navigator.clipboard.writeText(
      `${window.location.host}/${ROLES.ANNOTATOR}/projects/${inviteUrl}`,
    );
  };

  const clearTagsHandler = () => {
    const projectId = params.id;
    dispatch(clearTags(projectId));
  };

  const downloadFiles = () => {
    dispatch(downloadProjectFiles(params.id));
  };

  const getMetrics = () => {
    dispatch(fetchProjectMetrics(params.id));
  };

  const getModel = () => {
    dispatch(downloadProjectModel(params.id))
  }

  useEffect(() => {
    const projectId = params.id;
    if (!fetchedData) dispatch(fetchSingleProjectData(projectId));

    setFetchedData(true);

    if (currentProjectData.texts) {
      const texts = currentProjectData.texts.map((element) => ({
        // eslint-disable-next-line dot-notation
        id: element['_id'],
        name: element.name,
      }));
      setProjectTexts(texts);
    }
    if (currentProjectData.tags) setProjectTags(currentProjectData.tags);
    if (currentProjectData.inviteUrl)
      setInviteUrl(currentProjectData.inviteUrl);
  }, [currentProjectData]);

  return (
    <div className="openedProjectContainer">
      <div className="textOperationsWrapper">
        <TagList
          tags={projectTags}
          openedProjectId={params.id}
          enableAddingTag={false}
          displayDeleteIcon={false}
        />
        <div className="textContainer">
          <div className="inviteUrlWrapper">
            <h2> {inviteUrl} </h2>
            <FontAwesomeIcon
              icon="fa-solid fa-copy"
              onClick={copyIconClickHandler}
              size="lg"
            />
          </div>

          <div className="textWrapper" />
          <div className="buttonWrapper">
            <Button text="Metrics"
              onClickHandler={getMetrics} />
            <Button text="Model"
              onClickHandler={getModel} />
            <Button
              customClass="downloadButton"
              onClickHandler={downloadFiles}
              text="Download uploaded files"
            />
            <Button text="Train model" onClickHandler={trainModelHandler} />
            <Button text="Clear tags data" onClickHandler={clearTagsHandler} />
          </div>
        </div>
        <div className="filesWrapper">
          <FileUploader openedProjectId={params.id} />

          <FileList files={projectTexts} openedProjectId={params.id} />
        </div>
      </div>
    </div>
  );
}
