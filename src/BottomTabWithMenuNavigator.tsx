import * as React from 'react';
import {
  useNavigationBuilder,
  TabRouter,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  TabRouterOptions,
} from '@react-navigation/native';
import {
  BottomTabView,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BottomTabNavigationConfig,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import PortalHost from './Portal/PortalHost';
import MenuPlaceholderScreen, {MenuOptions, MenuProps} from './Menu';

export interface TabMenuNavigationProps {
  menuOptions: MenuProps;
}

// The props accepted by the component is a combination of 3 things
export type TabMenuNavigatorProps = DefaultNavigatorOptions<
  BottomTabNavigationOptions
> &
  TabRouterOptions &
  BottomTabNavigationConfig &
  TabMenuNavigationProps;

const TabNavigator = createBottomTabNavigator();

const TabMenuNavigator: React.FC<TabMenuNavigatorProps> = ({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  menuOptions,
  ...rest
}) => {
  if (React.Children.count(children) % 2 !== 0) {
    console.warn(
      'This navigatior works better if you have a pair number of tabs.',
    );
  }

  const childrenWithMenuScreen: any = React.Children.toArray(children);
  childrenWithMenuScreen.splice(
    childrenWithMenuScreen.length / 2,
    0,
    <TabNavigator.Screen
      name="Menu"
      options={MenuOptions(menuOptions)}
      component={MenuPlaceholderScreen}
    />,
  );

  const {state, descriptors, navigation} = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children: childrenWithMenuScreen,
    screenOptions,
  });

  return (
    <PortalHost>
      <BottomTabView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </PortalHost>
  );
};

const createBottomTabWithMenuNavigator = createNavigatorFactory(
  TabMenuNavigator,
);

export default createBottomTabWithMenuNavigator;
