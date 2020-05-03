export interface Data {}

export interface ProfileData {
  precision: number;
  times: number[];
}

const PROFILING_REPETITIONS = 30;

export const profile = ({ fn, nIterations, precision = 10 }): ProfileData => {
  const times = [0];

  for (let k = 0; k < PROFILING_REPETITIONS; k++) {
    const startTime = performance.now();
    for (let i = 0; i < nIterations / precision; i += 1) {
      for (let j = 0; j < precision; j++) {
        fn();
      }
      times[i] = (k !== 0 ? times[i] : 0) + performance.now() - startTime;
    }
  }

  return { precision, times: times.map((t) => t / PROFILING_REPETITIONS) };
};
