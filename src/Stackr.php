<?php

namespace fse\stackr;

use Craft;
use craft\base\Plugin;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterTemplateRootsEvent;
use craft\web\UrlManager;
use craft\web\View;
use fse\stackr\twig\StackrExtension;
use fse\stackr\services\ComponentService;
use fse\stackr\services\SchemaService;
use yii\base\Event;

class Stackr extends Plugin
{
    /**
     * @var Stackr
     */
    public static $plugin;

    /**
     * @var ComponentService
     */
    public $components;

        /**
     * @var SchemaService
     */
    public $schema;

    public $hasCpSection = true;

    public function init()
    {
        parent::init();

        self::$plugin = $this;


        $this->_registerServices();
        $this->_registerSiteRoutes();
        $this->_registerTwigExtensions();
    }

    /**
     * ...
     */
    private function _registerServices()
    {
        $this->components = new ComponentService();
        $this->schema = new SchemaService();
        return $this;
    }

    /**
     * ...
     */
    private function _registerTwigExtensions()
    {
        if (Craft::$app->request->getIsSiteRequest()) {
            Craft::$app->view->registerTwigExtension(new StackrExtension());
        }

        return $this;
    }

    /**
     * Registers CP routes.
     */
    private function _registerSiteRoutes()
    {
        Event::on(UrlManager::class, URLManager::EVENT_REGISTER_CP_URL_RULES,
            function(RegisterUrlRulesEvent $event) {
                $event->rules['stackr'] = 'stackr/inspector/index';
                $event->rules['POST stackr/components'] = 'stackr/components/index';
            }
        );

        return $this;
    }

}
