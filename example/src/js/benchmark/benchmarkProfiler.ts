export type ProfilePoint = { operations: number; time: number };
export type Profile = ProfilePoint[];

const PROFILING_REPETITIONS = 1;
const PROFILING_PRECISION = 1;
const PROFILING_SKIM_COEF = 70;

export const skimArray = <T>({ array, skimCoef }): T[] => {
  return array.filter((_, i) => i % skimCoef === 0);
};

export const getExecutionTime = (fn: () => any) => {
  const startTime = performance.now();
  fn();
  return startTime - performance.now();
};

export const computeBenchmarkProfile = ({ fn, nIterations }): Profile => {
  const times = [0];

  for (let k = 0; k < PROFILING_REPETITIONS; k++) {
    const startTime = performance.now();

    for (let i = 0; i < nIterations / PROFILING_PRECISION; i++) {
      for (let j = 0; j < PROFILING_PRECISION; j++) {
        fn();
      }
      times[i] = (k !== 0 ? times[i] : 0) + performance.now() - startTime;
    }
  }

  return skimArray<ProfilePoint>({
    array: times.map((t, i) => ({
      operations: i * PROFILING_PRECISION,
      time: t / PROFILING_REPETITIONS,
    })),
    skimCoef: PROFILING_SKIM_COEF,
  });
};
