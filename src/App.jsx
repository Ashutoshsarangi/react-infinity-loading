import { useEffect, useRef, useState } from "react";
import "./App.css";

let counter = 1;

function App() {
  const [item, setItem] = useState([]);
  const parentRef = useRef();

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      intersectionHandler,
      options
    );
    if (parentRef.current) {
      intersectionObserver.observe(parentRef.current);
    }

    return () => {
      if (parentRef.current) {
        intersectionObserver.unobserve(parentRef.current);
      }
    };
  }, []);

  const loadMore = () => {
    const result = [];
    for (let i = 0; i < 20; i++) {
      result.push({ id: counter++ });
    }

    setItem((item) => [...item, ...result]);
  };

  const intersectionHandler = (entries) => {
    if (entries[0].isIntersecting) {
      console.log("Element is in viewport!");
      loadMore();
    } else {
    }
  };

  const options = {
    root: null, // null means it's the viewport
    rootMargin: "0px",
    threshold: 0.2, // 20% of the element is in the viewport
  };

  return (
    <>
      <div
        style={{
          border: "2px solid red",
          maxHeight: "500px",
          overflow: "auto",
          padding: "10px",
          margin: "5px",
        }}
      >
        {item.map((item) => {
          return (
            <div
              style={{
                height: "50px",
                border: "1px solid",
                margin: "5px",
                padding: "5px",
                width: "250px",
              }}
            >
              Name: {item.id}
            </div>
          );
        })}
        <div ref={parentRef}></div>
      </div>
    </>
  );
}

export default App;
