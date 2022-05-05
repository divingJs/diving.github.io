function vaciarCache(){
    dvn.each(diving.cache,function(i,v){
        var elements = Object.keys(v);
        if(dvn('#'+dvn(v[elements[0]].elem).attr('id')).length==0){
            delete diving.cache[i];
        }
    });
}
//divButton
(function() {
    var widget = {
        name: "Button",
        init: function(prm) {
            vaciarCache();
            prm = diving.extend(prm, {
                text:prm.text||diving(this)[0].innerHTML||'',
                classParent:"d-button",
                class:((prm.type)?'d-'+prm.type:'d-default')+((prm.class)?' '+prm.class:''),
                type:(prm.type)?prm.type:'default'
            });
            var widtgetData = {
                setText: function(t) {
                    diving(diving(this.elm).find('button')).text(t);
                    this.text = t;
                },
                elem:diving(this)[0]
            };
            widget.createElement(prm,widtgetData);
            diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            diving(data.elem).empty();
            var attributes = diving.extend(p, {
                text: p.text,
                class: p.class,
                type: p.type
            });
            diving(data.elem).addClass(p.classParent);
            delete attributes.classParent;
            var elemento = diving('<button>', attributes);
            (p.type == 'disabled') ? elemento[0].onclick = function(event) {
                event.preventDefault();
            }: null;
            (p.icon) ? elemento[((typeof p.icon === 'string') ? 'append' : ((p.icon.pos == 'before') ? 'prepend' : 'append'))](diving('<em>', {
                class: (typeof p.icon === 'string') ? p.icon : p.icon.class
            })): null;
            diving(data.elem).append(elemento);
            diving.extend(data,attributes);
        }
    };
    diving.widget(widget);
})();

/*Notification*/
(function() {
    var widget = {
        name: "Notification",
        init: function(prm) {
            vaciarCache();
            prm = diving.extend(prm, {
                text: prm.text || diving(this)[0].innerHTML || '',
                classParent:"d-notification",
                class: ((prm.type) ? 'd-' + prm.type : 'd-default') + ((prm.class) ? ' ' + prm.class : ''),
                type: (prm.type) ? prm.type : 'default'
            });
            var widtgetData = {
                setText: function(t) {
                    diving(diving(this.elem).find('div')).text(t);
                    this.text = t;
                },
                destroy:function(){
                    diving(this.elem).removeData('divNotification');
                    diving(this.elem)[0].remove();
                },
                setType:function(t){
                    diving(this.elem).find('div').attr('type',t);
                    diving(this.elem).find('div').attr('class','d-'+t);
                    this.class='d-'+t;
                    this.type = t;
                },
                elem:diving(this)[0]
            };
            widget.createElement(prm,widtgetData);
            diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            diving(data.elem).empty();
            //getIcon
            var icn=(p.icon)?p.icon:null;
            delete p.icon;
            //getConfirm
            var confirm = (p.hasOwnProperty('confirm'))?p.confirm:false;
            p.type=(confirm)?'light':p.type;
            p.class=(confirm)?'d-light':p.class;
            delete p.confirm;
            var action={
                cancel:(p.action)?p.action.cancel  ||function(){}:function(){},
                confirm:(p.action)?p.action.confirm||function(){}:function(){}
            };
            delete p.action;
            var attributes=diving.extend(p,{text:p.text,class:p.class,type:p.type});
            diving(data.elem).addClass(p.classParent);
            if(p.configure!=null){
                var stl="";diving.each( Object.keys( p.configure ),function(i,v){stl+=v+':'+p.configure[v]+';'});diving(data.elem).attr('style',stl);
                delete p.configure;
            }
            delete attributes.classParent;
            if(p.autoClose){
                var x=diving(data.elem);
                setTimeout(function(){diving(x).data('divNotification').destroy();},p.autoClose);
                delete p.autoClose;
            }
            var elemento = diving('<div>', attributes);
            (icn)?elemento[
                ((typeof icn==='string')?'append':((icn.pos=='before')?'prepend':'append'))
                ](diving('<em>',{class:(typeof icn==='string')?icn:icn.class})): null;
            var em = diving('<em>',{class:'icon-close3',
                    click:function(e){
                        diving(this.parentNode).data('divNotification').destroy();
                    }
                });
            diving(data.elem).append(em).append(elemento);
            if(confirm){
                var cancel=diving('<div>',{class:'d-confirm-cancel'});
                var confirmacion=diving('<div>',{class:'d-confirm-confirm'});
                diving(data.elem).append(diving('<div>',{class:'d-clear'})).append(cancel).append(confirmacion).append(diving('<div>',{class:'d-clear'}));
                diving(data.elem).attr('style','background-color: #969696;padding: 1px 5px 5px;border-radius: 0;display:block;width: auto;');
                cancel.divButton({
                    type: 'danger',
                    text: 'Cancelar',
                    click:function(){
                        action.cancel.constructor=cancel.click;
                        action.cancel();
                    }
                });
                confirmacion.divButton({
                    type: 'success',
                    text: 'Aceptar',
                    click:function(){
                        action.confirm.constructor=confirmacion.click;
                        action.confirm();
                    }
                });
            }
            diving.extend(data,attributes);
        }
    };
    diving.widget(widget);
})();

