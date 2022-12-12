<?php

namespace fse\stackr\twig;

use fse\stackr\Stackr;
use fse\stackr\services\ComponentService;
use fse\stackr\twig\tokenparser\StackrComponentTokenParser;

use Craft;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class StackrExtension extends AbstractExtension
{

    public function getName(): string
    {
        return 'stackr';
    }

    public function getTokenParsers(): array
    {
        return [
            new StackrComponentTokenParser(),
        ];
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('stackr',
                [Stackr::$plugin->components, 'renderComponent'], ['is_safe' => ['html']],
            ),
            new TwigFunction('stackrjs',
                [$this, 'renderComponentJs'], ['is_safe' => ['html']]
            ),
        ];
    }

    public function renderComponentJs(): string
    {
        if (!Craft::$app->getConfig()->general->devMode) {
            return '';
        }

        $html = '<a href="/admin/stackr?url=' . Craft::$app->request->getUrl() .'" style="bg-color: red; padding: 10px; position: fixed; bottom: 0; right: 0; z-index: 999">#</a>';
        $html .= '<script type="text/javascript">';
        $html .= '  window.stackrComponents = ' . json_encode(ComponentService::$renderedInstances) . ';';
        $html .= '</script>';
        $html .= '<link href="' . Craft::$app->getAssetManager()->getPublishedUrl('@fse/stackr/resources/dist/css/host.css', true) . '" rel="stylesheet">';
        $html .= '<script src="' . Craft::$app->getAssetManager()->getPublishedUrl('@fse/stackr/resources/dist/js/host.js', true) . '"></script>';

        return $html;
    }
}
