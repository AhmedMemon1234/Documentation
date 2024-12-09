import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const TeamCards = () => {
  const teamMembers = [
    {
      id: 1,
      image: 'media.png', // Replace with your image path
      name: 'Username 1',
      profession: 'Profession 1',
    },
    {
      id: 2,
      image: 'media (1).png', // Replace with your image path
      name: 'Username 2',
      profession: 'Profession 2',
    },
    {
      id: 3,
      image: 'media (2).png', // Replace with your image path
      name: 'Username 3',
      profession: 'Profession 3',
    },
  ];

  return (
    <div className="team-container">
      <div className="team-card-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <img src={member.image} alt={member.name} className="team-card-image" />
            <h3 className="team-card-name">{member.name}</h3>
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
  );
};

export default TeamCards;
