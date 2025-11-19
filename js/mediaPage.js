// 媒体资源页顶部图片
new MediaCarousel({
    containerId: 'mediaTopImage',
    width: '100vw',
    autoPlay: false,
    showIndicators: false,
    showControls: false,
    items: [
        {
            type: 'image',
            url: './sources/imgs/yuqianTopImage.png',
            alt: ''
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
// 全局状态管理
const state = {
    currentType: 'image', // 当前选中的媒体类型
    page: 1, // 当前页码
    pageSize: 6, // 每页加载数量
    hasMore: true, // 是否还有更多数据
    loading: false // 是否正在加载中
};

// DOM 元素
const tabs = document.querySelectorAll('.tab');
const imageGrid = document.getElementById('image-grid');
const videoGrid = document.getElementById('video-grid');
const viewMoreBtn = document.getElementById('view-more-btn');
const mediaModal = document.getElementById('media-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const modalMeta = document.getElementById('modal-meta');

// 初始化页面
init();

// 初始化函数
function init() {
    // 绑定标签切换事件
    bindTabEvent();
    // 绑定查看更多事件
    bindViewMoreEvent();
    // 绑定弹窗事件
    bindModalEvents();
    // 加载初始数据
    loadMediaData();
}

/**
 * 绑定标签切换事件
 */
function bindTabEvent() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.getAttribute('data-type');
            if (state.currentType === type) return;

            // 更新状态
            state.currentType = type;
            state.page = 1;
            state.hasMore = true;

            // 更新UI
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (type === 'image') {
                imageGrid.style.display = 'grid';
                videoGrid.style.display = 'none';
            } else {
                videoGrid.style.display = 'grid';
                imageGrid.style.display = 'none';
            }

            // 清空当前网格并加载新类型数据
            const currentGrid = type === 'image' ? imageGrid : videoGrid;
            currentGrid.innerHTML = '<div class="loading">加载中...</div>';
            loadMediaData();
        });
    });
}

/**
 * 绑定查看更多事件
 */
function bindViewMoreEvent() {
    viewMoreBtn.addEventListener('click', () => {
        if (state.loading || !state.hasMore) return;
        state.page++;
        loadMediaData();
    });
}

/**
 * 绑定弹窗相关事件
 */
function bindModalEvents() {
    // 关闭按钮事件
    modalClose.addEventListener('click', closeModal);

    // 点击遮罩层关闭
    mediaModal.addEventListener('click', (e) => {
        if (e.target === mediaModal) {
            closeModal();
        }
    });

    // 按ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mediaModal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * 打开媒体预览弹窗（增强放大效果）
 * @param {Object} item - 媒体项数据
 * @param {string} type - 媒体类型
 */
function openModal(item, type) {
    // 清空弹窗内容
    modalBody.innerHTML = '';

    // 根据类型创建不同的媒体元素（最大化显示）
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.title;
        img.className = 'modal-image';
        // 加载完成后确保居中显示
        img.onload = () => {
            modalBody.scrollTop = 0;
            modalBody.scrollLeft = 0;
        };
        modalBody.appendChild(img);
    } else {
        const video = document.createElement('video');
        video.src = item.url;
        video.controls = true;
        video.className = 'modal-video';
        video.autoplay = true;
        video.muted = false; // 取消静音，方便直接播放
        // 视频加载完成后调整尺寸
        video.onloadedmetadata = () => {
            modalBody.scrollTop = 0;
            modalBody.scrollLeft = 0;
        };
        modalBody.appendChild(video);
    }

    // 显示媒体信息（悬浮显示）
    modalMeta.innerHTML = `
                <div class="modal-meta-title">${item.title}</div>
                <div class="modal-meta-details">
                    <span>上传时间：${formatDate(item.createTime)}</span>
                    <span>文件大小：${item.size}MB</span>
                    <span>ID：${item.id}</span>
                </div>
            `;

    // 显示弹窗
    mediaModal.classList.add('active');
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
}

/**
 * 关闭弹窗
 */
function closeModal() {
    mediaModal.classList.remove('active');
    // 恢复背景滚动
    document.body.style.overflow = '';

    // 停止视频播放并重置
    const video = modalBody.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    // 清空媒体信息
    modalMeta.innerHTML = '';
}

/**
 * 加载媒体数据（核心接口请求逻辑）
 * 实际项目中替换为真实接口地址
 */
