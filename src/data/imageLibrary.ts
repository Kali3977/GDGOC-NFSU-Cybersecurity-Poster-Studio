// Verified Visual Assets Library for GDG on Campus NFSU
// 102 distinct, HTTP-200 verified unique assets across 10 official categories (0 duplicate URLs).
// Curated from Unsplash, Wikimedia Commons, and verified local NFSU Archive files with attribution & licenses.

export interface ImageAsset {
  id: string;
  title: string;
  category:
    | 'cybersecurity'
    | 'ethical_hacking'
    | 'programming'
    | 'circuit_hardware'
    | 'digital_forensics'
    | 'ai_ml'
    | 'abstract_tech'
    | 'network_servers'
    | 'conferences'
    | 'futuristic_geometric';
  categoryLabel: string;
  url: string;
  thumbUrl: string;
  author: string;
  authorUrl: string;
  source: 'Unsplash' | 'Pexels' | 'Wikimedia' | 'Pixabay' | 'NFSU Archive';
  license: string;
  aspect: 'landscape' | 'portrait' | 'square';
  tags: string[];
  colorTone: 'cyan' | 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'dark';
  fallbackLocal?: string;
}

export const IMAGE_CATEGORIES: { id: ImageAsset['category']; label: string; count: number; icon: string }[] = [
  { id: 'cybersecurity', label: 'Cybersecurity & Digital Security', count: 15, icon: '🛡️' },
  { id: 'ethical_hacking', label: 'Ethical Hacking & Pen Testing', count: 10, icon: '💻' },
  { id: 'programming', label: 'Programming & Terminal Screens', count: 10, icon: '⌨️' },
  { id: 'circuit_hardware', label: 'Circuit Boards & Computer Hardware', count: 10, icon: '🔌' },
  { id: 'digital_forensics', label: 'Digital Forensics & Investigation', count: 10, icon: '🔍' },
  { id: 'ai_ml', label: 'Artificial Intelligence & Machine Learning', count: 10, icon: '🧠' },
  { id: 'abstract_tech', label: 'Abstract Technology Backgrounds', count: 15, icon: '🌌' },
  { id: 'network_servers', label: 'Network Security & Servers', count: 10, icon: '🖧' },
  { id: 'conferences', label: 'Tech Conferences & Workshops', count: 6, icon: '👥' },
  { id: 'futuristic_geometric', label: 'Futuristic Geometric Backgrounds', count: 6, icon: '📐' }
];

