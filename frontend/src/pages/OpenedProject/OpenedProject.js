import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import TagList from '../../components/Tags/TagList';
import Button from '../../components/UI/Button/Button';
import FileList from '../../components/FileList/FilesList';
import { fetchSingleProjectData } from '../../store/projects/project-actions';

import './OpenedProject.scss';
import FileUploader from '../../components/FileUploader/FileUploader';

export default function OpenedProject() {
  const [fetchedData, setFetchedData] = useState(false);
  const [projectTexts, setProjectTexts] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const currentProjectData = useSelector(
    (state) => state.projects.currentProject,
  );

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
            <i
              className="fa fa-copy"
              aria-hidden="true"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.REACT_APP_WEB_URL}/${currentProjectData.inviteUrl}/train`,
                );
              }}
            />
          </div>
          <div className="textWrapper" />
          <Button text="Train model" />
        </div>
        <div className="filesWrapper">
          <FileUploader openedProjectId={params.id} />
          <FileList files={projectTexts} openedProjectId={params.id} />
        </div>
      </div>
    </div>
  );
}
