/**
 * 媒体轮播组件
 * @param {Object} options - 配置参数
 * @param {string} options.containerId - 容器ID
 * @param {Array} options.items - 轮播项数组
 * @param {string} options.items[].type - 类型 'image' 或 'video'
 * @param {string} options.items[].url - 媒体地址
 * @param {string} [options.items[].alt] - 图片替代文本
 * @param {boolean} [options.items[].autoplay] - 视频是否自动播放
 * @param {boolean} [options.autoPlay=true] - 是否自动播放
 * @param {number} [options.interval=3000] - 自动播放间隔(毫秒)
 * @param {boolean} [options.showoptions.showIndicators=true] - 是否显示指示器
 * @param {boolean} [options.showControls=true] - 是否显示控制按钮
 * @param {string} [options.width='100%'] - 轮播宽度
 * @param {string} [options.height='500px'] - 轮播高度
 * @param {string} [options.indicatorStyle='dot'] - 指示器样式(dot/bar)
 * @param {string} [options.controlStyle='default'] - 控制按钮样式(default/rounded/outline)
 */
class MediaCarousel {
  constructor(options) {
    // 合并默认配置与用户配置（新增响应式默认配置）
    this.config = {
      autoPlay: true,
      interval: 3000,
      showIndicators: true,
      showControls: true,
      width: '100%',
      height: 'auto', 
      indicatorStyle: 'dot',
      controlStyle: 'default',
      // 新增响应式断点配置（可选）
      responsive: {
        768: { // 屏幕宽度≥768px时的配置
          height: 'auto',
          interval: 4000
        },
        1200: { // 屏幕宽度≥1200px时的配置
          height: 'auto',
          interval: 5000
        }
      },
      ...options
    };

    // 验证必要参数
    if (!this.config.containerId || !this.config.items || this.config.items.length === 0) {
      throw new Error('容器ID和轮播项数组为必填参数');
    }

    // 初始化状态
    this.currentIndex = 0;
    this.timer = null;
    this.isTransitioning = false;
    
    // 获取容器元素
    this.container = document.getElementById(this.config.containerId);
    if (!this.container) {
      throw new Error(`未找到ID为${this.config.containerId}的容器元素`);
    }

    // 初始化组件
    this.init();
  }

  /**
   * 初始化组件
   */
  init() {
    // 设置容器基础样式
    this._setContainerStyle();
    
    // 注入组件所需样式
    this._injectStyles();
    
    // 创建轮播结构
    this._createCarouselStructure();
    
    // 绑定交互事件
    this._bindEvents();
    
    // 启动自动播放
    if (this.config.autoPlay) {
      this._startAutoPlay();
    }
  }

  /**
   * 设置容器样式
   */
  _setContainerStyle() {
    this.container.style.width = this.config.width;
    this.container.style.height = this.config.height;
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.classList.add('media-carousel');

    // 监听窗口大小变化，触发响应式调整
    window.addEventListener('resize', () => this._handleResize());
    // 初始触发一次
    this._handleResize();
  }

