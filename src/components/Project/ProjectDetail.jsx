import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchProjectDetail, selectProjectDetail } from '../../feature/project/projectSlice';
import { CiEdit } from 'react-icons/ci';
import { FiArrowLeft } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { formatDate } from '../Helper/formatDate';

const ProjectDetail = () => {

  const { id } = useParams();
  const projectDetail = useSelector(selectProjectDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(fetchProjectDetail(id));
  }, [id, dispatch])


  return (
    <div className="w-full space-y-6 md:p-4">
      <div className="w-full flex justify-between items-center p-2">
        <div className="w-full mt-4">
          <div className="p-2 space-y-4">
            <h2 className="md:text-4xl font-semibold sm:text-3xl text-2xl">
              Projects
            </h2>
            <p className="md:text-base text-sm text-gray-500 flex items-center gap-x-1">
              <HiOutlineSparkles className="text-gray-500" />
              View project information and manage this record.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
          >
            <FiArrowLeft />
            Back
          </Link>

          <Link
            to={`/projects/${projectDetail?.id}/edit`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            <CiEdit size={18} />
            Edit
          </Link>
        </div>
      </div>
      <div className="w-full my-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className='md:col-span-8 col-span-12 space-y-4'>
            <div className='bg-white border border-gray-300 shadow-sm rounded-2xl transition ease-in duration-300 md:p-4 p-2'>
              <div className='flex justify-between items-center'>
                <h4 className="text-xl font-semibold text-gray-900">Overview</h4>
                <p className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-500 border border-cyan-500/50 transition-all ease-in-out duration-300 hover:shadow-sm">{projectDetail?.category}</p>
              </div>
              <hr className='text-gray-400 my-4'/>
              <div className="mt-6 space-y-4 grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className="w-full md:h-60 h-40 overflow-hidden relative group">
                  {
                    projectDetail?.image_url ? (
                      <img src={`${import.meta.env.VITE_BASE_URL}/storage/${projectDetail?.image_url}`} alt={projectDetail?.title} className="w-full h-full object-cover transform transition-all ease-in-out duration-500 rounded-2xl group-hover:scale-105 shadow-sm"/>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 rounded-2xl">
                        <span className="text-sm font-medium">No image available</span>
                      </div>
                    )
                  }
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Link Demo Projet */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <a
                      href={`${projectDetail?.demo_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/90 text-black backdrop-blur-md hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      View Demo
                    </a>
        
                    <a
                      href={`${projectDetail?.github_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/70 text-white backdrop-blur-md hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
                <div className='p-2 space-y-3'>
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate leading-relaxed tracking-wider">{projectDetail?.title}</h2>
                  <p className="font-normal sm:text-base text-sm leading-relaxed tracking-wide text-gray-500">{projectDetail?.description}</p>
                  <div className='flex flex-col space-y-2'>
                    <div className='flex flex-wrap items-center gap-1.5'>
                      <p className="text-sm font-medium text-gray-500 leading-relaxed tracking-wider">Built With :</p>
                      {
                        projectDetail?.technologies?.length > 0 && (
                          projectDetail.technologies.map((tech, index) => (
                            <span
                              key={`${tech}-${index}`}
                              className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-500 border border-cyan-500/50 transition-all ease-in-out duration-300 hover:shadow-sm">
                              {tech}
                            </span>
                          ))
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='md:col-span-4 col-span-12 space-y-4'>
            <div className='bg-white border border-gray-200 rounded-2xl shadow-sm md:p-4 p-2'>
                <h3 className="text-lg font-semibold text-gray-900">Record Info</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">ID</span>
                    <span className="font-semibold text-gray-900">{projectDetail?.id ?? "—"}</span>
                  </div>
  
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">Created</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(projectDetail?.created_at) || "--"}
                    </span>
                  </div>
  
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-500">Updated</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(projectDetail?.updated_at) || "--"}
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
    </div>
  )
}

export default ProjectDetail