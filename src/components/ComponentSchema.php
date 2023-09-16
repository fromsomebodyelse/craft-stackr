<?php

namespace fse\stackr\components;

class ComponentSchema {

    protected $schema;

    protected $name;

    public function __construct(string $name, array $schema)
    {
        $this->name = $name;

        // TODO: Validate schema
        $this->schema = $schema;

        if (array_key_exists('notes', $this->schema)) {
            $this->schema['notes'] = (new \Parsedown())->text($this->schema['notes']);
        }
    }

    public function getName()
    {
        return $this->schema['name'];
    }

    public function getDescription()
    {
        return $this->schema['description'] ?? '';
    }

    public function getAttributes()
    {
        return $this->schema['attributes'] ?? [];
    }

    public function toArray()
	{
		return [
            'name'=> $this->getName(),
            'description'=> $this->getDescription(),
            'attributes'=> $this->getAttributes(),
            'notes' => $this->schema['notes'] ?? null,
            'example' => $this->schema['example'] ?? null,
        ];
	}
}
