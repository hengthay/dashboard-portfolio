import { CiEdit } from 'react-icons/ci';
import { GrView } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useOutletContext } from 'react-router-dom'
import Swal from 'sweetalert2';
import { removeProjectById } from '../../feature/project/projectSlice';

const ProjectCard = ({ project }) => {

  const { isOpen } = useOutletContext();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This project will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // ❌ user canceled
    try {
      await dispatch(removeProjectById(id)).unwrap();

      Swal.fire({
        title: "Deleted",
        text: "Project has been deleted successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Your project could not be deleted.",
        icon: "error",
        timer: 1500,
      });
    }
  };
  return (
    <div className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition" key={project.id}>
      <div className="flex flex-col items-start space-y-2.5 group">
        <div className="w-full md:h-60 h-40 overflow-hidden relative group">
          {
            project.image_url ? (
              <img src={`${import.meta.env.VITE_BASE_URL}/storage/${project.image_url}`} alt={project.title} className="w-full h-full object-cover transform transition-all ease-in-out duration-500 rounded-2xl group-hover:scale-105 shadow-sm"/>
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
              href={`${project.demo_url}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-white/90 text-black backdrop-blur-md hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg"
            >
              View Demo
            </a>
            <a
              href={`${project.github_url}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/70 text-white backdrop-blur-md hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 shadow-lg"
            >
              GitHub Repo
            </a>
          </div>
        </div>
        <div className="my-2">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate leading-relaxed tracking-wider">{project.title ?? "--"}</h2>
          <p className="font-normal sm:text-base text-sm leading-relaxed tracking-wide text-gray-500">{project.description ?? "--"}</p>
        </div>
        <div className="my-2 flex flex-wrap items-center gap-x-2">
          <p className="text-sm font-medium text-gray-400 leading-relaxed tracking-wider">
            Technology :
          </p>
          {
            project.technologies.length > 0 && (
              project.technologies.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {tech}
                </span>
              ))
            )
          }
        </div>
        <div className="w-full flex md:flex-row flex-col gap-2 my-2">
          {/* View */}
          <Link
            to={`/projects/${project.id}`}
            className={`p-2 rounded-xl bg-amber-100 text-amber-600 
              hover:bg-amber-200 hover:scale-105 shadow-sm
              transition-all duration-200 flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
            title="View"
          >
            <GrView size={20} />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all max-sm:text-sm duration-300 ${isOpen ? "w-0 opacity-0" : "w-12 opacity-100"}
              `}
            >
              View
            </span>
          </Link>

          {/* Edit */}
          <Link
            to={`/projects/${project.id}/edit`}
            className={`p-2 rounded-xl bg-blue-100 text-blue-600 
              hover:bg-blue-200 hover:scale-105 shadow-sm
              transition-all duration-200 flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
            title="Edit"
          >
            <CiEdit size={20} />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-12 opacity-100"}
              `}
            >
              Edit
            </span>
          </Link>

          {/* Delete */}
          <button
            type="button"
            onClick={() => handleDelete(project.id)}
            className={`p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 shadow-sm transition-all duration-200 cursor-pointer flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
            title="Delete"
          >
            <MdDelete size={20} />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-14 opacity-100"}
              `}
            >
              Remove
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard