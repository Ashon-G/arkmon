import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SimpleSummoningBackground = ({ children }: { children?: React.ReactNode }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim2 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotation animations
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim2, {
        toValue: 1,
        duration: 12000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotate2 = rotateAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  return (
    <View style={styles.container}>
      {/* Space Background */}
      <LinearGradient
        colors={[
          '#0a0a15',
          '#1a1a30',
          '#0a0a15',
          '#1a1a30',
          '#0a0a15',
        ]}
        style={styles.spaceGradient}
      />

      {/* Floating particles */}
      <View style={styles.particlesContainer}>
        {[...Array(20)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.particle,
              {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              },
            ]}
          />
        ))}
      </View>

      {/* Main summoning circle */}
      <View style={styles.summoningArea}>
        {/* Outer rotating circle */}
        <Animated.View
          style={[
            styles.outerCircle,
            {
              transform: [{ rotate }],
              opacity: pulseOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={['transparent', '#00ffcc', 'transparent', '#00ffcc', 'transparent']}
            style={styles.circleGradient}
          />
        </Animated.View>

        {/* Inner rotating circle */}
        <Animated.View
          style={[
            styles.innerCircle,
            {
              transform: [{ rotate: rotate2 }],
              opacity: pulseOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={['transparent', '#ff4400', 'transparent', '#ff4400', 'transparent']}
            style={styles.circleGradient}
          />
        </Animated.View>

        {/* Center glow */}
        <Animated.View
          style={[
            styles.centerGlow,
            {
              opacity: pulseOpacity,
              transform: [{ scale: pulseScale }],
            },
          ]}
        >
          <LinearGradient
            colors={['#00ffcc', 'transparent']}
            style={styles.glowGradient}
          />
        </Animated.View>

        {/* Magical dots around the circle */}
        {[...Array(8)].map((_, index) => {
          const angle = (index * 45) * (Math.PI / 180);
          const radius = 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.magicalDot,
                {
                  left: '50%',
                  top: '50%',
                  marginLeft: x - 10,
                  marginTop: y - 10,
                  opacity: pulseOpacity,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Content layer */}
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
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#00ffcc',
    borderRadius: 1,
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.8,
  },
  summoningArea: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 400,
    height: 400,
    marginLeft: -200,
    marginTop: -200,
  },
  outerCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: '#00ffcc',
  },
  innerCircle: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: '#ff4400',
  },
  circleGradient: {
    flex: 1,
    borderRadius: 200,
  },
  centerGlow: {
    position: 'absolute',
    top: 150,
    left: 150,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  glowGradient: {
    flex: 1,
    borderRadius: 50,
  },
  magicalDot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 1,
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

export default SimpleSummoningBackground;
