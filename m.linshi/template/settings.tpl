<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<div class="main">
    <div class="settings">
        <ul class="settings_list">
            <li sn-repeat="item in settings" sn-binding="html:item.title,data-forward:item.href"></li>
        </ul>
        <div class="logout" sn-binding="html:logout">退出当前账号</div>
    </div>
</div>