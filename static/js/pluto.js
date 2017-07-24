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

function filterArr(arr, searchText) {
  var data = arr
  var filterKey = searchText && searchText.toLowerCase()
  if (filterKey.length > 0) {
    data = data.filter(function (row) {
      return Object.keys(row).some(function (key) {
        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
      })
    })
  }
  return data
}