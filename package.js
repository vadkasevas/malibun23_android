Package.describe({
    name: 'malibun23:android',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: 'README.md'
});

Npm.depends({
    "sax":"https://github.com/vadkasevas/sax-js/archive/b3f255ffd2fbd867258e13583559c41b4a543813.tar.gz"
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('mongo');
    api.use('ecmascript');
    api.use('underscore');
    api.use('malibun23:stack');
    api.use('aldeed:collection2@2.10.0');
    api.use('underscore');
    api.use('aldeed:simple-schema@1.5.3',['client','server']);

    api.addAssets('server/devices.json','server');

    api.addFiles(['lib/AndroidDevices.js'],['server','client']);
    api.addFiles(['lib/autofill.js'],['server'] );

    api.export(['sax'],'server' );

    api.export(['AndroidDevicesModel','AndroidDevices'],['client', 'server'] );


});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('underscore');
    api.use(['cultofcoders:mocha','practicalmeteor:chai']);
    api.use('malibun23:android');
    api.addFiles('tests/devices.js');
});
