const ProgressLoader = () => {
    return (
      <div className="fixed bg-black bg-opacity-50 top-0 left-0 z-50 w-full h-full flex-col flex-center-center dark:bg-dark-main">
        <div className="bg-black p-10 rounded-lg bg-opacity-10">
        <div className="text-white mb-2">Processing...</div>
        <div className="progress-loader mt-5">
        <div className="progress bg-teal_color bg-opacity-50"></div>
        </div>
        </div>
      </div>
  
      
  
  
    );
  };
  
  export default ProgressLoader;
  
  