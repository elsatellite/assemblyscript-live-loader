import * as d3 from 'd3';
import { ProfileData } from './benchmarkProfiler';

const margin = { bottom: 30, left: 50, right: 30, top: 20 };

export interface SvgBuilderOptions {
  height?: number;
  ref: any;
  width?: number;
}

interface ChartBuilderOptions extends SvgBuilderOptions {
  data: ProfileData[];
}

const getMaxX = (data: ProfileData[]) => {
  return Math.max(...data.map((datum) => datum.times.slice(-1)[0]));
};

const getMaxY = (data: ProfileData[]) => {
  return data[0].times.length;
};

const getLine = ({ profileData, x, y }) => {
  const { times } = profileData;

  const scaledData = times.map((time, i) => [x(time), y(i)]);
  const line = d3.line()(scaledData);

  return line;
};

export const buildChart = ({
  data,
  height,
  ref,
  width,
}: ChartBuilderOptions): string => {
  const { precision } = data[0];
  const maxX = getMaxX(data);
  const maxY = getMaxY(data);

  const x = d3
    .scaleLinear()
    .domain([0, maxX])
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, maxY + margin.top * 100])
    .range([height - margin.bottom, margin.top]);

  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat((x) => x * precision))
      .call((g) =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text('Number of operations')
      );

  const xAxis = (g) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((x) => (x % 2 == 0 ? `${x.toPrecision(2)} ms` : ''))
          .tickSizeOuter(0)
      )
      .call((g) =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 20)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
      );

  const lines = data.map((datum) => getLine({ profileData: datum, x, y }));

  const _buildChart = () => {
    const svg = d3.select(ref.current).attr('viewBox', [0, 0, width, height]);

    svg.append('g').call(yAxis);
    svg.append('g').call(xAxis);

    lines.forEach((line, i) => {
      svg
        .append('path')
        // .datum(times)
        .attr('fill', 'none')
        .attr('stroke', i % 2 === 0 ? '#edc111' : '#0269AC')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', line);
    });

    return svg.html();
  };

  return _buildChart();
};
