import { useState } from "react";
import ExpandNavBar from "../assets/ExpandNavBar.jsx";
import patcheslogo from "../assets/patchesIcon.svg";

const Navlinks = ({ curr, name }) => {
  let style = "";

  curr
    ? (style =
        "bg-pinkPalette md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-pinkPalette md:p-0 rounded")
    : (style =
        "text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-pinkPalette md:p-0");
  return (
    <a href="#" className={style}>
      {name}
    </a>
  );
};

export const Navbar = ({ current }) => {
  const [open, setOpen] = useState("");
  const [currentAddress, setcurrentAddress] = useState(current);

  const toggle = () => {
    open == "" ? setOpen("hidden") : setOpen("");
  };

  return (
    <nav className="mt-3 border-red-200 mb-10">
      <div className="w-full mx-auto">
        <div className="mx-2 flex flex-wrap items-center justify-between">
          <a href="#" className="flex">
            <img src={patcheslogo} alt="" className="h-10 mr-3" />
            <span className="font-Satisfy self-center text-greenPalette text-2xl font-bold whitespace-nowrap">
              Patches
            </span>
          </a>
          <div className="flex md:hidden md:order-2">
            <button
              type="button"
              onClick={toggle}
              className="md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
            >
              <span className="sr-only">Open main menu</span>
              <ExpandNavBar />
            </button>
          </div>
          <div
            className={`${open} md:flex justify-between items-end w-full md:w-auto md:order-1`}
          >
            <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Navlinks curr={true} name={"Home"} />
              </li>
              <li>
                <Navlinks curr={false} name={"About"} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
