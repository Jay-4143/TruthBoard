import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CorporateNav, CorporateFooter } from './AboutTruthboard';

const ContactTruthBoard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact us - TruthBoard Corporate";
  }, []);

  const contactSections = [
    {
      title: "Reviews & Legal",
      content: "Have a question about a review, want to report misuse, or need help with a legal or privacy matter?",
      linkText: "Get in touch",
      link: "#"
    },
    {
      title: "Help Center",
      content: "Find articles, videos, and more resources about how TruthBoard works.",
      linkText: "Learn more",
      link: "#"
    },
    {
      title: "Sales and pricing",
      content: "Learn about our plans, upgrades, or book a demo.",
      linkText: "Get in touch",
      link: "#",
      extra: "plans, upgrades, or "
    },
    {
      title: "Investors",
      content: "For information about our business, policies or updates.",
      subItems: [
        { label: "Analysts and investors:", value: "investor.relations@truthboard.com" },
        { label: "Corporate and financial media (Headland):", value: "truthboard@headlandconsultancy.com" }
      ]
    },
    {
      title: "Public Affairs",
      content: "For enquiries from regulators, government departments, and parliamentarians.",
      email: "publicaffairs@truthboard.com"
    },
    {
      title: "Press",
      content: "For editorial, media and press inquiries.",
      email: "press@truthboard.com"
    }
  ];

  const offices = [
    { city: "Amsterdam", address: "C/O Herikerbergweg 238, Luna ArenA, 1101 CM Amsterdam, The Netherlands", phone: "+31 20 299 1600" },
    { city: "Copenhagen", address: "Pilestræde 58, 5th floor, 1112 Copenhagen K Denmark", phone: "+45 32 75 99 14" },
    { city: "Denver", address: "3000 Lawrence Street Suite 201 / 202 Denver, CO 80205 United States", phone: "+1 720 304 4473" },
    { city: "Edinburgh", address: "80 George St, 4th Floor, Edinburgh EH2 3BU United Kingdom", phone: "+44 208 135 2208" },
    { city: "Hamburg", address: "Esplanade 40 20354 Hamburg Germany", phone: "+49 461 88998111" },
    { city: "London", address: "5th Floor The Minster Building 21 Mincing Lane London EC3R 7AG United Kingdom", phone: "+44 208 135 2208" },
    { city: "Melbourne", address: "Level 1, 55 Collins Street, Melbourne, VIC 3000, Australia", phone: "+61 3 8669 1168" },
    { city: "Milan", address: "C/O Corso Vercelli 40, Milan, CAP 20145, Italy", phone: "+39 02 9713 2838" },
    { city: "New York", address: "Suite 1000, 50 West 23rd Street New York, NY 10010 United States", phone: "+1 646 349 3411" },
    { city: "Sydney", address: "Level 8, 171 Clarence Street Sydney, NSW 2000, Australia", phone: "+61 3 8669 1168" }
  ];

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#1c1c1c]">
      <CorporateNav />
      
      {/* Hero Section */}
      <section className="pt-48 pb-20 text-center border-b border-gray-100">
        <h1 className="text-[52px] font-[900] tracking-tighter mb-4">Contact us</h1>
        <p className="text-[17px] font-medium text-gray-500">We'd love to hear from you</p>
      </section>

      {/* Main Grid Section */}
      <section className="max-w-[1240px] mx-auto py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-24">
          {contactSections.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <h2 className="text-[28px] font-[900] tracking-tight mb-6">{section.title}</h2>
              <p className="text-[15px] leading-relaxed font-medium text-gray-600 mb-6">
                {section.extra && <span>Learn about our <Link to="#" className="underline font-bold text-gray-800">plans</Link>, <Link to="#" className="underline font-bold text-gray-800">upgrades</Link>, or <Link to="#" className="underline font-bold text-gray-800">book a demo</Link>.</span>}
                {!section.extra && section.content}
              </p>
              
              {section.linkText && (
                <Link to={section.link} className="text-[14px] font-bold underline underline-offset-4 hover:text-[#00b67a] transition-colors">{section.linkText}</Link>
              )}

              {section.subItems && (
                <div className="space-y-6 mt-4">
                  {section.subItems.map((item, id) => (
                    <div key={id}>
                      <span className="block text-[14px] font-bold mb-1">{item.label}</span>
                      <a href={`mailto:${item.value}`} className="text-[14px] font-bold underline underline-offset-4">{item.value}</a>
                    </div>
                  ))}
                </div>
              )}

              {section.email && (
                <a href={`mailto:${section.email}`} className="text-[14px] font-bold underline underline-offset-4 mt-2">{section.email}</a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Banner Section */}
      <section className="bg-[#00b67a] py-24 px-6">
        <div className="max-w-[1240px] mx-auto text-center">
          <h2 className="text-[44px] font-[900] tracking-tighter mb-6 text-[#1c1c1c]">Need something specific?</h2>
          <p className="text-[17px] font-bold text-[#1c1c1c] mb-12 opacity-80">Submit a request and we'll get back to you as soon as possible</p>
          <button className="bg-[#1c1c1c] text-white px-10 py-4 rounded-full font-bold text-[14px] hover:bg-black transition-all shadow-2xl">
            Submit request
          </button>
        </div>
      </section>

      {/* Offices Section */}
      <section className="max-w-[1240px] mx-auto py-32 px-6 md:px-12">
        <h2 className="text-[44px] font-[900] tracking-tighter mb-20 text-[#1c1c1c]">TruthBoard Global Offices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-24">
          {offices.map((office, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-[28px] font-[900] tracking-tight mb-8">{office.city}</h3>
              <p className="text-[15px] font-medium leading-relaxed text-gray-500 mb-8 max-w-[280px]">
                {office.address}
              </p>
              <div className="mt-auto">
                <span className="block text-[14px] font-bold mb-1 uppercase tracking-wider text-gray-400">Telephone number</span>
                <a href={`tel:${office.phone}`} className="text-[14px] font-bold underline underline-offset-4">{office.phone}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CorporateFooter />
    </div>
  );
};

export default ContactTruthBoard;
