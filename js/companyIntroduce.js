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
            url: './sources/imgs/yuqianTopImage.png',
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