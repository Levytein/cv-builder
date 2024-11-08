import { useState } from 'react';

function PersonalInput({ setPersonalData }) {
  const [formData, setFormData] = useState({
    email: 'example@gmail.com',
    phoneNumber: '123-456-7890',
    social: 'skibidi'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setPersonalData((prevData) => ({ ...prevData, [name]: value })); // Update parent state
  };

  return (
    <div className="personalInput leftSection">
      <h2 className="sectionName">Personal Details</h2>
      
      <div className="inputField">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="inputField">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      
      <div className="inputField">
        <label>LinkedIn</label>
        <input
          type="text"
          name="social"
          value={formData.social}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default PersonalInput;
