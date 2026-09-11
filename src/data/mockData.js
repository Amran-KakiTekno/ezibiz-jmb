// EziBiz JMB - Realistic Malaysian Strata Domain Data & Act 757 Model
export const BUILDING_PROFILE = {
  name: "Residensi Suria Damai",
  propertyType: "High-Rise Strata Condominium",
  address: "18, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur",
  strataNo: "PS 2049 / WP KL",
  jmbRegNo: "JMB/KL/2021/0488",
  totalUnits: 120,
  towers: ["Tower A", "Tower B"],
  maintenanceRatePerSqft: 0.32,
  sinkingFundPercentage: 10, // 10% statutory minimum under Act 757
  lateInterestRatePerAnnum: 10, // 10% simple interest p.a.
  bankAccounts: {
    maintenance: {
      bank: "Maybank Islamic",
      accountName: "JMB RESIDENSI SURIA DAMAI (MAINTENANCE)",
      accountNo: "5641 2890 1142",
      balance: 62450.00
    },
    sinkingFund: {
      bank: "CIMB Islamic",
      accountName: "JMB RESIDENSI SURIA DAMAI (SINKING FUND)",
      accountNo: "8604 1993 7701",
      balance: 184500.00,
      runwayMonths: 18.5
    }
  },
  stats: {
    collectionEfficiency: 91.4, // %
    totalDueThisMonth: 42240.00,
    totalCollectedThisMonth: 38607.36,
    defaultersCount: 9,
    activeDefects: 4,
    unclaimedParcels: 8,
    quorumAttendedPercent: 68.5
  }
};

// Current active resident profile for the Resident Portal View
export const CURRENT_RESIDENT = {
  id: "res_b1402",
  unitNo: "B-14-02",
  tower: "Tower B",
  floor: 14,
  name: "Ir. Hazim Razali",
  isOwner: true,
  role: "Resident Owner",
  email: "hazim.razali@outlook.my",
  phone: "+60 12-389 4410",
  sqft: 1050,
  shareUnits: 105,
  accessCardNo: "AC-88942-B",
  accessCardStatus: "ACTIVE",
  parkingBay: "P2-114 & P2-115 (Tandem)",
  currentBill: {
    billId: "INV-2026-09-B1402",
    period: "September 2026",
    dueDate: "2026-09-15",
    maintenanceCharge: 336.00, // 1050 * 0.32
    sinkingFund: 33.60,       // 10% of 336
    arrears: 0.00,
    lateInterest: 0.00,
    totalAmount: 369.60,
    status: "PENDING" // changes to PAID upon 1-click pay
  }
};

