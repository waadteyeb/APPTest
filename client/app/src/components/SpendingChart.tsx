import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface SpendingChartProps {
    spendings: { type: string; count: number }[];
}

interface SpendingChartState {
    chartData: any[];
    chartOptions: any;
}

class SpendingChart extends React.Component<SpendingChartProps, SpendingChartState> {
    constructor(props: SpendingChartProps) {
        super(props);

        this.state = {
            chartData: [
                {
                    name: 'Spending',
                    data: props.spendings.map(s => s.count), //  I Used count from the spendings data
                }
            ],
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                xaxis: {
                    categories: props.spendings.map(s => s.type), // I Used type from the spendings data for x-axis labels
                    title: {
                        text: 'Spending Type'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Spending Count'
                    }
                },
                title: {
                    text: 'Spending Chart',
                    align: 'center'
                },
                tooltip: {
                    y: {
                        formatter: function (val: number) {
                            return `$${val}`; 
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                },
                colors: ['#00E396'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'horizontal',
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                }
            }
        };
    }

    componentDidUpdate(prevProps: SpendingChartProps) {
        if (prevProps.spendings !== this.props.spendings) {
            this.setState({
                chartData: [
                    {
                        name: 'Spending',
                        data: this.props.spendings.map(s => s.count),
                    }
                ],
                chartOptions: {
                    ...this.state.chartOptions,
                    xaxis: {
                        categories: this.props.spendings.map(s => s.type),
                    }
                }
            });
        }
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart
                    options={this.state.chartOptions}
                    series={this.state.chartData}
                    type="bar" 
                    width="100%"
                    height="350"
                />
            </div>
        );
    }
}

export default SpendingChart;
