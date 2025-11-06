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
    imageUrl: 'https://www.fruitexpo.cn/ueditor/php/upload/image/20240507/1715050718175006.jpg',
    imageAlt: '煜谦集团携手合作伙伴',
    title: '煜谦集团携手合作伙伴，共拓榴莲产业新视野',
    subtitle: '4月22日，京东超市、KAF集团、煜谦集团在泰国尖竹汶府，中泰榴莲产业园举行了战略合作签约仪式。',
    detailUrl: '/revolutionary-event-detail.html',
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
    imageUrl: './sources/imgs/zhunong.png',
    imageAlt: '助力乡村振兴',
    title: '特色产业 助力乡村振兴',
    subtitle: '引进煜谦,打造精品水果产业园。',
    detailUrl: '/revolutionary-event-detail.html',
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
    imageUrl: './sources/imgs/zhunong.png',
    imageAlt: '助力乡村振兴',
    title: '特色产业 助力乡村振兴',
    subtitle: '引进煜谦,打造精品水果产业园。',
    detailUrl: '/revolutionary-event-detail.html',
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


  // 初始化新闻资讯列表
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
      imageUrl: 'https://mediabluk.cnr.cn/img/cnr/CNRCDP/2022/1119/1a122fe04d8b2166884175996436803310.png?auth=61d54b0c56370ac68e7e1b5cf6d75dee',
      title: '首批空运包机车厘子抵郑 京东生鲜携手煜谦集团全链路保障新鲜上市',
      content: '11月16日，京东生鲜、七鲜超市、1号会员店联合以水果贸易为主营业务的国际贸易公司煜谦集团从产地包机空运的智利车厘子到达郑州。本次到货的智利车厘子共近万件，主要包含SANTINA和ROYALDAWN两大品种，为消费者提供更丰富的冬日新鲜水果选择。',
      time: '2025-10-25',
      link: '/news/detail/123' // 跳转链接
    },
    {
      imageUrl: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/AA0OOA6ibPCnqJ6xuecI0ld3svLWealYUAcaUy9VtkxpU2PEqWxAdIiatFjZL5vvh3PGnKL10oFA9NcBsOXqn1Rg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0',
      title: '煜谦葡提负责人谈葡萄新品种权，水果行业如何以品种破局？',
      content: '8月底上海举办的2025中国国际水果展上，煜谦集团现场展示了其近年引入国内种植的专有葡萄品种秋脆（AUTUMNCRISP®）和甜蜜地球（Sweet Globe）品牌葡萄等，吸引了大量从业者关注。2024年，煜谦成为国内首家加入太阳世界Sun World俱乐部模式的经销合作伙伴，以及BLOOM FRESH公司的中国一级授权商。这两家行业领军企业的旗舰品种正是通过上述品牌进行市场推广。 ',
      time: '2025-10-24',
      link: '/news/detail/124' // 跳转链接
    },
    {
      imageUrl: 'https://www.fruitexpo.cn/ueditor/php/upload/image/20240507/1715050718175006.jpg',
      title: '煜谦集团携手合作伙伴，共拓榴莲产业新视野',
      content: '4月22日，京东超市、KAF集团、煜谦集团在泰国尖竹汶府，中泰榴莲产业园举行了战略合作签约仪式。',
      time: '2025-10-24',
      link: '/news/detail/125' // 跳转链接
    }
    // 可根据接口返回自动增加更多卡片
  ];

  // 渲染新闻资讯列表（数量由apiData长度决定）
  newsCards.renderFromApi(apiData);

  //跳转公司新闻页面
  function toCompanyNews(){
    window.location.href = '#';
  }

  // 初始化产品列表
  const imageList = new ProductImageList({
    container: '#product-container',
    itemsPerRow: 6,          // 每行显示个数
    spacing: 5,             // 水平间距px
    rowGap: 10,              // 垂直间距px
    showEllipsis: true,
    imagePadding: 40,         // 图片内边距5px
    imageAspectRatio: 4/3,   // 宽高比3:4（竖图）
    imageFit: 'cover'
  });

  // 模拟产品数据
  const mockProducts = [
    {id: '', imageUrl: './sources/products/chelizi.png', detailUrl: ''},
    {id: '', imageUrl: './sources/products/grape.png', detailUrl: ''},
    {id: '', imageUrl: './sources/products/lanmei.png', detailUrl: ''},
    {id: '', imageUrl: './sources/products/pineapple.png', detailUrl: ''},
    {id: '', imageUrl: './sources/products/apple.png', detailUrl: ''},
    {id: '', imageUrl: './sources/products/citrusfruit.png', detailUrl: ''},
    {id: '', imageUrl: './sources/products/durian.png', detailUrl: ''},
    {id: '', imageUrl: './sources/products/stonefruits.png', detailUrl: ''}
  ]

  // 渲染列表
  imageList.render(mockProducts);

  // 合作商列表
  new PartnerMediaDisplay("partnerCarousel",
    {
      "media": [
        {"name": "企业A", "logo": "https://picsum.photos/seed/partner1/200/80", "url": "https://example.com/1"},
        {"name": "企业B", "logo": "https://picsum.photos/seed/partner2/200/80", "url": "https://example.com/2"},
        {"name": "企业C", "logo": "https://picsum.photos/seed/partner3/200/80", "url": "https://example.com/3"},
        {"name": "企业D", "logo": "https://picsum.photos/seed/partner4/200/80", "url": "https://example.com/4"},
        {"name": "企业E", "logo": "https://picsum.photos/seed/partner5/200/80", "url": "https://example.com/5"},
        {"name": "企业F", "logo": "https://picsum.photos/seed/partner6/200/80", "url": "https://example.com/6"}
      ],
      "scrollMode": false,
      "itemWidth": 200,
      "itemHeight": 100,
      "autoPlayDelay": 2000,
      "gap": 30
    }
  );