// Comprehensive Unit Registry (120 units, sampling 14 high-detail units for demo)
export const INITIAL_UNITS = [
  {
    id: "unit_1",
    unitNo: "B-14-02",
    tower: "Tower B",
    floor: 14,
    sqft: 1050,
    shareUnits: 105,
    ownerName: "Ir. Hazim Razali",
    occupantType: "Owner Occupied",
    phone: "60123894410",
    email: "hazim.razali@outlook.my",
    cardStatus: "ACTIVE",
    cardSerial: "AC-88942-B",
    balance: 369.60,
    status: "PENDING",
    daysOverdue: 0,
    lastPaymentDate: "2026-08-12"
  },
  {
    id: "unit_2",
    unitNo: "A-03-05",
    tower: "Tower A",
    floor: 3,
    sqft: 950,
    shareUnits: 95,
    ownerName: "Tan Sri Raymond Goh",
    occupantType: "Tenant (Airbnb/Homestay)",
    phone: "60172348911",
    email: "raymond.goh@investcorp.com.my",
    cardStatus: "SUSPENDED",
    cardSerial: "AC-31005-A",
    balance: 1337.60,
    status: "OVERDUE",
    daysOverdue: 105,
    lastPaymentDate: "2026-05-10"
  },
  {
    id: "unit_3",
    unitNo: "B-12-04",
    tower: "Tower B",
    floor: 12,
    sqft: 1200,
    shareUnits: 120,
    ownerName: "Datin Sheila Nathan",
    occupantType: "Owner Occupied",
    phone: "60193382910",
    email: "sheila.nathan@lawfirm.com",
    cardStatus: "ACTIVE",
    cardSerial: "AC-55124-B",
    balance: 422.40,
    status: "PENDING",
    daysOverdue: 2,
    lastPaymentDate: "2026-08-15"
  },
  {
    id: "unit_4",
    unitNo: "A-08-01",
    tower: "Tower A",
    floor: 8,
    sqft: 850,
    shareUnits: 85,
    ownerName: "Ahmad Fauzi & Isteri",
    occupantType: "Owner Occupied",
    phone: "60132290481",
    email: "fauzi.ahmad@petronas.com.my",
    cardStatus: "ACTIVE",
    cardSerial: "AC-44181-A",
    balance: 0.00,
    status: "PAID",
    daysOverdue: 0,
    lastPaymentDate: "2026-09-02"
  },
  {
    id: "unit_5",
    unitNo: "A-15-03",
    tower: "Tower A",
    floor: 15,
    sqft: 1400,
    shareUnits: 140,
    ownerName: "Khor Boon Teik",
    occupantType: "Long-term Tenant",
    phone: "60124981120",
    email: "btkhor@techsol.my",
    cardStatus: "ACTIVE",
    cardSerial: "AC-99153-A",
    balance: 0.00,
    status: "PAID",
    daysOverdue: 0,
    lastPaymentDate: "2026-09-01"
  },
  {
    id: "unit_6",
    unitNo: "B-06-02",
    tower: "Tower B",
    floor: 6,
    sqft: 1050,
    shareUnits: 105,
    ownerName: "Dr. Kavitha Pillai",
    occupantType: "Owner Occupied",
    phone: "60183349182",
    email: "kavitha.p@hkl.gov.my",
    cardStatus: "ACTIVE",
    cardSerial: "AC-72062-B",
    balance: 776.16,
    status: "OVERDUE",
    daysOverdue: 42,
    lastPaymentDate: "2026-07-28"
  },
  {
    id: "unit_7",
    unitNo: "A-11-06",
    tower: "Tower A",
    floor: 11,
    sqft: 950,
    shareUnits: 95,
    ownerName: "Marcus Ling",
    occupantType: "Owner Occupied",
    phone: "60162817290",
    email: "marcus.ling@fintech.co",
    cardStatus: "ACTIVE",
    cardSerial: "AC-11061-A",
    balance: 0.00,
    status: "PAID",
    daysOverdue: 0,
    lastPaymentDate: "2026-09-03"
  },
  {
    id: "unit_8",
    unitNo: "B-02-01",
    tower: "Tower B",
    floor: 2,
    sqft: 850,
    shareUnits: 85,
    ownerName: "Siti Nurhaliza Mat Zin",
    occupantType: "Owner Occupied",
    phone: "60112938102",
    email: "ctnurhaliza88@gmail.com",
    cardStatus: "ACTIVE",
    cardSerial: "AC-82021-B",
    balance: 0.00,
    status: "PAID",
    daysOverdue: 0,
    lastPaymentDate: "2026-09-04"
  },
  {
    id: "unit_9",
    unitNo: "A-18-02",
    tower: "Tower A",
    floor: 18,
    sqft: 1600,
    shareUnits: 160,
    ownerName: "Datuk Steven Chin",
    occupantType: "Penthouse Owner",
    phone: "60123381900",
    email: "steven.chin@chinholdings.com",
    cardStatus: "ACTIVE",
    cardSerial: "AC-18020-A",
    balance: 0.00,
    status: "PAID",
    daysOverdue: 0,
    lastPaymentDate: "2026-09-05"
  },
  {
    id: "unit_10",
    unitNo: "B-09-05",
    tower: "Tower B",
    floor: 9,
    sqft: 1050,
    shareUnits: 105,
    ownerName: "Zulkifli Mansor",
    occupantType: "Tenant",
    phone: "60178912344",
    email: "zul.mansor@aerospace.my",
    cardStatus: "SUSPENDED",
    cardSerial: "AC-90905-B",
    balance: 1108.80,
    status: "OVERDUE",
    daysOverdue: 78,
    lastPaymentDate: "2026-06-18"
  }
];

