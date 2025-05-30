import Svg, { Path } from "react-native-svg";

interface Props {
  width?: number;
  height?: number;
}

const StarEmpty = ({ width, height }: Props) => {
  return (
    <Svg
      width={width || "40"}
      height={height || "40"}
      viewBox="0 0 40 40"
      fill="none"
    >
      <Path
        d="M14.7499 29.7083L19.9999 26.5417L25.2499 29.75L23.8749 23.75L28.4999 19.75L22.4166 19.2083L19.9999 13.5417L17.5833 19.1667L11.4999 19.7083L16.1249 23.75L14.7499 29.7083ZM9.70825 36.6667L12.4166 24.9583L3.33325 17.0833L15.3333 16.0417L19.9999 5L24.6666 16.0417L36.6666 17.0833L27.5833 24.9583L30.2916 36.6667L19.9999 30.4583L9.70825 36.6667Z"
        fill="#B292D8"
      />
    </Svg>
  );
};

export default StarEmpty;
