import React from 'react';
import {AppContext, useAppContext} from '../context/context';

interface Options<P> {
  params?: P;
}

export type NetworkHook<T, P> = (options?: Options<P>) => Status<T>;

type Success<T> = {type: 'success'; result: T};
type Error<T = string> = {type: 'error'; message: T};
type Loading = {type: 'loading'};
type Status<T> = Success<T> | Loading | Error;

interface State<T> {
  status: Status<T>;
}

type Configurator<T, P> = (context: AppContext) => {
  execute: (params: P | undefined) => Promise<T>;
};

export function useNetworkExecutor<T, P>({params}: Options<P>, configurator: Configurator<T, P>): Status<T> {
  const appContext = useAppContext();

  const {execute} = React.useMemo(() => configurator(appContext), [appContext]);

  const [state, setState] = React.useState((): State<T> => {
    return {
      status: {type: 'loading'},
    };
  });

  React.useEffect(() => {
    let isMounted = true;

    const triggerDataLoad = async () => {
      try {
        const data = await execute(params);
        setState((prevState) => ({...prevState, status: {type: 'success' as const, result: data}}));
      } catch (err) {
        setState((prevState) => ({...prevState, status: {type: 'error', message: 'Error'}}));
      }
    };

    if (isMounted) {
      triggerDataLoad();
    }

    return () => void (isMounted = false);
  }, [params, execute]);

  return state.status;
}
