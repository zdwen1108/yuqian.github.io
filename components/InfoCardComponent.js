/**
 * 可点击信息卡片列表组件
 * 支持动态数量渲染、点击跳转、样式自定义及交互反馈
 * // 模拟接口返回数据（实际项目替换为真实接口）
    const apiData = [
      {
        imageUrl: 'https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/bf581a3baa7b45cba1e0b1992b851c00.png~tplv-a9rns2rl98-resize-jpeg-v1.png',
        title: '北海牧场即将推出小果泥酸奶黑加仑桑葚口味',
        content: '北海牧场发布新品小果泥酸奶黑加仑桑葚口味，并在北京中华世纪坛举行小果泥酸奶新品游园会。',
        time: '2025-10-25',
        link: '/news/detail/123' // 跳转链接
      },
      {
        imageUrl: 'https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/1202ca0ff54b486b8e25541de4ed8ba9.png~tplv-a9rns2rl98-resize-jpeg-v1.png',
        title: '元气森林正式成立党委',
        content: '为充分发挥党建引领作用，确保公司在正确发展道路上锐意进取、阔步前行，推动公司在新时期实现高质量发展，在北京朝阳区...',
        time: '2025-10-24',
        link: '/news/detail/124' // 跳转链接
      }
      // 可根据接口返回自动增加更多卡片
    ];

    // 单卡片特殊配置（可选）
    const individualOptions = [
      {
        // 第一个卡片不可点击
        clickable: false
      },
      {
        // 第二个卡片自定义悬停效果
        hoverShadow: '0 4px 12px rgba(0,0,0,0.15)',
        contentFontSize: '13px'
      }
    ];

    // 渲染卡片列表（数量由apiData长度决定）
    newsCards.renderFromApi(apiData, individualOptions);
 */
class InfoCardList {
  /**
   * 构造函数
   * @param {string} containerId - 容器ID
   * @param {Object} globalOptions - 全局样式配置
   */
  constructor(containerId, globalOptions = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`容器#${containerId}不存在`);
    }

    // 全局默认配置
    this.globalOptions = {
      // 尺寸配置
      cardWidth: '100%',
      imageHeight: 'auto',
      marginBottom: '20px',
      cardGap: '16px',

      // 标题样式
      titleFontSize: '21px',
      titleColor: '#333',
      titleLineHeight: '26px',

      // 内容样式
      contentFontSize: '19px',
      contentColor: '#595959',
      contentLineHeight: '1.5',

      // 时间样式
      timeFontSize: '12px',
      timeColor: '#999',
      showTime: true,

      // 交互配置
      clickable: true,
      hoverShadow: '0 2px 8px rgba(0,0,0,0.1)',
      hoverTransform: 'translateY(-2px)',
      transitionDuration: '0.3s',

      ...globalOptions
    };

    // 存储卡片实例
    this.cards = [];

    // 初始化容器样式
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'row';
    this.container.style.justifyContent = 'space-between';
    this.container.style.gap = this.globalOptions.cardGap;
  }

  /**
   * 从接口数据渲染卡片列表
   * @param {Array} apiData - 接口返回的卡片数据数组
   * @param {Array} [individualOptions] - 单卡片配置数组（可选）
   */
  renderFromApi(apiData, individualOptions = []) {
    if (!Array.isArray(apiData)) {
      console.error('接口数据必须为数组格式');
      return;
    }

    // 清空现有内容
    this.container.innerHTML = '';
    this.cards = [];

    // 渲染所有卡片
    apiData.forEach((item, index) => {
      // 创建卡片容器
      const cardContainer = document.createElement('div');
      this.container.appendChild(cardContainer);

      // 合并配置（全局 + 单卡片）
      const cardOptions = {
        ...this.globalOptions,
        ...(individualOptions[index] || {})
      };

      // 创建卡片实例
      const card = new InteractiveCard(cardContainer, cardOptions);
      card.setData(item);
      this.cards.push(card);
    });
  }

  /**
   * 更新全局配置
   * @param {Object} newOptions - 新的全局配置
   */
  updateGlobalConfig(newOptions) {
    this.globalOptions = { ...this.globalOptions, ...newOptions };
    this.container.style.gap = this.globalOptions.cardGap;
    
    // 更新所有卡片
    this.cards.forEach(card => {
      card.updateConfig(this.globalOptions);
    });
  }
}

/**
 * 单个可交互卡片组件
 */
class InteractiveCard {
  /**
   * 构造函数
   * @param {HTMLElement} container - 卡片容器
   * @param {Object} options - 卡片配置
   */
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.data = {
      imageUrl: '',
      title: '',
      content: '',
      time: '',
      link: '' // 跳转链接
    };

