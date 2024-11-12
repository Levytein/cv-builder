import { useEffect, useState } from 'react';

function WorkExperienceInput({
  formData,
  setFormData,
  addOrUpdateExperience,
  selectedExperience,
  workExperiences,
  onExperienceClick,
  onAddNew,
  isCreatingNew,
  handleDeleteExperience, // New prop for delete functionality
}) {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (selectedExperience || isCreatingNew) {
      setShowForm(true); // Show form if editing or adding new
    }
  }, [selectedExperience, isCreatingNew]);

  const handleSubmit = () => {
    addOrUpdateExperience({ ...formData, id: selectedExperience?.id || Date.now() });
    setShowForm(false); // Collapse form after save
  };

  const handleAddNewClick = () => {
    onAddNew();
    setShowForm(true); // Expand form for new experience
  };
  return (
    <div className="workInput leftSection" style={{ width: '100%' }}>
      {!showForm ? (
        <div>
          <h2 className="workExperienceHeader">Work Experiences</h2>
          {workExperiences.map((experience) => (
            <div
              key={experience.id}
              className="jobCard"
              style={{ display: 'flex', alignItems: 'center',  cursor: 'pointer', padding: '10px'}}
            ><div className="jobText">
              <div onClick={() => onExperienceClick(experience)}>
                <h3>{experience.jobTitle} at {experience.companyName}</h3>
              </div>
              <button className="deleteButton" 
                onClick={() => {
                  handleDeleteExperience(experience.id);
                } }
               
              >
                Delete
              </button>
              </div>
            </div>
          ))}
          <div className="addNewDiv">
            <button className="addNew"onClick={handleAddNewClick}>
              Add New
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="sectionName">Work Experience</h2>
          <div className="inputField">
            <label>Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={setFormData}
            />
          </div>
          <div className="inputField">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={setFormData}
            />
          </div>
          <div className="dateInputField">
            <div className="startDate">
              <label className="startDateLabel">Start Date</label>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={setFormData}
              />
            </div>
            <div className="endDate">
              <label className="endDateLabel">End Date</label>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={setFormData}
              />
            </div>
          </div>
          <div className="jobDescriptionInput">
            <label>Job Description</label>
            <textarea
              name="jobDesc"
              value={formData.jobDesc}
              onChange={setFormData}
            />
          </div>
          <div className="workInputButtons">
            <button className="submitButton" onClick={handleSubmit}>
              {selectedExperience ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkExperienceInput;
