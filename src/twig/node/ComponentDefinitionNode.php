<?php
namespace fse\stackr\twig\node;

use Craft;
use fse\stackr\components\ComponentSchema;
use fse\stackr\Stackr;
use Twig\Compiler as TwigCompiler;
use Twig\Node\Node as TwigNode;
use Twig\Node\Expression\ArrayExpression as TwigExpression;
use Mni\FrontYAML\Parser;

class ComponentDefinitionNode extends TwigNode
{
	protected $parser;

	public function __construct(TwigNode $body, TwigExpression $defaultValueNodes = null, int $line, string $tag = null)
	{
		$nodes = [
			'body' => $body,
		];

		if (!is_null($defaultValueNodes)) {
            $nodes['defaultValues'] = $defaultValueNodes;
        }

		parent::__construct($nodes, [], $line, $tag);
	}

	public function compile(TwigCompiler $compiler)
	{
		// TODO: Get Schema....
		$compiler->addDebugInfo($this);

		if ($this->hasNode('defaultValues')) {
			$compiler->write('$defaultValues = ')->subcompile($this->getNode('defaultValues'))->raw(";\n");
			$compiler->write('$context = array_merge($defaultValues, $context);');
		}

		$compiler->subcompile($this->getNode('body'));
	}
}