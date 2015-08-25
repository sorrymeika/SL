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

            this.model = new model.ViewModel(this.$el, {
                back: '/teacher',
                title: '钱包管理'
            });

            self.$slider = self.$('.js_slider');

            this.loading = new Loading({
                url: '/m/finance',
                check: false,
                checkData: false,
                $el: self.$slider,
                success: function(res) {
                    if (res.code !== 40000) {
                        sl.tip(res.msg);
                        return;
                    }
                    self.model.set(res.data);

                    self.statementsRequest.setParam({
                        member: member.member_id,
                        teacher: member.teacher_id,
                        page: 1,
                        per_page: 10
                    }).load();
                }
            });

            this.statementsRequest = new Loading({
                url: '/m/log',
                params: {
                    page: 1,
                    per_page: 10
                },
                check: false,
                checkData: false,
                $el: self.$slider,
                $scroll: $main,
                success: function(res) {
                    if (res.code !== 40000) {
                        sl.tip(res.msg);
                        return;
                    }
                    if (!res.data) {
                        this.dataNotFound();
                    }
                    self.model.set(res);
                },
                append: function(res) {
                    //
                    self.model.get('data').append(res.data);
                }
            });

            var member = Utility.getCurrentMember();
            if (member) {
                this.member = member;

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
