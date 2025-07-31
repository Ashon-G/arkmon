import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight } from 'expo-three';
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
    const scene = new Scene();

    // Create camera
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Add lighting
    const ambientLight = new AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Load GLB model
    try {
      const loader = new GLTFLoader();
      
      // Download the GLB file locally first
      const fileUri = FileSystem.documentDirectory + 'model.glb';
      const { uri } = await FileSystem.downloadAsync(modelUrl, fileUri);
      
      loader.load(uri, (gltf) => {
        const model = gltf.scene;
        
        // Scale and position the model
        model.scale.set(1, 1, 1);
        model.position.set(0, -1, 0);
        
        // Add rotation animation
        model.rotation.y = Math.PI * 0.25;
        
        scene.add(model);
        
        // Animation loop
        const animate = () => {
          timeoutRef.current = setTimeout(animate, 1000 / 60);
          
          // Slowly rotate the model
          model.rotation.y += 0.005;
          
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        
        animate();
      }, undefined, (error) => {
        console.warn('Error loading GLB model:', error);
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
