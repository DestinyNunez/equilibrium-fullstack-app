let smile = document.getElementsByClassName("fa fa-smile-o");
let trash = document.getElementsByClassName("fa-trash");
console.log(trash)
let meditationSubmitBtn = document.getElementById("submitMeditation");
let meditationTimes = [];

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });


getLatestMeditationChartData();

if (meditationSubmitBtn) {
  meditationSubmitBtn.addEventListener('click', function() {
    getLatestMeditationChartData();
  });
}


function getLatestMeditationChartData() {
  fetch('meditationData', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      updateMeditationTimeData(data);
    })
}

function updateMeditationTimeData(data) {
  let meditationData = data.meditationTime;
  // Calculate meditation data totals
  let mondayTotal = 0
  let tuesdayTotal = 0
  let wednesdayTotal = 0
  let thursdayTotal = 0
  let fridayTotal = 0
  let saturdayTotal = 0
  let sundayTotal = 0

  meditationData.forEach((item, i) => {
    let date = new Date(item.meditationDate);
    let day = date.getDay(); // get day of week from date
    switch (day) {
      case 0:
        sundayTotal += item.meditationTime
        break;
      case 1:
        mondayTotal += item.meditationTime
        break;
      case 2:
        tuesdayTotal += item.meditationTime
        break;
      case 3:
        wednesdayTotal += item.meditationTime
        break;
      case 4:
        thursdayTotal += item.meditationTime
        break;
      case 5:
        fridayTotal += item.meditationTime
        break;
      case 6:
        saturdayTotal += item.meditationTime
        break;
      default:
        break
    }
    // console.log(item.meditationTime, "meditationTime");
  });
  meditationTimes = [sundayTotal, mondayTotal, tuesdayTotal, wednesdayTotal, thursdayTotal, fridayTotal, saturdayTotal]
  console.log(meditationTimes);
  updateMeditationChart();
}

function updateMeditationChart() {
  myChart.data.datasets[0].data = meditationTimes;
  myChart.update();
}


// Delete==========================
// affirmations.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const id = this.parentNode.parentNode.parentNode.parentNode.id
    console.log({trashCan: id})
    fetch('affirmations', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id
      })
    }).then(function(response) {
      // window.location.reload()
    })
  });
});


// Gratitude.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const id = this.parentNode.parentNode.parentNode.parentNode.id
    fetch('gratitude', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});

// meditation.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const id = this.parentNode.parentNode.parentNode.parentNode.id
    fetch('meditation', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});

// journal.js
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const id = this.parentNode.parentNode.parentNode.parentNode.id
    fetch('journal', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id
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
      label: 'Total Minutes of Meditation',
      data: meditationTimes,
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
        'rgba(198, 178, 298, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// profile.js
