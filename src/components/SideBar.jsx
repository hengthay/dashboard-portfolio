import { FaHome } from "react-icons/fa";
import { GiAchievement, GiSkills } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBlogger } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { MdCastForEducation } from "react-icons/md";
import { GrProjects, GrVulnerability } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { RiProfileLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logoutUser } from "../feature/auth/authSlice";
import Swal from "sweetalert2";

const SideBar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { id: 1, iconName: FaHome, label: "Home", pathName: "/" },
    {
      id: 2,
      iconName: GiAchievement,
      label: "Achievements",
      pathName: "/achievements",
    },
    { id: 3, iconName: FaBlogger, label: "Blogs", pathName: "/blogs" },
    {
      id: 4,
      iconName: TbCertificate,
      label: "Certificate",
      pathName: "/certificates",
    },
    {
      id: 5,
      iconName: MdCastForEducation,
      label: "Educations",
      pathName: "/educations",
    },
    {
      id: 6,
      iconName: GrVulnerability,
      label: "Experiences",
      pathName: "/experiences",
    },
    { 
      id: 7, 
      iconName: GrProjects, 
      label: "Project", 
      pathName: "/projects" 
    },
    { 
      id: 8, 
      iconName: RiProfileLine, 
      label: "Profile", 
      pathName: "/profiles" 
    },
    { 
      id: 9, 
      iconName: GiSkills, 
      label: "Skills", 
      pathName: "/skills" 
    },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      Swal.fire({
        title: "Successfully",
        text: "Your logout is successfully!",
        icon: 'success',
        timer: 1000,
      })

      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Your logout is failed!",
        icon: 'error',
        timer: 1000,
      })
    }
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-20 min-h-screen bg-gray-200 shadow 
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-60" : "w-23"}`}
      >
        <div className="flex flex-col p-4 md:p-6 space-y-10">
          {/* Profile */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-10 h-10 bg-gray-500 rounded-full object-cover"
            />

            <div
              className={`transition-all duration-300 origin-left
              ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0 overflow-hidden"}`}
            >
              <h4 className="font-semibold">Admin</h4>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>

          {/* Menu */}
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.iconName;
              const isActive = location.pathname === item.pathName;

              return (
                <li key={item.id}>
                  <Link
                    to={item.pathName}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all
                    ${
                      isActive
                        ? "bg-blue-200 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={20} className="min-w-5" />

                    <span
                      className={`whitespace-nowrap transition-all duration-300 origin-left
                      ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0 overflow-hidden"}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            onClick={handleLogout}
            className={`absolute bottom-10
            flex justify-start items-center gap-2 bg-black cursor-pointer text-white
            ${isOpen ? "px-4" : "px-3"} py-1.5 rounded-md border
            hover:bg-transparent hover:text-black group transition`}
          >
            <FiLogOut size={18} className="text-white group-hover:text-black" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
