import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkillSkeleton = () => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-8 gap-4 mt-14'>
      {
        Array(4)
          .fill(0)
          .map((_, index) => (
            <div 
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl border border-gray-100 md:space-y-3 space-y-2">
              <div className="flex md:flex-row flex-col justify-between sm:items-center items-start md:mb-4 mb-2 md:space-y-0 space-y-2">
                <div className="w-40 sm:w-1/2">
                  <Skeleton className="w-full" height={25}/>
                </div>
                <div className="md:w-25 w-50">
                  <Skeleton className="w-full" height={25} borderRadius={9999}/>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="w-25">
                  <Skeleton className="w-full" height={25}/>
                  </div>
                  <div className="w-10">
                    <Skeleton className="w-full" height={25} borderRadius={9999}/>
                  </div>
                </div>
                <div className="w-full">
                  <Skeleton className="w-full" height={8} borderRadius={9999}/>
                </div>
              </div>
        
              <div className="w-2/3">
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
          ))
      }
    </div>
  )
}

export default SkillSkeleton