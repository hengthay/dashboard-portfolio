import { CiEdit } from 'react-icons/ci'
import { GrView } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import { Link, useOutletContext } from 'react-router-dom'
import { formatDate } from '../Helper/formatDate'

const ExperienceCard = ({ experience }) => {

  const { isOpen } = useOutletContext();

  return (
    <div key={experience.id} className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition">
      <div className="flex flex-col items-start space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate leading-relaxed tracking-wider">
            {experience.company}
          </h3>
          <span className="inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200">
            #{experience.id}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium sm:text-base text-sm leading-relaxed tracking-wider">
            {experience.position}
          </p>

          <p className="text-gray-600 text-sm leading-relaxed tracking-wider">
            {experience.description}
          </p>
        </div>
        <p className="text-sm text-gray-400">
          Created at • {formatDate(experience?.created_at)}
        </p>

        {/* Actions */}
        <div className="w-full flex md:flex-row flex-col gap-2 my-2">
          {/* View */}
          <Link
            to={`/experiences/${experience.id}`}
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
            to={`/experiences/${experience.id}/edit`}
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
            onClick={() => handleDelete(experience.id)}
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

export default ExperienceCard