import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
    fixed top-0 left-0 w-full z-50
    transition-all duration-300
    ${scrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm text-gray-900"
          : "bg-transparent text-white"}
  `}
    >

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">MyLanding</h1>
        <div className="hidden md:flex gap-6">
          <a
            className={`transition-colors ${scrolled ? "hover:text-blue-600" : "hover:text-gray-200"
              }`}
            href="#"
          >
            Source code
          </a>

          <a
            className={`transition-colors ${scrolled ? "hover:text-blue-600" : "hover:text-gray-200"
              }`}
            href="#"
          >
            Swagger UI
          </a>

          <Link
            to="/login"
            className={`
              transition-colors
              ${scrolled
                ? "hover:text-blue-600"
                : "hover:text-gray-200"}
            `}
          >
            Login
          </Link>
        </div>

        <button
          className={`md:hidden text-sm font-medium ${scrolled ? "text-gray-900" : "text-white"
            }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>

      </div>
      {/* {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-4 items-center">
            <a onClick={() => setIsOpen(false)} href="#">Source code</a>
            <a onClick={() => setIsOpen(false)} href="#">Swagger UI</a>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )} */}
      {isOpen && (
        <div
          className={`
            md:hidden px-6 pb-4 py-5
            ${scrolled ? "" : "bg-black/90"}
          `}
        >
          <div className="flex flex-col gap-4 items-center">
            <a onClick={() => setIsOpen(false)} href="#">Source code</a>
            <a onClick={() => setIsOpen(false)} href="#">Swagger UI</a>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
}

export default Navbar;
