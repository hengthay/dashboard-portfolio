import React, { useEffect } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FiArrowLeft } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchExperienceDetail, selectExperienceDetail } from '../../feature/experience/experienceSlice'
import { formatDate } from '../Helper/formatDate'

const ExperienceDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const experienceDetail = useSelector(selectExperienceDetail);

  useEffect(() => {
    if (id) dispatch(fetchExperienceDetail(id));
  }, [id, dispatch]);

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
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/experiences"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
          >
            <FiArrowLeft />
            Back
          </Link>

          <Link
            to={`/experiences/${experienceDetail?.id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            <CiEdit size={18} />
            Edit
          </Link>
        </div>
      </div>
      <div className="w-full my-8 ">
        <div className='grid grid-cols-12 gap-8'>
          <div className='md:col-span-8 col-span-12 space-y-4'>
            <div className='bg-white border border-gray-300 shadow-sm rounded-2xl transition ease-in duration-300 md:p-6 p-2'>
              <div className="space-y-4">
                <div className='space-y-1'>
                  <h2 className='md:text-xl text-lg font-semibold leading-relaxed tracking-wider'>{experienceDetail?.company}</h2>
                  <p className='md:text-lg text-base font-semibold text-cyan-500 leading-relaxed tracking-wider'>{experienceDetail?.position}</p>
                </div>
                <hr className='mt-4 text-gray-400'/>
                <div className='grid grid-cols-2 items-center gap-6'>
                  <div className='flex flex-col items-start'>
                    <p className='md:text-sm text-xs text-gray-500'>Start Date</p>
                    <span className='font-semibold text-base leading-relaxed'>
                      {experienceDetail?.start_date ? formatDate(experienceDetail?.start_date) : "--"}
                    </span>
                  </div>
                  <div className='flex flex-col items-start'>
                    <p className='md:text-sm text-xs text-gray-500'>End Date</p>
                    <span className='font-semibold text-base leading-relaxed'>
                      {experienceDetail?.end_date ? formatDate(experienceDetail?.end_date) : "Present"}
                    </span>
                  </div>
                </div>
                <hr className='mt-4 text-gray-400'/>
                <div className='mt-2 space-y-1'>
                  <p className='md:text-sm text-xs text-gray-500'>Description</p>
                  <span className='font-normal text-base leading-relaxed'>
                    {experienceDetail?.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='md:col-span-4 col-span-12 space-y-4'>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm md:p-4 p-2">
              <h3 className="text-lg font-semibold text-gray-900">Record Info</h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">ID</span>
                  <span className="font-semibold text-gray-900">{experienceDetail?.id}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Created</span>
                  <span className="font-semibold text-gray-900">
                    {experienceDetail?.created_at ? formatDate(experienceDetail?.created_at) : "--"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Updated</span>
                  <span className="font-semibold text-gray-900">
                    {experienceDetail?.updated_at ? formatDate(experienceDetail?.updated_at) : "--"}
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
  )
}

export default ExperienceDetail