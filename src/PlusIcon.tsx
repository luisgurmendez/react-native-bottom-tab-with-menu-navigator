import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface Size {
  size: number;
}

const PlusSvg: React.FC<SvgProps & Size> = ({size, ...rest}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}>
      <Path d="M12 5v14M5 12h14" />
    </Svg>
  );
};

export default PlusSvg;
