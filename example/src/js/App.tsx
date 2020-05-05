import * as React from 'react';

import * as d3 from 'd3';
import { buildChart } from './buildChart';
import SvgContainer from './SvgContainer';
import { profile } from './benchmarkProfiler';
import CalculatorJS from './Calculator';
import CalculatorWasm from '../assembly/CalculatorWasm.asc';

export interface AppProps {}

const N_ITERATIONS = 100000;

export const App = (props: AppProps) => {
  const addJS = profile({
    fn: () => CalculatorJS.add(100, 200),
    nIterations: N_ITERATIONS,
  });
  const addWasm = profile({
    fn: () => CalculatorWasm.add(100, 200),
    nIterations: N_ITERATIONS,
  });

  return (
    <SvgContainer
      builderFn={(args) => buildChart({ ...args, data: [addJS, addWasm] })}
    />
  );
};
