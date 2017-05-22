const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function count (arr) {
  return arr.length
}
export function int (num) {
  return parseInt(num)
}
export function money(s,n) {  
    n = n > 0 && n <= 20 ? n : 2;  
    var s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
    var l = s.split(".")[0].split("").reverse()
    let r = s.split(".")[1];  
    var t = "";  
    for (let i = 0; i < l.length; i++) {  
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
    }  
    return t.split("").reverse().join("");  
}  
export function prettyDate (str) {
  return str==null?"无":str.split(" ")[0]
}


