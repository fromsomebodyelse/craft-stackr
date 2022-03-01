import React, { useCallback, useContext, useRef, useState } from "react";
import { StackrPageContext } from "./StackrPage";
import { InspectorContext } from './Inspector';
import { CursorClickIcon, HashtagIcon } from '@heroicons/react/solid'

const ComponentsList = () => {
  const {instances, mouseOver, actions} = useContext(StackrPageContext);
  const listRef = useRef(null);
  const {setCurInstance} = useContext(InspectorContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMouseOver = useCallback((instance) => {
    actions.highlightInstance(instance.id);
  });

  const handleMouseOut = useCallback((instance) => {
    actions.highlightInstance(instance.id, false);
  });

  const handleClick = useCallback((instance) => {
    setCurInstance(instance);
  });

  const handleScroll = useCallback((e) => {
    setIsScrolled(listRef.current.scrollTop > 16);
  });

  const headerShadow = isScrolled ? 'shadow-lg' : 'shadow-none';

  return (
    <div ref={listRef} className="flex flex-col relative details-window bg-gray-100 overflow-y-scroll" onScroll={(e) => handleScroll(e)}>
      <div className={`sticky top-0 right-0 flex justify-between pl-3 pr-6 py-4 bg-gray-100 transition-shadow ${headerShadow}`}>
        <h1 className="flex items-center text-lg font-bold text-gray-700">
          <HashtagIcon className="block w-5 h-5" />
          <span className="block">Stackr Inspect</span>
        </h1>
      </div>
      <div className="flex flex-col justify-between h-full pt-4">
        {/* List */}
        <div className="flex flex-col gap-y-2 mb-16 px-6">
          { instances.map(instance => {
            const depthClassName = ['ml-0', 'ml-4', 'ml-8', 'ml-12'][instance.depth];
            const bgColor = mouseOver.includes(instance.id) ? 'bg-blue-300' : 'bg-gray-300';

            return (
              <div className={`flex justify-between items-center px-4 py-2 ${bgColor} cursor-pointer ${depthClassName} shadow-sm rounded-sm hover:bg-blue-300`} key={instance.id}
                onMouseOver={(e) => handleMouseOver(instance)}
                onMouseOut={(e) => handleMouseOut(instance)}
                onClick={(e) => handleClick(instance)}
              >
                <div className="text-sm">{instance.component}</div>
                <div>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            );
          }) }
        </div>

        {/* Copyright */}
        <div className="px-4 py-2 text-xs text-gray-400 justify-self-end">Stackr&trade; for CraftCMS By <a href="https://fromsomebodyelse.com">FSE</a></div>
      </div>
    </div>
  )
}

export default ComponentsList;