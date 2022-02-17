<?php
namespace fse\stackr;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class StackrAssetBundle extends AssetBundle
{
    public function init()
    {
        // define the path that your publishable resources live
        $this->sourcePath = '@fse/stackr/resources';

        // define the dependencies
        $this->depends = [
            // CpAsset::class,
        ];

        // define the relative path to CSS/JS files that should be registered with the page
        // when this asset bundle is registered
        $this->js = [
            // 'dist/js/stackr.js',
        ];

        $this->css = [
            // 'dist/css/stackr.css',
        ];

        parent::init();
    }
}