const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">EventNotifier</h3>
          <p className="text-gray-400">
            Connecting Walter Sisulu University students with events and
            opportunities since 2023
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Opportunities
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <address className="text-gray-400 not-italic">
            Walter Sisulu University
            <br />
            Nelson Mandela Drive Campus
            <br />
            Mthatha, Eastern Cape
            <br />
            <a
              href="mailto:info@eventnotifier.wsu.ac.za"
              className="block mt-2 hover:text-white"
            >
              info@eventnotifier.wsu.ac.za
            </a>
          </address>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} EventNotifier for Walter Sisulu
          University. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
