<?php

class Renderer
{

    private $nodePath;
    private $v8;

    /**
     * @param string $nodeModulesPath
     * @return void
     */
    public function __construct($nodeModulesPath)
    {
        $this->nodePath = $nodeModulesPath;
        $this->v8 = new V8Js();
    }

    /**
     * @param string $entryPoint
     * @param array $data
     */
    public function render($entryPoint, array $data)
    {
        $state = json_encode($data);
        $app = file_get_contents($entryPoint);

        $this->setupVueRenderer();
        $this->v8->executeString("var __PRELOAD_STATE__ = ${state}; this.global.__PRELOAD_STATE__ = __PRELOAD_STATE__;");
        $this->v8->executeString($app);
    }

    private function setupVueRenderer()
    {
        $prepareCode = 'var process={env:{VUE_ENV:"server",NODE_ENV:"production"}};this.global={process:process};';
        $vueSource = file_get_contents($this->nodePath . 'vue/dist/vue.js');
        $rendererSource = file_get_contents($this->nodePath . 'vue-server-renderer/basic.js');

        $this->v8->executeString($prepareCode);
        $this->v8->executeString($vueSource);
        $this->v8->executeString($rendererSource);
    }
}
