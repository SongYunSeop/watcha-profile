import React, {useEffect} from 'react';
import buildChart from '../libs/chart';
import {Section, theme} from '../style';
import {CircularProgress} from '@material-ui/core';
import LongChartsStyles from "./styles/LongChartStyles";

const {colors} = theme;

const FollowersCharts = ({userData, chartData}) => {
    const getBackgroundColor = (idx, length) => {
        const maxRGB = 255;
        return `rgba(0, ${((idx + 1) / length) * maxRGB}, 50, 0.7)`
    }
    const getBorderColor = (idx, length) => {
        const maxRGB = 255;
        return `rgba(0, ${((idx + 1) / length) * maxRGB}, 50, 1)`
    }
    const getHoverBackgroundColor = (idx, length) => {
        const maxRGB = 255;
        return `rgba(0, ${((idx + 1) / length) * maxRGB}, 10, 0.7)`
    }
    const getHoverBorderColor = (idx, length) => {
        const maxRGB = 255;
        return `rgba(0, ${((idx + 1) / length) * maxRGB}, 10, 1)`
    }

    const initChart = () => {
        const ctx = document.getElementById('Chart');
        const datasets = [
            {
                label: userData.name,
                data: userData.ratings_count,
                backgroundColor: 'rgba(255, 100, 130, 0.7)',
                borderColor: 'rgba(255, 100, 130, 1)',
                hoverBackgroundColor: 'rgba(255, 70, 100, 0.7)',
                hoverBorderColor: 'rgba(255, 70, 100, 1)',
            },
            ...chartData.map((follower, i) => {
                return {
                    label: follower.name,
                    data: follower.ratings_count,
                    backgroundColor: getBackgroundColor(i, chartData.length),
                    borderColor: getBorderColor(i, chartData.length),
                    hoverBackgroundColor: getHoverBackgroundColor(i, chartData.length),
                    hoverBorderColor: getHoverBorderColor(i, chartData.length)
                }
            }).sort((x, y) => (y.data - x.data)).slice(0, 100)
        ].sort((x, y) => (y.data - x.data))
        const labels = datasets.map(x => x.label)
        const data = datasets.map(x => x.data)
        const backgroundColor = datasets.map(x => x.backgroundColor)
        const borderColor = datasets.map(x => x.borderColor)
        const hoverBackgroundColor = datasets.map(x => x.hoverBackgroundColor)
        const hoverBorderColor = datasets.map(x => x.hoverBorderColor)

        if (data.length > 0) {
            const chartType = 'bar';
            const axes = false;
            const legend = false;
            const config = {
                ctx,
                chartType,
                labels,
                data,
                backgroundColor,
                borderColor,
                axes,
                legend,
                hoverBackgroundColor,
                hoverBorderColor
            };
            buildChart(config)
        }
    };

    useEffect(() => {
        if (chartData.length) {
            initChart()
        }
    }, [chartData]);

    const chartWidth = 800;
    const chartHeight = 300;

    const chartError = !(chartData && chartData.length > 0);
    return (
        <Section>
            <LongChartsStyles>
                <div className="chart">
                    <header><h2>Top 100 by Rating Count</h2></header>
                    <div className="chart-container">
                        {chartError && <p className="chart-progress"><CircularProgress/>
                            <div>Loading...</div>
                        </p>}
                        <canvas id="Chart" width={chartWidth} height={chartError ? 0 : chartHeight}/>
                    </div>
                </div>
            </LongChartsStyles>
        </Section>
    );
}

export default FollowersCharts
