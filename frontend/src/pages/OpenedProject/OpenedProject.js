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
} from '../../store/projects/project-actions';

import './OpenedProject.scss';
import FileUploader from '../../components/FileUploader/FileUploader';
import { ROLES } from '../../constants/roles';

export default function OpenedProject() {
  const [fetchedData, setFetchedData] = useState(false);
  const [projectTexts, setProjectTexts] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const currentProjectData = useSelector(
    (state) => state.projects.currentProject,
  );

  const trainModelHandler = () => {
    const projectId = params.id;
    dispatch(trainModel(projectId));
  };

  const clearTagsHandler = () => {
    const projectId = params.id;
    dispatch(clearTags(projectId));
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
  }, [currentProjectData]);

  return (
    <div className="openedProjectContainer">
      <div className="textOperationsWrapper">
        <TagList
          tags={currentProjectData.tags}
          openedProjectId={params.id}
          enableAddingTag={false}
          displayDeleteIcon={false}
        />
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

          <div className="textWrapper" />
          <Button
            text="Clear tags data"
            onClickHandler={clearTagsHandler}
          />
          <Button
            text="Train model"
            onClickHandler={trainModelHandler}
          />
        </div>
        <div className="filesWrapper">
          <FileUploader openedProjectId={params.id} />

          <FileList files={projectTexts} openedProjectId={params.id} />
        </div>
      </div>
    </div>
  );
}
