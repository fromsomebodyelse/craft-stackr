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
        if (is_null($value)) {
            if (!$this->nullable) {
                throw new Exception(sprintf('Stackr: "%s" value cannot be null.', $this->name ?? $this->type));
            }

            return true;
        }

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
