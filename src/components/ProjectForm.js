import React, { useState } from "react";

const ProjectForm = ({ onSave }) => {
  const [project, updateProject] = useState({});

  const handleChange = (event) => {
    const { value, name } = event.target;
    updateProject({ ...project, [name]: value });
  };

  return (
    <>
      <p className="input">
        <br />
        Name:{" "}
        <input
          name="name"
          onChange={handleChange}
          value={project.name}
          type="text"
        />
      </p>
      <p className="input">
        <br />
        Time (Days):{" "}
        <input
          name="time"
          onChange={handleChange}
          value={project.time}
          type="number"
        />
      </p>
      <p className="input">
        <br />
        Date:{" "}
        <input
          name="date"
          onChange={handleChange}
          value={project.date}
          type="date"
        />
      </p>
      <p className="input">
        <br />
        Deadline:{" "}
        <input
          name="deadline"
          onChange={handleChange}
          value={project.deadline}
          type="date"
        />
      </p>
      <p className="input">
        <br />
        Description:{" "}
        <input
          name="description"
          onChange={handleChange}
          value={project.description}
          type="text"
        />
      </p>
      <button onClick={() => onSave(project)} className="addButton">
        Add Project
      </button>
    </>
  );
};

export default ProjectForm;
