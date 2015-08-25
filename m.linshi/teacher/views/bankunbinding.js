define(function(require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('widget/extend/loading');
    var Slider = require('widget/slider');
    var model = require('core/model');
    var Scroll = require('widget/scroll');
    var Selector = require('widget/selector');
    var animation = require('animation');

    return Activity.extend({
        events: {
            'tap': function(e) {
                if (e.target == this.el) {
                    this.back('/teacher/withdraw/' + this.cardNo);
                }
            },
            'tap .select-bank-link': function(e) {
                $(e.target).prev().trigger('tap');
            },
            'tap .unbind-btn': function(e) {
                this.forward('/teacher/selectbank');
            }
        },

        swipeRightForwardAction: '/teacher/menu',

        onCreate: function() {
            var self = this;

            var $main = this.$('.main');

            Scroll.bind($main);

            var _bankInfo = localStorage.getItem('bankInfo'),
            _bankInfo = JSON.parse(_bankInfo);
            if (_bankInfo) {
                var bankName = _bankInfo.bank;
                var cardNo = this.cardNo = _bankInfo.card;

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

                var _bankClass = bankClassMap[bankName];

                this.model = new model.ViewModel(this.$el, {
                    back: '/teacher/withdraw/' + cardNo,
                    title: '绑定银行卡',
                    bankInfo: {
                        bankName: bankName,
                        cardNo: cardNo,
                        bankClass: _bankClass
                    }
                });
            }

        },

        onShow: function() {
            var that = this;
        },

        onDestory: function() {}
    });
});
