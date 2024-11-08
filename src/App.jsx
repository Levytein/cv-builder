import { useState } from 'react';
import PersonalDetail from './components/personal.jsx';
import PersonalInput from './components/personalInput.jsx';
import WorkExperienceInput from './components/workExperienceInput.jsx';
import WorkExperience from './components/workExperience.jsx';
import EducationInput from './components/EducationInput.jsx'; // Import the new component
import EducationExperience from './components/EducationExperience.jsx';
import { useId } from 'react';
import './leftSide.css';
import './rightSide.css';

function App() {
  const [personalData, setPersonalData] = useState({
    email: 'example@gmail.com',
    phoneNumber: '123-456-7890',
    social: 'skibidi'
  });

  const [workExperiences, setWorkExperiences] = useState([{
    id:useId(),
    jobTitle: 'Software Engineer',
    companyName: 'Apple',
    startDate: '1/1/24',
    endDate: '12/1/24',
    jobDesc: `• Optimized Database Queries: Reduced API response times by 40% by optimizing SQL queries and implementing caching strategies, leading to improved user experience and increased application efficiency.
• Full-Stack Development: Built and deployed a full-stack application using React, Node.js, and MongoDB for managing internal workflows, reducing manual processes by 60% and saving over 200 work hours per quarter.
• Automated Testing Implementation: Introduced end-to-end and unit testing frameworks (Jest and Cypress) in a continuous integration pipeline, improving code reliability and reducing production bugs by 35%.
• Microservices Architecture Migration: Spearheaded the migration of a monolithic application to a microservices architecture, improving system scalability and deployment time by 50%.
    `
  },
  {
    id:useId(),
    jobTitle: 'Sales Associate',
    companyName: 'Aldi',
    startDate: '1/1/23',
    endDate: '12/1/23',
    jobDesc: `• Exceeded Sales Targets: Consistently surpassed monthly sales targets by 20-30%, earning recognition as "Top Sales Performer" for three consecutive quarters.
• Upselling & Cross-Selling: Increased average transaction value by 15% through effective upselling and cross-selling techniques, contributing to a 10% overall increase in store revenue.
• Customer Conversion Rate: Improved customer conversion rate by 25% by focusing on personalized service and understanding customer needs, leading to higher customer satisfaction and repeat business.
    `
  }]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    jobDesc: ''
  });
  const [isCreatingNew, setIsCreatingNew] = useState(false); // Track if user is creating a new experience

  const addOrUpdateExperience = (experience) => {
    if (selectedExperience) {
      setWorkExperiences((prevExperiences) =>
        prevExperiences.map((exp) => (exp.id === experience.id ? experience : exp))
      );
    } else {
      setWorkExperiences((prevExperiences) => [
        ...prevExperiences.filter(exp => exp.id !== 'new'), // Remove temp entry if exists
        { ...experience, id: Date.now() }
      ]);
    }
    setSelectedExperience(null);
    setFormData({ jobTitle: '', companyName: '', startDate: '', endDate: '', jobDesc: '' });
    setIsCreatingNew(false); // Stop creating new experience
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    if (isCreatingNew) {
      setWorkExperiences((prevExperiences) => [
        ...prevExperiences.filter(exp => exp.id !== 'new'), // Remove old temp entry
        { ...updatedFormData, id: 'new' } // Add updated temp entry
      ]);
    } else if (selectedExperience) {
      setWorkExperiences((prevExperiences) =>
        prevExperiences.map((exp) =>
          exp.id === selectedExperience.id ? { ...exp, [name]: value } : exp
        )
      );
    }
  };

  const handleExperienceClick = (experience) => {
    setSelectedExperience(experience);
    setFormData(experience);
    setIsCreatingNew(false); // Stop temporary entry if editing existing experience
  };
  const handleDeleteExperience = (id) => {
    setWorkExperiences((prevExperiences) =>
      prevExperiences.filter((exp) => exp.id !== id)
    );
  };
  const handleAddNew = () => {
    setSelectedExperience(null);
    setFormData({
      jobTitle: '',
      companyName: '',
      startDate: '',
      endDate: '',
      jobDesc: ''
    });
    setIsCreatingNew(true); // Start creating new experience

    setWorkExperiences((prevExperiences) => [
      ...prevExperiences.filter(exp => exp.id !== 'new'), // Remove old temp entry if exists
      { jobTitle: '', companyName: '', startDate: '', endDate: '', jobDesc: '', id: 'new' }
    ]);
  };


  const [educationEntries, setEducationEntries] = useState([{
    schoolName: 'Harvard University',
    degree: 'Bachelors in Computer Science',
    startDate: '1/1/24',
    endDate: '1/1/28',
    description: ''
  }]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [isCreatingNewEdu, setIsCreatingNewEdu] = useState(false); // Track if user is creating a new experience

  const [educationFormData, setEducationFormData] = useState({
  schoolName: '',
  degree: '',
  startDate: '',
  endDate: '',
  description: ''
  });
  const addOrUpdateEducation = (education) => {
    if (selectedEducation) {
      setEducationEntries((prevEntries) =>
        prevEntries.map((edu) => (edu.id === education.id ? education : edu))
      );
    } else {
      setEducationEntries((prevEntries) => [
        ...prevEntries,
        { ...education, id: Date.now() }
      ]);
    }
    setSelectedEducation(null);
    setEducationFormData({
      schoolName: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    });

    setIsCreatingNewEdu(false);
  };
  // Handle input change in the education form
  const handleEducationInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setEducationFormData(updatedFormData);
    if (isCreatingNewEdu) {
      setEducationEntries((prevEducation) => [
        ...prevEducation.filter(exp => exp.id !== 'new'), // Remove old temp entry
        { ...updatedFormData, id: 'new' } // Add updated temp entry
      ]);
    }
    else if (selectedEducation) {
      setEducationEntries((prevEntries) =>
        prevEntries.map((edu) =>
          edu.id === selectedEducation.id ? { ...edu, [name]: value } : edu
        )
      );
    }


  };
  
  const handleEducationClick = (education) => {
    setSelectedEducation(education);
    setEducationFormData(education);
    setIsCreatingNewEdu(false); // Stop temporary entry if editing existing experience
  };
  // Delete an education entry
  const handleDeleteEducation = (id) => {
    setEducationEntries((prevEntries) =>
      prevEntries.filter((edu) => edu.id !== id)
    );
  };
  
  // Add a new education entry
  const handleAddNewEducation = () => {
    setSelectedEducation(null);
    setEducationFormData({
      schoolName: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    
    setIsCreatingNew(true); // Start creating new experience

    setEducationEntries((prevEducation) => [
      ...prevEducation.filter(exp => exp.id !== 'new'), // Remove old temp entry if exists
      { schoolName: '', degree: '', startDate: '', endDate: '', description: '', id: 'new' }
    ]);
  };
  console.log(workExperiences);

  return (
    <>
      <div className="containerL">
        <PersonalInput setPersonalData={setPersonalData} />
        <WorkExperienceInput
          formData={formData}
          setFormData={handleInputChange}
          addOrUpdateExperience={addOrUpdateExperience}
          selectedExperience={selectedExperience}
          workExperiences={workExperiences}
          onExperienceClick={handleExperienceClick}
          onAddNew={handleAddNew}
          isCreatingNew={isCreatingNew} 
          handleDeleteExperience={handleDeleteExperience} 
        />
        <EducationInput
  formData={educationFormData}
  setFormData={handleEducationInputChange}
  addOrUpdateEducation={addOrUpdateEducation}
  selectedEducation={selectedEducation}
  educationEntries={educationEntries}
  onEducationClick={handleEducationClick}
  onAddNewEducation={handleAddNewEducation}
  handleDeleteEducation={handleDeleteEducation}
/>
      </div>

      <div className="containerR">
        <PersonalDetail
          email={personalData.email}
          phoneNumber={personalData.phoneNumber}
          social={personalData.social}
        />
        {workExperiences.length > 0 && <h2 className="workHead">Work Experiences</h2>}
        {workExperiences
          .filter(experience => experience.id !== 'new' || isCreatingNew) // Show temp entry only if creating
          .map((experience) => (
            <div
              key={experience.id}
              onClick={() => experience.id !== 'new' && handleExperienceClick(experience)}
              style={{ cursor: 'pointer' }}
            >
              <WorkExperience
                jobTitle={experience.jobTitle}
                companyName={experience.companyName}
                date={experience.startDate}
                endDate={experience.endDate}
                jobDesc={experience.jobDesc}
              />
            </div>
        ))}
        {educationEntries && <h2 className="workHead">Education</h2>}
        {educationEntries
          .filter(education => education.id !== 'new' || isCreatingNew) // Show temp entry only if creating
          .map((education) => (
            <div
              key={education.id}
              onClick={() => education.id !== 'new' && handleEducationClick(education)}
              style={{ cursor: 'pointer' }}
            >
              <EducationExperience
                title={education.schoolName}
                orgName={education.degree}
                date={education.startDate}
                endDate={education.endDate}
                eduDesc={education.description}
              />
            </div>
        ))}
      </div>
    </>
    
  );
  
}

export default App;
