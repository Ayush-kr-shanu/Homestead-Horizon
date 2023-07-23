import React from 'react';
import { Box, Flex, Link, Icon, Text, List, ListItem } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <Flex bg="gray.800" color="white" py="5" flexDirection="column" alignItems="center">
      <Flex maxW="container.lg" mx="auto" align="center" justify="space-between" flexWrap="wrap">
        {/* Social Media Icons */}
        <Box mt="2">
          <Link href="#" mx="2">
            <Icon as={FaFacebook} boxSize={6} />
          </Link>
          <Link href="#" mx="2">
            <Icon as={FaTwitter} boxSize={6} />
          </Link>
          <Link href="#" mx="2">
            <Icon as={FaInstagram} boxSize={6} />
          </Link>
          <Link href="#" mx="2">
            <Icon as={FaLinkedin} boxSize={6} />
          </Link>
        </Box>
        {/* About Us */}
        <Box mt="4">
          <Text fontSize="md" fontWeight="semibold" mb="2">About Us</Text>
          <Text>
            Homested-Horizon is user frinedly vacation, prty and events rental booking platfrom for book Properties, Hotels, etc
          </Text>
        </Box>
        {/* Contact Us */}
        <Box mt="4">
          <Text fontSize="md" fontWeight="semibold" mb="2">Contact Us</Text>
          <Link href="mailto:contact@example.com">contact@example.com</Link>
        </Box>
        {/* Services in India */}
        <Box mt="4">
          <Text fontSize="md" fontWeight="semibold" mb="2">Services in India</Text>
          <List spacing={2}>
            <ListItem>Property for Events</ListItem>
            <ListItem>Weding</ListItem>
            <ListItem>Picnic</ListItem>
          </List>
          {/* Dummy State Names */}
          <Text fontSize="sm" mt="2" fontStyle="italic">
            States: Delhi, Maharashtra, Rajasthan, Kerala, Gujarat
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