/*textbox*/
(function() {
    var widget = {
        name: "Text",
        init: function(prm) {
            vaciarCache();
            prm = diving.extend(prm, {
                text: prm.text || diving(this)[0].innerHTML || '',
                class: "d-text" + ((prm.type) ? ' d-' + prm.type : ' d-default') + ((prm.class) ? ' ' + prm.class : '')
            });
            var widtgetData = {
                setText: function(t) {
                    console.log( diving(this.elm).find('input')[0] );
                    diving(this.elm).find('input')[0].value=t;this.text=t;
                },
                getValue:function(){return this.text;},
                elem:diving(this)[0]
            };
            widget.createElement(prm,widtgetData);
            diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            diving(data.elem).empty();
            var attributes = diving.extend(p, {
                text: p.text,
                class: p.class,
                onchange:function(evt){
                    diving(this.parentNode.parentNode).data('divText').text=this.value;
                    p.text=this.value;
                    if(p.change){
                        p.change.constructor=this.onchange;
                        p.change(evt);
                    }
                },
                onkeyup:function(k){
                    diving(this.parentNode.parentNode).data('divText').text=this.value;
                    p.text=this.value;
                    if(p.keyup){
                        p.keyup.constructor=this.onkeyup;
                        p.keyup(k);
                    }
                },
                onkeydown:function(k){
                    diving(this.parentNode.parentNode).data('divText').text=this.value;
                    p.text=this.value;
                    if(p.keydown){
                        p.keydown.constructor=this.onkeydown;
                        p.keydown(k);
                    }
                }
            });
            if(attributes.hasOwnProperty('type')){
                if(attributes.type=='date'){
                    diving.extend(attributes,{
                        style:"width: max-content;"
                    });
                }
            }
            var w;
            if(p.width){w=p.width;delete p.width;}
            var elemento;
            if(p.multiple){
                if(typeof p.multiple!='object'){
                    delete p.multiple;
                }else{
                    attributes.rows=p.multiple.row;
                    attributes.cols=p.multiple.col;
                    (p.multiple.resize!=undefined)?(!p.multiple.resize)?attributes.style='resize:none;':'':'';
                    delete p.multiple;
                }
                elemento=diving('<textarea>',attributes);
            }else{
                elemento = diving('<input>', attributes);
            }
            diving(data.elem).append(diving('<div>').append(elemento));
            diving.extend(data,attributes);
        }
    };
    diving.widget(widget);
})();

function loadHref(parentTo,page) {
    var url = (page.endsWith('/')) ? page + 'index.html' : page.endsWith('.html') ? page : page;
    if (url == '#')
        return;
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    parentTo[0].innerHTML = req.responseText;
    var scr = parentTo[ 0 ].getElementsByTagName('script');
    var i = 0;
    var llamada = function( i ){
        var script = scr[i];
        var srcs = diving(script).attr('src');
        if (srcs != null) {
            diving(src[ i ]).remove();
            var fileref = diving('<script>', {
                "type": "text/javascript",
                "src": srcs
            });
            parentTo.append(fileref);
        } else if( i < scr.length ){
            i++;
            setTimeout(function(){
                if( script )
                    eval( script.innerHTML );
                llamada( i );
            },10);
        }
    };
    llamada( i );
}

/*Master*/
(function(){
    var widget = {
        name: "Master",
        init: function(prm) {
            vaciarCache();
            prm=diving.extend(prm,{class:"d-master-page d-row"});
            console.log( this, diving(this)[0] );
            var widtgetData = {
                elem:diving(this)[0]
            };
            widget.createElement(prm,widtgetData);
            //diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            diving(data.elem).empty();
            var attributes=diving.extend(p,{class:p.class});
            var elemento = diving('<div>',{class:attributes.class});
            diving(data.elem).addClass('d-container-12');
            console.log( data,data.elem, elemento );
            diving(data.elem).append(elemento);
            function add(content,elm){
                var actual = diving('<'+elm.type+'>',{class:elm.class});
                (elm.id!=undefined)?actual.attr('id',elm.id):null;
                content.append( actual );
                if(elm.hasOwnProperty('content')){
                    for(var sb in elm.content){
                        add(actual,elm.content[sb]);
                    }
                }
                if(elm.hasOwnProperty('load'))
                loadHref(actual,elm.load);
            }
            diving.each(p.content,function(i,v){
                add(elemento,v);
            });
            attributes.add = add;
            diving.extend(data,attributes);
        }
    };
    diving.widget(widget);
})();

