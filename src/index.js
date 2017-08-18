import Chart from 'chartjs'

var fb = new Firebase('https://uniroller-fa110.firebaseio.com/');
var chartRef = fb.child('chart-1');
var dataRef  = fb.child('chart-data');

var ctx   = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'line',
  data: [],
  options: {
		responsive: true,
          title:{
              display:true,
              text:"Chart.js Time Point Data"
          },
		scales: {
			xAxes: [{
				type: "time",
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Date'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'value'
				}
			}]
		}
	}
});

var timestamp = new Date().getTime();

chartRef.endAt(timestamp).once('value', function(snap) {
  var dataSeries = snap.val();
  if (!snap.val()) return;
  dataSeries = dataSeries.series;
  
  dataSeries.forEach(function(item, idx) {
    item.data = [];
    chart.data.datasets.push(item);
    // seg = chart.segments[idx];
    // seg.data = [];

    var childRef = dataRef.child(item.label);
    childRef.on('child_added', function(snap){
       onData(snap, item.label);
    });
  });
});

function onData(snap, series) {
  
  chart.data.datasets.forEach(function(dataset) {
    if (dataset.label == series) {
      var data = snap.val();
      console.log("Adding data", data);
      dataset.data.push(snap.val());
    }
  });
  chart.update();
}