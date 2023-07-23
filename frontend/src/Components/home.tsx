import React from 'react';
import { Box, Heading, Text, Image, Input, InputGroup, InputRightElement, SimpleGrid, Flex, Link } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  const hotels = [
    { id: 1, name: 'Hotel A', imageUrl: 'https://via.placeholder.com/200', location: 'City A' },
    { id: 2, name: 'Hotel B', imageUrl: 'https://via.placeholder.com/200', location: 'City B' },
    { id: 3, name: 'Hotel C', imageUrl: 'https://via.placeholder.com/200', location: 'City C' },
    // Add more hotel data as needed
  ];
  return (
    <Box>
      {/* First section with image */}
      <Box
        bgImage="url('https://c4.wallpaperflare.com/wallpaper/648/23/713/house-ont-he-hill-farm-house-with-field-photo-wallpaper-preview.jpg')" // Replace with your image URL
        bgSize="cover"
        bgPosition="center"
        height="400px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading as="h1" size="2xl" color="white">
          Welcome to Homestead Horizon!
        </Heading>
        <Text fontSize="lg" color="white" mt="2">
          Discover your perfect vacation rental.
        </Text>

        
      </Box>

      {/* Search bar */}
      <Box width="100%" mt="4">
          <InputGroup>
            <Input placeholder="Search for rentals" />
            <InputRightElement children={<SearchIcon color="gray.300" />} />
          </InputGroup>
        </Box>
        {/* Second section */}
        <Box py="8">
        <Heading as="h2" size="lg" mb="4">
          Section 2
        </Heading>
        <SimpleGrid columns={3} spacing={4}>
          {hotels.map((hotel) => (
            <Flex key={hotel.id} direction="column" align="center">
              <Link as={RouterLink} to={`/hotels/${hotel.id}`}>
                <Image src={hotel.imageUrl} alt={hotel.name} maxH="150px" mb="2" borderRadius="md" />
              </Link>
              <Heading as="h3" size="md" textAlign="center">
                {hotel.name}
              </Heading>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                {hotel.location}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>

      {/* Third section */}
      <Box py="8">
        <Heading as="h2" size="lg" mb="4">
          Section 3
        </Heading>
        <Text>
          Content for section 3 goes here...
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
