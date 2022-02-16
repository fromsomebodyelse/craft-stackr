<?php

namespace fse\stackr\services;

use Craft;

use fse\stackr\Stackr;
use fse\stackr\components\ComponentSchema;

/**
 * Service for rendering and components and maintaining a list of all
 * currently rendered components.
 */
class ComponentService {

    /**
     *
     */
    protected static $COMPONENT_PATH = '_stackr';

    /**
     * @var array;
     */
    public $instances;

    /**
     *
     */
    public function __construct()
    {
        $this->instances = [];
    }

    /**
     *
     */
    public function getInstances()
    {
        return $this->instances;
    }

    public function getFilePath(string $component)
    {
        $templatePath = sprintf('%s/%s/%s.twig',
            Craft::$app->getPath()->getSiteTemplatesPath(),
            self::$COMPONENT_PATH,
            $component
        );

        return  $templatePath;
    }

    /**
     * Renders the specified component with the provided arguments.
     */
    public function renderComponent(string $component, array $arguments = []): string
    {
        $template = self::$COMPONENT_PATH . '/' . $component;
        $output = Craft::$app->getView()->renderTemplate($template, $arguments);

        // Find the first HTML element and append the data attribute
        if (Craft::$app->getConfig()->general->devMode) {
            return $this->appendDebugInfoToComponentString($output, $component, $arguments);
        } else {
            return $output;
        }
    }

    /**
     * Injects the debug information into the component's first HTML
     * element as data attribute.
     *
     * Note: Components that do not have a first HTML element will display
     * incorrectly when using the Stackr Inspector.
     */
    public function appendDebugInfoToComponentString(string $html, string $component, array $arguments = [])
    {
        $instanceId = md5(count($this->instances));

        // Store the component's instance information
        $this->instances[$instanceId] = [
            'component' => $component,
            'arguments' => $arguments,
        ];

        $dataAttrStr = 'data-stackr-component="' . $instanceId . '"';
        $html = preg_replace('/(<\b[^><]*)>/i', '$1 ' . $dataAttrStr . '>', $html, 1);

        return $html;
    }
}
