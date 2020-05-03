import * as React from 'react';

import { buildChart } from './buildChart';
import SvgContainer from './SvgContainer';
import { profile } from './benchmarkProfiler';
import Calculator from './Calculator';

export interface AppProps {}

export const App = (props: AppProps) => {
  const profileData = profile({ fn: Calculator.add, nIterations: 100000 });

  return (
    <SvgContainer
      builderFn={buildChart}
      data={profileData}
      height={500}
      width={700}
    />
  );
};
