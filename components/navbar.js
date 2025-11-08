class Navbar {
  /**
   * 元气森林导航栏组件
   * @param {Object} options - 导航栏配置参数
   * @param {string} options.containerId - 容器ID
   * @param {Object} options.logo - Logo配置
   * @param {string} options.logo.text.zh - Logo中文文本
   * @param {string} options.logo.text.en - Logo英文文本
   * @param {string} [options.logo.image] - Logo图片地址
   * @param {string} [options.logo.fontSize='1.5rem'] - Logo字体大小
   * @param {string} [options.logo.imageWidth='auto'] - Logo图片宽度
   * @param {string} [options.logo.imageHeight='40px'] - Logo图片高度
   * @param {string} [options.defaultLang='zh'] - 默认语言 ('zh' 或 'en')
   * @param {string} [options.itemFontSize='14px'] - 菜单项字体大小
   * @param {string} [options.dropdownFontSize='14px'] - 下拉项字体大小
   * @param {Array} options.menuItems - 菜单项配置
   * @param {string} options.menuItems[].key - 菜单项唯一标识
   * @param {string} options.menuItems[].zh - 中文名称
   * @param {string} options.menuItems[].en - 英文名称
   * @param {string} options.menuItems[].route - 路由地址
   * @param {boolean} [options.menuItems[].hasDropdown=false] - 是否有下拉菜单
   * @param {boolean} [options.menuItems[].clickable=true] - 是否可点击跳转
   * @param {Array} [options.menuItems[].dropdown] - 下拉菜单项
   * @param {string} options.menuItems[].dropdown[].key - 下拉项唯一标识
   * @param {string} options.menuItems[].dropdown[].zh - 下拉项中文名称
   * @param {string} options.menuItems[].dropdown[].en - 下拉项英文名称
   * @param {string} options.menuItems[].dropdown[].route - 下拉项路由地址
   * @param {boolean} [options.menuItems[].dropdown[].clickable=true] - 是否可点击跳转
   * @param {Function} [options.onRouteChange] - 路由变化回调
   * @param {Function} [options.onLangChange] - 语言变化回调
   */
  constructor(options) {
    // 默认配置
    this.defaults = {
      containerId: 'navbar-container',
      logo: {
        text: '煜谦贸易',
        image: '',
        fontSize: '1.5rem',
        imageWidth: 'auto',
        imageHeight: '40px'
      },
      defaultLang: 'zh',
      itemFontSize: '14px',
      dropdownFontSize: '14px',
      menuItems: [],
      onRouteChange: () => {},
      onLangChange: () => {}
    };

    // 合并配置
    this.config = { ...this.defaults, ...options };
    // 为菜单项添加默认clickable属性
    this.config.menuItems = this.config.menuItems.map(item => ({
      clickable: true,
      ...item,
      // 为下拉项添加默认clickable属性
      dropdown: item.dropdown ? item.dropdown.map(subItem => ({
        clickable: true,
        ...subItem
      })) : []
    }));
    
    this.currentLang = this.config.defaultLang;
    this.container = document.getElementById(this.config.containerId);

    if (!this.container) {
      console.error(`未找到ID为${this.config.containerId}的容器元素`);
      return;
    }

    // 初始化导航栏
    this.init();
  }

  /**
   * 渲染菜单项
   */
  renderMenuItems() {
    return this.config.menuItems.map(item => `
      <li class="menu-item ${item.hasDropdown ? 'has-dropdown' : ''}">
        <a href="${item.clickable ? (item.route || '#') : '#'}" 
           class="menu-link ${!item.clickable ? 'not-clickable' : ''}" 
           data-key="${item.key}"
           style="font-size: ${this.config.itemFontSize}">
          ${this.currentLang === 'zh' ? item.zh : item.en}
        </a>
        ${item.hasDropdown && item.dropdown ? this.renderDropdown(item.dropdown) : ''}
      </li>
    `).join('');
  }

  /**
   * 渲染下拉菜单
   * @param {Array} items - 下拉菜单项
   */
  renderDropdown(items) {
    return `
      <ul class="dropdown-menu">
        ${items.map(item => `
          <li class="dropdown-item">
            <a href="${item.clickable ? (item.route || '#') : '#'}" 
               class="dropdown-link ${!item.clickable ? 'not-clickable' : ''}" 
               data-key="${item.key}"
               style="font-size: ${this.config.dropdownFontSize}">
              ${this.currentLang === 'zh' ? item.zh : item.en}
            </a>
          </li>
        `).join('')}
      </ul>
    `;
  }

  /**
   * 注入样式 - 增加不可点击样式
   */
  injectStyles() {
    // 避免重复注入样式
    if (document.getElementById('yuanqi-navbar-styles')) return;

    const style = document.createElement('style');
    style.id = 'yuanqi-navbar-styles';
    style.textContent = `
      /* 原有样式保持不变 */
      .navbar-logo-link {
        color: inherit;
        text-decoration: none;
      }
      .navbar-logo-link:hover {
        color: inherit;
      }
      .yuanqi-navbar {
        position: fixed; 
        top: 0;
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid #e5e7eb;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        z-index: 1000;
      }
      
      .navbar-content {
        max-width: 1920px;
        margin: 0 auto;
        padding-left: 80px;
        padding-right: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
      }
      
      .navbar-logo {
        display: flex;
        align-items: center;
        font-weight: bold;
      }
      
      .navbar-logo img {
        margin-right: 8px;
        object-fit: contain;
      }
      
      .navbar-logo span {
        vertical-align: middle;
      }
      
      .navbar-menu {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      
      .menu-item {
        position: relative;
        margin: 0 12px;
      }
      
      .menu-link {
        display: block;
        padding: 8px 12px;
        color: #333;
        text-decoration: none;
        transition: all 0.3s;
      }
      
      .menu-link:hover, .menu-link.active {
        color: #0066cc;
        background-color: #f5f7fa;
        border-radius: 4px;
      }
      
      /* 下拉菜单样式 */
      .has-dropdown:hover .dropdown-menu {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
      
      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 180px;
        background-color: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        list-style: none;
        margin: 0;
        padding: 8px 0;
        visibility: hidden;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        z-index: 1000;
      }
      
      .dropdown-item {
        margin: 0;
      }
      
      .dropdown-link {
        display: block;
        padding: 8px 16px;
        color: #333;
        text-decoration: none;
        transition: all 0.3s;
      }
      
      .dropdown-link:hover {
        background-color: #f5f7fa;
        color: #0066cc;
      }
      
      /* 语言切换样式 */
      .language-switch {
        display: flex;
        align-items: center;
        margin-left: 20px;
      }
      
      .lang-btn {
        background: none;
        border: none;
        padding: 4px 8px;
        margin: 0 4px;
        cursor: pointer;
        font-size: 14px;
        color: #333;
        border-radius: 4px;
        transition: all 0.3s;
      }
      
      .lang-btn:hover, .lang-btn.active {
        background-color: #f5f7fa;
        color: #0066cc;
      }
      
      /* 移动端菜单按钮 */
      .menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        z-index: 1001;
      }
      
      .menu-toggle span {
        display: block;
        width: 24px;
        height: 2px;
        background-color: #333;
        margin: 6px 0;
        transition: all 0.3s;
      }
      
      /* 新增: 不可点击样式 */
      .not-clickable {
        cursor: default;
        pointer-events: none;
        opacity: 0.8;
      }
      
      /* 响应式设计 */
      @media (max-width: 768px) {
        .navbar-menu {
          position: absolute;
          top: 70px;
          left: 0;
          right: 0;
          flex-direction: column;
          background-color: #fff;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .navbar-menu.active {
          max-height: 500px;
        }
        
        .menu-item {
          margin: 0;
          border-bottom: 1px solid #f5f7fa;
        }
        
        .menu-link {
          padding: 12px 20px;
        }
        
        .dropdown-menu {
          position: static;
          visibility: visible;
          opacity: 1;
          transform: none;
          box-shadow: none;
          border: none;
          padding-left: 20px;
        }
        
        .language-switch {
          margin-left: 0;
          margin-right: 16px;
        }
        
        .menu-toggle {
          display: block;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * 绑定事件 - 增加对不可点击项的处理
   */
  bindEvents() {
    // 移动端菜单切换
    const menuToggle = this.container.querySelector('.menu-toggle');
    const menu = this.container.querySelector('.navbar-menu');
    
    if (menuToggle && menu) {
      menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        // 汉堡菜单动画效果
        const spans = menuToggle.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('-rotate-45');
      });
    }

    // 语言切换
    const langBtns = this.container.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        if (lang && lang !== this.currentLang) {
          this.currentLang = lang;
          this.render();
          this.bindEvents();
          this.config.onLangChange(lang);
        }
      });
    });

    // 菜单点击事件 - 只处理可点击项
    const menuLinks = this.container.querySelectorAll('.menu-link:not(.not-clickable), .dropdown-link:not(.not-clickable)');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const route = link.getAttribute('href');
        if (route && route !== '#') {
          e.preventDefault();
          this.config.onRouteChange(route);
          this.setActiveItem(route);
        }

        // 移动端点击后关闭菜单
        if (menu && menu.classList.contains('active')) {
          menu.classList.remove('active');
          if (menuToggle) {
            const spans = menuToggle.querySelectorAll('span');
            spans[0].classList.remove('rotate-45');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('-rotate-45');
          }
        }
      });
    });
  }

  /**
   * 新增: 外部更新选中状态的方法
   * 用于通过非导航栏点击方式改变页面时更新导航选中状态
   * @param {string} route - 路由地址
   */
  updateActiveItem(route) {
    this.setActiveItem(route);
  }

  // 其他原有方法保持不变...
  init() {
    this.render();
    this.bindEvents();
    this.setActiveItem();
  }

  render() {
    this.container.innerHTML = `
      <div class="yuanqi-navbar">
        <div class="navbar-content">
          <!-- Logo -->
          <div class="navbar-logo" style="font-size: ${this.config.logo.fontSize}">
            <a href="#" class="navbar-logo-link" style="text-decoration: none; display: flex;align-items: center;">
              ${this.config.logo.image ? 
              `<img src="${this.config.logo.image}" 
                    alt="${this.currentLang === 'zh' ? this.config.logo.text.zh : this.config.logo.text.en}"
                    style="width: ${this.config.logo.imageWidth}; 
                           height: ${this.config.logo.imageHeight}">` : ''
              }
              ${this.config.logo.text ? `<span>${this.currentLang === 'zh' ? this.config.logo.text.zh : this.config.logo.text.en}</span>` : ''}
            </a>
          </div>
          
          <!-- 导航菜单 -->
          <ul class="navbar-menu">
            ${this.renderMenuItems()}
          </ul>
          
          <!-- 语言切换 -->
          <div class="language-switch">
            <button class="lang-btn ${this.currentLang === 'zh' ? 'active' : ''}" data-lang="zh">中</button>
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">En</button>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <button class="menu-toggle" aria-label="菜单">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    `;

    // 添加样式
    this.injectStyles();
  }

  setActiveItem(currentRoute) {
    // 如果没有指定路由，使用当前页面URL
    const route = currentRoute || window.location.pathname;
    
    // 移除所有激活状态
    document.querySelectorAll('.menu-link, .dropdown-link').forEach(link => {
      link.classList.remove('active');
    });

    // 设置激活状态
    document.querySelectorAll(`.menu-link[href="${route}"], .dropdown-link[href="${route}"]`)
      .forEach(link => {
        link.classList.add('active');
        // 如果是下拉项，同时激活父菜单
        if (link.classList.contains('dropdown-link')) {
          const parentLink = link.closest('.has-dropdown').querySelector('.menu-link');
          if (parentLink) parentLink.classList.add('active');
        }
      });
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    // 确保更新后clickable属性仍然存在
    this.config.menuItems = this.config.menuItems.map(item => ({
      clickable: true,
      ...item,
      dropdown: item.dropdown ? item.dropdown.map(subItem => ({
        clickable: true,
        ...subItem
      })) : []
    }));
    this.render();
    this.bindEvents();
    this.setActiveItem();
  }
}