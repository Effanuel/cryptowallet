import React from 'react';
import {useAppDispatch} from '../redux/configureStore';
import {Action, AppState} from '../redux/modules/state';
import {AppContext, useAppContext} from '../screens/context';

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
  save: (data: T, params: P | undefined) => Action;
};

export function useNetworkExecutor<T, P>({params}: Options<P>, configurator: Configurator<T, P>): Status<T> {
  const dispatch = useAppDispatch();
  const appContext = useAppContext();

  const {execute, save} = React.useMemo(() => configurator(appContext), [appContext]);

  const [state, setState] = React.useState((): State<T> => {
    return {
      status: {type: 'loading'},
    };
  });

  React.useEffect(() => {
    let isMounted = true;

    const triggerDataLoad = async () => {
      await execute(params)
        .then((data) => {
          console.log('TRIGGER');
          setState((prevState) => ({...prevState, status: {type: 'success' as const, result: data}}));
          dispatch(save(data, params));
        })
        .catch(() => {
          setState((prevState) => ({...prevState, status: {type: 'error', message: 'Error'}}));
        });
    };

    if (isMounted) {
      triggerDataLoad();
    }

    return () => void (isMounted = false);
  }, [params, execute]);

  return state.status;
}
