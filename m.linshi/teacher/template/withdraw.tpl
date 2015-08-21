<header class="teacher-header">
    <div class="head_back " sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>

<div class="main withdraw">
<p>提现到银行卡</p>
<div class="bank-info">
	<label for="">
		银行卡 <input type="text" readonly="true" value="1234567890123456789">
		<a href="javascript:;" class="select-bank-link" data-forward="/teacher/selectbank"></a>
	</label>
	<label for="">
		金额 <input type="text" value="5200">
	</label>
</div>
	<p class="withdraw-note">单笔提现在5万元以后，免手续费，每周可提现一次。</p>
<div class="confirm-btn">确认</div>
</div>