var vue = new Vue({
	el: '#tableDetail',
	data: {
		rowData:{},
	},
	methods: {
		getRowData: function() {
			this.rowData = parent.vue.rowData;
		}
	},
	mounted: function() {
		this.getRowData();
	},
});
