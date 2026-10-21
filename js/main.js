function $(i){return document.getElementById(i)}
$("n1").textContent=C.n1;$("n2").textContent=C.n2;
$("envNames").textContent=C.n1+" & "+C.n2;
$("dateTxt").textContent=C.dateTxt;
$("placeName").textContent=C.place;$("placeAddr").textContent=C.addr;
var q=encodeURIComponent(C.mapQuery);
$("gmaps").href="https://www.google.com/maps/search/?api=1&query="+q;
$("waze").href="https://waze.com/ul?q="+q+"&navigate=yes";
$("tips").innerHTML=C.tips.map(function(t){return"<li>"+t+"</li>"}).join("");
$("tl").innerHTML=C.program.map(function(p){return"<li><time>"+p[0]+"</time><p><strong>"+p[1]+"</strong>"+p[2]+"</p></li>"}).join("");
$("dressTxt").textContent=C.dress;
$("sw").innerHTML=C.colors.map(function(c){return'<i style="background:'+c+'"></i>'}).join("");
$("rsvpLead").textContent=C.rsvpBy;
$("foot").textContent=C.foot+", "+C.n1+" & "+C.n2;

function tick(){
  var d=new Date(C.date)-new Date();
  if(d<0){$("count").innerHTML="<strong style='font:400 24px var(--serif)'>C’est aujourd’hui !</strong>";return}
  var j=Math.floor(d/864e5),h=Math.floor(d%864e5/36e5),m=Math.floor(d%36e5/6e4);
  $("count").innerHTML=[[j,"jours"],[h,"heures"],[m,"min"]].map(function(x){return"<div><strong>"+x[0]+"</strong><span>"+x[1]+"</span></div>"}).join("");
}
tick();setInterval(tick,30000);

$("seal").addEventListener("click",function(){
  $("wrap").classList.add("open");
  setTimeout(function(){$("env").classList.add("gone");document.body.classList.remove("locked")},2100);
});
$("f").addEventListener("submit",function(e){
  e.preventDefault();
  var yes=document.querySelector('input[name=r]:checked').value==="yes";
  var t=yes?"Bonjour ! Je serai présent(e) à votre mariage. Nom : "+$("nm").value+" – Nombre de personnes : "+$("nb").value+". Félicitations ! 💍"
           :"Bonjour ! Malheureusement, je ne pourrai pas être là. Nom : "+$("nm").value+". Tous mes vœux de bonheur ! 💍";
  window.open("https://wa.me/"+C.phone+"?text="+encodeURIComponent(t),"_blank");
});
