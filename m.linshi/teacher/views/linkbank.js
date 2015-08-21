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
                    this.back('/teacher/selectbank');
                }
            },
            'tap .next-step': function(e) {
                var $inputEl = $(e.target).closest('.main').find('input');

                if($inputEl) {
                    if(!$inputEl.val()) {
                        sl.tip('请输入正确的银行卡号');
                    } else {
                        this.forward('/teacher/linkbank/' + $inputEl.attr('data-bank') + '/' + $inputEl.val());
                    }
                }
            }
        },
        swipeRightForwardAction: '/teacher/menu',

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

           Scroll.bind($main);

           var bankName = this.route.data.bankName;

           $main.find('input').attr('placeholder', '请输入' + bankName + '卡号(卡号中不能有空格)');

            this.model = new model.ViewModel(this.$el, {
                back: '/teacher/selectbank',
                title: '绑定银行卡',
                bankName: bankName
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
