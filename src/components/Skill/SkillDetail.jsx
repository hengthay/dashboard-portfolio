import { useDispatch, useSelector } from "react-redux";
import {
  fetchSkillDetail,
  selectSkillDetail,
} from "../../feature/skill/skillSlice";
import { Link, useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import { useEffect } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import { FiArrowLeft } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { formatDate } from "../Helper/formatDate";

const SkillDetail = () => {
  const skillDetail = useSelector(selectSkillDetail);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(fetchSkillDetail(id));
  }, [id]);

  return (
    <div className="w-full space-y-6 md:p-4">
      <div className="w-full flex justify-between items-center p-2">
        <div className="w-full mt-4">
          <div className="p-2 space-y-4">
            <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl">
              Skill
            </h2>
            <p className="md:text-base text-sm text-gray-500 flex items-center gap-x-1">
              <HiOutlineSparkles className="text-gray-500" />
              View skill information and manage this record.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
          >
            <FiArrowLeft />
            Back
          </Link>

          <Link
            to={`/skills/${skillDetail?.id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            <CiEdit size={18} />
            Edit
          </Link>
        </div>
      </div>
      <div className="w-full my-8">
        <div className="grid grid-cols-12 gap-4 items-start">
          {/* Skill Card */}
          <div className="md:col-span-8 col-span-12 bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-gray-900">{skillDetail?.name ?? "--"}</h1>

                <span className="inline-block mt-2 px-4 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                  {skillDetail?.category ?? "--"}
                </span>
              </div>

              {/* Level Circle */}
              <div className="sm:w-24 sm:h-24 h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center md:text-2xl sm:text-xl text-base font-bold shadow">
                {skillDetail?.level ?? "--"}%
              </div>
            </div>

            {/* Progress */}
            <div className="mt-8">
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Skill Mastery</span>
                <span>Advanced</span>
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${skillDetail?.level}%` }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800">
                About this Skill
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Experienced in building modern, responsive web applications using
                React JS. Strong understanding of component-based architecture,
                state management, hooks, and API integration.
              </p>
            </div>
          </div>
          {/* Metadata */}
          <div className="md:col-span-4 col-span-12 bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900">Record Info</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">ID</span>
                <span className="font-semibold text-gray-900">{skillDetail?.id ?? "--"}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Created</span>
                <span className="font-semibold text-gray-900">
                  {skillDetail?.created_at ? formatDate(skillDetail?.created_at) : "--"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Updated</span>
                <span className="font-semibold text-gray-900">
                  {skillDetail?.updated_at ? formatDate(skillDetail?.updated_at) : "--"}
                </span>
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-500">Note</p>
              <p className="text-sm text-gray-700 mt-1">
                Some field can be null or not contain value
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
