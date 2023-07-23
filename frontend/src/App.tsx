import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update the imports
import { Box, ChakraProvider, Container, CSSReset } from '@chakra-ui/react';
import NavBar from './Components/nav/nav';
import Home from './Components/home';
import AboutUs from './Components/aboutus';
import SignupPage from './Components/Signup';
import LoginPage from './Components/Login';
import Footer from './Components/nav/footer';
import BookedHotelsHistory from './Components/bookedHistory';
import ProfilePage from './Components/user';
import { UserContextProvider } from './Components/userContext';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <UserContextProvider>
      <Router>
        <NavBar />
        <Container maxW="container.lg">
          <Box py="8">
            <Routes> {/* Use Routes component */}
              <Route path="/" element={<Home />} /> {/* Use element prop instead of component */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/booked-hotels" element={<BookedHotelsHistory />} />
              {/* Add other routes for different pages/components here */}
            </Routes>
          </Box>
        </Container>
        <Footer/>
      </Router>
      </UserContextProvider>
    </ChakraProvider>
  );
};

export default App;
