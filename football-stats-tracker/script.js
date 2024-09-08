// Initialize stats object with new stats
let stats = {
    touches: 0,
    attemptedPasses: 0,
    successfulPasses: 0,
    failedPasses: 0,
    shots: 0,
    shotsOnTarget: 0,
    shotsOffTarget: 0,
    successfulDribbles: 0,
    unsuccessfulDribbles: 0,
    tackles: 0,
    goals: 0,
    assists: 0,
    headers: 0,
    headersOnTarget: 0,
    headersOffTarget: 0,
    fouls: 0,
    blocks: 0,
    timesFouled: 0,
    clearanceHeaders: 0,
    clearances: 0,
    interceptions: 0,
    keyPasses: 0,
    crosses: 0,
    minutesPlayed: 75
};

// Function to update stats
function updateStat(statName, delta) {
    stats[statName] += delta;
    if (stats[statName] < 0) stats[statName] = 0; // Prevent negative values
    document.getElementById(statName).textContent = stats[statName];
    updateCalculations();
}

// Function to update minutes played
function updateMinutesPlayed() {
    const minutes = parseInt(document.getElementById('minutes-played-input').value);
    if (!isNaN(minutes) && minutes >= 0) { // Allow zero minutes
        stats.minutesPlayed = minutes;
        updateCalculations();
    }
}

// Function to calculate and display percentages
function updateCalculations() {
    const shotAccuracy = (stats.shotsOnTarget + stats.shotsOffTarget > 0) 
        ? (stats.shotsOnTarget / (stats.shotsOnTarget + stats.shotsOffTarget) * 100) 
        : 0;
    const passCompletionRate = (stats.attemptedPasses > 0) 
        ? (stats.successfulPasses / stats.attemptedPasses * 100) 
        : 0;
    const dribbleSuccessRate = (stats.successfulDribbles + stats.unsuccessfulDribbles > 0) 
        ? (stats.successfulDribbles / (stats.successfulDribbles + stats.unsuccessfulDribbles) * 100) 
        : 0;
    const headerAccuracy = (stats.headers > 0) 
        ? (stats.headersOnTarget / stats.headers * 100) 
        : 0;
    const goalConversionRate = (stats.shotsOnTarget > 0) 
        ? (stats.goals / stats.shotsOnTarget * 100) 
        : 0;
    const passAccuracy = (stats.attemptedPasses > 0) 
        ? (stats.successfulPasses / stats.attemptedPasses * 100) 
        : 0;

    // Update the text content of the elements to show the calculated percentages
    document.getElementById('shot-accuracy').textContent = `${shotAccuracy.toFixed(2)}%`;
    document.getElementById('pass-completion-rate').textContent = `${passCompletionRate.toFixed(2)}%`;
    document.getElementById('dribble-success-rate').textContent = `${dribbleSuccessRate.toFixed(2)}%`;
    document.getElementById('header-accuracy').textContent = `${headerAccuracy.toFixed(2)}%`;
    document.getElementById('goal-conversion-rate').textContent = `${goalConversionRate.toFixed(2)}%`;
    document.getElementById('pass-accuracy').textContent = `${passAccuracy.toFixed(2)}%`;

    // Call function to update charts
    updateCharts();
}

// Function to update charts
function updateCharts() {
    const shotChartCtx = document.getElementById('shot-chart').getContext('2d');
    new Chart(shotChartCtx, {
        type: 'pie',
        data: {
            labels: ['Shots on Target', 'Shots off Target'],
            datasets: [{
                label: 'Shot Distribution',
                data: [stats.shotsOnTarget, stats.shotsOffTarget],
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    const passChartCtx = document.getElementById('pass-chart').getContext('2d');
    new Chart(passChartCtx, {
        type: 'pie',
        data: {
            labels: ['Successful Passes', 'Failed Passes'],
            datasets: [{
                label: 'Pass Completion',
                data: [stats.successfulPasses, stats.failedPasses],
                backgroundColor: ['#4bc0c0', '#ffcd56']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    const headerChartCtx = document.getElementById('header-chart').getContext('2d');
    new Chart(headerChartCtx, {
        type: 'pie',
        data: {
            labels: ['Headers on Target', 'Headers off Target'],
            datasets: [{
                label: 'Header Distribution',
                data: [stats.headersOnTarget, stats.headersOffTarget],
                backgroundColor: ['#ff6384', '#36a2eb']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Additional pie charts for percentages
    const shotAccuracyChartCtx = document.getElementById('shot-accuracy-chart').getContext('2d');
    new Chart(shotAccuracyChartCtx, {
        type: 'pie',
        data: {
            labels: ['Shots on Target', 'Shots off Target'],
            datasets: [{
                label: 'Shot Accuracy',
                data: [stats.shotsOnTarget, stats.shotsOffTarget],
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    const passAccuracyChartCtx = document.getElementById('pass-accuracy-chart').getContext('2d');
    new Chart(passAccuracyChartCtx, {
        type: 'pie',
        data: {
            labels: ['Successful Passes', 'Failed Passes'],
            datasets: [{
                label: 'Pass Accuracy',
                data: [stats.successfulPasses, stats.failedPasses],
                backgroundColor: ['#4bc0c0', '#ffcd56']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    const dribbleSuccessRateChartCtx = document.getElementById('dribble-success-rate-chart').getContext('2d');
    new Chart(dribbleSuccessRateChartCtx, {
        type: 'pie',
        data: {
            labels: ['Successful Dribbles', 'Unsuccessful Dribbles'],
            datasets: [{
                label: 'Dribble Success Rate',
                data: [stats.successfulDribbles, stats.unsuccessfulDribbles],
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    const headerAccuracyChartCtx = document.getElementById('header-accuracy-chart').getContext('2d');
    new Chart(headerAccuracyChartCtx, {
        type: 'pie',
        data: {
            labels: ['Headers on Target', 'Headers off Target'],
            datasets: [{
                label: 'Header Accuracy',
                data: [stats.headersOnTarget, stats.headersOffTarget],
                backgroundColor: ['#ff6384', '#36a2eb']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    const goalConversionRateChartCtx = document.getElementById('goal-conversion-rate-chart').getContext('2d');
    new Chart(goalConversionRateChartCtx, {
        type: 'pie',
        data: {
            labels: ['Goals Scored', 'Shots on Target'],
            datasets: [{
                label: 'Goal Conversion Rate',
                data: [stats.goals, stats.shotsOnTarget - stats.goals],
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Initialize charts on page load
document.addEventListener('DOMContentLoaded', function () {
    updateCharts();
});
