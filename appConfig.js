(function($){
    $.extend({
    	appConfig: {
    		customerId: 'cloudlawyer',
            customerDomain: 'www.cloudlawyer.co',
            companyLongName: "Cloud Lawyer Inc.",
            companyShortName: "Cloud Lawyer",
    		cdnBase: 'http://81ddd102e3ce0fbdf5e1-7158f6b24e5d11fdd8350c66521fe0d0.r24.cf1.rackcdn.com/',
    		cdbBaseSecure: 'https://81ddd102e3ce0fbdf5e1-7158f6b24e5d11fdd8350c66521fe0d0.ssl.cf1.rackcdn.com/',
    		imagePrefix: 'cl',
    		defaultCredentials: "cloudlawyer.co-public",
    		defaultCustomer: "cloudlawyer.co",
    		defaultUsername: "public",
    		defaultToken: "public",
    		defaultApplication: "wut",
    		productCategories: [{"id":"sorbet","name":"Sorbet"},
    		                     {"id":"frozen-yogurt","name":"Frozen Yogurt"},
    		                     {"id":"ice-cream","name":"Ice Cream"},
    		                     {"id":"frozen-custard","name":"Frozen Custard"},
    		                     {"id":"gelato","name":"Gelato"}
            ],
    		
    	}
    });
})(jQuery);

document.writeln('<link rel="stylesheet" type="text/css" href="css/' + $.appConfig.customerDomain + '.css"></link>');

