<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>

<div class="main teacher-rank">

 <div class="rank-sort-item">
	
    <h3 class="item-header">真能跑 <a href="javascript:;" class="more-teachers">更多老师</a></h3>
    <ul class="teacher-list">
        <li class="teacher-item item-level-gold " sn-repeat="item in data.praise" sn-binding="data-id:item.teacher_id">
            <div class="teacher-info">
        	    <img sn-binding="src:item.head_photo" />
                <div class="teacher-detail">
                	<div class="name" sn-binding="html:item.teacher_name"></div>
                	<div class="score">上门授课<span sn-binding="html:item.praise_rate"></span>次</div>
                	<div class="course" sn-binding="html:item.discipline"></div>
                </div>
            </div>
        </li>
    </ul>	
   </div>

   <div class="rank-sort-item">
	
    <h3 class="item-header">很能教 <a data-forward="/index">更多老师</a></h3>
    <ul class="teacher-list">
        <li class="teacher-item item-level-silver" sn-repeat="item in data.class_hours" sn-binding="data-id:item.teacher_id">
            <div class="teacher-info">
        	    <img sn-binding="src:item.head_photo" />
                <div class="teacher-detail">
                    <div class="name" sn-binding="html:item.teacher_name"></div>
                    <div class="score">已授<span sn-binding="html:item.class_hours_number"></span>课时</div>
                    <div class="course" sn-binding="html:item.discipline"></div>
                </div>
            </div>
        </li>
    </ul>
	
   </div>

   <div class="rank-sort-item">
	
    <h3 class="item-header">会互动 <a data-forward="/index">更多老师</a></h3>
    <ul class="teacher-list">
        <li class="teacher-item item-level-copper" sn-repeat="item in data.attention_num" sn-binding="data-id:item.teacher_id">
            <div class="teacher-info">
        	    <img sn-binding="src:item.head_photo" />
                <div class="teacher-detail">
                    <div class="name" sn-binding="html:item.teacher_name"></div>
                    <div class="score">课程反馈<span sn-binding="html:item.attention_num"></span>次</div>
                    <div class="course" sn-binding="html:item.discipline"></div>
                </div>
            </div>
        </li>
    </ul>	
   </div>

</div>