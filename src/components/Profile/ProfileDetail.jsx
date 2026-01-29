import React, { useEffect } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FiArrowLeft } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchProfileDetail, selectProfileDetail } from '../../feature/profile/profileSlice';

const ProfileDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const profileDetail = useSelector(selectProfileDetail);

  useEffect(() => {
    if (id) dispatch(fetchProfileDetail(id));
  }, [id, dispatch]);

  return (
    <div className='w-full mt-6'>
       <div className="w-full flex justify-between items-center p-2">
        <div className="w-full mt-4">
          <div className="p-2 space-y-4">
            <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl leading-relaxed tracking-wider">
              My Profile
            </h2>
            <p className="md:text-base text-sm text-gray-500 flex items-center gap-x-1">
              <HiOutlineSparkles className="text-gray-500" />
              View profile information and manage this record.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/profiles"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
          >
            <FiArrowLeft />
            Back
          </Link>

          <Link
            to={`/profiles/${profileDetail?.id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            <CiEdit size={18} />
            Edit
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 md:p-6 p-1">
        <div className="md:col-span-4 col-span-12 w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition">
          <div className="w-full md:h-full h-60">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/storage/${profileDetail?.avatar_url}`}
              alt={profileDetail?.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="md:col-span-8 col-span-12 w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition">
          <h4 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-900 truncate leading-relaxed tracking-wider">
            Bio & other details
          </h4>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-start md:p-4 p-2">
            <div className="mt-2 space-y-3">
              <div className="flex flex-col space-y-1">
                <p className="text-gray-500 font-normal tracking-wide">
                  Name
                </p>
                <span className="font-semibold tracking-wider text-base leading-relaxed">
                  {profileDetail?.name}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-gray-500 font-normal tracking-wide">
                  Email
                </p>
                <span className="font-semibold tracking-wider text-base leading-relaxed">
                  {profileDetail?.email}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-gray-500 font-normal tracking-wide">
                  Introduce
                </p>
                <span className="font-semibold tracking-wider text-base leading-relaxed">
                  {profileDetail?.introduce}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-gray-500 font-normal tracking-wide">
                  Bio
                </p>
                <span className="font-semibold tracking-wider text-base leading-relaxed">
                  {profileDetail?.bio}
                </span>
              </div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="flex flex-col space-y-1">
                <p className="text-gray-500 font-normal tracking-wide">
                  My Hobbie
                </p>
                <ul className="space-y-3">
                  {
                    profileDetail?.hobbies?.length > 0 && (
                      profileDetail?.hobbies.map((hobbie, index) => (
                        <li className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3" key={`${hobbie}-${index}`}>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-bold">
                            {index + 1}
                          </span>
                          <p className="text-gray-700 text-sm leading-relaxed font-medium">
                            {hobbie}
                          </p>
                        </li>
                      ))
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className='flex justify-end p-4'>
            <a 
              href={`${import.meta.env.VITE_BASE_URL}/storage/${profileDetail?. resume_url}`}
              className="bg-black py-1.5 px-3 text-white border hover:bg-transparent hover:text-black hover:border-black hover:shadow-sm transition-all ease-in-out duration-300 hover:scale-105"
              download="HengThay.pdf"
              target="_blank"
              rel="noopener noreferrer">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail