import React, { useState } from 'react';
import { Box, Flex, Text, Input, Button } from '@chakra-ui/react';

interface UserProfile {
  name: string;
  email: string;
  age: number;
}

const ProfilePage: React.FC = () => {
  // Simulated user profile data (Replace this with your actual data)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
  });

  // State to control the editable mode of the profile fields
  const [isEditMode, setIsEditMode] = useState(false);

  // Function to handle profile update
  const handleProfileUpdate = () => {
    // Update the user profile on the backend (Replace this with your actual update logic)
    console.log('Profile updated:', userProfile);
    setIsEditMode(false);
  };

  return (
    <Box p="4">
      <Text fontSize="xl" fontWeight="semibold" mb="4">
        User Profile
      </Text>
      <Flex direction="column">
        <Box mb="2">
          <Text fontWeight="semibold">Name:</Text>
          {isEditMode ? (
            <Input
              value={userProfile.name}
              onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
            />
          ) : (
            <Text>{userProfile.name}</Text>
          )}
        </Box>
        <Box mb="2">
          <Text fontWeight="semibold">Email:</Text>
          {isEditMode ? (
            <Input
              value={userProfile.email}
              onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
            />
          ) : (
            <Text>{userProfile.email}</Text>
          )}
        </Box>
        <Box mb="2">
          <Text fontWeight="semibold">Age:</Text>
          {isEditMode ? (
            <Input
              type="number"
              value={userProfile.age}
              onChange={(e) => setUserProfile({ ...userProfile, age: parseInt(e.target.value) })}
            />
          ) : (
            <Text>{userProfile.age}</Text>
          )}
        </Box>
        {isEditMode ? (
          <Button colorScheme="blue" onClick={handleProfileUpdate}>
            Save
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => setIsEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default ProfilePage;
