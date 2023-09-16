<?php

namespace fse\stackr\services;

use Craft;
use fse\stackr\Stackr;
use fse\stackr\components\Component;
use fse\stackr\components\ComponentSchema;
use Mni\FrontYAML\Document;
use Mni\FrontYAML\Parser;

class FindComponentsService {

    /** @var Parser The FrontYAML parser instance */
    protected $_parser;

    public function __construct()
    {
        $this->_parser = new Parser(null, null, '{#---', '---#}');
    }

    public function scan()
    {
        $root = dirname(__DIR__) . '/../../templates/_stackr/';
        // $root = dirname(__DIR__) . '/../../templates/_includes/components/';

        $files = glob("$root*.twig");
        $components = ['root' => []];

        foreach ($files as $file) {

            $str = file_get_contents($file);
            $document = $this->_parser->parse($str);

            if (strpos($str, '---#')) {
                $twig = ltrim(substr($str, strpos($str, '---#') + 5));
            } else {
                $twig = ltrim($str);
            }

            $schema = new ComponentSchema(
                array_merge($document->getYAML() ?? [], [
                    'template' => $twig,
                    'file' => $file,
                ])
            );

            array_push($components['root'], new Component($schema->getName(), $schema));
        }

        return $components;
    }

    protected function getDirContents($dir, &$results = array()) {
        $files = scandir($dir);
        foreach ($files as $key => $value) {
            $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
            if (!is_dir($path)) {
                $results[] = $path;
            } else if ($value != "." && $value != "..") {
                $this->getDirContents($path, $results);
                $results[] = $path;
            }
        }

        return $results;
    }
}
