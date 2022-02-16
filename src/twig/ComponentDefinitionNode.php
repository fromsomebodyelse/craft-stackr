<?php
namespace fse\stackr\twig;

use Craft;
use fse\stackr\components\ComponentSchema;
use fse\stackr\Stackr;
use Twig\Compiler as TwigCompiler;
use Twig\Node\Node as TwigNode;
use Mni\FrontYAML\Parser;

class ComponentDefinitionNode extends TwigNode
{
	protected $parser;

	public function __construct(TwigNode $body, int $line, string $tag = null)
	{
		parent::__construct(['body' => $body], [], $line, $tag);
	}

	public function compile(TwigCompiler $compiler)
	{
		// TODO: Get Schema....
		$compiler
			->addDebugInfo($this)
			->subcompile($this->getNode('body'));
	}
}