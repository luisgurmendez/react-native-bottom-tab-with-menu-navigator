import * as React from 'react';
import PortalConsumer from './PortalConsumer';
import PortalHost, {PortalContext, PortalMethods} from './PortalHost';

/**
 * Portal allows to render a component at a different place in the parent tree.
 * You can use it to render content which should appear above other elements, similar to `Modal`.
 * It requires a [`Portal.Host`](portal-host.html) component to be rendered somewhere in the parent tree.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Portal, Text } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Portal>
 *     <Text>This is rendered at a different place</Text>
 *   </Portal>
 * );
 *
 * export default MyComponent;
 * ```
 */
class Portal extends React.Component {
  // @component ./PortalHost.tsx
  static Host = PortalHost;

  render() {
    const {children} = this.props;

    return (
      <PortalContext.Consumer>
        {(manager) => (
          <PortalConsumer manager={manager as PortalMethods}>
            {children}
          </PortalConsumer>
        )}
      </PortalContext.Consumer>
    );
  }
}

export default Portal;
