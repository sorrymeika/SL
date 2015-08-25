<header class="teacher-header">
    <div class="head_back " sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>

<div class="main select-bank bind-bank unbind-bank">

	<div sn-binding="class:bankInfo.bankClass"></div>
	<div class="card-info">
		<div class="card-name" sn-binding="html:bankInfo.bankName"></div>
		<div class="card-no" sn-binding="html:bankInfo.cardNo"></div>
	</div>
	<div class="bind-card-alert">后续只能提现到该持卡人的银行卡</div>
	<small>如果你的银行卡信息需要修改或者银行卡丢失，请在这里修改绑定。</small>
	<div class="bind-card-info">
		<div class="unbind-btn" data-forward="/teacher/selectbank">修改绑定</div>
	</div>
</div>