/*TabsTrip*/
(function(){
    var widget = {
        name: "TabsTrip",
        init: function(prm) {
            vaciarCache();
            prm=diving.extend(prm,{class:"d-tabstrip"});
            var widtgetData = {
                elem:diving(this)[0]
            };
            widget.createElement(prm,widtgetData);
            diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            diving(data.elem).empty();
            var wdt=this;
            var title=diving('<div>',{'d-role':'title',class:'d-title'});
            var cnt=diving('<div>',{'d-role':'contenido',class:'d-tabstrip-content'});
            var attributes=diving.extend(p,{
                class:p.class,
                elements:[],
                contents:[],
                openElem:null,
                titulos:title,
                contenidos:cnt,
                add:function(element){
                    wdt.add(
                        element,
                        this.elements.length,
                        diving( this.titulos ),
                        diving( this.contenidos ),
                        this.properties,
                        this
                    );
                },
                properties:null
            });
            var elemento = diving('<div>',{class:attributes.class});
            diving(data.elem).append(elemento);
            elemento.append(diving('<div>',{class:'d-title-content'}).append(title)).append(diving('<div>',{class:'d-clear'})).append(cnt);
            var props={t1:0,t2:0,ini:0,fin:0,paso:false};
            diving.each(p.content,function(i,v){
                if(v.hasOwnProperty('open'))attributes.openElem='tab_'+i;
                wdt.add(v,i,title,cnt,props,attributes);
            });
            if(props.paso){
                wdt.creaScroll(title,props);
            }
            attributes.properties = props;
            diving.extend(data,attributes);
        },
        add:function(elm,i,title,cnt,prps,attrs){
            var elmTitle=diving('<div>',{
                    text:elm.title,
                    'd-elem':'tab_'+i,
                    class:'d-title-item'+((elm.hasOwnProperty('open'))?(!elm.open)?'':' d-tab-active':''),
                    click:function(){
                        var dta=diving(this.parentNode.parentNode.parentNode.parentNode).data('divTabsTrip');
                        var actual = diving(this).attr('d-elem');
                        diving.each(dta.elements,function(i,v){
                            if(v.attr('d-elem')==actual){
                                v.addClass('d-tab-active');
                                dta.contents[i].removeClass('d-hidden');
                            }else{
                                v.removeClass('d-tab-active');
                                dta.contents[i].addClass('d-hidden');
                            }
                        });
                    }
                });
            title.append(elmTitle);
            attrs.elements.push( elmTitle );
            var elmCnt = diving('<div>',{
                    'd-content':'tab_'+i,
                    class:'d-content-item'+((elm.hasOwnProperty('open'))?((!elm.open)?' d-hidden':''):' d-hidden')
                }).append(diving(elm.element));
            attrs.contents.push(elmCnt);
            cnt.append(
                elmCnt
            );
            prps.t1=title[0].parentNode.offsetWidth;
            prps.t2=prps.t2+elmTitle[0].offsetWidth;
            if(prps.t2<prps.t1){
                prps.fin=i;
            }else{
                prps.paso=true;
            }
        },
        creaScroll:function(title,prps){
            diving(title[0].parentNode.parentNode).prepend(
                diving('<div>',{
                    class:'icon-keyboard_arrow_left d-tabTitle-left',
                    click:function(){
                        var elemento = diving(this.parentNode.children[2])[0];
                        elemento.scrollTo((elemento.scrollLeft - 50),0);
                    }
                })
            );
            diving(title[0].parentNode.parentNode).prepend(
                diving('<div>',{
                    class:'icon-keyboard_arrow_right d-tabTitle-right',
                    click:function(){
                        var elemento = diving(this.parentNode.children[2])[0];
                        elemento.scrollTo((elemento.scrollLeft + 50),0);
                    }
                })
            );
            diving(title[0].parentNode).attr('style','overflow:hidden;width:'+prps.t1+'px;position:absolute;');
        }
    };
    diving.widget(widget);
})();

/*AutoComplete*/
(function(){
    var widget = {
        name: "AutoComplete",
        init: function(prm) {
            vaciarCache();
            prm=diving.extend(prm,{class:"d-autocomplete"});
            var widtgetData = {
                elem:diving(this)[0],
                value:null
            };
            widget.createElement(prm,widtgetData);
            diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            diving(data.elem).empty();
            var wdt=this;
            var attributes=diving.extend(p,{minkey:p.minkey||0,class:p.class,elements:{},itemSelected:null,select:{text:'',value:''},activos:[]});
            var input = diving('<input>',{
                        class:'d-input-autocomplete',
                        onchange:function(){
                            if(p.change){
                                p.change.constructor=this.onchange;
                                var dac = diving( this.parentNode.parentNode ).data('divAutoComplete');
                                p.value=this.value;
                                p.select=dac.select;
                                p.change(dac.value);
                            }
                        },
                        onkeydown:function(k){
                            var dac = diving( this.parentNode.parentNode ).data('divAutoComplete');
                            var pr=false;
                            var x = dac.itemSelected;
                            switch(k.keyCode){
                                case 40:
                                    dac.itemSelected=(dac.itemSelected==null)?dac.activos.length:dac.itemSelected;
                                    if(dac.itemSelected<dac.activos.length-1){
                                        dac.itemSelected+=1;
                                    }else{
                                        dac.itemSelected=0;
                                        x=0;
                                    }
                                    pr=true;
                                break;
                                case 38:
                                    dac.itemSelected=(dac.itemSelected==null)?dac.activos.length:dac.itemSelected;
                                    x=dac.itemSelected;
                                    if(dac.itemSelected>0){
                                        dac.itemSelected-=1;
                                    }else{
                                        dac.itemSelected=dac.activos.length-1;
                                        x=dac.activos.length-1;
                                    }
                                    pr=true;
                                break;
                                case 13:
                                    if(dac.itemSelected!=null){
                                        dac.elements.input[0].value=dac.activos[dac.itemSelected][0].innerText;
                                        dac.value=           dac.activos[dac.itemSelected][0].innerText;
                                        dac.select={'value': dac.activos[dac.itemSelected][0].val,
                                                    'text':  dac.activos[dac.itemSelected][0].innerText};
                                        dac.activos=[];
                                        dac.itemSelected=null;
                                        dac.elements.list.addClass('d-hidden');
                                    }
                                break;
                            }
                            if(pr){
                                wdt.changeSelection(dac.activos,dac.itemSelected);
                            }
                        },
                        onkeyup:function(k){
                            var dac = diving( this.parentNode.parentNode ).data('divAutoComplete');
                            if(k.keyCode==27){
                                dac.elements.list.addClass('d-hidden');
                                return;
                            }
                            dac.value=this.value;
                            if(this.value.length > 0 && k.keyCode!=13){
                                dac.elements.list.removeClass('d-hidden');
                                dac.activos=[];
                                dac.select={text:'',value:''};
                                diving.each(dac.elements.items,function(i,v){
                                    var textoOriginal=v[0].innerText;
                                    var vActual= (v[0].innerText).substring(0,dac.value.length);
                                    if(vActual.length>=attributes.minkey){
                                        if(vActual.toUpperCase()==dac.value.toUpperCase()){
                                            v.removeClass('d-hidden');
                                            var lbl=diving('<b>',{
                                                text:(v[0].innerText).substring(0,dac.value.length),
                                                style:''
                                            });
                                            var igual=(v[0].innerText).substring(0,dac.value.length);
                                            v[0].innerText=v[0].innerText.replace(igual,'');
                                            v.prepend(lbl);
                                            dac.activos.push(v);
                                        }else{
                                            v.text(textoOriginal);
                                            v.addClass('d-hidden');
                                            v.removeClass('d-selected');
                                        }
                                    }else{
                                        v.text(textoOriginal);
                                        dvn(v.parentNode).addClass('d-hidden');
                                        v.addClass('d-hidden');
                                        v.removeClass('d-selected');
                                    }
                                });
                            }else{
                                dac.activos=[];
                                dac.select={text:'',value:''};
                                dac.itemSelected=null;
                                dac.elements.list.addClass('d-hidden');
                            }
                        }
                    });
            if(p.placeholder!=null){
                input.attr('placeholder',p.placeholder);
            }
            var lista=diving('<ul>',{
                            dtrole:'d-list-autocomplete',
                            class:'d-hidden',
                            style:'width:'+(data.elem.offsetWidth)+'px;overflow: hidden;overflow-y: scroll;max-height: 8.5em;',
                            click:function(k){
                                var dac=diving(this.parentNode.parentNode.parentNode).data('divAutoComplete');
                                dac.elements.input[0].value=diving(k.target)[0].innerText;
                                dac.value=diving(k.target)[0].innerText;
                                dac.select={'value':diving(k.target)[0].val,'text':diving(k.target)[0].innerText};
                                dac.activos=[];
                                dac.itemSelected=null;
                                dac.elements.list.addClass('d-hidden');
                                if(p.selected!=null){
                                    p.selected.constructor=this.selected;
                                    var dac = diving( data.elem ).data('divAutoComplete');
                                    p.select=dac.select;
                                    p.selected(dac.value);
                                }
                            }
                        });
            var items=[];
            attributes.elements={'input':input,'list':lista,'items':items};
            var elemento=diving('<div>',{class:attributes.class}).append(input).append(diving('<div>',{class:'d-list-autocomplete'}).append(lista));
            diving.each(p.datos,function(i,v){
                wdt.add(lista,v,p.textValue,p.fieldValue,attributes.elements);
            });
            diving(data.elem).append(elemento);
            diving.extend(data,attributes);
        },
        add:function(list,element,textValue,fieldValue,elements){
            var item=diving('<li>',{
                class:'d-item-autocomplete d-hidden'
            });
            if(typeof element == 'string'){
                item.attr('text',element);
                item.attr('val',element);
            }else{
                item.attr('text',element[textValue]);
                item.attr('val',element[fieldValue]);
            }
            elements.items.push(item);
            list.append(item);
        },
        changeSelection:function(elements,i){
            var y = [];
            diving.each(elements,function(x,v){
                v.removeClass('d-selected');
                y.push({e:x,top:x*34});
            });
            elements[i].addClass('d-selected');
            var valY=function(posI){
                var rt = 0;
                for(var a=0;a<y.length;a++){
                    if(y[a].e==posI){
                        rt=y[a].top;
                    }
                }
                return rt;
            }
            elements[i][0].parentNode.scrollTop = valY((i>0)?i-1:i);
        }
    };
    diving.widget(widget);
})();

