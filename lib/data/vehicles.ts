// TODO: replace with Eless Autos Motors' own photography.
// All imagery below uses pinned Unsplash CDN URLs (images.unsplash.com) purely
// as placeholders. Every price is in Naira; realistic Lagos/Ibadan market rates.

import { DARK_BLUR } from "@/lib/images";

export type Condition = "Tokunbo" | "Nigerian-used";
export type Location = "Lagos" | "Ibadan";
export type BodyType = "Sedan" | "SUV" | "Pickup" | "Hatchback" | "Bus" | "Luxury";
export type VehicleStatus = "available" | "sold";

export interface SpecRow {
  label: string;
  value: string;
}

export interface InspectionItem {
  label: string;
  passed: boolean;
}

export interface Vehicle {
  slug: string;
  make: string;
  model: string;
  /** Display name, e.g. "Toyota Highlander" */
  name: string;
  year: number;
  /** Price in Naira. */
  price: number;
  mileageKm: number;
  location: Location;
  condition: Condition;
  bodyType: BodyType;
  status: VehicleStatus;
  /** Freshly-arrived stock — shows the amber "New" badge. */
  isNew?: boolean;
  featured?: boolean;
  /** Annual percentage rate for the finance calculator (18.5–28%). */
  apr: number;
  /** Default down-payment as a fraction of price (0.30–0.50). */
  defaultDownPct: number;
  images: string[];
  blurDataURL: string;
  tagline: string;
  description: string;
  features: string[];
  specs: SpecRow[];
  inspection: InspectionItem[];
}

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

const DEFAULT_INSPECTION: InspectionItem[] = [
  { label: "Engine & transmission", passed: true },
  { label: "Brakes & suspension", passed: true },
  { label: "Electricals & AC", passed: true },
  { label: "Body & paint", passed: true },
  { label: "Tyres & alignment", passed: true },
  { label: "Documentation cleared", passed: true },
];

