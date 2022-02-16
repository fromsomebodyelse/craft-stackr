<?php

namespace fse\stackr\services;

use fse\stackr\Stackr;
use fse\stackr\components\ComponentSchema;
use Mni\FrontYAML\Parser;

class SchemaService {

    protected $parser;

    public function __construct()
    {
        $this->parser = new Parser(null, null, '{#---', '---#}');
    }

    public function parseSchema(string $component):ComponentSchema
	{
        // TODO: Handle missing files.
        $file = Stackr::$plugin->components->getFilePath($component);
        $str = file_get_contents($file);
		$attributes = $this->parser->parse($str)->getYAML();

		return new ComponentSchema($component, $attributes);
	}
}