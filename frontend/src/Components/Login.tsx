import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Input, Button, FormControl, FormLabel } from '@chakra-ui/react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button clicked');
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Login Page
      </Heading>
      <Box as="form">
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleLogin} mt={4} size="md" width="100%"> {/* Set the button size and width */}
            Login
          </Button>
      </Box>
      <Box mt={4}>
        <p>
          Create a new account{' '}
          <Link to="/signup" color="teal.500">
            Signup
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default LoginPage;
