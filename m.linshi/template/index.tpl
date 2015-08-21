<header>
    <div sn-binding="data-back:back" class="head_back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<ul class="teacher_list_filter">
    <li sn-on="tap:select" data-type="subject" sn-binding="class:selected|equal:'subject':'select':''">科目<i></i></li>
    <li sn-on="tap:select" data-type="area" sn-binding="class:selected|equal:'area':'select':''">授课区域<i></i></li>
    <li sn-on="tap:select" data-type="type" sn-binding="class:selected|equal:'type':'select':''">上课方式<i></i></li>
</ul>
<div class="main">
    <ul class="teacher_list">
        <li class="teacher_item" sn-repeat="item in data" sn-binding="data-id:item.teacher_id">
            <div class="bd">
                <img sn-binding="src:item|avatar,onerror:item|avatarError" />
                <div class="con">
                    <div class="name"><i class="area" sn-binding="html:item.area"></i><span sn-binding="html:item.teacher_name"></span></div>
                    <div class="disc"><i class="price" sn-binding="html:item.price|round"></i><span sn-binding="html:item.discipline"></span></div>
                </div>
            </div>
            <div class="ft">
                <span sn-binding="html:item.teaching_age|concat:'教龄'"></span>
                <span sn-binding="html:item.students_number|format:'学生{0}人'"></span>
                <span sn-binding="html:item.praise_rate|format:'好评率{0}'"></span>
            </div>
        </li>
    </ul>
</div>
<div sn-binding="class:selected|equal:'subject':'filters show':'filters'" style="display:none">
    <div class="filters_list">
        <ul class="con">
            <li sn-repeat="item in filters" sn-binding="html:item.name,class:item.id|equal:course_category:'current':''" sn-on="tap:selectCourseCategory:item"></li>
        </ul>
        <ul class="con" sn-repeat="item in filters" sn-binding="display:item.id|equal:course_category">
            <li sn-repeat="discipline in item.discipline" sn-binding="html:discipline.name" sn-on="tap:selectCourse:discipline"></li>
        </ul>
    </div>
</div>
<div sn-binding="class:selected|equal:'area':'filters show':'filters'">
    <div class="filters_list">
        <ul class="con">
            <li sn-repeat="item in area" sn-binding="html:item.name,class:item.name|equal:current_area:'current':''" sn-on="tap:selectArea:item"></li>
        </ul>
    </div>
</div>
<div sn-binding="class:selected|equal:'type':'filters show':'filters'" style="display:none">
    <div class="filters_list">
        <ul class="con">
            <li sn-repeat="item in type" sn-binding="html:item.name,class:item.id|equal:current_type:'current':''" sn-on="tap:selectType:item"></li>
        </ul>
    </div>
</div>
<footer class="download_layer" sn-binding="display:showDownload">
    <div class="download_close" sn-on="tap:closeDownload"></div>
    <div class="download_btn" sn-on="tap:download"></div>
    <img src="images/download_layer.jpg" />
</footer>