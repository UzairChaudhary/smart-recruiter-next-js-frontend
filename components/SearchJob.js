import React from "react";

function JobSearchForm() {
  return (
    
    <form class="mx-auto max-w-md mt-[-20px] shadow-md rounded-full flex-wrap">
  <div class="flex relative justify-between border-none">
    <input
      type="search"
      id="default-search"
      class="flex-grow block w-full p-4 text-sm text-gray-500 rounded-full border-none focus:outline-none"
      placeholder="Search your dream job"
      required
    />
    <button
      type="submit"
      class="text-white absolute end-1.5 bottom-1 bg-black_color font-medium rounded-full text-sm px-6 py-3 border-none"
    >
      Search
    </button>
  </div>
</form>

  );
}

export default JobSearchForm;