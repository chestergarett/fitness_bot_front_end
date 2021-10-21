import React from 'react';
import classes from './Pagination.module.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Pagination = ({ resultsPerPage, totalResults, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        <ChevronLeftIcon/>
        {pageNumbers.map(number => (
          <li key={number} className={classes.pageItem}>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <ChevronRightIcon/>
      </ul>
    </nav>
  );
};

export default Pagination;