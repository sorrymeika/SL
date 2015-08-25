<header class="teacher-header">
    <div class="head_back " sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>

<div class="main ">

<div class="message-list" sn-repeat="item in data" sn-binding="data-id:item.id">
	<div class="item-pic">
		<img sn-binding="src:item.imgUrl" alt="">
	</div>
	<!-- <img sn-binding="src:data.Pic1|or:data.Pic" /> -->
	<div class="info">
		<div class="title" sn-binding="html:item.title"></div>
		<div class="date" sn-binding="html:item.timeStamp">12-12 12:12</div>
		<div class="descr">你也可以让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。</div>
	</div>
</div>

<!-- <div class="message-list">
	<div class="pic order">
		
	</div>
	<div class="info">
		<div class="title">胡同学给你提了个问题</div>
		<div class="date">12-12 12:12</div>
		<div class="descr">你也可以让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。</div>
	</div>
</div> -->

</div>