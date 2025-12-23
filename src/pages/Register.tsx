import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";
import { isAuthenticated } from "../utils/tokenStorage";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    birthdate: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      await register({
        ...form,
        birthdate: new Date(form.birthdate).toISOString(),
      });

      navigate("/login", { replace: true });
    } catch (err) {
      setError("Could not create account");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.png')" }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Sign up to get started
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <input
              name="name"
              placeholder="First name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              name="lastname"
              placeholder="Last name"
              value={form.lastname}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="birthdate"
                value={form.birthdate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                name="phone_number"
                placeholder="Phone number"
                value={form.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>


            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              required
            />

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
