import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
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
  height: number;
  width: number;
}

const SvgContainer: React.FunctionComponent<SvgContainerProps> = ({
  builderFn,
  height,
  width,
}) => {
  const ref = useRef();

  useEffect(() => {
    builderFn({ height, ref, width } as SvgBuilderOptions);
  }, []);

  return (
    <Container height={height} width={width}>
      <svg ref={ref} />
    </Container>
  );
};

SvgContainer.propTypes = {};

export default SvgContainer;
