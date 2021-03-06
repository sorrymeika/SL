<header>
    <div class="head_menu"></div>
    <div sn-binding="html:title" class="head_title"></div>
    <div class="head_city"><text sn-binding="html:city"></text><i></i></div>
</header>
<div class="main">
    <div class="js_slider home_slider">
    </div>
    <nav class="home">
        <ul class="nav_list">
            <li data-forward="/index"><i></i>找老师</li>
            <li data-forward="/orderlist"><i></i>订单</li>
            <li data-forward="/coupon"><i></i>优惠券</li>
            <li data-forward="/brand"><i></i>品牌老师馆</li>
            <!--<li data-forward="/activity">特惠活动</li>
            <li data-forward="/teacherranking">教师排行榜</li>-->
        </ul>
    </nav>
</div>
<div class="citylistwrap">
    <div class="city_list">
        <h1>已开通城市</h1>
        <ul>
            <li sn-repeat="item in open_city_list">
                <span sn-binding="html:item.city_name,class:item.city_name|equal:city:'curr':''"></span>
            </li>
        </ul>
        <h1>即将开通城市</h1>
        <ul>
            <li sn-repeat="item in city_list">
                <span sn-binding="html:item.city_name" sn-on="tap:cityTip"></span>
            </li>
        </ul>
    </div>
</div>