/*MultiSelect*/
(function(){
     var widget = {
        name: "MultiSelect",
        init: function(prm) {
            vaciarCache();
            prm=diving.extend(prm,{class:"d-multiselect"});
            var widtgetData = {
                elem:diving(this)[0],
                maxItemSelected:prm.maxItemSelected||prm.datos.length
            };
            widget.createElement(prm,widtgetData);
            diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            dvn(data.elem).addClass( p.class );
            diving.extend(data,{
                elements:[],
                selectes:[],
                activos:{},
                text:"",
                slt:0,
                objetos:{},
                selected:function(){
                    return this.selectes;
                }
            });
            if(p.change){
                diving.extend(data,{change:p.change});
            }
            var mltSlc = this;
            var c = 'd-hidden';
            var itmSlc =    diving('<div>',   {'d-rol':'d-itemSelects'});
            var cntTxtDown= diving('<div>',   {class:'d-cntTxtDown'});
            var txt =       diving('<input>', {class:'d-txtMultiSelect'});
            var ul =        diving('<ul>',    {class:'d-hidden','d-rol':'d-listMultiSelect',click:function(e){
                var t=e.target;
                var obj={
                    txt:t.innerText,
                    value:dvn(t).attr('val')
                };
                mltSlc.addElementSelected(obj,dvn(data.elem));

                    em.removeClass('icon-expand_more');
                    em.removeClass('icon-expand_less');
                    em.addClass('icon-expand_more');
            }
        });
            var em =         diving('<em>',    {class:'icon-expand_more'});
            var down =       diving('<div>',   {class:'d-moreLess',
                            click: function(){
                                em.toggleClass('icon-expand_more');
                                em.toggleClass('icon-expand_less');
                                ul.toggleClass(c);
                                var mda = diving( data.elem ).data('divMultiSelect');
                                var arr = ((mda.text.length>0)?mda.activos['lvl_'+mda.text.length].elements.length>0:false)?mda.activos['lvl_'+mda.text.length].elements:mda.elements;
                                diving.each(arr,function(i,v){
                                    (diving.className.has(ul[0],c))?v.addClass(c):v.removeClass(c);
                                });
                            }
                        }).append(em);
            dvn(data.elem).append(itmSlc).append(cntTxtDown.append(txt).append(down)).append(ul);
            data.objetos = {
                itemSelect:itmSlc,
                inputText:txt,
                list:ul,
                expands:em
            };
            diving.each(p.datos, function(i,v){
                mltSlc.add(ul,v,null,null,data.elements);
            });
            txt[0].onkeyup=function(e){
                data.text = this.value;
                if( e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 27 && e.keyCode!== 13){
                    em.removeClass('icon-expand_more');
                    em.removeClass('icon-expand_less');
                    em.addClass('icon-expand_less');
                    if(this.value.length>0){
                        ul.removeClass('d-hidden');
                        mltSlc.keyup(e,dvn(data.elem));
                    }else{
                        em.removeClass('icon-expand_more');
                        em.removeClass('icon-expand_less');
                        em.addClass('icon-expand_more');
                        ul.addClass('d-hidden');
                    }
                }else if( e.keyCode == 13 ){
                    em.removeClass('icon-expand_more');
                    em.removeClass('icon-expand_less');
                    em.addClass('icon-expand_more');
                    mltSlc.selectedByEnterKey(e,dvn(data.elem) );
                }else{
                    em.removeClass('icon-expand_more');
                    em.removeClass('icon-expand_less');
                    em.addClass('icon-expand_less');
                    mltSlc.selectByKeyboard( e, dvn(data.elem));
                }
            }
            ul.attr('style','width:'+(diving(data.elem)[0].offsetWidth)+'px;'+
                ((data.elements.length>5)?'overflow:hidden;height:16em;overflow-y:scroll;':''));
        },
        add:function(list,element,textValue,fieldValue,elements){
            var item=diving('<li>',{
                class:'d-item-multiselect d-hidden'
            });
            if(typeof element == 'string'){
                item.attr('text',element);
                item.attr('val',element);
            }else{
                item.attr('text',element.textValue);
                item.attr('val',element.fieldValue);
            }
            elements.push(item);
            list.append(item);
        },
        keyup:function(e,elem){
            var mda = diving(elem).data('divMultiSelect');
            if( e.keyCode == 27 ){
                mda.objetos.list.addClass('d-hidden');
                mda.slt=-1;
                return;
            }
            var obj={};
            if( mda.text.length == 1 ){
                mda.activos={};
                mda.activos = {
                    lvl_1:{
                        elements:[],
                        search: mda.text.toUpperCase()
                    }
                };
                mda.slt = -1;
            }else{
                var arrkeys = Object.keys( mda.activos );
                if( mda.text.length > arrkeys.length ){
                    mda.activos['lvl_'+mda.text.length]={
                        elements:[],
                        search:mda.text.toUpperCase()
                    };
                    mda.slt = -1;
                    obj.nuevo=true;
                }else{
                    obj.nuevo=false;
                }
            }
            var arr = (mda.activos['lvl_'+mda.text.length].elements.length>0)?mda.activos['lvl_'+mda.text.length].elements:mda.elements;
            for( var i = 0; i < arr.length; i ++ ){
                if(arr[i][0].innerText.toUpperCase().startsWith(mda.activos['lvl_'+mda.text.length].search)){
                   arr[i].removeClass('d-hidden'); 
                   if(obj.nuevo){
                       mda.activos['lvl_'+mda.text.length].elements.push(arr[i]);
                   }
                }else{
                   arr[i].addClass('d-hidden');  
                }
            }

        },
        selectByKeyboard:function(e,elem){
            var mda = diving(elem).data('divMultiSelect');
            var arr = (mda.activos['lvl_'+mda.text.length].elements.length>0)?mda.activos['lvl_'+mda.text.length].elements:mda.elements;
            mda.objetos.list.removeClass('d-hidden');
            switch( e.keyCode ){
                case 38: mda.slt=(mda.slt<=0)?arr.length-1:mda.slt-1; break;
                case 40: mda.slt=(mda.slt==arr.length-1)?0:mda.slt+1; break;
                case 27: mda.objetos.list.addClass('d-hidden'); mda.slt=0; break;
            }
            for( var i = 0; i <arr.length ; i ++ ){
                arr[i].removeClass('d-selected');
            }
            var x = 0;
            for( var idx = 4; idx < mda.slt; idx ++ ){
                x = x + arr[idx][0].offsetHeight
            }
            mda.objetos.list[0].scrollTop = x;
            arr[mda.slt].addClass('d-selected');
        },
        selectedByEnterKey:function( e, elem ){
            var mda = diving(elem).data('divMultiSelect');
            var arr = (mda.activos['lvl_'+mda.text.length].elements.length>0)?mda.activos['lvl_'+mda.text.length].elements:mda.elements;
            var obj = {
                txt: arr[mda.slt][0].innerText,
                value: arr[mda.slt].attr('val')
            };
            this.addElementSelected(obj, elem);
        },
        addElementSelected:function(obj, elem){
            var mda = diving(elem).data('divMultiSelect');
            var noExiste = false;
            for( var i = 0; i < mda.selectes.length; i ++ ){
                if( mda.selectes[i].value == obj.value ){
                    noExiste= true;
                    i = mda.selectes.length + 1;
                }
            }
            if(!noExiste){
                if(mda.selectes.length<mda.maxItemSelected){
                    var label = dvn('<label>',{
                            text: obj.txt,
                            value: obj.value,
                            class:'d-multiSelect-selected'
                        });
                    mda.objetos.itemSelect.append(
                        label.append(dvn('<em>',{
                            class:'icon-x1',
                            click:function(){
                                var value = diving(label).attr('value');
                                for( var i = 0;i<mda.selectes.length; i++){
                                    if( mda.selectes[i].value == value ){
                                        mda.selectes.splice(i,1);
                                        //label.empty();
                                        label[0].remove();
                                    }
                                }
                            }
                        }))
                    );
                    mda.selectes.push(obj);
                    if( mda.change ){
                        mda.change.constructor = mda.objetos.inputText[0].onchange;
                        mda.change(mda);
                    }
                }
            }
            mda.objetos.list.addClass('d-hidden');
            mda.slt=-1;
        }
    };
    diving.widget(widget);
})();

