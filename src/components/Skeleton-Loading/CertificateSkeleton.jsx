import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CertificateSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {
        Array(2)
          .fill(0)
          .map((_, index) => (       
            <div 
              key={index}
              className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition">
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-full sm:w-44 shrink-0">
                  <Skeleton
                    className="w-full"
                    height={130}
                    borderRadius={20}
                    baseColor="#d1d5db"
                    highlightColor="#e5e7eb"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="md:w-30 lg:w-40 w-25">
                      <Skeleton className="w-full" height={30} borderRadius={4} />
                    </div>

                    <div className="md:w-12 w-10">
                      <Skeleton className="w-full" height={25} borderRadius={9999} />
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm ">
                    <div className="md:w-30 lg:w-40 w-35">
                      <Skeleton className="w-full" height={25} borderRadius={4} />
                    </div>

                    <div className="md:w-30 lg:w-40 w-30">
                      <Skeleton className="w-full" height={25} borderRadius={4} />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="md:w-30 lg:w-35 w-25">
                      <Skeleton className="w-full" height={25} borderRadius={4} />
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
            </div>
          ))
      }
    </div>
  )
}

export default CertificateSkeleton