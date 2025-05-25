import React, { useState, useEffect } from "react";

export const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `User${i + 1}@example.com`,
  age: Math.floor(Math.random() * 30) + 18,
}));
const Pagination = () => {
  const [item, setItem] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  useEffect(() => {
    setItem(data);
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPageData(item.slice(startIndex, endIndex));
  }, [currentPage, item]);

  const handleNext = () => {
    if (currentPage < Math.ceil(item.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div>
        {currentPageData.map((item) => (
          <div key={item.name}>{item.name}</div>
        ))}
        <div style={{ marginTop: "10px" }}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span style={{ margin: "0 10px" }}>Page {currentPage}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === Math.ceil(item.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
