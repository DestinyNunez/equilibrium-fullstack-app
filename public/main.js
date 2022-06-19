let smile = document.getElementsByClassName("fa fa-smile-o");
let trash = document.getElementsByClassName("fa fa-trash");

// affirmations.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const _id = this.parentNode.parentNode.id
    console.log(_id)
    fetch('affirmations', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

// Gratitude.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const _id = this.parentNode.parentNode.id
    console.log(_id)
    fetch('gratitude', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

// meditation.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const _id = this.parentNode.parentNode.id
    console.log(_id)
    fetch('meditation', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

// journal.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const _id = this.parentNode.parentNode.id
    console.log(_id)
    fetch('journal', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


// profile.js