    // 初始化卡片容器
    this.initContainer();
  }

  /**
   * 初始化卡片容器样式
   */
  initContainer() {
    this.container.style.width = this.options.cardWidth;
    this.container.style.marginBottom = this.options.marginBottom;
    this.container.style.boxSizing = 'border-box';
    this.container.style.backgroundColor = '#ffffff';
    this.container.style.transition = `transform ${this.options.transitionDuration}, box-shadow ${this.options.transitionDuration}`;
    this.container.style.cursor = this.options.clickable ? 'pointer' : 'default';
  }

  /**
   * 设置卡片数据
   * @param {Object} data - 卡片数据
   */
  setData(data) {
    this.data = { ...this.data, ...data };
    this.render();
    this.bindEvents();
  }

  /**
   * 更新卡片配置
   * @param {Object} newOptions - 新配置
   */
  updateConfig(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.initContainer();
    this.render();
    this.bindEvents();
  }

  /**
   * 渲染卡片内容
   */
  render() {
    this.container.innerHTML = `
      <!-- 图片区域 -->
      <div class="card-image-wrapper" style="width: 100%;">
        <img 
          src="${this.data.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTUwIj48cGF0aCBkPSJNMTk1IDEwSDVjLTIuOCAwLTUgMi4yLTUgNXYzNGMwIDIuOCAyLjIgNSA1IDVoMTgwdjE1YzAgMi44IDIuMiA1IDUgNXYyOWMzLjMgMCA2LTIuNyA2LTZzLTIuNy02LTYtNnYtMjljMC0zLjMtMi43LTYtNi02aC0xMTBjLTIuOCAwLTUgMi4yLTUgNXYxNGMwIDIuOCAyLjIgNSA1IDVoMTAwYzIuOCAwIDUgMi4yIDUgNXYzMmMwIDIuOC0yLjIgNS01IDVoLTkwYzIuOCAwIDUtMi4yIDUtNXYtMzRjMC0yLjgtMi4yLTUtNS01em0tMTIwIDU1aC00MHYtMjVjMC0yLjgtMi4yLTUtNS01cy01IDIuMi01IDV2MjVoLTQwdjI1YzAgMi44IDIuMiA1IDUgNXM1LTIuMiA1LTV2LTI1em02MCA1Mmg0MHYtMjVjMC0yLjgtMi4yLTUtNS01cy01IDIuMi01IDV2MjVoNDJ2MjVjMCAyLjgtMi4yIDUtNSA1cy01LTIuMi01LTV2LTI1em02MCA1MGg0MHYtMjVjMC0yLjgtMi4yLTUtNS01cy01IDIuMi01IDV2MjVoNDJ2MjVjMCAyLjgtMi4yIDUtNSA1cy01LTIuMi01LTV2LTI1eiIvPjwvc3ZnPg=='}" 
          alt="${this.data.title}"
          style="
            width: 100%;
            height: ${this.options.imageHeight};
            object-fit: cover;
            display: block;
            margin-bottom: 38px;
          "
        >
      </div>

      <!-- 内容区域 -->
      <div class="card-content" style="box-sizing: border-box;">
        <!-- 标题 -->
        <h3 style="
          font-size: ${this.options.titleFontSize};
          color: ${this.options.titleColor};
          line-height: ${this.options.titleLineHeight};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500;
          padding: 0 28px;
          margin-top: 0;
          margin-bottom: 30px;
        ">${this.data.title}</h3>

        <!-- 详情内容 -->
        <p style="
          margin: 0 0 8px 0;
          font-size: ${this.options.contentFontSize};
          color: ${this.options.contentColor};
          line-height: ${this.options.contentLineHeight};
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding: 0 28px;
        ">${this.data.content}</p>

        <!-- 时间 -->
        <p style="
          margin: 0;
          font-size: ${this.options.timeFontSize};
          color: ${this.options.timeColor};
          display: ${this.options.showTime ? 'block' : 'none'};
        ">${this.data.time}</p>
      </div>
    `;
  }

  /**
   * 绑定交互事件
   */
  bindEvents() {
    // 移除现有事件监听
    this.container.removeEventListener('click', this.handleClick);
    this.container.removeEventListener('mouseenter', this.handleMouseEnter);
    this.container.removeEventListener('mouseleave', this.handleMouseLeave);

    if (this.options.clickable) {
      // 点击事件
      this.handleClick = () => {
        if (this.data.link) {
          window.location.href = this.data.link;
        }
      };
      this.container.addEventListener('click', this.handleClick);

      // 鼠标悬停事件
      this.handleMouseEnter = () => {
        this.container.style.boxShadow = this.options.hoverShadow;
        this.container.style.transform = this.options.hoverTransform;
      };
      this.container.addEventListener('mouseenter', this.handleMouseEnter);

      this.handleMouseLeave = () => {
        this.container.style.boxShadow = 'none';
        this.container.style.transform = 'translateY(0)';
      };
      this.container.addEventListener('mouseleave', this.handleMouseLeave);
    } else {
      // 不可点击状态重置样式
      this.container.style.boxShadow = 'none';
      this.container.style.transform = 'translateY(0)';
    }
  }
}

// 暴露组件到全局
window.InfoCardList = InfoCardList;