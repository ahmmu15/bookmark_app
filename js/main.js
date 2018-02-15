// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e) {
  // prevent form from submitting
  e.preventDefault();


  // get form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;
  /*
    console.log(siteName);
    console.log(siteURL);
  */

  // validate the form using the function that defined below
  if (!validateForm(siteName, siteURL)) {
    return false
  }


  // this object will serve as a container for submitted values === will be stored in localStorage
  var bookmark = {
    name: siteName,
    url: siteURL
  }

  /*
    // local storage test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // test is bookmark is null
  if (localStorage.getItem('bookmarks') === null) {
    // init array
    var bookmarks = [];
    // add to array
    bookmarks.push(bookmark);
    // set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //using JSON.stringify to convert JSON to strings, because localStorage can only save strings
  } else {
    // get bookmarksfrom localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //use JSON.parse() to turn a string into JSON
    // add bookmark to array
    bookmarks.push(bookmark);
    // re-set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }

  // clear the form after submit, by grabing the form and call reset function
  document.getElementById('myForm').reset();

  // ok now we have to refetch the bookmarks or update the values in html file == after submitting the form as well
  fetchBookmarks();

}

// delete bookmar function that used in remove button
function deleteBookmark(url) {
  // get booksmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    // checking if the passed url is the same url that got through the loop, then this one is the one that should be removed
    if (bookmarks[i].url === url) {
      // remove from array
      bookmarks.splice(i, 1);
    }
  }

  // now we have to update localStorageafter the value is removed
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


  // ok now we have to refetch the bookmarks or update the values in html file
  fetchBookmarks();
}



// Getting bookmarks and display them in website
function fetchBookmarks () {
  // get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // get output id
  var bookmarksResults = document.getElementById('bookmarkResults');

  // build output
  bookmarksResults.innerHTML = '';

  // loop through items in localStorage
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    // spit the items in localStorage out to html file
    bookmarksResults.innerHTML += '<div class="well">' +
                                  '<h3>' + name +

                                  '<a onClick="deleteBookmark(\''+url+ '\')" class="btn btn-danger" href="#">Remove</a>'

                                  +

                                  '<a class="btn btn-default" target="_blank" href=" '+url+' ">Visit</a>' +

                                  '</h3>'

                                  +

                                  '<p class="linkp hidden">' + url + '</p>'

                                  +

                                  '</div>'

  }
}



// validate fom function is here, this is used when submitting the form
function validateForm(siteName, siteURL) {
  // validate input fields == if empty, then dont submit
  if (!siteName || !siteURL) {
    alert('Please fill in the form!');
    return false;
  }

  //here are regular expressions to validate the url input field == you can find more about Reges at https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  // now it's time to check if the url is matching the pattern the we specified in regex rule
  if (!siteURL.match(regex)) {
    alert('Please use a valide URL');
    return false;
  }

  // if the validation is ok == then pass it by return true [[we're return true as a result of the function ... because it will be used else where]]
  return true;
}


// clicking the (show link) button will show and hide the link
function showAndHide() {
  var linkParagraph = document.getElementsByClassName('linkp');
  for (var i = 0; i < linkParagraph.length; i++) {
    linkParagraph[i].classList.toggle('hidden');
  }
}


// copy localStorage to clipboard
function copyData() {
  copy(JSON.stringify(JSON.stringify(localStorage)));
}
