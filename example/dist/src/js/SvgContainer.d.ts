import React from 'react';
import { SvgBuilderOptions } from './chart/buildChart';
interface SvgContainerProps {
    builderFn(options: SvgBuilderOptions): string;
}
declare const SvgContainer: React.FunctionComponent<SvgContainerProps>;
export default SvgContainer;
