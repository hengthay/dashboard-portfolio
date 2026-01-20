import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineSparkles } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAchievement,
  selectAchievement,
  selectAchievementStatus,
} from "../feature/achievement/achievementSlice";
import AchievementCard from "../components/Achievement/AchievementCard";

const Achievement = () => {
  const dispatch = useDispatch();
  const achievements = useSelector(selectAchievement);
  const achievementStatus = useSelector(selectAchievementStatus);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (achievementStatus === "idle") dispatch(fetchAchievement());
  }, [achievementStatus, dispatch]);

  // console.log(achievements);

  const filteredAchievements = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = Array.isArray(achievements) ? achievements : [];
    // Search
    if (q) {
      list = list.filter((a) => {
        const t = (a.title || "").toLowerCase();
        return t.includes(q);
      });
    }
    // Sort

    if (sort === "az") {
      list = [...list].sort((a, b) =>
        (a.title || "").localeCompare(b.title || ""),
      );
    } else if (sort === "za") {
      list = [...list].sort((a, b) =>
        (b.title || "").localeCompare(a.title || ""),
      );
    }

    return list;
  }, [achievements, search, sort]);

  return (
    <div className="w-full space-y-6">
      <div className="mt-4">
        {/* Header */}
        <div className="p-2 space-y-4">
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl">
            Achievements
          </h2>
          <p className="md:text-base text-sm text-gray-500 flex items-center">
            <HiOutlineSparkles className="text-gray-500" />
            There are all the achivement data for display on page.
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
                placeholder="Search Achievement..."
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
                to={"/achievements/create"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition cursor-pointer"
              >
                <IoMdAdd size={24} />
                Create Achievement
              </Link>
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="w-full md:pt-4 pt-6 mt-10">
          {/* Loading */}
          {achievementStatus === "loading" && (
            <p className="text-gray-500 text-center">Loading achievements...</p>
          )}

          {/* Not found */}
          {achievementStatus !== "loading" &&
            filteredAchievements.length === 0 && (
              <div className="w-full flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900">
                  No achievements found 😕
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

          <div className="w-full flex flex-col gap-4">
            {/* {achievements.length > 0 &&
              filteredAchievements.map((achievement) => (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.id}
                />
              ))} */}

            {achievements.length > 0 &&
              filteredAchievements.map((achievement) => (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;
