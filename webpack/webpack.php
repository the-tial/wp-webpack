<?php
/**
 * webpack.php
 *
 * Heart of wp-webpack bundler
 *
 * @package    wp-webpack
 * @author     Jakub Dziwoki <jacob@thetial.com>
 * @copyright  2017 Jakub Dziwoki
 * @license    https://opensource.org/licenses/MIT MIT License
 * @link       https://github.com/the-tial/wp-webpack, https://thetial.com
 */

/**
 * Reads and parses webpack-assets.json
 *
 * @return object stdObject representing webpack-assets.json
 */
function parseWebpackAssets()
{
    $assets = null;
    try {
        $assets = json_decode(file_get_contents(
            dirname(__FILE__)
            . DIRECTORY_SEPARATOR
            . 'webpack-assets.json'
        ));
    } catch (\Exception $ex) {
        return null;
    }

    return $assets;
}

/**
 * Enqueues your styles based on the webpack-assets.json content
 *
 * @param  object $webpackAssets
 * @param  boolean $isProduction
 */
function registerWebpackStyles($webpackAssets, $isProduction)
{
    foreach ($webpackAssets as $name => $value) {
        if (!isset($value->css)) {
            continue;
        }

        $path = $isProduction ? get_template_directory_uri()
            . DIRECTORY_SEPARATOR
            . 'dist'
            . DIRECTORY_SEPARATOR
            . $value->css : $value->css;

        $assetName = 'webpack-' . $name;
        wp_register_style($assetName, $path);
        wp_enqueue_style($assetName);
    }
}

/**
 * Enqueues your scripts based on the webpack-assets.json content
 *
 * @param  object $webpackAssets
 * @param  boolean $isProduction
 */
function registerWebpackScripts($webpackAssets, $isProduction)
{
    foreach ($webpackAssets as $name => $value) {
        if (!isset($value->js)) {
            continue;
        }
        $path = $isProduction ? get_template_directory_uri()
            . DIRECTORY_SEPARATOR
            . 'dist'
            . DIRECTORY_SEPARATOR
            . $value->js : $value->js;

        $assetName = 'webpack-' . $name;
        wp_register_script($assetName, $path);
        wp_enqueue_script($assetName);
    }
}

/**
 * Adds hook to footer action with the wp-webpack error
 */
function displayWpWebpackError()
{
    return add_action('wp_footer', function () {
        echo '<div class="wp-webpack-warning" style="'
            . 'position: absolute; top: 0px; left: 0px; z-index: 100;'
            . 'width: 100%; padding: 10px; background: red; color: #fff'
        . '">'
            . 'wp-webpack couldn\'t parse your webpack assets. Are you running'
            . '\'npm run start\' or have you built your assets?'
            . '<br>Start development or build process and refresh the website'
        . '</div>';
    });
}

/**
 * Initialise wp-webpack. Adds scripts and styles to your header
 */
function initialiseWebpack()
{
    $webpackAssets = parseWebpackAssets();
    $isProduction = isset($webpackAssets->metadata)
        && isset($webpackAssets->metadata)
        && $webpackAssets->metadata->production;

    if ($webpackAssets) {
        add_action('wp_enqueue_scripts', function () use ($webpackAssets, $isProduction) {
            registerWebpackStyles($webpackAssets, $isProduction);
        });
        add_action('wp_enqueue_scripts', function () use ($webpackAssets, $isProduction) {
            registerWebpackScripts($webpackAssets, $isProduction);
        });
    } else {
        displayWpWebpackError();
    }

}

initialiseWebpack();
