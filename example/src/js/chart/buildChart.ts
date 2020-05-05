import * as d3 from 'd3';
import { Profile, ProfilePoint } from '../benchmark/benchmarkProfiler';
import { getViewBoxAttr } from '../utils/d3Utils';
import { renderDotsOnMouse } from './chartBisect';
import { appendText } from './appendText';

export const margin = { bottom: 60, left: 70, right: 30, top: 100 };
export const padding = { top: 5000 };
export const width = 800;
export const height = 600;

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
      .call(d3.axisLeft(scaleY).ticks(12))
      .call((g) =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 3)
          .attr('y', -10)
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
            x % 2 == 0 ? `${x.toPrecision(4)} ms` : ''
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
    const svg = d3.select(ref.current).attr(
      'viewBox',
      getViewBoxAttr({
        height: height + margin.bottom + margin.top,
        minX: 0,
        minY: 0,
        width: width + margin.left + margin.right,
      })
    );

    svg
      .append('text')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 14)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'left')
      .attr('y', margin.top / 2)
      .attr('x', margin.left)
      .text('AssemblyScript compiled to WebAssembly VS JavaScript Benchmark');

    svg
      .append('circle')
      .attr('cx', margin.left)
      .attr('cy', height - margin.bottom / 4)
      .attr('r', 4)
      .style('fill', COLOR_JS);
    svg
      .append('circle')
      .attr('cx', margin.left)
      .attr('cy', height)
      .attr('r', 4)
      .style('fill', COLOR_WASM);

    svg.call(appendText, {
      text: 'JavaScript',
      x: margin.left + 10,
      y: height - margin.bottom / 4 + 4,
    });

    svg.call(appendText, {
      text: 'WebAssembly',
      x: margin.left + 10,
      y: height + 4,
    });

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

    svg.call(renderDotsOnMouse, { data, scaleX, scaleY });

    return svg.html();
  };

  return _buildChart();
};
