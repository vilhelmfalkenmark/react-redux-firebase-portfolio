//////////////////////////////////////////
// Används för att regexifiera URL:er
//////////////////////////////////////////
const Regexify = (rawString) => {
return encodeURIComponent(rawString.toLowerCase()).replace(/!/g,'')
.replace(/%20/g,'-').replace(/%C3%A4/g,'a')
.replace(/%C3%A5/g,'a').replace(/%C3%B6/g,'o');
}
export default Regexify;
