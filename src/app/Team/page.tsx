import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const TeamCards = () => {
  const teamMembers = [
    {
      id: 1,
      image: '/media (3).png', // Replace with your image path
      name: 'Username 1',
      profession: 'Profession 1',
    },
    {
      id: 2,
      image: '/media (4).png', // Replace with your image path
      name: 'Username 2',
      profession: 'Profession 2',
    },
    {
      id: 3,
      image: '/media (5).png', // Replace with your image path
      name: 'Username 3',
      profession: 'Profession 3',
    },
    {
      id: 4,
      image: '/media (6).png', // Replace with your image path
      name: 'Username 3',
      profession: 'Profession 3',
    },
    {
      id: 5,
      image: '/media (7).png', // Replace with your image path
      name: 'Username 3',
      profession: 'Profession 3',
    },
    {
      id: 6,
      image: '/media (8).png', // Replace with your image path
      name: 'Username 3',
      profession: 'Profession 3',
    },
    {
      id: 7,
      image: '/media.png', // Replace with your image path
      name: 'Username 3',
      profession: 'Profession 3',
    },
    {
      id: 8,
      image: '/team-1-user-2.jpg', // Replace with your image path
      name: 'Username 3',
      profession: 'Profession 3',
    },
    {
      id: 9,
      image: '/team-1-user-3.jpg', // Replace with your image path
      name: 'Username 3',
      profession: 'Profession 3',
    },
  ];

  return (
    <div className='Cardhead'>
        <h1>Meet Our Team</h1>
    <div className="team-container">
      <div className="team-card-grid2">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
<Image
  src={`${member.image}`} // Ensure this matches the file structure in your public folder
  alt={member.name}
  width={200}
  height={100}
  className="team-card-image"
/>            <h3 className="team-card-name">{member.name}</h3>
            <p className="team-card-profession">{member.profession}</p>
            <div className="team-card-icons">
              <FaFacebook className="team-icon" />
              <FaInstagram className="team-icon" />
              <FaTwitter className="team-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TeamCards;
