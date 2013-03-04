$.notification().listen('initialize', 'calendar', '*', function(initializeNotification) {
	//Code for rendering the initial state of the calendar
	var id = initializeNotification.getId();
	initializeNotification.setData('weekOffset', 0);
	
	
	$('#'+id+' tbody tr.time td.day').click(function() {
		var me = $(this);
		var parent = me.parent();
		var notAvailable = me.children('div.event.unavailable').length > 0;
		
		var dayOfWeek = me.attr('data-dayOfWeek');
		var time = parent.attr('data-time');
		
		var rawDate = $('#'+id+' thead td[data-dayOfWeek="' + dayOfWeek + '"] span.date').html();
		var year = $('#'+id+' thead td[data-dayOfWeek="' + dayOfWeek + '"] span.date').attr('data-year');
		var month = rawDate.slice(0, rawDate.indexOf('/'));
		var day = rawDate.slice(rawDate.indexOf('/') + 1);
		
		if (notAvailable === true) {
			$.notification().notify('dateNotAvailable', 'calendar', id, {month:month, day:day, year:year, time:time, dayOfWeek:dayOfWeek});
		} else if (notAvailable === false) {
			$.notification().notify('dateChosen', 'calendar', id, {month:month, day:day, year:year, time:time, dayOfWeek:dayOfWeek});
		} else {
			$.notification().notify('trackAnalytics', 'calendarTemplate', 'fatal', {description:'Error determining availability on calendar'});
			$.notification().notify('genericError', 'calendar', id, { });
		}
	});
	
	$('#'+id+' h3 a.previousWeek').click(function(){
		$.notification().notify('update', 'calendar', id, {weekChange:-1});
	});
	$('#'+id+' h3 a.nextWeek').click(function(){
		$.notification().notify('update', 'calendar', id, {weekChange:1});
	});
	
	function getMonthString(monthInteger) {
		
		if (typeof monthInteger !== 'number') {
			monthInteger = parseInt(monthInteger);
		}
		
		switch (monthInteger) {
		case 0:
			return 'January';
			break;
		case 1:
			return 'February';
			break;
		case 2:
			return 'March';
			break;
		case 3:
			return 'April';
			break;
		case 4:
			return 'May';
			break;
		case 5:
			return 'June';
			break;
		case 6:
			return 'July';
			break;
		case 7:
			return 'August';
			break;
		case 8:
			return 'September';
			break;
		case 9:
			return 'October';
			break;
		case 10:
			return 'November';
			break;
		case 11:
			return 'December';
			break;
		}
	}
//
	function getDaysInMonth(monthInteger) {
		switch (monthInteger) {
		case 0:
			return 31;
			break;
		case 1:
			return 28;
			break;
		case 2:
			return 31;
			break;
		case 3:
			return 30;
			break;
		case 4:
			return 31;
			break;
		case 5:
			return 30;
			break;
		case 6:
			return 31;
			break;
		case 7:
			return 31;
			break;
		case 8:
			return 30;
			break;
		case 9:
			return 31;
			break;
		case 10:
			return 30;
			break;
		case 11:
			return 31;
			break;
		}
	}
	
	function getDaySuffix(day) {
		var lastDigit = day.toString().slice(day.length);
		var suffix = "th";
		
		//TODO: 2 isnt returned right
		switch(lastDigit) {
		    case "1": suffix = "st";
		    case "2": suffix = "nd";
		    case "3": suffix = "rd";
		}
		
		return suffix;
	}
	
	$.notification().listen('dateNotAvailable', 'calendar', id, function(notification) {
		var id = notification.getId();
		var payload = notification.getPayload();
		
		var dayClicked = $('#'+id+' tr[data-time="' + payload.time + '"] td[data-day="' + payload.day + '"]');
		
		dayClicked.popover({title:'Time slot unavailable', 
								content:'This time slot is currently unavailable.  Please choose another.', 
								trigger:'manual',
								placement:'top'});
		dayClicked.popover('show');
		dayClicked.mouseleave(function(){
			dayClicked.popover('hide');
		});
	});
	
	

	$.notification().listen('dateChosen', 'calendar', id, function(notification) {
		var payload = notification.getPayload();
		//Add the user's chosen block to the calendar
		var addEventPayload = payload;
		addEventPayload.type = 'selected';
		
		$.notification().notify('hide', 'alert', id+'-alert', { });
		$.notification().notify('addEvent', 'calendar', id, addEventPayload);
		$.notification().notify('dateChosen', 'controller', '*', payload);
		
		
		
		var monthString = getMonthString(payload.month);
		
		
		var chosenDate = new Date(payload.year, payload.month, payload.day, payload.time.slice(0, payload.time.length - 2));
		var chosenEpoch = chosenDate.getTime();
		
		$.notification().notify('change-value', 'field', id+'-selected-date', {value:chosenEpoch});
		
	});
	
	$.notification().listen('getSelectedDate', 'calendar', id, function(notification){
		var payload = notification.getPayload();
		$.notification().notify('getValue', 'field', id+'-selected-date', {callback:function(value){
			if (paylaod.callback !== undefined) {
				payload.callback(value);
			}
		}});
	});
	
	$.notification().listen('genericError', 'calendar', id, function(notification){
		$.notification().notify('update', 'alert', id+'-alert', {text:'There was a problem selecting an appointment.  Please contact customer service for assistance', hidden:false});
	});
	$.notification().listen('showSelectATimeAlert', 'calendar', id, function(notification){
		$.notification().notify('update', 'alert', id+'-alert', {text:'Please select an appointment time to continue', hidden:false});
	});
	
	$.notification().listen('update', 'calendar', id, function(notification) {
		var payload = notification.getPayload();
		
		var unavailableEvents = payload.unavailableEvents;
		if (unavailableEvents === undefined) {
			unavailableEvents = initializeNotification.getData('unavailableEvents', [ ]);
		} else {
			initializeNotification.setData('unavailableEvents', unavailableEvents);
		}
		
		var weekOffset = initializeNotification.getData('weekOffset', 0);		
		if (payload.weekChange !== undefined) {
			weekOffset = weekOffset + payload.weekChange;
			initializeNotification.setData('weekOffset', weekOffset);
			
			$('#'+id+' tr td div.event').remove();
			
			var currentDate = new Date();
			var anotherDate = new Date(currentDate);
			anotherDate.setDate(currentDate.getDate() + (weekOffset*7));
			var date = new Date(anotherDate);
			
			var dayOfMonth = date.getDate();
			
			var month = date.getMonth();
			
			var monthString = getMonthString(month);
			var daysInMonth = getDaysInMonth(month);
			var startYear = date.getFullYear();
			var endYear = date.getFullYear();
			var currentYear = startYear;
			
			var nextDay = dayOfMonth - date.getDay();
			var daysRendered = 0;
			var daysInMonth = getDaysInMonth(month);
			
			$('#'+id+' h3 span.monthRangeStart').html(monthString);
			$('#'+id+' h3 span.dayRangeStart').html(nextDay + getDaySuffix(nextDay));
			
			
			while (daysRendered < 7) {
				$('#'+id+' tr.days-header td[data-dayOfWeek="' + daysRendered + '"] span.date').html(month + '/' + nextDay);
				$('#'+id+' tr.days-header td[data-dayOfWeek="' + daysRendered + '"] span.date').attr('data-year', currentYear);
				$('#'+id+' tr.days-header td[data-dayOfWeek="' + daysRendered + '"] span.date').attr('data-day', nextDay);
				$('#'+id+' tbody td.day[data-dayOfWeek="' + daysRendered + '"]').each(function(){
					$(this).attr('data-day', nextDay);
				});
				
				
				
				daysRendered += 1;
				nextDay += 1
				
				if (nextDay > daysInMonth) {
					nextDay = 1;
					month += 1;
					if (month > 11) {
						month = 1;
						endYear = startYear + 1;
						currentYear = endYear;
					}
					monthString = getMonthString(month);
				}
			}
			
			nextDay = nextDay - 1;
			
			$('#'+id+' h3 span.monthRangeEnd').html(monthString);
			$('#'+id+' h3 span.dayRangeEnd').html(nextDay + getDaySuffix(nextDay));
			if (startYear !== endYear) {
				$('#'+id+' h3 span.yearRangeStart').html(', ' + startYear);
			}
			$('#'+id+' h3 span.yearRangeEnd').html(', ' + endYear);
			
			
		}
		
		if (unavailableEvents !== undefined) {
			$.each(unavailableEvents, function(index, event){
				$.notification().notify('addEvent', 'calendar', id, {epoch:event.epoch, type:'unavailable'});
			});
		}
		
	});
	
	$.notification().listen('addEvent', 'calendar', id, function(notification) {
		var payload = notification.getPayload();
		var time;
		var day;
		var type = payload.type;
		
		if (payload.epoch !== undefined) {
			if (typeof payload.epoch !== 'number') {
				payload.epoch = parseInt(payload.epoch);
			}
			var date = new Date(payload.epoch);
			day = date.getDate();
			time = date.getHours().toString() + '00';
		} else if (payload.time !== undefined && payload.dayOfWeek !== undefined) {
			time = payload.time;
			day = payload.day;
		}
		if (time !== undefined && day !== undefined && type !== undefined) {
			var html = '<div class="event ' + type + '">';
			if (type === 'selected') {
				html += 'Your Appointment';
				$('#'+id+' tr td div.event.selected').remove();
			} else if (type === 'unavailable') {
				html += 'Unavailable';
			}
			html += '</div>';
			$('#'+id+' tr[data-time="' + time + '"] td[data-day="' + day + '"]').html(html);
		} else {
			$.notification().notify('trackAnalytics', 'calendarTemplate', 'error', {description:'Missing necessary paramters to add item to calendar widget'});
		}
		
		
		
		
	});
	
	$.notification().notify('initialized', 'calendar', id, { });
});

//$.notification().notify('dateNotAvailable', 'calendar', id, {month:month, day:day, year:year});
//$.notification().notify('dateChosen', 'calendar', id, {month:month, day:day, year:year});
//$.notification().notify('genericError', 'calendar', id, { });


