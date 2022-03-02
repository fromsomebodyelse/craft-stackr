const createComponentModal = (instance, schema) => {
  return {
    instance,
    name: schema.name,
    description: schema.description,
    parameters: Object.keys(schema.attributes).map((name) => {
      const definition = schema.attributes[name];
      const value = instance.arguments[name] ?? null;
      return parseParameter(name, definition, value);
    }),
  };
}


/**
 * Parses a parameter object returned from the server.
 */
const parseParameter = (name, definition, value = null) => {
  // Shorthand for an attribute is "name: description as string"
  if (typeof definition === 'string') {
    return {name, description: definition, type: null, value};
  }

  if (!definition) {
    return {name, description: '', type: null, value};
  }

  // Longhand is an object containing description, desc, and type
  return {
    name,
    description: 'desc' in definition ? definition.desc : definition.description || '',
    type: definition.type || null,
    value,
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
