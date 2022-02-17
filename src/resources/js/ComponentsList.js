import React, { useCallback, useContext } from "react";
import { StackrPageContext } from "./StackrPage";
import { InspectorContext } from "./main";

const ComponentsList = () => {
  const {instances, actions} = useContext(StackrPageContext);
  const {setCurInstance} = useContext(InspectorContext);

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
    <div className="flex flex-col relative details-window bg-gray-100 overflow-y-scroll">
      <h1 className="flex items-center ml-3 my-4 text-lg font-bold text-gray-700">
        <svg className="block h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
        </svg>
        <span className="block">Stackr Inspect</span>
      </h1>
      <div className="flex flex-col justify-between h-full">
        {/* List */}
        <div className="flex flex-col gap-y-2 mb-16 px-6">
          { instances.map(instance => {
            const depthClassName = ['ml-0', 'ml-4', 'ml-8', 'ml-12'][instance.depth];

            return (
              <div className={`flex justify-between items-center px-4 py-2 bg-gray-300 cursor-pointer ${depthClassName} shadow-sm rounded-sm hover:bg-blue-300`} key={instance.id}
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