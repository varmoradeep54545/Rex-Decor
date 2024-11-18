import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaInstagram, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Logo from ".././assets/logo.png";

const Footer = () => {
  const handleCallClick = () => {
    // Replace with your actual phone number or a test number
    window.open("tel:+919409214160");
  };

  const handleEmailClick = () => {
    // Replace with your actual email address
    window.open("mailto:Pateldeep1071@gmail.com");
  };

  return (
    <footer className="bg-slate-200 text-black py-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">
            <div>
              <Link
                to="/"
                className="font-bold text-2xl sm:text-3xl gap-2 tracking-wider font-cursive"
              >
                <img src={Logo} alt="Logo" className="w-25 h-20 " />
              </Link>
              <ul className="space-y-2 pt-3">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-500"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=Ahmedabad"
                      )
                    }
                  >
                    Ahmedabad, India 380015
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-500"
                    onClick={handleCallClick}
                  >
                    Phone: +91 9409-214-160
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-500"
                    onClick={handleEmailClick}
                  >
                    Email: Pateldeep1071@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="hover:text-slate-500">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-slate-500"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">We Deliver to Selected Cities</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-500"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=Mumbai"
                      )
                    }
                  >
                    Mumbai
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-500"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=Ahmedabad"
                      )
                    }
                  >
                    Ahmedabad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-500"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=Delhi"
                      )
                    }
                  >
                    Delhi
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.instagram.com/_patel_deep_1071_/"
                  className="hover:text-gray-600"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/varmoradeep54545"
                  className="hover:text-gray-600"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="https://x.com/PatelMarks680"
                  className="hover:text-gray-600"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a
                  href="www.linkedin.com/in/varmora-deep-bb019a234"
                  className="hover:text-gray-600"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
