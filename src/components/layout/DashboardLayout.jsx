import React, { useState } from "react";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenMenu = () => [setIsOpen((prev) => !prev)];

  return (
    <div className="flex min-h-screen h-auto w-full">
      <SideBar isOpen={isOpen} onClose={handleOpenMenu} />

      <div
        className={`w-full transition-all ease-in-out duration-300 ${isOpen ? "pl-60" : "pl-25"}`}
      >
        <NavBar onToggle={handleOpenMenu} sidebarOpen={isOpen} />
        <main className="flex-1 min-h-screen overflow-y-auto pt-20 px-4">
          <Outlet 
            context={{
              isOpen
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
