import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchAchievementDetail,
  selectAchievementDetail,
} from "../../feature/achievement/achievementSlice";
import { FiArrowLeft } from "react-icons/fi";

const AchievementDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const achievementDetail = useSelector(selectAchievementDetail);
  console.log(id);
  useEffect(() => {
    if (id) dispatch(fetchAchievementDetail(id));
  }, [id, dispatch]);

  console.log(achievementDetail);

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl border border-gray-200 rounded-2xl bg-white shadow-sm p-6 md:p-10 space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h3 className="md:text-4xl font-bold sm:text-3xl text-2xl text-gray-900">
              Achievement Details 🏆
            </h3>
            <p className="text-sm text-gray-500">
              Detailed information about this achievement.
            </p>
          </div>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft />
            Back
          </Link>
        </div>
        {/* Card */}
        <div className="w-full flex justify-center">
          <div
            className="w-full max-w-4xl bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition"
            key={achievementDetail?.id}
          >
            {/* Image */}
            <div className="w-full h-90 bg-white flex items-center justify-center p-6">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/storage/${achievementDetail?.icon_url}`}
                alt={achievementDetail?.title}
                className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-4">
              <h3 className="md:text-2xl text-xl font-semibold text-gray-900">
                {achievementDetail?.title}
              </h3>

              <p className="font-normal text-sm text-gray-600 leading-relaxed">
                {achievementDetail?.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-xs text-gray-400">🏅 2026 • Award</span>

                <Link
                  to={`/achievements/${achievementDetail?.id}/edit`}
                  className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Edit Achievement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementDetails;
