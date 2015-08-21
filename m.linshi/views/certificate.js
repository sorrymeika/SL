define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/extend/loading');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');

    return Activity.extend({
        events: {},

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            this.swipeRightBackAction = this.route.query.from || '/';

            this.model = new model.ViewModel(this.$el, {
                back: this.swipeRightBackAction,
                title: '认证信息'
            });
        },

        onShow: function () {
            var that = this;
        },

        onDestory: function () {
        }
    });
});
