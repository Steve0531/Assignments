import React, { useState } from 'react';
import './App.css';
import './App';
import './form.css';

const Form = () => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    age: 0,
    gender: '',
    skills: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted');
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstname" value={data.firstname} onChange={handleChange} />

      </div>

      <div>
        <label>Last Name:</label>
        <input type="text" name="lastname" value={data.lastname} onChange={handleChange}  />
      </div>

      <div>
        <label>Age:</label>
        <input type="number" name="age" value={data.age} onChange={handleChange} />
      </div>

      <fieldset>
        <label>Gender:</label>
        <label>
          <input type="radio" name="gender"  value="Male"  checked={data.gender === 'Male'} onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio"  name="gender" value="Female"   checked={data.gender === 'Female'} onChange={handleChange} />
          Female
        </label>
      </fieldset>

      <div>
        <label>Skills:</label>
        <select name="skills" value={data.skills} onChange={handleChange} >
          <option value="">Select Skills</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="NodeJS">NodeJS</option>
        </select>
      </div>

      <div>
        <label>Email:</label>
        <input type="email"  name="email" value={data.email} onChange={handleChange} />
      </div>

      <div>
        <label>Phone Number:</label>
        <input type="tel" name="phone" value={data.phone} onChange={handleChange} />
      </div>

      <div>
        <label>Address:</label>
        <textarea name="address"  value={data.address} onChange={handleChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
