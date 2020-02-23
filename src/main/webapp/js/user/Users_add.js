var vue = new Vue({
	el: '#userAddForm',
	data: {

	},
	methods: {
		//初始化表单
		initForm: function() {

			var that = this;

			layui.use(['form', 'layedit', 'laydate', 'jquery'], function() {
				var form = layui.form,
					layer = layui.layer,
					layedit = layui.layedit,
					laydate = layui.laydate;
				//出生日期
				laydate.render({
					elem: '#birthday'
				});
				//出生日期
				laydate.render({
					elem: '#entryTime'
				});

				//监听提交
				form.on('submit(submitButton)', function(data) {
					$.ajax({
						type: "post",
						url: "/userController/addUser",
						data: data.field,
						success: function(data) {
							if (data.code == 1) {
								//添加成功
								layer.msg('添加成功', {
									icon: 1,
									time: 2000
								}, function() {
									//重载表格
									parent.vue.reloadTable();
									var index = parent.layer.getFrameIndex(window.name);
									//关闭当前窗口
									parent.layer.close(index);
								});
							} else {
								//添加失败
								layer.msg('添加失败', {
									icon: 2,
									time: 2000
								}, function() {
									var index = parent.layer.getFrameIndex(window.name);
									//关闭当前窗口
									parent.layer.close(index);
								});
							}
						},
						error: function(data) {
							alert("ajax请求失败");
						},
						dataType: "json" //设置返回类型
					});
					return false;
				});

			});
		}
	},
	mounted: function() {
		this.initForm();
	},
});
