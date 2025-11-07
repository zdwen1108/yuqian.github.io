class InfoCardList {
  constructor(containerId, globalOptions = {}, loadMoreOptions = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) throw new Error(`容器#${containerId}不存在`);

    // 简化默认配置（避免百分比计算偏差，优先用固定宽度逻辑）
    this.globalOptions = {
      cardWidth: '360px', // 固定卡片宽度（更稳定）
      imageHeight: '180px',
      marginBottom: '20px',
      cardGap: '16px',
      titleFontSize: '18px',
      titleColor: '#333',
      titleLineHeight: '24px',
      contentFontSize: '16px',
      contentColor: '#595959',
      contentLineHeight: '1.5',
      timeFontSize: '12px',
      timeColor: '#999',
      showTime: true,
      clickable: true,
      hoverShadow: '0 2px 8px rgba(0,0,0,0.1)',
      hoverTransform: 'translateY(-2px)',
      transitionDuration: '0.3s',
      ...globalOptions
    };

    this.loadMoreOptions = { show: false, ...loadMoreOptions };

    this.allData = [];
    this.individualOptions = [];
    this.cards = [];
    this.displayedCount = 0;

    // 加载更多容器
    this.loadMoreContainer = document.createElement('div');
    this.loadMoreContainer.style.width = '100%';
    this.loadMoreContainer.style.textAlign = 'center';
    this.loadMoreContainer.style.padding = '20px 0';
    this.loadMoreContainer.style.marginTop = '20px';
    this.container.parentNode.appendChild(this.loadMoreContainer);

    // 加载更多按钮
    this.loadMoreButton = document.createElement('button');
    this.loadMoreButton.textContent = '查看更多';
    this.loadMoreButton.style.padding = '10px 20px';
    this.loadMoreButton.style.cursor = 'pointer';
    this.loadMoreButton.style.border = '1px solid #ddd';
    this.loadMoreButton.style.backgroundColor = '#fff';
    this.loadMoreButton.style.borderRadius = '4px';
    this.loadMoreButton.style.fontSize = '14px';
    this.loadMoreButton.addEventListener('click', () => this.loadMore());

    // 无更多数据提示
    this.noMoreText = document.createElement('p');
    this.noMoreText.textContent = '没有更多数据了';
    this.noMoreText.style.color = '#999';
    this.noMoreText.style.fontSize = '14px';
    this.noMoreText.style.margin = '0';
    this.noMoreText.style.display = 'none';

    this.loadMoreContainer.appendChild(this.loadMoreButton);
    this.loadMoreContainer.appendChild(this.noMoreText);

    // 容器样式（简化flex布局，确保稳定）
    this.container.style.display = 'flex';
    this.container.style.flexWrap = 'wrap';
    this.container.style.gap = this.globalOptions.cardGap;
    this.container.style.width = '100%';
    this.container.style.maxWidth = '1780px';
    this.container.style.margin = '0 auto';

    // 初始隐藏加载更多
    this.updateLoadMoreDisplay();
  }

  /**
   * 每行卡片数量计算（优先基于容器宽度）
   */
  getItemsPerRow() {
    // 强制用容器宽度计算（避免百分比精度问题）
    const containerWidth = this.container.clientWidth || 1200; // 兜底宽度（防止容器未渲染）
    const cardWidth = parseFloat(this.globalOptions.cardWidth);
    const cardGap = parseFloat(this.globalOptions.cardGap);
    // 计算实际可容纳卡片数（包含间距）
    return Math.max(1, Math.floor((containerWidth + cardGap) / (cardWidth + cardGap)));
  }

  /**
   * 初始显示逻辑（强制显示前N个，避免计算错误）
   */
  renderFromApi(apiData, individualOptions = []) {
    if (!Array.isArray(apiData) || apiData.length === 0) {
      console.error('接口数据必须为非空数组');
      return;
    }

    this.allData = [...apiData];
    this.individualOptions = [...individualOptions];
    this.cards = [];

    // 强制初始显示：至少3个，最多1行（避免计算偏差）
    const itemsPerRow = this.getItemsPerRow();
    this.displayedCount = Math.min(3, itemsPerRow, this.allData.length);

    this.renderDisplayedCards();
    this.updateLoadMoreDisplay();
  }

  /**
   * 渲染卡片（确保DOM正确生成）
   */
  renderDisplayedCards() {
    this.container.innerHTML = ''; // 清空现有卡片
    this.cards = [];

    // 循环创建卡片（确保每个卡片都被渲染）
    for (let i = 0; i < this.displayedCount; i++) {
      const item = this.allData[i];
      if (!item) break;

      const cardContainer = document.createElement('div');
      this.container.appendChild(cardContainer);

      const cardOptions = {
        ...this.globalOptions,
        ...(this.individualOptions[i] || {})
      };

      const card = new InteractiveCard(cardContainer, cardOptions);
      card.setData(item);
      this.cards.push(card);
    }

  }

  /**
   * 加载更多（每次加载1行，避免一次性加载完）
   */
  loadMore() {
    const itemsPerRow = this.getItemsPerRow();
    const newCount = this.displayedCount + itemsPerRow;
    this.displayedCount = Math.min(newCount, this.allData.length);

    this.renderDisplayedCards();
    this.updateLoadMoreDisplay();

  }

  /**
   * 修复：正确判断是否有更多数据
   */
  updateLoadMoreDisplay() {
    this.loadMoreContainer.style.display = this.loadMoreOptions.show ? 'block' : 'none';
    if (!this.loadMoreOptions.show) return;

    // 关键修复：只有当已显示数量 >= 总数据量时，才显示"无更多"
    const hasMore = this.displayedCount < this.allData.length;
    this.loadMoreButton.style.display = hasMore ? 'inline-block' : 'none';
    this.noMoreText.style.display = hasMore ? 'none' : 'block';
  }

  updateGlobalConfig(newOptions) {
    this.globalOptions = { ...this.globalOptions, ...newOptions };
    this.container.style.gap = this.globalOptions.cardGap;
    this.cards.forEach(card => card.updateConfig(this.globalOptions));
    this.renderDisplayedCards();
    this.updateLoadMoreDisplay();
  }
}

