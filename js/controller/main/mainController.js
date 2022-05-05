(function(){
     loadHref(dvn('#page'),'pages/divingJs/properties.html');
})();


dvn('#mHeader').click(function(e){
     if(e.target.nodeName!='LI'){
          return;
     }
     utilitiesController.activeSelected(dvn('#mHeader').find('li'),e.target);
     dvn('#page').empty();
     switch( dvn(e.target).attr('dvn-role') ){
          case 'home':
               loadHref(dvn('#page'),'pages/divingJs/properties.html');
          break;
          case 'ui':
               loadHref(dvn('#page'),'pages/divingJsUi/main/maincontroller.html');
          break;
          case 'download':
               //loadHref(dvn("#page"),'pages/download/index.html');
          //loadHref(dvn('#page'),'pages/divingJsUi/main/maincontroller.html');
          break;
          case 'edt':
               loadHref(dvn('#page'),'pages/divingJs/properties.html');
               //window.open("http://localhost:8420");
			//window.open("http://divingjs.dyndns.org:8420");
               window.open("http://appdiving.com:8420");
          //loadHref(dvn('#page'),'pages/divingJsUi/main/maincontroller.html');
          break;
     }
});

function seleccion(elem){
	var fld = dvn( elem ).attr('field');
	dvn(elem).append( dvn('<input>',{value:fld, id:'imp_tmp'}) );
	var copyText = document.getElementById('imp_tmp');
	copyText.select();
	copyText.setSelectionRange(0,99999);
	document.execCommand('copy');
	//console.log('elemento copiado: ', copyText.value );
	dvn('#imp_tmp').remove();
}

function openDetail(tg){
     loadHref(dvn('#contentPage'),'pages/divingJs/props/detalle/'+tg+'.html');
}