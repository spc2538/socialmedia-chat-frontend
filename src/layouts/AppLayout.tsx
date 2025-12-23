import { Outlet } from "react-router-dom";
import AppNavbar from "../components/chat/AppNavbar";

export default function AppLayout() {

  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

