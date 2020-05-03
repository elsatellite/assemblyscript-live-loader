import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import React = require('react');
import styled from '@emotion/styled';
import { Data } from './benchmarkProfiler';
import { SvgBuilderOptions } from './buildChart';

interface Dimensions {
  height: number;
  width: number;
}

const Container = styled('div')<Dimensions>({}, (props) => ({
  height: props.height,
  width: props.width,
}));

interface SvgContainerProps {
  builderFn(options: SvgBuilderOptions): string;
  data: Data;
  height: number;
  width: number;
}

const SvgContainer: React.FunctionComponent<SvgContainerProps> = ({
  builderFn,
  data,
  height,
  width,
}) => {
  const ref = useRef();

  useEffect(() => {
    builderFn({ data, height, ref, width } as SvgBuilderOptions);
  }, []);

  return (
    <Container height={height} width={width}>
      <svg ref={ref} />
    </Container>
  );
};

SvgContainer.propTypes = {};

export default SvgContainer;
