import React, { useCallback, useContext, useRef, useState } from "react";
import { StackrPageContext } from "./StackrPage";
import { InspectorContext } from './Inspector';
import { HashtagIcon, SearchIcon } from '@heroicons/react/solid'


const ComponentListItem = ({instance, allInstances}) => {
  const {mouseOver, actions} = useContext(StackrPageContext);
  const {setCurInstance} = useContext(InspectorContext);
  const depthClassName = ['ml-0', 'ml-4', 'ml-8', 'ml-12'][instance.depth];
  const bgColor = mouseOver.includes(instance.id) ? 'bg-blue-300' : 'bg-gray-300';
  const children = allInstances.filter(child => child.parent === instance.id);

  const handleMouseOver = useCallback((instance) => {
    actions.highlightInstance(instance.id);
  });

  const handleMouseOut = useCallback((instance) => {
    actions.highlightInstance(instance.id, false);
  });

  const handleClick = useCallback((instance) => {
    setCurInstance(instance);
  });

  return (
    <React.Fragment>
      <div className={`flex justify-between items-center px-4 py-2 ${bgColor} cursor-pointer ${depthClassName} shadow-sm rounded-sm hover:bg-blue-300`} key={instance.id}
        onMouseOver={(e) => handleMouseOver(instance)}
        onMouseOut={(e) => handleMouseOut(instance)}
        onClick={(e) => handleClick(instance)}
      >
        <div className="text-sm">{instance.component}</div>
        <div>
          <SearchIcon className="w-4 h-4" />
        </div>
      </div>

      {children.map(child =>
        <ComponentListItem key={child.id} instance={child} allInstances={allInstances} />
      )}
    </React.Fragment>
  );
}

const ComponentsList = () => {
  const {instances} = useContext(StackrPageContext);
  const listRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
          { instances.filter(instance => instance.depth === 0).map(instance => <ComponentListItem key={instance.id} instance={instance} allInstances={instances} />) }
        </div>

        {/* Copyright */}
        <div className="px-4 py-2 text-xs text-gray-400 justify-self-end">Stackr&trade; for CraftCMS By <a href="https://fromsomebodyelse.com">FSE</a></div>
      </div>
    </div>
  )
}

export default ComponentsList;