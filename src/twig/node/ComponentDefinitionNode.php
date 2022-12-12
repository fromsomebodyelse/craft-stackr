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

	protected $componentName;

	public function __construct(?string $name, TwigExpression $props = null, TwigNode $body, int $line, string $tag = null)
	{
		$nodes = ['body' => $body];

		if (!is_null($props)) {
            $nodes['props'] = $props;
        }

		$this->componentName = $name;

		parent::__construct($nodes, [], $line, $tag);
	}

	public function compile(TwigCompiler $compiler)
	{
		$compiler->addDebugInfo($this);

		if (!is_null($this->componentName)) {
			$compiler->write('$context["stackr_comp_name"] = "' . $this->componentName)->raw("\";\n");
		}

		if ($this->hasNode('props')) {
			$compiler->write('$propsObj = ')->subcompile($this->getNode('props'))->raw(";\n");
			$compiler->write('$props = new fse\stackr\components\ComponentProps($propsObj, $context)')->raw(";\n");
		} else {
			$compiler->write('$props = new fse\stackr\components\ComponentProps()')->raw(";\n");
		}

		// Create the component
		$compiler->write('$stackrComponent = fse\stackr\services\ComponentService::make(
			$context["stackr_comp_name"],
			$context["stackr_comp_file"],
			$context["stackr_comp_instance_id"],
			$props
		)')->raw(";\n");

		// Populate the context with the defined props (includes default props).
		$compiler->write('$context = array_merge($props->getValues(), $context);')->raw(";\n");

		// Provide helper var for accessing the component's ComponentProps
		$compiler->write('$context["props"] = $props')->raw(";\n");

		$compiler->subcompile($this->getNode('body'));
	}
}