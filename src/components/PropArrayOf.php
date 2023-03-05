<?php

namespace fse\stackr\components;

use Exception;
use fse\stackr\components\ComponentProp;

class PropArrayOf extends ComponentProp {

    private $allowedType;

    public function __construct($type)
    {
        $this->allowedType = $type;
        parent::__construct('TypedArray');
    }

    public function defaultValue($value):self
    {
        parent::defaultValue($value);
        return $this;
    }

    public function set($array):self
    {
        $this->test($array);
        parent::set($array);
        return $this;
    }

    public function test($array):bool
    {
        if (is_null($array) && !$this->nullable) {
            throw new Exception(sprintf('Stackr: "%s" array cannot be null, "%s"', $this->name, get_class($array)));
        }

        if (!is_array($array)) {
            throw new Exception('Stackr: ArrayOf requires the value be an array.');
        }

        foreach ($array as $value) {
            if (!$this->allowedType->test($value)) {
                throw new Exception(sprintf('Stackr: Array element "%s" must be of type "%s"',
                    gettype($value),
                    get_class($this->allowedType))
                );
            }
        }

        return true;
    }

    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(), [
            'allowedType' => $this->allowedType->jsonSerialize(),
        ]);
    }
}
