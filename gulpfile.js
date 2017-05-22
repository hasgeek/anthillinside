
var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = '.';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/{css,fonts,images,js,2017}/*.{js,html,css,png,jpg,gif,svg,ttf}'],
    runtimeCaching: [{
      urlPattern: /^http:\/\/boxoffice\.hasgeek\.com/,
      handler: 'networkOnly'
    },
    {
      urlPattern: /^https:\/\/imgee\.s3\.amazonaws\.com\/imgee/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /^https:\/\/[A-Za-z]+.tile.openstreetmap.org/,
      handler: 'cacheFirst'
    }],
    importScripts: [
      'https://cdn.izooto.com/scripts/workers/fdfd890ac1da81b351a263beea45ae373f16c4ec.js'
    ],
    stripPrefix: rootDir
  }, callback);
});
