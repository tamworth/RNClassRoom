import React, {FC, useMemo, Suspense} from 'react';
import {Text, View} from 'react-native';
import {fetchComponent} from './utils';

const DynamicComponent: FC<{__id: string; children: any}> = ({
  __id,
  children,
  ...props
}) => {
  const Component = useMemo(() => {
    return React.lazy(async () => fetchComponent(__id));
  }, [__id]);

  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading...</Text>
        </View>
      }>
      <Component {...props}>{children}</Component>
    </Suspense>
  );
};

export default React.memo(DynamicComponent);
