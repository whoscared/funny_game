var usersResultsJSON = localStorage.getItem('userResults');
var usersResults = usersResultsJSON ? JSON.parse(usersResultsJSON) : [];

usersResults.sort(function(a, b) {
    return b.result - a.result;
});

var result = document.getElementById('result');

var userListElement = document.getElementById('userResultsList');

// Clear any existing content in the list
userListElement.innerHTML = '';

// Iterate over the usersResults array and create list items
for (var i = 0; i < usersResults.length; i++) {
  var user = usersResults[i];
  var listItem = document.createElement('li');
  listItem.textContent = 'Username: ' + user.username + ', Result: ' + user.result;
  userListElement.appendChild(listItem);
}

result.innerText = 'Твой результат ' + localStorage.getItem('currentResult');
