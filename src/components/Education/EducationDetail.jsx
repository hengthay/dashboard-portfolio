import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchEducationDetail, selectEducationDetail } from "../../feature/education/educationSlice";
import { formatDate } from "../Helper/formatDate";

const EducationDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const educationDetail = useSelector(selectEducationDetail);

  useEffect(() => {
      if (id) dispatch(fetchEducationDetail(id));
  }, [id, dispatch]);

  console.log(educationDetail);
  return (
    <div className="w-full space-y-6 md:p-4">
      <div className="w-full flex justify-between items-center p-2">
        <div className="w-full mt-4">
          <div className="p-2 space-y-4">
            <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl">
              Educations
            </h2>
            <p className="md:text-base text-sm text-gray-500 flex items-center gap-x-1">
              <HiOutlineSparkles className="text-gray-500" />
              View education information and manage this record.
            </p>
          </div>
          {/* status pill */}
          <div className="pt-1">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold border border-gray-300 ${educationDetail?.status === "Graduated" ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}
            >
              <span className={`w-2 h-2 rounded-full ${educationDetail?.status === "Graduated" ? "bg-indigo-500" : "bg-emerald-500"}`} />
              {educationDetail?.status || "Unknow"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/educations"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
          >
            <FiArrowLeft />
            Back
          </Link>

          <Link
            to={`/educations/1/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            <CiEdit size={18} />
            Edit
          </Link>
        </div>
      </div>
      <div className="w-full my-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 col-span-12 space-y-4">
            <div className="bg-white border border-gray-300 shadow-sm rounded-2xl transition ease-in duration-300 md:p-4 p-2">
              <h4 className="text-xl font-semibold text-gray-900">Overview</h4>
              <p className="text-sm text-gray-500 mt-1">Main information about this education record</p>
              <div className="mt-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500">Institution</p>
                  <p className="text-lg font-bold text-gray-900">
                    {educationDetail?.institution || "—"}
                  </p>
                </div>

                
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500">Degree</p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {educationDetail?.degree || "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500">Field of Study</p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {educationDetail?.field || "—"}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-semibold text-emerald-700">Start</p>
                    <p className="mt-1 text-sm font-bold text-emerald-900">{educationDetail?.start_date ? formatDate(educationDetail?.start_date) : "--"}</p>
                  </div>

                  <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                    <p className="text-xs font-semibold text-indigo-700">End</p>
                    <p className="mt-1 text-sm font-bold text-indigo-900">{educationDetail?.end_date ? formatDate(educationDetail?.end_date) : "Present"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 col-span-12 space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm md:p-4 p-2">
              <h3 className="text-lg font-semibold text-gray-900">Record Info</h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">ID</span>
                  <span className="font-semibold text-gray-900">{educationDetail?.id ?? "—"}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Created</span>
                  <span className="font-semibold text-gray-900">
                    {formatDate(educationDetail?.created_at) || "--"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Updated</span>
                  <span className="font-semibold text-gray-900">
                    {formatDate(educationDetail?.updated_at) || "--"}
                  </span>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-500">Note</p>
                <p className="text-sm text-gray-700 mt-1">
                  Some of data can be null or not contain value
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationDetail;
