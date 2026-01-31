import { useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSkill, selectSkills, selectSkillStatus } from '../feature/skill/skillSlice'
import SkillCard from '../components/Skill/SkillCard'

const Skill = () => {

  const skills = useSelector(selectSkills);
  const skillStatus = useSelector(selectSkillStatus);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (skillStatus === "idle") dispatch(fetchSkill())
  }, [skillStatus, dispatch]);

  const categories = ["all", ...new Set(skills.map(s => s.category))];

  const filteredSkill = useMemo(() => {
    const q = search.trim().toLowerCase();

    let lists = Array.isArray(skills) ? skills : [];

    if (q) {
      lists = lists.filter((list) => {
        const t = (list.name || "").toLowerCase();

        return t.includes(q);
      })
    };

    // Filtered sort by name of category
    if (sort && sort !== "all") {
      lists = lists.filter((item) => item.category === sort);
    }

    return lists;
  }, [search, skills, sort])


  return (
    <div className="w-full space-y-6">
      <div className="w-full mt-4">
        <div className="p-2 space-y-4">
          <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl">
            Skills
          </h2>
          <p className="md:text-base text-sm text-gray-500 flex items-center">
            <HiOutlineSparkles className="text-gray-500" />
            There are all the skills data for display on page.
          </p>
        </div>
        <div className="w-full md:p-2">
          <div className="flex flex-col justify-between items-center sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full lg:max-w-md">
              <FiSearch
               className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-100 shadow w-full py-1.5 px-6 outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Search Project..."
              />
            </div>
            <div className="flex md:flex-row flex-col justify-center items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full sm:w-60 py-2 px-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-gray-200"
              >
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate === "all" ? "All categories" : cate}
                  </option>
                ))}
              </select>

              <Link
                to={"/skills/create"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition cursor-pointer"
              >
                <IoMdAdd size={24} />
                Create Skill
              </Link>
            </div>
          </div>
          <div className="mt-10">
            {skillStatus === "loading" && (
              <p className="text-gray-500 text-center">Loading skill...</p>
            )}

            {/* Not found */}
            {skillStatus !== "loading" &&
              filteredSkill.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900">
                    No skill found 😕
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
          <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 mt-14'>
            {
              skills.length > 0 && (
                filteredSkill.map((skill) => (
                  <SkillCard skill={skill} key={skill.id}/>
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skill