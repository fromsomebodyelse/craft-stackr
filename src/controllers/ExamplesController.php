<?php

namespace fse\stackr\controllers;

use craft\web\View;
use fse\stackr\components\ComponentSchema;
use fse\stackr\Stackr;
use Craft;
use craft\web\Controller;

class ExamplesController extends Controller
{
    protected $allowAnonymous = ['index'];

    public function actionIndex()
    {
        $schema = Stackr::$plugin->schema->parseSchema(Craft::$app->getRequest()->getQueryParam('c'));

        return $this->renderTemplate('stackr/example', [
            'component' => Craft::$app->getRequest()->getQueryParam('c'),
            'schema' => $schema,
        ], View::TEMPLATE_MODE_CP);
    }
}