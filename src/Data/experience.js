import webhelpImage from '../Images/Work_Webhelp.png';
import cakeImage from '../Images/Work_ACCakeHouse.png';

const experienceItems = [
  {
    id: 'webhelp',
    company: 'Webhelp',
    role: 'Customer Service Executive',
    period: 'Recent Role',
    image: webhelpImage,
    summary:
      'A service-focused role that built communication discipline, problem handling confidence, and the ability to stay structured under pressure.',
    responsibilities: [
      'Handle customer-facing requests with professionalism and clarity',
      'Respond to issues quickly while maintaining service quality',
      'Work within structured support processes and operational guidelines',
    ],
    highlights: [
      'Built confidence in high-volume communication environments',
      'Improved practical problem-solving in real situations',
      'Strengthened consistency, patience, and process discipline',
    ],
  },
  {
    id: 'accakehouse',
    company: 'AC Cake House',
    role: 'Operation Outlet Manager',
    period: 'Previous Role',
    image: cakeImage,
    summary:
      'An operations-oriented role focused on coordination, responsibility, and managing day-to-day business flow in a structured way.',
    responsibilities: [
      'Support daily outlet operations and workflow coordination',
      'Maintain service consistency and smooth task execution',
      'Balance team communication with practical execution needs',
    ],
    highlights: [
      'Strengthened leadership and operations awareness',
      'Gained practical experience managing responsibility under pressure',
      'Developed stronger execution habits in a fast-moving environment',
    ],
  },
];

export default experienceItems;
