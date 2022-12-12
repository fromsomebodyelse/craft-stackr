<?php

namespace fse\stackr\components;

use Exception;
use JsonSerializable;
use fse\stackr\components\ComponentProp;

class ComponentProps implements JsonSerializable {

    private $props;

    public function __construct(array $propTypes = [], array $values = [])
    {
        $this->props = $propTypes;

        foreach ($propTypes as $key=>$value) {
            // Convert properties that are not of type ComponentProp
            if (!is_a($value, ComponentProp::class)) {
                $p = $this->props[$key] = new ComponentProp();
                $p->name($key);
                $p->set($value);
            }

            $this->props[$key]->name($key);
        }

        $this->mergeValues($values);
    }

    public function __get(string $name)
    {
        if (!$this->has($name)) {
            throw new Exception(sprintf('Stackr: Unknown component prop "%s"', $name));
        }

        return $this->props[$name]->get();
    }

    public function __call($name, $arguments)
    {
        return $this->__get($name);
    }

    public function has($name)
    {
        return array_key_exists($name, $this->props);
    }

    public function mergeValues($values)
    {
        $definedValues = array_intersect_key($values, $this->props);

        foreach ($definedValues as $name=>$value) {
            $prop = $this->props[$name];
            $prop->set($value);
        }
    }

    public function getValues()
    {
        $values = [];

        foreach($this->props as $key=>$prop) {
            $values[$key] = $prop->get();
        };

        return $values;
    }

    public function jsonSerialize(): mixed
    {
        return $this->props;
    }
}
