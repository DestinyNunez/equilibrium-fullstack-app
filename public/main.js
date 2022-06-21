let smile = document.getElementsByClassName("fa fa-smile-o");
let trash = document.getElementsByClassName("fa fa-trash");

// affirmations.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
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
    }).then(function(response) {
      window.location.reload()
    })
  });
});

// Gratitude.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
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
    }).then(function(response) {
      window.location.reload()
    })
  });
});

// meditation.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
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
    }).then(function(response) {
      window.location.reload()
    })
  });
});

// journal.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
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
    }).then(function(response) {
      window.location.reload()
    })
  });
});



// meditation Data
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [{
      label: 'Meditation Data',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',
        'rgba(198, 178, 298)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(198, 178, 298)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


// profile.js
