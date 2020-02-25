var vue = new Vue({
	el: '#loginform',
	data: {
		loginData: {},
	},
	methods: {
		submit: function() {
			//that 为 Vue 对象
			var that = this;
			layui.use('form', function() {
				var form = layui.form;
				//监听提交
				form.on('submit(submitbutton)', function(data) {
					that.loginData = data.field;
					//向服务端发送请求.验证用户名和密码
					$.ajax({
						type: "post",
						url: "/userController/login",
						data: that.loginData,
						success: function(data) {
							//根据服务器返回信息进行判断
							if (data === "用户名不存在" || data === "密码错误") {
								layer.msg(data);
							} else {
								//判断复选框是否被选中,选中就存储到Cookie中
								var check = $("#saveUser").prop("checked");
								if (check && $.cookie("username") == undefined && $.cookie("password") == undefined) {
									//使用jq存储Cookie
									// $.cookie('the_cookie', 'the_value', { expires: 7, path: '/' });
									$.cookie("username", that.loginData.username, {
										expires: 30,
										path: "/html/login.html"
									});
									$.cookie("password", that.loginData.password, {
										expires: 30,
										path: "/html/login.html"
									});
								} else {
									//如果没有选中复选框,就对Cookie进行删除
									$.removeCookie('username', {
										path: '/html/login.html'
									});
									$.removeCookie('password', {
										path: '/html/login.html'
									});
								}
								//跳转页面
								window.location.href = "../html/user/Users_list.html";
							}
						},
						error: function(data) {
							layer.msg("ajax请求失败");
						},
						dataType: "text" //设置返回类型
					});
					//让原先的Button失效
					return false;
				});
			});
		},
		//保存用户的账号和密码到浏览其中
		saveUserInfo: function() {
			layui.use('form', function() {
				var form = layui.form;
				//监听提交
				form.on('submit(submitbutton)', function(data) {
					var check = $("#saveUser").prop("checked");
					alert(check);
				});
			});
		},
		//页面渲染完毕后给输入框赋值
		cookieToHtml: function() {
			var cookieUsername = $.cookie("username");
			var cookiePassword = $.cookie("password");
			if (cookieUsername != undefined && cookiePassword != undefined) {
				$('input[name="username"]').val(cookieUsername);
				$('input[name="password"]').val(cookiePassword);
				$("#saveUser").attr("checked", "checked");
			}
		},

	},

	mounted: function() {
		this.cookieToHtml();
		// this.saveUserInfo();
		this.submit();
	},
});
