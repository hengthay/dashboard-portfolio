import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProject, selectProject, selectProjectStatus } from "../feature/project/projectSlice";
import ProjectCard from "../components/Project/ProjectCard";

const Project = () => {

  const [search, setSearch] = useState("");
  const [selectType, setSelectType] = useState("All");
  const projectsType = ["All", "Frontend", "Backend", "Full-Stack"];
  const projects = useSelector(selectProject);
  const projectStatus = useSelector(selectProjectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectStatus === "idle") dispatch(fetchProject());
  }, [projectStatus, dispatch]);

  const filteredProject = useMemo(() => {
    const q = search.trim().toLowerCase();

    let lists = Array.isArray(projects) ? projects : [];

    if (q) {
      lists = lists.filter((list) => {
        const t = (list.title || "").toLowerCase();
        return t.includes(q);
      })
    }

    lists = lists.filter((list) => {
      return selectType === "All" ? list : list.category === selectType;
    })

    return lists;
  }, [search, selectType, projects]);

  return (
    <div className="w-full space-y-6">
      <div className="w-full mt-4">
        <div className="p-2 space-y-4">
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl">
            Projects
          </h2>
          <p className="md:text-base text-sm text-gray-500 flex items-center">
            <HiOutlineSparkles className="text-gray-500" />
            There are all the projects data for display on page.
          </p>
        </div>
        <div className="w-full md:p-2">
          <div className="flex flex-col justify-between items-center sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full lg:max-w-md">
              <FiSearch className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-100 shadow w-full py-1.5 px-6 outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Search Certificate..."
              />
            </div>
            <div className="flex md:flex-row flex-col justify-center items-center gap-3">
              <div className="flex gap-2">
                {projectsType.map((type, index) => (
                  <span
                    onClick={() => setSelectType(type)}
                    className={`px-4 py-1.5 rounded-md transition-colors ease-linear duration-200 cursor-pointer text-white ${selectType === type ? "bg-blue-800" : "bg-slate-800/80 hover:bg-slate-900"}`}
                    key={`${type}-${index}`}
                  >
                    {type}
                  </span>
                ))}
              </div>

              <Link
                to={"/projects/create"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition cursor-pointer"
              >
                <IoMdAdd size={24} />
                Create Project
              </Link>
            </div>
          </div>
          <div className="mt-10">
            {projectStatus === "loading" && (
              <p className="text-gray-500 text-center">Loading experience...</p>
            )}

            {/* Not found */}
            {projectStatus !== "loading" &&
              filteredProject.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900">
                    No project found 😕
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Try another keyword or change the filter.
                  </p>

                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="mt-4 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
          </div>
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4 mt-14">
            {
              projects.length > 0 && (
                filteredProject.map((project) => (
                  <ProjectCard project={project} key={project.id}/>
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
