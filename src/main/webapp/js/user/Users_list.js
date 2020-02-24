var vue = new Vue({
	el: '#userTableVue',
	data: {
		tableObj: {},
		condition: {},
		rowData: {},
	},
	methods: {
		//初始化表格
		initTable: function() {
			//taht 是 vue
			var that = this;

			layui.use('table', function() {
				var table = layui.table;
				that.tableObj = table;
				table.render({
					elem: '#test',
					url: '/userController/show',
					cellMinWidth: 80,
					toolbar: '#toolbarDemo',
					title: '用户数据表',
					cols: [
						[{
							type: 'checkbox',
							fixed: 'left',
						}, {
							field: 'id',
							title: 'ID',
							sort: true,
						}, {
							field: 'username',
							title: '姓名',
						}, {
							field: 'password',
							title: '密码',
							hide: true,
						}, {
							field: 'sex',
							title: '性别',
							sort: true,
						}, {
							field: 'birthday',
							title: '出生日期',
						}, {
							field: 'phone',
							title: '电话',
						}, {
							field: 'mail',
							title: '邮箱',
							hide: true,
						}, {
							field: 'education',
							title: '学历',
							sort: true,
							hide: true,
						}, {
							field: 'department',
							title: '部门',
							sort: true,
							hide: true,
						}, {
							field: 'position',
							title: '职位',
							sort: true,
						}, {
							field: 'entryTime',
							title: '入职时间',
							hide: true,
						}, {
							field: 'personStatic',
							title: '人员状态',
							sort: true,
							hide: true,
						}, {
							field: 'note',
							title: '备注',
							hide: true,
						}, {
							fixed: 'right',
							title: '操作',
							toolbar: '#barDemo',
							width: 150
						}]
					],
					page: true,
					contentType: 'application/json',
					method: "post",

				});
			});
		},
		//头部工具栏
		headTool: function() {
			var that = this;
			layui.use('table', function() {
				var table = layui.table;
				table.on('toolbar(test)', function(obj) {
					var checkStatus = table.checkStatus(obj.config.id);
					switch (obj.event) {
						case 'selectUser':
							that.selectUserMethod();
							break;
						case 'addUser':
							that.addUserMethod();
							break;
						case 'delUsers':
							layer.confirm('真的删除行么', function(index) {
								var users = checkStatus.data;
								that.delUserById(users);
							});
							break;
					};
				});

			});
		},
		//编辑工具栏
		editTool: function() {
			var that = this;
			layui.use('table', function() {
				var table = layui.table;
				//监听行工具事件
				table.on('tool(test)', function(obj) {
					var data = obj.data;
					if (obj.event === 'edit') {
						that.rowData = data;
						//打开编辑窗口
						layer.open({
							type: 2,
							title: '修改用户',
							area: ['100%', '100%'],
							content: '/html/user/Users_update.html',
						});

					} else if (obj.event === 'del') {
						layer.confirm('真的删除行么', function(index) {
							var users = [obj.data];
							that.delUserById(users);
						});
					}
				});

			});
		},
		//删除用户
		delUserById: function(users) {
			var that = this;
			//获取待删除的id列表
			var ids = [];
			for (var index in users) {
				ids.push(users[index].id);
			}
			//给服务器发送请求
			$.ajax({
				type: "post",
				url: "/userController/delUser",
				data: {
					ids: ids.toString()
				},
				// contentType: "application/json",
				success: function(data) {
					if (data.code == 1) {
						//删除成功
						that.reloadTable();
						layer.msg('删除成功', {
							icon: 1,
							time: 2000
						});
					} else {
						//删除失败
						layer.msg('删除失败', {
							icon: 1,
							time: 2000
						});
					}
				},
				error: function(data) {
					alert("ajax请求失败");
				},
				dataType: "json" //设置返回类型
			});
		},
		//输入框查询
		selectUserMethod: function() {
			var that = this;
			var usernameVal = $("#username").val();
			that.condition.username = usernameVal;
			//重载表格
			layui.use('table', function() {
				var table = layui.table;
				table.reload('test', {
					where: {
						condition: that.condition
					},
					page: {
						curr: 1 //重新从第 1 页开始
					}
				}); //只重载数据
			});
		},
		//添加用户按钮
		addUserMethod: function() {
			layer.open({
				type: 2,
				title: '添加用户',
				area: ['100%', '100%'],
				content: '/html/user/Users_add.html',
			});
		},
		//重载表格
		reloadTable: function() {
			layui.use('table', function() {
				var table = layui.table;
				table.reload('test'); //只重载数据
			});
		},
		//监听行事件,用于打开当前行的详细信息.
		rowClick: function() {
			var that = this;
			layui.use('table', function() {
				var table = layui.table;
				//监听行单击事件（双击事件为：rowDouble）
				table.on('rowDouble(test)', function(obj) {
					var data = obj.data;
					that.rowData = data;
					//打开详细列表网页,用于显示详细信息
					layer.open({
						type: 2,
						title: '用户详细信息',
						area: ['100%', '100%'],
						content: '/html/user/Users_detail.html',
					});
					//标注选中样式
					obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
				});
			});
		}



	},
	mounted: function() {
		this.initTable();
		this.headTool();
		this.editTool();
		this.rowClick();
	},
});


// layui.use('table', function(){
//   var table = layui.table;

//   table.render({
//     elem: '#test'
//     ,url:'/test/table/demo1.json'
//     ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
//     ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
//       title: '提示'
//       ,layEvent: 'LAYTABLE_TIPS'
//       ,icon: 'layui-icon-tips'
//     }]
//     ,title: '用户数据表'
//     ,cols: [[
//       {type: 'checkbox', fixed: 'left'}
//       ,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
//       ,{field:'username', title:'用户名', width:120, edit: 'text'}
//       ,{field:'email', title:'邮箱', width:150, edit: 'text', templet: function(res){
//         return '<em>'+ res.email +'</em>'
//       }}
//       ,{field:'sex', title:'性别', width:80, edit: 'text', sort: true}
//       ,{field:'city', title:'城市', width:100}
//       ,{field:'sign', title:'签名'}
//       ,{field:'experience', title:'积分', width:80, sort: true}
//       ,{field:'ip', title:'IP', width:120}
//       ,{field:'logins', title:'登入次数', width:100, sort: true}
//       ,{field:'joinTime', title:'加入时间', width:120}
//       ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
//     ]]
//     ,page: true
//   });

//   //头工具栏事件
//   table.on('toolbar(test)', function(obj){
//     var checkStatus = table.checkStatus(obj.config.id);
//     switch(obj.event){
//       case 'getCheckData':
//         var data = checkStatus.data;
//         layer.alert(JSON.stringify(data));
//       break;
//       case 'getCheckLength':
//         var data = checkStatus.data;
//         layer.msg('选中了：'+ data.length + ' 个');
//       break;
//       case 'isAll':
//         layer.msg(checkStatus.isAll ? '全选': '未全选');
//       break;
//     };
//   });

//   //监听行工具事件
//   table.on('tool(test)', function(obj){
//     var data = obj.data;
//     //console.log(obj)
//     if(obj.event === 'del'){
//       layer.confirm('真的删除行么', function(index){
//         obj.del();
//         layer.close(index);
//       });
//     } else if(obj.event === 'edit'){
//       layer.prompt({
//         formType: 2
//         ,value: data.email
//       }, function(value, index){
//         obj.update({
//           email: value
//         });
//         layer.close(index);
//       });
//     }
//   });
// });
