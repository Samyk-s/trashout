import { FaPlane, FaTrain, FaHotel, FaMountain, FaLandmark, FaUmbrellaBeach } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Air Ticketing",
      description: "Book domestic and international air tickets all in one place, at the best price.",
      icon: <FaPlane className="w-24 h-24 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      id: 2,
      title: "Rail Ticketing",
      description: "Need to travel via train? Don't worry we've got you covered for Rail ticketing.",
      icon: <FaTrain className="w-24 h-24 text-green-600 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      id: 3,
      title: "Tour Packages",
      description: "Book a tour package of your choice at affordable rate. We have various offers.",
      icon: <FaUmbrellaBeach className="w-24 h-24 text-yellow-600 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      id: 4,
      title: "Hotel Accommodations",
      description: "Make your stay wonderful with best price in the best hotel at your preferred location.",
      icon: <FaHotel className="w-24 h-24 text-red-600 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      id: 5,
      title: "Mountain Explorations",
      description: "Explore Himalayas with the best guides and best service. We can help you with guide.",
      icon: <FaMountain className="w-24 h-24 text-gray-600 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      id: 6,
      title: "Cultural Experiences",
      description: "Experience the rich culture of different corners of Nepal at different places.",
      icon: <FaLandmark className="w-24 h-24 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
    }
  ];

  return (
    <section className="py-12 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">We Provide You the Best Service</p>
        </div>

        {/* Centered Grid with no space between items */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center mx-auto border-0" style={{ maxWidth: '1200px' }}>
          {services.map((service) => (
            <div 
              key={service.id}
              className="group p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-start hover:-translate-y-1"
              style={{
                width: '380px', // Make the boxes take equal space in a 3-column grid
                height: '200px', // Fixed height for each box
               }} 
            >
              <div className="mr-8 mt-1 flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{service.title}</h3>
                <p className="text-base text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
