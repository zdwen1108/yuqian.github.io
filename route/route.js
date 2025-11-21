/**
 * 滚动到页面顶部工具函数（保留优化后的版本）
 * @param {Object} [options={}] - 滚动配置项
 * @param {string} [options.behavior='auto'] - 滚动行为：'auto' | 'smooth'
 */
function scrollToTop(options = {}) {
  const { behavior = 'auto' } = options;
  try {
    if (window.scrollTo && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, left: 0, behavior: behavior === 'smooth' ? 'smooth' : 'auto' });
    }
  } catch (e) {
    console.warn('滚动到顶部失败，使用降级方案:', e);
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.pageYOffset = 0;
}

// ========================= 路由配置 =========================
/**
 * 路由映射表：key = hash路由（不含#），value = 页面配置
 * - container: 页面容器ID（必须存在于DOM中）
 * - activeClass: 激活状态的CSS类名
 * - init: 页面初始化回调（可选，如加载数据）
 */
const routeConfig = {
  '/home': {
    container: 'home-page',
    activeClass: 'active',
    init: () => {
      console.log('首页初始化');
    }
  },
  '/about': {
    container: 'company_introduce',
    activeClass: 'active',
    init: () => {
      console.log('关于我们页面初始化');
    }
  },
  '/about/company': {
    container: 'company_introduce',
    activeClass: 'active',
    init: () => {
      console.log('公司介绍页面初始化');
    }
  },
  '/about/events': {
    container: 'company_events',
    activeClass: 'active',
    init: () => {
      console.log('公司大事记页面初始化');

    }
  },
  '/products': {
    container: 'company_product',
    activeClass: 'active',
    init: () => {
      console.log('产品页面初始化');
    }
  },
  '/news': {
    container: 'company_news',
    activeClass: 'active',
    init: () => {
      console.log('新闻页面初始化');
    }
  },
  '/news/detail': {
    container: 'company_news_detail',
    activeClass: 'active',
    init: (params) => {
      if (params.id) loadNewsDetail(params.id);
      const enElements = document.querySelectorAll('.en');
      const zhElements = document.querySelectorAll('.zh');
      const lang = localStorage.getItem('language');
      if (lang == 'en') {
        zhElements.forEach(el => {
          el.classList.add('hidden');
        });

        enElements.forEach(el => {
          el.classList.remove('hidden');
        });
      } else {
        zhElements.forEach(el => {
          el.classList.remove('hidden');
        });

        enElements.forEach(el => {
          el.classList.add('hidden');
        });
      }
    }
  },
  '/products/detail': {
    container: 'company_products_detail',
    activeClass: 'active',
    init: (params) => {
      if (params.id)
        loadProductsDetail(params.id);
      const enElements = document.querySelectorAll('.en');
      const zhElements = document.querySelectorAll('.zh');
      const lang = localStorage.getItem('language');
      if (lang == 'en') {
        zhElements.forEach(el => {
          el.classList.add('hidden');
        });

        enElements.forEach(el => {
          el.classList.remove('hidden');
        });
      } else {
        zhElements.forEach(el => {
          el.classList.remove('hidden');
        });

        enElements.forEach(el => {
          el.classList.add('hidden');
        });
      }
    }
  },
  '/media': {
    container: 'media_sources',
    activeClass: 'active',
    init: () => {
      console.log('媒体页面初始化');
    }
  },
  '/join': {
    container: 'join_work',
    activeClass: 'active',
    init: () => {
      console.log('加入我们页面初始化');
    }
  },
};

// 默认路由（当hash为空或不匹配时跳转）
const DEFAULT_ROUTE = '/home';

// ========================= 路由工具函数 =========================
/**
 * 解析hash路由，提取路径和参数
 * 示例：#/news-detail?id=123 → { path: '/news-detail', params: { id: '123' } }
 */
function parseHash() {
  const hash = window.location.hash.slice(1); // 去除#号
  const [path, queryStr] = hash.split('?');
  const params = {};

  // 解析查询参数（如?id=123&name=test）
  if (queryStr) {
    queryStr.split('&').forEach(item => {
      const [key, value] = item.split('=');
      if (key) params[key] = decodeURIComponent(value || '');
    });
  }

  return {
    path: path || DEFAULT_ROUTE,
    params
  };
}

/**
 * 切换页面（核心方法）
 * @param {string} targetPath - 目标路由路径（如'/news'）
 * @param {Object} [params={}] - 路由参数
 * @param {boolean} [replace=false] - 是否替换历史记录（true=不新增历史条目）
 */