/**
 * 单个卡片组件（确保内容正确渲染）
 */
class InteractiveCard {
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.data = {
      imageUrl: '',
      title_zh: '',
      title_en: '',
      description_zh: '',
      description_en: '',
      time: '',
      link: ''
    };
    this.initContainer();
  }

  initContainer() {
    this.container.style.width = this.options.cardWidth;
    this.container.style.marginBottom = this.options.marginBottom;
    this.container.style.boxSizing = 'border-box';
    this.container.style.backgroundColor = '#ffffff';
    this.container.style.border = '1px solid #f0f0f0';
    this.container.style.borderRadius = '8px';
    this.container.style.overflow = 'hidden';
    this.container.style.transition = `transform ${this.options.transitionDuration}, box-shadow ${this.options.transitionDuration}`;
    this.container.style.cursor = this.options.clickable ? 'pointer' : 'default';
    this.container.style.paddingBottom = '20px';
  }

  setData(data) {
    this.data = { ...this.data, ...data };
    this.render();
    this.bindEvents();
  }

  updateConfig(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.initContainer();
    this.render();
    this.bindEvents();
  }

  /**
   * 确保内容100%渲染（移除可能导致隐藏的样式）
   */
  render() {
    this.container.innerHTML = `
                    <div style="width: 100%;">
                        <img 
                            src="${this.data.imageUrl || 'https://picsum.photos/360/180'}" 
                            alt="${this.data.title || '默认图片'}"
                            style="width: 100%; height: ${this.options.imageHeight}; object-fit: cover; display: block;"
                        >
                    </div>
                    <div style="padding: 0 16px;">
                        <h3 style="font-size: ${this.options.titleFontSize}; color: ${this.options.titleColor}; line-height: ${this.options.titleLineHeight}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600; margin: 16px 0 8px 0;">
                            <span class="en hidden">${this.data.title_en || 'no title'}</span>
                            <span class="zh">${this.data.title_zh || '无标题'}</span>
                        </h3>
                        <p style="margin: 0 0 12px 0; font-size: ${this.options.contentFontSize}; color: ${this.options.contentColor}; line-height: ${this.options.contentLineHeight}; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                            <span class="en hidden"> ${this.data.description_en || 'no description'}</span>
                            <span class="zh">${this.data.description_zh || '无内容描述'}</span>
                        </p>
                        <p style="margin: 0; font-size: ${this.options.timeFontSize}; color: ${this.options.timeColor}; display: ${this.options.showTime ? 'block' : 'none'};">
                            ${this.data.time || '未知时间'}
                        </p>
                    </div>
                `;
  }

  bindEvents() {
    this.container.removeEventListener('click', this.handleClick.bind(this));
    this.container.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.container.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));

    if (this.options.clickable) {
      this.container.addEventListener('click', this.handleClick.bind(this));
      this.container.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      this.container.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
  }

  handleClick() {
    if (this.data.link) window.open(this.data.link, '_blank');
  }

  handleMouseEnter() {
    this.container.style.boxShadow = this.options.hoverShadow;
    this.container.style.transform = this.options.hoverTransform;
  }

  handleMouseLeave() {
    this.container.style.boxShadow = 'none';
    this.container.style.transform = 'translateY(0)';
  }
}

window.InfoCardList = InfoCardList;