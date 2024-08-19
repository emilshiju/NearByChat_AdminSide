import React, { useContext } from "react";
import { responsiveContext } from "../context/createContext";

const Header = () => {
  const { responsiveMd, setResponsiveMd } = useContext(responsiveContext);

  return (
    <div style={{ paddingLeft: "0px", marginTop: "0px", paddingRight: "0px" }}>
      <nav
        class="bg-white border-gray-200 dark:bg-gray-900"
        style={{ position: "fixed", top: 0, width: "100%" }}
      >
        <div class="max-w-screen-xl flex flex-wrap items-center  mx-auto p-4">
          <img src="../../pngegg.png" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap pl-5 dark:text-white">
            Near BY Chat
          </span>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <hr></hr>
        </div>
      </nav>
    </div>
  );
};

export default Header;
