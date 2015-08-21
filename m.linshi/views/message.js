define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/extend/loading');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');

    return Activity.extend({
        events: {
            'tap': function (e) {
                if (e.target == this.el) {
                    this.back('/')
                }
            }
        },

        swipeRightBackAction: '/',

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');

            this.model = new model.ViewModel(this.$el, {
                back: '/',
                title: '我的订单'
            });

            Scroll.bind($main, {
                refresh: function (resolve, reject) {
                    self.loading.reload({
                        showLoading: false
                    }, function (err, data) {
                        if (err) reject(err)
                        else resolve(data);
                    });
                }
            });

            this.loading = new Loading({
                url: '/order/order_list',
                params: {
                    sort: 'desc',
                    order_by: 'order_id',
                    member_id: ''
                },
                check: false,
                $el: this.$el,
                $content: $main.children(":first-child"),
                $scroll: $main,
                success: function (res) {
                    if (res.data.length >= 10)
                        res.total = (this.pageIndex + 1) * this.pageSize;

                    self.model.set(res);
                },
                append: function (res) {
                    if (res.data.length >= 10) {
                        res.total = (this.pageIndex + 1) * this.pageSize;
                    }

                    self.model.get('data').append(res.data);
                }
            });

        },

        onShow: function () {
            var self = this;
            var member = util.store('member');

            if (!member) {
                this.forward('/login?success=' + this.route.url + "&from=/");
            } else {
                this.model.set('member', member);
                this.member = member;
                if (!this.isLoad) {
                    this.isLoad = true;
                    this.loading.setParam({
                        member_id: member.member_id

                    }).load();
                }
            }
        },

        onDestory: function () {
        }
    });
});
