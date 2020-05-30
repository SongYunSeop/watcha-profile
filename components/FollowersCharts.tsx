import React, {useEffect, useState} from 'react';
import buildChart from '../libs/chart';
import {Section, theme} from '../style';
import {CircularProgress} from '@material-ui/core';
import LongChartsStyles from "./styles/LongChartStyles";
import StarIcon from "@material-ui/icons/Star";

const {colors} = theme;

const FollowersCharts = ({userData, followersData}) => {
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

    const [genreChartData, setGenreChartData] = useState(null);
    const initGenreChart = () => {
        const ctx = document.getElementById('genreChart');
        const datasets = [
            {
                label: userData.name,
                data: userData.ratings_count,
                backgroundColor: 'rgba(255, 100, 130, 0.7)',
                borderColor: 'rgba(255, 100, 130, 1)',
                hoverBackgroundColor: 'rgba(255, 70, 100, 0.7)',
                hoverBorderColor: 'rgba(255, 70, 100, 1)',
            },
            ...followersData.map((follower, i) => {
                return {
                    label: follower.name,
                    data: follower.ratings_count,
                    backgroundColor: getBackgroundColor(i, followersData.length),
                    borderColor: getBorderColor(i, followersData.length),
                    hoverBackgroundColor: getHoverBackgroundColor(i, followersData.length),
                    hoverBorderColor: getHoverBorderColor(i, followersData.length)
                }
            })
        ]
        const sortedData = datasets.sort((x, y) => (x.data - y.data))
        const labels = sortedData.map(x => x.label)
        const data = sortedData.map(x => x.data)
        const backgroundColor = sortedData.map(x => x.backgroundColor)
        const borderColor = sortedData.map(x => x.borderColor)
        const hoverBackgroundColor = sortedData.map(x => x.hoverBackgroundColor)
        const hoverBorderColor = sortedData.map(x => x.hoverBorderColor)


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
        if (followersData.length) {
            initGenreChart()
            // initRatingChart()
            // initCountryChart()
        }
    }, [followersData]);

    const chartSize = 1400;
    const chartWidth = 1200;
    const chartHeight = 700;

    const chartError = !(followersData && followersData.length > 0);
    return (
        <Section>
            <LongChartsStyles>
                <div className="chart">
                    <header><h2><StarIcon
                        style={{color: colors.yellow}}/>Rating Count</h2></header>
                    <div className="chart-container">
                        {chartError && <p className="chart-progress"><CircularProgress/>
                            <div>Loading...</div>
                        </p>}
                        <canvas id="genreChart" width={chartWidth} height={chartError ? 0 : chartHeight}/>
                    </div>
                </div>

            </LongChartsStyles>
        </Section>
    );
}

export default FollowersCharts
