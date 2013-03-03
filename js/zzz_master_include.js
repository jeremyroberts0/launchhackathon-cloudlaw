function getDomain() {
	var indexOfSlashSlash = window.location.href.indexOf('//');
	var domainAfterSlashSlash = window.location.href.slice(indexOfSlashSlash+2, window.location.href.length);
	var indexOfFirstSlash = domainAfterSlashSlash.indexOf('/'); 
    var domain = domainAfterSlashSlash.slice(0, indexOfFirstSlash);
    if (domain.indexOf(":") != -1) {
    	domain = domain.split(':')[0];
    }
    return domain;
}

var port = parseInt(document.location.port);
var domain = getDomain();
        	
jsPrepend = '../js/';
cssPrepend = '../css/';
//jsPrepend = 'http://70271c99b497b5c34c62-40b11acdb28ec7f6edfe214ca9250d35.r29.cf1.rackcdn.com/js/';
//cssPrepend = 'http://70271c99b497b5c34c62-40b11acdb28ec7f6edfe214ca9250d35.r29.cf1.rackcdn.com/css/';

var sheets = [
              //"1140.css",
              //"foundation.css",
              "bootstrap.min.css",
              "bootstrap-responsive.min.css",
              "style.css", 
              "rateit.css"
             ];

var libraries = ["jquery-1.7.js",
                 "jquery.rateit.js",
                 "modernizr.js",
                 "crossBrowserJSFix.js",
				   "json2.js",
				   //"foundation.js",
				   //"modernizr.foundation.js",
				   "notification.js",
				   "field-placeholder.js",
				   "bootstrap.js",
				   "utilities.js",
				   "md5.js",
				   "crossBrowserUIFix.js",
				   "debug.js",
				   "jquery.autosize-min.js",
				   "/ckeditor/ckeditor.js",
				   "cookie.js"
               ];

var models = ["storage.js",
              "local.js",
              "server.js",
              "wut.js",
              "widget.js",
              "url.js",
              "mustache.js",
              "session.js",
              "template2.js",
              "renderingOnServer.js",
              "renderer.js",
             ];

var widgets = ["alert.js",
                  "analytics.js",
                  "button.js",
                  "datatable.js",
                  "field.js",
                  "form.js",
                  "header.js",
                  "list.js",
                  "login.js",
                  "menu.js",
       		      "spacer.js",
       		      "text.js",
       		      
       		      "html.js",
       		      "progressbar.js",
       		      "banner.js",
       		      "caption.js",
       		      "subheader.js",
       		      "image.js",
       		      "link.js",
       		      "carousel.js",
       		      "minicart.js",
       		      "checkbox.js",
       		      ];

var layouts = ["vertical.js",
			   "horizontal.js",
			   "grid.js",
			   "row.js",
			   "modal.js",
			   "buttonbar.js"
               ];



//JS Libraries & Frameworks
document.writeln('<!--libraries-->');
for (var i = 0; i < libraries.length; i++) {
	document.writeln('<script src="' + jsPrepend + libraries[i] + '"></script>');
}

//Style sheets
document.writeln('<!--style-->');
for (var i = 0; i < sheets.length; i++) {
	document.writeln('<link rel="stylesheet" type="text/css" href="' + cssPrepend + sheets[i] + '"></link>');
}

//App Config
if (document.title === 'Jasmine Tests') {
	document.writeln('<script src="../appConfig.js"></script>');
} else {
	document.writeln('<script src="appConfig.js"></script>');
}

//WUT Core JS
document.writeln('<!--model-->');
for (var i = 0; i < models.length; i++) {
	document.writeln('<script src="' + jsPrepend + models[i] + '"></script>');
}

//WUT Widgets
document.writeln('<!--layouts-->');
for (var i = 0; i < layouts.length; i++) {
	document.writeln('<script src="' + jsPrepend + 'layouts/' + layouts[i] + '"></script>');
}

//WUT Widgets
document.writeln('<!--widgets-->');
for (var i = 0; i < widgets.length; i++) {
	document.writeln('<script src="' + jsPrepend + 'widgets/' + widgets[i] + '"></script>');
}

//Site Favicon
document.writeln('<link rel="shortcut icon" href="favicon.ico" />');








