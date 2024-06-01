const JobOpeningsGraph = ({ data }) => {
    const [chartOptions, setChartOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,  // Allow chart to use the full container height
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Job Openings',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    beginAtZero: true,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                },
            },
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutCubic',
        },
    });

    const chartData = {
        labels: data.years,
        datasets: data.languages.map((language) => ({
            label: language.name,
            data: language.jobOpenings,
            borderColor: language.color,
            fill: false,
            tension: 0.1,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: 'white',
        })),
    };

    const updateChartOptions = () => {
        const isMobile = window.innerWidth <= 768;
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            scales: {
                x: {
                    title: {
                        display: !isMobile,
                        text: 'Year',
                        font: {
                            size: isMobile ? 10 : 14,
                        },
                    },
                    ticks: {
                        font: {
                            size: isMobile ? 8 : 12,
                        },
                    },
                },
                y: {
                    title: {
                        display: !isMobile,
                        text: 'Job Openings',
                        font: {
                            size: isMobile ? 10 : 14,
                        },
                    },
                    ticks: {
                        font: {
                            size: isMobile ? 8 : 12,
                        },
                    },
                },
            },
            plugins: {
                ...prevOptions.plugins,
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: isMobile ? 10 : 12,
                        },
                    },
                },
            },
        }));
    };

    useEffect(() => {
        window.addEventListener('resize', updateChartOptions);
        updateChartOptions(); // Initial call to set options based on current screen size

        return () => {
            window.removeEventListener('resize', updateChartOptions);
        };
    }, []);

    return <Line data={chartData} options={chartOptions} height={400} />;
};

export default JobOpeningsGraph;
