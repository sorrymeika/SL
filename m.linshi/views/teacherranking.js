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
                    this.back('/');
                }
            },
            'tap [sn-repeat-name^="data"][data-id]': function(e) {
                if (e.currentTarget.getAttribute('data-id')) {
                    //跳转到详情页，同时传递当前页面route
                    this.forward('/teacher/' + e.currentTarget.getAttribute('data-id') + '?from=' + this.route.url);
                }
            },
            'tap .js_home': function(e) {
                if (sl.isInApp) {
                    //当m站在app客户端里，使用alert方式调用app本地接口
                    alert("linshi://" + JSON.stringify({
                        method: 'back'
                    }));
                } else {
                    this.back('/');
                }
            },
            'tap .more-teachers': function(e) {
                this.forward('/index?from=' + this.route.url);
            }
        },

        swipeRightBackAction: '/',

        onCreate: function() {
            var self = this;

            var $main = this.$('.main');

            this.model = new model.ViewModel(this.$el, {
                back: '/',
                title: '排行榜'
            });

            Scroll.bind($main);

            this.loading = new Loading({
                url: '/teacher/teacher_top',
                check: false,
                checkData: false,
                $el: this.$el,
                $scroll: $main,
                success: function(res) {
                    //
                    self.model.set(res);
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
