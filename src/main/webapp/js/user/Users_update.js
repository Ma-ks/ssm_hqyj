var vue = new Vue({
	el: '#userUpdateForm',
	data: {
		rowData: {},
	},
	methods: {
		//初始化表单
		initForm: function() {
			var that = this;
			that.rowData = parent.vue.rowData;

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
					data.field.id = that.rowData.id;
					// alert(JSON.stringify(data.field));
					$.ajax({
						type: "post",
						url: "/userController/updateUser",
						data: data.field,
						success: function(data) {
							if (data.code == 1) {
								//添加成功
								layer.msg('更新成功', {
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
								layer.msg('更新失败', {
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
	updated: function() {
		layui.use(['form'], function() {
			var form = layui.form;
		});
	}
});
