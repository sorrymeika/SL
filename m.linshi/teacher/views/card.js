define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('widget/extend/teacherloading');
    var Slider = require('widget/slider');
    var model = require('core/model');
    var Scroll = require('widget/scroll');
    var animation = require('animation');

    return Activity.extend({
        events: {},
        swipeRightBackAction: '/teacher',

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            this.model = new model.ViewModel(this.$el, {
                back: '/teacher',
                title: '我的名片'
            });

            var member = localStorage.getItem('member');
            if (member) {
                this.member = member = JSON.parse(member);

                this.loading = new Loading({
                    url: '/m/slist',
                    params: {
                        member: member.member_id,
                        teacher: member.teacher_id
                    },
                    check: false,
                    checkData: false,
                    $content: $main.children(":first-child"),
                    $el: self.$slider,
                    success: function (res) {
                        if (!res.data || !res.data.info || !res.data.info.length) {
                            this.dataNotFound();

                        } else if (res.data.info.length >= 10)
                            res.total = (this.page + 1) * this.per_page;

                        self.model.set(res);
                    },
                    append: function (res) {
                        if (res.data.info.length >= 10) {
                            res.total = (this.page + 1) * this.per_page;
                        }
                        self.model.get('info').append(res.data);
                    }
                });
                this.loading.load();
            }

        },

        onShow: function () {
            var that = this;
        },

        onDestory: function () { }
    });
});
