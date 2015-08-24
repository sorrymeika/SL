define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('widget/extend/loading');
    var Slider = require('widget/slider');
    var model = require('core/model');
    var Scroll = require('widget/scroll');
    var animation = require('animation');

    return Activity.extend({
        events: {
            'tap': function (e) {
                if (e.target == this.el) {
                    this.back('/teacher');
                }
            }
        },
        swipeRightForwardAction: '/teacher/menu',

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

           Scroll.bind($main);

            this.model = new model.ViewModel(this.$el, {
                back: '/teacher',
                title: '教学反馈'
            });

            self.$slider = self.$('.js_slider');

            this.loading = new Loading({
                url: '/ad/ad_list',
                params: {
                    postion_id: 1
                },
                check: false,
                checkData: false,
                $el: self.$slider,
                success: function (res) {
                    self.slider = new Slider(self.$slider, {
                       // autoLoop: 4000,
                        itemTemplate: '<a href="<%=url%>"><img src="<%=pic%>"></a>',
                        data: res.data,
                        loop: true
                    });
                }
            });
            this.loading.load();
        },

        onShow: function () {
            var that = this;
        },

        onDestory: function () {
        }
    });
});
