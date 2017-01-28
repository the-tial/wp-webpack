# wp-webpack
The extraordinary Wordpress theme's starter boilerplate that:
* Helps you to write better, lighter and more modern frontend code
* Is ultra fast. Implements hot reloading to your workflow and speeds up the development.
* Leaves you full freedom in decisions for the PHP structure, JavasScript version. It won't lament if you decide to import CDN JS library directly to your Wordpress header.
* Brings you the possibility to write es2017. You are free to ignore it, though.
* Has almost no footprint. There is the defined assets directory structure but believe there are good reasons for this.

# How to setup?
Copy ```source_assets```, ```dist``` and ```webpack``` directories.

Navigate in the terminal to the source_assets and install required node_modules:
```
npm install
```

Add the small PHP helper to your functions.php file:
```
require('webpack/webpack.php');
```

## I'm starting from scratch
That's all. Check the example and start writing code

## I have existing project
Move your images and fonts to ```dist/resources```

Move the JavaScript files to source_assets/js. If you haven't used the NPM before, think about including your vendor dependencies in the ```package.json``` file.

CSS, SASS or SCSS should be in the styles directory. Use imports to resolve dependencies. You need to alter resources paths relatively to ```dist/resources``` folder

# How to run?
## Development
To start development navigate in the terminal to your ```source_assets``` directory and run:
```
npm run start
```

## Before going to production
When you are ready to move your files to stage or production environment stop the development process and run:
```
npm run build
```

You should see new CSS and js files in the ```dist``` directory. Copy your theme to production. Voilà!

Oh, you don't need to copy ```source_assets``` directory. Omitting i.e. ```node_modules```  saves time and production resources. Isn't that sweet?

# How it works
Webpack2 is the brilliant bundler for frontend assets. Together with the webpack-dev-server they create the pair that every frontend developer should consider in their work.

## Development
During the development, Webpack bundles your styles and JavaScripts into the single file. But the file is never saved to your filesystem.

Instead, webpack-dev-server exposes it on port 8080. If you look closely to ```source_assets/webpack-assets.json``` you can notice the script's full path.

So how does the Wordpress know which file to import?
After you include ```webpack/webpack.php``` in your ```functions.php```, Wordpress reads ```webpack-assets.json``` and enqueue required resources.

## Production
Webpack splits the CSS and JavaScript bundle and places them in ```dist``` folder. The file ```source_assets/webpack-assets.json``` contains updated paths, so please be sure that you don't start dev process before moving the assets to production.

# The reasons behind directory structure
* ```dist``` - this folder contains all your frontend assets
* ```webpack``` - this folder contains Wordpress little PHP helper and the config file.
* ```source_assets``` - this is your development playground. This folder is not required in production environments. That's why it needs to be separate to ```dist``` and ```webpack``` diectories.

# I want to use es2017 JavaScript
I love to hear it! Just a polite reminder, browsers don't support es2017. Babel needs to transpile your code to the es5 standard first. At the end, your library will swell with extra polyfills. Size difference is huge for small projects.

However tempting it is. Always consider if the es2017 will improve the code readability enough to justify extra file size. This is the truth for all frontend projects. And I'm pretty sure you're aware of it.

## Setup
Rename ```.eslintrc``` to ```.es5.eslintrc```
Rename ```.es2017.eslintrc``` to ```.eslintrc```
If you're using example project replace ```require('./example');``` with the ```require('./es2017.example');``` in the ```source_assets/js/index.js```

## Process
The workflow is the same as for es5.
Execute ```npm run start.es2017``` or ```npm run build.es2017```

# Guidelines
* add ```dist/*.js``` and ```dist/*.css``` to your ```.gitignore```
* deregister wordpress jQuery. Check ```example_php/example.php``` how to do this
