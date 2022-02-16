<?php

namespace fse\stackr\twig;

use fse\stackr\twig\ComponentDefinitionNode;
use Twig\Node\Expression\FunctionExpression as TwigFunctionExpression;
use Twig\Node\Node as TwigNode;
use Twig\Node\ModuleNode as TwigModuleNode;
use Twig\Environment as TwigEnvironment;
use Twig\NodeVisitor\NodeVisitorInterface as TwigNodeVisitorInterface;


// https://kriswallsmith.net/post/15421960092/twig-node-visitors-part-2

class StackrVisitor implements TwigNodeVisitorInterface
{
    public $components = [];

    public function enterNode(TwigNode $node, TwigEnvironment $env)
    {
        return $node;
    }

    public function leaveNode(TwigNode $node, TwigEnvironment $env)
    {
        // TODO: read the register for all registered components!
        return $node;
    }

    public function getPriority() {
        return 10;
    }
}