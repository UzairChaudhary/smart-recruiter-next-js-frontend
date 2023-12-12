import { BiBriefcase, BiLogOut, BiUser, BiUserCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { useUiContext } from "../contexts/UiContext";
import { actioTypes } from "../reducers/uiReducer";
import { useRouter } from "next/navigation";

const Dropdown = () => {
  const {dispatch, isDropdownOpen } = useUiContext();
  const router = useRouter();
  const handleLogout = () => {
    dispatch({ type: actioTypes.userLoggedOut });
    router.push("/");
  };

  return (
    <>
      {isDropdownOpen && (
        <motion.div
          className="dropdown absolute right-0 top-full mt-1 p-2 !rounded-xl w-48 card card-shadow dark:shadow-none border bg-slate-50 z-30 "
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
        >
          <div className=" flex flex-align-center space-x-3 p-2  sm:cursor-pointer hover:bg-gray-500 hover:text-white dark:hover:bg-hover-color rounded-lg">
            <BiUserCircle className="text-muted mt-1 h-4 w-4" />
            <span className="text-muted">My Profile</span>
          </div>
          
          <div className="flex flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-gray-500 hover:text-white  dark:hover:bg-hover-color rounded-lg">
            <BiBriefcase className="text-muted mt-1 h-4 w-4" />
            <span className="text-muted">My Jobs</span>
          </div>
          <div className="flex flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-gray-500 hover:text-white  dark:hover:bg-hover-color rounded-lg">
            <BiLogOut className="text-muted mt-1 h-4 w-4" />
            <span className="text-muted" onClick={handleLogout}>Sign out</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Dropdown;
