import React, {useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import Backdrop from './Backdrop';
import MenuRadialPositioner from './MenuRadialPositioner';
import Portal from './Portal/Portal';
import PlusButton from './PlusButton';

export default function MenuPlaceholderScreen() {
  return null;
}

export interface MenuButtonProps {
  active?: boolean;
  onPress?: () => void;
}

export interface MenuItemsPositionerProps {
  show?: boolean;
}

export interface ItemProps {
  item: string;
  onCloseMenu: () => void;
}

export interface Elipsis {
  a: number;
  b: number;
}

interface MenuOptionsConfig {
  menuButtonStyle?: StyleProp<ViewStyle>;
  menuContainerStyle?: StyleProp<ViewStyle>;
  menuItemsDistance?: number;
  menuItemsDistanceElipsis?: Elipsis;
  menuButtonAnimationDisabled?: boolean;
  MenuButton?: React.ComponentType<MenuButtonProps>;
  MenuItemsPositioner?: React.ComponentType<MenuItemsPositionerProps>;
  onMenuButtonPress?: () => void;
  showMenu?: boolean;
  backdrop?: boolean;
  backdropOpacity?: number;
  menu: string[];
  RenderMenuItem: React.ComponentType<ItemProps>;
}

export const MenuOptions = (
  options: MenuOptionsConfig,
): BottomTabNavigationOptions => ({
  tabBarLabel: '',
  tabBarIcon: ({focused, size, color}) => null,
  tabBarBadge: undefined, // TODO como hacer esto??
  tabBarButton: () => <Menu {...options} />,
});

export interface MenuProps extends MenuOptionsConfig {}

const Menu: React.FC<MenuProps> = ({
  MenuButton,
  MenuItemsPositioner,
  showMenu,
  menu,
  RenderMenuItem,
  menuButtonStyle,
  menuContainerStyle,
  onMenuButtonPress,
  menuItemsDistance = 100,
  menuItemsDistanceElipsis,
  menuButtonAnimationDisabled = false,
  backdrop = true,
  backdropOpacity = 0.3,
}) => {
  const [showMenuInner, setShowMenuInner] = useState(false);
  const _showMenu = showMenu !== undefined ? showMenu : showMenuInner;

  const handleMenuButtonPress = () => {
    setShowMenuInner((s) => !s);
    onMenuButtonPress && onMenuButtonPress();
  };

  const _menuButton =
    MenuButton === undefined ? (
      <PlusButton
        active={_showMenu}
        animationDisabled={menuButtonAnimationDisabled}
        onPress={handleMenuButtonPress}
        style={menuButtonStyle}
      />
    ) : (
      <MenuButton active={_showMenu} onPress={handleMenuButtonPress} />
    );

  const _menuItems =
    MenuItemsPositioner === undefined ? (
      <MenuRadialPositioner
        show={_showMenu}
        elipsis={menuItemsDistanceElipsis}
        radius={menuItemsDistance}>
        {menu.map((m) => (
          <RenderMenuItem
            key={m}
            item={m}
            onCloseMenu={() => setShowMenuInner(false)}
          />
        ))}
      </MenuRadialPositioner>
    ) : (
      <MenuItemsPositioner show={_showMenu}>
        {menu.map((m) => (
          <RenderMenuItem
            key={m}
            item={m}
            onCloseMenu={() => setShowMenuInner(false)}
          />
        ))}
      </MenuItemsPositioner>
    );

  return (
    <MenuContainer style={menuContainerStyle}>
      <Portal>
        {_menuButton}
        {_menuItems}
        {backdrop && (
          <Backdrop
            show={_showMenu}
            opacity={backdropOpacity}
            onClose={() => setShowMenuInner(false)}
          />
        )}
      </Portal>
    </MenuContainer>
  );
};

const MenuContainer = styled.View`
  position: relative;
  flex: 1;
  justify-content: center;
  flex-direction: row;
`;
