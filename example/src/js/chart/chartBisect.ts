import * as d3 from 'd3';
import { Profile, ProfilePoint } from '../benchmark/benchmarkProfiler';
import { height, margin } from './buildChart';

export const renderDotsOnMouse = (
  svg,
  {
    scaleX,
    scaleY,
    data,
  }: {
    scaleX;
    scaleY;
    data: Profile[];
  }
) => {
  const bisect = d3.bisector((d: ProfilePoint) => d.time);

  const dot = svg.append('g');

  dot.append('circle').attr('r', 2.5);

  dot
    .append('text')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'left')
    .attr('y', -20)
    .attr('id', 'time');

  dot
    .append('text')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'left')
    .attr('y', -8)
    .attr('id', 'ops');

  svg
    .append('path')
    .attr('stroke', 'black')
    .attr('id', 'vertical-line')
    .attr('fill', 'none');

  function update(time) {
    const i_array = data.map((datum) => bisect.right(datum, time));

    const i = i_array[0];
    if (i < data[0].length) {
      dot.attr(
        'transform',
        `translate(${scaleX(data[0][i].time)}, ${scaleY(i)})`
      );
      dot.select('#time').text(`${data[0][i].time.toPrecision(3)}ms`);
      dot.select('#ops').text(`${i * 10} operations`);
      // marker.attr("cx", x(data[i].date)).attr("cy", y(data[i].close));
    }

    // i_array.map((i) => {
    //   if (i < data[0].times.length) {
    //     dot.attr('transform', `translate(${y.invert(i)}, ${x(data[0].times[i])})`);
    //     dot.select('text').text(i * 10);
    //     // marker.attr("cx", x(data[i].date)).attr("cy", y(data[i].close));
    //   }
    // });

    // mutable lookup = new Date(date);
    // bar.attr("x1", x(mutable lookup)).attr("x2", x(mutable lookup));
  }

  svg.on('mousemove click touchmove', function () {
    const [mouseX, mouseY] = d3.mouse(this);
    update(scaleX.invert(mouseX));
    svg
      .select('#vertical-line')
      .attr(
        'd',
        `M${mouseX},${height - margin.bottom},${mouseX},${margin.top}`
      );
  });

  // update(mutable lookup);
};