  /**
   * 注入组件所需CSS样式
   */
  _injectStyles() {
    // 避免重复注入样式
    if (document.getElementById('media-carousel-styles')) return;

    const style = document.createElement('style');
    style.id = 'media-carousel-styles';
    style.textContent = `
      .carousel-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
      }
      
      .carousel-slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
      
      .carousel-slide.active {
        opacity: 1;
        z-index: 1;
      }
      
      /* 媒体元素自适应核心样式 */
      .carousel-slide img,
      .carousel-slide video {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 保持比例并填充容器，超出部分裁剪 */
        object-position: center; /* 居中显示 */
      }
      
      /* 响应式控制按钮 */
      .carousel-controls {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translateY(-50%);
        z-index: 2;
        display: flex;
        justify-content: space-between;
        padding: 0 clamp(8px, 2vw, 15px); /* 内边距随屏幕宽度变化 */
        box-sizing: border-box;
      }
      
      .carousel-control {
        cursor: pointer;
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        opacity: 0.8;
        font-size: clamp(1rem, 3vw, 1.5rem); /* 图标大小随屏幕变化 */
      }

      .carousel-control:hover {
        opacity: 1;
      }
      
      /* 控制按钮尺寸响应式调整 */
      .carousel-control.default {
        width: clamp(30px, 6vw, 40px);
        height: clamp(30px, 6vw, 40px);
        background: rgba(0, 0, 0, 0.5);
      }
      
      .carousel-control.rounded {
        width: clamp(40px, 8vw, 50px);
        height: clamp(40px, 8vw, 50px);
        background: #2c3e50;
        border-radius: 50%;
      }
      
      .carousel-control.outline {
        width: clamp(35px, 7vw, 45px);
        height: clamp(35px, 7vw, 45px);
        background: transparent;
        border: 2px solid white;
        border-radius: 4px;
      }
      
      /* 响应式指示器 */
      .carousel-indicators {
        position: absolute;
        bottom: clamp(10px, 3vh, 20px); /* 底部距离随视口高度变化 */
        left: 0;
        width: 100%;
        z-index: 2;
        display: flex;
        justify-content: center;
        gap: clamp(4px, 1vw, 8px); /* 间距随屏幕宽度变化 */
      }

       .carousel-indicator {
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        padding: 0;
      }
      
      .carousel-indicator.dot {
        width: clamp(8px, 2vw, 12px);
        height: clamp(8px, 2vw, 12px);
        border-radius: 50%;
      }
      
      .carousel-indicator.bar {
        height: clamp(3px, 0.5vh, 4px);
        width: clamp(20px, 5vw, 30px);
        border-radius: 2px;
      }
      
      .carousel-indicator.active {
        background-color: #3498db;
      }
      
      .carousel-indicator.inactive {
        background-color: rgba(255, 255, 255, 0.6);
      }

      /* 小屏幕适配：隐藏控制按钮，仅保留指示器 */
      @media (max-width: 576px) {
        .carousel-controls {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 创建轮播整体结构
   */
  _createCarouselStructure() {
    // 创建轮播内容包裹器
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';
    this.container.appendChild(wrapper);

    // 创建轮播项
    this._createSlides(wrapper);

    // 创建控制按钮
    if (this.config.showControls) {
      this._createControls();
    }

    // 创建指示器
    if (this.config.showIndicators) {
      this._createIndicators();
    }
  }

   /**
   * 处理窗口大小变化（响应式核心逻辑）
   */
  _handleResize() {
    const windowWidth = window.innerWidth;
    const { responsive } = this.config;
    
    // 如果配置了响应式断点，根据当前宽度应用对应配置
    if (responsive && typeof responsive === 'object') {
      // 按断点从大到小排序
      const breakpoints = Object.keys(responsive).map(Number).sort((a, b) => b - a);
      
      for (const breakpoint of breakpoints) {
        if (windowWidth >= breakpoint) {
          this.updateConfig(responsive[breakpoint]);
          break;
        }
      }
    }
  }

  /**
   * 创建轮播项（图片或视频）
   * @param {HTMLElement} wrapper - 父容器
   */
  _createSlides(wrapper) {
    this.slides = [];
    this.config.items.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      slide.dataset.index = index;

      if (item.type === 'image') {
        // 创建图片元素
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.alt || `轮播图片 ${index + 1}`;
        slide.appendChild(img);
      } else if (item.type === 'video') {
        // 创建视频元素
        const video = document.createElement('video');
        video.src = item.url;
        video.muted = true; // 视频默认静音（符合浏览器自动播放政策）
        video.loop = true;  // 视频循环播放
        
        // 根据配置决定是否自动播放
        const shouldAutoplay = item.autoplay !== undefined ? item.autoplay : true;
        if (shouldAutoplay) {
          video.autoplay = true;
        }
        
        // 第一个视频如果需要自动播放则启动
        if (index === 0 && shouldAutoplay) {
          video.play().catch(e => console.log('视频自动播放失败:', e));
        }
        
        slide.appendChild(video);
      }

      wrapper.appendChild(slide);
      this.slides.push(slide);
    });
  }

  /**
   * 创建控制按钮（上一个/下一个）
   */
  _createControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'carousel-controls';

    // 上一个按钮
    const prevBtn = document.createElement('button');
    prevBtn.className = `carousel-control ${this.config.controlStyle}`;
    prevBtn.innerHTML = '&#10094;';
    prevBtn.title = '上一个';

    // 下一个按钮
    const nextBtn = document.createElement('button');
    nextBtn.className = `carousel-control ${this.config.controlStyle}`;
    nextBtn.innerHTML = '&#10095;';
    nextBtn.title = '下一个';

    controlsContainer.appendChild(prevBtn);
    controlsContainer.appendChild(nextBtn);
    this.container.appendChild(controlsContainer);

    this.controls = { prev: prevBtn, next: nextBtn };
  }

  /**
   * 创建指示器
   */
  _createIndicators() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';

    this.indicators = [];
    this.config.items.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator ${this.config.indicatorStyle} ${index === 0 ? 'active' : 'inactive'}`;
      indicator.dataset.index = index;
      indicator.title = `切换到第 ${index + 1} 项`;
      indicatorsContainer.appendChild(indicator);
      this.indicators.push(indicator);
    });

    this.container.appendChild(indicatorsContainer);
  }

  /**
   * 绑定交互事件
   */
  _bindEvents() {
    // 控制按钮事件
    if (this.config.showControls) {
      this.controls.prev.addEventListener('click', () => this.prev());
      this.controls.next.addEventListener('click', () => this.next());
    }

    // 指示器事件
    if (this.config.showIndicators) {
      this.indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
          const index = parseInt(indicator.dataset.index);
          this.goTo(index);
        });
      });
    }

    // 鼠标悬停暂停自动播放
    this.container.addEventListener('mouseenter', () => {
      if (this.config.autoPlay) {
        this._stopAutoPlay();
      }
    });

    // 鼠标离开恢复自动播放
    this.container.addEventListener('mouseleave', () => {
      if (this.config.autoPlay) {
        this._startAutoPlay();
      }
    });

    // 键盘控制
    document.addEventListener('keydown', (e) => {
      // 只有当轮播容器在可视范围内才响应键盘事件
      if (this._isElementInViewport(this.container)) {
        if (e.key === 'ArrowLeft') this.prev();
        else if (e.key === 'ArrowRight') this.next();
      }
    });
  }

  /**
   * 检查元素是否在视口中
   * @param {HTMLElement} el - 要检查的元素
   * @returns {boolean} 是否在视口中
   */
  _isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * 切换到上一项
   */
  prev() {
    if (this.isTransitioning) return;
    let index = this.currentIndex - 1;
    if (index < 0) index = this.slides.length - 1;
    this.goTo(index);
  }

  /**
   * 切换到下一项
   */
  next() {
    if (this.isTransitioning) return;
    let index = this.currentIndex + 1;
    if (index >= this.slides.length) index = 0;
    this.goTo(index);
  }

  /**
   * 切换到指定索引的轮播项
   * @param {number} index - 目标索引
   */
  goTo(index) {
    if (index === this.currentIndex || this.isTransitioning || index < 0 || index >= this.slides.length) return;

    this.isTransitioning = true;

    // 暂停当前视频
    const currentVideo = this.slides[this.currentIndex].querySelector('video');
    if (currentVideo) currentVideo.pause();

    // 更新轮播项显示状态
    this.slides[this.currentIndex].classList.remove('active');
    this.slides[index].classList.add('active');

    // 播放新视频
    const newVideo = this.slides[index].querySelector('video');
    if (newVideo) {
      const itemConfig = this.config.items[index];
      const shouldAutoplay = itemConfig.autoplay !== undefined ? itemConfig.autoplay : true;
      if (shouldAutoplay) {
        newVideo.play().catch(e => console.log('视频播放失败:', e));
      }
    }

    // 更新指示器状态
    if (this.config.showIndicators) {
      this._updateIndicators(index);
    }

    // 更新当前索引
    this.currentIndex = index;

    // 重置过渡状态
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  /**
   * 更新指示器状态
   * @param {number} activeIndex - 激活项索引
   */
  _updateIndicators(activeIndex) {
    this.indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.remove('inactive');
        indicator.classList.add('active');
        // 长条样式特殊处理
        if (this.config.indicatorStyle === 'bar') {
          indicator.style.width = '50px';
        }
      } else {
        indicator.classList.remove('active');
        indicator.classList.add('inactive');
        // 长条样式特殊处理
        if (this.config.indicatorStyle === 'bar') {
          indicator.style.width = '30px';
        }
      }
    });
  }

  /**
   * 开始自动播放
   */
  _startAutoPlay() {
    this._stopAutoPlay(); // 先停止已有定时器
    this.timer = setInterval(() => {
      this.next();
    }, this.config.interval);
  }

  /**
   * 停止自动播放
   */
  _stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * 更新轮播配置
   * @param {Object} newConfig - 新的配置选项
   */
  updateConfig(newConfig) {
    // 保存当前自动播放状态
    const wasAutoPlaying = this.config.autoPlay;
    
    // 合并新配置
    this.config = { ...this.config, ...newConfig };
    
    // 更新尺寸
    if (newConfig.width) this.container.style.width = newConfig.width;
    if (newConfig.height) this.container.style.height = newConfig.height;
    
    // 更新指示器
    if (newConfig.indicatorStyle && this.config.showIndicators) {
      const indicatorsContainer = this.container.querySelector('.carousel-indicators');
      if (indicatorsContainer) indicatorsContainer.remove();
      this._createIndicators();
      this._updateIndicators(this.currentIndex);
      this._bindEvents(); // 重新绑定事件
    }
    
    // 更新控制按钮
    if (newConfig.controlStyle && this.config.showControls) {
      const controlsContainer = this.container.querySelector('.carousel-controls');
      if (controlsContainer) controlsContainer.remove();
      this._createControls();
      this._bindEvents(); // 重新绑定事件
    }
    
    // 更新自动播放状态
    if (newConfig.autoPlay !== undefined) {
      newConfig.autoPlay ? this._startAutoPlay() : this._stopAutoPlay();
    } else if (wasAutoPlaying) {
      this._startAutoPlay();
    }
  }
}

// 暴露到全局
window.MediaCarousel = MediaCarousel;