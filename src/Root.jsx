import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Root = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Root;