export const appendText = (svg, { id, y }) => {
  return svg
    .append('text')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'left')
    .attr('y', y)
    .attr('id', id);
};
