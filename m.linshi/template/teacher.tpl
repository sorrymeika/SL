﻿<div class="main teacherwrap">
    <div class="teacher_hd">
        <div class="head_back" sn-binding="data-back:back"></div>
    </div>
    <div class="teacher_info">
        <div class="teacher_basic">
            <img class="head_photo" sn-binding="src:basic_info|avatar,onerror:basic_info|avatarError" />
            <div class="item">
                <h1 class="teacher_name" sn-binding="html:basic_info.teacher_name"></h1>
                <div class="discipline" sn-binding="html:basic_info.discipline"></div>
            </div>
            <div class="item">
                <h2 class="price" sn-binding="html:basic_info.price|currency"></h2>
                <div class="area" sn-binding="html:basic_info.area"></div>
            </div>
        </div>
        <ul class="teacher_data">
            <li sn-binding="html:basic_info.teaching_age|concat:'教龄'"></li>
            <li sn-binding="html:basic_info.students_number|format:'学生{0}人'"></li>
            <li sn-binding="html:basic_info.praise_rate|format:'好评率{0}'"></li>
        </ul>
    </div>
    <div class="tabs_nav">
        <ul class="tabs_nav_con">
            <li class="curr">介绍</li>
            <li>课程</li>
            <li>评价</li>
        </ul>
    </div>
    <div class="tabs_content">
        <div class="tabs_panel teacher_exp curr">
            <div class="con">
                <h4>认证</h4>
                <ul class="teacher_cert" sn-binding="data-forward:id|format:'/certificate?from=/teacher/{0}'">
                    <li sn-binding="display:basic_info.certification_flag">身份认证</li>
                    <li sn-binding="display:basic_info.teacher_certification_flag">教师资格认证</li>
                    <li sn-binding="display:basic_info.education_flag">学历认证</li>
                </ul>
            </div>
            <div class="con">
                <h4>简介</h4>
                <div class="intro" sn-binding="html:basic_info.catchphrase"></div>
            </div>
            <div class="con">
                <h4>授课方式</h4>
                <div class="intro" sn-binding="html:basic_info.class_address.address_detail"></div>
            </div>
            <div class="con">
                <h4>过往经历</h4>
                <dl sn-repeat="item in past_experience">
                    <dt sn-binding="html:item.date_area"></dt>
                    <dd sn-binding="html:item.content"></dd>
                </dl>
            </div>
            <div class="con">
                <h4>教学成果</h4>
                <dl sn-repeat="item in teaching_achievements">
                    <dt sn-binding="html:item.date_area"></dt>
                    <dd sn-binding="html:item.content"></dd>
                </dl>
            </div>
        </div>
        <div class="tabs_panel">
            <ul class="teacher_course con">
                <li sn-repeat="item in course_list" class="js_course" sn-binding="data-id:item.course_id">
                    <span sn-binding="html:item.class_method_name"></span>
                    <span sn-binding="html:item.price|concat:'元'"></span>
                    <i class="ico_next"></i>
                </li>
            </ul>
        </div>
        <div class="tabs_panel teacher_cmt">
            <div class="teacher_cmt_item" sn-repeat="item in appraise_list">
                <div class="name">
                    <b sn-binding="html:item.student_name"></b>
                    <span class="class_time" sn-binding="html:item.class_time|format:'{0}课时'"></span>
                    <div class="score">
                        <i></i><i></i><i></i><i></i><i></i>
                        <div class="score_bd" sn-binding="style.width:item.score|precent">
                            <i></i><i></i><i></i><i></i><i></i>
                        </div>
                    </div>
                </div>
                <div class="comments" sn-binding="html:item.comments"></div>
                <div class="comments_sub" sn-binding="html:item.comment_type|concat:' ':item.raw_add_time"></div>
            </div>
        </div>
    </div>
</div>
<footer class="bottom_bar">
    <a class="btn_large2" href="tel:4009658980">咨询客服</a>
    <b class="btn_large" data-forward="/buy">立即约课</b>
</footer>