// Defect & Incident Tickets (with SLA, Form 28 inter-floor leakage)
export const INITIAL_DEFECTS = [
  {
    id: "DEF-2026-081",
    ticketNo: "#TKT-081",
    category: "WATER_LEAK",
    title: "Ceiling Water Seepage from Unit B-13-04 into B-12-04 Master Bath",
    unit: "B-12-04",
    reportedBy: "Datin Sheila Nathan",
    createdAt: "2026-09-09 10:15",
    priority: "HIGH",
    status: "INVESTIGATING",
    slaHours: 48,
    slaTargetTime: "2026-09-11 10:15",
    isForm28Eligible: true,
    form28Generated: false,
    affectedUpperUnit: "B-13-04",
    assignedContractor: "Apex Waterproofing Sdn Bhd",
    description: "Continuous water stains and dripping from the slab above into master bathroom plaster ceiling. Upper unit resident is traveling and hasn't responded to intercom."
  },
  {
    id: "DEF-2026-079",
    ticketNo: "#TKT-079",
    category: "LIFT",
    title: "Passenger Lift 2 Tower A - Jerky Stopping & Door Re-opening on Floor 7",
    unit: "Common Area (Tower A)",
    reportedBy: "Ir. Hazim Razali",
    createdAt: "2026-09-10 08:30",
    priority: "URGENT",
    status: "CONTRACTOR_ASSIGNED",
    slaHours: 24,
    slaTargetTime: "2026-09-11 08:30",
    isForm28Eligible: false,
    form28Generated: false,
    assignedContractor: "Schindler Lifts Malaysia",
    description: "Lift car exhibits sudden shuddering decelerations between floors 6 and 8. Technicians scheduled on site today at 2:00 PM."
  },
  {
    id: "DEF-2026-075",
    ticketNo: "#TKT-075",
    category: "FACILITIES",
    title: "Gym Treadmill #2 Drive Belt Slipping & Incline Motor Jammed",
    unit: "Level 6 Clubhouse",
    reportedBy: "Marcus Ling",
    createdAt: "2026-09-08 17:45",
    priority: "MEDIUM",
    status: "OPEN",
    slaHours: 72,
    slaTargetTime: "2026-09-11 17:45",
    isForm28Eligible: false,
    form28Generated: false,
    assignedContractor: "FitTech Equipment Services",
    description: "Treadmill belt stops abruptly under 70kg weight load. Warning tag placed on machine."
  },
  {
    id: "DEF-2026-070",
    ticketNo: "#TKT-070",
    category: "SECURITY",
    title: "Tower B Boom Gate RFID Sensor Fails on Heavily Tinted Windscreens",
    unit: "Guardhouse Entrance",
    reportedBy: "Chief Guard K. Muniandy",
    createdAt: "2026-09-07 14:20",
    priority: "MEDIUM",
    status: "RESOLVED",
    slaHours: 48,
    slaTargetTime: "2026-09-09 14:20",
    isForm28Eligible: false,
    form28Generated: false,
    assignedContractor: "SecureGate Solutions",
    description: "Antenna gain recalibrated and sensitivity adjusted. Tested across 20 resident vehicles successfully."
  }
];

