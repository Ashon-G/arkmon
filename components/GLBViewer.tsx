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
    renderer.setClearColor(0x000000, 0); // Fully transparent background

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

    // Create a simple fallback geometry first
    const fallbackGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const fallbackMaterial = new THREE.MeshLambertMaterial({
      color: 0x00ff88,
      emissive: 0x002200,
      transparent: true,
      opacity: 0.8
    });
    const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
    fallbackMesh.position.set(0, 0.5, 0);
    scene.add(fallbackMesh);

    // Start animation immediately with fallback
    const animate = () => {
      timeoutRef.current = setTimeout(animate, 1000 / 60);

      const time = Date.now() * 0.001;
      fallbackMesh.rotation.y += 0.003;
      fallbackMesh.position.y = 0.5 + Math.sin(time * 0.5) * 0.2;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();

    // Try to load GLB model
    try {
      const loader = new GLTFLoader();

      // Try direct loading first, fallback to local download
      loader.load(modelUrl, (gltf) => {
        const model = gltf.scene;

        // Remove fallback mesh when real model loads
        scene.remove(fallbackMesh);

        // Scale and position the model for optimal viewing - bigger and higher up
        model.scale.set(4, 4, 4);
        model.position.set(0, 0, 0);

        // Set initial rotation for better angle
        model.rotation.y = Math.PI * 0.15;
        model.rotation.x = -0.1;

        scene.add(model);

        console.log('GLB model loaded successfully!');
      }, (progress) => {
        console.log('Loading GLB progress:', progress);
      }, (error) => {
        console.warn('Direct GLB load failed, trying local download:', error);
        // Try downloading locally as fallback
        FileSystem.downloadAsync(modelUrl, FileSystem.documentDirectory + 'model.glb')
          .then(({ uri }) => {
            loader.load(uri, (gltf) => {
              const model = gltf.scene;
              scene.remove(fallbackMesh);
              model.scale.set(4, 4, 4);
              model.position.set(0, 0, 0);
              model.rotation.y = Math.PI * 0.15;
              model.rotation.x = -0.1;
              scene.add(model);
              console.log('GLB model loaded from local file!');
            }, undefined, (localError) => {
              console.warn('Local GLB load also failed:', localError);
              // Keep using fallback mesh
            });
          })
          .catch((downloadError) => {
            console.warn('GLB download failed:', downloadError);
            // Keep using fallback mesh
          });
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
    backgroundColor: 'transparent',
  },
  glView: {
    flex: 1,
  },
});
