import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center text-sm md:text-md ">
      <span>
        {value >= 1 ? (
          <AiTwotoneStar style={{color:'gold'}}   />
        ) : value >= 0.5 ? (
          <BsStarHalf style={{color:'gold'}}  />
        ) : (
          <AiOutlineStar   />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <AiTwotoneStar style={{color:'gold'}}  />
        ) : value >= 1.5 ? (
          <BsStarHalf style={{color:'gold'}}  />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <AiTwotoneStar style={{color:'gold'}}  />
        ) : value >= 2.5 ? (
          <BsStarHalf style={{color:'gold'}}  />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <AiTwotoneStar style={{color:'gold'}}  />
        ) : value >= 3.5 ? (
          <BsStarHalf style={{color:'gold'}}  />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <AiTwotoneStar style={{color:'gold'}}  />
        ) : value >= 4.5 ? (
          <BsStarHalf style={{color:'gold'}}  />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span className="px-1">{text && text}</span>
    </div>
  );
};

export default Rating;
