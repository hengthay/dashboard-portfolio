import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AchievementSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {
        Array(2)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="w-full flex justify-between group items-center bg-white border border-gray-300 min-h-20 rounded-2xl p-4 gap-x-6 hover:shadow-sm"
            >
              <div className="w-full flex flex-col sm:flex-row items-start md:gap-6 gap-3">
                <div className="w-8">
                  <Skeleton className="w-full" height={25} borderRadius={9999}/>
                </div>

                <div className="w-full lg:w-40 md:w-35">
                  <Skeleton
                    className="w-full"
                    height={130}
                    borderRadius={20}
                    baseColor="#d1d5db"
                    highlightColor="#e5e7eb"
                  />
                </div>

                <div className="w-full flex flex-1 flex-col items-start md:gap-3 gap-1.5">
                  <div className="md:w-40 lg:w-50 w-35">
                    <Skeleton className="w-full" height={30} borderRadius={8} />
                  </div>

                  <div className="md:w-70 lg:w-150 w-full">
                    <Skeleton className="w-full" height={25} borderRadius={8} count={3} />
                  </div>
                </div>
                <div className="w-full md:w-10 shrink-0 flex flex-col gap-1 items-end my-1.5 ml-auto">
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
          ))
      }
    </div>
  )
}

export default AchievementSkeleton