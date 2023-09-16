<?php
namespace fse\stackr\twig\node;

use Craft;
use fse\stackr\components\ComponentSchema;
use fse\stackr\Stackr;
use Twig\Compiler as TwigCompiler;
use Twig\Node\Node as TwigNode;
use Twig\Node\Expression\ArrayExpression as TwigExpression;
use Mni\FrontYAML\Parser;

class StackrRowNode extends TwigNode
{
	public function __construct(TwigNode $body, int $line, string $tag = null)
	{
		parent::__construct(['body' => $body], [], $line, $tag);
	}

	public function compile(TwigCompiler $compiler)
	{
		$compiler->addDebugInfo($this);
		$compiler->subcompile($this->getNode('body'));
	}
}