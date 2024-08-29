import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

function App() {
  const [width, setWidth] = useState(300)
  const isResize = useRef(false)

  const [selected, setSelected] = useState()

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (!isResize.current) return
      setWidth(prev => prev + (e.movementX / 2))
    });
    window.addEventListener("mouseup", () => {
      isResize.current = false;
    });
  }, []);

  return (
    <div className="w-full h-screen flex flex-row items-start">
      <div className="min-w-[100px] max-w-[50%] max-h-screen overflow-y-auto" style={{ width: `${width}px` }}>
        <Sidebar onChange={setSelected} />
      </div>
      <div className="bg-slate-200 w-[2px] h-screen cursor-col-resize select-none" onMouseDown={() => isResize.current = true} ></div>
      <Content onChange={setSelected} selected={selected} />
    </div>
  );
}

export default App;
