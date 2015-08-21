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
            },
            'tap [sn-repeat-name="data"][data-id]': function (e) {
                this.forward('/teacher/' + e.currentTarget.getAttribute('data-id'));
            },
            'tap .js_search': function (e) {
                var search = this.model.data.search;
                if (search) this.forward('/search/' + search);
                else sl.tip('请输入搜索内容');
            },
            'tap .filters': function (e) {
                if (e.target == e.currentTarget) {
                    this.model.set('selected', '');
                }
            }
        },

        swipeRightBackAction: '/',

        onCreate: function () {
            var self = this;

            var $main = this.$('.main');
            this.$searchFilters = this.$('.search_filters');

            model.Filter.avatar = function (item) {
                return item.head_photo_square ? item.head_photo_square : (item.sex == '女' ? 'images/default_photo_fe.png' : 'images/default_photo.png');
            }
            model.Filter.avatarError = function (item) {
                return "this.src='" + (item.sex == '女' ? 'images/default_photo_fe.png' : 'images/default_photo.png') + "'";
            }

            var area = [];
            ['全部', '静安', '黄浦', '卢湾', '宝山', '闵行', '徐汇', '浦东', '虹口', '杨浦', '普陀', '闸北', '松江'].forEach(function (item) {
                area.push({ name: item });
            })

            this.model = new model.ViewModel(this.$el, {
                back: '/',
                title: '发现身边好老师',
                subject: '',
                selected: '',
                course_category: '',
                selectCourseCategory: function (e, item) {
                    this.set('course_category', item.data.id);

                    if (item.data.name == '全部') {
                        this.set('selected', '');
                        self.loading.setParam({
                            discipline: ''

                        }).reload();
                    }
                },
                selectCourse: function (e, item) {
                    this.set('discipline', item.data.name);
                    this.set('selected', '');

                    self.loading.setParam({
                        discipline: item.data.name == '全部' ? '' : item.data.name

                    }).reload();
                },
                filters: [{
                    name: '全部',
                    id: 0
                }, {
                    name: '小学',
                    id: 2,
                    discipline: [{
                        name: "语文"
                    }, {
                        name: '数学'
                    }, {
                        name: '英语'
                    }]
                }, {
                    name: '初中',
                    id: 3,
                    discipline: [{
                        name: "语文"
                    }, {
                        name: '数学'
                    }, {
                        name: '英语'
                    }, {
                        name: '物理'
                    }, {
                        name: '化学'
                    }]
                }, {
                    name: '高中',
                    id: 4,
                    discipline: [{
                        name: "语文"
                    }, {
                        name: '数学'
                    }, {
                        name: '英语'
                    }, {
                        name: '物理'
                    }, {
                        name: '化学'
                    }, {
                        name: '生物'
                    }]
                }, {
                    name: '艺术',
                    id: 6,
                    discipline: [{
                        name: "吉他"
                    }, {
                        name: '小提琴'
                    }, {
                        name: '古筝'
                    }, {
                        name: '书法'
                    }, {
                        name: '绘画'
                    }]
                }, {
                    name: '体育',
                    id: 5,
                    discipline: [{
                        name: "游泳"
                    }, {
                        name: '网球'
                    }]
                }],
                current_area: '全部',
                selectArea: function (e, item) {
                    this.set('current_area', item.data.name);
                    this.set('selected', '');

                    self.loading.setParam({
                        area: item.data.name == '全部' ? '' : item.data.name

                    }).reload();
                },
                area: area,
                current_type: 0,
                selectType: function (e, item) {
                    this.set('current_type', item.data.name);
                    this.set('selected', '');

                    self.loading.setParam({
                        class_method: item.data.id == 0 ? '' : item.data.id

                    }).reload();
                },
                type: [{
                    id: 0,
                    name: '全部'
                }, {
                    id: 1,
                    name: '一对一(学生上门)'
                }, {
                    id: 2,
                    name: '一对一(老师上门)'
                }],
                showDownload: !util.store('hideDownload'),
                closeDownload: function () {
                    self.model.set('showDownload', false);
                    util.store('hideDownload', true);
                },
                download: function () {
                    if (util.isInWechat) {
                        sl.tip('若微信内无法打开下载链接，请点击右上角并选择“' + (util.ios ? '在Safari中打开' : '在浏览器中打开') + '”');
                    } else {
                        location.href = (util.android ? "http://api.linshi.biz/download/linshi.apk" : "https://itunes.apple.com/us/app/lin-shi/id1001036632?l=zh&ls=1&mt=8");
                    }
                },
                select: function (e) {
                    var $target = $(e.currentTarget);
                    var type = $target.data('type');

                    self.$filters.eq($target.index()).show()[0].clientHeight;

                    this.set('selected', !$target.hasClass('select') ? type : '');
                }
            });

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

            Scroll.bind('.filters_list .con');
            this.$filters = this.$('.filters');

            this.listenTo(this.$filters, $.fx.transitionEnd, function (e) {
                if (!$(e.currentTarget).hasClass('show')) {
                    $(e.currentTarget).hide();
                }
            });

            this.loading = new Loading({
                url: '/teacher/teacher_list',
                params: {
                    sort: 'member_id',
                    order_by: 'asc'
                },
                check: false,
                checkData: false,
                $el: this.$el,
                $content: $main.children(":first-child"),
                $scroll: $main,
                success: function (res) {
                    if (!res.data || !res.data.length) {
                        this.dataNotFound();

                    } else if (res.data.length >= 10)
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


            this.loading.load();
        },

        onShow: function () {
            var that = this;
        },

        onDestory: function () {
        }
    });
});
