import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Initial Seed Data for each collection if file does not exist yet
const SEED_DATA = {
  news: [
    {
      id: "national-hackathon-win",
      title: "AAC Students Win National Hackathon with Innovative IoT Health System",
      slug: "aac-students-win-national-hackathon",
      content:
        "The Advanced Academic Center team has achieved remarkable success at the National Hackathon. Our students presented an innovative healthcare monitoring system that uses IoT sensors and machine learning algorithms to predict health issues before they become critical.",
      publishedAt: "2024-03-15T00:00:00.000Z",
      categories: "ACHIEVEMENT",
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
      status: "published",
    },
    {
      id: "microsoft-partnership",
      title: "New AI Research Collaboration with Industry Leaders",
      slug: "new-research-partnership-industry",
      content:
        "AAC announces an expanded research initiative focusing on applied artificial intelligence in engineering education and low-latency computer vision pipelines.",
      publishedAt: "2024-02-20T00:00:00.000Z",
      categories: "RESEARCH",
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
      status: "published",
    },
    {
      id: "nrsc-mou-announcement",
      title: "Official R&D Strategic Alliance with NRSC (ISRO)",
      slug: "nrsc-mou-announcement",
      content:
        "GRIET Advanced Academic Center solidifies long-term scientific partnership with the National Remote Sensing Centre for student research into satellite data and geospatial analytics.",
      publishedAt: "2024-01-10T00:00:00.000Z",
      categories: "PARTNERSHIP",
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
      status: "published",
    },
  ],

  events: [
    {
      id: "opulence",
      title: "Opulence — Flagship Technical Symposium",
      event: "Opulence — Flagship Technical Symposium",
      date: "JUNE 2024",
      category: "symposium",
      status: "ANNUAL FLAGSHIP",
      location: "GRIET Campus, Hyderabad",
      organizer: "Advanced Academic Center",
      description: "AAC's flagship symposium with 400+ participants and distinguished speakers: Pranali Bose (ML Engineer), Raunak Bagga (Koolgen CEO), Srikanth Reddy (Great Honey Co). Included Ideathon (21 teams), G-Prime (42 teams), and LLM workshops.",
      detailedDescription: "Flagship symposium organized by the Advanced Academic Center showcasing state-of-the-art technological demos, industry speaker sessions, competitive coding, and inter-collegiate hackathons.",
      path: "/Events/Opulence2023",
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
      images: ["https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg"],
      ctaText: "Explore Symposium",
      ctaLink: "/Events/Opulence2023",
    },
    {
      id: "gprime",
      title: "G-Prime Competitive Coding Contest",
      event: "G-Prime Competitive Coding Contest",
      date: "ANNUAL EDITION",
      category: "hackathon",
      status: "RESULTS LIVE",
      location: "AAC Labs & Distributed Engine",
      organizer: "Advanced Academic Center",
      description: "Premier competitive programming contest featuring Rapidfire speed testing, Cascade problem sets, and Data Structures challenges with sub-second judging.",
      detailedDescription: "High-concurrency algorithmic battleground testing speed, efficiency, and edge-case handling across complex mathematical and computational graph algorithms.",
      path: "/gprime2026-results",
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
      images: ["https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg"],
      ctaText: "View Live Results",
      ctaLink: "/gprime2026-results",
    },
    {
      id: "expo2023",
      title: "AAC Expo 2023 — Technology Exhibition",
      event: "AAC Expo 2023 — Technology Exhibition",
      date: "DECEMBER 2023",
      category: "symposium",
      status: "COMPLETED",
      location: "GRIET Campus, Hyderabad",
      organizer: "Advanced Academic Center",
      description: "Annual project expo showcasing revolutionary student prototypes in IoT, deep learning, biomedical sensing, and autonomous hardware.",
      detailedDescription: "Over 50 working hardware prototypes displayed before academic juries, patent evaluators, and institutional leaders.",
      path: "/Events/Expo2023",
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
      images: [],
    },
    {
      id: "conclave",
      title: "Data Analytics Conclave",
      event: "Data Analytics Conclave",
      date: "GUEST KEYNOTE",
      category: "symposium",
      status: "KEYNOTE SESSIONS",
      location: "GRIET Campus, Hyderabad",
      organizer: "Advanced Academic Center",
      description: "Impactful data science platform led by Mr. Satish Yellanki (20+ years IT exposure, Oracle database optimization and business intelligence expert).",
      detailedDescription: "Deep dive into enterprise data pipelines, high-volume transactional indexing, and predictive business analytics.",
      path: "/Events/Conclave",
      mainImageUrl: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
      images: [],
    },
  ],

  projects: [
    {
      id: "uav",
      title: "Autonomous Multi-Rotor UAV Platform",
      slug: "autonomous-multi-rotor-uav",
      categories: "AERIAL ROBOTICS",
      author: "AAC Autonomous Lab",
      description: "Autonomous multi-rotor UAV platform featuring edge obstacle avoidance, GPS waypoint guidance, and live telemetry downlink.",
      content: "Complete carbon-fiber custom quadrotor airframe equipped with companion onboard neural processing unit for vision-based real-time obstacle evasion and autonomous mission dispatch.",
      publishedAt: "2024-05-10T00:00:00.000Z",
      mainImageUrl: "/images/8.webp",
      names: ["V. Sai Kiran", "R. Aditya", "AAC Robotics Team"],
      githubRepo: "https://github.com/aac-griet/autonomous-uav",
      status: "active",
    },
    {
      id: "nav",
      title: "Intelligent Campus Navigation System",
      slug: "intelligent-campus-navigation",
      categories: "AR & INDOOR POSITIONING",
      author: "AAC Systems Lab",
      description: "Sub-meter AR indoor positioning and directional wayfinding system mapping multi-storey GRIET campus complexes.",
      content: "Leverages visual odometry and Bluetooth Low Energy (BLE) spatial anchor beacons to deliver fluid augmented-reality wayfinding without GPS signals.",
      publishedAt: "2024-02-14T00:00:00.000Z",
      mainImageUrl: "/images/pic.webp",
      names: ["M. Akhil", "P. Sravan", "K. Neha"],
      githubRepo: "https://github.com/aac-griet/campus-ar-nav",
      status: "active",
    },
    {
      id: "pill",
      title: "Automated Pill Reminder & Verification",
      slug: "automated-pill-reminder",
      categories: "HEALTHCARE & EMBEDDED",
      author: "AAC Biomedical Cohort",
      description: "Patented assistive medical adherence system with modular dosage cartridges and two-way verification.",
      content: "Patented hardware compliance device featuring physical sensor confirmations and GSM alerting to safeguard patients with complex medication regimens.",
      publishedAt: "2023-11-20T00:00:00.000Z",
      mainImageUrl: "/images/AAC1.png",
      names: ["Yelma Chethan Reddy", "Alence Abhinay", "M. Srikanth"],
      githubRepo: "",
      status: "published",
    },
    {
      id: "glove",
      title: "Smart Sign Language Glove",
      slug: "smart-sign-language-glove",
      categories: "ASSISTIVE WEARABLES",
      author: "AAC Wearable Lab",
      description: "Low-latency sensory wearable interpreting Indian Sign Language gestures into synthesized speech.",
      content: "Flex sensors and 6-axis IMUs calibrated with onboard neural classifier mapping dynamic sign language gestures to clear audio speech with under 25ms latency.",
      publishedAt: "2023-08-15T00:00:00.000Z",
      mainImageUrl: "/images/AAC3.png",
      names: ["Jashwanth Kranthi Bopanna", "Santosh Sanjeev", "Bharath Varma"],
      githubRepo: "",
      status: "published",
    },
    {
      id: "energy",
      title: "Smart Campus Energy Grid & Load Balancer",
      slug: "smart-campus-energy-grid",
      categories: "IOT & SUSTAINABILITY",
      author: "AAC Power & IoT Core",
      description: "Intelligent power telemetry network balancing building energy loads and optimizing institutional consumption.",
      content: "Distributed current sensor nodes transmitting MQTT telemetry to institutional analytics engine, reducing peak draw by 18%.",
      publishedAt: "2024-01-20T00:00:00.000Z",
      mainImageUrl: "/images/AAC2.png",
      names: ["R. Karthik", "D. Varun", "AAC IoT Group"],
      githubRepo: "",
      status: "active",
    },
  ],

  corecommittee: [
    {
      id: "cc-2025-1",
      name: "Jayanth Potluri",
      designation: "President",
      year: 2025,
      department: "CSE",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100140/AAC-web/corecommitee/suhasg_r73mrq.jpg",
      linkedin: "https://www.linkedin.com/in/jayanth-potluri-6a93b21ba/",
      status: "active",
    },
    {
      id: "cc-2025-2",
      name: "Harsha Vardhini",
      designation: "Vice President",
      year: 2025,
      department: "CSE",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100133/AAC-web/corecommitee/harshini_av6yso.jpg",
      linkedin: "https://www.linkedin.com/",
      status: "active",
    },
    {
      id: "cc-2025-3",
      name: "Steven Gopaldas",
      designation: "Head Training & Development",
      year: 2025,
      department: "IT",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100139/AAC-web/corecommitee/rishwanth_nsbket.jpg",
      linkedin: "https://www.linkedin.com/in/stevengopaldas/",
      status: "active",
    },
    {
      id: "cc-2025-4",
      name: "Jatin Menghwani",
      designation: "Head Public & Corporate Relations",
      year: 2025,
      department: "IT",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100140/AAC-web/corecommitee/suhasb_vtu0tm.jpg",
      linkedin: "https://www.linkedin.com/in/jatin-menghwani-85b43b15b/",
      status: "active",
    },
    {
      id: "cc-2024-1",
      name: "Stitha Pragna",
      designation: "Head Database & Event Management",
      year: 2024,
      department: "ECE",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,w_400/v1664100136/AAC-web/corecommitee/reethika_q2x5li.jpg",
      linkedin: "",
      status: "alumni",
    },
    {
      id: "cc-2024-2",
      name: "Y Bhuvan",
      designation: "Head Accounting & Assets",
      year: 2024,
      department: "EEE",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,w_400/v1664100141/AAC-web/corecommitee/umakanthsahu_ehpnkf.jpg",
      linkedin: "https://www.linkedin.com/in/y-bhuvan-chand-yarlagadda/",
      status: "alumni",
    },
    {
      id: "cc-2023-1",
      name: "Deepak Venkatesan",
      designation: "Assistant Coordinator Training",
      year: 2023,
      department: "CSE",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,w_400/v1664100136/AAC-web/corecommitee/richavasavi_i0znbb.jpg",
      linkedin: "",
      status: "alumni",
    },
  ],

  publications: [
    {
      id: "wine-quality",
      title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
      publication: "International Journal of Engineering Research and Technology (IJERT)",
      journal: "International Journal of Engineering Research and Technology (IJERT)",
      citation: "ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
      year: 2024,
      category: "Machine Learning",
      authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
      abstract: "This paper proposes a novel ensemble learning method for accurately predicting wine quality using hybrid classification models, feature correlation metrics, and cross-validated decision trees.",
      keywords: ["machine learning", "ensemble models", "hybrid classification", "predictive analytics"],
      paperLink: "https://www.ijert.org/",
      type: "Journal Paper",
    },
    {
      id: "pill-reminder-ip",
      title: "Design and Validation of Two-Way Electronic Verification for Scheduled Medication Compliance",
      publication: "AAC Technical Proceedings & Indian Patent Journal",
      journal: "AAC Technical Proceedings & Indian Patent Journal",
      citation: "Patent Application 201941002559",
      year: 2019,
      category: "Healthcare & Embedded",
      authors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop", "M Srikanth", "D. Naga pavan", "G Pradeep Reddy"],
      abstract: "Presents the architectural schema, firmware timing diagrams, and sensor validation for an automated electronic medication dispenser with multi-compartment replaceable layers and two-way confirmation.",
      keywords: ["biomedical", "medication compliance", "firmware", "iot healthcare"],
      paperLink: "https://ipindiaservices.gov.in/",
      type: "Conference Paper",
    },
  ],

  patents: [
    {
      id: "automated-pill-reminder",
      title: "An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two way confirmation along with replaceable pill compartments layer as value addition been facilitated to the changing requirements.",
      shortTitle: "Automated Electronic Pill Reminder Device",
      category: "Healthcare",
      status: "PUBLISHED ONLINE",
      patentOffice: "India",
      applicationNumber: "201941002559",
      date: "2019-01-21T00:00:00.000Z",
      inventors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop", "M Srikanth", "D.Naga pavan", "G Pradeep Reddy"],
      description: "This patent is for an innovative device designed to help patients remember to take their medications on schedule. The device includes multiple pill compartments that can be customized and provides two-way confirmation to ensure medications are taken properly.",
      color: "purple",
    },
    {
      id: "smart-glove-sign-language",
      title: "A SMART GLOVE FOR RECOGNIZING AND COMMUNICATING SIGN LANGUAGE AND ASSOCIATED METHOD THEREOF.",
      shortTitle: "Smart Glove for Sign Language Translation",
      category: "Assistive Technology",
      status: "PUBLISHED ONLINE",
      patentOffice: "India",
      applicationNumber: "202041038106",
      date: "2020-09-03T00:00:00.000Z",
      inventors: ["Jashwanth Kranthi Bopanna", "Santosh Sanjeev", "Bharath Varma Kantheti", "Gowtham Sai Ponnekanti", "Suhas Gangireddy", "G Pradeep Reddy"],
      description: "This patent describes a wearable technology in the form of a glove that can recognize sign language gestures and translate them into text or speech using flex sensor arrays and IMU tracking.",
      color: "blue",
    },
  ],

  books: [
    {
      id: "level-up",
      title: "Level Up: In The World of Game Development",
      cover: "https://res.cloudinary.com/aacgriet/image/upload/v1730655073/AAC-web/books/wthiaomb2vuhr9sqfkr8.png",
      authors: ["Rithvik Mandya", "Arekela Anjali"],
      description: "A comprehensive guide for aspiring game developers, especially those interested in using the Unity Engine, covering conceptualization, game mechanics, and 3D graphics.",
      category: "Game Development",
      year: 2023,
      color: "indigo",
      status: "published",
    },
    {
      id: "python-nutshell",
      title: "Fundamentals of Python in a Nutshell",
      cover: "https://res.cloudinary.com/aacgriet/image/upload/v1730629103/AAC-web/books/chadjmxbuhgfqx3ox91r.png",
      authors: ["Harshavardhini Kyatam", "Jatin Menghwani", "Kalyan Varma", "Saichandana Linga"],
      description: "Introductory guide to Python programming, data structures, and practical application modules curated by AAC student leads.",
      category: "Programming",
      year: 2022,
      color: "blue",
      status: "published",
    },
  ],

  startups: [
    {
      id: "koolgen",
      name: "Koolgen Interactives",
      founder: "Raunak Bagga (AAC Alumnus)",
      founders: ["Raunak Bagga"],
      category: "Interactive Tech & Gaming",
      status: "Active Enterprise",
      color: "blue",
      description: "Pioneering interactive 3D virtual environments, interactive digital twins, and immersive game engine architectures. Keynote speaker at Opulence 2024.",
      mission: "Transforming virtual interaction and simulation technologies.",
      establishedDate: "2022-06-01T00:00:00.000Z",
      website: "https://koolgen.com",
    },
    {
      id: "great-honey",
      name: "The Great Honey Company",
      founder: "Srikanth Reddy Tenneti (AAC Alumnus)",
      founders: ["Srikanth Reddy Tenneti"],
      category: "Food & Sustainability",
      status: "Commercial Scale",
      color: "orange",
      description: "Sustainable agricultural venture connecting ethically harvested natural produce directly to consumers through digital traceability and testing.",
      mission: "Ethical harvesting and sustainable farm-to-table traceability.",
      establishedDate: "2021-08-15T00:00:00.000Z",
      website: "https://greathoney.com",
    },
  ],

  alumni: [
    {
      id: "alumni-1",
      name: "G Suhas",
      designation: "Systems Engineer",
      company: "Google Cloud",
      graduationYear: 2022,
      department: "CSE",
      email: "suhas@alumni.griet.ac.in",
      linkedin: "https://linkedin.com",
      currentLocation: "Bengaluru, India",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100140/AAC-web/corecommitee/suhasg_r73mrq.jpg",
      status: "active",
      bio: "Former AAC Core Lead, focused on cloud distributed architectures and microservices.",
    },
    {
      id: "alumni-2",
      name: "Rishwanth Perumandla",
      designation: "Machine Learning Researcher",
      company: "Microsoft Research",
      graduationYear: 2022,
      department: "IT",
      email: "rishwanth@alumni.griet.ac.in",
      linkedin: "https://linkedin.com",
      currentLocation: "Hyderabad, India",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100139/AAC-web/corecommitee/rishwanth_nsbket.jpg",
      status: "active",
      bio: "Lead author on AAC computer vision models, passionate about low-latency edge inference.",
    },
  ],

  achievements: [
    {
      id: "vishwakarma-award",
      title: "AICTE Vishwakarma Award 2018",
      category: "National Honor",
      date: "2018-12-10T00:00:00.000Z",
      names: ["Advanced Academic Center", "GRIET Student Delegation"],
      mainImage: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100184/AAC-web/news_events/vishwakarma_zzzwlh.jpg",
      images: ["https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100184/AAC-web/news_events/vishwakarma_zzzwlh.jpg"],
      description: "Prestigious national recognition honoring AAC student engineering innovation, practical problem-solving ethics, and community-driven technology solutions.",
      status: "published",
    },
    {
      id: "nrsc-mou",
      title: "Signing of Official R&D MOU with NRSC (ISRO)",
      category: "Strategic Alliance",
      date: "2023-09-15T00:00:00.000Z",
      names: ["AAC Director", "Dr. Mamidi Kiran Kumar", "NRSC Scientists"],
      mainImage: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
      images: ["https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg"],
      description: "Institutional memorandum of understanding signed between GRIET AAC and NRSC, fostering collaborative student research, remote sensing data analytics, and aerospace workshops.",
      status: "published",
    },
  ],
};

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(collection) {
  const safeName = collection.toLowerCase().trim();
  return path.join(DATA_DIR, `${safeName}.json`);
}

export function readCollection(collection) {
  ensureDir();
  const filePath = getFilePath(collection);
  const key = collection.toLowerCase().trim();

  if (!fs.existsSync(filePath)) {
    const seed = SEED_DATA[key] || [];
    fs.writeFileSync(filePath, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return SEED_DATA[key] || [];
  }
}

export function writeCollection(collection, items) {
  ensureDir();
  const filePath = getFilePath(collection);
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf8");
  return items;
}

export function addItem(collection, item) {
  const items = readCollection(collection);
  const id = item.id || item._id || `${collection.toLowerCase()}-${Date.now()}`;
  const newItem = {
    ...item,
    id,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  writeCollection(collection, items);
  return newItem;
}

export function updateItem(collection, id, updates) {
  const items = readCollection(collection);
  const index = items.findIndex((i) => i.id === id || i._id === id);
  if (index === -1) return null;

  const updated = {
    ...items[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };
  items[index] = updated;
  writeCollection(collection, items);
  return updated;
}

export function deleteItem(collection, id) {
  const items = readCollection(collection);
  const filtered = items.filter((i) => i.id !== id && i._id !== id);
  writeCollection(collection, filtered);
  return true;
}

