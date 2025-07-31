import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as FileSystem from 'expo-file-system';

interface GLBViewerProps {
  modelUrl: string;
  style?: any;
}

export default function GLBViewer({ modelUrl, style }: GLBViewerProps) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Add lighting for game-like appearance
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(5, 10, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x0099ff, 0.3);
    fillLight.position.set(-5, 0, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff4400, 0.4);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Load GLB model
    try {
      const loader = new GLTFLoader();
      
      // Download the GLB file locally first
      const fileUri = FileSystem.documentDirectory + 'model.glb';
      const { uri } = await FileSystem.downloadAsync(modelUrl, fileUri);
      
      loader.load(uri, (gltf) => {
        const model = gltf.scene;
        
        // Scale and position the model for optimal viewing
        model.scale.set(2, 2, 2);
        model.position.set(0, -2, 0);

        // Set initial rotation for better angle
        model.rotation.y = Math.PI * 0.15;
        model.rotation.x = -0.1;
        
        scene.add(model);
        
        // Animation loop
        const animate = () => {
          timeoutRef.current = setTimeout(animate, 1000 / 60);
          
          // Gentle floating animation
          const time = Date.now() * 0.001;
          model.rotation.y += 0.003;
          model.position.y = -2 + Math.sin(time * 0.5) * 0.1;
          
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        
        animate();
      }, (progress) => {
        // Loading progress
        console.log('Loading progress:', progress);
      }, (error) => {
        console.warn('Error loading GLB model:', error);
        // Fallback - just render the scene without model
        const animate = () => {
          timeoutRef.current = setTimeout(animate, 1000 / 60);
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        animate();
      });
    } catch (error) {
      console.warn('Error downloading GLB model:', error);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
});
