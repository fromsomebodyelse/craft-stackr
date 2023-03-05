<?php

namespace fse\stackr\components;

use Exception;
use fse\stackr\components\ComponentProp;

class PropEnum extends ComponentProp {

    private $list;

    public function __construct(string $default = null, array $list = [])
    {
        parent::__construct('Enum');
        $this->in($list);
        $this->defaultValue($default);
    }

    public function defaultValue($value) :self
    {
        $this->test($value);
        parent::defaultValue($value);
        return $this;
    }

    public function set($value) :self
    {

        $this->test($value);
        parent::set($value);
        return $this;
    }

    public function test($value):bool
    {
        if (is_null($value) && !$this->nullable) {
            throw new Exception(sprintf('Stackr: "%s" value cannot be null, "%s"', $this->name, get_class($value)));
        }

        if (!in_array($value, $this->list)) {
            throw new Exception(sprintf('Stackr: value "%s" not present in list "[%s]"', $value, implode(',', $this->list)));
        }

        return true;
    }

    public function in(array $list) :self
    {
        $this->list = $list;
        return $this;
    }

    public function jsonSerialize(): mixed
    {
        return array_merge(parent::jsonSerialize(), [
            'list' => $this->list,
        ]);
    }
}
