<?php
namespace fse\stackr\twig\tokenparser;

use fse\stackr\twig\node\ComponentDefinitionNode;
use Twig\Node\Node as TwigNode;
use Twig\Token as TwigToken;
use Twig\TokenParser\AbstractTokenParser;


class StackrComponentTokenParser extends AbstractTokenParser
{
	private $counter = 0;

	public function getTag()
	{
		return 'stackrComponent';
	}

	//Helpful Links: https://stackoverflow.com/questions/26170727/how-to-create-a-twig-custom-tag-that-executes-a-callback
	public function parse(TwigToken $token)
	{
        $lineNumber = $token->getLine();
		$parser = $this->parser;
        $stream = $parser->getStream();

		$defaultValues = null;

		if ($stream->nextIf(TwigToken::NAME_TYPE, ['props', 'default'])) {
			$defaultValues = $parser->getExpressionParser()->parseExpression();
		}

        $stream->expect(TwigToken::BLOCK_END_TYPE);
        $body = $parser->subparse([$this, 'decideEnd'], true);
        $stream->expect(TwigToken::BLOCK_END_TYPE);

        // pass all parsed data to Node class.
        return new ComponentDefinitionNode($body, $defaultValues, $lineNumber, $this->getTag());
    }

	public function decideEnd(TwigToken $token)
	{
		return $token->test(['endcomponent']);
	}
}
