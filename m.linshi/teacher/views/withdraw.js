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
                    this.back('/teacher/selectbank');
                }
            },
            'tap .confirm-btn': function(e) {

                var money = this.model.get('money');
                if (!money) {
                    sl.tip('请输入提现金额');
                    return;
                }

                var member = Utility.getCurrentMember();
                if (member) {
                    this.member = member;

                    this.withdrawRequest.setParam({
                        member: member.member_id,
                        teacher: member.teacher_id,
                        money: money
                    }).load();
                }
            }
        },
        swipeRightForwardAction: '/teacher/menu',

        onCreate: function() {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            this.model = new model.ViewModel(this.$el, {
                back: '/teacher/selectbank',
                title: '提现',
                cardNo: self.route.data.cardNo
            });

            self.$slider = self.$('.js_slider');

            this.withdrawRequest = new Loading({
                url: '/m/dowithdraw',
                check: false,
                checkData: false,
                $el: self.$slider,
                success: function(res) {
                    if (res.code !== 40000) {
                        sl.tip(res.msg);
                        return;
                    } else {
                        sl.tip(res.msg);
                        self.forward('/teacher/wallet');
                    }
                }
            });
        },

        onShow: function() {
            var that = this;
        },

        onDestory: function() {}
    });
});
