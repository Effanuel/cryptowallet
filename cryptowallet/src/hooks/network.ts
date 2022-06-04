import React from 'react';
import {AppContext, useAppContext} from '../context/context';

interface Options<P> {
  params?: P;
}

export type NetworkHook<T, P> = (options?: Options<P>) => Executor<T, P>;
type Executor<T, P> = [Status<T>, (params: P) => void];

type Success<T> = {type: 'success'; result: T};
type Error<T = string> = {type: 'error'; message: T};
type Loading = {type: 'loading'};
type Refetching<T> = {type: 'refetch'; result: T};
type Status<T> = Success<T> | Loading | Error | Refetching<T>;

interface State<T, P> {
  params: P;
  status: Status<T>;
}

type Configurator<T, P> = (context: AppContext) => {
  execute: (params: P | undefined) => Promise<T>;
};

export function useNetworkExecutor<T, P>({params}: Options<P>, configurator: Configurator<T, P>): Executor<T, P> {
  const appContext = useAppContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const {execute} = React.useMemo(() => configurator(appContext), [appContext]);

  const [state, setState] = React.useState((): State<T, P> => {
    return {
      params: params as P,
      status: {type: 'loading'},
    };
  });

  const retrigger = React.useCallback(
    (params: P) =>
      setState((prevState) => ({
        params,
        status: {
          type: 'refetch',
          result: prevState.status.type === 'success' ? prevState.status.result : (undefined as any),
        },
      })),
    [],
  );

  const shouldFetch = state.status.type === 'loading' || state.status.type === 'refetch';

  React.useEffect(() => {
    let shouldContinueFetch = shouldFetch;

    const triggerDataLoad = async () => {
      try {
        const data = await execute(params);
        setState((prevState) => ({...prevState, status: {type: 'success' as const, result: data}}));
      } catch (err) {
        setState((prevState) => ({...prevState, status: {type: 'error', message: 'Error'}}));
      }
    };

    if (shouldContinueFetch) {
      triggerDataLoad();
    }

    return () => void (shouldContinueFetch = false);
  }, [params, shouldFetch, execute]);

  return [state.status, retrigger];
}
