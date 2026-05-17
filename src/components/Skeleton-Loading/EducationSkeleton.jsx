import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EducationSkeleton = () => {
  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4 mt-14">
      {
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="md:w-70 lg:w-80 w-70">
                      <Skeleton className="w-full" height={30} borderRadius={4} />
                    </div>

                    <div className="md:w-12 w-10">
                      <Skeleton className="w-full" height={25} borderRadius={9999} />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <div className="md:w-60 lg:w-65 w-60">
                      <Skeleton className="w-full" height={25} borderRadius={4} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="md:w-30 lg:w-35 w-30">
                      <Skeleton className="w-full" height={30} borderRadius={4} />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <div className="md:w-50 lg:w-55 w-50">
                      <Skeleton className="w-full" height={30} borderRadius={4} />
                    </div>
                  </div>

                  <div className="w-full flex flex-col shrink-0 md:flex-row items-end gap-1 sm:gap-2 text-sm md:w-30 justify-end ml-auto">
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
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default EducationSkeleton