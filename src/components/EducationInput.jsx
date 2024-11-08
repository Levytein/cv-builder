import { useEffect, useState } from 'react';

function EducationInput({
  formData,
  setFormData,
  addOrUpdateEducation,
  selectedEducation,
  educationEntries,
  onEducationClick,
  onAddNewEducation,
  handleDeleteEducation
}) {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (selectedEducation) {
      setShowForm(true); // Show form if editing an education entry
    }
  }, [selectedEducation]);

  const handleSubmit = () => {
    addOrUpdateEducation({ ...formData, id: selectedEducation?.id || Date.now() });
    setShowForm(false); // Collapse form after save
  };

  const handleAddNewClick = () => {
    onAddNewEducation();
    setShowForm(true); // Expand form for new education entry
  };

  return (
    <div className="educationInput leftSection" style={{ width: '100%' }}>
      {!showForm ? (
        <div>
          <h2 className="educationHeader">Education</h2>
          {educationEntries.map((education) => (
            <div
              key={education.id}
              className="educationCard"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '10px',
                border: '1px solid #ddd',
                marginBottom: '10px'
              }}
            >
              <div onClick={() => onEducationClick(education)}>
                <h3>{education.degree} at {education.schoolName}</h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the onEducationClick function
                  handleDeleteEducation(education.id);
                }}
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <div className="addNewDiv">
            <button onClick={handleAddNewClick}>Add New</button>
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
            <button onClick={handleSubmit}>
              {selectedEducation ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EducationInput;
