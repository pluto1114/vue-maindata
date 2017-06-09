function money(s,n) {  
    n = n > 0 && n <= 20 ? n : 2;  
    s=(s==null?0:s);
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
    var l = s.split(".")[0].split("").reverse()
    let r = s.split(".")[1];  
    var t = "";  
    for (let i = 0; i < l.length; i++) {  
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
    }  
    return t.split("").reverse().join("");  
} 