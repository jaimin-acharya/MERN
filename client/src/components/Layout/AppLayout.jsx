import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TopLoader } from "../../pages/TopLoader";

export const AppLayout = () => {
  return (
    <>
      <TopLoader />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
