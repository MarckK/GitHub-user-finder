$(document).ready(function() {
  $(document).on('keypress', '#username', function(event) {
    if (event.which === 13) { // check the key was <enter>
      var input = $(this);
      var username = input.val();
      var result = getGithubInfo(username);
      showUser(result);
    }
  })
});

 function getGithubInfo(username) {
  var url = "https://api.github.com/users/" + username;
  clearCurrentUser();
  var xmlhttp = new XMLHttpRequest(); 
  xmlhttp.open("GET", url, false);
  xmlhttp.send();

  return xmlhttp;
}

function clearCurrentUser () {
  $('#profile .information').html('');
  $('#profile .avatar').html('');
}

 function showUser (xmlhttp) {
	if (xmlhttp.status === 200) {
		var json = xmlhttp.responseText;
		var user = JSON.parse(json);
    $('#profile h2').text(user.login + " is GitHub user # " + user.id);
    $('#profile .information').html('<a href= "' + user.html_url + '"> profile </a>');
    $('#profile .avatar').html('<img src="' + user.avatar_url + '" />');
	} else {
		$('#profile h2').text('No such user!');
    clearCurrentUser();
    $('#profile .avatar').html('<img src="https://pbs.twimg.com/profile_images/63254424/octocat_sad_400x400.gif" />');
	}
} 