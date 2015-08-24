define(function(require, exports, module) {

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
            'tap': function(e) {
                if (e.target == this.el) {
                    this.back('/teacher');
                }
            },
            'tap .head_menu': function(e) {
                this.forward('/teacher/menu');
            }
        },

        swipeRightForwardAction: '/teacher/menu',

        onCreate: function() {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

              model.Filter.formatPercent = function(value) {
                var tmp = value * 100, v = xround(tmp, 2);
                return value > 0 && value < 1 && typeof value === 'number' ? (v + '%') : '0%';
            };

            this.model = new model.ViewModel(this.$el, {
                ico: 'head_menu',
                title: '邻师老师',
                studentNums: 0,
                classHours: 0,
                praise: 0,
                percent: 0,
                courseCount: 0,
                feedbackCount: 0
            });

            self.$slider = self.$('.js_slider');

            function xround(x, num) {
                return Math.round(x * Math.pow(10, num)) / Math.pow(10, num);
            }

            this.loading = new Loading({
                url: '/m/index',
                check: false,
                checkData: false,
                $el: self.$slider,
                success: function(res) {
                    // self.slider = new Slider(self.$slider, {
                    //     // autoLoop: 4000,
                    //     itemTemplate: '<a href="<%=url%>"><img src="<%=pic%>"></a>',
                    //     data: res.data,
                    //     loop: true
                    // });
                    self.model.set(res.data);
                }
            });

            var member = localStorage.getItem('member');
            if (member) {
                this.member = member = JSON.parse(member);

                this.loading.setParam({
                    member: member.member_id,
                    teacher: member.teacher_id
                }).load();
            }

        },

        onShow: function() {
            var that = this;
        },

        onDestory: function() {}
    });
});
