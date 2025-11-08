document.addEventListener('DOMContentLoaded', function () {
  // 首页轮播组件
  new MediaCarousel({
    containerId: 'carouselContainer',
    width: '100vw',
    autoPlay: true,
    interval: 4000,
    showIndicators: true,
    showControls: true,
    indicatorStyle: 'bar',  // 可选 'dot' 或 'bar'
    controlStyle: 'rounded', // 可选 'default'、'rounded' 或 'outline'
    items: [
      {
        type: 'image',
        url: './sources/imgs/yuqian01.png',
        alt: '水果'
      },
      {
        type: 'image',
        url: './sources/imgs/yuqian02.png',
      },
      {
        type: 'image',
        url: './sources/imgs/yuqian03.png',
        alt: '水果'
      }
    ],
    // 基础配置（小屏幕默认）
    height: 'auto',
    interval: 3000,
    // 响应式断点配置
    responsive: {
      576: { // 平板及以上
        height: '50vh',
        interval: 4000,
        showControls: true // 大屏幕显示控制按钮
      },
      1200: { // 桌面端
        height: '70vh',
        interval: 5000
      }
    }
  });

  // 初始化图片文字组件
  new imageTextComponent({
    containerId: 'revolutionaryEvent1',
    imageUrl: './sources/imgs/companyNews/PrizeKing.png',
    imageAlt: 'PrizeKing合作共赢，开启中智企业合作新模式！',
    title_zh: '煜谦集团携手合作伙伴，共拓榴莲产业新视野',
    title_en: 'PrizeKing cooperates for mutual benefit, initiating a new model of China-Chile enterprise cooperation!',
    subtitle_zh: '10 月 24 日，智利周首天，我们和现场观众一起见证了 “Prizeking 云南蓝莓上市启动仪式”。',
    subtitle_en: 'On October 24th, the first day of Chile Week, we witnessed the "Prizeking Yunnan Blueberry Launch Ceremony" together with the on-site audience.',
    detailUrl: '/news',
    detailId: '1',
    // 可自定义尺寸
    dimensions: {
      width: '74%',
      height: '24vw',
      imageWidth: '50%'
    },
    // 可自定义样式
    styles: {
      title: {
        fontSize: '32px',
        color: '#2c3e50',
        marginBottom: '30px'
      },
      button: {
        bgColor: '#f8f9fa',
        borderColor: '#2c3e50',
        hoverBgColor: '#2c3e50'
      }
    }
  });

  new imageTextComponent({
    containerId: 'revolutionaryEvent2',
    imageUrl: './sources/imgs/companyNews/SweetEarth.png',
    imageAlt: '',
    title_zh: '甜蜜地球™上市发布会在安徽滁州成功举办',
    title_en: 'The Sweet Earth™ Launch Conference was successfully held in Chuzhou, Anhui Province.',
    subtitle_zh: '9 月 9 日，一场超燃的 “甜蜜地球™” 上市发布会暨国际经销商大会在“醉美滁州”火热开启！',
    subtitle_en: `On September 9th, an exciting "Sweet Earth™" launch conference and international distributors' conference kicked off in "Charming Chuzhou"!`,
    detailUrl: '/news',
    detailId: '3',
    // 可自定义尺寸
    dimensions: {
      width: '74%',
      height: '24vw',
      imageWidth: '50%'
    },
    // 可自定义样式
    styles: {
      title: {
        fontSize: '32px',
        color: '#2c3e50',
        marginBottom: '30px'
      },
      button: {
        bgColor: '#f8f9fa',
        borderColor: '#2c3e50',
        hoverBgColor: '#2c3e50'
      }
    }
  });

  new imageTextComponent({
    containerId: 'revolutionaryEvent3',
    imageUrl: './sources/imgs/companyNews/OZBLU.png',
    imageAlt: '',
    title_zh: '三曜共聚·鲜启蓝莓新势力',
    title_en: 'Three Suns Converge · Freshly Launching the New Force of Blueberries',
    subtitle_zh: '2025 年 8 月 30 日，全球高端蓝莓品牌 OZBLU 携手永辉超市与煜谦集团，于龙湖・上海奉贤天街隆重举办 “三曜共聚・鲜启蓝莓新势力” 蓝莓开季盛典。',
    subtitle_en: 'On August 30, 2025, the global high-end blueberry brand OZBLU, together with Yonghui Supermarket and Yuqian Group, grandly held the "Three Brightness Gathered · Freshly Launching the New Force of Blueberries" blueberry season-opening ceremony at Longfor · Shanghai Fengxian Tianjie.',
    detailUrl: '/news',
    detailId: '5',
    // 可自定义尺寸
    dimensions: {
      width: '74%',
      height: '24vw',
      imageWidth: '50%'
    },
    // 可自定义样式
    styles: {
      title: {
        fontSize: '32px',
        color: '#2c3e50',
        marginBottom: '30px'
      },
      button: {
        bgColor: '#f8f9fa',
        borderColor: '#2c3e50',
        hoverBgColor: '#2c3e50'
      }
    }
  });


  // 初始化主页新闻资讯列表
  const newsCards = new InfoCardList('newsCardContainer', {
    cardWidth: '32%',
    imageHeight: '17vw',
    marginBottom: '20px',
    titleFontSize: '21px',
    showTime: false,
    clickable: true // 全局默认可点击
  });

  // 模拟接口返回数据（实际项目替换为真实接口）
  const apiData = [
    {
      detailId: '1',
      imageUrl: './sources/imgs/companyNews/lanbaoshi.jpg',
      title_zh: 'IFG六品种合法化项目申请已正式截止',
      title_en: 'The application for the IFG six-variety legalization project has officially closed.',
      description_zh: 'IFG 六品种 (以商标 SWEET SAPPHIRE™、甜蜜蓝宝石™销售) 合法化计划的申请窗口现已关闭。BLOOM FRESH 感谢所有在此期间提出合法化申请的种植者，以及我们的合作伙伴百果种业、好果云和煜谦农业，为支持合法、安全、高品质和繁荣的中国鲜食葡萄行业所做的不懈努力。我们将随后发布关于我们努力保护和支持该品种、品牌的进一步信息。',
      description_en: 'The application window for the legalization plan of the six IFG varieties (sold under the trademarks SWEET SAPPHIRE™ and 甜蜜蓝宝石™) is now closed. BLOOM FRESH would like to thank all growers who submitted legalization applications during this period, as well as our partners Baiguo Seed Industry, Haoguo Cloud, and Yuqian Agriculture, for their unremitting efforts in supporting a legal, safe, high-quality, and prosperous Chinese fresh table grape industry. We will subsequently release further information on our efforts to protect and support these varieties and brands.',
      time: '2025-11-4',
      link: '/news/detail/2'
    },
    {
      detailId: '4',
      imageUrl: './sources/imgs/companyNews/avocado_port.png',
      title_zh: '新季2025-2026年度第一柜智利牛油果靠港',
      title_en: 'The first container of Chilean avocados for the new 2025-2026 season has arrived at the port.',
      description_zh: '9 月 8 日，煜谦集团 2025-2026 产季第一柜智利牛油果靠上海港。这也是新产季到达中国市场的第一柜智利牛油果。作为中国主要的牛油果进口商和分销商，目前，煜谦集团在全国十二个城市设有档口及分仓，并在北京，上海，广州等主要城市拥有自建的牛油果催熟库。形成了批发，零售，餐饮，电商等多渠道体系齐头并进的全国牛油果产业布局。',
      description_en: "On September 8th, Yuqian Group's first container of Chilean avocados for the 2025-2026 season arrived at Shanghai Port. This is also the first container of Chilean avocados to reach the Chinese market in the new season. As a major avocado importer and distributor in China, Yuqian Group currently has stalls and warehouses in twelve cities across the country, and owns self-built avocado ripening facilities in major cities such as Beijing, Shanghai, and Guangzhou. It has formed a nationwide avocado industry layout with multiple channels including wholesale, retail, catering, and e-commerce advancing in parallel.",
      time: '2025-9-9',
      link: '/news/detail/4' // 跳转链接
    },
    {
      detailId: '8',
      imageUrl: './sources/imgs/companyNews/cherry.png',
      title_zh: '四季淬炼·终成甜蜜|陕西铜川基地车厘子成长日记',
      title_en: 'Tempered by the Four Seasons · Finally Blossoming into Sweetness | Growth Diary of Cherries at the Tongchuan Base in Shaanxi',
      description_zh: '2025 年1月 24 日 星期五 雪,冬日垫伏:在冻土下埋下甜蜜的梦 今天基地又落雪了,整片园子像盖了白棉被,拨开雪层摸了摸树干,底下的根系正憋着劲往下钻 -- 零下 15℃的冻土下,这些「沉睡的勇士,正把寒冷化作养分,每一道根须的伸展,都是在为春天储能量~',
      description_en: 'Friday, January 24, 2025, Snowy. Winter Hibernation: Burying Sweet Dreams Under Frozen Soil. It snowed again at the base today. The entire garden is like being covered with a white quilt. I pushed aside the snow and touched the tree trunk; the roots underneath are struggling to drill downwards. Under the frozen soil at minus 15℃, these "sleeping warriors" are turning the cold into nutrients. Every stretch of a root is storing energy for spring~',
      time: '2025-6-11',
      link: '/news/detail/8' // 跳转链接
    }
  ];

  // 渲染新闻资讯列表（数量由apiData长度决定）
  newsCards.renderFromApi(apiData);

  // 初始化产品列表
  const imageList = new ProductImageList({
    container: '#product-container',
    itemsPerRow: 6,          // 每行显示个数
    spacing: 5,             // 水平间距px
    rowGap: 10,              // 垂直间距px
    showEllipsis: true,
    imagePadding: 40,         // 图片内边距5px
    imageAspectRatio: 4 / 3,   // 宽高比3:4（竖图）
    imageFit: 'cover'
  });

  // 模拟产品数据
  const mockProducts = [
    { id: '', imageUrl: './sources/products/chelizi.png', detailUrl: '' },
    { id: '', imageUrl: './sources/products/grape.png', detailUrl: '' },
    { id: '', imageUrl: './sources/products/lanmei.png', detailUrl: '' },
    { id: '', imageUrl: './sources/products/pineapple.png', detailUrl: '' },
    { id: '', imageUrl: './sources/products/apple.png', detailUrl: '' },
    { id: '', imageUrl: './sources/products/citrusfruit.png', detailUrl: '' },
    { id: '', imageUrl: './sources/products/durian.png', detailUrl: '' },
    { id: '', imageUrl: './sources/products/stonefruits.png', detailUrl: '' }
  ]

  // 渲染列表
  imageList.render(mockProducts);

  // 滚动到顶部的工具函数
  function scrollToTop() {
    // 方案1：直接滚动（大部分浏览器支持）
    if (window.scrollTo && typeof window.scrollTo === 'function') {
      window.scrollTo({
        top: 0,
        behavior: 'auto' // 直接跳转，无动画（如需动画可改为 'smooth'）
      });
    }

    // 兼容不支持 scrollTo 配置项的老旧浏览器（如IE11及以下）
    // 针对不同文档模式的兼容（标准模式/怪异模式）
    if (document.documentElement.scrollTop !== 0) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body.scrollTop !== 0) {
      document.body.scrollTop = 0;
    }

    // 兼容 Safari 某些版本的特殊情况
    if (window.pageYOffset !== 0) {
      window.pageYOffset = 0;
    }
  }

  // 监听 hash 变化事件（路由切换触发）
  window.addEventListener('hashchange', scrollToTop);

  // 页面加载时初始化路由
  window.addEventListener('load', scrollToTop);

  // 处理浏览器前进后退事件
  window.addEventListener('popstate', (event) => {
    if (event.state) {
      switch (event.state.page) {
        case 'home-page':
          pageChange('home-page');
          break;
        case 'company_introduce':
          pageChange('ompany_introduce');
          break;
        case 'company_events':
          pageChange('company_events');
          break;
        case 'company_cultures':
          pageChange('company_cultures');
          break;
        case 'company_product':
          pageChange('company_product');
          break;
        case 'company_news':
          pageChange('company_news');
          break;
        case 'company_news_detail':
          loadNewsDetail(event.state.id);
          break;
        case 'media_sources':
          pageChange('media_sources');
          break;
        case 'join_work':
          pageChange('join_work');
          break;
        default:
          break;
      }
    }
  });

  // 页面切换
  function pageChange(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page-content').forEach(page => {
      page.classList.remove('active');
      page.style.display = 'none';
    });

    // 显示当前页面
    const detailPage = document.getElementById(pageId);
    detailPage.classList.add('active');
    detailPage.style.display = 'block';
  }
});

