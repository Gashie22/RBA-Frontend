import React from "react";
// import 'bootstrap/dist/css/bootstrap.css';
const Pagination = ({ PostsPerPage, totalPosts,paginate }) => {
  //props
  //paginate function
  

  //logic to get the correct number of pages ....math.ceil===round off

  const pageNumber = [];

  for (let index = 1; index <= Math.ceil(totalPosts / PostsPerPage); index++) {
    pageNumber.push(index);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumber.map((number) => (
            <li key={number} className="page-item">
              <a onClick={()=>paginate(number)} href="#" class="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
