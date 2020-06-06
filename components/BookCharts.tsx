import React, {useEffect, useState} from 'react';
import buildChart from '../libs/chart';
import ChartsStyles from './styles/ChartsStyles';
import {Section} from '../style';
import {CircularProgress} from "@material-ui/core";

const backgroundColor = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255,64,131,0.7)',
    'rgba(64,233,255,0.7)',
    'rgba(255,214,64,0.7)',
    'rgba(175,64,255,0.7)',
    'rgba(166,255,64,0.7)',
];
const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255,64,131,1)',
    'rgba(64,233,255,1)',
    'rgba(255,214,64,1)',
    'rgba(175,64,255,1)',
    'rgba(166,255,64,1)',
];

const BookCharts = ({contentsData}) => {

    const [genreChartData, setGenreChartData] = useState(null);
    const initGenreChart = () => {
        const ctx = document.getElementById('genreChart');
        const sample = contentsData
            .reduce((x, {content, user_content_action}) => {
                return x.concat(content.genres)
            }, [])
            .reduce((x, genre) => {
                if (x.hasOwnProperty(genre)) {
                    x[genre] += 1
                } else {
                    x[genre] = 1
                }
                return x
            }, {})
        const agg = Object.keys(sample)
            .map((key) => ({label: key, value: sample[key]}))
            .sort((x, y) => (y["value"] - x["value"]))
            .slice(0, 5)
        const labels = agg.map(repo => repo.label);
        const data = agg.map(repo => repo.value);


        if (data.length > 0) {
            const chartType = 'pie';
            const axes = false;
            const legend = true;
            const config = {ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend};
            buildChart(config);
        }
    };

    const [ratingChartData, setRatingChartData] = useState(null);
    const initRatingChart = () => {
        const ctx = document.getElementById('ratingChart');
        const mostStarredRepos = contentsData
            .sort((a, b) => b.user_content_action.rating - a.user_content_action.rating)
        const labels = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
        let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        mostStarredRepos.map(repo => data[repo.user_content_action.rating - 1] += 1);

        setRatingChartData(data);

        if (data.length > 0) {
            const chartType = 'bar';
            const axes = true;
            const legend = false;
            const config = {ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend};
            buildChart(config);
        }
    };

    const [countryChartData, setCountryChartData] = useState(null);
    const initCountryChart = () => {
        const ctx = document.getElementById('countryChart');
        const sample = contentsData
            .reduce((x, {content, user_content_action}) => {
                return x.concat(content.author_names)
            }, [])
            .reduce((x, author) => {
                if (x.hasOwnProperty(author)) {
                    x[author] += 1
                } else {
                    x[author] = 1
                }
                return x
            }, {})
        const agg = Object.keys(sample)
            .map((key) => ({label: key, value: sample[key]}))
            .sort((x, y) => (y["value"] - x["value"]))
            .slice(0, 10)
        const labels = agg.map(repo => repo.label);
        const data = agg.map(repo => repo.value);

        if (data.length > 0) {
            const chartType = 'doughnut';
            const axes = false;
            const legend = true;
            const config = {ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend};
            buildChart(config);
        }
    };


    useEffect(() => {
        if (contentsData.length) {
            initGenreChart()
            initRatingChart()
            initCountryChart()
        }
    }, [contentsData]);

    const chartSize = 300;
    const chartError = !(contentsData && contentsData.length > 0);
    return (
        <Section>
            <ChartsStyles>
                <div className="chart">
                    <header><h2>Genre</h2></header>
                    <div className="chart-container">
                        {chartError && <p className="chart-progress"><CircularProgress/>
                            <div>Loading...</div>
                        </p>}
                        <canvas id="genreChart" width={chartSize} height={chartError ? 0 : chartSize}/>
                    </div>
                </div>

                <div className="chart">
                    <header><h2>Rating</h2></header>
                    <div className="chart-container">
                        {chartError && <p className="chart-progress"><CircularProgress/>
                            <div>Loading...</div>
                        </p>}
                        <canvas id="ratingChart" width={chartSize} height={chartError ? 0 : chartSize}/>
                    </div>
                </div>

                <div className="chart">
                    <header><h2>Author</h2></header>
                    <div className="chart-container">
                        {chartError && <p className="chart-progress"><CircularProgress/>
                            <div>Loading...</div>
                        </p>}
                        <canvas id="countryChart" width={chartSize} height={chartError ? 0 : chartSize}/>
                    </div>
                </div>
            </ChartsStyles>
        </Section>
    );
}

export default BookCharts