// Pasar Komuniti & Social Board Items
export const INITIAL_POSTS = [
  {
    id: "post_1",
    category: "ANNOUNCEMENT",
    title: "📢 Notis Rasmi: Kerja Pencucian Tangki Air Utama Tower A & B",
    author: "JMB Management Office",
    authorRole: "JMB Committee",
    unit: "Management",
    isOfficial: true,
    timestamp: "2 Jam lepas",
    content: "Dimaklumkan bahawa bekalan air akan ditutup sementara pada hari Sabtu, 19 Sept 2026 dari jam 9:00 AM hingga 4:00 PM bagi membolehkan kerja disinfeksi dan pembersihan berkala mengikut piawaian SPAN. Sila simpan bekalan air secukupnya.",
    likes: 42,
    readReceiptsCount: 98,
    pinned: true
  },
  {
    id: "post_2",
    category: "MARKETPLACE",
    title: "🥖 Artisan Sourdough Bakes & Japanese Shokupan (Fresh Saturday Morning)",
    author: "Nurul Aina",
    authorRole: "Verified Resident",
    unit: "B-08-03",
    isOfficial: false,
    timestamp: "Semalam 8:30 PM",
    price: "RM 14.00 - RM 22.00",
    content: "Baking fresh small-batch organic sourdough loaves this weekend! Delivery right to your doorstep / lobby on Saturday 8:30 AM. Limited to 15 loaves. Message me to reserve!",
    whatsapp: "60129881023",
    likes: 19,
    commentsCount: 7
  },
  {
    id: "post_3",
    category: "CARPOOL",
    title: "🚗 Daily Morning Carpool: Bangsar South -> KLCC / Jalan Ampang",
    author: "Daniel Chong",
    authorRole: "Verified Resident",
    unit: "A-12-05",
    isOfficial: false,
    timestamp: "Semalam 3:15 PM",
    price: "RM 8.00 / trip",
    content: "Leaving daily around 7:45 AM from Tower A lobby to KLCC area (via MEX/Smart Tunnel). Looking for 2 carpoolers to share petrol & toll costs. Clean EV car with AC!",
    whatsapp: "60176541290",
    likes: 12,
    commentsCount: 4
  },
  {
    id: "post_4",
    category: "LOST_FOUND",
    title: "🔑 Found: Access Card + Leather Key Fob at Level 6 Children's Playground",
    author: "Faizal Harun",
    authorRole: "Verified Resident",
    unit: "B-03-01",
    isOfficial: false,
    timestamp: "2 hari lepas",
    content: "Found an access card with a brown Bottega-style braided key fob on the bench near the swings yesterday around 6 PM. Handed over to Guardhouse Security Post 1.",
    whatsapp: "60132210988",
    likes: 27,
    commentsCount: 2
  },
  {
    id: "post_5",
    category: "PARKING",
    title: "🅿️ Spare Covered Parking Lot for Rent (Level 1, Near Tower B Lift)",
    author: "Ir. Hazim Razali",
    authorRole: "Verified Resident",
    unit: "B-14-02",
    isOfficial: false,
    timestamp: "3 hari lepas",
    price: "RM 130.00 / month",
    content: "Extra tandem parking bay (P2-115) available immediately for long term rental. Very prime location right in front of Tower B lift lobby. Verified residents only.",
    whatsapp: "60123894410",
    likes: 15,
    commentsCount: 6
  }
];