export const vehicles: Vehicle[] = [
  {
    slug: "mercedes-benz-gle-450",
    make: "Mercedes-Benz",
    model: "GLE 450",
    name: "Mercedes-Benz GLE 450",
    year: 2022,
    price: 95_000_000,
    mileageKm: 12_500,
    location: "Ibadan",
    condition: "Tokunbo",
    bodyType: "Luxury",
    status: "available",
    isNew: true,
    featured: true,
    apr: 18.5,
    defaultDownPct: 0.3,
    images: [
      u("1617531653332-bd46c24f2068"),
      u("1618843479313-40f8afb4b4d8"),
      u("1606664515524-ed2f786a0bd6"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.0L Turbo · 4MATIC AWD · 2022 · 12,500 km · Ibadan",
    description:
      "A one-owner GLE 450 imported and fully cleared, presented in Obsidian Black over Macchiato Beige. Recently serviced with full history, new tyres all round, and a clean inspection. Ready for immediate delivery from our Ibadan showroom, or door-delivered nationwide.",
    features: [
      "360° Camera",
      "Panoramic roof",
      "Ventilated seats",
      "Burmester audio",
      "Adaptive cruise",
    ],
    specs: [
      { label: "Engine", value: "3.0L V6 Turbo" },
      { label: "Transmission", value: "9-speed auto" },
      { label: "Drivetrain", value: "4MATIC AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Obsidian Black" },
      { label: "VIN", value: "4JGF…8821" },
      { label: "Reg year", value: "2022" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "toyota-highlander-2019",
    make: "Toyota",
    model: "Highlander",
    name: "Toyota Highlander",
    year: 2019,
    price: 42_000_000,
    mileageKm: 48_000,
    location: "Lagos",
    condition: "Tokunbo",
    bodyType: "SUV",
    status: "available",
    featured: true,
    apr: 20,
    defaultDownPct: 0.35,
    images: [
      u("1519641471654-76ce0107ad1b"),
      u("1552519507-da3b142c6e3d"),
      u("1494976388531-d1058494cdd8"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.5L V6 · AWD · 2019 · 48,000 km · Lagos",
    description:
      "A dependable three-row family SUV with a full service record and clean interior. Tokunbo, fully inspected and road-ready for the school run or the long haul to the East.",
    features: ["3rd-row seats", "Reverse camera", "CarPlay", "Leather trim"],
    specs: [
      { label: "Engine", value: "3.5L V6" },
      { label: "Transmission", value: "8-speed auto" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "7" },
      { label: "Colour", value: "Celestial Silver" },
      { label: "VIN", value: "5TDB…4471" },
      { label: "Reg year", value: "2019" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "honda-accord-2016",
    make: "Honda",
    model: "Accord",
    name: "Honda Accord",
    year: 2016,
    price: 14_500_000,
    mileageKm: 96_000,
    location: "Lagos",
    condition: "Nigerian-used",
    bodyType: "Sedan",
    status: "available",
    featured: true,
    apr: 24,
    defaultDownPct: 0.4,
    images: [
      u("1606152421802-db97b9c7a11b"),
      u("1583121274602-3e2820c69888"),
      u("1502877338535-766e1452684a"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "2.4L · FWD · 2016 · 96,000 km · Lagos",
    description:
      "The evergreen 'Discussion Continues' Accord — economical, comfortable and cheap to run. A clean Nigerian-used example with a sound engine and fresh service.",
    features: ["Sunroof", "Reverse camera", "Alloy wheels"],
    specs: [
      { label: "Engine", value: "2.4L i-VTEC" },
      { label: "Transmission", value: "CVT auto" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Modern Steel" },
      { label: "VIN", value: "1HGC…2290" },
      { label: "Reg year", value: "2016" },
    ],
    inspection: [
      { label: "Engine & transmission", passed: true },
      { label: "Brakes & suspension", passed: true },
      { label: "Electricals & AC", passed: true },
      { label: "Body & paint", passed: true },
      { label: "Tyres & alignment", passed: true },
      { label: "Documentation cleared", passed: true },
    ],
  },
  {
    slug: "toyota-corolla-2018",
    make: "Toyota",
    model: "Corolla",
    name: "Toyota Corolla",
    year: 2018,
    price: 16_800_000,
    mileageKm: 72_000,
    location: "Lagos",
    condition: "Nigerian-used",
    bodyType: "Sedan",
    status: "available",
    apr: 25,
    defaultDownPct: 0.4,
    images: [
      u("1590362891991-f776e747a588"),
      u("1541899481282-d53bffe3c35d"),
      u("1502877338535-766e1452684a"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "1.8L · FWD · 2018 · 72,000 km · Lagos",
    description:
      "Nigeria's most trusted sedan. Frugal, reliable and endlessly serviceable — a clean Corolla that just keeps going. Fully inspected and ready to register.",
    features: ["Bluetooth", "Rear camera", "Fabric seats"],
    specs: [
      { label: "Engine", value: "1.8L 2ZR" },
      { label: "Transmission", value: "CVT auto" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Super White" },
      { label: "VIN", value: "2T1B…9014" },
      { label: "Reg year", value: "2018" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "lexus-rx-350-2020",
    make: "Lexus",
    model: "RX 350",
    name: "Lexus RX 350",
    year: 2020,
    price: 58_000_000,
    mileageKm: 34_000,
    location: "Ibadan",
    condition: "Tokunbo",
    bodyType: "SUV",
    status: "available",
    apr: 19.5,
    defaultDownPct: 0.35,
    images: [
      u("1621007947382-bb3c3994e3fb"),
      u("1606664515524-ed2f786a0bd6"),
      u("1494976388531-d1058494cdd8"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.5L V6 · AWD · 2020 · 34,000 km · Ibadan",
    description:
      "Low-mileage Tokunbo RX 350 with the full luxury package. Whisper-quiet, beautifully built and famously durable. Inspected and delivery-ready from Ibadan.",
    features: ["Ventilated seats", "Mark Levinson audio", "Heads-up display", "Panoramic roof"],
    specs: [
      { label: "Engine", value: "3.5L V6" },
      { label: "Transmission", value: "8-speed auto" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Nebula Grey" },
      { label: "VIN", value: "2T2B…6653" },
      { label: "Reg year", value: "2020" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "honda-cr-v-2019",
    make: "Honda",
    model: "CR-V",
    name: "Honda CR-V",
    year: 2019,
    price: 34_500_000,
    mileageKm: 51_000,
    location: "Lagos",
    condition: "Tokunbo",
    bodyType: "SUV",
    status: "available",
    apr: 21,
    defaultDownPct: 0.35,
    images: [
      u("1568844293986-8d0400bd4745"),
      u("1552519507-da3b142c6e3d"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "1.5L Turbo · AWD · 2019 · 51,000 km · Lagos",
    description:
      "A practical, fuel-sipping compact SUV with generous space and a strong resale reputation. Clean Tokunbo unit, fully inspected in Lagos.",
    features: ["Reverse camera", "Lane assist", "CarPlay", "Alloy wheels"],
    specs: [
      { label: "Engine", value: "1.5L Turbo" },
      { label: "Transmission", value: "CVT auto" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Modern Steel" },
      { label: "VIN", value: "7FAR…1180" },
      { label: "Reg year", value: "2019" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "toyota-hilux-2021",
    make: "Toyota",
    model: "Hilux",
    name: "Toyota Hilux",
    year: 2021,
    price: 52_000_000,
    mileageKm: 40_000,
    location: "Lagos",
    condition: "Tokunbo",
    bodyType: "Pickup",
    status: "available",
    apr: 20.5,
    defaultDownPct: 0.35,
    images: [
      u("1559416523-140ddc3d238c"),
      u("1605559424843-9e4c228bf1c2"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "2.8L Diesel · 4x4 · 2021 · 40,000 km · Lagos",
    description:
      "The workhorse that never quits. A tough 4x4 Hilux double-cab, ideal for site work or off-road runs, with low mileage and a clean bill of health.",
    features: ["4x4 low range", "Bed liner", "Tow package", "Reverse camera"],
    specs: [
      { label: "Engine", value: "2.8L Diesel" },
      { label: "Transmission", value: "6-speed auto" },
      { label: "Drivetrain", value: "4x4" },
      { label: "Fuel", value: "Diesel" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Glacier White" },
      { label: "VIN", value: "MR0F…7742" },
      { label: "Reg year", value: "2021" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "kia-sportage-2017",
    make: "Kia",
    model: "Sportage",
    name: "Kia Sportage",
    year: 2017,
    price: 19_900_000,
    mileageKm: 88_000,
    location: "Ibadan",
    condition: "Nigerian-used",
    bodyType: "SUV",
    status: "available",
    apr: 26,
    defaultDownPct: 0.4,
    images: [
      u("1609521263047-f8f205293f24"),
      u("1494976388531-d1058494cdd8"),
      u("1502877338535-766e1452684a"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "2.0L · FWD · 2017 · 88,000 km · Ibadan",
    description:
      "A stylish, well-equipped compact SUV at a friendly price. Sound Nigerian-used Sportage with cold AC and a tidy interior. Inspected in Ibadan.",
    features: ["Reverse camera", "Bluetooth", "Roof rails"],
    specs: [
      { label: "Engine", value: "2.0L GDI" },
      { label: "Transmission", value: "6-speed auto" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Mercury Blue" },
      { label: "VIN", value: "KNDP…3319" },
      { label: "Reg year", value: "2017" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "mercedes-benz-c300-2019",
    make: "Mercedes-Benz",
    model: "C300",
    name: "Mercedes-Benz C300",
    year: 2019,
    price: 44_000_000,
    mileageKm: 29_000,
    location: "Lagos",
    condition: "Tokunbo",
    bodyType: "Sedan",
    status: "sold",
    apr: 20,
    defaultDownPct: 0.35,
    images: [
      u("1618843479313-40f8afb4b4d8"),
      u("1606152421802-db97b9c7a11b"),
      u("1502877338535-766e1452684a"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "2.0L Turbo · RWD · 2019 · 29,000 km · Lagos",
    description:
      "A sharp, low-mileage C300 in AMG-line trim. This unit has been sold — talk to us about sourcing a similar one to order.",
    features: ["AMG line", "Burmester audio", "Ambient lighting", "Panoramic roof"],
    specs: [
      { label: "Engine", value: "2.0L Turbo" },
      { label: "Transmission", value: "9-speed auto" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Selenite Grey" },
      { label: "VIN", value: "55SW…0071" },
      { label: "Reg year", value: "2019" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "ford-edge-2018",
    make: "Ford",
    model: "Edge",
    name: "Ford Edge",
    year: 2018,
    price: 31_000_000,
    mileageKm: 65_000,
    location: "Lagos",
    condition: "Nigerian-used",
    bodyType: "SUV",
    status: "available",
    apr: 25,
    defaultDownPct: 0.4,
    images: [
      u("1551830820-330a71b99659"),
      u("1552519507-da3b142c6e3d"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.5L V6 · AWD · 2018 · 65,000 km · Lagos",
    description:
      "A roomy, comfortable mid-size SUV with strong V6 power. A clean Nigerian-used Edge, fully inspected and ready for the family.",
    features: ["Reverse camera", "Heated seats", "SYNC 3", "Power tailgate"],
    specs: [
      { label: "Engine", value: "3.5L V6" },
      { label: "Transmission", value: "6-speed auto" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Magnetic Grey" },
      { label: "VIN", value: "2FMP…5521" },
      { label: "Reg year", value: "2018" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "hyundai-elantra-2020",
    make: "Hyundai",
    model: "Elantra",
    name: "Hyundai Elantra",
    year: 2020,
    price: 22_500_000,
    mileageKm: 22_000,
    location: "Ibadan",
    condition: "Tokunbo",
    bodyType: "Sedan",
    status: "available",
    apr: 23,
    defaultDownPct: 0.4,
    images: [
      u("1552519507-da3b142c6e3d"),
      u("1590362891991-f776e747a588"),
      u("1502877338535-766e1452684a"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "2.0L · FWD · 2020 · 22,000 km · Ibadan",
    description:
      "Low-mileage Tokunbo Elantra with the sharp new-generation styling. Efficient, well-kept and delivery-ready from Ibadan.",
    features: ["CarPlay", "Reverse camera", "Alloy wheels", "Push start"],
    specs: [
      { label: "Engine", value: "2.0L MPI" },
      { label: "Transmission", value: "CVT auto" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Phantom Black" },
      { label: "VIN", value: "5NPD…7788" },
      { label: "Reg year", value: "2020" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "toyota-sienna-2016",
    make: "Toyota",
    model: "Sienna",
    name: "Toyota Sienna",
    year: 2016,
    price: 17_200_000,
    mileageKm: 110_000,
    location: "Lagos",
    condition: "Nigerian-used",
    bodyType: "Bus",
    status: "available",
    apr: 26,
    defaultDownPct: 0.45,
    images: [
      u("1519641471654-76ce0107ad1b"),
      u("1606152421802-db97b9c7a11b"),
      u("1502877338535-766e1452684a"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.5L V6 · FWD · 2016 · 110,000 km · Lagos",
    description:
      "The family and hire favourite. Spacious 8-seat Sienna with sliding doors and a strong V6. Clean Nigerian-used unit, fully inspected.",
    features: ["8 seats", "Dual sliding doors", "Reverse camera", "Rear AC"],
    specs: [
      { label: "Engine", value: "3.5L V6" },
      { label: "Transmission", value: "6-speed auto" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "8" },
      { label: "Colour", value: "Predawn Grey" },
      { label: "VIN", value: "5TDY…2204" },
      { label: "Reg year", value: "2016" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "range-rover-sport-2021",
    make: "Range Rover",
    model: "Sport",
    name: "Range Rover Sport",
    year: 2021,
    price: 120_000_000,
    mileageKm: 18_000,
    location: "Lagos",
    condition: "Tokunbo",
    bodyType: "Luxury",
    status: "available",
    isNew: true,
    apr: 18.5,
    defaultDownPct: 0.3,
    images: [
      u("1606664515524-ed2f786a0bd6"),
      u("1617531653332-bd46c24f2068"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.0L Supercharged · AWD · 2021 · 18,000 km · Lagos",
    description:
      "A near-new Range Rover Sport with the full HSE Dynamic package. Commanding presence, low mileage and immaculate condition. Inspected and delivery-ready in Lagos.",
    features: ["Meridian audio", "Panoramic roof", "Air suspension", "Terrain Response"],
    specs: [
      { label: "Engine", value: "3.0L Supercharged" },
      { label: "Transmission", value: "8-speed auto" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Santorini Black" },
      { label: "VIN", value: "SALW…9931" },
      { label: "Reg year", value: "2021" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "toyota-camry-2019",
    make: "Toyota",
    model: "Camry",
    name: "Toyota Camry",
    year: 2019,
    price: 26_000_000,
    mileageKm: 47_000,
    location: "Ibadan",
    condition: "Tokunbo",
    bodyType: "Sedan",
    status: "available",
    apr: 22,
    defaultDownPct: 0.4,
    images: [
      u("1621007947382-bb3c3994e3fb"),
      u("1590362891991-f776e747a588"),
      u("1502877338535-766e1452684a"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "2.5L · FWD · 2019 · 47,000 km · Ibadan",
    description:
      "The 'Spider' Camry — bold styling with legendary Toyota reliability. Clean Tokunbo unit, fully inspected and delivery-ready from Ibadan.",
    features: ["CarPlay", "Reverse camera", "Sunroof", "Leather trim"],
    specs: [
      { label: "Engine", value: "2.5L Dynamic Force" },
      { label: "Transmission", value: "8-speed auto" },
      { label: "Drivetrain", value: "FWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Celestial Silver" },
      { label: "VIN", value: "4T1B…6620" },
      { label: "Reg year", value: "2019" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "honda-pilot-2015",
    make: "Honda",
    model: "Pilot",
    name: "Honda Pilot",
    year: 2015,
    price: 15_500_000,
    mileageKm: 130_000,
    location: "Lagos",
    condition: "Nigerian-used",
    bodyType: "SUV",
    status: "available",
    apr: 27,
    defaultDownPct: 0.45,
    images: [
      u("1568844293986-8d0400bd4745"),
      u("1551830820-330a71b99659"),
      u("1502877338535-766e1452684a"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.5L V6 · AWD · 2015 · 130,000 km · Lagos",
    description:
      "A budget-friendly three-row SUV with plenty of space for a growing family. Honest Nigerian-used Pilot, fully inspected with a sound engine.",
    features: ["3rd-row seats", "Reverse camera", "Roof rails"],
    specs: [
      { label: "Engine", value: "3.5L V6" },
      { label: "Transmission", value: "6-speed auto" },
      { label: "Drivetrain", value: "AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "8" },
      { label: "Colour", value: "Obsidian Blue" },
      { label: "VIN", value: "5FNY…4410" },
      { label: "Reg year", value: "2015" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "toyota-land-cruiser-prado-2020",
    make: "Toyota",
    model: "Land Cruiser Prado",
    name: "Toyota Land Cruiser Prado",
    year: 2020,
    price: 95_000_000,
    mileageKm: 26_000,
    location: "Lagos",
    condition: "Tokunbo",
    bodyType: "Luxury",
    status: "available",
    apr: 19,
    defaultDownPct: 0.3,
    images: [
      u("1533473359331-0135ef1b58bf"),
      u("1559416523-140ddc3d238c"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "2.7L · 4x4 · 2020 · 26,000 km · Lagos",
    description:
      "The go-anywhere Prado — the definitive Nigerian executive off-roader. Low-mileage Tokunbo unit with full 4x4 hardware, inspected and delivery-ready in Lagos.",
    features: ["4x4 low range", "7 seats", "Sunroof", "Reverse camera", "Leather trim"],
    specs: [
      { label: "Engine", value: "2.7L VVT-i" },
      { label: "Transmission", value: "6-speed auto" },
      { label: "Drivetrain", value: "4x4" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "7" },
      { label: "Colour", value: "Pearl White" },
      { label: "VIN", value: "JTEB…1177" },
      { label: "Reg year", value: "2020" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "bmw-x5-xdrive40i-2021",
    make: "BMW",
    model: "X5 xDrive40i",
    name: "BMW X5 xDrive40i",
    year: 2021,
    price: 88_000_000,
    mileageKm: 24_000,
    location: "Lagos",
    condition: "Tokunbo",
    bodyType: "Luxury",
    status: "available",
    apr: 18.5,
    defaultDownPct: 0.3,
    images: [
      u("1555215695-3004980ad54e"),
      u("1606664515524-ed2f786a0bd6"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.0L Turbo · xDrive AWD · 2021 · 24,000 km · Lagos",
    description:
      "A low-mileage X5 with the M Sport package and a beautifully finished cabin. Sharp to drive, effortless on the highway. Inspected and delivery-ready in Lagos.",
    features: ["M Sport", "Harman Kardon audio", "Panoramic roof", "Heads-up display"],
    specs: [
      { label: "Engine", value: "3.0L Turbo I6" },
      { label: "Transmission", value: "8-speed auto" },
      { label: "Drivetrain", value: "xDrive AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "5" },
      { label: "Colour", value: "Carbon Black" },
      { label: "VIN", value: "5UXC…2043" },
      { label: "Reg year", value: "2021" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
  {
    slug: "audi-q7-55-tfsi-2022",
    make: "Audi",
    model: "Q7 55 TFSI",
    name: "Audi Q7 55 TFSI",
    year: 2022,
    price: 102_000_000,
    mileageKm: 15_000,
    location: "Lagos",
    condition: "Tokunbo",
    bodyType: "Luxury",
    status: "available",
    isNew: true,
    apr: 18.5,
    defaultDownPct: 0.3,
    images: [
      u("1606664515524-ed2f786a0bd6"),
      u("1617531653332-bd46c24f2068"),
      u("1503376780353-7e6692767b70"),
    ],
    blurDataURL: DARK_BLUR,
    tagline: "3.0L TFSI · quattro · 2022 · 15,000 km · Lagos",
    description:
      "A near-new seven-seat Q7 with the S line package and Audi's superb Virtual Cockpit. Quiet, quick and impeccably built. Inspected and delivery-ready in Lagos.",
    features: ["S line", "Bang & Olufsen audio", "7 seats", "Air suspension", "Matrix LED"],
    specs: [
      { label: "Engine", value: "3.0L TFSI V6" },
      { label: "Transmission", value: "8-speed tiptronic" },
      { label: "Drivetrain", value: "quattro AWD" },
      { label: "Fuel", value: "Petrol" },
      { label: "Seats", value: "7" },
      { label: "Colour", value: "Glacier White" },
      { label: "VIN", value: "WA1V…5567" },
      { label: "Reg year", value: "2022" },
    ],
    inspection: DEFAULT_INSPECTION,
  },
];

// ---- Lookups & filter option sources -------------------------------------

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeatured(): Vehicle[] {
  return vehicles.filter((v) => v.featured);
}

export function getSimilar(vehicle: Vehicle, count = 3): Vehicle[] {
  return vehicles
    .filter((v) => v.slug !== vehicle.slug && v.status === "available")
    .sort((a, b) => {
      const aSame = a.bodyType === vehicle.bodyType ? 0 : 1;
      const bSame = b.bodyType === vehicle.bodyType ? 0 : 1;
      if (aSame !== bSame) return aSame - bSame;
      return Math.abs(a.price - vehicle.price) - Math.abs(b.price - vehicle.price);
    })
    .slice(0, count);
}

export const makes = Array.from(new Set(vehicles.map((v) => v.make))).sort();

export const bodyTypes: BodyType[] = ["Sedan", "SUV", "Pickup", "Hatchback", "Bus", "Luxury"];

export interface PriceBand {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const priceBands: PriceBand[] = [
  { id: "under-20", label: "Under ₦20m", min: 0, max: 20_000_000 },
  { id: "20-50", label: "₦20m – ₦50m", min: 20_000_000, max: 50_000_000 },
  { id: "50-100", label: "₦50m – ₦100m", min: 50_000_000, max: 100_000_000 },
  { id: "over-100", label: "Over ₦100m", min: 100_000_000, max: Infinity },
];

export const years = Array.from(new Set(vehicles.map((v) => v.year))).sort((a, b) => b - a);

/** Company contact — used for WhatsApp + phone CTAs. */
export const CONTACT = {
  phoneLocal: "08120004477",
  phoneDisplay: "+234 812 000 4477",
};
