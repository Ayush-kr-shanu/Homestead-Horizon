import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface BookedHotel {
  id: number;
  name: string;
  checkInDate: string;
  checkOutDate: string;
}

const BookedHotelsHistory: React.FC = () => {
  // Simulated booked hotels history data (Replace this with your actual data)
  const bookedHotels: BookedHotel[] = [
    {
      id: 1,
      name: 'Hotel A',
      checkInDate: '2023-07-01',
      checkOutDate: '2023-07-05',
    },
    {
      id: 2,
      name: 'Hotel B',
      checkInDate: '2023-08-15',
      checkOutDate: '2023-08-20',
    },
  ];

  return (
    <Box p="4">
      <Text fontSize="xl" fontWeight="semibold" mb="4">
        Booked Hotels History
      </Text>
      {bookedHotels.map((hotel) => (
        <Box key={hotel.id} mb="2">
          <Text fontWeight="semibold">{hotel.name}</Text>
          <Text>Check-in: {hotel.checkInDate}</Text>
          <Text>Check-out: {hotel.checkOutDate}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default BookedHotelsHistory;
