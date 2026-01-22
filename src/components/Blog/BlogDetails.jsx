import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchDetailBlog,
  selectBlogDetail,
} from "../../feature/blog/blogSlice";
import { FiArrowLeft } from "react-icons/fi";
import { formatDate } from "../Helper/formatDate";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RiExchange2Line } from "react-icons/ri";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogDetail = useSelector(selectBlogDetail);
  console.log(id);
  useEffect(() => {
    if (id) dispatch(fetchDetailBlog(id));
  }, [id, dispatch]);

  console.log(blogDetail);

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="w-full max-w-7xl border border-gray-200 rounded-2xl bg-white shadow-sm p-6 md:p-10 space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <h3 className="md:text-4xl font-bold sm:text-3xl text-2xl text-gray-900">
              Blog Details 🏆
            </h3>
            <p className="text-sm text-gray-500">
              Detailed information about this blog.
            </p>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft />
            Back
          </Link>
        </div>

        <div className="w-full flex flex-col justify-center">
          <div
            className="max-w-6xl w-full bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition"
            key={blogDetail?.id}
          >
            <div className="w-full h-90 bg-white flex items-center justify-center p-6">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/storage/${blogDetail?.cover_image}`}
                alt={blogDetail?.title}
                className="h-full w-full object-contain hover:scale-105 transition duration-300"
              />
            </div>
          </div>
          <div className="w-full max-w-6xl mt-6 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="md:text-3xl text-2xl font-bold text-gray-900 tracking-tight">
                    {blogDetail?.title || "—"}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* slug */}
                    <span className="text-xs font-semibold px-3 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700">
                      /{blogDetail?.slug || "—"}
                    </span>

                    {/* published */}
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        blogDetail?.published
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-gray-200 bg-gray-50 text-gray-700"
                      }`}
                    >
                      {blogDetail?.published ? "Published" : "Draft"}
                    </span>

                    {/* id */}
                    <span className="text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700">
                      ID: {blogDetail?.id ?? "--"}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="md:max-w-sm w-full">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Tags
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {blogDetail?.tags?.length > 0 ? (
                      blogDetail.tags.map((t, index) => (
                        <span
                          key={`${t}-${index}`}
                          className="text-xs font-semibold tracking-wide bg-cyan-500/10 text-cyan-700 px-3 py-1 rounded-full border border-cyan-500/20 hover:ring-2 hover:ring-cyan-400/20 transition"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">No tags</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-900">Content</p>
              <div className="border border-gray-200 rounded-2xl p-5 md:p-6 bg-white">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {blogDetail?.content || "No content."}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
              <div className="rounded-2xl border border-gray-300/40 bg-white backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm hover:shadow-md transition">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-medium">
                    Join Date
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {blogDetail?.join_date
                      ? formatDate(blogDetail?.join_date)
                      : "--"}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-gray-300/60 flex items-center justify-center">
                  <CiCalendarDate size={24} className="text-cyan-600" />
                </div>
              </div>
              <div className="rounded-2xl border border-gray-300/40 bg-white backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm hover:shadow-md transition">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-medium">
                    Created at
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {blogDetail?.created_at
                      ? formatDate(blogDetail?.created_at)
                      : "--"}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-gray-300/60 flex items-center justify-center">
                  <MdOutlineCreateNewFolder
                    size={24}
                    className="text-red-600"
                  />
                </div>
              </div>
              <div className="rounded-2xl border border-gray-300/40 bg-white backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm hover:shadow-md transition">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-medium">
                    Updated at
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {blogDetail?.updated_at
                      ? formatDate(blogDetail?.updated_at)
                      : "--"}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-gray-300/60 flex items-center justify-center">
                  <RiExchange2Line size={24} className="text-stone-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            to="/blogs"
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition text-center"
          >
            Back to list
          </Link>

          <Link
            to={`/blogs/${blogDetail?.id}/edit`}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition text-center"
          >
            Edit Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
