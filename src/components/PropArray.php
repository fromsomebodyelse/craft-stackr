<?php

namespace fse\stackr\components;

use fse\stackr\components\ComponentProp;

class PropArray extends ComponentProp {

    public function __construct(string $default = null)
    {
        parent::__construct('Array');
        $this->defaultValue($default);
    }

    public function defaultValue($value):self
    {
        parent::defaultValue($value);
        return $this;
    }
}
