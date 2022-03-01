<?php

namespace fse\stackr\controllers;

use Craft;
use craft\web\Controller;
use craft\web\View;
use craft\helpers\UrlHelper;
use fse\stackr\StackrAssetBundle;
use yii\web\Response;

class InspectorController extends Controller
{
    public function actionIndex(): Response
    {
        $this->view->registerAssetBundle(StackrAssetBundle::class);

        $variables = [
            'files' => [
                'stackr-inspector.js' => Craft::$app->getAssetManager()->getPublishedUrl('@fse/stackr/resources/dist/js/stackr-inspector.js', true),
                'stackr-inspector.css' => Craft::$app->getAssetManager()->getPublishedUrl('@fse/stackr/resources/dist/css/stackr-inspector.css', true),
            ],
            'token' => [
                'name' => Craft::$app->getConfig()->general->csrfTokenName,
                'value' => Craft::$app->request->csrfToken,
            ],
        ];

        return $this->renderTemplate('stackr/inspector', $variables, View::TEMPLATE_MODE_CP);
    }
}