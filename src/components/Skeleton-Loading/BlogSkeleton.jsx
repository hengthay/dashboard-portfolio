import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="w-full group flex flex-col sm:flex-row justify-between items-center bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-gray-300 transition gap-4"
          >
            <div className="w-full sm:flex-1 flex flex-col sm:flex-row gap-5">
              <div className="w-full lg:w-46 md:w-38 shrink-0">
                <Skeleton
                  className="w-full"
                  height={200}
                  borderRadius={20}
                  baseColor="#d1d5db"
                  highlightColor="#e5e7eb"
                />
              </div>

              <div className="flex-1 flex flex-col md:gap-1.5 gap-1">
                <div className="flex items-center gap-2">
                  <div className="md:w-40 lg:w-50 w-35">
                    <Skeleton className="w-full" height={30} borderRadius={8} />
                  </div>
                  <div className="md:w-15 w-15">
                    <Skeleton className="w-full" height={25} borderRadius={9999} />
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-140 md:w-50 w-full">
                  <Skeleton height={18} className="w-full" />
                  <Skeleton height={18} className="w-full" />
                  <Skeleton height={18} width="80%" />
                </div>

                <Skeleton width={100} height={30} borderRadius={9999} />
                <div className="flex flex-wrap gap-1.5">
                  {Array(3)
                    .fill(0)
                    .map((b, idx) => (
                      <Skeleton
                        key={idx}
                        width={70}
                        height={25}
                        borderRadius={9999}
                      />
                    ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-10 shrink-0 flex flex-col gap-1 items-end my-1.5">
              <div className="w-full">
                <Skeleton className="w-full" height={35} borderRadius={12} />
              </div>
              <div className="w-full">
                <Skeleton className="w-full" height={35} borderRadius={12} />
              </div>
              <div className="w-full">
                <Skeleton className="w-full" height={35} borderRadius={12} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogSkeleton;