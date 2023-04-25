import React, { useRef, useEffect } from 'react';
import * as BABYLON from 'babylonjs';
import io from 'socket.io-client';

const LudoBoard = ({ playerName }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const diceRef = useRef(null);
  const pieceRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    // create the scene, camera, and light
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 40, -60));
    camera.attachControl(canvas, true);
    sceneRef.current = scene;
    cameraRef.current = camera;

    // create the board
    const boardMaterial = new BABYLON.StandardMaterial('boardMaterial', scene);
    board
