import React from 'react';
import autumn from '../assets/autumn-leaf-svgrepo-com.svg';
import winter from '../assets/snowflake-svgrepo-com.svg';
import summer from '../assets/summer-svgrepo-com.svg';
import spring from '../assets/flower-forest-growth-leaf-plant-spring-svgrepo-com.svg';

const DisplaySeasonImg = () => {
  let currentTime = new Date();
  let month = currentTime.getMonth() + 1;
  console.log(currentTime, month);
  let season;

  switch (true) {
    case month >= 6 && month <= 8:
      season = summer;
      break;
    case month >= 9 && month <= 11:
      season = autumn;
      break;
    case month === 12 || month === 1 || month === 2:
      season = winter;
      break;
    case month >= 3 && month <= 5:
      season = spring;
      break;
    default:
      season = summer;
  }
  return (
    <div className="season-image">
      <img src={season} alt="season-img"></img>
    </div>
  );
};

export default DisplaySeasonImg;
