(function(a){if(window.filepicker){return}var b=a.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"===a.location.protocol?"https:":"http:")+"//api.filepicker.io/v1/filepicker.js";var c=a.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c);var d={};d._queue=[];var e="pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane".split(",");var f=function(a,b){return function(){b.push([a,arguments])}};for(var g=0;g<e.length;g++){d[e[g]]=f(e[g],d._queue)}window.filepicker=d})(document); 

$.notification().listen("upload", "file", "*", function(payload) {
	
	filepicker.setKey('AgIU6nVwJQLmzL6ICrpPHz');
	
	filepicker.pick(function(FPFile){
  	  console.log(FPFile.url);
  	},function(FPFile){
  		payload.callback(JSON.stringify(FPFile));
  	    //console.log(JSON.stringify(FPFile));
    },
    function(FPError){
      console.log(FPError.toString());
    });
});