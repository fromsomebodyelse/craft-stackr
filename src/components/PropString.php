<?php

namespace fse\stackr\components;

use Exception;
use Stringable;
use fse\stackr\components\ComponentProp;

class PropString extends ComponentProp {

    public function __construct(string $default = null)
    {
        parent::__construct('String');
        $this->defaultValue($default);
    }

    public function test($value):bool
    {
        $isString = is_string($value) || $value instanceof Stringable;

        if (!$isString) {
            throw new Exception(sprintf('Stackr: "%s" value needs to be a string but received, "%s"', $this->name, get_class($value)));
        }

        return true;
    }

    public function defaultValue($value):self
    {
        parent::defaultValue($value);
        return $this;
    }
}
