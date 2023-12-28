import { Button,  ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import { useFileContext } from "../../context/FileContext";
import { CiMenuFries } from "react-icons/ci";
import MobileMenu from "./MobileMenu";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [switch1, setSwitch1] = useState(false);
  const { setSearchValue } = useFileContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const logOut = () =>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/sign-in");
  }

  return (
    <div className="w-full py-5 border border-gray-300 px-5 flex justify-between items-center">
      <form className="flex items-center w-1/2">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16663 3.33341C5.94496 3.33341 3.33329 5.94509 3.33329 9.16675C3.33329 12.3884 5.94496 15.0001 9.16663 15.0001C12.3883 15.0001 15 12.3884 15 9.16675C15 5.94509 12.3883 3.33341 9.16663 3.33341ZM1.66663 9.16675C1.66663 5.02461 5.02449 1.66675 9.16663 1.66675C13.3088 1.66675 16.6666 5.02461 16.6666 9.16675C16.6666 13.3089 13.3088 16.6667 9.16663 16.6667C5.02449 16.6667 1.66663 13.3089 1.66663 9.16675Z"
                fill="#637381"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2858C13.6111 12.9604 14.1388 12.9604 14.4642 13.2858L18.0892 16.9108C18.4147 17.2363 18.4147 17.7639 18.0892 18.0893C17.7638 18.4148 17.2361 18.4148 16.9107 18.0893L13.2857 14.4643C12.9603 14.1389 12.9603 13.6113 13.2857 13.2858Z"
                fill="#637381"
              />
            </svg>
          </div>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            id="simple-search"
            className="bg-gray-50 border-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
            placeholder="Search branch name..."
            required
          />
        </div>
      </form>
      <div className="flex items-center gap-5">
        <div className="flex max-w-md flex-col">
          <ToggleSwitch checked={switch1} label="" onChange={setSwitch1} />
        </div>
        <CiLogout onClick={logOut} className="text-black cursor-pointer" size={20} />
        <Button
          color="light"
          className="w-[45px] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CiMenuFries size={20} className="text-gray-600" />
        </Button>
        <MobileMenu openMenu={isOpen} setOpenMenu={setIsOpen} />
      </div>
    </div>
  );
};

export default Header;
