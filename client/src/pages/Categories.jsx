import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  PawPrint,
  Smile,
  TrendingUp,
  HardHat,
  GraduationCap,
  Monitor,
  Mic,
  UtensilsCrossed,
  Stethoscope,
  Palette,
  Armchair,
  Home,
  Landmark,
  Clapperboard,
  Coins,
  Users,
  Utensils,
  Shirt,
  Trophy,
  Luggage,
  Zap,
  Car
} from 'lucide-react';

const categoriesData = [
  {
    name: "Animals & Pets",
    icon: PawPrint,
    colorClass: "bg-[#fbf1ad]",
    subcategories: [
      "Animal Health", "Animal Parks & Zoo", "Cats & Dogs", 
      "Horses & Riding", "Pet Services", "Pet Stores"
    ]
  },
  {
    name: "Events & Entertainment",
    icon: Mic,
    colorClass: "bg-[#fcd4e4]",
    subcategories: [
      "Adult Entertainment", "Children's Entertainment", "Clubbing & Nightlife", 
      "Events & Venues", "Gambling", "Gaming", "Museums & Exhibits", 
      "Music & Movies", "Theater & Opera", "Wedding & Party"
    ]
  },
  {
    name: "Home & Garden",
    icon: Armchair,
    colorClass: "bg-[#bcf0cc]",
    subcategories: [
      "Bathroom & Kitchen", "Cultural Goods", "Decoration & Interior", 
      "Energy & Heating", "Fabric & Stationery", "Furniture Stores", 
      "Garden & Pond", "Home & Garden Services", "Home Goods Stores", 
      "Home Improvements"
    ]
  },
  {
    name: "Restaurants & Bars",
    icon: Utensils,
    colorClass: "bg-[#ffd4da]",
    subcategories: [
      "African & Pacific Cuisine", "Bars & Cafes", "Chinese & Korean Cuisine", 
      "European Cuisine", "General Restaurants", "Japanese Cuisine", 
      "Mediterranean Cuisine", "Middle Eastern Cuisine", "North & South American Cuisine", 
      "Southeast Asian Cuisine", "Takeaway", "Vegetarian & Diet"
    ]
  },
  {
    name: "Beauty & Well-being",
    icon: Smile,
    colorClass: "bg-[#bcf0cc]",
    subcategories: [
      "Cosmetics & Makeup", "Hair Care & Styling", "Personal Care", 
      "Salons & Clinics", "Tattoos & Piercings", "Wellness & Spa", "Yoga & Meditation"
    ]
  },
  {
    name: "Food, Beverages & Tobacco",
    icon: UtensilsCrossed,
    colorClass: "bg-[#fbf1ad]",
    subcategories: [
      "Agriculture & Produce", "Asian Grocery Stores", "Bakery & Pastry", 
      "Beer & Wine", "Beverages & Liquor", "Candy & Chocolate", 
      "Coffee & Tea", "Food Production", "Fruits & Vegetables", 
      "Grocery Stores & Markets", "Lunch & Catering", "Meat, Seafood & Eggs", 
      "Smoking & Tobacco"
    ]
  },
  {
    name: "Home Services",
    icon: Home,
    colorClass: "bg-[#ffd7a0]",
    subcategories: [
      "Cleaning Service Providers", "Craftsman", "House Services", 
      "House Sitting & Security", "Moving & Storage", "Plumbing & Sanitation", 
      "Repair Service Providers"
    ]
  },
  {
    name: "Shopping & Fashion",
    icon: Shirt,
    colorClass: "bg-[#bcf0cc]",
    subcategories: [
      "Accessories", "Clothing & Underwear", "Clothing Rental & Repair", 
      "Costume & Wedding", "Jewelry & Watches", "Malls & Marketplaces"
    ]
  },
  {
    name: "Business Services",
    icon: TrendingUp,
    colorClass: "bg-[#ffd4da]",
    subcategories: [
      "Administration & Services", "Associations & Centers", "HR & Recruiting", 
      "Import & Export", "IT & Communication", "Office Space & Supplies", 
      "Print & Graphic Design", "Research & Development", "Sales & Marketing", 
      "Shipping & Logistics", "Wholesale"
    ]
  },
  {
    name: "Legal Services & Government",
    icon: Landmark,
    colorClass: "bg-[#ffd7a0]",
    subcategories: [
      "Customs & Toll", "Government Department", "Law Enforcement", 
      "Lawyers & Attorneys", "Legal Service Providers", "Libraries & Archives", 
      "Municipal Department", "Registration Services"
    ]
  },
  {
    name: "Sports",
    icon: Trophy,
    colorClass: "bg-[#ffd7a0]",
    subcategories: [
      "Ball Games", "Bat-and-ball Games", "Bowls & Lawn Sports", 
      "Dancing & Gymnastics", "Equipment & Associations", "Extreme Sports", 
      "Fitness & Weight Lifting", "Golf & Ultimate", "Hockey & Ice Skating", 
      "Martial arts & Wrestling", "Outdoor & Winter Sports", "Shooting & Target Sports", 
      "Swimming & Water Sports", "Tennis & Racquet Sports"
    ]
  },
  {
    name: "Health & Medical",
    icon: Stethoscope,
    colorClass: "bg-[#bcf0cc]",
    subcategories: [
      "Clinics", "Dental Services", "Diagnostics & Testing", 
      "Doctors & Surgeons", "Health Equipment", "Hospital & Emergency", 
      "Medical Specialists", "Mental Health", "Pharmacy & Medicine", 
      "Physical Aids", "Pregnancy & Children", "Therapy & Senior Health", 
      "Vision & Hearing"
    ]
  },
  {
    name: "Construction & Manufacturing",
    icon: HardHat,
    colorClass: "bg-[#bcf0cc]",
    subcategories: [
      "Architects & Engineers", "Building Materials", "Chemicals & Plastic", 
      "Construction Services", "Contractors & Consultants", "Factory Equipment", 
      "Garden & Landscaping", "Industrial Supplies", "Manufacturing", 
      "Production Services", "Tools & Equipment"
    ]
  },
  {
    name: "Media & Publishing",
    icon: Clapperboard,
    colorClass: "bg-[#ffd4da]",
    subcategories: [
      "Books & Magazines", "Media & Information", "Photography", "Video & Sound"
    ]
  },
  {
    name: "Travel & Vacation",
    icon: Luggage,
    colorClass: "bg-[#ffd7a0]",
    subcategories: [
      "Accommodation & Lodging", "Activities & Tours", "Airlines & Air Travel", 
      "Hotels", "Travel Agencies"
    ]
  },
  {
    name: "Hobbies & Crafts",
    icon: Palette,
    colorClass: "bg-[#fcd4e4]",
    subcategories: [
      "Art & Handicraft", "Astrology & Numerology", "Fishing & Hunting", 
      "Hobbies", "Metal, Stone & Glass Work", "Music & Instruments", 
      "Needlework & Knitting", "Outdoor Activities", "Painting & Paper"
    ]
  },
  {
    name: "Money & Insurance",
    icon: Coins,
    colorClass: "bg-[#fbf1ad]",
    subcategories: [
      "Accounting & Tax", "Banking & Money", "Credit & Debt Services", 
      "Insurance", "Investments & Wealth", "Real Estate"
    ]
  },
  {
    name: "Education & Training",
    icon: GraduationCap,
    colorClass: "bg-[#d8e2fd]",
    subcategories: [
      "Colleges & Universities", "Courses & Classes", "Education Services", 
      "Language Learning", "Music & Theater Classes", "School & High School", 
      "Specials Schools", "Vocational Training"
    ]
  },
  {
    name: "Electronics & Technology",
    icon: Monitor,
    colorClass: "bg-[#e2e1f2]",
    subcategories: [
      "Appliances & Electronics", "Audio & Visual", "Computers & Phones", 
      "Internet & Software", "Repair & Services"
    ]
  },
  {
    name: "Public & Local Services",
    icon: Users,
    colorClass: "bg-[#d8e2fd]",
    subcategories: [
      "Employment & Career", "Funeral & Memorial", "Housing Associations", 
      "Kids & Family", "Military & Veteran", "Nature & Environment", 
      "Professional Organizations", "Public Services & Welfare", 
      "Religious Institutions", "Shelters & Homes", "Waste Management"
    ]
  },
  {
    name: "Utilities",
    icon: Zap,
    colorClass: "bg-[#e2e1f2]",
    subcategories: [
      "Energy & Power", "Oil & Fuel", "Water Utilities"
    ]
  },
  {
    name: "Vehicles & Transportation",
    icon: Car,
    colorClass: "bg-[#ffd7a0]",
    subcategories: [
      "Air & Water Transport", "Airports & Parking", "Auto Parts & Wheels", 
      "Bicycles", "Cars & Trucks", "Motorcycle & Powersports", 
      "Other Vehicles & Trailers", "Taxis & Public Transport", 
      "Vehicle Rental", "Vehicle Repair & Fuel"
    ]
  }
];

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-[#fcfbf3] min-h-screen">
      {/* Search Header Section */}
      <div className="bg-[#fcfbf3] pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-[#1c1c1c] tracking-tight mb-8">
            What are you looking for?
          </h1>
          
          <div className="relative max-w-[700px] mx-auto shadow-[0_2px_4px_rgba(0,0,0,0.08)] bg-white rounded-md flex items-center h-[52px]">
            <Search className="w-5 h-5 text-gray-400 absolute left-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-12 pr-4 bg-transparent outline-none text-[16px] text-gray-900 placeholder:text-gray-500 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Main Categories Section */}
      <div className="bg-white px-4 py-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[28px] font-bold text-[#1c1c1c] tracking-tight mb-8">
            Explore companies by category
          </h2>
          
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {categoriesData.map((category, idx) => {
              const IconComponent = category.icon;
              return (
                <div key={idx} className="break-inside-avoid flex flex-col border border-gray-100 rounded-lg overflow-hidden drop-shadow-sm bg-white">
                  {/* Category Header (Colored) */}
                  <div className={`${category.colorClass} flex flex-col items-center justify-center p-6 min-h-[140px] text-center transition hover:opacity-95 cursor-pointer`}>
                    <IconComponent className="w-7 h-7 mb-3 text-[#1c1c1c]" strokeWidth={1.5} />
                    <h3 className="font-bold text-[15px] text-[#1c1c1c] px-2">{category.name}</h3>
                  </div>
                  
                  {/* Subcategories (White bg) */}
                  <div className="bg-white p-5 flex flex-col gap-4 flex-grow border-t border-gray-100">
                    {category.subcategories.map((sub, i) => (
                      <Link 
                        key={i} 
                        to={`/categories/${sub.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                        className="text-[14px] text-gray-800 hover:text-black hover:underline"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
