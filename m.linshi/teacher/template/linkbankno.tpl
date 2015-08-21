<header class="teacher-header">
    <div class="head_back " sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>

<div class="main select-bank bind-bank">

	<p>为保证您的账号资金安金，只能提现到本人的储蓄卡</p>
	<div sn-binding="class:bankInfo.bankClass"></div>
	<div class="card-info">
		<div class="card-name" sn-binding="html:bankInfo.bankName"></div>
		<div class="card-no" sn-binding="html:bankInfo.cardNo"></div>
	</div>
	<div class="bind-card-info">
		<h3>请填写银行预留信息</h3>
		
		<div class="input-group">
			<div class="input-item">
				<strong>姓名</strong><input placeholder="您的姓名" type="text" sn-model="name">
			</div>
			<div class="input-item">
				<strong>身份证</strong><input placeholder="您的身份证" maxlength="25" type="text" sn-model="card">
			</div>
			
		</div>
		<div class="bind-card-alert">后续只能提现到该持卡人的银行卡</div>


		<div class="input-group">
			<div class="input-item bank-city">
				<strong>选择开户行所在城市</strong><input placeholder="请选择" type="text" name="city" sn-model="city" sn-binding="value:city"><a href="javascript:;" class="select-bank-link"></a>
			</div>
			<div class="input-item">
				<strong>手机号</strong><input placeholder="您的手机号" maxlength="11" type="text" sn-model="mobile" >
			</div>
			<div class="input-item sms">
				<strong>短信验证码</strong><input placeholder="短信验证码" maxlength="4" type="text" sn-model="code"> <a href="javascript:;" class="req-sms" sn-binding="html:smsAlertText"></a>
			</div>
		</div>

		<div class="bind-btn">绑定</div>

	</div>
</div>