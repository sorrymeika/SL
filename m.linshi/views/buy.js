define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('../widget/extend/loading');
    var model = require('../core/model');
    var Scroll = require('../widget/scroll');
    var animation = require('animation');
    var bridge = require('bridge');
    var Selector = require('widget/selector');


    return Activity.extend({
        events: {
            'tap .js_submit:not(.disabled)': function (e) {
                var member = util.store('member');
                if (!member) {
                    this.forward('/login?success=' + this.route.url + '&from=' + this.route.url);
                    return;
                }

                var data = this.model.data;
                var $target = $(e.currentTarget);

                $target.addClass('disabled');

                this.loading.setParam({
                    member_id: member.member_id,
                    total_price: data.total_time * data.basic_info.price,
                    payment_price: data.total_time * data.basic_info.price - data.coupon_price,
                    total_time: data.total_time,
                    course_id: data.course.course_id,
                    class_method_id: data.course.class_method_id,
                    coupon_id: data.coupon_id,
                    coupon_price: data.coupon_price,
                    discoutPrice: data.discount || 0,
                    class_address: data.basic_info.class_address.address_detail,
                    student_name: member.real_name

                }).load();
            },

            'tap .logout': function () {
            },

            'tap .js_total_time_minus': function () {
                var total_time = this.model.data.total_time;
                if (total_time > 1)
                    this.model.set('total_time', total_time - 1);
            },

            'tap .js_total_time_plus': function () {
                var total_time = this.model.data.total_time;

                this.model.set('total_time', total_time + 1);
            }
        },

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');
            var teacher = util.store('teacher');

            this.teacherUrl = '/teacher/' + teacher.basic_info.teacher_id;

            Scroll.bind($main);

            self.onResult('couponSelect', function (e, coupon) {

                this.model.set({
                    coupon_id: coupon.coupon_id,
                    coupon_price: coupon.price,
                    coupon_title: coupon.coupon_title
                });

                this.model.trigger('change:total_time');
            });

            if (!teacher.course_list) {
                sl.tip('该老师没有课程可以选择');
            }

            this.model = new model.ViewModel(this.$el, $.extend({
                back: this.teacherUrl,
                title: '确认购课',
                course: teacher.course_list ? (this.route.data.id ? util.first(teacher.course_list, function (item) {
                    return item.course_id == self.route.data.id;
                }) : teacher.course_list[0]) : null,
                total_time: 1,
                coupon_price: 0,
                coupon_id: 0,
                course_index: 0,
                discount: 0,
                discountInfo: '折扣',
                selectCoupon: function (e) {
                    self.forward('/coupon?from=/buy&select=1')
                },
                showCourse: function (e) {
                    selector.eq(0).index(this.data.course_index);
                    selector.show();
                },
                prompt: function () {
                    self.prompt(this.data.member.real_name || '', function (real_name) {
                        if (!real_name) return;
                        var member = util.store('member');

                        self.loading.showLoading();

                        $.post(bridge.url('/user/edit_member_info'), {
                            member_id: member.member_id,
                            real_name: real_name

                        }, function (res) {
                            if (res.error_code != 0) {
                                sl.tip(res.error_msg);
                            } else {
                                member.real_name = real_name;
                                util.store('member', member);
                                self.model.set('member.real_name', real_name);
                            }
                            self.loading.hideLoading();
                        }, 'json');

                    });
                }

            }, teacher));

            var selector = new Selector({
                options: {
                    template: '<li><%=class_method_name%></li>',
                    data: teacher.course_list
                },
                complete: function (res, index) {
                    self.model.set('course', res[0]).set('course_index', selector.eq(0).index());
                    self.model.trigger('change:total_time');
                }
            });

            this.bindQueryAction('course', selector, {
                show: 'show',
                "": 'hide'
            });

            this.model.on('change:total_time', function () {
                var data = self.model.data;

                self.model.set({
                    discount: 0,
                    discountInfo: '折扣',
                    nextDiscount: self.discount[0].class_hours_number + '课时（' + self.discount[0].discount + '折）'
                });

                var amount = parseFloat(data.course.price) * data.total_time;
                if (data.coupon_id == 11) {
                    self.model.set("coupon_price", Math.min(200, Math.round(amount * .9)));
                } else if (self.discount && self.discount.length) {

                    for (var i = 0; i < self.discount.length; i++) {
                        var discount = self.discount[i];
                        var nextDiscount = self.discount[i + 1];
                        if (data.total_time >= discount.class_hours_number && (!nextDiscount || data.total_time < nextDiscount.class_hours_number)) {

                            if (!nextDiscount) nextDiscount = discount;

                            self.model.set({
                                discount: Math.round(100 * amount * ((10 - discount.discount) / 10)) / 100,
                                discountInfo: discount.class_hours_number + '课时（' + discount.discount + '折）',
                                nextDiscount: nextDiscount.class_hours_number + '课时（' + nextDiscount.discount + '折）'
                            });
                        }
                    }
                }
            });

            this.$buy = this.$el.find('.js_submit');

            $.get(bridge.url('/course/get_discount'), function (res) {
                if (res.error_code != 0) {
                    sl.tip(res.error_msg);
                } else {
                    self.discount = res.data;
                    self.model.trigger('change:total_time');
                }
            }, 'json');

            this.loading = new Loading({
                $el: this.$el,
                url: '/order/buy_course',
                method: 'POST',
                check: false,
                checkData: false,
                xhrFields: {
                    withCredentials: true
                },
                success: function (res) {
                    self.$buy.removeClass('disabled');
                    var data = self.model.data.data;

                    if (res.error_code == 1) {
                        sl.tip(res.error_msg);

                    } else {
                        var orderInfo = {
                            order_code: res.data.order_code,
                            really_price: this.getParam('payment_price'),
                            subject: teacher.basic_info.discipline,
                            id: self.route.data.id,
                            teacherName: teacher.basic_info.teacher_name
                        };
                        util.store('orderInfo', orderInfo);

                        if (util.isInWechat) {
                            location.href = 'http://' + (sl.isDebug ? 'front' : 'www') + '.linshi.biz/wxpay/index?out_trade_no=' + res.data.order_code + "&return=" + encodeURIComponent(location.href) + "&show=" + encodeURIComponent("http://m.linshi.biz/#" + self.teacherUrl);
                            //self.forward('/order/' + res.data.order_code + "?from=" + self.route.url);

                        } else {
                            self.forward('/order/' + res.data.order_code + "?paytype=alipay&from=" + self.teacherUrl + "&show=http://" + location.host + "/#" + self.teacherUrl);
                        }
                    }
                },
                error: function () {
                    sl.tip('生成订单失败');
                    this.hideLoading();
                    self.$buy.removeClass('disabled');
                }
            });
        },

        onShow: function () {
            var self = this;
            var member = util.store('member');

            if (!member) {
                this.forward('/login?success=' + this.route.url + "&from=" + self.teacherUrl);
            } else {
                this.model.set('member', member);
            }
        },

        onDestory: function () {
        }
    });
});
