import React from 'react';
import { Box, Flex, Spacer, Link, Text } from '@chakra-ui/react';
import { BellIcon, EmailIcon, ExternalLinkIcon, AddIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useUserContext } from '../userContext';

const NavBar: React.FC = () => {
  const { isHost } = useUserContext()
  return (
    <Box bg="gray.800" color="white" py="5" fontWeight="semibold">
      <Flex maxW="container.lg" mx="auto" align="center">
        {/* Logo */}
        <Box as="span" fontSize="lg" mr="4">
          <Link as={RouterLink} to="/" color="white">
            Homestead Horizon
          </Link>
        </Box>
        <Spacer />
        {/* Navigation Options */}
        <Link as={RouterLink} to="/about" mr="4">
          <Text fontSize="md" fontWeight="semibold" display="flex" alignItems="center">
            About Us <InfoOutlineIcon boxSize={5} ml="1" />
          </Text>
        </Link>
        <Link as={RouterLink} to="/signup" mr="4">
          <Text fontSize="md" fontWeight="semibold">
            Sign Up
          </Text>
        </Link>
        <Link href="#" mr="4">
          <Text fontSize="md" fontWeight="semibold" display="flex" alignItems="center">
            Alert <BellIcon boxSize={5} ml="1" />
          </Text>
        </Link>
        {isHost && ( // Show the "Add Hotel" link only if the user is a host
          <Link as={RouterLink} to="/add-hotel" mr="4">
            <Text fontSize="md" fontWeight="semibold">
              Add Hotel
            </Text>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default NavBar;
