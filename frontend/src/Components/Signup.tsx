import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Input, Button, Text, Stack, Radio, RadioGroup, FormControl } from '@chakra-ui/react';
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
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Register Here
      </Heading>
      <RadioGroup onChange={(value) => setRole(value)} value={role} mb={4}>
        <Stack direction="row">
          <Radio value="guest">Guest</Radio>
          <Radio value="host">Host</Radio>
        </Stack>
      </RadioGroup>
      <Box as="form">
        <Stack spacing={3}>
          <FormControl id="name">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirmPassword">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          {role === 'guest' && (
            <FormControl id="dateOfBirth">
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={80}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Date of Birth"
                isClearable
              />
            </FormControl>
          )}
          {passwordMatchError && (
            <Text color="red">{passwordMatchError}</Text>
          )}
          <Button colorScheme="teal" onClick={handleSignup}>
            Signup
          </Button>
        </Stack>
      </Box>
      <Text mt={4}>
        Already have an account? <Link to="/login">Login</Link>
      </Text>
    </Box>
  );
};

export default SignupPage;
