import CTA from "./components/landing/CTA";
import Features from "./components/landing/Features";
import FeatureSection from "./components/landing/FeatureSection";
import Footer from "./components/landing/Footer";
import Hero from "./components/landing/Hero";
import LandingPage from "./layouts/LandingPage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <Routes>
      <Route element={<LandingPage />}>
        <Route
          path="/"
          element={
            <>
              <Hero></Hero>
              <Features></Features>
              <FeatureSection
                subtitle="Subtitle"
                title="Build better interfaces"
                text="Tailwind and React help you build fast, responsive, and clean user interfaces with minimal effort."
                image="/feature-image.png"
              />
              <CTA></CTA>
              <Footer></Footer>
            </>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
