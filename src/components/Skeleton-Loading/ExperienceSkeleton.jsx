import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExperienceSkeleton = () => {
  return (
     <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4 mt-14">
      {
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div 
              key={index}
              className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition">
              <div className="flex flex-col items-start space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="md:w-50 lg:w-60 w-50">
                    <Skeleton className="w-full" height={30} borderRadius={4} />
                  </div>

                  <div className="md:w-12 w-10">
                    <Skeleton className="w-full" height={25} borderRadius={9999} />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="md:w-40 lg:w-50 w-40 my-2">
                    <Skeleton className="w-full" height={25} borderRadius={4} />
                  </div>

                  <div className="md:w-40 lg:w-100 w-60">
                    <Skeleton className="w-full" height={20}/>
                  </div>
                  <div className="md:w-40 lg:w-95 w-60">
                    <Skeleton className="w-full" height={20}/>
                  </div>
                  <div className="md:w-40 lg:w-80 w-60">
                    <Skeleton className="w-full" height={20}/>
                  </div>
                </div>
                <div className="md:w-40 lg:w-50 w-40">
                  <Skeleton className="w-full" height={20}/>
                </div>

                <div className="w-full md:w-30 flex md:flex-row flex-col gap-1 my-2">
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

export default ExperienceSkeleton