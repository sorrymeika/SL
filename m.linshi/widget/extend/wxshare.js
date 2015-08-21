define(function (require, exports, module) {

    var $ = require('$');
    var bridge = require('bridge');
    var util = require('util');

    var Share = function (shareData) {
        seajs.use('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function (wx) {
            $.post(bridge.url('/user/share_weixin'), {
                url: location.href.replace(/#.+/, '')

            }, function (res) {

                wx.config({
                    debug: false,
                    appId: res.appId,
                    timestamp: res.tm,
                    nonceStr: res.nonceStr + "",
                    signature: res.sign,
                    jsApiList: [
                      'onMenuShareAppMessage',
                      'onMenuShareTimeline',
                      'onMenuShareQQ',
                      'onMenuShareWeibo',
                      'onMenuShareQZone'
                    ]
                });

                wx.ready(function () {
                    var shareOptions = {
                        title: shareData.shareTitle,
                        desc: shareData.shareContent,
                        link: location.href,
                        imgUrl: shareData.sharePic || 'http://m.linshi.biz/upload/share.png',
                        trigger: function (res) {
                        },
                        success: function (res) {
                        },
                        cancel: function (res) {
                        },
                        fail: function (res) {
                        }
                    }

                    wx.onMenuShareTimeline(shareOptions);
                    wx.onMenuShareAppMessage(shareOptions);
                    wx.onMenuShareQQ(shareOptions);
                    wx.onMenuShareWeibo(shareOptions);
                    wx.onMenuShareQZone(shareOptions);
                });

            }, 'json');
        });
    };

    var shareData = {
        '0': {
            sharePic: 'http://m.linshi.biz/images/piano_share.jpg',
            shareTitle: "邻师钢琴老师专场，狂潮来袭，首单一折",
            shareContent: "风格百变的邻师品牌老师馆，定期推出专场活动，挑选一位您喜欢的老师吧！"
        },
        '1': {
            sharePic: 'http://m.linshi.biz/images/swim_share.jpg',
            shareTitle: "炎炎夏日，快来邻师学游泳吧",
            shareContent: "邻师游泳老师专场，泳往直前，泳不言败！"
        },
        '2': {
            sharePic: 'http://m.linshi.biz/images/chinese_share.jpg',
            shareTitle: "邻师语文老师专场，所有课程一折",
            shareContent: "邻师语文老师专场，跟邻师一起感受文字的魅力！"
        },
        '3': {
            sharePic: 'http://m.linshi.biz/images/english_share.jpg',
            shareTitle: "学英语背单词就行了？听听邻师老师怎么说",
            shareContent: "邻师英语老师专场，火热进行，打架报名中"
        },
        '4': {
            sharePic: 'http://m.linshi.biz/images/guitar_share.jpg',
            shareTitle: "古典民谣电音，你想学的都在邻师",
            shareContent: "邻师吉他老师专场，古典民谣电音，一应俱全！"
        },
        '5': {
            sharePic: 'http://m.linshi.biz/images/find5share.jpg',
            shareTitle: "数学有多少奥妙？邻师等你一起来发现",
            shareContent: "邻师奥数老师专场，比面试加分更重要的是思维的方式"
        },
        '6': {
            sharePic: 'http://m.linshi.biz/images/find6share.jpg',
            shareTitle: "书我所愿，画我所想，邻师艺术家大集结",
            shareContent: "邻师书画老师专场，放下心，提起笔，就能带你领略书画艺术"
        },
        '7': {
            sharePic: 'http://m.linshi.biz/images/find7share.jpg',
            shareTitle: "还在看网球王子？快来邻师体验真正的网球运动吧！",
            shareContent: "邻师网球老师专场，走上球场，你就是赢家！"
        },
        download: {
            sharePic: 'http://m.linshi.biz/images/logo.jpg',
            shareTitle: "推荐一个找老师神器，全场首单一折",
            shareContent: "刚使用了邻师找老师，任意课程首单一折，靠谱又放心，好老师就在身边"
        }
    }

    Share.getShareData = function (type) {
        return shareData[type];
    }

    module.exports = Share;
});
