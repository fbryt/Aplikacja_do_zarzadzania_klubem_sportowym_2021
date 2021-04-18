import React from "react";
import MenuAdmin from "../MenuAdmin";
import MenuCoach from "../MenuCoach";
import MenuPlayer from "../MenuPlayer";

const DashboardPage = () => (
  <div>
    <MenuPlayer />
    <MenuCoach />
    <MenuAdmin />
  </div>
);

export default DashboardPage;
