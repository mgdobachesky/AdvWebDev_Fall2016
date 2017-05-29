$('#employeeForm').submit(function(e) {
	$('#validation').hide();
	if(!$('input#firstName').val() || !$('input#lastName').val() || !$('input#department').val() || !$('input#startDate').val() || !$('input#jobTitle').val() || !$('input#salary').val()) {
		if($('#validation').length) {
			$('#validation').show();
		} else {
			$(this).prepend('<div id="validation" role="alert" class="alert alert-danger">All fields required, please try again</div>');
		}
		return false;
	}
});