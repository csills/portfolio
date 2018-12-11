// When the user clicks on the scroll top arrow button, scroll to the top of the document.
function scrolltopFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// Submit Form Button //

// use underscore instead of getElementById in the code:
function _(id) { return document.getElementById(id); }

function submitForm(){
	_("submitButton").disabled = true;
	_("status").innerHTML = 'ting  please wait ...';
	var formdata = new FormData();
	formdata.append( "inputName", _("inputName").value );
	formdata.append( "inputEmail", _("inputEmail").value );
	formdata.append( "inputMessage", _("inputMessage").value );
	var ajax = new XMLHttpRequest();
	ajax.open( "POST", "contactFormParser.php" );
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4 && ajax.status == 200) {
			if(ajax.responseText == "success"){
				_("submit_form").innerHTML = '<h2>Thanks '+_("n").value+', your message has been sent.</h2>';
			} else {
				_("status").innerHTML = ajax.responseText;
				_("submitButton").disabled = false;
			}
		}
	}
	ajax.send( formdata );
}
