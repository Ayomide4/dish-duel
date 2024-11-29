import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Card from "./card";
import Carousel from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";
import { PanGesture } from "react-native-gesture-handler";

interface Props {
  dishes: Dish[];
  autoplay?: boolean;
  loop?: boolean;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  onSnapToItem?: () => void;
}

/**
 * A component that displays a horizontal carousel of dish cards with a stack slide effect.
 * 
 * @component
 * 
 * @param {Object} props - The component props
 * @param {Dish[]} props.dishes - Array of dish objects to display in the carousel
 * @param {boolean} [props.autoplay=false] - Whether the carousel should auto-play
 * @param {boolean} [props.loop=true] - Whether the carousel should loop back to the beginning
 * @param {Function} [props.onScrollStart] - Callback function triggered when scrolling starts
 * @param {Function} [props.onScrollEnd] - Callback function triggered when scrolling ends
 * @param {Function} [props.onSnapToItem] - Callback function triggered when carousel snaps to an item
 * 
 * @returns {JSX.Element} A carousel component displaying dish cards with a stack slide animation effect
 * 
 * @example
 * <CardScrollView
 *   dishes={dishesArray}
 *   autoplay={true}
 *   loop={true}
 *   onScrollStart={() => console.log('Scroll started')}
 *   onScrollEnd={() => console.log('Scroll ended')}
 *   onSnapToItem={(index) => console.log('Snapped to index', index)}
 * />
 */
export default function CardScrollView({
  dishes,
  autoplay = false,
  loop = true,
  onScrollStart,
  onScrollEnd,
  onSnapToItem
}: Props): JSX.Element {
  const width = Dimensions.get("window").width;

  /**
   * Generates animation styles for a stack slide effect.
   *
   * @param value - The animation progress value. Expected range is typically between -1 and 8.
   * @returns An object containing transform properties (translateX and scale), zIndex, and opacity
   *          for animating stack-like sliding behavior.
   *
   * Transform values are interpolated as follows:
   * - translateX: [-30% screen width, 0, 30% screen width] for values [-1, 0, 5]
   * - scale: [1, 1, 0.95] for values [-1, 0, 1]
   * - opacity: [0, 1, 0.1] for values [-1, 0, 8]
   * - zIndex: [10, 20, 30] for values [-1, 0, -1]
   */
  const stackSlideAnimation = (value: number) => {
    "worklet";
    const translateX = interpolate(
      value,
      [-1, 0, 5],
      [-width * 0.3, 10, width * 0.3]
    );
    const scale = interpolate(value, [-1, 0, 1], [1, 1, 0.95]);
    const opacity = interpolate(value, [-1, 0, 8], [0, 1, 0.1]);
    const zIndex = Math.round(interpolate(value, [-1, 0, -1], [10, 20, 30]));

    return {
      transform: [{ translateX }, { scale }],
      zIndex,
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      <Carousel
        autoPlayInterval={2000}
        autoPlay={autoplay}
        data={dishes}
        height={600}
        loop={loop}
        snapEnabled={false}
        width={width}
        mode={"horizontal-stack"}
        modeConfig={{
          snapDirection: "left",
        }}
        onConfigurePanGesture={(panGesture: PanGesture) => {
          panGesture.activeOffsetX([-20, 20]);
        }}
        renderItem={({ item }) => <Card dish={item} />}
        customAnimation={stackSlideAnimation}
        onScrollStart={onScrollStart}
        onScrollEnd={onScrollEnd}
        onSnapToItem={onSnapToItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
