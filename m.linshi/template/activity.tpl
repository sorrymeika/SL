<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>

<div class="main activity">
    <ul class="activity_list">
        <li class="activity_item" sn-repeat="item in data" sn-binding="data-id:item.ad_id">
        	<a sn-binding="href:item.url"><img sn-binding="src:item.pic" /></a>
        </li>
    </ul>
</div>