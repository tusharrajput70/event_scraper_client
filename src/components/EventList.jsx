import React, { useState } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner'
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [gmail, setGmail] = useState('');
  const [loading, setLoading] = useState(false);


  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/events?city=${city}`);
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
    setLoading(false);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchEvents();
  };

  const handleGetTickets = (url) => {
    setSelectedUrl(url); // Save the selected URL
    setShowModal(true); // Show the modal
  };

  const handleGmailChange = (e) => {
    setGmail(e.target.value);
  };

  const handleSubmit = () => {
    if (!gmail.includes('@gmail.com')) {
      alert('Please enter a valid Gmail address.');
      return;
    }
    setShowModal(false); // Close the modal
    window.location.href = selectedUrl; // Redirect to the URL
  };

  return (
    <div>
      <h1>EventsHunter</h1>
      <div className="searchbox">
        <label htmlFor="city">Enter City: </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <div style={loaderStyles}>
          <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
        </div>
      ) :(
        <ul>
        {events.length > 0 ? (
          events.map((event, index) => (
            <li key={index}>
              <h2>{event.title || 'Event Name'}</h2>
              <p>{event.description || 'Event Description'}</p>
              <p><strong>Start:</strong> {new Date(event.start).toLocaleString()}&nbsp;
              <strong>End:</strong> {new Date(event.end).toLocaleString()}&nbsp;
              <strong>Duration:</strong> {Math.floor(event.duration / 3600)} hrs {Math.floor((event.duration % 3600) / 60)} mins</p>
              <button onClick={() => handleGetTickets('https://in.bookmyshow.com/')}>Get Tickets</button>
            </li>
          ))
        ) : (
          <p>No events found</p>
        )}
      </ul>
      
      )}
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>Enter Your Gmail</h3>
            <input
              type="email"
              value={gmail}
              onChange={handleGmailChange}
              placeholder="Enter your Gmail address"
              style={inputStyles}
            />
            <button onClick={handleSubmit} style={buttonStyles}>Submit</button>
            <button onClick={() => setShowModal(false)} style={cancelButtonStyles}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal styling
// Modal styling
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px 20px',
  borderRadius: '12px',
  textAlign: 'center',
  width: '350px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const inputStyles = {
  width: '100%',
  padding: '10px 2px',
  margin: '15px 0',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '16px',
  outline: 'none',
};

const buttonStyles = {
  padding: '10px 20px',
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  marginRight: '10px',
  fontSize: '14px',
  transition: 'background-color 0.3s ease',
};

const cancelButtonStyles = {
  padding: '10px 20px',
  backgroundColor: '#e11d48',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.3s ease',
};
const loaderStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '600px',
};
// Add hover effects for better user experience
buttonStyles[':hover'] = { backgroundColor: '#1d4ed8' };
cancelButtonStyles[':hover'] = { backgroundColor: '#be123c' };


export default EventList;