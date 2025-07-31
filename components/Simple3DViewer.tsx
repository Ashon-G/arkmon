import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';

interface Simple3DViewerProps {
  style?: any;
}

export default function Simple3DViewer({ style }: Simple3DViewerProps) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onContextCreate = async (gl: any) => {
    try {
      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

      // Create renderer
      const renderer = new Renderer({ gl });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);

      // Create scene
      const scene = new THREE.Scene();

      // Create camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(0, 0, 5);

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      scene.add(directionalLight);

      // Create a simple creature-like geometry as placeholder
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshLambertMaterial({ 
        color: 0x00ff88,
        emissive: 0x002200 
      });
      const creature = new THREE.Mesh(geometry, material);
      creature.position.set(0, 0, 0);
      scene.add(creature);

      // Add some decorative elements
      const hornGeometry = new THREE.ConeGeometry(0.2, 1, 8);
      const hornMaterial = new THREE.MeshLambertMaterial({ color: 0xff4400 });
      
      const horn1 = new THREE.Mesh(hornGeometry, hornMaterial);
      horn1.position.set(-0.5, 1, 0.5);
      horn1.rotation.z = 0.3;
      scene.add(horn1);
      
      const horn2 = new THREE.Mesh(hornGeometry, hornMaterial);
      horn2.position.set(0.5, 1, 0.5);
      horn2.rotation.z = -0.3;
      scene.add(horn2);

      // Animation loop
      const animate = () => {
        timeoutRef.current = setTimeout(animate, 1000 / 60);
        
        const time = Date.now() * 0.001;
        
        // Rotate the creature
        creature.rotation.y += 0.01;
        creature.position.y = Math.sin(time) * 0.2;
        
        // Animate horns
        horn1.rotation.y = Math.sin(time * 2) * 0.3;
        horn2.rotation.y = -Math.sin(time * 2) * 0.3;
        
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      
      animate();
    } catch (error) {
      console.warn('Error in Simple3DViewer:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={[styles.container, style]}>
      <GLView
        style={styles.glView}
        onContextCreate={onContextCreate}
      />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>3D Creature</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  glView: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  overlayText: {
    color: '#E8DD9F',
    fontSize: 12,
    fontWeight: '500',
  },
});
