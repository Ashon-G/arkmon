import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import GLBViewer from './GLBViewer';
import Simple3DViewer from './Simple3DViewer';

interface Multi3DViewerProps {
  models: string[];
  style?: any;
}

export default function Multi3DViewer({ models, style }: Multi3DViewerProps) {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useSimpleViewer, setUseSimpleViewer] = useState(false);

  const switchModel = () => {
    setCurrentModelIndex((prev) => (prev + 1) % models.length);
  };

  if (hasError || models.length === 0 || useSimpleViewer) {
    return (
      <Simple3DViewer style={style} />
    );
  }

  return (
    <View style={[styles.container, style]}>
      <GLBViewer 
        modelUrl={models[currentModelIndex]}
        style={styles.viewer}
      />
      
      {/* Model switcher - only show if multiple models */}
      {models.length > 1 && (
        <TouchableOpacity 
          style={styles.switchButton}
          onPress={switchModel}
        >
          <Text style={styles.switchText}>
            {currentModelIndex + 1}/{models.length}
          </Text>
        </TouchableOpacity>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading 3D Model...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  viewer: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 40, 0.8)',
  },
  fallbackContent: {
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    fontSize: 48,
    marginBottom: 10,
  },
  fallbackSubtext: {
    color: '#E8DD9F',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  switchText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    color: '#E8DD9F',
    fontSize: 14,
    fontWeight: '500',
  },
});
