import React from 'react';

function Card({ carddata }) {
  return (
    <div className='card'>
      <div className="card-content">
        <p>{carddata.title}</p> 
        <div className="card-details">
          <p>by: {carddata.by || 'Unknown Author'}</p>
          <p>time: {carddata.time}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
