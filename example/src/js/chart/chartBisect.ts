import * as d3 from 'd3';
import { Profile, ProfilePoint } from '../benchmark/benchmarkProfiler';
import { height, margin } from './buildChart';
import { appendText } from './appendText';

export const renderDotsOnMouse = (
  svg,
  {
    data,
    scaleX,
    scaleY,
  }: {
    data: Profile[];
    scaleX;
    scaleY;
  }
) => {
  const bisect = d3.bisector((d: ProfilePoint) => d.time);

  const dot = svg.append('g');

  dot.append('circle').attr('r', 2.5).attr('fill', '#5b727d');

  dot.call(appendText, { id: 'time', x: 6, y: 28 });
  dot.call(appendText, { id: 'ops', x: 6, y: 16 });

  const verticalLine = svg
    .append('path')
    .attr('stroke', '#5b727d')
    .attr('id', 'vertical-line')
    .attr('fill', 'none')
    .style('stroke-dasharray', '3, 3');

  function update(time) {
    const i_array = data.map((datum) => bisect.right(datum, time));

    const i = i_array[0];
    if (i < data[0].length) {
      dot.attr(
        'transform',
        `translate(${scaleX(data[0][i].time)}, ${scaleY(
          data[0][i].operations
        )})`
      );
      d3.select('#time').text(`${data[0][i].time.toPrecision(3)}ms`);
      d3.select('#ops').text(`${data[0][i].operations} operations`);
    }
  }

  let elapsed;
  let previous;

  svg.on('mousemove click touchmove', function () {
    d3.event.preventDefault();
    elapsed = performance.now() - previous;
    if (elapsed < 30) return;

    const [mouseX] = d3.mouse(this);
    // const mouseX = d3.event.pageX - 1;
    update(scaleX.invert(mouseX));
    verticalLine.attr(
      'd',
      `M${mouseX},${height - margin.bottom},${mouseX},${margin.top}`
    );

    previous = performance.now();
  });
};
