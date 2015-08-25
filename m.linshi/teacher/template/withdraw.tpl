<header class="teacher-header">
    <div class="head_back " sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>

<div class="main withdraw">
<p>提现到银行卡</p>
<div class="bank-info">
	<label for="card">
		银行卡 <input type="text" id="card" readonly="true" sn-binding="value:cardNo">
		<a href="javascript:;" class="select-bank-link" data-forward="/teacher/bankunbinding"></a>
	</label>
	<label for="money">
		金额 <input id="money" name="money" sn-model="money" type="text" value="0">
	</label>
</div>
	<p class="withdraw-note">单笔提现在5万元以后，免手续费，每周可提现一次。</p>
<div class="confirm-btn">确认</div>
</div>