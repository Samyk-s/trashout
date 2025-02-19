
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        padding: '20px',
      }}
    >
      {destinations.map((destination) => (
        <div
          key={destination.id}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <img
            src={destination.src}
            alt={destination.alt}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
          />
          <p
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              padding: '8px',
              margin: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: '#fff',
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            {destination.alt}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DestinationsGrid;