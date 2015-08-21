define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/extend/loading');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');


    return Activity.extend({
        events: {
            'tap .js_pay:not(.disabled)': function () {
                var data = this.model.data.data;

                location.href = 'http://' + (sl.isDebug ? 'front' : 'www') + '.linshi.biz/alipay/index?out_trade_no=' + data.order_code + "&return=" + encodeURIComponent(this.route.query.show) + "&show=" + encodeURIComponent(this.route.query.show);
            }
        },
        swipeRightBackAction: '/',

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            var orderInfo = util.store('orderInfo');

            this.swipeRightBackAction = this.route.queries.from || '/';

            self.model = new model.ViewModel(this.$el, {
                back: this.route.queries.from || '/',
                title: '订单支付',
                data: orderInfo
            });
        },

        onShow: function () {
            var self = this;
        },

        onDestory: function () {
        }
    });
});
