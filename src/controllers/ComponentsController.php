<?php

namespace fse\stackr\controllers;

use fse\stackr\components\ComponentSchema;
use fse\stackr\Stackr;
use Craft;
use craft\web\Controller;

class ComponentsController extends Controller
{
    protected $allowAnonymous = ['index'];

    public function actionIndex()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $schemas = array_map(function (string $component) {
            return Stackr::$plugin->schema->parseSchema($component)->toArray();
        }, Craft::$app->request->getRequiredBodyParam('components'));

        return $this->asJson(['components' => $schemas]);
    }
}