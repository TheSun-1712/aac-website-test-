import { useEffect, useRef, useState } from "react";

/**
 * AACVideoLoader
 * Renders the official AAC animated logo sequence from loading.mp4,
 * keying out the white background in real-time via hardware-accelerated WebGL.
 * Zero audio, 60fps smooth playback, compatible across all modern browsers.
 */
export default function AACVideoLoader({ onEnded, className = "" }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animId;
    let isCancelled = false;

    // Ensure audio is strictly muted
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    // Attempt video playback
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback: user interaction will resume
      });
    }

    // Initialize WebGL context
    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: true,
      }) ||
      canvas.getContext("experimental-webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: true,
      });

    if (!gl) {
      // 2D Canvas Fallback
      const ctx = canvas.getContext("2d");
      const render2D = () => {
        if (isCancelled) return;
        if (video.readyState >= 2) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = frame.data;
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i],
              g = d[i + 1],
              b = d[i + 2];
            const minC = Math.min(r, g, b);
            if (minC >= 246) {
              d[i + 3] = 0;
            } else if (minC >= 200) {
              const a = (246 - minC) / 46;
              d[i + 3] = Math.round(a * 255);
            }
          }
          ctx.putImageData(frame, 0, 0);
          if (!isVideoReady) setIsVideoReady(true);
        }
        animId = requestAnimationFrame(render2D);
      };
      animId = requestAnimationFrame(render2D);
      return () => {
        isCancelled = true;
        cancelAnimationFrame(animId);
      };
    }

    // WebGL Shader Pipeline
    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_image;

      void main() {
        vec4 color = texture2D(u_image, v_texCoord);
        float minC = min(color.r, min(color.g, color.b));
        
        // Key out pure/near white background with smooth anti-aliased falloff
        float alpha = clamp((0.965 - minC) / (0.965 - 0.78), 0.0, 1.0);
        
        // Un-premultiply white background to eliminate white fringing
        vec3 fg = (color.rgb - vec3(1.0) * (1.0 - alpha)) / max(alpha, 0.001);
        fg = clamp(fg, 0.0, 1.0);

        // Dark-mode contrast lift: make dark lines and magnet body clearly discernible
        float lum = dot(fg, vec3(0.299, 0.587, 0.114));
        float darkLift = clamp((0.32 - lum) / 0.32, 0.0, 1.0) * 0.22;
        fg += vec3(0.20, 0.38, 0.68) * darkLift;
        fg = clamp(fg, 0.0, 1.0);

        gl_FragColor = vec4(fg, alpha);
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry (2 triangles covering full canvas viewport)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Texture coords mapping correctly from video frame
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 1.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
      ]),
      gl.STATIC_DRAW
    );
    const aTex = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(aTex);
    gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);

    // Texture configuration
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);

    const render = () => {
      if (isCancelled) return;
      if (video.readyState >= 2) {
        if (!isVideoReady) setIsVideoReady(true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video
        );
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
      if (program && gl) {
        gl.deleteProgram(program);
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(texCoordBuffer);
        gl.deleteTexture(texture);
      }
    };
  }, [isVideoReady]);

  return (
    <div
      className={`relative w-full flex items-center justify-center select-none ${className}`}
    >
      {/* Hidden standard MP4 video source (100% universal browser support) */}
      <video
        ref={videoRef}
        src="/loading.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={onEnded}
        className="hidden"
      />

      {/* WebGL Real-time Keyed Canvas with atmospheric glow */}
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="w-full max-w-[620px] sm:max-w-[700px] h-auto object-contain filter drop-shadow-[0_0_28px_rgba(23,105,255,0.7)] transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isVideoReady ? 1 : 0.05 }}
      />
    </div>
  );
}

