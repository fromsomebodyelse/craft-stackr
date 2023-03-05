<?php

namespace fse\stackr\components;

use JsonSerializable;

class ComponentProp implements JsonSerializable {

    protected $type;
    protected $name;
    protected $description;
    protected $default;
    protected $required;
    protected $nullable;
    protected $value;

    public function __construct($type = 'Any')
    {
        $this->type = $type;
        $this->required = false;
        $this->nullable = false;
    }

    public function defaultValue(mixed $value):self
    {
        $this->default = $value;
        return $this;
    }

    public function type():string
    {
        return $this->type;
    }

    public function name(string $name):self
    {
        $this->name = $name;
        return $this;
    }

    public function desc(string $description):self
    {
        $this->description = $description;
        return $this;
    }

    public function required():self
    {
        $this->required = true;
        return $this;
    }

    public function nullable():self
    {
        $this->nullable = true;
        return $this;
    }

    public function isNullable():bool
    {
        return $this->nullable;
    }

    public function isRequired():bool
    {
        return $this->required;
    }

    public function set($value):self
    {
        $this->test($value);
        $this->value = $value;
        return $this;
    }

    public function get():mixed
    {
        return $this->value ?? $this->default;
    }

    public function test($value):bool
    {
        return true;
    }

    public function jsonSerialize(): mixed
    {
        return [
            'type' => $this->type,
            'name' => $this->name,
            'description' => $this->description,
            'required' => $this->required,
            'default' => $this->default,
            'value' => $this->value,
        ];
    }
}
