# Obiba Progress Bar

## Building

1. Run `bower install` to install `jQuery` into `bower_components`
2. Run `npm install -d` to install the grunt modules
3. Run `grunt` to build the concatenated and minified versions in the project root. To run [jshint](http://www.jshint.com) continually on file changes in the `src` directory, run `grunt watch`

## Usage

```javascript
var bar = new $.ObibaProgressBar();
bar.start();
bar.pause();
bar.resume();
bar.inc();
bar.set(25);
```

