import React, { useEffect, useMemo, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link, useOutletContext } from "react-router-dom";
import { selectProject } from "../feature/project/projectSlice";
import { fetchProfile, selectProfile, selectProfileStatus } from "../feature/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/Profile/ProfileCard";

const Profile = () => {
  const [search, setSearch] = useState("");
  const { isOpen } = useOutletContext();
  const profiles = useSelector(selectProfile);
  const profileStatus = useSelector(selectProfileStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileStatus === "idle") dispatch(fetchProfile());
  }, [profileStatus, dispatch]);

  const filteredProfile = useMemo(() => {
    const q = search.trim().toLowerCase();
    
    let lists = Array.isArray(profiles) ? profiles : [];

    lists = lists.filter((list) => {
      const t = (list.name || "");

      return t.includes(q);
    })

    return lists;
  })
  return (
    <div className="w-full space-y-6">
      <div className="w-full mt-4">
        <div className="p-2 space-y-4">
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl">
            My Profile
          </h2>
          <p className="md:text-base text-sm text-gray-500 flex items-center">
            <HiOutlineSparkles className="text-gray-500" />
            View all your profile details here.
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
                placeholder="Search Profile..."
              />
            </div>
            <div className="flex md:flex-row flex-col justify-center items-center gap-3">
              <Link
                to={"/profiles/create"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition cursor-pointer"
              >
                <IoMdAdd size={24} />
                Create Profile
              </Link>
            </div>
          </div>
          <div className="mt-10">
            {profileStatus === "loading" && (
              <p className="text-gray-500 text-center">Loading profiles...</p>
            )}

            {/* Not found */}
            {profileStatus !== "loading" &&
              filteredProfile.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900">
                    No profile found 😕
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
              profiles.length > 0 && (
                filteredProfile.map((profile) => (
                  <ProfileCard profile={profile} key={profile.id}/>
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
