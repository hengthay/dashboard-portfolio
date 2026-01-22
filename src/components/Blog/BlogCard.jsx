import React from "react";
import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Link, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import { removeBlogById } from "../../feature/blog/blogSlice";
import { useDispatch } from "react-redux";

const BlogCard = ({ blog }) => {
  const { isOpen } = useOutletContext();
  const dispatch = useDispatch();
  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // ❌ user canceled
    try {
      await dispatch(removeBlogById(id)).unwrap();

      Swal.fire({
        title: "Deleted",
        text: "Blog has been deleted successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed",
        text: "Your bog could not be deleted.",
        icon: "error",
        timer: 1500,
      });
    }
  };

  return (
    <div className="w-full flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-gray-300 transition">
      <div className="w-full flex items-center gap-4">
        <div className="w-40 h-40">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/storage/${blog?.cover_image}`}
            alt={blog?.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300 bg-gray-300 rounded-xl shadow"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          <div className="flex justify-between items-center gap-x-10">
            <h3 className="md:text-xl sm:text-lg text-base font-semibold text-gray-900 line-clamp-1">
              {blog?.title}
            </h3>
            <span className="text-xs text-nowrap max-w-10 font-semibold bg-gray-300 text-gray-700 px-2 py-0.5 rounded-2xl">
              ID: {blog?.id}
            </span>
          </div>
          <div className="flex flex-col item-start gap-4">
            <p className="font-normal text-sm text-gray-500 line-clamp-3 text-wrap">
              {blog?.content}
            </p>

            <p
              className={`font-normal w-20 text-sm line-clamp-3 text-wrap bg-green-200 py-1 px-2 rounded-xl ${blog?.published ? "text-green-800 bg-green-200" : "text-gray-800 bg-gray-200"}`}
            >
              {blog?.published ? "Published" : "None"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {blog?.tags?.length > 0 &&
              blog?.tags?.map((b, index) => (
                <span
                  key={`${b}-${index}`}
                  className="text-xs font-semibold tracking-wide bg-cyan-500/10 text-cyan-600 px-3 py-1 rounded-full border border-cyan-500/20 hover:ring-2 hover:ring-cyan-400/20 transition-all ease-out duration-200"
                >
                  {b}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {/* View */}
        <Link
          to={`/blogs/${blog?.id}`}
          className={`p-2 rounded-lg bg-amber-100 text-amber-600 
            hover:bg-amber-200 hover:scale-105 shadow-sm
            transition-all duration-200 flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
          title="View"
        >
          <GrView size={20} />
          <span
            className={`
              whitespace-nowrap
              overflow-hidden
              transition-all duration-300
              ${isOpen ? "w-0 opacity-0" : "w-12 opacity-100"}
            `}
          >
            View
          </span>
        </Link>

        {/* Edit */}
        <Link
          to={`/blogs/${blog?.id}/edit`}
          className={`p-2 rounded-lg bg-blue-100 text-blue-600 
          hover:bg-blue-200 hover:scale-105 shadow-sm
          transition-all duration-200 flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
          title="Edit"
        >
          <CiEdit size={20} />
          <span
            className={`
              whitespace-nowrap
              overflow-hidden
              transition-all duration-300
              ${isOpen ? "w-0 opacity-0" : "w-12 opacity-100"}
            `}
          >
            Edit
          </span>
        </Link>

        {/* Delete */}
        <button
          type="button"
          onClick={() => handleDelete(blog.id)}
          className={`p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 shadow-sm transition-all duration-200 cursor-pointer flex justify-center items-center ${isOpen ? "gap-0" : "gap-2"}`}
          title="Delete"
        >
          <MdDelete size={20} />
          <span
            className={`
              whitespace-nowrap
              overflow-hidden
              transition-all duration-300
              ${isOpen ? "w-0 opacity-0" : "w-14 opacity-100"}
            `}
          >
            Remove
          </span>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