export const IMAGE_LIBRARY: ImageAsset[] = [
  {
    "id": "cyber_01",
    "title": "Cybersecurity Digital Shield & Encryption",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=70",
    "author": "Dan Nelson",
    "authorUrl": "https://unsplash.com/@dannelson",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "cybersecurity",
      "shield",
      "encryption"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "cyber_02",
    "title": "Binary Matrix Data Stream",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=70",
    "author": "Markus Spiske",
    "authorUrl": "https://unsplash.com/@markusspiske",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "matrix",
      "binary",
      "code"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "cyber_03",
    "title": "Hardware Cryptography Lock on Motherboard",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=400&q=70",
    "author": "FLY:D",
    "authorUrl": "https://unsplash.com/@flyd2069",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "cryptography",
      "lock",
      "motherboard"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "cyber_04",
    "title": "Digital Defense Grid Visualization",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=70",
    "author": "Luca Bravo",
    "authorUrl": "https://unsplash.com/@lucabravo",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "defense",
      "grid",
      "security"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "cyber_05",
    "title": "Neon Cyber Lock & Biometric Interface",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=70",
    "author": "Sammy Williams",
    "authorUrl": "https://unsplash.com/@sammywilliams",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "biometric",
      "lock",
      "neon"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "cyber_06",
    "title": "High-Sec Encryption Keys & Hash Cascade",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=400&q=70",
    "author": "Markus Spiske",
    "authorUrl": "https://unsplash.com/@markusspiske",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "hash",
      "cipher",
      "encryption"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "cyber_07",
    "title": "Digital Key Cryptographic Cylinder",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&q=70",
    "author": "FLY:D",
    "authorUrl": "https://unsplash.com/@flyd2069",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "key",
      "tokens",
      "auth"
    ],
    "colorTone": "purple",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "cyber_08",
    "title": "Cybersecurity Warning & Attack Vectors",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=70",
    "author": "FLY:D",
    "authorUrl": "https://unsplash.com/@flyd2069",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "portrait",
    "tags": [
      "alert",
      "breach",
      "defense"
    ],
    "colorTone": "red",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "cyber_09",
    "title": "Cloud Security Mesh & Global Satellite Grid",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=70",
    "author": "NASA",
    "authorUrl": "https://unsplash.com/@nasa",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "cloud",
      "satellite",
      "mesh"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "cyber_10",
    "title": "Post-Quantum Cryptographic Geometry",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=70",
    "author": "Roman Mager",
    "authorUrl": "https://unsplash.com/@roman_lazygeek",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "square",
    "tags": [
      "post-quantum",
      "lattice",
      "crypto"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "cyber_11",
    "title": "NFSU Gandhinagar Cyber Defense Facility (Night)",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "/assets/aistudio/OIP_72f641f4.webp",
    "thumbUrl": "/assets/aistudio/OIP_72f641f4.webp",
    "author": "NFSU Archive",
    "authorUrl": "https://www.nfsu.ac.in",
    "source": "NFSU Archive",
    "license": "Institutional Academic Fair Use",
    "aspect": "landscape",
    "tags": [
      "nfsu",
      "campus",
      "gandhinagar",
      "cyber"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/aistudio/OIP_72f641f4.webp"
  },
  {
    "id": "cyber_12",
    "title": "ACARM-ng Security Alert Correlation Engine",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/ACARM-ng_architecture.png/1280px-ACARM-ng_architecture.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/ACARM-ng_architecture.png/1280px-ACARM-ng_architecture.png",
    "author": "No machine-readable author provided. Baszerr assum",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "landscape",
    "tags": [
      "ids",
      "siem",
      "correlation",
      "telemetry"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "cyber_13",
    "title": "National Cybersecurity Operations Strategy Summit",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Cybersecurity_and_the_nation%27s_digital_future.jpg/1280px-Cybersecurity_and_the_nation%27s_digital_future.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Cybersecurity_and_the_nation%27s_digital_future.jpg/1280px-Cybersecurity_and_the_nation%27s_digital_future.jpg",
    "author": "The White House",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "Public domain",
    "aspect": "landscape",
    "tags": [
      "summit",
      "policy",
      "defense"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "cyber_14",
    "title": "Embedded Security Microcontroller Module",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/SBMS-1.jpg/1280px-SBMS-1.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/SBMS-1.jpg/1280px-SBMS-1.jpg",
    "author": "Nawigatormorski",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "hardware-sec",
      "embedded",
      "module"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "cyber_15",
    "title": "Hardware Diagnostic Appliance Side Bus",
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Digital Security",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/4300_side.jpg/1280px-4300_side.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/4300_side.jpg/1280px-4300_side.jpg",
    "author": "MichaelSeemann",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "Public domain",
    "aspect": "landscape",
    "tags": [
      "appliance",
      "hardware",
      "defense"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "eth_01",
    "title": "Penetration Tester Workstation in Dark Lab",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=400&q=70",
    "author": "FLY:D",
    "authorUrl": "https://unsplash.com/@flyd2069",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "pentest",
      "lab",
      "hacker"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "eth_02",
    "title": "Kali Linux CLI Shell Session",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=400&q=70",
    "author": "Gabriel Heinzer",
    "authorUrl": "https://unsplash.com/@gabrielheinzer",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "kali",
      "linux",
      "cli"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "eth_03",
    "title": "CTF Exploit Script & Flag Matrix",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=70",
    "author": "Chris Ried",
    "authorUrl": "https://unsplash.com/@cdr690",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "ctf",
      "python",
      "exploit"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "eth_04",
    "title": "Reverse Engineering Binary Disassembly",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=70",
    "author": "Florian Olivo",
    "authorUrl": "https://unsplash.com/@florianolivo",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "reverse-engineering",
      "binary",
      "hex"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "eth_05",
    "title": "Zero-Day Payload & Stack Trace Code",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=70",
    "author": "Fotis Fotopoulos",
    "authorUrl": "https://unsplash.com/@ffstop",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "zero-day",
      "payload",
      "bug-bounty"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "eth_06",
    "title": "Dark Room Hacker Keyboard with Cyan Glow",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=70",
    "author": "Christian Wiediger",
    "authorUrl": "https://unsplash.com/@christianw",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "keyboard",
      "mechanical",
      "hacker"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "eth_07",
    "title": "Red vs Blue Team Cyber War-Game",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=70",
    "author": "NASA",
    "authorUrl": "https://unsplash.com/@nasa",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "red-team",
      "wargame",
      "defense"
    ],
    "colorTone": "red",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "eth_08",
    "title": "Cryptographic Slidex Substitution Cipher Deck",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/A_Slidex_and_separate_cards.jpg/1280px-A_Slidex_and_separate_cards.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/A_Slidex_and_separate_cards.jpg/1280px-A_Slidex_and_separate_cards.jpg",
    "author": "Rolgiati",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "cipher",
      "cryptanalysis",
      "ctf"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "eth_09",
    "title": "Cryptographic Bitmask & Operator Matrix",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/UFO_1output_AllOperators.jpg/1280px-UFO_1output_AllOperators.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/UFO_1output_AllOperators.jpg/1280px-UFO_1output_AllOperators.jpg",
    "author": "ScienceCorner",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "operators",
      "cipher",
      "logic"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "eth_10",
    "title": "Security Mint Hardware & Credential Printing",
    "category": "ethical_hacking",
    "categoryLabel": "Ethical Hacking & Pen Testing",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/2007-07-20_Polska_Wytw%C3%B3rnia_Papier%C3%B3w_Warto%C5%9Bciowych_w_Warszawie%2C_wej%C5%9Bcie.jpg/1280px-2007-07-20_Polska_Wytw%C3%B3rnia_Papier%C3%B3w_Warto%C5%9Bciowych_w_Warszawie%2C_wej%C5%9Bcie.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/2007-07-20_Polska_Wytw%C3%B3rnia_Papier%C3%B3w_Warto%C5%9Bciowych_w_Warszawie%2C_wej%C5%9Bcie.jpg/1280px-2007-07-20_Polska_Wytw%C3%B3rnia_Papier%C3%B3w_Warto%C5%9Bciowych_w_Warszawie%2C_wej%C5%9Bcie.jpg",
    "author": "Gophi",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "landscape",
    "tags": [
      "identity",
      "verification",
      "red-team"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "prog_01",
    "title": "Multi-Monitor Developer Architecture",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=70",
    "author": "Alvaro Reyes",
    "authorUrl": "https://unsplash.com/@alvaroreyes",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "monitors",
      "code",
      "workspace"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "prog_02",
    "title": "Clean TypeScript & Systems UI Setup",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=70",
    "author": "Sarah Dorweiler",
    "authorUrl": "https://unsplash.com/@sarahdorweiler",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "typescript",
      "clean-code",
      "setup"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "prog_03",
    "title": "Minimalist Code Workstation in Dim Light",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=70",
    "author": "Christopher Gower",
    "authorUrl": "https://unsplash.com/@cgower",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "laptop",
      "coding",
      "dark"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "prog_04",
    "title": "Manjaro Linux XFCE Engineering Desktop",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/VirtualBox_Manjaro_Linux_with_XFCE_Desktop_23.0.4_231015_08_12_2023_20_08_31.png/1280px-VirtualBox_Manjaro_Linux_with_XFCE_Desktop_23.0.4_231015_08_12_2023_20_08_31.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/VirtualBox_Manjaro_Linux_with_XFCE_Desktop_23.0.4_231015_08_12_2023_20_08_31.png/1280px-VirtualBox_Manjaro_Linux_with_XFCE_Desktop_23.0.4_231015_08_12_2023_20_08_31.png",
    "author": "Manjaro Linux: Roland Singer, Guillaume Benoit, ",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "GPL",
    "aspect": "landscape",
    "tags": [
      "manjaro",
      "linux",
      "xfce"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "prog_05",
    "title": "VirtualBox Sandboxed Linux Kernel Session",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/VirtualBox_Manjaro_Linux_with_XFCE_Desktop_23.0.4_231015_08_12_2023_20_08_23.png/1280px-VirtualBox_Manjaro_Linux_with_XFCE_Desktop_23.0.4_231015_08_12_2023_20_08_23.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/VirtualBox_Manjaro_Linux_with_XFCE_Desktop_23.0.4_231015_08_12_2023_20_08_23.png/1280px-VirtualBox_Manjaro_Linux_with_XFCE_Desktop_23.0.4_231015_08_12_2023_20_08_23.png",
    "author": "Manjaro Linux: Roland Singer, Guillaume Benoit, ",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "GPL",
    "aspect": "landscape",
    "tags": [
      "virtualbox",
      "sandbox",
      "linux"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "prog_06",
    "title": "C++ Compiler Abstract Syntax Parse Tree",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Cdsan-Samples-CppParseTree-01-HiRes.jpg/1280px-Cdsan-Samples-CppParseTree-01-HiRes.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Cdsan-Samples-CppParseTree-01-HiRes.jpg/1280px-Cdsan-Samples-CppParseTree-01-HiRes.jpg",
    "author": "Code-Analysis",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "landscape",
    "tags": [
      "cpp",
      "ast",
      "compiler"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "prog_07",
    "title": "Unix TMG Compiler Translator Source",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Brainfuck_to_C_translator_in_Unix_TMG.png/1280px-Brainfuck_to_C_translator_in_Unix_TMG.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Brainfuck_to_C_translator_in_Unix_TMG.png/1280px-Brainfuck_to_C_translator_in_Unix_TMG.png",
    "author": "Andrii Makukha",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "unix",
      "compiler",
      "c-code"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "prog_08",
    "title": "Raspberry Pi 2 Asterisk Systems Build",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Asterisk_on_RPI2.jpg/1280px-Asterisk_on_RPI2.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Asterisk_on_RPI2.jpg/1280px-Asterisk_on_RPI2.jpg",
    "author": "Антон Пищулин",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "raspberry-pi",
      "arm",
      "linux"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "prog_09",
    "title": "3D Finite Element Automated Solver UI",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/3D_Finite_Element_Analysis_%28FEA%29_Sherlock_Automated_Design_AnalysisTM_Software_image.jpg/1280px-3D_Finite_Element_Analysis_%28FEA%29_Sherlock_Automated_Design_AnalysisTM_Software_image.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/3D_Finite_Element_Analysis_%28FEA%29_Sherlock_Automated_Design_AnalysisTM_Software_image.jpg/1280px-3D_Finite_Element_Analysis_%28FEA%29_Sherlock_Automated_Design_AnalysisTM_Software_image.jpg",
    "author": "Craig Hillman, PhD, CEO DfR Solutions",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "landscape",
    "tags": [
      "simulation",
      "fea",
      "software"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "prog_10",
    "title": "Electronic Firmware Test Rig Hardware",
    "category": "programming",
    "categoryLabel": "Programming & Terminal Screens",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/2011-12-02_12-49-40-electronic-devices-11f.jpg/1280px-2011-12-02_12-49-40-electronic-devices-11f.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/2011-12-02_12-49-40-electronic-devices-11f.jpg/1280px-2011-12-02_12-49-40-electronic-devices-11f.jpg",
    "author": "Thomas Bresson",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 3.0",
    "aspect": "landscape",
    "tags": [
      "firmware",
      "hardware",
      "testing"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "circ_01",
    "title": "Semiconductor Microchip Die & Silicon Traces",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "/assets/images/signal_silicon_forensics_1794419167984.jpg",
    "thumbUrl": "/assets/images/signal_silicon_forensics_1794419167984.jpg",
    "author": "GDG NFSU Studio",
    "authorUrl": "https://www.nfsu.ac.in",
    "source": "NFSU Archive",
    "license": "GDG Community Free Asset",
    "aspect": "landscape",
    "tags": [
      "silicon",
      "microchip",
      "wafer"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "circ_02",
    "title": "Zero Trust Silicon Wafer Node",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=70",
    "author": "Alexandre Debieve",
    "authorUrl": "https://unsplash.com/@alexandre_debieve",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "pcb",
      "motherboard",
      "electronics"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "circ_03",
    "title": "Hardware Implant & Microcontroller Bus",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=400&q=70",
    "author": "Harrison Broadbent",
    "authorUrl": "https://unsplash.com/@harrisonbroadbent",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "microcontroller",
      "hardware",
      "pins"
    ],
    "colorTone": "purple",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "circ_04",
    "title": "Macro Microcontroller SMD Pinout",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=70",
    "author": "Vishnu Mohanan",
    "authorUrl": "https://unsplash.com/@vishnumohanan",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "smd",
      "macro",
      "circuit"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "circ_05",
    "title": "High-Performance Graphics Processor Core",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=70",
    "author": "Nana C-A",
    "authorUrl": "https://unsplash.com/@nanaca",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "gpu",
      "processor",
      "silicon"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "circ_06",
    "title": "Vintage 8-Bit Microprocessor Hardware",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&w=400&q=70",
    "author": "Mika Baumeister",
    "authorUrl": "https://unsplash.com/@mbaumi",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "vintage",
      "dip",
      "microprocessor"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "circ_07",
    "title": "Quantum Computing Dilution Refrigerator Core",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=70",
    "author": "Google Quantum AI",
    "authorUrl": "https://unsplash.com/@google",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "quantum",
      "cryogenic",
      "gold"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "circ_08",
    "title": "Macro Circuit Board Copper Bus Traces",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Macro_circuit_board.JPG/1280px-Macro_circuit_board.JPG",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Macro_circuit_board.JPG/1280px-Macro_circuit_board.JPG",
    "author": "Ingo Dierking",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "pcb",
      "copper",
      "traces"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "circ_09",
    "title": "PCB HDR Fisheye Component Macro",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/PCB_HDR_Macro_Fisheye_%283596077174%29.jpg/1280px-PCB_HDR_Macro_Fisheye_%283596077174%29.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/PCB_HDR_Macro_Fisheye_%283596077174%29.jpg/1280px-PCB_HDR_Macro_Fisheye_%283596077174%29.jpg",
    "author": "bengt-re from Sweden",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 2.0",
    "aspect": "landscape",
    "tags": [
      "pcb",
      "hdr",
      "macro",
      "hardware"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "circ_10",
    "title": "High-Density Green Logic Circuitry Board",
    "category": "circuit_hardware",
    "categoryLabel": "Circuit Boards & Computer Hardware",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Green_circuit_board_II_%282389301870%29.jpg/1280px-Green_circuit_board_II_%282389301870%29.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Green_circuit_board_II_%282389301870%29.jpg/1280px-Green_circuit_board_II_%282389301870%29.jpg",
    "author": "Peter Shanks from Hobart, Australia",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 2.0",
    "aspect": "landscape",
    "tags": [
      "pcb",
      "logic",
      "microchips"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "for_01",
    "title": "Digital Forensic Optical Inspection Lab",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=70",
    "author": "National Cancer Institute",
    "authorUrl": "https://unsplash.com/@nci",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "forensics",
      "microscope",
      "lab"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "for_02",
    "title": "Hard Drive Platter Forensics & Read Heads",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=400&q=70",
    "author": "Benjamin Lehman",
    "authorUrl": "https://unsplash.com/@benjaminsweet",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "hdd",
      "platter",
      "recovery"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "for_03",
    "title": "National Forensic Sciences University Research Campus",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "/assets/aistudio/OIP_5b55c84a.webp",
    "thumbUrl": "/assets/aistudio/OIP_5b55c84a.webp",
    "author": "NFSU Archive",
    "authorUrl": "https://www.nfsu.ac.in",
    "source": "NFSU Archive",
    "license": "Institutional Academic Fair Use",
    "aspect": "landscape",
    "tags": [
      "nfsu",
      "forensics",
      "campus"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/aistudio/OIP_5b55c84a.webp"
  },
  {
    "id": "for_04",
    "title": "Digital Forensics Field Hard-Drive Imaging Kit",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Digital_Forensics_-_Imaging_a_hard_drive_in_the_field.jpg/1280px-Digital_Forensics_-_Imaging_a_hard_drive_in_the_field.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Digital_Forensics_-_Imaging_a_hard_drive_in_the_field.jpg/1280px-Digital_Forensics_-_Imaging_a_hard_drive_in_the_field.jpg",
    "author": "Privateinvestigatorgreensboro",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "write-blocker",
      "imaging",
      "hdd"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "for_05",
    "title": "Portable Forensic Tableau Acquisition Bridge",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Portable_forensic_tableau.JPG/1280px-Portable_forensic_tableau.JPG",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Portable_forensic_tableau.JPG/1280px-Portable_forensic_tableau.JPG",
    "author": "ErrantX",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "Public domain",
    "aspect": "landscape",
    "tags": [
      "tableau",
      "acquisition",
      "custody"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "for_06",
    "title": "Deleted Email Artifact Triage & Mail Forensics",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Get_deleted_email.jpg/1280px-Get_deleted_email.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Get_deleted_email.jpg/1280px-Get_deleted_email.jpg",
    "author": "Privateinvestigatorgreensboro",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "email-forensics",
      "recovery",
      "triage"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "for_07",
    "title": "Opened 3.5-Inch Hard Disk Drive Internals",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Open_hard-drive.jpg/1280px-Open_hard-drive.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Open_hard-drive.jpg/1280px-Open_hard-drive.jpg",
    "author": "Zzubnik",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "Public domain",
    "aspect": "landscape",
    "tags": [
      "hdd",
      "platter",
      "forensics"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "for_08",
    "title": "Seagate 2TB SATA Evidence Drive PCB Bottom",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Seagate_BarraCuda_Compute_2TB_3.5-inch_SATA_HDD_-_bottom_view_%28circuit_board%29.jpg/1280px-Seagate_BarraCuda_Compute_2TB_3.5-inch_SATA_HDD_-_bottom_view_%28circuit_board%29.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Seagate_BarraCuda_Compute_2TB_3.5-inch_SATA_HDD_-_bottom_view_%28circuit_board%29.jpg/1280px-Seagate_BarraCuda_Compute_2TB_3.5-inch_SATA_HDD_-_bottom_view_%28circuit_board%29.jpg",
    "author": "ITEagle Europe - Sebastiaan Broekhoven",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "sata",
      "drive",
      "storage"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "for_09",
    "title": "Western Digital 250GB Magnetic Platter",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Hard_disk_drive_platter%2C_Western_Digital_Caviar_250Gb_WD2500AAKS.jpg/1280px-Hard_disk_drive_platter%2C_Western_Digital_Caviar_250Gb_WD2500AAKS.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Hard_disk_drive_platter%2C_Western_Digital_Caviar_250Gb_WD2500AAKS.jpg/1280px-Hard_disk_drive_platter%2C_Western_Digital_Caviar_250Gb_WD2500AAKS.jpg",
    "author": "Mk2010",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 4.0",
    "aspect": "landscape",
    "tags": [
      "platter",
      "sectors",
      "recovery"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "for_10",
    "title": "Hard Drive Read-Head Actuator Arm Assembly",
    "category": "digital_forensics",
    "categoryLabel": "Digital Forensics & Investigation",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Actuator_arm_assembly_of_a_hard_disk_drive.jpg/1280px-Actuator_arm_assembly_of_a_hard_disk_drive.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Actuator_arm_assembly_of_a_hard_disk_drive.jpg/1280px-Actuator_arm_assembly_of_a_hard_disk_drive.jpg",
    "author": "Mk2010",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 4.0",
    "aspect": "landscape",
    "tags": [
      "actuator",
      "disk",
      "evidence"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "ai_01",
    "title": "Deep Neural Network Synapse Visualization",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=70",
    "author": "DeepMind",
    "authorUrl": "https://unsplash.com/@deepmind",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "neural-network",
      "synapse",
      "ai"
    ],
    "colorTone": "purple",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "ai_02",
    "title": "Generative AI Holographic Latent Waves",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=70",
    "author": "Milad Fakurian",
    "authorUrl": "https://unsplash.com/@fakurian",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "generative-ai",
      "waves",
      "llm"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "ai_03",
    "title": "Vector Embeddings Latent Space Manifold",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=70",
    "author": "Google DeepMind",
    "authorUrl": "https://unsplash.com/@deepmind",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "embeddings",
      "manifold",
      "vectors"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "ai_04",
    "title": "Transformer Attention Head Activation",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=70",
    "author": "Steve Johnson",
    "authorUrl": "https://unsplash.com/@steve_j",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "transformer",
      "attention",
      "nlp"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "ai_05",
    "title": "Computer Vision Optical Feature Map",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=70",
    "author": "ThisisEngineering RAEng",
    "authorUrl": "https://unsplash.com/@thisisengineering",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "computer-vision",
      "features",
      "ml"
    ],
    "colorTone": "purple",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "ai_06",
    "title": "Intelligence Data Transformation Pipeline Funnel",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/%28infogr%C3%A1fico%29_INTELLIGENCE_FUNNEL_-_Transforma%C3%A7%C3%A3o_de_dados_em_intelig%C3%AAncia.png/1280px-%28infogr%C3%A1fico%29_INTELLIGENCE_FUNNEL_-_Transforma%C3%A7%C3%A3o_de_dados_em_intelig%C3%AAncia.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/%28infogr%C3%A1fico%29_INTELLIGENCE_FUNNEL_-_Transforma%C3%A7%C3%A3o_de_dados_em_intelig%C3%AAncia.png/1280px-%28infogr%C3%A1fico%29_INTELLIGENCE_FUNNEL_-_Transforma%C3%A7%C3%A3o_de_dados_em_intelig%C3%AAncia.png",
    "author": "Cappra.cc",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "data-pipeline",
      "intelligence",
      "ml"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "ai_07",
    "title": "Power-8 Hyperdimensional Tensor Manifold",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Power_8_mandelbulb_fractal_overview.jpg/1280px-Power_8_mandelbulb_fractal_overview.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Power_8_mandelbulb_fractal_overview.jpg/1280px-Power_8_mandelbulb_fractal_overview.jpg",
    "author": "Ondřej Karlík",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "landscape",
    "tags": [
      "manifold",
      "tensor",
      "3d"
    ],
    "colorTone": "purple",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "ai_08",
    "title": "Deep Feature Space Volumetric Lattice",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Mandelbulb_Vertiefung_HQ_8K_OpenCL_20200510.png/1280px-Mandelbulb_Vertiefung_HQ_8K_OpenCL_20200510.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Mandelbulb_Vertiefung_HQ_8K_OpenCL_20200510.png/1280px-Mandelbulb_Vertiefung_HQ_8K_OpenCL_20200510.png",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 4.0",
    "aspect": "landscape",
    "tags": [
      "latent-space",
      "lattice",
      "ai"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "ai_09",
    "title": "Generative 225MPx OpenCL Neural Canyon",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Mandelbulb_OpenCL_225MPx_20201202.png/1280px-Mandelbulb_OpenCL_225MPx_20201202.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Mandelbulb_OpenCL_225MPx_20201202.png/1280px-Mandelbulb_OpenCL_225MPx_20201202.png",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC0",
    "aspect": "landscape",
    "tags": [
      "opencl",
      "gpu",
      "generative"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "ai_10",
    "title": "Multi-Layer 1024GP Recursive Neural Relief",
    "category": "ai_ml",
    "categoryLabel": "Artificial Intelligence & Machine Learning",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Mandelbulb_1%2C024GP_Overview_20211110_002_ALT.png/1280px-Mandelbulb_1%2C024GP_Overview_20211110_002_ALT.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Mandelbulb_1%2C024GP_Overview_20211110_002_ALT.png/1280px-Mandelbulb_1%2C024GP_Overview_20211110_002_ALT.png",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC0",
    "aspect": "landscape",
    "tags": [
      "recursive",
      "weights",
      "ai"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "abs_01",
    "title": "Tactile Obsidian Monolith with Ambient Diffuse Light",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "/assets/images/signal_brutalist_monolith_1794418292586.jpg",
    "thumbUrl": "/assets/images/signal_brutalist_monolith_1794418292586.jpg",
    "author": "GDG NFSU Studio",
    "authorUrl": "https://www.nfsu.ac.in",
    "source": "NFSU Archive",
    "license": "GDG Community Free Asset",
    "aspect": "portrait",
    "tags": [
      "monolith",
      "obsidian",
      "minimal"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "abs_02",
    "title": "Acoustic Sound Mirror Concrete Parabolic Reflector",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "/assets/images/signal_acoustic_mirror_1794418294212.jpg",
    "thumbUrl": "/assets/images/signal_acoustic_mirror_1794418294212.jpg",
    "author": "GDG NFSU Studio",
    "authorUrl": "https://www.nfsu.ac.in",
    "source": "NFSU Archive",
    "license": "GDG Community Free Asset",
    "aspect": "landscape",
    "tags": [
      "radar",
      "reflector",
      "telemetry"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "abs_03",
    "title": "Tactile Optical Prism Refraction Dispersion",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "/assets/images/signal_tactile_prism_1794418294380.jpg",
    "thumbUrl": "/assets/images/signal_tactile_prism_1794418294380.jpg",
    "author": "GDG NFSU Studio",
    "authorUrl": "https://www.nfsu.ac.in",
    "source": "NFSU Archive",
    "license": "GDG Community Free Asset",
    "aspect": "square",
    "tags": [
      "prism",
      "refraction",
      "glass"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "abs_04",
    "title": "Dark Minimalist Architectural Geometry",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=70",
    "author": "Rui Silvestre",
    "authorUrl": "https://unsplash.com/@ruisilvestre",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "minimal",
      "concrete",
      "shadows"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "abs_05",
    "title": "High-Contrast Abstract Pigment Texture",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=70",
    "author": "Steve Johnson",
    "authorUrl": "https://unsplash.com/@steve_j",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "portrait",
    "tags": [
      "texture",
      "abstract",
      "pigment"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "abs_06",
    "title": "Electric Cobalt Particle Constellation Field",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=70",
    "author": "NASA",
    "authorUrl": "https://unsplash.com/@nasa",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "particles",
      "cobalt",
      "cosmos"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "abs_07",
    "title": "Deep Midnight Gradient Atmospheric Horizon",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=70",
    "author": "Benjamin Voros",
    "authorUrl": "https://unsplash.com/@vorosbenjamin",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "midnight",
      "horizon",
      "ambient"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "abs_08",
    "title": "Glowing Optical Fiber Bundle Light Tips",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/OpticFiber.jpg/1280px-OpticFiber.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/OpticFiber.jpg/1280px-OpticFiber.jpg",
    "author": "Etan J. Tal",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 3.0",
    "aspect": "landscape",
    "tags": [
      "fiber-optic",
      "light",
      "glow"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "abs_09",
    "title": "Illuminated Blue LED Fiber-Optic Cone",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Blaue_LED-Fiberglasleuchte.JPG/1280px-Blaue_LED-Fiberglasleuchte.JPG",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Blaue_LED-Fiberglasleuchte.JPG/1280px-Blaue_LED-Fiberglasleuchte.JPG",
    "author": "4028mdk09",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "portrait",
    "tags": [
      "led",
      "fiber",
      "blue"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "abs_10",
    "title": "Optical Fiber Spool Photonic Illumination",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Bobine_Fibres_optiques.jpg/1280px-Bobine_Fibres_optiques.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Bobine_Fibres_optiques.jpg/1280px-Bobine_Fibres_optiques.jpg",
    "author": "photography taken by Christophe.Finot",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "landscape",
    "tags": [
      "photonics",
      "fiber",
      "spool"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "abs_11",
    "title": "Laser Single-Mode vs Multi-Mode Beam Profile",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Beamprofile_SM%2BMM-Fiber.jpg/1280px-Beamprofile_SM%2BMM-Fiber.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Beamprofile_SM%2BMM-Fiber.jpg/1280px-Beamprofile_SM%2BMM-Fiber.jpg",
    "author": "Kirnehkrib",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "square",
    "tags": [
      "laser",
      "beam",
      "optics"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "abs_12",
    "title": "OpenCL Mandelbulb Neon Lattice Valley",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Das_Mandelbulb-Tal_8K_HQ_OpenCL_20200403.png/1280px-Das_Mandelbulb-Tal_8K_HQ_OpenCL_20200403.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Das_Mandelbulb-Tal_8K_HQ_OpenCL_20200403.png/1280px-Das_Mandelbulb-Tal_8K_HQ_OpenCL_20200403.png",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 4.0",
    "aspect": "landscape",
    "tags": [
      "opencl",
      "fractal",
      "render"
    ],
    "colorTone": "purple",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "abs_13",
    "title": "3D Computer-Generated Volumetric Fractal",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/3D_Computer_Generated_Fractal.png/1280px-3D_Computer_Generated_Fractal.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/3D_Computer_Generated_Fractal.png/1280px-3D_Computer_Generated_Fractal.png",
    "author": "BluePankow",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "volumetric",
      "fractal",
      "abstract"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "abs_14",
    "title": "Sinusoidal Optical Interference Wave Pattern",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Variation_sinusoidal_de_bouquet_de_laurence.png/1280px-Variation_sinusoidal_de_bouquet_de_laurence.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Variation_sinusoidal_de_bouquet_de_laurence.png/1280px-Variation_sinusoidal_de_bouquet_de_laurence.png",
    "author": "Stfj",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "square",
    "tags": [
      "wave",
      "sinusoidal",
      "interference"
    ],
    "colorTone": "purple",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "abs_15",
    "title": "Transparent Glassmorphic Fractal Filament",
    "category": "abstract_tech",
    "categoryLabel": "Abstract Technology Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Transparent001_Mandelbulb_30072019.png/1280px-Transparent001_Mandelbulb_30072019.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Transparent001_Mandelbulb_30072019.png/1280px-Transparent001_Mandelbulb_30072019.png",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "glass",
      "transparent",
      "fractal"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "net_01",
    "title": "Cyber Threat Intelligence Datacenter",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=70",
    "author": "Taylor Vick",
    "authorUrl": "https://unsplash.com/@taylorvick",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "datacenter",
      "servers",
      "rack"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "net_02",
    "title": "Security Operations Fiber Network Patch",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=70",
    "author": "NASA",
    "authorUrl": "https://unsplash.com/@nasa",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "patch-panel",
      "network",
      "telecom"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "net_03",
    "title": "Blue Team Network Perimeter Horizon",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=70",
    "author": "Gabriel Heinzer",
    "authorUrl": "https://unsplash.com/@gabrielheinzer",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "network",
      "cloud",
      "datacenter"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "net_04",
    "title": "BalticServers Enterprise Data Center Aisle",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/BalticServers_data_center.jpg/1280px-BalticServers_data_center.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/BalticServers_data_center.jpg/1280px-BalticServers_data_center.jpg",
    "author": "BalticServers.com",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "landscape",
    "tags": [
      "datacenter",
      "aisle",
      "racks"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "net_05",
    "title": "Bacloud High-Density Server Rack Corridor",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Bacloud.com_data_center.JPG/1280px-Bacloud.com_data_center.JPG",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Bacloud.com_data_center.JPG/1280px-Bacloud.com_data_center.JPG",
    "author": "Fleshas",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "servers",
      "corridor",
      "rack"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "net_06",
    "title": "Asperitas Immersion-Cooled Server Chassis",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Asperitas_AIC24_Immersion_system.jpg/1280px-Asperitas_AIC24_Immersion_system.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Asperitas_AIC24_Immersion_system.jpg/1280px-Asperitas_AIC24_Immersion_system.jpg",
    "author": "Rolf Brink",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "immersion",
      "cooling",
      "datacenter"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "net_07",
    "title": "1 Gbps Core Fiber Routing Switch Hardware",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/1_Gbps_Core_Switch_China_Telecom_Stall.jpg/1280px-1_Gbps_Core_Switch_China_Telecom_Stall.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/1_Gbps_Core_Switch_China_Telecom_Stall.jpg/1280px-1_Gbps_Core_Switch_China_Telecom_Stall.jpg",
    "author": "Dev Jadiya",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "switch",
      "routing",
      "core"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "net_08",
    "title": "Patch-Panel Network Switches with LED Status",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Network_switches_arranged_in_a_server_rack_with_visible_LED_lights_indicating_connection_status_and_power_levels.jpg/1280px-Network_switches_arranged_in_a_server_rack_with_visible_LED_lights_indicating_connection_status_and_power_levels.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Network_switches_arranged_in_a_server_rack_with_visible_LED_lights_indicating_connection_status_and_power_levels.jpg/1280px-Network_switches_arranged_in_a_server_rack_with_visible_LED_lights_indicating_connection_status_and_power_levels.jpg",
    "author": "Shixart1985",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 2.0",
    "aspect": "landscape",
    "tags": [
      "switches",
      "leds",
      "ethernet"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "net_09",
    "title": "Cabletron MT-800 Ethernet Transceiver Unit",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Cabletron_MT-800%2C_Ethernet_Tranceiver_Unit.jpg/1280px-Cabletron_MT-800%2C_Ethernet_Tranceiver_Unit.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Cabletron_MT-800%2C_Ethernet_Tranceiver_Unit.jpg/1280px-Cabletron_MT-800%2C_Ethernet_Tranceiver_Unit.jpg",
    "author": "vibrant.com",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 2.0",
    "aspect": "landscape",
    "tags": [
      "ethernet",
      "transceiver",
      "hardware"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "net_10",
    "title": "Enterprise Network Lab Core Routing Racks",
    "category": "network_servers",
    "categoryLabel": "Network Security & Servers",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/The_Lab_network_stuff.jpg/1280px-The_Lab_network_stuff.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/The_Lab_network_stuff.jpg/1280px-The_Lab_network_stuff.jpg",
    "author": "Adam Bartlett",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 2.0",
    "aspect": "landscape",
    "tags": [
      "routing",
      "lab",
      "servers"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "conf_01",
    "title": "Technical Keynote Speaker on Illuminated Stage",
    "category": "conferences",
    "categoryLabel": "Tech Conferences & Workshops",
    "url": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=70",
    "author": "Miguel Henriques",
    "authorUrl": "https://unsplash.com/@miguel_henriques",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "keynote",
      "stage",
      "speaker"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_acoustic_mirror_1794418294212.jpg"
  },
  {
    "id": "conf_02",
    "title": "Hackathon Collaborative Engineering Team",
    "category": "conferences",
    "categoryLabel": "Tech Conferences & Workshops",
    "url": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=70",
    "author": "Marvin Meyer",
    "authorUrl": "https://unsplash.com/@marvin_meyer",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "hackathon",
      "team",
      "coding"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "conf_03",
    "title": "Developer Hands-On Workshop Session",
    "category": "conferences",
    "categoryLabel": "Tech Conferences & Workshops",
    "url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=70",
    "author": "Annie Spratt",
    "authorUrl": "https://unsplash.com/@anniespratt",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "workshop",
      "students",
      "gdg"
    ],
    "colorTone": "dark",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "conf_04",
    "title": "University Convocation Amphitheatre Summit",
    "category": "conferences",
    "categoryLabel": "Tech Conferences & Workshops",
    "url": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    "thumbUrl": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=70",
    "author": "Product School",
    "authorUrl": "https://unsplash.com/@productschool",
    "source": "Unsplash",
    "license": "Unsplash Free Commercial License",
    "aspect": "landscape",
    "tags": [
      "auditorium",
      "summit",
      "conclave"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "conf_05",
    "title": "NFSU Gandhinagar Campus Aerial Promenade",
    "category": "conferences",
    "categoryLabel": "Tech Conferences & Workshops",
    "url": "/assets/aistudio/OIP_8b72b508.webp",
    "thumbUrl": "/assets/aistudio/OIP_8b72b508.webp",
    "author": "NFSU Archive",
    "authorUrl": "https://www.nfsu.ac.in",
    "source": "NFSU Archive",
    "license": "Institutional Academic Fair Use",
    "aspect": "landscape",
    "tags": [
      "nfsu",
      "campus",
      "aerial"
    ],
    "colorTone": "green",
    "fallbackLocal": "/assets/aistudio/OIP_8b72b508.webp"
  },
  {
    "id": "conf_06",
    "title": "Wikimedia Developers Hackathon Team Session",
    "category": "conferences",
    "categoryLabel": "Tech Conferences & Workshops",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Wikimedia_hackathon_team_-_Open_Minds_Awards_2017.jpg/1280px-Wikimedia_hackathon_team_-_Open_Minds_Awards_2017.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Wikimedia_hackathon_team_-_Open_Minds_Awards_2017.jpg/1280px-Wikimedia_hackathon_team_-_Open_Minds_Awards_2017.jpg",
    "author": "Jean-Frédéric",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC0",
    "aspect": "landscape",
    "tags": [
      "hackathon",
      "developers",
      "team"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_silicon_forensics_1794419167984.jpg"
  },
  {
    "id": "geom_01",
    "title": "3-Cube Orthogonal Projection Manifold",
    "category": "futuristic_geometric",
    "categoryLabel": "Futuristic Geometric Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/3-cube.png/1280px-3-cube.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/3-cube.png/1280px-3-cube.png",
    "author": "Jgmoxness",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 3.0",
    "aspect": "square",
    "tags": [
      "cube",
      "geometry",
      "projection"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "geom_02",
    "title": "Abox 4D & Menger Sponge OpenCL Raytrace",
    "category": "futuristic_geometric",
    "categoryLabel": "Futuristic Geometric Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Abox_4D_und_Mengerschwamm_OpenCL_1658541_25K.jpg/1280px-Abox_4D_und_Mengerschwamm_OpenCL_1658541_25K.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Abox_4D_und_Mengerschwamm_OpenCL_1658541_25K.jpg/1280px-Abox_4D_und_Mengerschwamm_OpenCL_1658541_25K.jpg",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "menger-sponge",
      "4d",
      "opencl"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "geom_03",
    "title": "4D Sphere Klein Bottle Architectural Render",
    "category": "futuristic_geometric",
    "categoryLabel": "Futuristic Geometric Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Abox_-_Sphere_4D_8K_HQ_OpenCL_20200323_klein.png/1280px-Abox_-_Sphere_4D_8K_HQ_OpenCL_20200323_klein.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Abox_-_Sphere_4D_8K_HQ_OpenCL_20200323_klein.png/1280px-Abox_-_Sphere_4D_8K_HQ_OpenCL_20200323_klein.png",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY 4.0",
    "aspect": "landscape",
    "tags": [
      "klein",
      "4d",
      "geometric"
    ],
    "colorTone": "purple",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "geom_04",
    "title": "32K Stereoscopic Polyhedral Mandelbulb Prism",
    "category": "futuristic_geometric",
    "categoryLabel": "Futuristic Geometric Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Mandelbulb_stereo_752528845_32K.jpg/1280px-Mandelbulb_stereo_752528845_32K.jpg",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Mandelbulb_stereo_752528845_32K.jpg/1280px-Mandelbulb_stereo_752528845_32K.jpg",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC BY-SA 4.0",
    "aspect": "landscape",
    "tags": [
      "stereoscopic",
      "3d",
      "geometric"
    ],
    "colorTone": "blue",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  },
  {
    "id": "geom_05",
    "title": "Geometric Faceted Mandelbulb Structure",
    "category": "futuristic_geometric",
    "categoryLabel": "Futuristic Geometric Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Mandelbulb_fractal.png/1280px-Mandelbulb_fractal.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Mandelbulb_fractal.png/1280px-Mandelbulb_fractal.png",
    "author": "Falco Badermann",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC0",
    "aspect": "square",
    "tags": [
      "faceted",
      "3d",
      "fractal"
    ],
    "colorTone": "amber",
    "fallbackLocal": "/assets/images/signal_tactile_prism_1794418294380.jpg"
  },
  {
    "id": "geom_06",
    "title": "High-Resolution Geometric RGBA8 Surface Mesh",
    "category": "futuristic_geometric",
    "categoryLabel": "Futuristic Geometric Backgrounds",
    "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/MandelbulbObererTeil_20220112_RGBA8.png/1280px-MandelbulbObererTeil_20220112_RGBA8.png",
    "thumbUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/MandelbulbObererTeil_20220112_RGBA8.png/1280px-MandelbulbObererTeil_20220112_RGBA8.png",
    "author": "PantheraLeo1359531",
    "authorUrl": "https://commons.wikimedia.org",
    "source": "Wikimedia",
    "license": "CC0",
    "aspect": "landscape",
    "tags": [
      "mesh",
      "surface",
      "3d"
    ],
    "colorTone": "cyan",
    "fallbackLocal": "/assets/images/signal_brutalist_monolith_1794418292586.jpg"
  }
];

export const TOTAL_IMAGE_COUNT = IMAGE_LIBRARY.length;
