import React, { useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
// import ReactPlayer from 'react-player'
import './App.css'
import * as tf from '@tensorflow/tfjs'
import * as cocossd from '@tensorflow-models/coco-ssd'
import { drawRect } from './utilities'

function App() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  // const webcam = 'https://youtu.be/rNQyWsNUChc'

  const runCoco = async () => {
    const net = await cocossd.load()
    setInterval(() => {
      detect(net)
    }, 10)
  }
  
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      
      const video = webcamRef.current.video

      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      const obj = await net.detect(video)
      
      const ctx = canvasRef.current.getContext('2d')
      drawRect(obj, ctx)
    }
  }
  useEffect(() => {
    runCoco()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            width: 900,
            height: 700,
          }}
        />
        {/* <ReactPlayer
          ref={webcamRef}
          url={webcam}
          controls
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: '2',
          }}
          width="821px"
          height="460px"
        /> */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            width: 900,
            height: 700,
          }}
        />
      </header>
    </div>
  )
}

export default App
