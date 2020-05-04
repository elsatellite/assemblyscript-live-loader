import React from 'react';
import { SvgBuilderOptions } from './buildChart';
interface SvgContainerProps {
    builderFn(options: SvgBuilderOptions): string;
    height: number;
    width: number;
}
declare const SvgContainer: React.FunctionComponent<SvgContainerProps>;
export default SvgContainer;
