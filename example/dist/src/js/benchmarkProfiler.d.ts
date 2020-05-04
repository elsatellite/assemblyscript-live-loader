export interface Data {
}
export interface ProfileData {
    precision: number;
    times: number[];
}
export declare const getExecutionTime: (fn: () => any) => number;
export declare const profile: ({ fn, nIterations, precision }: {
    fn: any;
    nIterations: any;
    precision?: number;
}) => ProfileData;
