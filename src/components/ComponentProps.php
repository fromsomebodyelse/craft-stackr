<?php

namespace fse\stackr\components;

use Exception;
use JsonSerializable;
use fse\stackr\components\ComponentProp;

class ComponentProps implements JsonSerializable {

    private $props;

    public function __construct($props)
    {
        $this->props = $props;

        foreach ($props as $prop=>$value) {
            if (!is_a($value, ComponentProp::class)) {
                $p = $this->props[$prop] = new ComponentProp();
                $p->set($value);
            }
        }
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

    public function jsonSerialize(): mixed
    {
        return $this->props;
    }
}
