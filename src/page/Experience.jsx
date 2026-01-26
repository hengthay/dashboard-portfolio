import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchExperience, selectExperience, selectExperienceStatus } from "../feature/experience/experienceSlice";
import ExperienceCard from "../components/Experience/ExperienceCard";

const Experience = () => {

  const dispatch = useDispatch();
  const experiences = useSelector(selectExperience);
  const experienceStatus = useSelector(selectExperienceStatus);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (experienceStatus === "idle") dispatch(fetchExperience());
  }, [experienceStatus, dispatch]);

  const filteredExperience = useMemo(() => {
    const q = search.trim().toLowerCase();

    let lists = Array.isArray(experiences) ? experiences : [];

    if(q) {
      lists = lists.filter((list) => {
        const t = (list.company || "").toLowerCase();
        return t.includes(q);
      })
    };

    if(sort === "az") {
      lists = [...lists].sort((a, b) => (a.company || "").localeCompare(b.company || ""));
    } else if (sort === "za") {
      lists = [...lists].sort((a, b) => (b.company || "").localeCompare(a.company || ""));
    }

    return lists;
  }, [search, sort, experiences]);

  return (
    <div className="w-full space-y-6">
      <div className="w-full mt-4">
        <div className="p-2 space-y-4">
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl">
            Experiences
          </h2>
          <p className="md:text-base text-sm text-gray-500 flex items-center">
            <HiOutlineSparkles className="text-gray-500" />
            There are all the experiences data for display on page.
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
            <div className="flex md:flex-row flex-col justify-center items-center gap-x-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full sm:w-44 py-2 px-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="all">All</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>

              <Link
                to={"/experiences/create"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition cursor-pointer"
              >
                <IoMdAdd size={24} />
                Create Experience
              </Link>
            </div>
          </div>
          <div className="mt-10">
            {experienceStatus === "loading" && (
              <p className="text-gray-500 text-center">Loading experience...</p>
            )}

            {/* Not found */}
            {experienceStatus !== "loading" &&
              filteredExperience.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900">
                    No experience found 😕
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
          
          {/* Content */}
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4 mt-14">
            {
              experiences.length > 0 && (
                filteredExperience.map((experience) => (
                  <ExperienceCard experience={experience} key={experience.id} />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
