<?php

namespace fse\stackr\components;

use JsonSerializable;
use fse\stackr\components\ComponentProps;

class Component implements JsonSerializable {

    private $props;

    private $instanceId;

    private $name;

    private $template;

    public function __construct(string $name, string $template, string $instanceId, ComponentProps $props = null)
    {
        $this->name = $name;
        $this->instanceId = $instanceId;
        $this->props = $props;
        $this->template = $template;
    }

    public function getProps():ComponentProps
    {
        return $this->props;
    }

    public function jsonSerialize(): mixed
    {
        return [
            'instanceId' => $this->instanceId,
            'name' => $this->name,
            'description' => 'TODO!',
            'template' => $this->template,
            'props' => $this->props,
        ];
    }
}
