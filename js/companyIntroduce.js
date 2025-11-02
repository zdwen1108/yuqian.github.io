// 公司介绍页顶部图片
new MediaCarousel({
containerId: 'introduceComponent',
width: '100vw',
autoPlay: false,
interval: 4000,
showIndicators: false,
showControls: false,
items: [
    {
    type: 'image',
    url: './sources/imgs/yuqian01.png',
    alt: '水果'
    },
],
// 基础配置（小屏幕默认）
height: 'auto',
interval: 3000,
// 响应式断点配置
responsive: {
    576: { // 平板及以上
    height: '15vh',
    interval: 4000,
    showControls: true // 大屏幕显示控制按钮
    },
    1200: { // 桌面端
    height: '30vh',
    interval: 5000
    }
}
});

const companyData = {
        pageTitle: "公司介绍",
        companyName: "元气森林（北京）食品科技集团有限公司",
        companyDesc1: "成立于2016年，以\"一群有爱的人在一个有爱的组织创造有爱的产品\"为使命、\"整合全球资源为全球用户创造有爱的好产品\"为愿景，致力于为美好生活创造健康好产品。",
        companyDesc2: "目前旗下拥有元气森林气泡水、外星人电解质水、好自在、元气森林冰茶、外星人维生素水、元气森林乳茶等系列产品，深受广大消费者喜爱，销售网络覆盖全国，已出口欧洲、北美、东南亚等40多个国家和地区。",
        statistic1: "30+",
        statistic1Label: "覆盖全国超30个省、市、自治区",
        statistic2: "40+",
        statistic2Label: "出口美国、澳大利亚等40多个国家",
        companyImage: "https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/34939a0c42c44fc182e8ffcbac762e71.png~tplv-a9rns2rl98-24-95-exif:960:960.png?rcl=202511022153538B4A659549E1955645C2&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1762696433&x-signature=ua8rf6nh2gO1sX4fwDkCEe4glRo%3D"
    };