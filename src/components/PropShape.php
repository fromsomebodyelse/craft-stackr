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
        if (!is_array($value)) {
            throw new Exception(sprintf('Stackr: PropShape expecting `array` but found `%s`', getType($value)));
        }

        foreach ($this->shape as $prop=>$shapeType) {
            if ($shapeType->isRequired() && !array_key_exists($prop, $value)) {
                throw new Exception(sprintf('Stackr: %s is required', $prop));
            }

            $shapeType->test($value[$prop]);
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