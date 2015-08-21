define(function (require, exports, module) {

    var $ = require('$');
    var util = require('util');
    var Activity = require('activity');
    var Loading = require('widget/extend/loading');
    var Selector = require('widget/selector');
    var model = require('core/model');
    var Scroll = require('widget/scroll');
    var animation = require('animation');


    return Activity.extend({
        events: {},

        swipeRightBackAction: '/',

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

            this.model = new model.ViewModel(this.$el, {
                back: this.swipeRightBackAction,
                title: '老师入驻',
                submit: function (e) {
                    if (this.data.disabled) return;
                    this.set('disabled', true);

                    self.loading.setParam({
                        highest_degree: this.data.highest_degree

                    }).load();
                }
            });

            this.loading = new Loading({
                url: '/ad/ad_list',
                params: {
                    postion_id: 1
                },
                check: false,
                checkData: false,
                $el: self.$el,
                success: function (res) {
                    if (res.error_code == 1) {
                        sl.tip(res.error_msg);

                    } else {

                    }
                    self.model.set('disabled', false);
                }
            });

            this.selectors = {};
            this.bindSelector('city', [{
                text: '上海'
            }, {
                text: '北京'
            }]);

            this.bindSelector('highest_degree', [{
                text: '专科',
                value: 1
            }, {
                text: '本科',
                value: 2
            }, {
                text: '硕士及以上',
                value: 3
            }]);

            this.bindSelector('teacher_type', [{
                text: '机构教师',
                value: 3
            }, {
                text: '教师工作室',
                value: 2
            }, {
                text: '学校教师',
                value: 4
            }, {
                text: '专职教师',
                value: 1
            }]);

            this.bindSelector('course_category', [{
                text: '小学',
                value: 5
            }, {
                text: '初中',
                value: 4
            }, {
                text: '高中',
                value: 3
            }, {
                text: '体育',
                value: 2
            }, {
                text: '艺术',
                value: 1
            }, {
                text: '其他',
                value: 8
            }]);
        },

        onShow: function () {
            var that = this;
        },

        onDestory: function () {
        }
    });
});
