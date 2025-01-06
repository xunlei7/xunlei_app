<script>
    import { onMount } from "svelte";
  
    let canvas;
    let ctx;
  
    const dots = [];
    const numDots = 100; // 调整为 100 个点，增加密集度
    const maxLineDistance = 200; // 增加线条连接范围
    let mouse = { x: null, y: null };
  
    function createDots() {
      for (let i = 0; i < numDots; i++) {
        dots.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: 1,
        });
      }
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // 绘制点
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();
  
        dot.x += dot.vx;
        dot.y += dot.vy;
  
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
      }
  
      // 连接点之间的线条
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < maxLineDistance) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${1 - dist / maxLineDistance})`;
            ctx.lineWidth = 0.5; // 更细的线条
            ctx.stroke();
          }
        }
      }
  
      // 鼠标与点的连接线
      if (mouse.x !== null && mouse.y !== null) {
        for (const dot of dots) {
          const dist = Math.hypot(mouse.x - dot.x, mouse.y - dot.y);
          if (dist < maxLineDistance) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(dot.x, dot.y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${1 - dist / maxLineDistance})`;
            ctx.lineWidth = 0.7; // 鼠标的线条稍微更明显
            ctx.stroke();
          }
        }
      }
  
      requestAnimationFrame(draw);
    }
  
    function handleMouseMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }
  
    function handleMouseOut() {
      mouse.x = null;
      mouse.y = null;
    }
  
    onMount(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext("2d");
  
      createDots();
      draw();
  
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseout", handleMouseOut);
  
      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseout", handleMouseOut);
      };
    });
  </script>
  
  <canvas bind:this={canvas} style="position: fixed; top: 0; left: 0; z-index: -1;"></canvas>
  
  <style>
    canvas {
      width: 100%;
      height: 100%;
    }
  </style>
  