import React, { useContext, useEffect, useState } from 'react';
import { fetchComponentSchema } from "../fetchComponentSchema";
import { InspectorContext } from './Inspector';


const UrlValue = ({value}) => {
  return <a className="text-blue-400 whitespace-nowrap overflow-ellipsis" href="value" target="_blank">{value}</a>;
}

const ObjValue = ({value}) => {
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
}

const PropertyValue = ({component, param}) => {

  let val = <span>{param.value}</span>;

  if (typeof param.value === 'object') {
    val =  <ObjValue value={param.value} />;
  }

  if (param.value === null) {
    val = <span className="text-gray-500">Not Set</span>;
  } else if (param.name === 'url' && typeof param.value === 'string') {
    val = <UrlValue value={param.value} />;
  }

  return (
    <div className="mt-2 px-2 py-2 bg-white border rounded-md shadow-sm text-sm overflow-x-scroll">
      {val}
    </div>
  );
}

const ComponentThumb = () => {
  return  (
    <div className="border border-gray-400 rounded-md overflow-hidden">
      <div className="w-full px-2 py-2 aspect-square bg-white text-gray-400">
        <svg className="h-auto w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
    </div>
  );
}


const ComponentDetails = ({instance}) => {
  const {setCurInstance} = useContext(InspectorContext);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (instance) {
      fetchComponentSchema(instance).then(data => setComponent(data));
    } else {
      setComponent(null);
    }
  }, [instance]);

  if (!component) {
    return (<p>Loading</p>);
  }

  return (
    <div className="relative details-window bg-gray-100">
      <header className="sticky top-0 px-4 py-4 bg-gray-100 border-b border-gray-300">
        <div className="mb-2">
          <button className="" onClick={(e) => setCurInstance(null)}>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="flex">
          <div className="w-full max-w-[60px]">
            <ComponentThumb {...{component}} />
          </div>
          <div className="mt-2 ml-4">
            <p className="text-xl">{component.name}</p>
            <p className="text-sm">{component.description}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-y-3 mb-16 mt-4 px-2 ">
        {component.parameters.map((param, i) => (
            <div className="px-2" key={i}>
              <div className="flex text-sm gap-x-2">
                <div className="font-bold text-gray-600">{param.name}:</div>
                <div className="text-gray-500">{param.description}</div>
              </div>
              <PropertyValue {...{param, component}} />
            </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentDetails;
