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
                    user_name: member.name,
                    user_phone: member.mobile,
                    head_photo: member.head_photo,
                    memberUrl: '/member'
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
