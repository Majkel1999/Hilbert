import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectItem from "../ProjectItem/ProjectItem";
import Button from "../../UI/Button/Button";
import AddNewProjectPopup from "../../AddNewProjectPopup/AddNewProjectPopup";
import "./ProjectList.scss";
import { deleteProject } from "../../../store/projects/project-actions";
import { ROLES } from "../../../constants/roles";
import list from "../../../img/list.svg";

export default function ProjectList({ items }) {
  const [openPopup, setOpenPopup] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createNewProjectHandler = () => {
    setOpenPopup(true);
  };

  const removeProjectHandler = (projectItem) => {
    dispatch(deleteProject(projectItem.id));
  };

  const openProjectHandler = (id) => {
    // Later if admin board will be displayed in rotue 'projects' change strint o route var
    navigate(`${ROLES.ADMIN}/projects/${id}`);
  };

  return (
    <div className="container">
      <div className="tableWrapper">
        <AddNewProjectPopup
          open={openPopup}
          onCloseHandler={() => setOpenPopup(false)}
        />
        <div className="header">
          <Button
            text="Add new project"
            customClass="small"
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
                <tr
                  className="contentWrapper"
                  key={`${projectItem.name}${index + 1}key`}
                >
                  <th className="head">{index}</th>
                  <td>
                    <ProjectItem
                      name={projectItem.name}
                      onClickHandler={() => openProjectHandler(projectItem.id)}
                    />
                    <FontAwesomeIcon
                      icon="fa-solid fa-minus"
                      onClick={() => removeProjectHandler(projectItem)}
                      size="6x"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <img src={list} alt="listImage" className="listImage" />
    </div>
  );
}

ProjectList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
};

ProjectList.defaultProps = {
  items: [],
};
