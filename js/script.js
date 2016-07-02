$(document).ready(function() {
    var ctx = document.getElementById("mySkills");
    var radarChart = new Chart(ctx, {
        type: 'horizontalBar',
        responsive: true,
        data: {
            labels: ["Front-end", "Back-end", "Networking", "Programming"],
            datasets: [
                {
                    label: "Skillset",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: [55, 65, 80, 50]
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                        stacked: true,
                        ticks: {
                            min: 0,
                            max: 100
                        },
                        gridLines: {
                            display: false
                        }
                }],
                yAxes: [{
                        stacked: true,
                }]
            }
        }
    });
});
