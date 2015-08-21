<header>
    <div class="head_back js_back"></div>
    <div sn-binding="html:title" class="head_title"></div>
    <div class="head_share js_share"></div>
</header>
<div class="main">
    <div class="piano">
        <div class="piano_hd">
            <div class="findstyle2_hd">
                <div class="con">
                    <div class="info">
                        <h1 sn-binding="html:data.Title"></h1>
                        <h2><span sn-binding="html:data.SubTitle|eval:'$0.split(\'|\')[0]'"></span><span sn-binding="html:data.SubTitle|eval:'$0.split(\'|\')[1]'|or:''"></span></h2>
                    </div>
                    <div class="price">
                        <i>￥</i>
                        <h3 sn-binding="html:data.SpecialPrice"></h3>
                        <del sn-binding="html:data.Price|format:'￥{0}起小时'"></del>
                    </div>
                </div>
                <ul>
                    <li sn-binding="html:data.PraiseRate"></li>
                    <li sn-binding="html:data.TeachingAge|replace:'年':''"></li>
                </ul>
            </div>
        </div>
        <div class="piano_bd">
            <h4>01<b>简介</b></h4>
            <div class="piano_con" sn-binding="html:data.Content1|htmlString"></div>
            <h4>02<b>寄语</b></h4>
            <div class="piano_con" sn-binding="html:data.Content2|htmlString"></div>
            <h4>03<b>经历</b></h4>
            <div class="piano_con" sn-binding="html:data.Content3|htmlString"></div>
            <h4>04<b>成果</b></h4>
            <div class="piano_con" sn-binding="html:data.Content|htmlString"></div>
        </div>
    </div>
</div>
<footer class="piano_ft">
    <div class="btn_large js_buy">立即抢购</div>
</footer>