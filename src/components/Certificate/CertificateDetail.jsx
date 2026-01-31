import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchCertificateDetail,
  selectCertificateDetail,
} from "../../feature/certificate/certificateSlice";
import { FiArrowLeft } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { formatDate } from "../Helper/formatDate";

const CertificateDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const certificateDetail = useSelector(selectCertificateDetail);

  useEffect(() => {
    if (id) dispatch(fetchCertificateDetail(id));
  }, [id, dispatch]);

  return (
    <div className="w-full flex justify-center px-4 py-6 md:py-10">
      <div className="w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Certificate Details 🏆
              </h3>
              <p className="text-sm text-gray-500">
                Detailed information about this certificate.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/certificates"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
              >
                <FiArrowLeft />
                Back
              </Link>

              <Link
                to={`/certificates/${certificateDetail?.id}/edit`}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
              >
                <CiEdit size={18} />
                Edit
              </Link>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12">
            {/* Image */}
            <div className="col-span-12 lg:col-span-7 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="p-5 sm:p-6 md:p-8">
                <div className="w-full h-80 sm:h-95 md:h-105 rounded-2xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center">
                  {
                    certificateDetail?.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/storage/${certificateDetail?.image}`}
                        alt={certificateDetail?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 rounded-2xl">
                        <span className="text-sm font-medium">No image available</span>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="col-span-12 lg:col-span-5">
              <div className="p-5 sm:p-6 md:p-8 space-y-6">
                {/* Title + badge */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
                      {certificateDetail?.title || "No Title"}
                    </h2>

                    <span className="inline-flex items-center text-xs font-bold rounded-full px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200">
                      #{certificateDetail?.id ?? "--"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    Keep your achievements organized and accessible.
                  </p>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500">Issuer</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 truncate">
                      {certificateDetail?.issuer || "--"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-500">Issue Date</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {certificateDetail?.issue_date ? formatDate(certificateDetail?.issue_date) : "--"}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="rounded-2xl border border-gray-200 p-4 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-gray-500">Created Date</p>
                    <p className="text-xs text-gray-700">
                      {certificateDetail?.created_at ? formatDate(certificateDetail?.created_at) : "--"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-gray-500">Updated Date</p>
                    <p className="text-xs text-gray-700">
                      {certificateDetail?.updated_at ? formatDate(certificateDetail?.updated_at) : "--"}
                    </p>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/certificates"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Back to list
                  </Link>

                  <Link
                    to={`/certificates/${certificateDetail?.id}/edit`}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                  >
                    Edit Certificate
                  </Link>
                </div>

                {/* Small note */}
                <p className="text-xs text-gray-400">
                  Tip: Use a high-resolution image for best display quality.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: empty state while loading */}
        {!certificateDetail && (
          <div className="text-center text-sm text-gray-500">
            Loading certificate...
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateDetail;
