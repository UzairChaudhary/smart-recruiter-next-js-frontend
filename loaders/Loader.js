const Loader = () => {
  return (
    <div className="fixed bg-black bg-opacity-50 top-0 left-0 z-50 w-full h-full flex-col flex-center-center dark:bg-dark-main">
      <div className="circleloader "></div>
      <div className="progress-loader mt-10">
      <div className="progress"></div>
      </div>
    </div>

    


  );
};

export default Loader;



{/* <div class="animate-pulse flex flex-col items-center gap-4 fixed z-50 w-2/4 left-1/4 h-full top-1/4 ">
    <div>
      <div class="w-48 h-6 bg-slate-200 rounded-md"></div>
      <div class="w-28 h-4 bg-slate-200 mx-auto mt-3 rounded-md"></div>
    </div>
    <div class="h-7 bg-slate-200 w-full rounded-md"></div>
    <div class="h-7 bg-slate-200 w-full rounded-md"></div>
    <div class="h-7 bg-slate-200 w-full rounded-md"></div>
    <div class="h-7 bg-slate-200 w-1/2 rounded-md"></div>
    </div> */}