import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4 mt-14">
      <div
      className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition"
      >
        <div className="w-full sm:h-60 h-44 overflow-hidden rounded-xl ">
          <div className="w-full shrink-0">
            <Skeleton
              className="w-full"
              height={200}
              borderRadius={20}
              baseColor="#d1d5db"
              highlightColor="#e5e7eb"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center md:my-0 my-3">
          <div className="flex-1 min-w-0 md:space-y-4 space-y-2">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-1/2">
                <Skeleton className="w-full" height={25}/>
              </div>
              <div className="w-10">
                <Skeleton className="w-full" height={25} borderRadius={12}/>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              <div className="w-2/3">
                <Skeleton className="w-full" height={25}/>
              </div>
              <div className="w-full">
                <Skeleton className="w-full" height={25} count={4}/>
              </div>
            </div>
                          
            <div className="w-full md:w-30 flex md:flex-row flex-col gap-1 sm:items-end justify-end my-2 ml-auto">
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
    </div>
  )
}

export default ProfileSkeleton