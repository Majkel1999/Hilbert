import './OpenedProject.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TagList from '../../components/Tags/TagList';
import FileList from '../../components/FileList/FilesList';
import {
  fetchAnnotatorData,
  fetchAnnotatorText,
  tagText,
} from '../../store/projects/project-actions';
import Button from '../../components/UI/Button/Button';
import { ROLES } from '../../constants/roles';
import { snackBarActions } from '../../store/snackBar/snackBar-slice';
import { SNACKBAR_STATUS } from '../../constants/stateStatuses';
import SOCKETS, { WebSocketActions } from '../../sockets';
import * as routes from '../../constants/routes';

export default function AnnotatorOpenedProject() {
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState(false);
  const [subscribeWsActions, setSubscribeWsActions] = useState(false);
  const [projectTexts, setProjectTexts] = useState([]);
  const [tagsWithAddedProps, setTagsWithAddedProps] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isMultiLabel, setIsMultiLabel] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const [socketsSubscribtions, setSocketsSubscribtions] = useState({
    PROJECT_DELETED: undefined,
    FILE_ADDED: undefined,
    FILE_REMOVED: undefined,
    MODEL_TRAINING: undefined,
  });
  const dispatch = useDispatch();
  const params = useParams();
  const currentProjectData = useSelector(
    (state) => state.projects.currentProject,
  );
  const fetchedTextData = useSelector(
    (state) => state.projects.fetchedTextData,
  );

  const selectTag = (tagName) => {
    let updatedTags;

    if (isMultiLabel) {
      updatedTags = tagsWithAddedProps.map((tag) =>
        tag.name === tagName ? { ...tag, selected: !tag.selected } : tag,
      );
    } else {
      updatedTags = tagsWithAddedProps.map((tag) =>
        tag.name === tagName
          ? { ...tag, selected: true }
          : { ...tag, selected: false },
      );
    }
    setSelectedTags(updatedTags.filter((item) => item.selected));
    setTagsWithAddedProps(updatedTags);
  };
  const resetSelectedTags = () => {
    const updatedTags = tagsWithAddedProps.map((tag) => ({
      ...tag,
      selected: false,
    }));
    setTagsWithAddedProps(updatedTags);
  };

  const tagTextHandler = () => {
    dispatch(
      tagText({
        inviteUrl: currentProjectData.inviteUrl,
        tags: selectedTags.map((value) => value.name),
        textId: fetchedTextData.id,
      }),
    );
    resetSelectedTags();
  };

  const deleteProjectSubscriber = (payload) => {
    if (payload.id === currentProjectData.id)
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.INFO,
          message:
            'Currently opened project has been deleted. After 2 second you will be redirected to home page',
        }),
      );
    setTimeout(() => {
      navigate(routes.HOME, { replace: true });
    }, 2000);

    SOCKETS.unsubscribe(socketsSubscribtions.PROJECT_DELETED);
  };

  const addFileSubscriber = (payload) => {
    if (payload.id === currentProjectData.id) {
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.INFO,
          message:
            'The files have been added to the currently annotated project',
        }),
      );
      setFetchedData(false);
    }
    SOCKETS.unsubscribe(socketsSubscribtions.FILE_ADDED);
  };

  const removeFileSubscriber = (payload) => {
    if (payload.id === currentProjectData.id) {
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.INFO,
          message:
            'The files have been removed from the currently annotated project',
        }),
      );
      setFetchedData(false);
    }
    SOCKETS.unsubscribe(socketsSubscribtions.FILE_REMOVED);
  };

  const modelTrainingSubscriber = (payload) => {
    if (payload.id === currentProjectData.id) {
      dispatch(
        snackBarActions.setSnackBarData({
          type: SNACKBAR_STATUS.INFO,
          message: 'Model training has been started',
        }),
      );
    }
    SOCKETS.unsubscribe(socketsSubscribtions.MODEL_TRAINING);
  };

  const setOpenedProjectData = () => {
    if (currentProjectData.texts) {
      const texts = currentProjectData.texts.map((element) => ({
        // eslint-disable-next-line dot-notation
        id: element['_id'],
        name: element.name,
      }));
      setProjectTexts(texts);
    }
    if (currentProjectData.tags) {
      const tagArr = currentProjectData.tags.map((item, index) => ({
        key: index + 2,
        name: item,
        selected: false,
      }));
      setTagsWithAddedProps(tagArr);
    }
    if (currentProjectData.isMultiLabel) setIsMultiLabel(true);
  };

  useEffect(() => {
    if (!fetchedData) {
      const url = params.inviteUrl;
      dispatch(fetchAnnotatorData(url));
      const textResponsePromise = dispatch(fetchAnnotatorText(url));
      textResponsePromise.then((response) => {
        if (response.status === 200) setEnableButton(true);
      });
    }
    if (!subscribeWsActions) {
      setSocketsSubscribtions({
        PROJECT_DELETED: SOCKETS.subscribe({
          action: WebSocketActions.PROJECT_DELETED,
          callback: deleteProjectSubscriber,
        }),
        FILE_ADDED: SOCKETS.subscribe({
          action: WebSocketActions.FILE_ADDED,
          callback: addFileSubscriber,
        }),
        FILE_REMOVED: SOCKETS.subscribe({
          action: WebSocketActions.FILE_REMOVED,
          callback: removeFileSubscriber,
        }),
        MODEL_TRAINING: SOCKETS.subscribe({
          action: WebSocketActions.MODEL_TRAINING,
          callback: modelTrainingSubscriber,
        }),
      });
    }
    if (currentProjectData.id) SOCKETS.initialize(currentProjectData.id);

    setOpenedProjectData();
    setFetchedData(true);
    setSubscribeWsActions(true);
  }, [currentProjectData, fetchedData]);

  return (
    <div className="openedProjectContainer">
      <div className="textOperationsWrapper">
        {tagsWithAddedProps && (
          <TagList
            tags={tagsWithAddedProps}
            enableAddingTag={false}
            displayDeleteIcon={false}
            onTagClickHandler={selectTag}
          />
        )}
        <div className="textContainer">
          <div className="inviteUrlWrapper">
            <h2> {currentProjectData.inviteUrl} </h2>
            <FontAwesomeIcon
              icon="fa-solid fa-copy"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.host}/${ROLES.ANNOTATOR}/projects/${currentProjectData.inviteUrl}`,
                );
              }}
              size="lg"
            />
          </div>

          <div className="textWrapper">
            <div className="header">
              <span> {fetchedTextData.name}</span>{' '}
            </div>
            <div className="textValue">
              <p>{fetchedTextData.value}</p>
            </div>
          </div>
          <Button
            text="Submit tags"
            onClickHandler={tagTextHandler}
            isDisabled={!selectedTags.length > 0 && !enableButton}
          />
        </div>

        <div className="filesWrapper annotator">
          <FileList
            files={projectTexts}
            openedProjectId={params.id}
            currentTextId={fetchedTextData.id}
          />
        </div>
      </div>
    </div>
  );
}