async function loadMediaData() {
    state.loading = true;
    setLoadingState(true);


    try {
        // 模拟接口请求（实际项目中替换为真实接口）
        const response = await fetchMediaDataFromAPI(
            state.currentType,
            state.page,
            state.pageSize
        );

        // 处理接口返回数据
        const { data, total } = response;
        const currentGrid = state.currentType === 'image' ? imageGrid : videoGrid;

        // 清空加载提示
        if (state.page === 1) {
            currentGrid.innerHTML = '';
        }

        // 渲染媒体项
        renderMediaItems(data, currentGrid);

        // 更新状态：判断是否还有更多数据
        const totalPages = Math.ceil(total / state.pageSize);
        state.hasMore = state.page < totalPages;

        // 如果没有更多数据，更新按钮状态
        if (!state.hasMore) {
            viewMoreBtn.textContent = '已加载全部资源';
            viewMoreBtn.disabled = true;
            viewMoreBtn.style.display = "none";
        } else {
            viewMoreBtn.textContent = '查看更多';
            viewMoreBtn.disabled = false;
            viewMoreBtn.style.display = "block";
        }

    } catch (error) {
        console.error('加载媒体数据失败：', error);
        const currentGrid = state.currentType === 'image' ? imageGrid : videoGrid;
        if (state.page === 1) {
            currentGrid.innerHTML = '<div class="loading">加载失败，请刷新重试</div>';
        }
    } finally {
        state.loading = false;
        setLoadingState(false);
    }
}

/**
 * 渲染媒体项到网格中
 * @param {Array} data - 媒体数据数组
 * @param {HTMLElement} grid - 要渲染到的网格元素
 */
function renderMediaItems(data, grid) {
    data.forEach(item => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';

        // 根据媒体类型渲染不同的内容
        let mediaContent = '';
        if (state.currentType === 'image') {
            mediaContent = `
                        <img src="${item.url}" alt="${item.title}" loading="lazy">
                    `;
        } else {
            // 视频添加封面图优化加载体验
            mediaContent = `
                        <video poster="${item.coverUrl}" preload="none">
                            <source src="${item.url}" type="video/mp4">
                            您的浏览器不支持视频播放
                        </video>
                    `;
        }

        // 拼接完整HTML
        mediaItem.innerHTML = `
                    ${mediaContent}
                    <div class="media-info">
                        <div class="media-title">${item.title}</div>
                        <div class="media-meta">
                            <span>${formatDate(item.createTime)}</span>
                            <span>${item.size}MB</span>
                        </div>
                    </div>
                `;

        // 添加点击事件，打开弹窗
        mediaItem.addEventListener('click', () => {
            openModal(item, state.currentType);
        });

        // 添加到网格
        grid.appendChild(mediaItem);
    });
}

/**
 * 设置加载状态UI
 * @param {boolean} isLoading - 是否正在加载
 */
function setLoadingState(isLoading) {
    if (isLoading) {
        viewMoreBtn.textContent = '加载中...';
        viewMoreBtn.disabled = true;
    } else {
        if (state.hasMore) {
            viewMoreBtn.textContent = '查看更多';
            viewMoreBtn.disabled = false;
        } else {
            viewMoreBtn.textContent = '已加载全部资源';
            viewMoreBtn.disabled = true;
        }
    }
}

/**
 * 模拟接口请求（实际项目中替换为真实接口）
 * @param {string} type - 媒体类型（image/video）
 * @param {number} page - 页码
 * @param {number} pageSize - 每页数量
 * @returns {Promise<Object>} 接口返回数据
 */
async function fetchMediaDataFromAPI(type, page, pageSize) {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 400));

    // 模拟接口返回格式（实际项目中按真实接口调整）
    const total = type === 'image' ? 20 : 1; // 模拟总数据量
    const data = [];

    // 生成模拟数据
    for (let i = 0; i < pageSize; i++) {
        const index = (page - 1) * pageSize + i + 1;
        if (index > total) break;

        data.push({
            id: `${type}-${index}`, // 资源ID
            title: `${type === 'image' ? '产品图' : '产品视频'} ${index}`, // 资源标题
            url: type === 'image'
                ? `http://180.76.192.210/sources/imgs/media/DSC000${index}.jpg` // 高清图片地址（放大更清晰）
                : `http://180.76.192.210/videos/YuqianSupplyChainPromotional.mp4`, // 视频地址
            coverUrl: `http://180.76.192.210/sources/imgs/media/yuqianIntroduce.png`, // 视频封面图
            createTime: '2024-' + Math.floor(Math.random() * 12 + 1) + '-' + Math.floor(Math.random() * 28 + 1), // 创建时间
            size: (Math.random() * 10 + 1).toFixed(1) // 文件大小（MB）
        });
    }

    return {
        code: 200, // 状态码（200成功，其他失败）
        message: 'success', // 提示信息
        data: data, // 媒体资源数组
        total: total // 总数据量
    };
}

/**
 * 日期格式化工具
 * @param {string} dateStr - 日期字符串（如：2024-5-12）
 * @returns {string} 格式化后的日期（如：2024-05-12）
 */
function formatDate(dateStr) {
    const parts = dateStr.split('-');
    return parts.map(part => part.padStart(2, '0')).join('-');
}