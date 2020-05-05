import * as React from 'react';

import { buildChart } from './chart/buildChart';
import SvgContainer from './SvgContainer';
import { computeBenchmarkProfile } from './benchmark/benchmarkProfiler';
import CalculatorJS from './Calculator';
import CalculatorWasm from '../assembly/CalculatorWasm.asc';

export interface AppProps {}

const N_OPERATIONS = Math.pow(10, 6);

export const App = (props: AppProps) => {
  const addJS = computeBenchmarkProfile({
    fn: () => CalculatorJS.add(100, 200),
    nIterations: N_OPERATIONS,
  });
  const addWasm = computeBenchmarkProfile({
    fn: () => CalculatorWasm.add(100, 200),
    nIterations: N_OPERATIONS,
  });

  return (
    <SvgContainer
      builderFn={(args) => buildChart({ ...args, data: [addJS, addWasm] })}
    />
  );
};
