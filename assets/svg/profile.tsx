import * as React from "react";
import Svg, { ClipPath, Defs, Ellipse, Path, Rect, G } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}
const Profile = ({ width, height, fill }: Props) => {
  return (
    <Svg
      width={width || "40"}
      height={height || "40"}
      viewBox="0 0 40 40"
      fill="none"
    >
      <G clip-path="url(#clip0_456_262)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M33.1251 36H6.87635C5.46357 36 4.4203 34.6059 4.95316 33.3239C7.42553 27.3959 13.2339 24 19.9997 24C26.7676 24 32.5759 27.3959 35.0483 33.3239C35.5811 34.6059 34.5379 36 33.1251 36ZM11.8333 12C11.8333 7.58797 15.498 3.99997 19.9997 3.99997C24.5035 3.99997 28.1661 7.58797 28.1661 12C28.1661 16.412 24.5035 20 19.9997 20C15.498 20 11.8333 16.412 11.8333 12ZM39.9113 35.2719C38.4271 28.5539 33.7845 23.5959 27.674 21.3459C30.912 18.7919 32.8005 14.6619 32.1063 10.1399C31.302 4.89386 26.8472 0.695954 21.4697 0.0839537C14.0464 -0.762046 7.75014 4.89797 7.75014 12C7.75014 15.78 9.53858 19.1479 12.3274 21.3459C6.21487 23.5959 1.57433 28.5539 0.088048 35.2719C-0.450932 37.7139 1.558 40 4.10794 40H35.8914C38.4434 40 40.4524 37.7139 39.9113 35.2719Z"
          fill={fill || "black"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_456_262">
          <Rect width="40" height="40" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Profile;
