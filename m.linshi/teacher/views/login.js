define(function(require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../../widget/extend/loading');
    var model = require('core/model');
    var Scroll = require('../../widget/scroll');
    var animation = require('animation');
    var bridge = require('bridge');
    var Utility = require('../common/utils');

    return Activity.extend({
        events: {
            'tap .js_bind:not(.disabled)': function() {
                var mobile = this.model.get('mobile');
                var password = this.model.get('password');

                if (!mobile || !util.validateMobile(mobile)) {
                    sl.tip('请输入正确的手机');
                    return;
                }
                if (!password) {
                    sl.tip('请输入验证码');
                    return;
                }

                this.loading.setParam({
                    mobile: mobile,
                    code: password,
                }).load();
            },
            'tap .js_valid:not(.disabled)': function(e) {
                var mobile = this.model.get('mobile');
                if (!mobile || !util.validateMobile(mobile)) {
                    sl.tip('请输入正确的手机');
                    return;
                }

                this.$valid.addClass('disabled');
                this.valid.setParam({
                    mobile: this.model.data.mobile
                });
                this.valid.load();
            }
        },

        validTimeout: function() {
            var self = this;
            var sec = localStorage.getItem('valid_time');

            if (sec && parseInt(sec) > 60) {
                sec = Math.round((new Date(parseInt(sec)).getTime() - Date.now()) / 1000);

                if (sec <= 0) return;

                self.$valid.addClass('disabled');

                setTimeout(function() {
                    if (sec <= 0) {
                        self.$valid.removeClass('disabled');
                        self.model.set('valid', '获取验证码');
                        localStorage.removeItem('valid_time');

                    } else {
                        self.model.set('valid', sec + '秒');
                        sec--;
                        setTimeout(arguments.callee, 1000);
                    }
                }, 1000);
            }
        },

        onCreate: function() {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            this.model = new model.ViewModel(this.$el, {
                title: '快速登录 / 注册',
                valid: '获取验证码',
                back: this.route.queries.from || '/teacher'
            });

            this.loading = new Loading({
                url: '/t/login',
                method: 'POST',
                check: false,
                params: {
                    longitude: 0,
                    latitudes: 0,
                    type: 6
                },
                checkData: false,
                $el: this.$el,
                xhrFields: {
                    withCredentials: true
                },
                success: function(res) {
                    if (res.code != 40000)
                        sl.tip(res.msg);
                    else {
                        var member = {
                            mobile: self.model.data.mobile,
                            member_id: res.data.member,
                            teacher_id: res.data.teacher,
                            name: res.data.name,
                            head_photo: res.data.headphoto,
                            isNew: res.data.isNew
                        };

                        Utility.setCurrentMember('currentMember', JSON.stringify(member));

                        self.back(self.route.queries.success || '/');

                    }
                },
                error: function(res) {
                    sl.tip(res.msg);
                }
            });

            this.valid = new Loading({
                url: '/t/code',
                method: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                params: {
                    mobile: self.model.data.mobile
                },
                check: false,
                checkData: false,
                $el: this.$el,
                success: function(res) {
                    if (res.code !== 40000) {
                        sl.tip(res.msg);
                    } else {
                        localStorage.setItem('valid_time', Date.now() + 60000);

                        self.validTimeout();
                    }
                }
            });

            self.$valid = this.$('.js_valid');
            self.validTimeout();
        },

        onShow: function() {
            var that = this;

            this.$el.css({
                background: 'rgba(0,0,0,.5)'
            });
        },

        onDestory: function() {}
    });
});
