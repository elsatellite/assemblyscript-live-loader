import * as d3 from 'd3';
import { Profile, ProfilePoint } from './benchmarkProfiler';
import { getViewBoxAtrr as getViewBoxAttr } from './d3Utils';
import { renderDotsOnMouse } from './chartBisect';

export const margin = { bottom: 30, left: 50, right: 30, top: 20 };
export const padding = { top: 200 };
export const width = 800;
export const height = 500;

export const COLOR_JS = '#edc111';
export const COLOR_WASM = '#0269AC';

export interface SvgBuilderOptions {
  height?: number;
  ref: any;
  width?: number;
}

interface ChartBuilderOptions extends SvgBuilderOptions {
  data: Profile[];
}

const getMaxTime = (profiles: Profile[]) => {
  return Math.max(...profiles.map((profile) => profile.slice(-1)[0].time));
};

const getMaxOperations = (profiles: Profile[]) => {
  return Math.max(
    ...profiles.map((profile) => profile.slice(-1)[0].operations)
  );
};

export const buildChart = ({ data, ref }: ChartBuilderOptions): string => {
  const maxX = getMaxTime(data);
  const maxY = getMaxOperations(data);

  const scaleX = d3
    .scaleLinear()
    .domain([0, maxX])
    .range([margin.left, width - margin.right]);

  const scaleY = d3
    .scaleLinear()
    .domain([0, maxY + padding.top])
    .range([height - margin.bottom, margin.top]);

  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(scaleY).ticks(10))
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
          .axisBottom(scaleX)
          .tickFormat((x: number) =>
            x % 2 == 0 ? `${x.toPrecision(2)} ms` : ''
          )
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

  const lines = data.map((profile) =>
    d3
      .line<ProfilePoint>()
      .x((d) => {
        return scaleX(d.time);
      })
      .y((d) => scaleY(d.operations))(profile)
  );

  const _buildChart = () => {
    const svg = d3
      .select(ref.current)
      .attr('viewBox', getViewBoxAttr({ minY: 0, minX: 0, width, height }));

    svg.append('g').call(yAxis);
    svg.append('g').call(xAxis);

    lines.forEach((line, i) => {
      svg
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', i % 2 === 0 ? COLOR_JS : COLOR_WASM)
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', line);
    });

    svg.call(renderDotsOnMouse, { scaleX, scaleY, data });

    return svg.html();
  };

  return _buildChart();
};
