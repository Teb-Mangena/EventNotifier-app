import SideBar from "../components/SideBar";
import { useState } from "react";

const HelpAndSupportPage = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I register for an event?",
      answer: "To register for an event, navigate to the Events page, click on the event you're interested in, and then click the 'Register Now' button. Follow the prompts to complete your registration."
    },
    {
      id: 2,
      question: "Can I cancel my event registration?",
      answer: "Yes, you can cancel your registration by going to your profile page, selecting 'My Events', and clicking 'Cancel Registration' next to the event you wish to cancel. Please note that some events may have cancellation deadlines."
    },
    {
      id: 3,
      question: "How do I update my profile information?",
      answer: "You can update your profile by clicking on your profile picture in the top right corner, selecting 'Profile Settings', and making the necessary changes. Don't forget to save your changes before exiting."
    },
    {
      id: 4,
      question: "What should I do if I forget my password?",
      answer: "Click on 'Forgot Password' on the login page. You'll receive an email with instructions to reset your password. If you don't see the email, check your spam folder."
    }
  ];

  const contactMethods = [
    {
      type: "Email",
      value: "support@yourchurch.org",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      type: "Phone",
      value: "(555) 123-4567",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      type: "Office Hours",
      value: "Monday - Friday, 9:00 AM - 5:00 PM",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Help & Support</h1>
          <p className="text-gray-600 mb-6">Find answers to common questions or contact our support team</p>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'faq' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  FAQs
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'contact' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Contact Us
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'resources' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Resources
                </button>
              </nav>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'faq' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        className="w-full px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50 focus:outline-none flex justify-between items-center"
                        onClick={() => toggleQuestion(faq.id)}
                      >
                        <span>{faq.question}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${openQuestion === faq.id ? 'transform rotate-180' : ''}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {openQuestion === faq.id && (
                        <div className="px-4 py-3 bg-gray-50 text-gray-600 border-t border-gray-200">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'contact' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Our Support Team</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {contactMethods.map((method, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="mx-auto h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                          {method.icon}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{method.type}</h3>
                        <p className="text-gray-600">{method.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Send us a message</h3>
                    <form>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Helpful Resources</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">User Guide</h3>
                          <p className="text-gray-600 text-sm">Download our complete user guide for detailed instructions on using all features.</p>
                          <a href="#" className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-2 inline-block">Download PDF</a>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Video Tutorials</h3>
                          <p className="text-gray-600 text-sm">Watch our video tutorials to learn how to use the platform effectively.</p>
                          <a href="#" className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-2 inline-block">View Videos</a>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Community Forum</h3>
                          <p className="text-gray-600 text-sm">Join our community forum to ask questions and get help from other users.</p>
                          <a href="#" className="text-orange-600 hover:text-orange-700 text-sm font-medium mt-2 inline-block">Visit Forum</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupportPage;