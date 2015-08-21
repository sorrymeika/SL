define(function(require, exports, module) {

    var $ = require('$'),
        util = require('util'),
        Activity = require('activity'),
        model = require('core/model');
    var Loading = require('../../widget/extend/loading');

    return Activity.extend({
        toggleAnim: 'menu',
        className: 'menu',
        events: {
            'tap': function(e) {}
        },

        swipeLeftBackAction: '/teacher',

        onCreate: function() {
            var self = this;

            this.model = new model.ViewModel(this.$el, {
                memberUrl: '/teacher/member',
                user_name: '请登录'
            });

            var member = localStorage.getItem('member');
            if (member) {
                this.member = member = JSON.parse(member);

                this.model.set({
                    user_name: member.nick_name,
                    memberUrl: '/member',
                });

                if (!('head_photo' in member)) {
                    this.loading = new Loading({
                        url: '/user/get_member_info',
                        check: false,
                        checkData: false,
                        params: {
                            member_id: member.member_id
                        },
                        $el: this.$el,
                        success: function(res) {
                            member = $.extend(member, res.data);
                            localStorage.setItem('member', JSON.stringify(member));
                            self.model.set({
                                avatars: member.head_photo + '?v=' + localStorage.getItem('photo_ver'),
                                user_name: member.nick_name
                            });
                        }
                    });
                    this.loading.load();
                } else if (member.head_photo)
                    this.model.set({
                        avatars: member.head_photo
                    });
            } else {
                this.model.set({
                    avatars: 'images/head_default.png'
                });
            }
        },

        onShow: function() {
            var self = this;
            if (self.member) {
                self.model.set({
                    avatars: self.member.head_photo + '?v=' + localStorage.getItem('photo_ver')
                });
            }
        },

        onDestory: function() {}
    });
});
