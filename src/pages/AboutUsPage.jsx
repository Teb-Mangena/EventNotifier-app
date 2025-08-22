import React, { useState } from 'react';

function AboutUsPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Mangena Tebatso",
      role: "Developer",
      studentNo: '223046140',
      image: '/images/tebatso.jpg',
      bio: "Architected the platform and implemented core functionality using React and Node.js",
      contribution: "Full-stack development, API integration, deployment"
    },
    {
      id: 2,
      name: "Mqamelo Sanele",
      role: "UI/UX Designer",
      studentNo: '240492463',
      image: '/images/sanele.jpg',
      bio: "Created intuitive user interfaces and seamless user experiences using Figma",
      contribution: "Wireframing, prototyping, visual design system"
    },
    {
      id: 3,
      name: "Mkhonto John Pleasure",
      role: "Backend Developer",
      studentNo: '222284501',
      image: '/images/pleasure.jpg',
      bio: "Built the server infrastructure and database architecture",
      contribution: "API development, database design, cloud integration"
    },
    {
      id: 4,
      name: "Letlhage Lerato",
      role: "Project Manager",
      studentNo: '230196764',
      image: '/images/lerato.jpg',
      bio: "Kept the team on track and ensured timely delivery of features",
      contribution: "Agile planning, task delegation, timeline management"
    },
    {
      id: 5,
      name: "Maruma Rosina",
      role: "Quality Assurance",
      studentNo: '240384148',
      image: '/images/rosinah.jpg',
      bio: "Ensured the platform was bug-free and performed optimally",
      contribution: "Testing strategy, bug tracking, performance optimization"
    },
    {
      id: 6,
      name: "Sibiya Lesego",
      role: "Content Strategist",
      studentNo: '230543413',
      image: '/images/lesego.jpg',
      bio: "Developed engaging content and communication strategies",
      contribution: "Copywriting, user guides, notification system design"
    },
    {
      id: 7,
      name: "Makaula Melissa",
      role: "DevOps Engineer",
      studentNo: '240034171',
      image: '/images/melissa.jpg',
      bio: "Managed deployment pipelines and server infrastructure",
      contribution: "CI/CD setup, server configuration, monitoring"
    },
    {
      id: 8,
      name: "Dhlamini Nhlanhla",
      role: "Frontend Developer",
      studentNo: '231028105',
      image: '/images/nhlanhla.jpg',
      bio: "Implemented responsive interfaces and interactive components",
      contribution: "Component development, state management, responsive design"
    },
    {
      id: 9,
      name: "Sono Zinhle",
      role: "Security Specialist",
      studentNo: '230299512',
      image: '/images/zinhle.jpg',
      bio: "Ensured the platform meets security standards and protects user data",
      contribution: "Authentication, data encryption, security audits"
    },
    {
      id: 10,
      name: "Thabisa",
      role: "Product Owner",
      studentNo: '230275095',
      image: '/images/thabisa.jpg',
      bio: "Defined the vision and ensured alignment with user needs",
      contribution: "Requirement gathering, stakeholder management, roadmap planning"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMembers = activeFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.role.toLowerCase().includes(activeFilter));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-indigo-900 text-white py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light"></div>
          <div className="absolute top-10 right-0 w-80 h-80 bg-orange-500 rounded-full mix-blend-soft-light"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-soft-light"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Connecting WSU Students to <span className="text-orange-300">Opportunities</span>
              </h1>
              <p className="text-xl max-w-3xl mb-8">
                Empowering Walter Sisulu University students to discover, engage, and thrive
              </p>
              
              <div className="bg-gray-700 bg-opacity-20 backdrop-blur-sm rounded-xl p-6 max-w-3xl">
                <p className="text-lg">
                  EventNotifier is a comprehensive platform created by students for students at Walter Sisulu University.
                  Our mission is to connect students with campus events, in-service trainings, bursaries, and other 
                  opportunities that enhance their university experience and future prospects.
                </p>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-white text-blue-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Join Our Community
                </button>
                <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-800 transition-colors">
                  Contact Our Team
                </button>
              </div>
            </div>
            
            <div className="flex-1 hidden md:block">
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                <div className="bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-2xl p-6 transform rotate-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-72 flex items-center justify-center">
                    <span className="text-gray-500">Platform Screenshot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              From a classroom project to a campus-wide platform serving thousands of students
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  The Challenge
                </h3>
                <p className="text-gray-600 mb-6">
                  As students at Walter Sisulu University, we noticed a significant gap in how campus events and opportunities 
                  were communicated. Important events like career workshops, bursary application deadlines, and in-service training 
                  sessions were often shared through scattered channels - notice boards, social media, and word of mouth.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Our Solution
                </h3>
                <p className="text-gray-600">
                  That's why we created EventNotifier - a centralized platform that aggregates all campus events and opportunities 
                  in one place. Our platform ensures that every student has equal access to information that can help them succeed 
                  academically and professionally.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                  <span className="text-gray-500">Campus Event Photo</span>
                </div>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center mt-8">
                  <span className="text-gray-500">Team Working Photo</span>
                </div>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-72 flex items-center justify-center">
                  <span className="text-gray-500">App Interface</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 text-white p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">10,000+</p>
                    <p className="text-gray-600 text-sm">Students Served</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Students Love EventNotifier</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Our platform provides everything you need to make the most of your university experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              color="blue"
              title="Event Discovery"
              description="Browse all campus events in one place - from academic workshops to social gatherings. Never miss an important date again."
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
              color="green"
              title="Personalized Alerts"
              description="Get notified about bursaries, internships, and opportunities tailored to your field of study."
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              color="purple"
              title="Secure Registration"
              description="Easily register for events with our secure system. Your data is protected with industry-standard encryption."
            />
          </div>
          
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A diverse group of Walter Sisulu University students passionate about improving campus life through technology
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 mb-8"></div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <FilterButton 
                active={activeFilter === 'all'} 
                onClick={() => setActiveFilter('all')}
              >
                All Members
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'developer'} 
                onClick={() => setActiveFilter('developer')}
              >
                Developers
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'designer'} 
                onClick={() => setActiveFilter('designer')}
              >
                Designers
              </FilterButton>
              <FilterButton 
                active={activeFilter === 'manager'} 
                onClick={() => setActiveFilter('manager')}
              >
                Management
              </FilterButton>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {filteredMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-blue-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
              <p className="text-gray-600 mb-6">
                At EventNotifier, we believe that every Walter Sisulu University student deserves equal access to opportunities 
                that can shape their future. Our mission is to break down information barriers and create a more connected campus 
                community.
              </p>
              
              <div className="space-y-4">
                <MissionItem 
                  title="Democratize Information"
                  description="Ensure all students have access to the same opportunities regardless of their faculty or social circles"
                />
                <MissionItem 
                  title="Enhance Student Engagement"
                  description="Create a vibrant campus culture by making it easy to discover and participate in events"
                />
                <MissionItem 
                  title="Bridge the Opportunity Gap"
                  description="Connect students with bursaries, internships, and career-building experiences"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                <span className="text-gray-500">Team Photo</span>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg">500+</p>
                    <p className="text-gray-600 text-sm">Events Listed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Students Say</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="EventNotifier helped me secure an internship I would have otherwise missed. This platform is a game-changer for WSU students!"
              author="Nomalanga Mkhize"
              role="3rd Year Computer Science"
            />
            <TestimonialCard 
              quote="I never knew about all the events happening on campus until I started using EventNotifier. It's completely transformed my university experience."
              author="Sipho Dlamini"
              role="2nd Year Business Management"
            />
            <TestimonialCard 
              quote="As a shy person, I struggled to find opportunities. EventNotifier made everything accessible in one place. Thank you to the team!"
              author="Lerato Nkosi"
              role="4th Year Education"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-orange-600 to-indigo-900 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Join Thousands of WSU Students</h2>
          <p className="text-xl mb-8">
            Never miss an important event or opportunity again
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-800 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 hover:text-blue-800 transition-colors">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-800 hover:bg-opacity-10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for Feature Cards
const FeatureCard = ({ icon, color, title, description }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };
  
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Component for Team Member Cards
const TeamMemberCard = ({ member }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
    <div className="w-full h-48 overflow-hidden">
      {member.image ? (
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-gray-200 border-2 border-dashed w-full h-full flex flex-col items-center justify-center">
          <div className="bg-gray-300 border-2 border-dashed rounded-full w-16 h-16 mb-3"></div>
          <span className="text-gray-500 text-sm">No Photo</span>
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-bold text-gray-800">{member.name}</h3>
      <p className="text-blue-600 text-sm font-medium">{member.role}</p>
      <p className="text-gray-500 text-xs mb-2">#{member.studentNo}</p>
      <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">Contribution:</p>
        <p className="text-xs text-gray-700">{member.contribution}</p>
      </div>
    </div>
  </div>
);

// Component for Mission Items
const MissionItem = ({ title, description }) => (
  <div className="flex">
    <div className="flex-shrink-0 mt-1">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <div className="ml-3">
      <p className="text-gray-800 font-medium">{title}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

// Component for Filter Buttons
const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {children}
  </button>
);

// Component for Testimonials
const TestimonialCard = ({ quote, author, role }) => (
  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
    <div className="text-yellow-400 mb-4 flex">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-700 italic mb-6">"{quote}"</p>
    <div className="flex items-center">
      <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 mr-3"></div>
      <div>
        <p className="font-semibold text-gray-800">{author}</p>
        <p className="text-gray-600 text-sm">{role}</p>
      </div>
    </div>
  </div>
);

export default AboutUsPage;