/*grid*/
(function() {
     var widget = {
          name: "Grid",
          columnas:[],
          init: function(prm) {
            vaciarCache();
               prm = diving.extend(prm, {class: "d-grid"});
               var widtgetData = {
                    elem:diving(this)[0],
                    dataSource: prm.dataSource
               };
               widget.columnas=prm.columns;
               widget.createElement(prm,widtgetData);
               diving(this).data('div'+widget.name, widtgetData);
          },
          createElement: function(p,data) {
               diving(data.elem).empty();
               var width=(p.width!=undefined)?'width:'+diving.addPx(p.width):'';
               var t = dvn('<table>',{class:'d-grid',style:width});
               var th = dvn('<thead>',{class:'d-grid-head'});
               var tb = dvn('<tbody>',{class:'d-grid-body'});
               t.append(th);
               t.append(tb);
               diving(data.elem).append(t);
               widget['thead']=th;
               widget['tbody']=tb;
               diving.extend(data,{
                    table:t,
                    thead:th,
                    tbody:tb
               });
               var trh = dvn('<tr>');
               var cl = document.createElement('colgroup');
               dvn.each(widget.columnas,function(i,v){
                    var c = document.createElement('col');
                    var cId='dGrid-'+'3-0-1-'+(""+Math.random()).replace(/\D/g, "");
                    c.setAttribute('id',cId);
                    cl.append(c);
                    widget.createHeader(trh,v,cId);
                    th.append(trh);
               });
               t.append(cl);
               dvn.each(p.dataSource.elements,function(i,v){
                    widget.addElement(tb,v);
               });
          },
          addElement:function(parent,element){
               var tr = dvn('<tr>');
               if(typeof element == 'string'){
                    var td=dvn('<td>',{text:element});
                    tr.append(td);
               }else{
                    if(element.hasOwnProperty('items')){
                         var elem = dvn('<em>',{class:'icon-upload7'});
                         var td=dvn('<td>',{colspan:widget.columnas.length,
                                            click:function(e){
                                                 var ts=false;
                                                 var x = 0;
                                                 var tshi = dvn(this).parent()[0];
                                                 dvn.each(dvn(widget.tbody).find('tr'),function(i,v){
                                                      if(dvn(v).attr('d-role')!=undefined){if(v==tshi){ts=true;x=i;}else{ts=false;}}
                                                      if(ts&&x<i){dvn(v).toggleClass('d-hidden');}
                                                 });
                                                 dvn(this).find('em').toggleClass('icon-download8');
                                                 dvn(this).find('em').toggleClass('icon-upload7');
                                            }
                                           }).append(
                              dvn('<label>',{text:element.value})
                         ).append(elem);
                         tr.attr('d-role','d-grouppe');
                         tr.append(td);
                         parent.append(tr);
                         dvn.map(element.items,function(e){
                              widget.addElement(parent,e);
                         });
                    }else{
                         var obj=Object.keys(element);
                         dvn.each(obj,function(i,v){
                              dvn.map(widget.columnas,function(e){
                                   if(v==e.field){
                                        var td = dvn('<td>',{
                                             text:element[v]
                                        });
                                        tr.append(td);
                                   }
                              });
                         });
                         parent.append(tr);
                    }
               }
          },
          createHeader:function(parent,element,colId){
               if(!element.hasOwnProperty('columns')){
                    var th=dvn('<th>',{
                         text:element.title,
                         col:colId,
                         field:element.field
                    });
                    parent.append(th);
                    if(element.hasOwnProperty('sortable')){
                         if(element.sortable){
                              var em = dvn('<em>',{class:'icon-sort-alpha-asc1'});
                              th.append(em);
                              th.click(function(){
                                   var d=parent.parent().parent().parent();
                                   var dg = d.data('divGrid');
                                   var field=dvn(this).attr('field');
                                   if(em.hasClass('icon-sort-alpha-asc1')){
                                        dg.dataSource.sort({field:field});
                                    }else{
                                        dg.dataSource.sort({field:field,dir:'desc'});
                                    }
                                   widget.tbody.empty();
                                   dvn.each(dg.dataSource.elements,function(i,v){
                                        widget.addElement(widget.tbody,v);
                                   });
                                   em.toggleClass('icon-sort-alpha-desc1');
                                   em.toggleClass('icon-sort-alpha-asc1')
                              });
                         }
                    }
               }
          }
     };
     diving.widget(widget);
})();

