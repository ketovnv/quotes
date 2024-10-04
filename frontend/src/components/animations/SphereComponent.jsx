import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SphereComponent = ({ color, position }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      sphere.position.x += 0.01; // Движение сферы по оси X
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [color]);

  return <div ref={mountRef} />;
};

const ThreeJSApp = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <SphereComponent color={0xff0000} position={{ x: -2, y: 0 }} />
      <SphereComponent color={0x00ff00} position={{ x: 0, y: 0 }} />
      <SphereComponent color={0x0000ff} position={{ x: 2, y: 0 }} />
    </div>
  );
};

export default ThreeJSApp;