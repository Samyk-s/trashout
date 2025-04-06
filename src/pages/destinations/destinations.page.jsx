const destinations = [
  { id: 1, src: '/kathmandudurbar.jpg', alt: 'Kathmandu Durbar Square' },
  { id: 2, src: '/pokharalake.jpg', alt: 'Pokhara Lake' },
  { id: 3, src: '/banner.jpg', alt: 'Everest Base Camp' },
  { id: 4, src: '/bhaktapur.jpg', alt: 'Bhaktapur' },
  { id: 5, src: '/chitwan.jpg', alt: 'Chitwan National Park' },
  { id: 6, src: '/lumbini.jpg', alt: 'Lumbini' },
  { id: 7, src: '/annapurna.jpg', alt: 'Annapurna Range' },
  { id: 8, src: '/pashupatinath.jpg', alt: 'Pashupatinath Temple' },
  { id: 9, src: '/nagarkot.jpg', alt: 'Nagarkot Sunrise' },
  { id: 10, src: '/mustang.jpg', alt: 'Mustang' },
  { id: 11, src: '/rara.jpg', alt: 'Rara Lake' },
  { id: 12, src: '/swayambhu.jpg', alt: 'Swayambhunath Stupa' },
];

const DestinationsGrid = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        fontSize: '2rem', 
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        color: '#1a202c' // dark gray
      }}>
        Destinations
      </h2>
      <p style={{ 
        textAlign: 'center', 
        fontSize: '1.1rem',
        marginBottom: '2rem',
        color: '#4a5568' // medium gray
      }}>
        Explore the beautiful places of Nepal
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
      }}>
        {destinations.map((destinations) => (
          <div
            key={destinations.id}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={destinations.src}  
              alt={destinations.alt}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              padding: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
            }}>
              <p style={{ 
                margin: '0',
                fontSize: '16px',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                {destinations.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationsGrid;
