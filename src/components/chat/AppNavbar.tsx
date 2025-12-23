import { useEffect, useState } from "react";
import { logout } from "../../services/auth.service";
import { clearTokens } from "../../utils/tokenStorage";
import { useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearTokens();
      navigate("/login");
    }
  };


  return (
    <nav
      className={`
        top-0 left-0 w-full z-50
        transition-all duration-300
      bg-white/70 backdrop-blur-md shadow-sm text-gray-900`}
    >

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">MyLanding</h1>
        <div className="hidden md:flex gap-6">
          <a
            className={`transition-colors hover:text-gray-200}`}
            href="/"
          >
            Main page
          </a>

          <button
            onClick={handleLogout}
            className={`
              transition-colors
              hover:text-blue-600
            `}
          >
            Logout
          </button>
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
            <a onClick={() => setIsOpen(false)} href="/">Main page</a>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}

    </nav>
  );
}

export default AppNavbar;
