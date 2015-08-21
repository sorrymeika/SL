<header>
    <div class="head_back js_back"></div>
    <div sn-binding="html:title" class="head_title"></div>
    <div class="head_share js_share"></div>
</header>
<div class="main">
    <div class="pianolist">
        <div class="pianolist_hd">
        </div>
        <ul class="findlist2 js_findlist">
            <li sn-repeat="item in data" sn-binding="data-id:item.ID">
                <div class="con">
                    <h2 sn-binding="html:item.Title"></h2>
                    <h3><span sn-binding="html:item.SubTitle|eval:'$0.split(\'|\')[0]'"></span><span sn-binding="html:item.SubTitle|eval:'$0.split(\'|\')[1]'|or:''"></span></h3>
                    <ul>
                        <li sn-binding="html:item.PraiseRate"></li>
                        <li sn-binding="html:item.TeachingAge"></li>
                    </ul>
                </div>
                <div class="ft">
                    <i>￥</i>
                    <div class="price" sn-binding="html:item.SpecialPrice">
                    </div>
                    <div class="info">
                        <del sn-binding="html:item.Price|format:'￥{0}起/小时'"></del>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>