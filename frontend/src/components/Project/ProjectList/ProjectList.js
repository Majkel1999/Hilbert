import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ProjectItem from '../ProjectItem/ProjectItem';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import './ProjectList.scss';
import {
  // eslint-disable-next-line no-unused-vars
  deleteProject,
  sendProjectsData,
} from '../../../store/projects/project-actions';

export default function ProjectList({ items }) {
  const [projectName, setProjectName] = useState();
  const dispatch = useDispatch();

  const createNewProjectHandler = () => {
    dispatch(sendProjectsData({ name: projectName }));
  };

  const removeProjectHandler = (projectItem) => {
    console.log(projectItem);
    dispatch(deleteProject(projectItem.id));
  };

  return (
    <div className="tableWrapper">
      <div className="header">
        <Input
          showLabel={false}
          labelName="Project name"
          onChangeHandler={(e) => setProjectName(e.target.value)}
          value={projectName}
          type="text"
        />
        <Button
          text="Add new project"
          onClickHandler={createNewProjectHandler}
        />
      </div>
      <table className="tableContainer">
        <thead className="tableHeader">
          <tr className="head">
            <th>#</th>
          </tr>
          <tr>
            <th>Project name</th>
          </tr>
        </thead>
        <tbody className="tableContent">
          {items &&
            items.map((projectItem, index) => (
              <tr className="contentWrapper" key={`${projectItem.name}key`}>
                <th className="head">{index}</th>
                <td>
                  <ProjectItem name={projectItem.name} />
                  <i
                    className="fa fa-minus"
                    onClick={() => removeProjectHandler(projectItem)}
                    aria-hidden="true"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

ProjectList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

ProjectList.defaultProps = {
  items: [],
};
