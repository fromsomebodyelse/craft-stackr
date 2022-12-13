<?php

namespace fse\stackr;

use Craft;
use craft\base\Plugin;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterTemplateRootsEvent;
use craft\web\UrlManager;
use craft\web\View;
use craft\web\twig\variables\CraftVariable;
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
    public mixed $components;

    /**
     * @var SchemaService
     */
    public mixed $schema;

    /**
     * @inheritdoc
     */
    public bool $hasCpSection = false;

    /**
     * @inheritDoc
     */
    public function init()
    {
        parent::init();

        self::$plugin = $this;

        $this->_registerServices();
        $this->_registerSiteRoutes();
        $this->_registerTwigExtensions();

        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_DEFINE_BEHAVIORS,
            function(Event $e) {
                $e->sender->set('stackrSchema', SchemaService::class);
            }
        );
    }

    /**
     * ...
     */
    private function _registerServices(): void
    {
        $this->components = new ComponentService();
        $this->schema = new SchemaService();
    }

    /**
     * ...
     */
    private function _registerTwigExtensions(): void
    {
        Craft::$app->view->registerTwigExtension(new StackrExtension());
    }

    /**
     * ...
     */
    private function _registerSiteRoutes(): void
    {
        Event::on(UrlManager::class, URLManager::EVENT_REGISTER_CP_URL_RULES,
            function(RegisterUrlRulesEvent $event) {
                $event->rules['stackr'] = 'stackr/inspector/index';
            }
        );
    }
}
