import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SummoningBackground = ({ children }: { children?: React.ReactNode }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const counterRotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const saltRotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial scale-up animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Continuous rotation animations
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(counterRotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(saltRotateAnim, {
        toValue: 1,
        duration: 12000,
        useNativeDriver: true,
      })
    ).start();

    // Glow pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '405deg'],
  });

  const counterRotate = counterRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '-315deg'],
  });

  const saltRotate = saltRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '405deg'],
  });

  const scale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const glowIntensity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  // Generate floating dots positions
  const dotPositions = [
    { top: -100, left: 0, right: 0 }, // top
    { top: -70, right: -70 }, // top-right
    { right: -100, top: 0, bottom: 0 }, // right
    { right: -70, bottom: -70 }, // bottom-right
    { bottom: -100, left: 0, right: 0 }, // bottom
    { bottom: -70, left: -70 }, // bottom-left
    { left: -100, top: 0, bottom: 0 }, // left
    { top: -70, left: -70 }, // top-left
  ];

  return (
    <View style={styles.container}>
      {/* Space Background */}
      <LinearGradient
        colors={[
          'hsla(212, 85%, 32%, 0)',
          'hsla(212, 85%, 32%, 1)',
          'hsla(212, 85%, 32%, 0)',
          'hsla(212, 85%, 32%, 1)',
          'hsla(212, 85%, 32%, 0)',
        ]}
        style={styles.spaceGradient}
      >
        <Image
          source="https://wi-images.condecdn.net/image/B1NZW376pxM/crop/1620/f/space_11.jpg"
          style={styles.spaceBackground}
          contentFit="cover"
        />
      </LinearGradient>

      {/* Round Table */}
      <View style={styles.roundTable}>
        <Image
          source="https://66.media.tumblr.com/b80746a6fb3bf2ceaf0d5e5673524bfb/tumblr_px9fxgsOjX1uy4lhuo2_1280.png"
          style={styles.shieldImage}
          contentFit="contain"
        />

        {/* Summoning Circle Container */}
        <View style={styles.summoningCircle}>
          <Animated.View
            style={[
              styles.stressDots,
              {
                transform: [
                  { scale },
                  { rotate },
                  { translateZ: -50 },
                ],
              },
            ]}
          >
            {/* Main Circle Images */}
            <Animated.View
              style={[
                styles.circleImages,
                {
                  transform: [
                    { rotate: counterRotate },
                    { translateZ: -50 },
                  ],
                },
              ]}
            >
              <Image
                source="https://66.media.tumblr.com/776ec24c4f1a95936bf1e96e28433b76/tumblr_px9fxgsOjX1uy4lhuo1_1280.png"
                style={styles.summoningCircleImage}
                contentFit="cover"
              />
              <Image
                source="https://66.media.tumblr.com/062968387acd86baa72589bae5fdd9ea/tumblr_px9fxgsOjX1uy4lhuo3_1280.png"
                style={[styles.summoningCircleImage, styles.secondCircle]}
                contentFit="cover"
              />
            </Animated.View>

            {/* Floating Dots */}
            {dotPositions.map((position, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.floatingDot,
                  position,
                  {
                    shadowOpacity: glowIntensity,
                    opacity: glowIntensity,
                  },
                ]}
              />
            ))}
          </Animated.View>
        </View>
      </View>

      {/* Salt Burst Effect */}
      <Animated.View
        style={[
          styles.saltBurst,
          {
            transform: [{ rotate: saltRotate }],
          },
        ]}
      >
        <Image
          source="https://i.imgur.com/recX9HH.png"
          style={styles.saltBurstImage}
          contentFit="contain"
        />
      </Animated.View>

      {/* Content Layer */}
      <View style={styles.contentLayer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  spaceGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  spaceBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
  roundTable: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    width: Math.min(800, screenWidth),
    marginHorizontal: 'auto',
    alignSelf: 'center',
  },
  shieldImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400,
    width: '100%',
  },
  summoningCircle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 'auto',
    height: 500,
    width: 500,
    alignSelf: 'center',
    transform: [
      { perspective: 800 },
      { rotateX: '70deg' },
    ],
  },
  stressDots: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    marginHorizontal: 'auto',
    marginVertical: 'auto',
  },
  circleImages: {
    position: 'absolute',
    top: -100,
    bottom: -100,
    right: -100,
    left: -100,
  },
  summoningCircleImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
  secondCircle: {
    opacity: 0.6,
  },
  floatingDot: {
    height: 30,
    width: 30,
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: 'white',
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
  },
  saltBurst: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  saltBurstImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  contentLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});

export default SummoningBackground;
