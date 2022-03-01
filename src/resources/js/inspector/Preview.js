import React, { useEffect, useRef, useState } from 'react';

const Preview = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState({width: 0, height: 0});
  const container = useRef(null);
  const content = useRef(null);
  const isDragging = useRef(false);
  const handle = useRef(null);

  const startResizing = () => {
    content.current.style.pointerEvents = 'none';
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
  }

  const stopResizing = () => {
    content.current.style.pointerEvents = 'initial';
    isDragging.current = false;
    document.body.style.cursor = 'auto';
  }

  const resize = (e) => {
    if (isDragging.current) {
      e.preventDefault();

      const bounds = container.current.getBoundingClientRect();
      const newX = e.clientX - bounds.left;
      const newWidth = Math.max(0.1, Math.min(1, newX / bounds.width));

      content.current.style.width = `${newWidth * 100}%`;
      handle.current.style.right = `${Math.abs(100 - newWidth * 100)}%`;
    }
  }

  const onMouseMove = (e) => { resize(e) };
  const onMouseUp = (e) => { stopResizing(); };
  const onMouseDown = (e) => { startResizing(); };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }, []);

  return (
    <div ref={container} className="relative w-full h-full">
      <div ref={content} className="w-full h-full">
        {children}
      </div>
      <div ref={handle} className="absolute top-0 right-0 w-[6px] h-full bg-gray-300 cursor-col-resize" onMouseDown={(e) => onMouseDown(e)}></div>
    </div>
  );
}

export default Preview;
