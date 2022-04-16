import './OpenedProject.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TagList from '../../components/Tags/TagList';
import FileList from '../../components/FileList/FilesList';
import { fetchAnnotatorData } from '../../store/projects/project-actions';
import Button from '../../components/UI/Button/Button';
import { ROLES } from '../../constants/roles';

export default function AnnotatorOpenedProject() {
  const [fetchedData, setFetchedData] = useState(false);
  const [projectTexts, setProjectTexts] = useState([]);
  const [tagsWithAddedProps, setTagsWithAddedProps] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const currentProjectData = useSelector(
    (state) => state.projects.currentProject,
  );

  const selectTag = (tagName) => {
    const updatedTags = tagsWithAddedProps.map((tag) =>
      tag.name === tagName ? { ...tag, selected: !tag.selected } : tag,
    );
    setTagsWithAddedProps(updatedTags);
  };

  useEffect(() => {
    if (!fetchedData) dispatch(fetchAnnotatorData(params.inviteUrl));

    setFetchedData(true);

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
      console.log(tagArr);
      setTagsWithAddedProps(tagArr);
    }
  }, [currentProjectData]);

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
                  `${process.env.REACT_APP_WEB_URL}/${ROLES.ANNOTATOR}/projects/${currentProjectData.inviteUrl}`,
                );
              }}
              size="lg"
            />
          </div>
          <div className="textWrapper" />
          <Button
            text="Submit tags"
            // onClickHandler={trainModelHandler}
            isDisabled // Disabled untill model didn't work
          />
        </div>

        <div className="filesWrapper annotator">
          <FileList files={projectTexts} openedProjectId={params.id} />
        </div>
      </div>
    </div>
  );
}
