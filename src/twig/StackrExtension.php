<?php

namespace fse\stackr\twig;

use fse\stackr\Stackr;
use fse\stackr\twig\StackrVisitor;
use fse\stackr\twig\StackrTokenParser;

use Craft;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class StackrExtension extends AbstractExtension
{

    public function getName()
    {
        return 'stackr';
    }

    public function getTokenParsers()
    {
        return [new StackrTokenParser()];
    }

    public function getFunctions()
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

   public function getNodeVisitors()
   {
       return [
            new StackrVisitor(),
        ];
   }

   public function renderComponentJs()
   {
        if (!Craft::$app->getConfig()->general->devMode) {
            return '';
        }

        $debugJson = json_encode(
            Stackr::$plugin->components->getInstances(),
        );

        $html = '';
        $html .= '<div id="stackr-root"></div>';
        $html .= '<script type="text/javascript">';
        $html .= '  window.csrfTokenName = "' . Craft::$app->getConfig()->general->csrfTokenName . '";';
        $html .= '  window.csrfTokenValue = "' .  Craft::$app->request->csrfToken . '";';
        $html .= '</script>';
        $html .= '<script type="text/javascript">';
        $html .= '  window.stackrComponents = ' . $debugJson . ';';
        $html .= '</script>';
        $html .= '<script src="' . Craft::$app->getAssetManager()->getPublishedUrl('@fse/stackr/resources/dist/js/stackr.js', true) . '"></script>';
        $html .= '<link href="' . Craft::$app->getAssetManager()->getPublishedUrl('@fse/stackr/resources/dist/css/stackr.css', true) . '" rel="stylesheet">';

        return $html;
   }
}
