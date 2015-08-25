define(function(require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('widget/extend/loading');
    var Slider = require('widget/slider');
    var model = require('core/model');
    var Scroll = require('widget/scroll');
    var animation = require('animation');
    var Utility = require('../common/utils');

    return Activity.extend({
        events: {
            'tap': function(e) {
                if (e.target == this.el) {
                    this.back('/teacher');
                }
            }
        },

        swipeRightForwardAction: '/teacher/menu',

        onCreate: function() {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            model.Filter.checkReadStatus = function(status) {
                return status ? '' : 'icon-unread';
            };

            this.model = new model.ViewModel(this.$el, {
                back: '/teacher',
                title: '消息'
            });

            self.$slider = self.$('.js_slider');

            var member = Utility.getCurrentMember();
            if (member) {
                this.member = member;

                this.messageRequest = new Loading({
                    url: '/m/mlist',
                    params: {
                        member: member.member_id,
                        teacher: member.teacher_id
                    },
                    check: false,
                    checkData: false,
                    $el: self.$slider,
                    success: function(res) {
                        if (res.code !== 40000) {
                            sl.tip(res.msg);
                            return;
                        }
                        self.model.set(res);
                    }
                });
                this.messageRequest.load();
            }

        },

        onShow: function() {
            var that = this;
        },

        onDestory: function() {}
    });
});
