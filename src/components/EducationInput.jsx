import { useEffect, useState } from 'react';

function EducationInput({
  formData,
  setFormData,
  addOrUpdateEducation,
  selectedEducation,
  educationEntries,
  onEducationClick,
  onAddNewEducation,
  IsCreatingNewEducation,
  handleDeleteEducation
}) {
  const [showEducationForm, setShowEducationForm] = useState(false);

  useEffect(() => {
    if (selectedEducation || IsCreatingNewEducation) {
      setShowEducationForm(true); // Show form if editing or adding new
    }
  }, [selectedEducation, IsCreatingNewEducation]);

  const handleEducationSubmit = () => {
    addOrUpdateEducation({ ...formData, id: selectedEducation?.id || Date.now() });
    setShowEducationForm(false); // Collapse form after save
  };

  const handleAddNewClick = () => {
    onAddNewEducation();
    setShowEducationForm(true); // Expand form for new education entry
  };

  return (
    <div className="educationInput leftSection" style={{ width: '100%' }}>
      {!showEducationForm ? (
        <div>
          <h2 className="educationHeader">Education</h2>
          {educationEntries.map((education) => (
            <div
              key={education.id}
              className="educationCard"
            ><div className="jobText">
              <div onClick={() => onEducationClick(education)}>
                <h3>{education.degree} at {education.schoolName}</h3>
              </div>
              <button className="deleteButton"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the onEducationClick function
                  handleDeleteEducation(education.id);
                }}
              
              >
                Delete
              </button>
              </div>
            </div>
          ))}
          <div className="addNewDiv">
            <button className="addNew" onClick={handleAddNewClick}>Add New</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="sectionName">Education</h2>
          <div className="inputField">
            <label>School Name:</label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={setFormData}
            />
          </div>
          <div className="inputField">
            <label>Degree:</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={setFormData}
            />
          </div>
          <div className="dateInputField">
            <div className="startDate">
              <label className="startDateLabel">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={setFormData}
              />
            </div>
            <div className="endDate">
              <label className="endDateLabel">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={setFormData}
              />
            </div>
          </div>
          <div className="descriptionInput">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={setFormData}
            />
          </div>
          <div className="educationInputButtons">
            <button className="submitButton" onClick={handleEducationSubmit}>
              {selectedEducation ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EducationInput;
