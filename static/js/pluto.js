function money(s,n) {  
    n=n || 0;
    s=(s==null?0:s);
    if(s>10000000){
      s=new Number(s)
    }
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
    var l = s.split(".")[0].split("").reverse()
    let r = s.split(".")[1];  
    var t = "";  
    for (let i = 0; i < l.length; i++) {  
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
    }  
    // console.log(n,r)
    if (n) {
      return t.split("").reverse().join("")+"."+r;
    }else{
      return t.split("").reverse().join("");
    }  
} 

function formatDate(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
}

// function s2ab(s) {
//     if(typeof ArrayBuffer !== 'undefined') {
//         var buf = new ArrayBuffer(s.length);
//         var view = new Uint8Array(buf);
//         for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//         return buf;
//     } else {
//         var buf = new Array(s.length);
//         for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
//         return buf;
//     }
// }

// function export_table_to_excel(selector, type, fn) {
//     var wb = XLSX.utils.table_to_book(document.querySelector(selector), {sheet:"Sheet JS"});
//     var wbout = XLSX.write(wb, {bookType:type, bookSST:true, type: 'binary'});
//     var fname = fn || 'test.' + type;
//     try {
//         saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fname);
//     } catch(e) { if(typeof console != 'undefined') console.log(e, wbout); }
//     return wbout;
// }