function switchPage(targetPath, params = {}, replace = false) {
  // 1. 验证目标路由是否存在
  const route = routeConfig[targetPath];
  if (!route) {
    console.warn(`路由${targetPath}未配置，跳转到默认路由`);
    targetPath = DEFAULT_ROUTE;
    switchPage(targetPath, params, replace);
    return;
  }

  // 2. 隐藏所有页面容器，显示目标容器
  Object.values(routeConfig).forEach(config => {
    const container = document.getElementById(config.container);
    if (container) {
      container.classList.remove(config.activeClass);
      container.style.display = 'none';
    }
  });

  // 3. 激活目标页面
  const targetContainer = document.getElementById(route.container);
  if (targetContainer) {
    targetContainer.classList.add(route.activeClass);
    targetContainer.style.display = 'block';
    // 执行页面初始化回调（传入路由参数）
    if (typeof route.init === 'function') {
      route.init(params);
    }
  } else {
    console.error(`页面容器#${route.container}不存在`);
  }

  // 4. 更新URL（保持路由与页面同步）
  // 处理参数为 null/undefined 的情况
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    return '';
  }
  const queryStr = Object.entries(params)
    .filter(([_, value]) => {
      // 过滤掉值为 null/undefined/空字符串的项（可选，根据需求调整）
      return value !== null && value !== undefined && value !== '';
    })
    .map(([key, value]) => {
      // 处理数组值（例如 { tags: [1,2] } 转为 tags=1&tags=2）
      if (Array.isArray(value)) {
        return value
          .filter(item => item !== null && item !== undefined) // 过滤数组中空值
          .map(item => `${key}=${encodeURIComponent(item)}`)
          .join('&');
      }
      // 处理普通值（字符串/数字/布尔值）
      return `${key}=${encodeURIComponent(String(value))}`;
    })
    .join('&');

  const newHash = `${targetPath}${queryStr ? `?${queryStr}` : ''}`;

  if (replace) {
    window.history.replaceState({ page: targetPath.slice(1), id: params.id }, '', `#${newHash}`)
  } else {
    window.history.pushState({ page: targetPath.slice(1), id: params.id }, '', `#${newHash}`)
  }
  if (targetPath.includes("news/detail")) {
    navbar.updateActiveItem('/news');
  } else if (targetPath.includes("products/detail")) {
    navbar.updateActiveItem('/products');
  } else {
    navbar.updateActiveItem(targetPath);
  }
  // 5. 滚动到顶部
  scrollToTop({ behavior: 'smooth' });
}

// ========================= 路由初始化与事件监听 =========================
/**
 * 初始化路由（页面加载时执行）
 */
function initRouter() {
  // 解析当前路由并切换页面
  const { path, params } = parseHash();
  switchPage(path, params, false); // replace=true：不新增历史记录，避免回退到空路由

  // 1. 监听hash变化（手动修改hash或点击锚点时触发）
  window.addEventListener('hashchange', () => {
    const { path, params } = parseHash();
    switchPage(path, params, false);
    navbar.updateActiveItem(path);
  });

  // 2. 监听浏览器前进/后退（popstate事件）
  window.addEventListener('popstate', (event) => {
    if (event.defaultPrevented) return;
    event.preventDefault();

    // 安全提取历史状态（处理state为null的情况）
    const historyState = event.state || {};
    const page = historyState.page || '';
    // 从历史状态中获取页面标识，匹配路由
    const targetPath = page ? `/${page}` : DEFAULT_ROUTE;
    const params = { id: historyState.id }; // 传递详情页ID等参数

    navbar.updateActiveItem(targetPath);
    switchPage(targetPath, params, false);
  });
}

// ========================= 页面初始化 =========================
// DOM就绪后初始化路由（确保页面容器已存在）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRouter);
} else {
  initRouter();
}

// ========================= 暴露全局API（可选） =========================
/**
 * 手动跳转路由（供按钮点击等场景调用）
 * @param {string} path - 目标路由（如'/news-detail'）
 * @param {Object} [params={}] - 路由参数（如{ id: 123 }）
 * @param {boolean} [replace=false] - 是否替换历史记录
 */
window.navigateTo = (path, params = {}, replace = false) => {
  if (routeConfig[path]) {
    switchPage(path, params, replace);
  } else {
    console.warn(`路由${path}未配置`);
  }
};

// 保留原有的scrollToTop全局方法
window.scrollToTop = scrollToTop;