import React, { useEffect, useState } from 'react';
import { getComponentChildren, getComponentParent, highlightComponent } from './utils';


const UrlValue = ({value}) => {
  return <a className="text-blue-400 whitespace-nowrap overflow-ellipsis" href="value" target="_blank">{value}</a>;
}

const ObjValue = ({value}) => {
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
}

const SelectValue = ({value}) => {
  return <span className="bg-blue-300 text-white rounded-md px-2 py-1">{value}</span>;
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

const ComponentThumb = ({component}) => {
  return  (
    <div className="border border-gray-400 rounded-md overflow-hidden">
      <div className="w-full aspect-square bg-white text-gray-400">
        <svg className="h-auto w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        {/* <div className="w-full h-full bg-no-repeat bg-cover bg-center" style={{backgroundImage: 'url(https://tailwindui.com/img/category-thumbnails/marketing/newsletter-sections.png)'}}></div> */}
      </div>
    </div>
  );
}


const getInstanceData = (instanceId) => {
  const el = document.querySelector(`[data-stackr-component="${instanceId}"]`);
  const parent = getComponentParent(el);
  const children = getComponentChildren(el);

  return {
    id: instanceId,
    ...window.stackrComponents[instanceId],
    el,
    parent,
    children,
  };
}

/**
 * Load the schema for the provided instance.
 */
const fetchComponentSchema = async (instanceId) => {

  const instance = getInstanceData(instanceId);
  const components = [instance.component];
  const token = {[window.csrfTokenName]: window.csrfTokenValue};

  const result = await fetch('/stackr/components', {
    method: 'POST',
    body: JSON.stringify({...token, components}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const schemas = await result.json();

  return createComponentModal(instance, schemas.components[0]);
}

const createComponentModal = (instance, schema) => {
  return {
    instance,
    name: schema.name,
    description: schema.description,
    parameters: Object.keys(schema.attributes).map((name) => {
      const description = schema.attributes[name];
      const value = instance.arguments[name] ?? null;
      return {name, description, value}
    }),
  }
}

const ComponentDetails = ({instance, setInstance}) => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    fetchComponentSchema(instance).then(data => setComponent(data));
  }, [instance]);

  if (!component) {
    return (<p>Loading</p>);
  }

  return (
    <div className="relative details-window bg-gray-100"
      onMouseOver={(e) => highlightComponent(component.instance.id)}
      onMouseOut={(e) => highlightComponent(component.instance.id, false)}
    >
      <header className="sticky top-0 px-4 py-4 bg-gray-100 border-b border-gray-300">
        <div className="mb-2">
          <button className="" onClick={(e) => setInstance(null)}>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
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
            <div class="px-2">
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
