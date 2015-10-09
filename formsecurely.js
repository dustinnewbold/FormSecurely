(function(document) {
	/**
	 * Cycle through all forms and attach the submission event
	 */
	function attachEvent() {
		var forms = document.querySelectorAll('form'),
			insecureForms = [];

		for ( var i = 0; i < forms.length; i++ ) {
			if ( formIsInsecure(forms[i]) ) {
				insecureForms.push(forms[i]);
				forms[i].classList.add('formsecurely-insecure-form');
				forms[i].addEventListener('submit', function(e) {
					if ( ! confirm('You are about to submit insecure data. Do you wish to continue?') ) {
						e.preventDefault();
					}
				});
			}
		}

		if ( insecureForms.length ) {
			console.warn('This page contains ' + insecureForms.length + ' insecure forms.', insecureForms);
		}
	}


	/**
	 * Check to see if form is submitting to secure server
	 */
	function formIsInsecure(form) {
		var action = form.getAttribute('action');
		if ( action == null ) return false;
		return ( action.substr(0, 8) !== 'https://' );
	}


	/**
	 * Kick off the process
	 */
	attachEvent();
})(document);