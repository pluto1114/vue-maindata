<template>
  <div class="excel" @click="handleExport">
  	<slot></slot>
  	<template v-if="selector">
  	<table :id="tid" class="table my-excel-table">
  	</table>
  	</template>
  	<template v-else>
    <table :id="tid" class="table my-excel-table">
    	<thead>
    		<tr>
    			<th v-for="x of headers">{{x}}</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr v-for="x of items">
    			<td v-for="k of keys">{{x[k]}}</td>
    		</tr>
    	</tbody>
    </table>
    </template>
  </div>
</template>

<script>
export default {
    name: 'excel',
    props:['cols','items','selector','filename'],
    data () {
		let tid='tid'+new Date().getTime()
	  	if (this.selector) {
	  		console.log("from table")
	  		return {tid}
	  	}else{
		    return {
		    	keys:_.keys(this.cols),
				headers:_.values(this.cols),
				tid
		    }
		}
    },
    mounted(){
		if(this.items)
		console.log(this.filename,this.items.length)
    },
    methods:{
	  	handleExport(){
	  		let time=formatDate(new Date())
			let filename=this.filename
			filename=filename?`${filename}_${time}.xlsx`:`excel报表_${time}.xlsx`
	  		// console.log(this.selector)
	  		// console.log(document.querySelector(this.selector).innerHTML)
	  		if (this.selector)
	 			document.querySelector('#'+this.tid).innerHTML=document.querySelector(this.selector).innerHTML
			this.export_table_to_excel('#'+this.tid, 'xlsx',filename)
	  	},
	  	export_table_to_excel(selector, type, fn) {
		    var wb = XLSX.utils.table_to_book(document.querySelector(selector), {sheet:"Sheet JS"});
		    var wbout = XLSX.write(wb, {bookType:type, bookSST:true, type: 'binary'});
		    var fname = fn || 'test.' + type;
		    try {
		        saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), fname);
		    } catch(e) { if(typeof console != 'undefined') console.log(e, wbout); }
		    return wbout;
		},
		s2ab(s) {
		    if(typeof ArrayBuffer !== 'undefined') {
		        var buf = new ArrayBuffer(s.length);
		        var view = new Uint8Array(buf);
		        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		        return buf;
		    } else {
		        var buf = new Array(s.length);
		        for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
		        return buf;
		    }
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my-excel-table{
	display: none;
}
</style>
