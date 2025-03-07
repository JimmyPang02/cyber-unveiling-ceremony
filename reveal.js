// 赛博揭牌仪式控制脚本
const revealButton = document.getElementById('reveal-button');
const curtain = document.getElementById('digital-curtain');
const logo = document.getElementById('club-logo');
const audio = document.getElementById('reveal-audio');
const container = document.querySelector('.ceremony-container');
const contentWrapper = document.querySelector('.content-wrapper');

// 获取音频元素
const revealAudio = document.getElementById('reveal-audio');
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');

// 创建星星背景
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.classList.add('stars');
  container.appendChild(starsContainer);
  
  // 添加100个星星
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = star.style.width;
    star.style.opacity = Math.random();
    star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite alternate`;
    starsContainer.appendChild(star);
  }
  
  return starsContainer;
}

// 创建星星
const stars = createStars();

// 创建音频可视化器
function createAudioVisualizer() {
  const visualizer = document.createElement('div');
  visualizer.classList.add('audio-visualizer');
  container.appendChild(visualizer);
  
  // 创建音频条
  for (let i = 0; i < 30; i++) {
    const bar = document.createElement('div');
    bar.classList.add('audio-bar');
    visualizer.appendChild(bar);
  }
  
  return visualizer;
}

// 创建音频可视化器
const visualizer = createAudioVisualizer();

// 音乐控制
musicToggle.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicToggle.classList.remove('muted');
  } else {
    backgroundMusic.pause();
    musicToggle.classList.add('muted');
  }
});

// 页面加载时自动播放背景音乐（需要用户交互）
document.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.volume = 0.3; // 设置音量
    backgroundMusic.play().catch(e => console.log('无法自动播放音乐:', e));
  }
}, { once: true });

// 按钮点击事件
revealButton.addEventListener('click', () => {
  // 播放揭幕音效
  revealAudio.volume = 1.0;
  revealAudio.play().catch(e => console.log('无法播放音效:', e));
  
  // 如果背景音乐没有播放，开始播放
  if (backgroundMusic.paused) {
    backgroundMusic.volume = 0.3;
    backgroundMusic.play().catch(e => console.log('无法播放背景音乐:', e));
  } else {
    // 如果已经在播放，增加音量
    fadeVolumeUp(backgroundMusic, 0.3, 0.7, 2000);
  }
  
  // 显示音频可视化器
  setTimeout(() => {
    visualizer.classList.add('visible');
    startAudioVisualization();
  }, 1500);
  
  // 隐藏按钮 - 使用透明度和缩小效果
  revealButton.style.opacity = '0';
  revealButton.style.transform = 'translate(-50%, -50%) scale(0.5)';
  revealButton.style.pointerEvents = 'none';
  
  // 红布收起动画
  curtain.classList.add('reveal-animation');
  
  // 标志出现动画
  setTimeout(() => {
    // 显示星星背景
    stars.classList.add('visible');
    
    // 改变容器样式
    container.classList.add('revealed');
    
    logo.classList.add('appear');
    
    // 粒子动画效果
    startParticleEffect();
    
    // 播放庆祝动画
    setTimeout(playCelebrationAnimation, 2000);
    
    // 调整内容位置
    contentWrapper.style.justifyContent = 'center';
  }, 1500);
});

// 粒子效果函数
function startParticleEffect() {
  // 创建粒子动画
  const particles = [];
  for (let i = 0; i < 150; i++) {  // 增加粒子数量
    // 创建粒子元素
    const particle = document.createElement('div');
    particle.classList.add('particle');
    // 随机位置和颜色
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';  // 添加随机顶部位置
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    // 随机粒子颜色
    const colors = ['rgba(255,215,0,1)', 'rgba(52,152,219,1)', 'rgba(231,76,60,1)', 'rgba(46,204,113,1)'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `radial-gradient(circle, rgba(255,255,255,1) 0%, ${randomColor} 100%)`;
    
    document.body.appendChild(particle);
    particles.push(particle);
  }
  
  // 清理粒子
  setTimeout(() => {
    particles.forEach(p => p.remove());
  }, 5000);
}

// 庆祝动画
function playCelebrationAnimation() {
  // 显示愿景
  const vision = document.getElementById('vision');
  vision.classList.add('visible');
  
  // 显示使命
  const mission = document.getElementById('mission');
  mission.classList.add('slide-in');
  
  // 显示成立日期
  const foundingDate = document.getElementById('founding-date');
  foundingDate.classList.add('slide-in');
}

// 音量渐变函数
function fadeVolumeUp(audioElement, startVolume, endVolume, duration) {
  const startTime = performance.now();
  audioElement.volume = startVolume;
  
  function updateVolume() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    audioElement.volume = startVolume + (endVolume - startVolume) * progress;
    
    if (progress < 1) {
      requestAnimationFrame(updateVolume);
    }
  }
  
  requestAnimationFrame(updateVolume);
}

// 音频可视化动画
function startAudioVisualization() {
  const bars = document.querySelectorAll('.audio-bar');
  
  function animateBars() {
    if (!backgroundMusic.paused) {
      bars.forEach(bar => {
        const height = Math.random() * 40 + 5;
        bar.style.height = `${height}px`;
      });
    }
    
    requestAnimationFrame(animateBars);
  }
  
  animateBars();
}

// 添加星星闪烁动画
const style = document.createElement('style');
style.textContent = `
@keyframes twinkle {
  0% { opacity: 0.3; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.2); }
}
`;
document.head.appendChild(style); 