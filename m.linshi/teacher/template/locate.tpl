<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
    <div class="head_submit" sn-on="tap:submit" sn-binding="class:disabled|equal:true:'head_submit disabled':'head_submit'">提交</div>
</header>
<div class="main teacher_locate">
    <ul class="bd">
        <li>
            <div class="label need">姓名</div>
            <div class="con"><input type="text" /></div>
        </li>
        <li>
            <div class="label need">手机</div>
            <div class="con"><input type="text" /></div>
        </li>
        <li>
            <div class="label need">常驻城市</div>
            <div class="con"><input type="text" name="city" sn-binding="value:city" readonly /></div>
        </li>
        <li>
            <div class="label">学历</div>
            <div class="con"><input type="text" name="highest_degree" sn-binding="value:highest_degree" readonly /></div>
        </li>
        <li>
            <div class="label">教龄</div>
            <div class="con"><input type="text" sn-model="teaching_age" /></div>
        </li>
        <li>
            <div class="label">身份（机构老师、教师工作室、学校教师）</div>
            <div class="con"><input type="text" name="teacher_type" sn-binding="value:teacher_type" readonly /></div>
        </li>
        <li>
            <div class="label">教学科目</div>
            <div class="con"><input type="text" name="course_category" sn-binding="value:course_category" readonly /></div>
        </li>
        <li>
            <div class="label">过往经历</div>
            <div class="con"><textarea sn-model="teaching_age"></textarea></div>
        </li>
        <li>
            <div class="label">成果分享</div>
            <div class="con"><textarea sn-model="teaching_age"></textarea></div>
        </li>
        <li>
            <div class="label">教学特色</div>
            <div class="con"><textarea sn-model="teaching_age"></textarea></div>
        </li>
    </ul>
</div>