import React, { useState } from 'react';

const AddHotelPage: React.FC = () => {
  // State to manage the form fields
  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const [hotelDescription, setHotelDescription] = useState('');

  // Function to handle form submission
  const handleFormSubmit = () => {
    // Send a POST request to your backend API to add the hotel
    // Use the form data (hotelName, hotelLocation, hotelDescription) in the request
    // Handle the API response accordingly
  };

  return (
    <div>
      <h2>Add Hotel</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Hotel Name:</label>
          <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </div>
        <div>
          <label>Hotel Location:</label>
          <input
            type="text"
            value={hotelLocation}
            onChange={(e) => setHotelLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={hotelDescription}
            onChange={(e) => setHotelDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddHotelPage;
