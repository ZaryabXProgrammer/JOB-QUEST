import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const JobOpeningsGraph = ({ data }) => {
    const chartData = {
        labels: data.years,
        datasets: data.languages.map((language) => ({
            label: language.name,
            data: language.jobOpenings,
            borderColor: language.color,
            fill: false,
            tension: 0.1,
            borderWidth: 2, // Adjust the border width as needed
            pointRadius: 4, // Adjust the point size as needed
            pointBackgroundColor: 'white', // Set the point background color
        })),
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Job Openings',
                },
                beginAtZero: true,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
        },
        animation: {
            duration: 1000, // Animation duration in milliseconds
            easing: 'easeInOutCubic', // Animation easing function
        },
    };

    return <Line data={chartData} options={options} />;
};

export default JobOpeningsGraph;
