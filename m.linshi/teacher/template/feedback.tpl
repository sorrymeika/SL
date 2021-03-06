<header class="teacher-header">
    <div class="head_back " sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>

<div class="main feedback">
	<ul class="feedback-list">
		<li class="feedback-item" sn-repeat="item in data.info" sn-binding="data-student-id:item.student">
			<h3 class="name" sn-binding="html:item.name"></h3>
			<div class="info">
				<img sn-binding="src:item.headphoto" alt="" class="head-pic">
				<div class="info-panel">
					<div class="basic">
						<div class="class-basic">
							<div class="class-name" sn-binding="html:item.course"></div>
							<div class="class-scope" sn-binding="html:item.type"></div>
						</div>
						<div class="class-time">上课时间: <span sn-binding="html:item.classtime"></span></div>
					</div>
					<div class="btn-group">
						<a href="javascript:;" sn-binding="class:item.warn_status|checkNote">叮嘱一下</a>
						<a href="javascript:;" sn-binding="class:item.task_status|checkHomework"> 布置作业</a>
					</div>
				</div>
			</div>
			<div class="resp-group">
				<textarea name="content" id="" cols="30" rows="10" sn-model="content" maxlength="200" ></textarea>
				<a href="javascript:;" sn-binding="data-code-id:item.code"  class="submit-btn">发送</a>
			</div>
		</li>
<!-- 
		<li class="feedback-item">
			<h3 class="name">王五五</h3>
			<div class="info">
				<img src="http://tp2.sinaimg.cn/2186171705/180/5603710262/1" alt="" class="head-pic">
				<div class="info-panel">
					<div class="basic">
						<div class="class-basic">
							<div class="class-name">初中署期精品班课</div>
							<div class="class-scope">一对一学生上门</div>
						</div>
						<div class="class-time">上课时间: <span sn-binding="html:classTime">2015.12.12</span></div>
					</div>
					<div class="btn-group">
						<a href="javascript:;" class="send-note handled">叮嘱一下</a>
						<a href="javascript:;" class="homework handled">布置作业</a>
					</div>
				</div>
			</div>
			<div class="resp-group">
				<textarea name="content" id="" cols="30" rows="10" maxlength="200" ></textarea>
				<a href="javascript:;" class="submit-btn">发送</a>
			</div>
		</li> -->

	</ul>
</div>