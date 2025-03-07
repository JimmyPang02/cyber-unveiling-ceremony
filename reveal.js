// 赛博揭牌仪式控制脚本
const revealButton = document.getElementById('reveal-button');
const curtain = document.getElementById('digital-curtain');
const logo = document.getElementById('club-logo');
const audio = document.getElementById('reveal-audio');
const container = document.querySelector('.ceremony-container');
const contentWrapper = document.querySelector('.content-wrapper');

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

// 按钮点击事件
revealButton.addEventListener('click', () => {
  // 播放音效
  // 如果没有音频文件，可以注释掉下面这行
  // audio.play();
  
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

// 添加星星闪烁动画
const style = document.createElement('style');
style.textContent = `
@keyframes twinkle {
  0% { opacity: 0.3; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.2); }
}
`;
document.head.appendChild(style); 