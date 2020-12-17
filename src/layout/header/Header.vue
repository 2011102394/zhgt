<template>
	<div class="header-container">
		<div class="logo-container">
			<img src="../../assets/logo.png" alt="" class="logo">
			<div class="logo-title">国土空间规划大数据系统平台</div>
		</div>
		<div class="nav-container">
			<el-menu
				mode="horizontal"
				default-active="$route.path"
				background-color="#00569d"
				text-color="#fff"
				active-text-color="#fff"
			
				router
			>
				<el-submenu index="0" popper-class="sub-menu-item">
					<template slot="title">一张图</template>
					<el-menu-item index="0-0" route="/oneMap/resourcesScan"
						>资源浏览</el-menu-item
					>
					<el-menu-item index="0-1" route="/oneMap/ThemeMap"
						>专题图制作</el-menu-item
					>
					<el-menu-item index="0-2" route="/oneMap/ContrastiveAnalysis"
						>对比分析</el-menu-item
					>
				</el-submenu>
				<el-submenu index="1">
					<template slot="title">规划分析评价</template>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">规划审查管理</template>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">开放能力</template>
				</el-submenu>
			</el-menu>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Header',
	methods: {
		handleSelect(key, keyPath) {
			console.log(key)
			console.log(keyPath)
			console.log(this.$route)
		},
	},
}
</script>

<style lang="less">
.header-container {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 60px;
	background-color: #00569d;
	// color: #fff;
	.logo-container {
		width: 30%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.logo{
			height: 40px;
		}
		.logo-title{
			color: #fff;
			font-size: 20px;
			letter-spacing: 0.2em;
			width: 70%;
			font-weight: bold;
		}
	}
	.nav-container {
		margin-left: 40%;
		width: 30%;
	}
}
.sub-menu-item {
	background-color: #fff !important;
}
</style>
