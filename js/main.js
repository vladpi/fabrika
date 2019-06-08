"use strict";

function openProjects() {
	document.body.classList.add('window-opened');
	setTimeout(function(){
		document.querySelector('.projects-fixed-filter').classList.remove('invisible');
	}, 300);

}

function closeProjects() {
	document.body.classList.remove('window-opened');
	document.querySelector('.projects-fixed-filter').classList.add('invisible')
}

function moveHeader() {
	document.querySelector(".header").classList.toggle('header-up');
}

$(document).scroll(function(e) {
	e.preventDefault();
	var lastScrollTop = 0;
	$(window).scroll(function(event) {
		var st = $(this).scrollTop();
		if (st > lastScrollTop && !$('.header').hasClass('header-up')) {
			// $('.header').addClass('header-up');
		}
		else if (st == 0 && $('.header').hasClass('header-up')) {
			$('.header').removeClass('header-up');
		}
		lastScrollTop = st;
	});
});

var mixer = mixitup('.projects-grid', {
    animation: {
        duration: 300
    }
});

$('.order-submit').click(function(e){
	e.preventDefault();
	var radios = document.getElementsByName('type');

	var errType = true;
	var errEmpty = true;
	var errEmail = true;

	for (var i = 0, length = radios.length; i < length; i++) {
	    if (radios[i].checked) {
			errType = false;
	    }
		if(errType) {
			$(".error-type").removeClass('invisible');
		} else {
			$(".error-type").addClass('invisible');

		}
	}

	var textFields = document.getElementsByClassName('order-text');

	for (var i = 0, length = textFields.length; i < length; i++) {
		if (textFields[i].value == '') {
			errEmpty = false;
		}
		if(errEmpty) {
			$(".error-empty").addClass('invisible');
			errEmpty = true;
		}
		else {
			$(".error-empty").removeClass('invisible');
		}
	}

	var emailFields = document.getElementById('js-email').value;
	var atpos = emailFields.indexOf("@");
	var dotpos = emailFields.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailFields.length) {
		errEmail = false;
	}
	if (errEmail) {
		$(".error-email").addClass('invisible');
		errEmail = true;
	} else {
		$(".error-email").removeClass('invisible');
	}


	if(errEmail) {
		if(errEmpty) {
			if(!errType) {
				document.querySelector(".order-form").submit();
			}
		}
	}


});

$(".order-radio-label").click(function(){
	$(".error-type").addClass('invisible');
});

$(".order-text").change(function(){
	$(".error-empty").addClass('invisible');
});


// var docWidth = document.documentElement.offsetWidth;
//
// [].forEach.call(
//   document.querySelectorAll('*'),
//   function(el) {
//     if (el.offsetWidth > docWidth) {
//       console.log(el);
//     }
//   }
// );

var inputs = document.querySelectorAll( '.order-file' );
Array.prototype.forEach.call( inputs, function( input )
{
	input.addEventListener( 'change', function( e )
	{
		var fileName = e.target.value.split( '\\' ).pop();
		document.querySelector( '.file-active' ).innerHTML = fileName;
		document.querySelector( '.file-active' ).classList.remove('invisible');

	});
});
