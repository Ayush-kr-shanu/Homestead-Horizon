import React from 'react';
import { Box, Heading, Text, Image, Flex, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const AboutUs: React.FC = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" mt="4">
        About Us
      </Heading>
      <Text fontSize="lg" mt="2">
        We are your go-to platform for vacation rentals!
      </Text>
      <Image
        src="https://example.com/path/to/image.jpg" // Replace with the URL of your image
        alt="Homestead Horizon"
        mt="4"
        boxSize="400px"
        objectFit="cover"
      />
      <Text fontSize="lg" mt="4">
        Homestead Horizon is the ultimate vacation rental platform that connects hosts and guests from all around
        the world. With a wide range of properties, from cozy cabins in the mountains to luxurious beachfront villas,
        we cater to every traveler's needs and preferences.
      </Text>
      {/* Continue writing the rest of the 500-word article here */}
      {/* ... */}

      {/* 5-star rating section */}
      <Flex mt="4" align="center">
        <Text fontSize="lg" fontWeight="semibold">
          Rated:
        </Text>
        <Icon as={StarIcon} color="yellow.500" boxSize={6} mx="1" />
        <Icon as={StarIcon} color="yellow.500" boxSize={6} mx="1" />
        <Icon as={StarIcon} color="yellow.500" boxSize={6} mx="1" />
        <Icon as={StarIcon} color="yellow.500" boxSize={6} mx="1" />
        <Icon as={StarIcon} color="yellow.500" boxSize={6} mx="1" />
        <Text fontSize="lg" ml="2">
          (5.0)
        </Text>
      </Flex>
    </Box>
  );
};

export default AboutUs;
