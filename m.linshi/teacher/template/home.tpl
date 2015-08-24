<header class="header">
    <div class="head_menu"></div>
    <div sn-binding="html:title" class="head_title"></div>
    <div class="head_message" data-forward="/teacher/message"><i>3</i></div>
</header>
<div class="main">
    <div class="js_slider home_slider">
    </div>
    <div class="student-score">
        <div class="panel s-number">
            <div>学生数</div>
            <strong class="score"><span sn-binding="html:studentNums"></span>人</strong>
        </div>
        <div class="panel s-course">
            <div>课时数</div>
            <strong class="score"><span sn-binding="html:classHours"></span>课</strong>
        </div>
        <div class="panel s-comment">
            <div>评价数</div>
            <strong class="score"><span sn-binding="html:praise"></span>分</strong>
        </div>
    </div>
    <div class="func-sort">
        <div class="pin business-card">
            <div class="business-card-pic"></div>
            <div class="title">老师名片</div>
            <strong class="value">完成<span sn-binding="html:percent|formatPercent"></span></strong>
            <div class="line"></div>
        </div>

        <div class="pin wallet" data-forward="/teacher/wallet">
            <div class="wallet-pic"></div>
            <div class="title">钱包管理</div>
            <strong class="value">涨钱</strong>
            <div class="line"></div>
        </div>
        <div class="pin course">
            <div class="course-pic"></div>
            <div class="title">课程管理</div>
            <strong class="value">课程数
                <span sn-binding="html:courseCount"></span></strong>
        </div>
        <div class="pin feedback" data-forward="/teacher/feedback">
            <div class="feedback-pic"></div>
            <div class="title">教学反馈</div>
            <strong class="value">反馈<span sn-binding="html:feedbackCount"></span>条</strong>
        </div>
    </div>
</div>
