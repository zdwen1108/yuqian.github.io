class imageTextComponent{
  /**
   * 初始化革命事件展示组件
   * @param {Object} options 配置选项
   * @param {string} options.containerId - 容器ID
   * @param {string} options.imageUrl - 左侧图片URL
   * @param {string} options.imageAlt - 图片描述
   * @param {string} options.title - 大标题文本
   * @param {string} options.subtitle - 副标题/内容文本
   * @param {string} options.detailUrl - 详情页链接
   * @param {Object} [options.dimensions] - 尺寸配置
   * @param {string} [options.dimensions.width] - 组件总宽度 (默认: '1000px')
   * @param {string} [options.dimensions.height] - 组件总高度 (默认: '600px')
   * @param {string} [options.dimensions.imageWidth] - 图片宽度占比 (默认: '50%')
   * @param {string} [options.dimensions.marginBottom] - 组件下bottom (默认: '34px')
   * @param {Object} [options.styles] - 样式配置
   * @param {Object} [options.styles.title] - 标题样式
   * @param {Object} [options.styles.subtitle] - 副标题样式
   * @param {Object} [options.styles.button] - 按钮样式
   */
  constructor(options) {
    // 默认配置
    this.defaults = {
      dimensions: {
        width: '32vw',
        height: '600px',
        imageWidth: '50%',
        marginBottom: '34px'
      },
      styles: {
        title: {
          fontSize: '28px',
          color: '#333333',
          fontWeight: 'bold',
        },
        subtitle: {
          fontSize: '18px',
          color: '#666666',
        },
        button: {
          width: '140px',
          height: '40px',
          fontSize: '16px',
          bgColor: '#ffffff',
          borderColor: '#333333',
          textColor: '#333333',
          hoverBgColor: '#333333',
          hoverTextColor: '#ffffff'
        }
      }
    };

    // 合并配置
    this.config = {
      ...options,
      dimensions: { ...this.defaults.dimensions, ...options.dimensions },
      styles: {
        title: { ...this.defaults.styles.title, ...options.styles?.title },
        subtitle: { ...this.defaults.styles.subtitle, ...options.styles?.subtitle },
        button: { ...this.defaults.styles.button, ...options.styles?.button }
      }
    };

    this.container = document.getElementById(this.config.containerId);
    if (!this.container) {
      console.error('容器元素不存在，请检查containerId');
      return;
    }

    this.init();
  }

  // 初始化组件
  init() {
    this.render();
    this.bindEvents();
  }

  // 渲染组件
  render() {
    const { 
      imageUrl, imageAlt, title, subtitle, detailUrl, 
      dimensions, styles 
    } = this.config;

    // 计算内容区宽度
    const contentWidth = `calc(100% - ${dimensions.imageWidth})`;

    // 设置容器基础样式
    this.container.style.cssText = `
      width: ${dimensions.width};
      height: ${dimensions.height};
      margin-bottom: ${dimensions.marginBottom};
      display: flex;
      overflow: hidden;
      min-width: 1120px;
      box-shadow: 0 5px 15px 0 rgba(0,0,0,.2);
    `;

    // 组件内部结构
    this.container.innerHTML = `
      <!-- 左侧图片区域 -->
      <div class="image-section" style="
        width: ${dimensions.imageWidth};
        height: 100%;
      ">
        <img 
          src="${imageUrl}" 
          alt="${imageAlt}" 
          class="event-image"
          style="
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          "
        >
      </div>
      
      <!-- 右侧内容区域 -->
      <div class="content-section" style="
        width: ${contentWidth};
        height: 100%;
        padding: 50px 42px 0 50px;
        box-sizing: border-box;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        position: relative;
      ">
        <h2 class="event-title" style="
          margin: 0 0 43px 0;
          font-size: ${styles.title.fontSize};
          color: ${styles.title.color};
          font-weight: ${styles.title.fontWeight};
        ">${title}</h2>
        
        <p class="event-subtitle" style="
          font-size: ${styles.subtitle.fontSize};
          color: ${styles.subtitle.color};
          line-height: 32px;
        ">${subtitle}</p>
        
        <a href="${detailUrl}" class="detail-button" style="
          width: ${styles.button.width};
          height: ${styles.button.height};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${styles.button.fontSize};
          background-color: ${styles.button.bgColor};
          color: ${styles.button.textColor};
          border: 1px solid ${styles.button.borderColor};
          text-decoration: none;
          box-sizing: border-box;
          transition: all 0.3s ease;
          position: absolute;
          left: 50px;
          bottom: 25%;
        ">了解详情</a>
      </div>
    `;

    // 添加按钮hover样式
    this.addButtonHoverStyles();
  }

  // 添加按钮悬停样式
  addButtonHoverStyles() {
    const { button } = this.config.styles;
    const styleId = `button-hover-${this.config.containerId}`;
    
    // 移除旧样式
    const oldStyle = document.getElementById(styleId);
    if (oldStyle) oldStyle.remove();
    
    // 添加新样式
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      #${this.config.containerId} .detail-button:hover {
        background-color: ${button.hoverBgColor} !important;
        color: ${button.hoverTextColor} !important;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  // 绑定事件
  bindEvents() {
    const button = this.container.querySelector('.detail-button');
    if (button) {
      button.addEventListener('click', (e) => {
        console.log('跳转到详情页:', this.config.detailUrl);
        // 可添加自定义跳转逻辑
      });
    }
  }

  /**
   * 调整组件尺寸
   * @param {Object} dimensions 尺寸配置
   * @param {string} [dimensions.width] 总宽度
   * @param {string} [dimensions.height] 总高度
   * @param {string} [dimensions.imageWidth] 图片宽度占比
   */
  resize(dimensions) {
    this.config.dimensions = { ...this.config.dimensions, ...dimensions };
    this.render();
    this.bindEvents();
  }

  /**
   * 更新样式配置
   * @param {Object} styles 样式配置
   */
  updateStyles(styles) {
    this.config.styles = {
      title: { ...this.config.styles.title, ...styles.title },
      subtitle: { ...this.config.styles.subtitle, ...styles.subtitle },
      button: { ...this.config.styles.button, ...styles.button }
    };
    this.render();
    this.bindEvents();
  }
}