import { handleSubmit } from "./js/app";
import "./style/style.scss";
// alert("I EXIST");
function refreshData()
{
var element = document.getElementById("resp");
if (window.outerWidth>720){
	element.classList.add("col-4");

}else{
	element.classList.remove("col-4");

}
setTimeout(refreshData, 1*1000);
}
refreshData();
console.log("CHANGE!!");
export { handleSubmit };

