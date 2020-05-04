import { ProfileData } from './benchmarkProfiler';
export interface SvgBuilderOptions {
    height?: number;
    ref: any;
    width?: number;
}
interface ChartBuilderOptions extends SvgBuilderOptions {
    data: ProfileData[];
}
export declare const buildChart: ({ data, height, ref, width, }: ChartBuilderOptions) => string;
export {};
