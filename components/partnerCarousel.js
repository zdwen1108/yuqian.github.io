class PartnerMediaDisplay {
  /**
   * 初始化合作媒体展示组件
   * @param {string} containerId - 容器ID
   * @param {Object} options - 配置选项
   * @param {Array} options.media - 合作媒体数据 [{name, logo, url}]
   * @param {boolean} [options.scrollMode=true] - 是否单行滚动模式
   * @param {number} [options.itemWidth=200] - 每个媒体项宽度(px)
   * @param {number} [options.itemHeight=100] - 每个媒体项高度(px)
   * @param {number} [options.autoPlayDelay=5000] - 自动播放间隔(ms)
   * @param {number} [options.gap=20] - 媒体项间距(px)
   * @param {number} [options.hoverScale=1.08] - 悬停放大比例
   * @param {string} [options.title="合作媒体"] - 组件标题
   */
  constructor(containerId, options = {}) {
    // 默认配置
    this.defaults = {
      media: [],
      scrollMode: true,
      itemWidth: 200,
      itemHeight: 100,
      autoPlayDelay: 5000,
      gap: 20,
      hoverScale: 1.08,
      title: "合作商"
    };

    // 合并配置
    this.config = { ...this.defaults, ...options };
    
    // 获取容器
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`容器 #${containerId} 不存在`);
      return;
    }

    // 状态变量
    this.position = 0;
    this.autoPlayTimer = null;
    this.scrollMode = this.config.scrollMode;
    this.isDragging = false;
    this.startX = 0;
    this.startPosition = 0;

    // 初始化
    this.init();
  }

  // 初始化组件
  init() {
    // 设置容器为全屏宽度
    this.container.style.width = '100%';
    this.container.style.boxSizing = 'border-box';
    this.container.style.backgroundColor = '#f3f7e9';
    this.container.style.padding = '40px 80px';

    // 创建组件结构
    this.renderStructure();
    
    // 添加样式
    this.injectStyles();
    
    // 渲染媒体项
    this.renderMediaItems();
    
    // 绑定事件
    this.bindEvents();
    
    // 启动自动播放（仅单行模式）
    if (this.scrollMode) {
      this.startAutoPlay();
    }
  }

  // 渲染组件结构
  renderStructure() {
    this.container.innerHTML = `
      <h2 class="partner-media-title">${this.config.title}</h2>
      
      <div class="partner-media-container">
        <div class="media-track-wrapper">
          <div class="media-track"></div>
        </div>
      </div>
      
      <p class="partner-media-note">(排名不分先后)</p>
    `;
  }

  // 注入样式
  injectStyles() {
    if (document.getElementById('partner-media-styles')) return;

    const style = document.createElement('style');
    style.id = 'partner-media-styles';
    style.textContent = `
      .partner-media-title {
        text-align: center;
        color: #4b4d45;
        font-size: 34px;
        margin: 0 0 20px;
        font-weight: 400;
      }
      
      .partner-media-container {
        width: 100%;
        overflow: hidden;
        position: relative;
      }
      
      .media-track-wrapper {
        overflow: hidden;
        width: 100%;
      }
      
      .media-track {
        display: flex;
        transition: transform 0.5s ease-out;
        will-change: transform;
        gap: ${this.config.gap}px;
        padding: 10px 0;
      }
      
      .media-track.grid-mode {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${this.config.itemWidth}px, 1fr));
        justify-items: center;
      }
      
      .media-item {
        width: ${this.config.itemWidth}px;
        height: ${this.config.itemHeight}px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        box-sizing: border-box;
        transition: transform 0.3s ease;
        text-decoration: none;
        flex-shrink: 0; /* 防止单行模式下被压缩 */
      }
      
      .media-item:hover {
        transform: scale(${this.config.hoverScale});
        z-index: 10;
      }
      
      .media-logo {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      
      .partner-media-note {
        text-align: center;
        color: #666;
        font-size: 14px;
        margin: 15px 0 0;
        padding: 0 10px;
      }
    `;

    document.head.appendChild(style);
  }

  // 渲染媒体项
  renderMediaItems() {
    const track = this.container.querySelector('.media-track');
    if (!track) return;

    // 清空轨道
    track.innerHTML = '';
    
    // 设置轨道模式
    track.classList.toggle('grid-mode', !this.scrollMode);
    
    // 为无缝滚动复制一份数据（仅单行模式）
    const items = [...this.config.media, ...(this.scrollMode ? this.config.media : [])];
    
    // 创建媒体项
    items.forEach(media => {
      const item = document.createElement('a');
      item.className = 'media-item';
      item.href = media.url;
      item.target = '_blank';
      item.title = media.name || '';
      
      item.innerHTML = `<img src="${media.logo}" alt="${media.name || '合作媒体'}" class="media-logo">`;
      track.appendChild(item);
    });

    // 重置位置
    this.position = 0;
    this.updatePosition();
  }

  // 更新滚动位置
  updatePosition() {
    const track = this.container.querySelector('.media-track');
    if (!track || !this.scrollMode) return;
    
    track.style.transform = `translateX(-${this.position}px)`;
  }

  // 自动滚动到下一个位置
  autoScroll() {
    if (!this.scrollMode) return;
    
    const itemWidth = this.config.itemWidth + this.config.gap;
    const maxPosition = this.config.media.length * itemWidth;
    
    this.position += itemWidth;
    
    // 无缝滚动逻辑
    if (this.position >= maxPosition) {
      this.position = 0;
    }
    
    this.updatePosition();
  }

  // 开始自动播放
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => this.autoScroll(), this.config.autoPlayDelay);
  }

  // 停止自动播放
  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  // 切换展示模式（通过代码调用，不在UI显示）
  toggleMode(scrollMode) {
    this.scrollMode = scrollMode;
    this.renderMediaItems();
    
    if (this.scrollMode) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  // 处理拖拽滚动
  handleDragScroll(deltaX) {
    if (!this.scrollMode) return;
    
    const itemWidth = this.config.itemWidth + this.config.gap;
    const maxPosition = this.config.media.length * itemWidth;
    
    // 更新位置
    this.position = this.startPosition - deltaX;
    
    // 限制范围并实现循环效果
    if (this.position < 0) {
      this.position = maxPosition + (this.position % maxPosition);
    } else if (this.position >= maxPosition) {
      this.position = this.position % maxPosition;
    }
    
    this.updatePosition();
  }

  // 绑定事件
  bindEvents() {
    const track = this.container.querySelector('.media-track');
    const container = this.container.querySelector('.partner-media-container');
    
    // 鼠标悬停暂停自动播放
    container.addEventListener('mouseenter', () => {
      if (this.scrollMode) this.stopAutoPlay();
    });
    
    container.addEventListener('mouseleave', () => {
      if (this.scrollMode) this.startAutoPlay();
    });
    
    // 拖拽滚动支持（仅单行模式）
    track.addEventListener('mousedown', (e) => {
      if (!this.scrollMode) return;
      
      this.isDragging = true;
      this.startX = e.clientX;
      this.startPosition = this.position;
      track.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.scrollMode) return;
      
      const deltaX = e.clientX - this.startX;
      this.handleDragScroll(deltaX);
    });
    
    document.addEventListener('mouseup', () => {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      track.style.cursor = 'grab';
      
      // 自动吸附到最近的项目
      if (this.scrollMode) {
        const itemWidth = this.config.itemWidth + this.config.gap;
        this.position = Math.round(this.position / itemWidth) * itemWidth;
        this.updatePosition();
      }
    });
    
    // 触摸设备支持
    track.addEventListener('touchstart', (e) => {
      if (!this.scrollMode) return;
      
      this.isDragging = true;
      this.startX = e.touches[0].clientX;
      this.startPosition = this.position;
    });
    
    document.addEventListener('touchmove', (e) => {
      if (!this.isDragging || !this.scrollMode) return;
      
      const deltaX = e.touches[0].clientX - this.startX;
      this.handleDragScroll(deltaX);
    }, { passive: true });
    
    document.addEventListener('touchend', () => {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      
      // 自动吸附到最近的项目
      if (this.scrollMode) {
        const itemWidth = this.config.itemWidth + this.config.gap;
        this.position = Math.round(this.position / itemWidth) * itemWidth;
        this.updatePosition();
      }
    });
    
    // 窗口大小变化时重新布局
    window.addEventListener('resize', () => {
      this.renderMediaItems();
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 查找所有需要初始化的容器
  document.querySelectorAll('[data-partner-media]').forEach(container => {
    try {
      const config = JSON.parse(container.dataset.partnerMedia || '{}');
      new PartnerMediaDisplay(container.id, config);
    } catch (e) {
      console.error('合作媒体组件初始化失败:', e);
    }
  });
});