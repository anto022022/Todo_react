import { useEffect, useState } from "react";
import "../assets/styles/list.scss";

export const SimplePagination = ({ total, pagination, list }) => {
  const [paginate, setPagination] = useState(0);
  useEffect(() => {
    setPagination(Math.ceil(total / 10));
  }, [list]);

  return total > 10 ? (
    <div className="pagination">
      {Array.from({ length: paginate }).map((ele, index) => (
        <div
          className="dot"
          key={index}
          onClick={() => pagination(index + 1)}
        ></div>
      ))}
    </div>
  ) : null;
};
