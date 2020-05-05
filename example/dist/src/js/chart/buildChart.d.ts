import { Profile } from '../benchmark/benchmarkProfiler';
export declare const margin: {
    bottom: number;
    left: number;
    right: number;
    top: number;
};
export declare const padding: {
    top: number;
};
export declare const width = 800;
export declare const height = 500;
export declare const COLOR_JS = "#edc111";
export declare const COLOR_WASM = "#0269AC";
export interface SvgBuilderOptions {
    height?: number;
    ref: any;
    width?: number;
}
interface ChartBuilderOptions extends SvgBuilderOptions {
    data: Profile[];
}
export declare const buildChart: ({ data, ref }: ChartBuilderOptions) => string;
export {};
