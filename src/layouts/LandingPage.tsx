import { Outlet } from "react-router-dom";
import Navbar from "../components/landing/Navbar";

export default function LandingPageLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
