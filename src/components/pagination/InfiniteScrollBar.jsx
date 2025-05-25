import React, { useState, useEffect, useRef } from "react";
export const data = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  email: `item${i + 1}@example.com`,
  age: Math.floor(Math.random() * 30) + 10,
}));
const InfiniteScrollBar = () => {
  const scrollBarRef = useRef();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;
  useEffect(() => {
    setItems(data.slice(0, itemsPerPage));
  }, []);
  const handleScroll = () => {
    const scroll = scrollBarRef.current;
    if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 10) {
      loadMore();
    }
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const moreItems = data.slice(startIndex, endIndex);

    if (moreItems.length > 0) {
      setItems((prev) => [...prev, ...moreItems]);
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    const scroll = scrollBarRef.current;
    if (scroll) {
      scroll.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scroll) {
        scroll.removeEventListener("scroll", handleScroll);
      }
    };
  }, [items]);

  return (
    <div>
      <div
        ref={scrollBarRef}
        className="max-h-80 w-72 overflow-y-auto border p-2 m-10"
      >
        {items.map((item) => (
          <div className="border" key={item.id}>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollBar;