/*Menu*/
(function(){
     var widget = {
        name: "Menu",
        init: function(prm) {
            vaciarCache();
            prm=diving.extend(prm,{
                class:"d-menu-content"+(prm.hasOwnProperty('class')?' '+prm.class:''),
                vertical:(prm.hasOwnProperty('vertical'))?prm.vertical:false
            });
            var widtgetData = {
                elem:diving(this)[0],
                dta: prm.data,
                class:prm.class,
                vertical: prm.vertical,
                actions:prm.actions
            };
            widget.createElement(prm,widtgetData);
            diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            diving(data.elem).empty();
            diving(data.elem).addClass(p.class);
            var ul = diving('<ul>',{class: 'd-menu'+((p.hasOwnProperty('vertical'))?(p.vertical)?' d-menu-vertical':'':'')});
            var wgt = this;
            diving.extend(data,{
                elementos:[],
                refresh:wgt.refresh,
                setData:wgt.setData,
                wh: ((p.hasOwnProperty('vertical'))?(typeof p.vertical == 'object')?p.vertical.width:'max-content':null)
            });

            diving.each(data.dta, function(i,v){
                wgt.addItem(ul, v, p, data, wgt);
            });
            diving(data.elem).append(ul);
        },
        addItem: function(content, element, parameters, data, wgt ){
            var textito = diving('<div>',{text: element.text});
            var li = diving('<li>',{
                'href': element.href,
                class: 'd-menu-item'+(element.hasOwnProperty('class')?' '+element.class:''),
                click:function(){
                    if(element.hasOwnProperty('openTo')){
                        var op = (typeof element.openTo=='string')?diving(element.openTo):element.openTo;
                        op.empty();
                        loadHref(op, element.href);
                    }else{
                        window.location.href=element.href;
                    }
                },
                style:'width:'+data.wh
            }).append(textito);
            data.elementos.push(li);
            if(parameters.hasOwnProperty('actions')){
                for( var i=0; i < parameters.actions.length; i++){
                    if(parameters.actions[i].field==element.field){
                        li[0].onclick = function(){
                            parameters.actions[i].action.constructor=li[0].onclick;
                            parameters.actions[i].action();
                        }
                        break;
                    }
                }
            }
            if( element.hasOwnProperty( 'items' ) ){
                var ul = diving('<ul>', { class: 'd-submenu' });
                for(var i=0;i<element.items.length;i++){wgt.addItem(ul,element.items[i],parameters,data,wgt);}
                li.append( ul );
            }
            content.append(li);
        },
        refresh:function(){
            var dta = {
                elem : this.elem,
                dta: this.dta
            };
            var p = {
                class: this.class,
                vertical: this.vertical,
                actions: this.actions
            };
            widget.createElement(p,dta);
        },
        setData:function(data){
            this.dta = [];
            this.dta = data;
            this.refresh();
        }
    };
    diving.widget(widget);
})();

