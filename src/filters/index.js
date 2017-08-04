const urlParser = document.createElement('a')

export function domain(url) {
  urlParser.href = url
  return urlParser.hostname
}

export function count(arr) {
  return arr.length
}
export function int(num) {
  return parseInt(num)
}
export function fix(num, n) {
  return  num%1===0?num:parseFloat(num).toFixed(n)
}
export function money(s, n) {
  n = n || 0;
  s = (s == null ? 0 : s);
  if (s > 10000000) {
    s = new Number(s)
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
    return t.split("").reverse().join("") + "." + r;
  } else {
    return t.split("").reverse().join("");
  }
}
export function prettyDate(str) {
  return str == null ? "无" : str.split(" ")[0]
}
export function sub(str, startpos, num) {
  return str.substring(startpos, num)
}



