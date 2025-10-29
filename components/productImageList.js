// ProductImageList.js
class ProductImageList {
  /**
   * 构造函数 - 初始化组件配置
   * @param {Object} config - 组件配置参数
   * @param {string} config.container - 容器DOM选择器
   * @param {number} [config.itemsPerRow=5] - 每行展示数量
   * @param {number} [config.spacing=16] - 项间距(px)
   * @param {number} [config.rowGap=16] - 行间距(px)
   * @param {boolean} [config.showEllipsis=true] - 是否显示省略号
   * @param {function} [config.onImageClick] - 点击回调
   * @param {string|number} [config.listWidth='100%'] - 组件宽度
   * @param {string|number} [config.imagePadding=8] - 图片内边距(px)
   * @param {number} [config.imageAspectRatio=1] - 图片宽高比(宽/高)
   * @param {string} [config.imageFit='cover'] - 图片适配方式
   */
  constructor(config) {
    // 默认配置
    const defaultConfig = {
      container: '#product-images',
      itemsPerRow: 5,         // 每行数量
      spacing: 16,            // 水平间距
      rowGap: 16,             // 垂直间距
      showEllipsis: true,
      onImageClick: null,
      listWidth: '100%',
      imagePadding: 8,
      imageAspectRatio: 1,    // 1:1比例
      imageFit: 'cover'
    };

    // 合并配置
    this.config = { ...defaultConfig, ...config };
    this.container = document.querySelector(this.config.container);
    
    if (!this.container) {
      throw new Error(`容器元素 "${this.config.container}" 不存在`);
    }

    // 初始化样式
    this.initStyles();
  }

  /**
   * 初始化组件样式
   */
  initStyles() {
    // 移除旧样式
    const oldStyle = document.getElementById('product-image-list-styles');
    if (oldStyle) oldStyle.remove();

    // 创建新样式表
    const styleSheet = document.createElement('style');
    styleSheet.id = 'product-image-list-styles';
    styleSheet.textContent = `
      .product-image-list {
        display: flex;
        flex-wrap: wrap;        /* 允许换行 */
        margin: 0;
        padding: 0;
        list-style: none;
        width: ${this.config.listWidth};
        gap: ${this.config.rowGap}px ${this.config.spacing}px; /* 行间距 列间距 */
      }
      
      .product-image-item, .product-ellipsis-item {
        position: relative;
        transition: all 0.25s ease;
        box-sizing: border-box;
        flex: 0 0 auto;         /* 禁止拉伸 */
      }
      
      .product-image-item {
        cursor: pointer;
        padding: ${this.config.imagePadding}px;
      }
      
      .product-image-item:hover {
        transform: scale(1.03);
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .product-image-wrapper {
        width: 100%;
        position: relative;
        overflow: hidden;
      }
      
      .product-image-wrapper::after {
        content: '';
        display: block;
        padding-bottom: ${100 / this.config.imageAspectRatio}%;
      }
      
      .product-image-item img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: ${this.config.imageFit};
      }
      
      .product-ellipsis-item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #999;
        padding: ${this.config.imagePadding}px;
      }
    `;
    document.head.appendChild(styleSheet);
  }

  /**
   * 计算单个项的宽度
   */
  calculateItemWidth() {
    // 计算单个项的宽度（减去间距占比）
    const totalGaps = this.config.spacing * (this.config.itemsPerRow - 1);
    return `calc((100% - ${totalGaps}px) / ${this.config.itemsPerRow})`;
  }

  /**
   * 渲染图片列表
   * @param {Array} products - 产品数据数组
   */
  render(products) {
    if (!Array.isArray(products)) {
      console.error('产品数据必须是数组');
      return;
    }

    // 清空容器
    this.container.innerHTML = '';

    // 创建列表容器
    const list = document.createElement('ul');
    list.className = 'product-image-list';
    this.container.appendChild(list);

    // 计算项宽度
    const itemWidth = this.calculateItemWidth();
    
    // 处理省略号逻辑
    let displayProducts = [...products];
    let ellipsisAdded = false;

    // 渲染图片项
    displayProducts.forEach((product, index) => {
      // 创建列表项
      const listItem = document.createElement('li');
      listItem.className = 'product-image-item';
      listItem.style.width = itemWidth;

      // 创建图片容器（维持比例）
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'product-image-wrapper';

      // 创建链接
      const link = document.createElement('a');
      link.href = product.detailUrl || '#';
      link.title = product.altText || `查看${product.id}详情`;

      // 创建图片
      const img = document.createElement('img');
      img.src = product.imageUrl;
      img.alt = product.altText || `产品${product.id}`;
      img.loading = 'lazy';

      // 组装元素
      link.appendChild(img);
      imgWrapper.appendChild(link);
      listItem.appendChild(imgWrapper);
      list.appendChild(listItem);

      // 绑定点击事件
      if (this.config.onImageClick) {
        listItem.addEventListener('click', (e) => {
          e.preventDefault();
          this.config.onImageClick(product);
        });
      }
    });

    // 如果需要显示省略号（表示还有更多产品）
    if (this.config.showEllipsis && products.length > 0) {
      const ellipsisItem = document.createElement('li');
      ellipsisItem.className = 'product-ellipsis-item';
      ellipsisItem.style.width = itemWidth;
      ellipsisItem.textContent = '...';
      list.appendChild(ellipsisItem);
    }
  }

  /**
   * 更新配置并重新渲染
   * @param {Object} newConfig - 新配置
   * @param {Array} [products] - 产品数据
   */
  updateConfig(newConfig, products) {
    this.config = { ...this.config, ...newConfig };
    this.initStyles();
    if (products) {
      this.render(products);
    } else {
      // 更新现有项的宽度
      const items = document.querySelectorAll('.product-image-item, .product-ellipsis-item');
      const itemWidth = this.calculateItemWidth();
      items.forEach(item => {
        item.style.width = itemWidth;
      });
    }
  }
}