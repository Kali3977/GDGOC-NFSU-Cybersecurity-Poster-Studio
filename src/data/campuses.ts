export interface CampusInfo {
  id: string;
  name: string;
  city: string;
  state: string;
  isVerified: boolean;
  verificationSource: string;
  programmeDetails: string;
  confirmedProgrammes: string[];
  defaultVenue: string;
  chapterStatus: 'official_reference' | 'community_lead' | 'unverified_pending';
  contactEmail?: string;
  socialHandle?: string;
  isCustom?: boolean;
}

export const INITIAL_VERIFIED_CAMPUSES: CampusInfo[] = [
  {
    id: 'gandhinagar',
    name: 'NFSU Gandhinagar (HQ)',
    city: 'Gandhinagar',
    state: 'Gujarat',
    isVerified: true,
    verificationSource: 'Official NFSU Headquarters & School of Cyber Security & Digital Forensics (SCSDF)',
    programmeDetails: 'B.Tech-M.Tech CSE (Cyber Security), M.Sc. Cyber Security, M.Tech Cyber Security, Ph.D. Cyber Security',
    confirmedProgrammes: [
      'B.Tech-M.Tech CSE (Cyber Security)',
      'M.Sc. Cyber Security',
      'M.Tech Cyber Security',
      'Ph.D. in Cyber Security & Forensics'
    ],
    defaultVenue: 'Cyber Defense Lab & Main Auditorium, NFSU Gandhinagar Campus',
    chapterStatus: 'official_reference',
    contactEmail: 'gdg@nfsu.ac.in',
    socialHandle: '#GDGonNFSU · @gdgnfsu'
  },
  {
    id: 'delhi',
    name: 'NFSU Delhi Campus',
    city: 'Delhi',
    state: 'National Capital Region',
    isVerified: true,
    verificationSource: 'Official NFSU Delhi (LNJN NICFS) Department of Cyber Security & Digital Forensics',
    programmeDetails: 'B.Tech-M.Tech CSE (Cyber Security), M.Sc. Digital Forensics and Information Security',
    confirmedProgrammes: [
      'B.Tech-M.Tech CSE (Cyber Security)',
      'M.Sc. Digital Forensics & Information Security',
      'Cyber Threat Intelligence Certification'
    ],
    defaultVenue: 'Computer Forensics Seminar Hall, NFSU Delhi Campus, Rohini',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUDelhi'
  },
  {
    id: 'goa',
    name: 'NFSU Goa Campus',
    city: 'Ponda',
    state: 'Goa',
    isVerified: true,
    verificationSource: 'Official NFSU Goa Department of Cyber Security & Digital Forensics',
    programmeDetails: 'M.Sc. Cyber Security, M.Tech Cyber Security, Digital Forensics Labs',
    confirmedProgrammes: [
      'M.Sc. Cyber Security',
      'M.Tech Cyber Security',
      'Incident Response & Forensic Telemetry'
    ],
    defaultVenue: 'Technical Lecture Theatre 02, NFSU Goa Campus, Curti Ponda',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUGoa'
  },
  {
    id: 'tripura',
    name: 'NFSU Tripura Campus',
    city: 'Agartala',
    state: 'Tripura',
    isVerified: true,
    verificationSource: 'Official NFSU Tripura Department of Cyber Security & Digital Forensics',
    programmeDetails: 'B.Tech-M.Tech CSE (Cyber Security), M.Sc. Digital Forensics',
    confirmedProgrammes: [
      'B.Tech-M.Tech CSE (Cyber Security)',
      'M.Sc. Digital Forensics and Cyber Security',
      'Network Vulnerability Assessment Lab'
    ],
    defaultVenue: 'Cyber Range Lab, NFSU Tripura Transit/Permanent Campus, Agartala',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUTripura'
  },
  {
    id: 'bhopal',
    name: 'NFSU Bhopal Campus',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    isVerified: true,
    verificationSource: 'Official NFSU Bhopal Department of Cyber Security & Digital Forensics',
    programmeDetails: 'M.Sc. Cyber Security, M.Sc. Digital Forensics and Information Security',
    confirmedProgrammes: [
      'M.Sc. Cyber Security',
      'M.Sc. Digital Forensics & Information Security'
    ],
    defaultVenue: 'Digital Investigation Complex, NFSU Bhopal Campus',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUBhopal'
  },
  {
    id: 'dharwad',
    name: 'NFSU Dharwad Campus',
    city: 'Dharwad',
    state: 'Karnataka',
    isVerified: true,
    verificationSource: 'Official NFSU Dharwad Centre of Excellence in Cyber Security',
    programmeDetails: 'M.Sc. Cyber Security & Digital Forensics, Threat Hunting & Analysis',
    confirmedProgrammes: [
      'M.Sc. Cyber Security & Digital Forensics',
      'Advanced Cryptography & Malware Analysis'
    ],
    defaultVenue: 'Advanced Computing Lab, NFSU Dharwad Campus',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUDharwad'
  },
  {
    id: 'guwahati',
    name: 'NFSU Guwahati Campus',
    city: 'Guwahati',
    state: 'Assam',
    isVerified: true,
    verificationSource: 'Official NFSU Guwahati Centre of Excellence in Cyber Forensics',
    programmeDetails: 'M.Sc. Cyber Security, Post Graduate Diploma in Cyber Security',
    confirmedProgrammes: [
      'M.Sc. Cyber Security',
      'PG Diploma in Cyber Security & Information Defense'
    ],
    defaultVenue: 'Cyber Forensics Hall, NFSU Guwahati Campus',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUGuwahati'
  },
  {
    id: 'chennai',
    name: 'NFSU Chennai Campus',
    city: 'Chennai',
    state: 'Tamil Nadu',
    isVerified: true,
    verificationSource: 'Official NFSU Chennai Department of Cyber Security & Digital Forensics',
    programmeDetails: 'M.Sc. Cyber Security, Advanced Cloud Security & Incident Analysis',
    confirmedProgrammes: [
      'M.Sc. Cyber Security',
      'Cloud & Web Security Specialization'
    ],
    defaultVenue: 'Seminar Hall 01, NFSU Chennai Campus',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUChennai'
  },
  {
    id: 'bhubaneswar',
    name: 'NFSU Bhubaneswar Campus',
    city: 'Bhubaneswar',
    state: 'Odisha',
    isVerified: true,
    verificationSource: 'Official NFSU Bhubaneswar Campus Program Listings',
    programmeDetails: 'M.Sc. Digital Forensics and Information Security (Regional Expansion)',
    confirmedProgrammes: [
      'M.Sc. Digital Forensics & Information Security'
    ],
    defaultVenue: 'Forensics Audio-Visual Auditorium, NFSU Bhubaneswar Campus',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUBhubaneswar'
  },
  {
    id: 'jaipur',
    name: 'NFSU Jaipur Transit Campus',
    city: 'Jaipur',
    state: 'Rajasthan',
    isVerified: true,
    verificationSource: 'Official NFSU Rajasthan Campus Academic Notification',
    programmeDetails: 'Digital Forensics & Cyber Investigation Specialized Modules',
    confirmedProgrammes: [
      'M.Sc. Digital Forensics (Cyber Specialization)'
    ],
    defaultVenue: 'Academic Hall A, NFSU Jaipur Transit Campus',
    chapterStatus: 'unverified_pending',
    contactEmail: '',
    socialHandle: '#GDGonNFSU #NFSUJaipur'
  }
];

export const STORAGE_KEY_CAMPUSES = 'gdgoc_nfsu_campuses_v2';

export function getStoredCampuses(): CampusInfo[] {
  if (typeof window === 'undefined') return INITIAL_VERIFIED_CAMPUSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CAMPUSES);
    if (!raw) return INITIAL_VERIFIED_CAMPUSES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_VERIFIED_CAMPUSES;
  } catch (e) {
    return INITIAL_VERIFIED_CAMPUSES;
  }
}

export function saveStoredCampuses(campuses: CampusInfo[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CAMPUSES, JSON.stringify(campuses));
  } catch (e) {
    console.error('Failed to save campuses', e);
  }
}
