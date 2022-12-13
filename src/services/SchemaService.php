<?php

namespace fse\stackr\services;

use fse\stackr\Stackr;
use fse\stackr\components\ComponentProp;
use fse\stackr\components\PropArray;
use fse\stackr\components\PropArrayOf;
use fse\stackr\components\PropEnum;
use fse\stackr\components\PropNumber;
use fse\stackr\components\PropShape;
use fse\stackr\components\PropString;
use Mni\FrontYAML\Parser;

class SchemaService {

    protected $parser;

    public function __construct()
    {
        $this->parser = new Parser(null, null, '{#---', '---#}');
    }

    public function array($default = [])
    {
        return (new PropArray())->defaultValue($default);
    }

    public function arrayOf(ComponentProp $type)
    {
        return new PropArrayOf($type);
    }

    public function bool(bool $default = false)
    {
        return (new ComponentProp())->defaultValue($default);
    }

    public function enum($default, $options = [])
    {
        return new PropEnum($default, $options);
    }

    public function number(?number $default = null)
    {
        return (new PropNumber())->defaultValue($default);
    }

    public function shape(array $shape)
    {
        return new PropShape($shape);
    }

    public function string(?string $default = null)
    {
        return (new PropString())->defaultValue($default);
    }
}