define(function(require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('widget/extend/teacherloading');
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
            },
            'tap .send-note': function(e) {
                var $group = $(e.target).closest('.feedback-item').find('.resp-group');
                $group.animate({
                    display: 'block'
                }, {
                    duration: 1000,
                    easing: 'ease-out',
                    complete: function() {

                    }
                });

                this.type = 1;
            },
            'tap .homework': function(e) {
                $(e.target).closest('.feedback-item').find('.resp-group').toggle(500);
                this.type = 2;
            },
            'tap .submit-btn': function(e) {

                if (!this.model.get('content')) {
                    sl.tip('请输入需要反馈的内容.');
                    return;
                }

                var $root = $(e.target).closest('.feedback-item');

                var studentId = $root.attr('data-student-id');
                if (!studentId) {
                    return;
                }

                var code = $(e.target).attr("data-code-id");
                if (!code) {
                    return;
                }                

                this.request.setParam({
                    member: this.memberId,
                    teacher: this.teacherId,
                    type: this.type,
                    content: this.model.get('content'),
                    student: studentId,
                    code: code
                }).load();
            }
        },
        swipeRightForwardAction: '/teacher/menu',

        onCreate: function() {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main, {
                //useScroll: true,
                refresh: function (resolve, reject) {
                    self.loading.reload({
                        showLoading: false
                    }, function (err, data) {
                        if (err) reject(err)
                        else resolve(data);
                    });
                }
            });

            model.Filter.checkNote = function(value) {
                if(value === 1) {
                    return "send-note handled";
                } else {
                    return "send-note";
                }
            };

            model.Filter.checkHomework = function(value) {
                if(value === 1) {
                    return "homework handled";
                } else {
                    return "homework";
                }
            };

            this.model = new model.ViewModel(this.$el, {
                back: '/teacher',
                title: '教学反馈'
            });

            self.$slider = self.$('.js_slider');

            var member = Utility.getCurrentMember();
            if (member) {
                this.member = member;
                var memberId = this.memberId = member.member_id;
                var teacherId = this.teacherId = member.teacher_id;

                this.loading = new Loading({
                    url: '/m/slist',
                    params: {
                        member: memberId,
                        teacher: teacherId
                    },
                    pageSize: 5,
                    check: false,
                    checkData: false,
                    $content: $main.children(":first-child"),
                    $scroll: $main,
                    $el: self.$slider,
                    success: function(res) {
                        res.total = res.data.total;
                        self.model.set(res);
                    },
                    append: function(res) {
                        res.total = res.data.total;
                        self.model.get('info').append(res.data);
                    }
                });

                this.createRequest();

                this.loading.load();
            }
        },

        createRequest: function() {
            this.request = new Loading({
                url: '/m/fsave',
                check: false,
                checkData: false,
                $el: this.$slider,
                success: function(res) {
                    if (res.code !== 40000) {
                        sl.tip(res.msg);
                        return;
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
