import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectSkeleton = () => {
  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4 mt-14">
      {
        Array(3)
          .fill(0)
          .map((_, index) => (
            <div 
              key={index}
              className="w-full group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 transition">
              <div className="w-full flex flex-col items-start group">
                <div className="w-full md:h-60 h-40 overflow-hidden relative group">
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
                <div className="flex-1 flex flex-col w-full space-y-1.5">
                  <div className="w-40 sm:w-2/3">
                    <Skeleton className="w-full" height={25}/>
                  </div>
                  <div className="w-full">
                    <Skeleton className="w-full" height={25} count={4}/>
                  </div>
                </div>
                <div className="my-2 flex flex-wrap items-center gap-2">
                  <div className="w-25 sm:w-30">
                    <Skeleton className="w-full" height={25} />
                  </div>
                  {
                    Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          width={60}
                          height={25}
                          borderRadius={9999}
                        />
                      ))
                  }
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

export default ProjectSkeleton