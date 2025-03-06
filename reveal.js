// 赛博揭牌仪式控制脚本
const revealButton = document.getElementById('reveal-button');
const curtain = document.getElementById('digital-curtain');
const logo = document.getElementById('club-logo');
const audio = document.getElementById('reveal-audio');

// 按钮点击事件
revealButton.addEventListener('click', () => {
  // 播放音效
  audio.play();
  
  // 红布收起动画
  curtain.classList.add('reveal-animation');
  
  // 标志出现动画
  setTimeout(() => {
    logo.classList.add('appear');
    
    // 粒子动画效果
    startParticleEffect();
    
    // 播放庆祝动画
    setTimeout(playCelebrationAnimation, 2000);
  }, 1500);
});

// 粒子效果函数
function startParticleEffect() {
  // 创建粒子动画
  const particles = [];
  for (let i = 0; i < 100; i++) {
    // 创建粒子元素
    const particle = document.createElement('div');
    particle.classList.add('particle');
    // 随机位置和颜色
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
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
  // 显示祝贺文字
  const congrats = document.getElementById('congratulations');
  congrats.classList.add('visible');
  
  // 显示俱乐部信息
  const clubInfo = document.getElementById('club-info');
  clubInfo.classList.add('slide-in');
} 