/*window*/
(function(){
     var widget = {
        name: "Window",
        init: function(prm) {
            vaciarCache();
            prm=diving.extend(prm,{
                class:"d-window-content"+(prm.hasOwnProperty('class')?' '+prm.class:'')
            });
            var widtgetData = {
                elem:diving(this)[0],
                class:prm.class,
                actions:prm.actions,
                modal:prm.modal||false,
                close:widget.close,
                open:widget.open,
                destroy:widget.destroy,
                center:widget.center
            };
            widget.createElement(prm,widtgetData);
            diving(this).data('div'+widget.name, widtgetData);
        },
        createElement: function(p,data) {
            diving(data.elem).empty();
            var contentVentana = diving('<div>',{class:p.class});
            (p.hasOwnProperty('width'))?contentVentana.attr('style','width:'+diving.addPx(p.width)+';'):'';
            (p.hasOwnProperty('height'))?contentVentana.attr('style',contentVentana.attr('style')+'height:'+diving.addPx(p.height)+';'):'';
            diving(data.elem).append(contentVentana);
            var ttlWnt = diving('<div>',{class:'d-window-title'}).append(
                        (p.title)?
                            (typeof p.title=='string')?
                                diving('<div>',{text:p.title}):
                                p.title
                            :diving('<div>',{text:'&nbsp;'})
                        );
            contentVentana.append(ttlWnt);
            if(p.actions){
                this.createActions(ttlWnt, p.actions, this, p, data, contentVentana, ttlWnt );
            }
            if(p.hasOwnProperty('modal')?p.modal:false){
                diving(data.elem).prepend(
                    diving('<div>',{
                        style:'width:'+window.innerWidth+'px;height:'+window.innerHeight+"px;background-color: #0c0c0c94;position: absolute;top: 0;right: 0;"
                    })
                );
            }
            if(p.content){
                this.createContent(contentVentana,this,p,data);
            }else{
                p.content='&nbsp;';
                this.createContent(contentVentana,this,p,data);
            }
            diving.draggable(ttlWnt[0],contentVentana[0]);
        },
        center:function(){
            var stl = diving(this.elem.querySelector('.d-window-content')).attr('style');
            var cnt = diving(this.elem.querySelector('.d-window-content'));
            stl = (stl.match(/left:\s?[0-9a-z]+\;/g)==null)?stl+'left:'+diving.addPx((window.innerWidth/2)-(cnt[0].offsetWidth/2))+";":stl.replace(/left:\s?[0-9a-z]+\;/g,'left:'+diving.addPx((window.innerWidth/2)-(cnt[0].offsetWidth/2))+";");
            stl = (stl.match(/top:\s?[0-9a-z]+\;/g)==null)?stl+'top:'+diving.addPx((window.innerHeight/2)-(cnt[0].offsetHeight/2))+";":stl.replace(/top:\s?[0-9a-z]+\;/g,'top:'+diving.addPx((window.innerHeight/2)-(cnt[0].offsetHeight/2))+";");
            diving(this.elem.querySelector('.d-window-content')).attr('style',stl);
        },
        destroy:function(){
            diving(this.elem).removeData('divWindow');
            diving(this.elem).empty();
        },
        close:function(){
            diving(this.elem).addClass('d-hidden');
        },
        open:function(){
            diving(this.elem).removeClass('d-hidden');
        },
        createActions:function(content,actions,wdt,p,data,cntVtn,ttl){
            var acts = [
                {action:'close',class:'icon-error'},
                {action:'maximize',class:'icon-add'},
                {action:'minimize',class:'icon-minus3'}
                ];
            for(var i=0;i<acts.length;i++){
                for( var j=0;j<actions.length;j++){
                    if(acts[i].action==actions[j]){
                        var lbl=diving('<label>',{
                            class:'d-window-action',
                            'd-role':acts[i].action,
                            click:function(){
                                var title = cntVtn[0].querySelector('.d-window-title');
                                var body  = cntVtn[0].querySelector('.d-window-body');
                                switch(diving(this).attr('d-role')){
                                    case 'minimize':
                                        var height = title.offsetHeight;
                                        if(cntVtn.attr('d-control')==null){
                                            cntVtn.attr('d-control',cntVtn.attr('style') );
                                            diving(body).addClass('d-hidden');
                                            var stl = cntVtn.attr('style');
                                            stl = stl.replace(/(height:\s[0-9a-z]+\;)/g,'height:'+diving.addPx(height)+';');
                                            cntVtn.attr('style',stl);
                                        }else{
                                            var ctr = cntVtn.attr('d-control');
                                            diving(body).removeClass('d-hidden');
                                            ctr = ctr.replace(/left:\s[0-9a-z]+\;/g,'left:'+diving.addPx(cntVtn[0].offsetLeft)+';');
                                            ctr = ctr.replace(/top:\s[0-9a-z]+\;/g,'top:'+diving.addPx(cntVtn[0].offsetTop)+';');
                                            cntVtn.attr('style',ctr);
                                            cntVtn.removeAttr('d-control');
                                        }
                                    break;
                                    case 'maximize':
                                        if(cntVtn.attr('d-control')==null){
                                            cntVtn.attr('d-control',cntVtn.attr('style') );
                                            diving(body).attr('d-ctr',diving(body).attr('style') );
                                            var ctr = diving(body).attr('style');
                                            ctr = ctr.replace(/width:\s?[0-9a-z]+\;/g,'width:'+diving.addPx(window.innerWidth-17)+';');
                                            ctr = ctr.replace(/height:\s?[0-9a-z]+\;/g,'height:'+diving.addPx(window.innerHeight-92)+';');
                                            diving(body).attr('style',ctr);
                                            cntVtn.attr('style','top:0;right:0;width:'+diving.addPx(window.innerWidth-2)+';height:'+diving.addPx(window.innerHeight-2)+';');
                                        }else{
                                            var cntCtr = cntVtn.attr('d-control');
                                            var bdCtr = diving(body).attr('d-ctr');
                                            diving(body).attr('style',bdCtr);
                                            diving(body).removeAttr('d-ctr');
                                            cntVtn.attr('style',cntCtr);
                                            cntVtn.removeAttr('d-control');
                                        }
                                    break;
                                    case 'close':
                                        data.close();
                                    break;
                                }
                            }
                        }).append(diving('<em>',{class:acts[i].class}));
                        content.append(lbl);
                    }
                }
            }
        },
        createContent:function(content,wdt,p,data){
            var cnt = diving('<div>',{class:'d-window-body'}).append(
                (typeof p.content=='string')?
                    diving('<div>',{text:p.content}):
                    p.content
                );
            (p.hasOwnProperty('width'))?cnt.attr('style','width:'+(diving.addPx(p.width-17))+';'):'';
            (p.hasOwnProperty('height'))?cnt.attr('style',cnt.attr('style')+'height:'+(diving.addPx(p.height-92))+';'):'';
            (p.hasOwnProperty('scrollable'))?
                (typeof p.scrollable == 'object')?
                    cnt.attr('style',cnt.attr('style')+'overflow-y:'+(
                        p.scrollable.hasOwnProperty('y')?p.scrollable.y:'scroll'
                        )+';overflow-x:'+(
                        p.scrollable.hasOwnProperty('x')?p.scrollable.x:'scroll'
                        )):
                    cnt.attr('style',cnt.attr('style')+'overflow:scroll;')
                    :cnt.attr('style',cnt.attr('style')+'overflow:hidden;');
            content.append(cnt);
        }
    };
    diving.widget(widget);
})();

