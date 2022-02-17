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
  };
}

/**
 * Load the schema for the provided instance.
 */
export const fetchComponentSchema = async (instance) => {
  const components = [instance.component];
  const token = {[window.csrfTokenName]: window.csrfTokenValue};

  const result = await fetch('/admin/stackr/components', {
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
