export const appendText = (svg, { id, x, y }) => {
  return svg
    .append('text')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .attr('text-anchor', 'left')
    .attr('y', y)
    .attr('x', x)
    .attr('id', id);
};
