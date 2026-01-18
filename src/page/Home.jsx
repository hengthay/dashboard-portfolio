import { useEffect, useState } from "react";
import { GiAchievement, GiSkills } from "react-icons/gi";
import { FaBlogger } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { MdCastForEducation } from "react-icons/md";
import { GrProjects, GrVulnerability } from "react-icons/gr";
import { Link } from "react-router-dom";
import { API_BASE_URL, axiosInstance } from "../components/APIConfig";
import { IoIosArrowRoundForward } from "react-icons/io";
import ActivityGraph from "../components/ActivityGraph";
import RaderGraph from "../components/RaderGraph";
const Home = () => {
  const [count, setCount] = useState({
    projects: 0,
    blogs: 0,
    skills: 0,
    certificates: 0,
    educations: 0,
    experiences: 0,
    achievements: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);

        const res = await axiosInstance.get(`${API_BASE_URL}/dashboard/stats`, {
          withCredentials: true,
        });

        // Extract data
        const data = res?.data?.data;
        // console.log(data);

        setCount({
          projects: data?.projects ?? 0,
          blogs: data?.blogs ?? 0,
          skills: data?.skills ?? 0,
          certificates: data?.certificates ?? 0,
          educations: data?.educations ?? 0,
          experiences: data?.experiences ?? 0,
          achievements: data?.achievements ?? 0,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // console.log(count);
  const stats = [
    {
      id: 1,
      title: "Projects",
      value: count.projects,
      icon: GrProjects,
      color: "bg-blue-50 text-blue-700",
      link: "/projects",
    },
    {
      id: 2,
      title: "Blogs",
      value: count.blogs,
      icon: FaBlogger,
      color: "bg-purple-50 text-purple-700",
      link: "/blogs",
    },
    {
      id: 3,
      title: "Skills",
      value: count.skills,
      icon: GiSkills,
      color: "bg-green-50 text-green-700",
      link: "/skills",
    },
    {
      id: 4,
      title: "Certificates",
      value: count.certificates,
      icon: TbCertificate,
      color: "bg-amber-50 text-amber-700",
      link: "/certificates",
    },
    {
      id: 5,
      title: "Education",
      value: count.educations,
      icon: MdCastForEducation,
      color: "bg-cyan-50 text-cyan-700",
      link: "/educations",
    },
    {
      id: 6,
      title: "Experience",
      value: count.experiences,
      icon: GrVulnerability,
      color: "bg-red-50 text-red-700",
      link: "/experiences",
    },
    {
      id: 7,
      title: "Achievement",
      value: count.achievements,
      icon: GiAchievement,
      color: "bg-pink-50 text-pink-700",
      link: "/achievements",
    },
  ];

  const quickActions = [
    {
      id: 1,
      label: "Add Project",
      desc: "Create a new portfolio project",
      link: "/projects",
    },
    {
      id: 2,
      label: "Write Blog",
      desc: "Publish a new blog post",
      link: "/blogs",
    },
    {
      id: 3,
      label: "Add Skill",
      desc: "Update your skills list",
      link: "/skills",
    },
    {
      id: 4,
      label: "Add Certificate",
      desc: "Upload a new certificate",
      link: "/certificates",
    },
    {
      id: 5,
      label: "Add Education",
      desc: "Upload a new education",
      link: "/educations",
    },
    {
      id: 6,
      label: "Add Experience",
      desc: "Upload a new experience",
      link: "/experiences",
    },
    {
      id: 7,
      label: "Add Achievement",
      desc: "Upload a new achievement",
      link: "/achievements",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Overview of your portfolio admin panel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/projects"
            className="px-4 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-900 transition"
          >
            + New Project
          </Link>
          <Link
            to="/blogs"
            className="px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-white transition"
          >
            Write Blog
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              to={s.link}
              key={s.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{s.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {loading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      s.value
                    )}
                  </p>
                </div>
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center ${s.color}`}
                >
                  <Icon size={20} />
                </div>
              </div>
              <div className="flex justify-start items-center gap-1 mt-3">
                <p className="text-xs text-gray-400">View details</p>
                <IoIosArrowRoundForward
                  size={20}
                  className="transform transition ease-in duration-300 group-hover:translate-x-2 group-hover:text-cyan-400"
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="w-full grid gap-3 grid-cols-12 my-4 border border-gray-300 hover:shadow-sm rounded-md p-2">
        <ActivityGraph />
        <RaderGraph />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            <span className="text-xs text-gray-400">Shortcuts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {quickActions.map((a) => (
              <Link
                to={a.link}
                key={a.id}
                className="group rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition"
              >
                <p className="font-medium text-gray-900 group-hover:underline">
                  {a.label}
                </p>
                <p className="text-sm text-gray-500 mt-1">{a.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-xl h-80 border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/80"
              alt="Admin"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">Admin</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Status</span>
              <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Role</span>
              <span className="text-gray-900">Admin</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Last Login</span>
              <span className="text-gray-900">Today</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              to="/profiles"
              className="flex-1 text-center px-3 py-2 rounded-md border border-gray-200 text-sm hover:bg-gray-50 transition"
            >
              Profile
            </Link>
            <Link
              to="/skills"
              className="flex-1 text-center px-3 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-900 transition"
            >
              Manage
            </Link>
          </div>
        </div>

        {/* Activity Graph */}
      </div>
    </div>
  );
};

export default Home;
