import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<string>('guest'); // Default role is 'guest'
  const [passwordMatchError, setPasswordMatchError] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null); // Date of Birth field

  const handleSignup = () => {
    // Validate that the password and confirm password fields match
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }

    // Handle signup logic based on the selected role (host or guest)
    if (role === 'host') {
      // Handle host signup logic here
      console.log('Host Signup');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
    } else if (role === 'guest') {
      // Handle guest signup logic here
      console.log('Guest Signup');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Date of Birth:', dateOfBirth);
    }
  };

  // Calculate the minimum and maximum dates based on age restrictions
  const currentDate = new Date();
  const maxDate = new Date(currentDate.getFullYear() - 15, currentDate.getMonth(), currentDate.getDate());
  const minDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());

  return (
    <div>
      <h2>Signup Page</h2>
      <div>
        <label>
          <input
            type="radio"
            value="guest"
            checked={role === 'guest'}
            onChange={() => setRole('guest')}
          />
          Guest
        </label>
        <label>
          <input
            type="radio"
            value="host"
            checked={role === 'host'}
            onChange={() => setRole('host')}
          />
          Host
        </label>
      </div>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {role === 'guest' && (
          <>
            <div>
              <label>Date of Birth:</label>
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={80}
                minDate={minDate} // Minimum date is 100 years before the current date
                maxDate={maxDate} // Maximum date is 15 years before the current date
              />
            </div>
          </>
        )}
        {passwordMatchError && <p>{passwordMatchError}</p>}
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
