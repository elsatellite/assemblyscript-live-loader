export type ProfilePoint = { operations: number; time: number };
export type Profile = ProfilePoint[];

const PROFILING_REPETITIONS = 1;
const PROFILING_PRECISION = 10;

export const getExecutionTime = (fn: () => any) => {
  const startTime = performance.now();
  fn();
  return startTime - performance.now();
};

export const profile = ({ fn, nIterations }): Profile => {
  const times = [0];

  for (let k = 0; k < PROFILING_REPETITIONS; k++) {
    const startTime = performance.now();

    for (let i = 0; i < nIterations / PROFILING_PRECISION; i += 1) {
      for (let j = 0; j < PROFILING_PRECISION; j++) {
        fn();
      }
      times[i] = (k !== 0 ? times[i] : 0) + performance.now() - startTime;
    }
  }

  return times.map((t, i) => ({
    time: t / PROFILING_REPETITIONS,
    operations: i * PROFILING_PRECISION,
  }));
};
