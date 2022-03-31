var appcrit=function(){"use strict";return class{constructor(t,e){this.ceteicean=void 0!==t?t:new CETEI,this.variantBlocks=void 0!==e?e:"tei-ab,tei-l,tei-lg,tei-p,tei-seg,tei-speaker",this.genId=0,this.dom=null,this.references={},this.log=[],this.redoLog=[],this.processAll=!0}generateId(t){return t?t+this.genId++:"id"+this.genId++}swapLem(t){let e=this;if("tei-rdg"==t[0].localName){let a,i=t.attr("data-copyfrom"),n=t.attr("id"),r=t.parents("tei-app").first();if(0==(a=r.find(">tei-lem")).length&&0==(a=r.find("tei-rdgGrp>tei-lem")).length&&r.attr("exclude")&&r.attr("exclude").split(/ /).forEach((function(t){$(e.escapeID(t)).find(">tei-lem").length>0&&(a=$(e.escapeID(t)).find(">tei-lem"))})),a.length>0){this.log.push({lem:a.attr("id"),rdg:t.attr("id")});let i=a.parent("tei-app"),n=$("<tei-lem/>");for(let e=0;e<t[0].attributes.length;e++)n.attr(t[0].attributes[e].name,t[0].attributes[e].value);n.append(t.html()),t.replaceWith(n[0].outerHTML);let l,s,d=$("<tei-rdg/>");for(let t=0;t<a[0].attributes.length;t++)d.attr(a[0].attributes[t].name,a[0].attributes[t].value);d.append(a.html()),a.replaceWith(d[0].outerHTML),n=$("#"+e.escapeID(n.attr("id"))),d=$("#"+e.escapeID(d.attr("id")));let o=!1;s=$("#button-"+n.parents("tei-app").first().attr("id")),r.find(this.variantBlocks).length>0&&s&&r.find("#"+s.attr("id").length==0)&&(l=n.find(this.variantBlocks).first(),0==l.length&&(l=$(document.evaluate("preceding::*["+this.variantBlocks.split(",").map((function(t){return"local-name(.) = '"+t+"'"})).join(" or ")+"][not(ancestor::tei-app) or parent::tei-lem][1]",s[0],null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue),l.length>0&&(o=!0),0==l.length&&(l=$(document.evaluate("following::*["+this.variantBlocks.split(",").map((function(t){return"local-name(.) = '"+t+"'"})).join(" or ")+"][not(ancestor::tei-app) or parent::tei-lem][1]",s[0],null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue))),l.find("span.apps").length>0?o?l.find("span.apps").first().append(s.detach()):l.find("span.apps").first().prepend(s.detach()):l.append($('<span class="apps"></span>').append(s.detach())),e.addToolTip(s)),l&&l.length>0&&r.find("button").each((function(t,a){e.addToolTip(a)})),i=d.parent("tei-app"),n.attr("require")&&n.attr("require").split(/ /).forEach((function(t){let a=$(e.escapeID(t));"tei-rdg"==a[0].localName&&e.swapLem(a)}))}i&&e.swapLem($(e.escapeID(i))),$("*[data-copyfrom="+e.escapeID(n)+"]").each((function(t,a){e.swapLem($(a))})),this.fixButtons()}}undo(){let t=this.log.pop(),e=this.log.length;for(this.swapLem($(document.getElementById(t.lem))),this.redoLog.push(t);this.log.length>e;)this.log.pop()}redo(){let t=this.redoLog.pop();this.swapLem($(document.getElementById(t.rdg)))}ttip(t){let e=this;return{content:function(){return'<div class="apparatus hover">'+$("#copy-"+e.escapeID($(t).attr("data-app"))).html()+"</div>"},open:function(t,a){let i=$("#"+e.escapeID($(this).attr("data-app")));if(i.addClass("highlight"),0==i.children("tei-lem").length){let t=i.attr("exclude");t&&t.split(/ /).forEach((function(t){$(e.escapeID(t)).find(e.variantBlocks).addClass("highlight")}))}i.find(e.variantBlocks).addClass("highlight")},close:function(t,a){let i=$("#"+e.escapeID($(this).attr("data-app")));if(i.find("hr").remove(),i.removeClass("highlight"),0==i.children("tei-lem").length){let t=i.attr("exclude");t&&t.split(/ /).forEach((function(t){$(t).find(e.variantBlocks).removeClass("highlight")}))}i.find(e.variantBlocks).removeClass("highlight"),$(this).attr("title","")}}}addToolTip(t){if($(t).tooltip("instance")&&$(t).tooltip("destroy"),$(t).attr("title",""),$(t).tooltip(this.ttip(t)),!$(t).hasClass("note")){let e=this;$(t).click((function(a){let i=$("#dialog-"+e.escapeID($(this).attr("data-app")).replace(/dialog-/,""));if(0==i.length){i=$("<div/>",{id:"dialog-"+$(this).attr("data-app"),class:"dialog","data-exclude":$("#"+e.escapeID($(this).attr("data-app"))).attr("exclude")}),i.appendTo("body");let a=$("#copy-"+e.escapeID($(this).attr("data-app"))).clone();a.find("span.lem").remove(),i.html(a.html()),a.attr("exclude")&&a.attr("exclude").split(/ /).forEach((function(t){let a=$(e.escapeID(t).replace(/#/,"#copy-"));i.append(a.html())})),i.find("*[id]").each((function(t,e){$(e).attr("data-id",$(e).attr("id"))})),i.find("*[id]").removeAttr("id"),i.find("tei-note[target]").each((function(t,e){$(e).attr("data-id",$(e).attr("target").replace(/#/,""))})),$(t).find(this.variantBlocks).length>0&&i.find("tei-lem,tei-rdg,tei-rdgGrp").remove(),i.find("tei-lem:empty").each((function(t,e){"tei-note"!=e.nextElementSibling.localName&&$(e.append("om. "))})),i.find("tei-rdg:empty").each((function(t,e){"tei-note"!=e.nextElementSibling.localName&&$(e.append("om. "))})),i.find("tei-rdg,tei-lem,tei-note[data-id],span[data-id]").each((function(t,a){$(a).click((function(t){let a=$("#"+e.escapeID($(t.currentTarget).attr("data-id")));e.swapLem(a)}))})),i.dialog({autoOpen:!1,open:function(t){$("#"+$(this).attr("id").replace(/dialog/,"button")).tooltip("close"),$("#"+$(this).attr("id").replace(/dialog-/,"")).addClass("highlight"),$("#"+$(this).attr("id").replace(/dialog-/,"")).find(this.variantBlocks).addClass("highlight")},close:function(t){$("#"+$(this).attr("id").replace(/dialog-/,"")).removeClass("highlight"),$("#"+$(this).attr("id").replace(/dialog-/,"")).find(this.variantBlocks).removeClass("highlight");let e=$("#"+$(this).attr("id").replace(/dialog/,"button"));e.tooltip("instance")&&e.tooltip("close"),e.attr("title","")}})}i.dialog("open")}))}}escapeID(t){return t.replace(/([\.,])/g,"\\$1")}getLabel(t){let e=$(this.escapeID(t));return e.length>0&&e.attr("n")?e.attr("n"):t.replace(/#/,"")}refLabel(t){if(this.references[t])return this.references[t];try{let e=this.dom.querySelector(this.escapeID(t)),a=e.querySelector("tei-abbr[type=siglum]").innerHTML;return this.references[t]=a||e.getAttribute("id"),this.references[t]}catch(e){console.log("Unresolvable ref, "+t)}}witOrSource(t){return t.attr("wit")?t.attr("wit"):t.attr("source")}addSigla(){let t=this;return function(e,a){if(a.parentElement){let e="",i="",n="",r=$(a);if(r.attr("data-id",r.attr("id")),r.removeAttr("id"),"tei-rdggrp"==a.localName&&r.attr("type")&&r.attr("type").match(/corr/i)){let e=r.children("tei-rdg:not(:first-child)");n='<span class="ref" data-id="'+$(e).attr("id")+'" data-ref="'+t.witOrSource(e)+'">(corr. '+t.refLabel(t.witOrSource(e))+")</span>",e.remove()}r.attr("wit")&&r.attr("wit").split(/ +/).forEach((function(a){e+='<span class="ref" data-id="'+r.attr("data-id")+'" data-ref="'+a+'">'+t.refLabel(a)+"</span>",r.parents("tei-app").first().find('tei-witdetail[target="#'+r.attr("data-id")+'"][wit="'+a+'"]').each((function(t,a){e+=a.innerHTML}))})),r.attr("source")&&r.attr("source").split(/ /).forEach((function(e){i+=' <span class="ref" data-id="'+r.attr("data-id")+'" data-ref="'+e+'">'+t.refLabel(e)+"</span> "})),a.nextElementSibling&&"tei-wit"==a.nextElementSibling.localName&&(i+=' <span class="ref" data-id="'+r.attr("data-id")+'">'+$(a.nextElementSibling).html()+"</span> "),(e+i+n).length>0&&$(a).after(' <span class="source">'+e+i+n+"</span>")}}}appButton(t){let e=$(t);return e.children("tei-rdg").length>0||e.children("tei-rdgGrp").length>0?'<button id="button-'+e.attr("id")+'" title="" class="app" data-app="'+e.attr("id")+'"><svg class="svg-icon"><use xlink:href="#rdg-icon"></use></svg></button>':'<button id="button-'+e.attr("id")+'" title="" class="app note" data-app="'+e.attr("id")+'"><svg class="svg-icon"><use xlink:href="#note-icon"></use></svg></button>'}makeCopy(t,e){let a;if(t.nodeType==Node.ELEMENT_NODE){a=document.createElement(t.localName);for(let i=0;i<t.attributes.length;i++){let n=t.attributes.item(i);"id"==n.name?e?a.setAttribute(n.name,n.value):(a.setAttribute("data-copyFrom",n.value),a.setAttribute("id",this.generateId())):"class"==n.name?a.setAttribute("class",n.value+" app-copy"):a.setAttribute(n.name,n.value)}for(let i=0;i<t.childNodes.length;i++){let n=t.childNodes[i];n.nodeType==Node.ELEMENT_NODE?(n.hasAttribute("copyof")&&this.copy(n),a.appendChild(this.makeCopy(n,e))):a.appendChild(n.cloneNode(!1))}}else a=t.cloneNode();return a}copy(t){if(t.hasAttribute("data-copyfrom"))return;let e=$(t),a=this.dom.querySelector(this.escapeID(e.attr("copyof")));if(a){e.attr("data-copyfrom",e.attr("copyof"));for(let t=0;t<a.childNodes.length;t++)e.append(this.makeCopy(a.childNodes[t]));for(let t=0;t<a.attributes.length;t++){let i=a.attributes.item(t);"id"==i.name?e.attr("id",this.generateId()):e.attr(i.name,i.value)}}}doSection(t){let e=this;t.find("span.apps").length>0&&($("span.apps").remove(),e.processAll||$("div.apparatus").remove());let a=t.attr("id");if(t.find("tei-app").length>0){let i=$('<div id="apparatus-'+a+'" class="apparatus"></div>');t.after(i),t.find("*[copyof]").each((function(t,a){e.copy(a)})),t.find("tei-app").each((function(a,n){let r;if(r=$(n).clone(!0,!0),1==r.children("tei-lem").length&&r.attr("exclude")&&r.attr("exclude").split(/ /).forEach((function(a){let i=t.find(e.escapeID(a)).clone();r.append($(i).children().unwrap())})),!r.attr("exclude")||1==r.children("tei-lem").length){let a,l;r.attr("id","copy-"+r.attr("id"));let s,d,o=r.children("tei-lem");if(o.find("tei-app").length>0&&(o.find("tei-rdg,tei-rdggrp,tei-note,tei-wit").remove(),o.find("tei-lem").removeAttr("wit").removeAttr("source")),r.find("tei-lem,tei-rdg,tei-rdggrp").each(e.addSigla($(e.dom))),r.find(e.variantBlocks).length>0){let t=r.children("tei-lem"),a=t.find(e.variantBlocks);a.length>0&&(l=a[0].localName,"tei-l"==l&&(s=a.length>1?'<span class="ref lineref" data-id="'+t.attr("data-id")+'">ll. '+t.find(e.variantBlocks).first().attr("n")+"–"+t.find(e.variantBlocks).last().attr("n")+"</span> ":'<span class="ref lineref" data-id="'+t.attr("data-id")+'">l. '+t.find(e.variantBlocks).attr("n")+"</span> "),"tei-p"!=l&&"tei-ab"!=l&&"tei-seg"!=l||(s=a.length>1?'<span class="ref lineref" data-id="'+t.attr("data-id")+'">'+t.find(e.variantBlocks).first().attr("n")+"–"+t.find(e.variantBlocks).last().attr("n")+"</span> ":'<span class="ref lineref" data-id="'+t.attr("data-id")+'">'+t.find(e.variantBlocks).attr("n")+"</span> "),"tei-speaker"==l&&(s='<span class="ref lineref" data-id="'+t.attr("data-id")+'">sp. </span> '),r.prepend(s))}if((s=o.find(e.variantBlocks)).length>0){if(a=$(s[0]).attr("n"),!a&&s[0].hasAttribute("copyof")&&(a=t.find(e.escapeID($(s[0]).attr("copyof"))).attr("n")),!a)for(let t=1;t<s.length;t++)if($(s[t]).attr("n")){a=$(s[t]).attr("n");break}s.length>1&&($(s[s.length-1]).attr("n")?a+="–"+$(s[s.length-1]).attr("n"):a+="–"+t.find($(s[s.length-1]).attr("copyOf")).attr("n"));let i=$(n).find("tei-lem").find(e.variantBlocks);0==i.length&&(i=$(n).next(e.variantBlocks+",tei-app")),d=i.first().append(e.appButton(n)),r.find("tei-lem:not(:empty)").remove(),r.find("tei-rdg:not(:empty)").each((function(t,a){let i=$(a),n=i.find(e.variantBlocks);"show"==i.attr("rend")?i.html(n.text()):i.html(n.toArray().reduce((function(t,e){return t+(t?",":"")+e.getAttribute("n")}),""))}))}else a=$(n).parents(e.variantBlocks).attr("n"),!a&&n.hasAttribute("copyof")&&(a=t.find(e.escapeID($(n).parents(e.variantBlocks).attr("copyof"))).attr("n")),d=$(n).parents(e.variantBlocks).first().append(e.appButton(n));o[0]&&o[0].innerText&&o[0].innerText.includes(" ")&&o[0].innerText.replace(/\s\s/g," ").match(/\s/g).length>2&&o.html(o.text().trim().replace(/\n/g," ").replace(/^(\S+) .+ (\S+)/,"$1...$2")),r.find("tei-wit").remove(),r.find("tei-rdg:empty").each((function(t,e){e.nextElementSibling.nextElementSibling&&"tei-note"==e.nextElementSibling.nextElementSibling.localName||$(e.append("om. "))})),(a&&0==i.find("#app-l"+a.replace(/ /g,"_")).length||s.length>0)&&r.prepend('<span class="lem" id="app-l'+a.replace(/ /g,"_")+'">'+a+"</span>"),r.find("tei-lem,tei-rdg").removeAttr("id"),r.children("tei-lem:parent").append("<span>] </span>"),i.append(r)}}));let n=["tei-sp","tei-ab","tei-p","tei-div","tei-lem","tei-lg"];t.find("tei-l").each((function(t,e){let a=$(e);Number(a.attr("n"))%5==0&&n.indexOf(e.parentElement.localName)>=0&&a.attr("data-num",a.attr("n"))})),t.find(e.variantBlocks).each((function(t,e){$(e).children("button.app").wrapAll('<span class="apps"></span>')})),t.find("button.app").each((function(t,a){e.addToolTip(a)})),i.find("span.ref").each((function(t,a){a.hasAttribute("data-ref")&&($(a).attr("title",""),$(a).tooltip({content:function(){let t,i=$(e.escapeID($(a).attr("data-ref")));switch(i[0].localName){case"tei-handnote":t=$("<span>"+i.parents("tei-witness,tei-bibl").first().find(">tei-abbr").first().html()+"</span>"),t.append("; ",i.html());break;case"tei-listwit":t=$("<span>"+i.children("tei-head").html()+": </span>"),t.append($.map(i.children("tei-witness"),(function(t){return $(t).html()})).join(", "));break;case"tei-item":t=$("<span>"+i.html()+"</span>");break;case"tei-bibl":t=$("<span>"+i.html()+"</span>");case"tei-listbibl":t=$("<span>"+i.find("tei-abbr").first().html()+"</span>");case"tei-person":t=$("<span>"+i.html()+"</span>");default:t=$("<span>"+i.html()+"</span>")}return'<div class="ref">'+t.html()+"</div>"}}))})),e.fixButtons()}}toggleApps(t){$('tei-app[ana~="\\#'+t.currentTarget.name+'"]').each((function(e,a){let i=$("#button-"+$(a).attr("id"));t.currentTarget.checked?i.hide():i.show()})),$('tei-rdg[ana~="\\#'+t.currentTarget.name+'"]').each((function(e,a){t.currentTarget.checked?($(a).addClass("hidden"),$(a).next("span").addClass("hidden"),0==$(a.parentElement).children("tei-rdg").not(".hidden").length&&$("#button-"+$(a.parentElement).attr("id")).hide()):($(a).removeClass("hidden"),$(a).next("span").removeClass("hidden"),$("#button-"+$(a.parentElement).attr("id")).show())}))}fixButtons(){let t=$(document).find("span.apps");if(t.size()>0){let e=0,a=0,i=t[0].offsetParent;t.each((function(t,n){["tei-l","tei-lg"].includes(n.parentElement.localName)||$(n).find("button").each((function(t,n){let r=$(n);null==n.offsetParent&&r.show(),n.offsetParent!=i&&(e=0,i=n.offsetParent);let l=$("#"+app.escapeID(r.attr("data-app")));if(l.length>0)if(null==l[0].offsetParent)r.hide();else{let t=l.position();e<t.top?(e=t.top,a=1):a++,r.css({position:"absolute",top:e+"px",left:750+25*a+"px"})}}))}))}}loadData(t){this.dom=t;let e,a=this;$(t).find("tei-app,tei-rdggrp").each((function(t,e){let a=[];for(let t=0;t<e.childNodes.length;t++)e.childNodes[t].nodeType!=Node.TEXT_NODE||e.childNodes[t].nodeValue.trim()||a.push(e.childNodes[t]);a.forEach((function(t,a){e.removeChild(t)}))})),$(t).find("tei-app tei-note").each((function(t,e){e.prepend(" ")})),$(t).find("tei-app,tei-lem,tei-rdg,tei-rdggrp").each((function(t,e){let i=$(e);i.attr("id")||i.attr("id",a.generateId())})),$(t).find("tei-add[place=margin]").append('<span class="note"> (in mg.)</span>'),$(":checkbox").change(this.toggleApps),window.onresize=function(){clearTimeout(e),e=setTimeout((function(){a.fixButtons()}),250)}}}}();
