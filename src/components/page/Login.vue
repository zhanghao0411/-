<template>
	<div class="login-warp">
		<div class="login-titie">后台管理系统</div>
		<div class="login-content">
			<el-form :model="loginFrom" :rules="rules"  ref="loginFrom" label-width="0px" class="loginFrom">
				<el-form-item prop="username">
                    <el-input placeholder="用户名" v-model="loginFrom.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="loginFrom.password" @keyup.enter.native="submitForm('loginFrom')"></el-input>
                </el-form-item>
                <div class="loginBtn">
                	 <el-button  type="primary" @click="submitForm('loginFrom')">登录</el-button>
                </div>
			</el-form>
		</div>
	</div>
</template>
<script>
import API from '../../api/API'
const api = new API();
	export default{
		data:function(){
			return{
				loginFrom:{
					username:'',
					password:''
				},
				rules:{
					username:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
            			{ min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
            			{ min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
					],
				}
			}
		},
		methods:{
			submitForm(formName){
			    this.$refs[formName].validate((valid) => {
		          	if (valid) {
		          		let self = this;
		          		let params = {
							api:"/product/user/login",
							param:{
								username:self.loginFrom.username,
								password:self.loginFrom.password
							}
						};
						api.post(params).then(function(res){
							if(res.data.code!=='1'){
								 self.$alert(res.data.message, '登录提示');
								
							}else{
							    sessionStorage.setItem('ljwtoken',res.data.data.token);
							    sessionStorage.setItem('ljwusername',res.data.data.user.username);
							   
							 /*   let token = sessionStorage.getItem('ljwtoken');*/
							    self.$notify({
							        title: '成功',
							        message: res.data.message,
							        type: 'success'
							    });
							    self.$router.push('/index');
							}
						}).catch(function(error){
							self.$alert('连接错误，请稍后再试……', '登录提示');

						})		
		        	
		          	}else {
			            return false;
			        }
			    })
			}
		}
	}
</script>

<style lang="scss" scoped="" type="text/css">
	.login-warp{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #324157;
		.login-titie{
			color: #fff;
			width: 300px;
			height: 60px;
			line-height: 60px;
			font-size: 32px;
			position: absolute;
			top: 35%;
			left: 50%;
			margin-left: -150px;
		}
		.loginFrom{
			padding: 40px;
			width: 300px;
			position: absolute;
			top: 40%;
			left: 50%;
			border-radius: 5px;
			background-color: #fff;
			margin-left: -190px;	
		}
		
}

</style>