// Glassbox Transparency: Verified Expenditures Log
export const VERIFIED_EXPENDITURES = [
  {
    id: "EXP-2026-0901",
    date: "2026-09-02",
    fund: "MAINTENANCE",
    vendor: "Chubb Security Services Sdn Bhd",
    category: "Security Guarding (24/7 Deployment)",
    amount: 11200.00,
    invoiceRef: "INV-CHUBB-9921",
    status: "VERIFIED_AUDITED",
    description: "Monthly deployment fee for 4 licensed static guards + 1 roving supervisor per 12-hour shift."
  },
  {
    id: "EXP-2026-0902",
    date: "2026-09-03",
    fund: "MAINTENANCE",
    vendor: "Schindler Lifts Malaysia",
    category: "Lift Comprehensive AMC & JKKP Certification",
    amount: 4800.00,
    invoiceRef: "SCH-KL-2026-088",
    status: "VERIFIED_AUDITED",
    description: "Routine servicing for 4 passenger lifts + 2 service lifts across Towers A & B."
  },
  {
    id: "EXP-2026-0903",
    date: "2026-09-04",
    fund: "MAINTENANCE",
    vendor: "Tenaga Nasional Berhad (TNB)",
    category: "Common Area Electricity Tariff C1",
    amount: 8640.20,
    invoiceRef: "TNB-8891024-09",
    status: "VERIFIED_AUDITED",
    description: "Carpark LED lighting, lift motor power, water pump stations, corridor lighting."
  },
  {
    id: "EXP-2026-0815",
    date: "2026-08-28",
    fund: "SINKING_FUND",
    vendor: "HydroPump Engineering Works",
    category: "Emergency Booster Pump Motor Replacement",
    amount: 14500.00,
    invoiceRef: "HYD-REP-4011",
    status: "VERIFIED_AUDITED",
    description: "Replacement of seized 15kW Grundfos multi-stage booster pump motor serving floors 10 to 18 Tower B. Tender awarded via 3 quotes."
  }
];

// Hybrid AGM Resolutions & Digital Ballots
export const AGM_RESOLUTIONS = [
  {
    id: "RES-2026-01",
    title: "Resolution 1: Allocation of RM 38,000 from Sinking Fund for AI CCTV & Facial Recognition Gate Upgrade",
    type: "SPECIAL_RESOLUTION",
    statutoryRequirement: "75% Quorum Approval",
    quorumNeeded: 90,
    votesInFavor: 74,
    votesAgainst: 12,
    abstain: 4,
    totalVoted: 90,
    status: "VOTING_ACTIVE",
    closesAt: "2026-09-20 17:00",
    description: "Replace legacy analog 720p cameras with 4K motorized dome cameras and install facial recognition turnstiles at lobby to curb unauthorized Airbnb/homestay access."
  },
  {
    id: "RES-2026-02",
    title: "Resolution 2: Extending Gym & Resident Co-Working Lounge Hours to 11:00 PM Daily",
    type: "ORDINARY_RESOLUTION",
    statutoryRequirement: "Simple Majority (>50%)",
    quorumNeeded: 61,
    votesInFavor: 82,
    votesAgainst: 8,
    abstain: 0,
    totalVoted: 90,
    status: "PASSED",
    closesAt: "2026-09-05 18:00",
    description: "Current hours (6:00 AM - 10:00 PM) extended by 1 hour with automated smart access lock and motion lighting sensors to support work-from-home residents."
  }
];

// Guardhouse Parcel Logger
export const INITIAL_PARCELS = [
  {
    id: "PCL-8801",
    unit: "B-14-02",
    recipient: "Ir. Hazim Razali",
    courier: "Shopee Xpress",
    trackingNo: "SPXMY0489110284",
    arrivedAt: "Hari ini 11:20 AM",
    status: "AWAITING_PICKUP",
    shelfLocation: "Locker B-3"
  },
  {
    id: "PCL-8802",
    unit: "A-08-01",
    recipient: "Ahmad Fauzi",
    courier: "J&T Express",
    trackingNo: "JNT601994012",
    arrivedAt: "Hari ini 12:45 PM",
    status: "AWAITING_PICKUP",
    shelfLocation: "Shelf A-1"
  },
  {
    id: "PCL-8799",
    unit: "B-12-04",
    recipient: "Datin Sheila",
    courier: "DHL eCommerce",
    trackingNo: "DHLMY8810294",
    arrivedAt: "Semalam 4:10 PM",
    status: "COLLECTED",
    collectedAt: "Semalam 7:30 PM",
    shelfLocation: "Locker B-1"
  }
];
