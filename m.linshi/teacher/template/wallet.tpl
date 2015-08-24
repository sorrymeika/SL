<header class="teacher-header">
    <div class="head_back " sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
    <div class="step-name" data-forward="/teacher/selectbank">提现</div>
</header>

<div class="main ">
	<div class="wallet-info">
		<p>当前金额</p>
		<strong><span class="money" sn-binding="html:income"></span>元</strong>
		<div class="btn-group">
			<div class="btn-extract">
				<strong class="money" sn-binding="html:balance"></strong>
				<p>可提现金额</p>
			</div>
			<div class="btn-income">
				<strong class="money" sn-binding="html:fee">8800</strong>
				<p>累计收入</p>
			</div>
		</div>
	</div>

	<ul class="bill-list">
		<li class="bill-item">
			<div class="bill-item-down">收支明细</div>
		</li>
		<li class="bill-item">
			<div class="bill-item-up">
				<div>提现</div>
				<div class="bill"><span>560</span>元</div>
			</div>
			<div class="bill-item-down">
				<div class="date">2015.08.09 12:23</div>
				<div class="bank-info">
					<div class="bank-name">
						工商银行 尾号<span class="no">6423</span>
					</div>
					
				</div>
			</div>
		</li>
		<li class="bill-item">
			<div class="bill-item-up">
				<div>提现</div>
				<div class="bill"><span>560</span>元</div>
			</div>
			<div class="bill-item-down">
				<div class="date">2015.08.09 12:23</div>
				<div class="bank-info">
					<div class="bank-name">
						工商银行 尾号<span class="no">6423</span>
					</div>
					
				</div>
			</div>
		</li>
	</ul>
</div>