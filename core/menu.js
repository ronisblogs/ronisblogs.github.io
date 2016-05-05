function iniMenus(x) { for (var i in x) { var y=x[i].obj; var sClass=y.id.slice(0,4); if (sClass=='menu') { new addMenu(x[i]); }
 if (sClass=='lfra') { new addLightFrame(x[i]); } if (sClass=='qbut') { new addQuickButton(x[i]); } } }
var aMenus=new Array();
function addMenu(x) { var that=this; var vObj=x.obj; var sId=vObj.id; var sOnTop=x.props['stayontop'];
 var sFixedW=x.props['fixedwidth']; var iLeadout=parseInt(x.props['leadout']); var sH=vObj.style.height; var sW=vObj.style.width;
 var sZ=vObj.style.zIndex; var vContent=vObj.getElementsByTagName('div')[1]; var vFx=vObj.getElementsByTagName('div')[0];
 var sTrIn='height 0.3s'; var sTrans; vObj.addEventListener('mouseover',function() { sTrans=vObj.style.transition;
 vObj.style.transition=sTrIn; if (aMenus[sId]!=undefined) {clearTimeout(aMenus[sId])}
 if (sOnTop=='true') {vObj.style.zIndex=9999}
 if (stripPx(sH)<vContent.offsetHeight-2) {vFx.style.height=sH; vObj.style.height=vContent.offsetHeight+iLeadout+'px';} },false);
 vObj.addEventListener('mouseout',function() { vObj.style.transition+=', z-index 0s 0.3s';
 aMenus[sId]=setTimeout(function(){vObj.style.height=sH; vObj.style.width=sW; vObj.style.zIndex=sZ; vObj.style.transition=sTrans;},100);
 },false); }
function addQuickButton(x) { var that=this; var vObj=x.obj; var sId=vObj.id; var vContent=document.getElementById(sId+'x');
 var vShadow=vObj.style.boxShadow; vObj.addEventListener('mousedown',function() {
 if (vContent) {vContent.style.paddingTop='1px';} var s=vShadow; if (s!='') {s+=', ';}
 vObj.style.boxShadow=s+'inset 1px 1px 1px rgba(0,0,0,0.8),inset -1px -1px 1px rgba(255,255,255,0.5)'; },false);
 vObj.addEventListener('mouseup',function() { if (vContent) {vContent.style.paddingTop='0';} vObj.style.boxShadow=vShadow;
 },false); }
function addLightFrame(x) { var that=this; var vObj=x.obj; var sId=vObj.id; var sTgt=x.props['name']; var sSrc=x.props['src'];
 var iW=x.props['width']; var iH=x.props['height']; var iMT=-Math.floor(stripPx(iH)/2)+'px';
 var iML=-Math.floor(stripPx(iW)/2)+'px'; var sScrollbars=x.props['scrollbars']; var iDimSpeed=x.props['dimspeed'];
 var sDimColor=x.props['dimcolor']; var vDiv=document.createElement('div'); vDiv.id='lf'+sId;
 vDiv.style.cssText='position:fixed; display:none; visibility:hidden; width:'+iW+'; height:'+iH+'; margin-top:'+iMT+'; margin-left:'+iML+'; top:50%; left:50%; z-index:9999; border-style:solid; border-width:1px; box-shadow:0 0 35px black; -moz-box-shadow:0 0 35px black; -webkit-box-shadow:0 0 35px black';
 document.getElementsByTagName('body')[0].appendChild(vDiv); var vFra=document.createElement('iframe'); vFra.name=sTgt;
 vFra.className=sScrollbars;
 vFra.style.cssText='position:absolute; left:0; top:0; width:100%; height:100%; background-color:silver'; vFra.frameBorder='0';
 if (sScrollbars=='hid') { vFra.scrolling='no' }; if (sScrollbars=='scr') { vFra.scrolling='yes' };
 vFra.onload=function() { var x=vDiv.style; if (x.visibility=='hidden') { x.visibility='visible' } else { x.display='block' } };
 vDiv.appendChild(vFra); var vLinks=document.querySelectorAll('[target="'+sTgt+'"]'); for (var i=0; i<vLinks.length; i++) {
 var x=vLinks[i]; if (x.nodeName=='FORM') { var sE='submit' } else { var sE='click' }
 x.addEventListener(sE,function() {windowDim(75,iDimSpeed,sDimColor,function() { var x=vDiv.style; x.visibility='hidden'; x.display='none'; vFra.src=' '; vFra.src=''; })},false); }
 var vCls=document.createElement('div'); vCls.className='abs uns';
 vCls.style.cssText='top:-10px; right:-10px; width:24px; height:24px; font-family:Verdana,sans-serif; font-size:16px; color:#DDDDDD; text-align:center; vertical-align:middle; line-height:22px; box-shadow:0 0 4px black; -moz-box-shadow:0 0 4px black; -webkit-box-shadow:0 0 4px black; background-color:#333333; border-style:solid; border-width:1px; border-color:#333333; cursor:pointer';
 vCls.onclick=function() { document.getElementById('syswindim').onclick() };
 vCls.innerHTML='<b>X</b><div class="abs hid" style="background-color:white; opacity:0.5; filter:alpha(opacity=50); top:0; left:0; width:100%; height:50%"></div>';
 vDiv.appendChild(vCls); }
iniMenus(aUjTree['menu']);
