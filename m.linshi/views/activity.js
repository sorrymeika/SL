define(function(require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/extend/loading');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');

    return Activity.extend({
        events: {
            'tap': function(e) {
                if (e.target == this.el) {
                    this.back('/')
                }
            },
            'tap .js_home': function(e) {
                this.back('/');
            }
        },

        swipeRightBackAction: '/',

        onCreate: function() {
            var self = this;

            var $main = this.$('.main');

            this.model = new model.ViewModel(this.$el, {
                back: '/',
                title: '特惠活动'
            });

            Scroll.bind($main);

            this.loading = new Loading({
                url: '/ad/ad_list',
                params: {
                    postion_id: 8
                },
                check: false,
                $el: this.$el,
                $scroll: $main,
                success: function(res) {
                    if (res.data.length >= 10)
                        res.total = (this.pageIndex + 1) * this.pageSize;

                    self.model.set(res);
                },
                append: function(res) {
                    if (res.data.length >= 10) {
                        res.total = (this.pageIndex + 1) * this.pageSize;
                    }

                    // self.model.get('data').append(res.data);
                }
            });

            this.loading.load();
        },

        onShow: function() {
            var that = this;
        },
        onDestory: function() {}
    });
});