import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex items-center justify-center">
    <nav className="absolute bottom-0 right-[40%]    ">
      <ul className="flex items-center justify-center ">
        {pageNumbers.map((number) => (
          <li key={number} className="px-2 ">
            <button onClick={() => paginate(number)} className="border-2 border-gray-400 px-2   ">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    </div>
  );
};

export default Pagination;