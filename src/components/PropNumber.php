<?php

namespace fse\stackr\components;

use Exception;
use fse\stackr\components\ComponentProp;

class PropNumber extends ComponentProp {

    public function __construct(string $default = null)
    {
        parent::__construct('Number');
        $this->defaultValue($default);
    }

    public function set($value):self
    {
        if (!$this->test($value)) {
            throw new Exception(sprintf('Stackr: value for type "Number" must be a number.'));
        }

        parent::set($value + 0); // Cast to int or float - https://stackoverflow.com/a/30616225
        return $this;
    }

    public function test($value):bool
    {
        return is_numeric($value);
    }

    public function defaultValue($value):self
    {
        parent::defaultValue($value);
        return $this;
    }
}
