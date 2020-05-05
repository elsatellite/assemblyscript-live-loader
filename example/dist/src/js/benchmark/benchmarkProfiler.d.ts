export declare type ProfilePoint = {
    operations: number;
    time: number;
};
export declare type Profile = ProfilePoint[];
export declare const skimArray: <T>({ array, skimCoef }: {
    array: any;
    skimCoef: any;
}) => T[];
export declare const getExecutionTime: (fn: () => any) => number;
export declare const computeBenchmarkProfile: ({ fn, nIterations }: {
    fn: any;
    nIterations: any;
}) => Profile;
