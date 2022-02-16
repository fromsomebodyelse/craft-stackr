<?php
namespace fse\stackr\twig;

use fse\stackr\twig\ComponentDefinitionNode;
use Twig\Node\Node as TwigNode;
use Twig\Token as TwigToken;
use Twig\TokenParser\AbstractTokenParser;


class StackrTokenParser extends AbstractTokenParser
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

        $stream->expect(TwigToken::BLOCK_END_TYPE);
        $body = $parser->subparse([$this, 'decideEnd'], true);
        $stream->expect(TwigToken::BLOCK_END_TYPE);

        // pass all parsed data to Node class.
        return new ComponentDefinitionNode($body, $lineNumber, $this->getTag());
    }

	public function decideEnd(TwigToken $token)
	{
		return $token->test(['endcomponent']);
	}
}
