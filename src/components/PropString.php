<?php

namespace fse\stackr\components;

use Exception;
use fse\stackr\components\ComponentProp;

class PropString extends ComponentProp {

    public function __construct(string $default = null)
    {
        parent::__construct('String');
        $this->defaultValue($default);
    }

    public function test($value):bool
    {
        if (!is_string($value)) {
            throw new Exception('Stackr: value needs to be a string');
        }

        return true;
    }

    public function defaultValue($value):self
    {
        parent::defaultValue($value);
        return $this;
    }
}
