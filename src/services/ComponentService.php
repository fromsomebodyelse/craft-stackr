<?php

namespace fse\stackr\services;

use Craft;

use fse\stackr\Stackr;
use fse\stackr\components\Component;
use fse\stackr\components\ComponentProps;
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

    public static $renderedInstances = [];

    /**
     *
     */
    public function __construct()
    {
        $this->instances = [];
    }

    /**
     * ...
     */
    public static function make(string $name, string $template, string $instanceId, ComponentProps $props)
    {
        $component = new Component($name, $template, $instanceId, $props);
        self::$renderedInstances[$instanceId] = $component;
        return $component;
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
    public function renderComponent(string $file, array $args = []): string
    {

        // Q. Why not make the component and register it here?
        // A. Because you need TWig to compile the definition. duh!

        $template = self::$COMPONENT_PATH . '/' . $file;
        $instanceId = md5(count($this->instances));

        $args['stackr_comp_name'] = $file;
        $args['stackr_comp_file'] = $file;
        $args['stackr_comp_instance_id'] = $instanceId;

        $output = Craft::$app->getView()->renderTemplate($template, $args);

        // Find the first HTML element and append the data attribute
        if (Craft::$app->getConfig()->general->devMode) {
            return $this->appendDebugInfoToComponentString($instanceId, $output, $file, $args);
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
    public function appendDebugInfoToComponentString(string $instanceId, string $html, string $component, array $arguments = [])
    {
        // Store the component's instance information
        $this->instances[$instanceId] = [
            'component' => $component,
            'schema' => $component,
            'arguments' => $arguments,
        ];

        $dataAttrStr = 'data-stackr-component="' . $instanceId . '"';
        $html = preg_replace('/(<\b[^><]*)>/i', '$1 ' . $dataAttrStr . '>', $html, 1);

        return $html;
    }
}
