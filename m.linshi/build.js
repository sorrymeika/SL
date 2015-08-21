var framework = '../../wehug_node/';
var build = require(framework + 'core/build');
var fsc = require(framework + 'core/fs');
var path = require('path');

module.exports = function () {
    build(__dirname, 'production', function (config, tools) {
        tools.combine({
            'slan.m': {
                'seajs': framework + 'webresource/js/seajs/sea',
                'zepto': framework + 'webresource/js/zepto',
                'extend/touch': framework + 'webresource/js.m/extend/touch',
                'extend/fx': framework + 'webresource/js/extend/fx',
                'extend/matchMedia': framework + 'webresource/js.m/extend/matchMedia',
                'extend/ortchange': framework + 'webresource/js.m/extend/ortchange',
                'util': framework + 'webresource/js/util',
                'bridge': framework + 'webresource/js.m/bridge',
                'graphics/matrix2d': framework + 'webresource/js/graphics/matrix2d',
                'graphics/tween': framework + 'webresource/js/graphics/tween',
                'core/base': framework + 'webresource/js/core/base',
                'core/promise': framework + 'webresource/js/core/promise',
                'core/linklist': framework + 'webresource/js/core/linklist',
                'core/event': framework + 'webresource/js/core/event',
                'core/view': framework + 'webresource/js/core/view',
                'core/model': framework + 'webresource/js/core/model',
                'core/page': framework + 'webresource/js/core/page',
                'core/route': framework + 'webresource/js/core/route',
                'core/animation': framework + 'webresource/js/core/animation',
                'core/master': framework + 'webresource/js/core/master',
                'core/app': framework + 'webresource/js.m/core/app',
                'core/activity': framework + 'webresource/js.m/core/activity',
                'core/touch': framework + 'webresource/js.m/core/touch',
                'widget/scrollview': framework + 'webresource/js.m/widget/scrollview',
                'widget/scroll': framework + 'webresource/js.m/widget/scroll',
                'widget/slider': framework + 'webresource/js.m/widget/slider',
                'widget/tip': framework + 'webresource/js/widget/tip',
                'widget/dialog': framework + 'webresource/js/widget/dialog',
                'widget/loading': framework + 'webresource/js.m/widget/loading',
                'widget/selector': framework + 'webresource/js.m/widget/selector',
                'widget/extend/loading': './widget/extend/loading',
                'widget/extend/wxshare': './widget/extend/wxshare',
                'anim/default': framework + 'webresource/js.m/anim/default'
            }
        });

        fsc.copy('data', path.join(config.dest, 'data'), function (err, result) { });
    });
};