//////////////////////////////////////////
// Skicka tillbaka en svensk datumsträng
//////////////////////////////////////////
const Dateify = (timestamp) => {
 let days = ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag","söndag"];
 let months = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"];
 return `${days[timestamp.getDay()]} ${timestamp.getDate()} ${months[timestamp.getMonth()]} ${timestamp.getYear()+1900}`

}
export default Dateify;
