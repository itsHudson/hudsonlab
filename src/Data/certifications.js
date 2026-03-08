import badgeCCNA from '../Images/Badge_CCNAITN.png';
import badgeDAE from '../Images/Badge_DAE.png';
import badgeITC from '../Images/Badge_ITC.png';
import badgeITDS from '../Images/Badge_ITDS.png';
import badgeNALAT from '../Images/Badge_NALAT.png';
import badgeRHSA1 from '../Images/Badge_RHSA1.png';
import badgeRHSA2 from '../Images/Badge_RHSA2.png';

const certifications = [
  {
    id: 'dae',
    shortTitle: 'DAE',
    title: 'Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    year: 'Recent',
    image: badgeDAE,
    description: 'Foundational learning around analytics concepts, data thinking, and structured interpretation.',
  },
  {
    id: 'itds',
    shortTitle: 'ITDS',
    title: 'Introduction to Data Science',
    issuer: 'Cisco Networking Academy',
    year: 'Recent',
    image: badgeITDS,
    description: 'Introductory coverage of data science concepts and analytical workflow awareness.',
  },
  {
    id: 'itc',
    shortTitle: 'ITC',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: 'Recent',
    image: badgeITC,
    description: 'Basic cybersecurity understanding with awareness of digital safety and system protection concepts.',
  },
  {
    id: 'ccna-itn',
    shortTitle: 'CCNA ITN',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    year: 'Recent',
    image: badgeCCNA,
    description: 'Networking fundamentals, structure, and introductory network thinking.',
  },
  {
    id: 'nalat',
    shortTitle: 'NALAT',
    title: 'Network Academy Learn-A-Thon',
    issuer: 'Cisco Networking Academy',
    year: 'Recent',
    image: badgeNALAT,
    description: 'Participation-based learning milestone connected to self-development and technical curiosity.',
  },
  {
    id: 'rhsa1',
    shortTitle: 'RHSA I',
    title: 'Red Hat System Administration I',
    issuer: 'Red Hat Academy',
    year: 'Recent',
    image: badgeRHSA1,
    description: 'Linux and system administration fundamentals through structured Red Hat learning.',
  },
  {
    id: 'rhsa2',
    shortTitle: 'RHSA II',
    title: 'Red Hat System Administration II',
    issuer: 'Red Hat Academy',
    year: 'Recent',
    image: badgeRHSA2,
    description: 'Follow-up learning that extends command-line and administration understanding.',
  },
];

export default certifications;