/*listView*/
(function(){
     var widget = {
          name: "ListView",
          init: function(prm) {
            vaciarCache();
               prm=diving.extend(prm,{class:"d-listview-content"+(prm.hasOwnProperty('class')?' '+prm.class:'')});
               var widtgetData={
                    elem:diving(this)[0],
                    class:prm.class,
                    click:prm.click||null,
                    selected:[],
                    fieldValue:prm.fieldValue||null,
                    textValue:prm.textValue||null
               };
               widget.createElement(prm,widtgetData);
               diving(this).data('div'+widget.name, widtgetData);
          },
          createElement: function(p,data) {
               diving(data.elem).empty();
               diving(data.elem).addClass(p.class);
               var wdt=this;
               var ul = diving('<ul>',{class:'d-listview'});
               if(p.hasOwnProperty('height')!=undefined){
                    ul.attr('style','height:'+p.height+";overflow:hidden;overflow-y:scroll;");
               }
               diving.extend(data,{
                    add:wdt.addElement,
                    datos:p.datos||[],
                    domList:ul,
                    template:p.template||null
               });
               diving(data.elem).append(ul);
               diving.each(data.datos,function(i,v){
                    data.add(v,data,data.domList);
                });
          },
          addElement: function(obj,component,ul){
                var dlv = (diving(this.elem).data('divListView')!=undefined)?diving(this.elem).data('divListView'):component;
                if(dlv==undefined){return;}
                var li=diving('<li>',{class:'d-listView-item'});
                if(typeof obj=='string'){
                    li.text(obj);
                }else{
                    if(component.template!=null){
                        li.append(diving.template(dlv.template,obj));
                    }else{
                        li.text(obj[component.textValue]);
                    }
                    li.attr('d-value',obj[component.fieldValue]);
                }
                if(component.click!=null){
                    li.click(function(){
                        dlv.selected=[{value:diving(this).attr('d-value'),text:diving(this).text()}];
                        if(dlv.click){
                            dlv.click.constructor=this.click;
                            dlv.click(this);
                        }
                    });
                }
                ul.append(li);
                if(obj.hasOwnProperty('items')){
                    var tUl = dvn('<ul>');
                    var em = diving('<em>',{
                        class:'icon-upload7',
                        style:'cursor:pointer;right:1em;position:absolute;',
                        click:function(){
                            dvn(this).toggleClass('icon-download8');
                            dvn(this).toggleClass('icon-upload7');
                            tUl.toggleClass('d-hidden');
                        }
                    });
                    li.append(em);
                    li.append(tUl);
                    diving.each(obj.items,function(i,v){
                        component.add(v,component,tUl);
                    });
                }
          }
     };
     diving.widget(widget);
})();