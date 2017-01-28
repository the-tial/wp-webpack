<?php
require('Parserdown.php');

/**
 * Reads and parses markdown from the README.md
 *
 * @return string the html result of markdown
 */
function parseReadme()
{
    $Parsedown = new Parsedown();
    return $Parsedown->text(file_get_contents(dirname(__FILE__) . '/../README.md'));
}

/**
 * TODO Decide what to do with jQuery that is provided by WordPress
 * You probably going to put the jQuery in your bundle.
 * Loading the same library twice doesn't make much sense.
 * Anyway, the decision is yours
 */
add_action('wp_enqueue_scripts', function () use ($webpackAssets, $isProduction) {
    wp_deregister_script('jquery');
});
