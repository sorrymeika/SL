define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('widget/extend/loading');
    var Slider = require('widget/slider');
    var model = require('core/model');
    var Scroll = require('widget/scroll');
    var Selector = require('widget/selector');
    var animation = require('animation');
    var Utility = require('../common/utils');

    return Activity.extend({
        events: {
            'tap': function (e) {
                if (e.target == this.el) {
                    this.back('/teacher/selectbank');
                }
            },
            'tap .select-bank-link': function(e) {
                $(e.target).prev().trigger('tap');
            },
            'tap .bind-btn': function(e) {

                var _mobile = this.model.get('mobile');
                if (!_mobile || !util.validateMobile(_mobile)) {
                    sl.tip('请输入正确的手机');
                    return;
                }

                if(!this.model.get('name')) {
                    sl.tip('请输入您的姓名');
                    return;
                }

                if(!this.model.get('city')) {
                    sl.tip('请选择您的开户行所在城市');
                    return;
                }

                if(!this.model.get('code')) {
                    sl.tip('请输入正确的验证码');
                    return;
                }

                // if(!this.bankName) {
                //     return;
                // }
                var member = Utility.getCurrentMember();
                var basicBankInfo = this.basicBankInfo = {
                    member: member.member_id,
                    teacher: member.teacher_id,
                    name: this.model.get('name'),
                    bank: this.route.data.bankName,
                    card: this.route.data.cardNo,
                    city: this.model.get('city'),
                    code: this.model.get('code')
                };
                this.bindBankRequest.setParam(basicBankInfo).load();
                
            },
            'tap .req-sms': function(e) {

                var self = this, sec = 60, $smsAlert = $(e.target);

                var _mobile = this.model.get('mobile');
                if (!_mobile || !util.validateMobile(_mobile)) {
                    sl.tip('请输入正确的手机');
                    return;
                }

                $smsAlert.addClass('disabled');
                this.smsRequest.setParam({
                    mobile: _mobile
                });
                this.smsRequest.load();

                setTimeout(function() {
                    if (sec <= 0) {
                        $smsAlert.removeClass('disabled');
                        self.model.set('smsAlertText', '获取验证码');
                        //localStorage.removeItem('valid_time');

                    } else {
                        self.model.set('smsAlertText', sec + '秒');
                        sec--;
                        setTimeout(arguments.callee, 1000);
                    }
                }, 1000);
            }
        },
        swipeRightForwardAction: '/teacher/menu',

        bindSelector: function (name, data) {
            var self = this, selector;

            this.listen('tap [name="' + name + '"]', function (e) {
                this.selectors[e.currentTarget.name].show();
            });

            selector = this.selectors[name] = new Selector({
                options: {
                    data: data
                },
                complete: function (res) {
                    res = res[0];
                    self.model.set(name, res.text).set(name + 'id', res.value);
                }
            });

            this.bindQueryAction(name, selector, {
                show: 'show',
                "": 'hide'
            });
        },

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

           Scroll.bind($main);

           var bankName = this.route.data.bankName;
           var cardNo = this.route.data.cardNo;

           var bankClassMap = {
                '招商银行': 'cmb-bank',
                '中国工商银行': 'icbc-bank',
                '中国建设银行': 'ccb-bank',
                '中国农业银行': 'abc-bank',
                '中国银行': 'boc-bank',
                '浦发银行': 'spdb-bank',
                '兴业银行': 'cib-bank',
                '华夏银行': 'hxb-bank'
           };

           var _smsAlertText = '获取验证码';

           var _bankClass = bankClassMap[bankName];

            this.model = new model.ViewModel(this.$el, {
                back: '/teacher/selectbank',
                title: '绑定银行卡',
                bankInfo: {bankName: bankName, cardNo: cardNo, bankClass: _bankClass},
                smsAlertText: _smsAlertText
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

            this.selectors = {};
            this.bindSelector('city', [{
                text: '上海'
            }, {
                text: '北京'
            }]);

            this.smsRequest = new Loading({
                url: '/t/code',
                method: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                check: false,
                checkData: false,
                $el: this.$el,
                success: function(res) {
                    if (res.code !== 40000) {
                        sl.tip(res.msg);
                    }
                }
            });

            this.bindBankRequest = new Loading({
                url: '/m/dobind',
                method: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                check: false,
                checkData: false,
                $el: this.$el,
                success: function(res) {
                    if (res.code !== 40000) {
                        sl.tip(res.msg);
                    } else {
                        localStorage.setItem('bankInfo', JSON.stringify(self.basicBankInfo));
                        self.forward('/teacher/withdraw/' + self.route.data.cardNo);
                    }
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
