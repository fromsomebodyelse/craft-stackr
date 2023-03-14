<?php

namespace fse\stackr\components;

use Exception;
use fse\stackr\components\ComponentProp;

class PropShape extends ComponentProp {

    private $shape;

    public function __construct(array $shape)
    {
        $this->shape = $shape;
        parent::__construct('ObjectShape');
    }

    public function test($value):bool
    {
        if (is_null($value) && !$this->nullable) {
            throw new Exception(sprintf('Stackr: "%s" value cannot be null, "%s"', $this->name, get_class($value)));
        }

        if (is_null($value)) {
            return true;
        }

        if (is_array($value)) {

        }

        if (!is_array($value) and !is_object($value)) {
            throw new Exception(sprintf('Stackr: PropShape expecting `array` but found `%s`', getType($value)));
        }

        foreach ($this->shape as $prop=>$shapeType) {
            if ($shapeType->isRequired() && !array_key_exists($prop, $value)) {
                throw new Exception(sprintf('Stackr: %s is required', $prop));
            }

            if (!$shapeType->isNullable() && is_null($value)) {
                throw new Exception(sprintf('Stackr: %s can not be null.', $prop));
            }

            if (is_Array($value)) {
                // only test if it's been set.
                if (array_key_exists($prop, $value)) {
                    $shapeType->test($value[$prop]);
                }
            } else {

                if (property_exists($value, $prop)) {
                    $shapeType->test($value->{$prop});
                }
            }
        }

        return true;
    }

    public function defaultValue($value):self
    {
        parent::defaultValue($value);
        return $this;
    }

    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(), [
            'allowedType' => $this->shape,
        ]);
    }
}
