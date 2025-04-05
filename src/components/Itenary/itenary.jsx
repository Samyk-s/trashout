import { db } from "../../firebase"; // Assuming db is initialized correctly
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

function Iteranry() {
  const [types, setTypes] = useState(''); // Selected trip type
  const [itinerary, setItinerary] = useState(null); // Itinerary to store fetched data
  const [loading, setLoading] = useState(false); // Loading state to handle fetching

  // Fetch itinerary data from Firestore based on selected trip type
  const fetchItineraryData = async (tripType) => {
    if (!tripType) return;

    setLoading(true); // Set loading state to true while fetching data

    try {
      const docRef = doc(db, "itineraries", tripType); // Document ID = tripType
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // If document exists, set fetched data
        const data = docSnap.data();
        
        // Map the data to the appropriate structure
        setItinerary({
          activities: data.activities || [],
          budget: data.budget || {},
          duration: data.duration || '',
          tips: data.tips || '',
          tripType: data.tripType || ''
        });
      } else {
        console.log("No such document!");
        setItinerary(null); // If no document, clear the itinerary state
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setItinerary(null); // In case of error, clear the itinerary state
    } finally {
      setLoading(false); // Set loading state to false after fetching is complete
    }
  };

  // Handle trip type change
  const handleTypeChange = (e) => {
    setTypes(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchItineraryData(types); // Fetch data based on selected trip type when the form is submitted
  };

  // Inline CSS to center the layout
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    flexDirection: 'column',
    textAlign: 'center', // Center the text
  };

  const formStyle = {
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h1>Create Your Travel Itinerary</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label>Trip Type</label>
          <div>
            <input 
              type="radio" 
              name="tripType" 
              value="trip1" 
              checked={types === 'trip1'} 
              onChange={handleTypeChange} 
            />
            <label>Trip 1</label>
            <input 
              type="radio" 
              name="tripType" 
              value="culture" 
              checked={types === 'culture'} 
              onChange={handleTypeChange} 
            />
            <label>Culture</label>
            <input 
              type="radio" 
              name="tripType" 
              value="biodiversity" 
              checked={types === 'biodiversity'} 
              onChange={handleTypeChange} 
            />
            <label>Biodiversity</label>
          </div>
        </div>

        <button type="submit">Generate Itinerary</button>
      </form>

      {loading && <p>Loading...</p>} {/* Show loading message when fetching */}

      {itinerary && (
        <div>
          <h3>Generated Itinerary for {itinerary.tripType}</h3>
          
          <h4>Activities:</h4>
          <ul>
            {itinerary.activities?.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>

          <h4>Budget:</h4>
          <ul>
            <li>Accommodation: ${itinerary.budget?.accommodation}</li>
            <li>Food: ${itinerary.budget?.food}</li>
            <li>Transport: ${itinerary.budget?.transport}</li>
          </ul>

          <h4>Duration:</h4>
          <p>{itinerary.duration}</p>

          <h4>Tips:</h4>
          <p>{itinerary.tips}</p>
        </div>
      )}
    </div>
  );
}

export default Iteranry;
