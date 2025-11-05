// 预留的事件数据结构 - 实际项目中会从接口获取
let timelineData = [];

// DOM元素
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const yearList = document.getElementById("year-list");
const timelineEvents = document.getElementById("timeline-events");
let yearItems = [];
let timelineYears = [];

// 当前激活的年份索引
let activeIndex = 0;
let totalItems = 0;
const itemWidth = 100; // 单个年份项宽度（包含间距）

// 初始化年份列表位置
function updateYearListPosition() {
    if (totalItems === 0) return;

    // 获取容器和年份项的实际宽度
    const containerWidth = yearList.parentElement.clientWidth;
    const yearItemWidth = yearItems[0]?.offsetWidth || itemWidth;
    
    // 计算居中位置
    const scrollValue = (activeIndex * yearItemWidth) - (containerWidth - yearItemWidth) / 2;
    
    // 限制滚动范围
    const maxScroll = Math.max(0, (totalItems * yearItemWidth) - containerWidth);
    const clampedScroll = Math.max(0, Math.min(scrollValue, maxScroll));
    
    yearList.style.transform = `translateX(${-clampedScroll}px)`;
}

// 渲染年份导航
function renderYearNavigation() {
    yearList.innerHTML = '';
    
    // 提取所有年份
    const years = timelineData.map(item => item.year);
    totalItems = years.length;
    
    // 创建年份元素
    years.forEach((year, index) => {
    const yearEl = document.createElement('div');
    yearEl.className = `year-item ${index === activeIndex ? 'active' : ''}`;
    yearEl.dataset.year = year;
    yearEl.textContent = year;
    yearEl.addEventListener('click', () => switchYear(index));
    yearList.appendChild(yearEl);
    });
    
    yearItems = document.querySelectorAll(".year-item");
}

// 渲染时间轴事件
function renderTimelineEvents() {
    timelineEvents.innerHTML = '';
    
    timelineData.forEach(yearData => {
    const yearContainer = document.createElement('div');
    yearContainer.className = `year-container timeline-year ${yearData.year === timelineData[activeIndex].year ? '' : 'hidden'}`;
    yearContainer.dataset.year = yearData.year;
    
    // 为每个月份事件创建容器
    yearData.events.forEach((event, index) => {
        const isLeft = index % 2 === 1; // 奇数索引放左边，偶数放右边
        
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month-container';
        
        // 左侧内容
        const monthLeft = document.createElement('div');
        monthLeft.className = `month-left ${!isLeft ? 'hidden md:block' : ''}`;
        
        // 右侧内容
        const monthRight = document.createElement('div');
        monthRight.className = `month-right ${isLeft ? 'hidden md:block' : ''}`;
        
        // 时间点
        const timelineDot = document.createElement('div');
        timelineDot.className = 'timeline-dot active';
        
        // 事件内容
        const eventContent = `
        <h4 class="month-title">${event.month ? event.month + '月' : ''}</h4>
        <div class="event-card opacity-0 translate-y-4 transition-all duration-700">
            <div class="flex items-start mb-2">
            <i class="fa ${event.icon} text-primary mt-1 mr-2"></i>
            <p class="font-medium text-gray-800">${event.title}</p>
            </div>
            ${event.image ? `<img src="${event.image}" alt="${event.title}" class="event-image">` : ''}
            <p class="text-gray-600">${event.description}</p>
        </div>
        `;
        
        // 根据位置添加内容
        if (isLeft) {
        monthLeft.innerHTML = eventContent;
        } else {
        monthRight.innerHTML = eventContent;
        }
        
        // 组装月份容器
        monthContainer.appendChild(monthLeft);
        monthContainer.appendChild(timelineDot);
        monthContainer.appendChild(monthRight);
        
        // 添加到年份容器
        yearContainer.appendChild(monthContainer);
    });
    
    // 添加到时间轴容器
    timelineEvents.appendChild(yearContainer);
    });
    
    timelineYears = document.querySelectorAll(".timeline-year");
    
    // 为初始年份的事件卡片触发动画
    setTimeout(() => {
    const initialEventCards = document.querySelectorAll(`.timeline-year[data-year="${timelineData[activeIndex].year}"] .event-card`);
    initialEventCards.forEach((card, index) => {
        setTimeout(() => {
        card.classList.add('opacity-100', 'translate-y-0');
        card.classList.remove('opacity-0', 'translate-y-4');
        }, index * 200);
    });
    }, 300);
}

// 切换年份函数
function switchYear(newIndex) {
    if (newIndex === activeIndex || newIndex < 0 || newIndex >= totalItems) return;
    
    // 更新激活索引
    activeIndex = newIndex;
    
    // 更新年份列表位置
    updateYearListPosition();
    
    // 更新年份激活状态
    yearItems.forEach((item, index) => {
    item.classList.toggle("active", index === activeIndex);
    });
    
    // 更新事件显示
    const activeYear = timelineData[activeIndex].year;
    timelineYears.forEach(timelineYear => {
    const year = timelineYear.getAttribute("data-year");
    if (year === activeYear) {
        timelineYear.style.display = 'block';
        
        // 为当前年份的所有事件卡片触发动画
        setTimeout(() => {
        const eventCards = timelineYear.querySelectorAll('.event-card');
        eventCards.forEach((card, index) => {
            setTimeout(() => {
            card.classList.add('opacity-100', 'translate-y-0');
            card.classList.remove('opacity-0', 'translate-y-4');
            }, index * 200);
        });
        }, 200);
    } else {
        timelineYear.style.display = 'none';
        // 重置动画状态
        const eventCards = timelineYear.querySelectorAll('.event-card');
        eventCards.forEach(card => {
        card.classList.remove('opacity-100', 'translate-y-0');
        card.classList.add('opacity-0', 'translate-y-4');
        });
    }
    });
}

// 从接口加载数据（预留）
async function loadTimelineData() {
    try {
    // 实际项目中替换为真实接口地址
    // const response = await fetch('/api/timeline');
    // timelineData = await response.json();
    
    // 临时使用模拟数据
    timelineData = [
        {
            "year": "2003",
            "events": [
                {
                "month": '',
                "title": "上海十六铺水果市场煜谦贸易成立",
                "description": "正式注册成立，确立\"技术驱动、客户至上\"的核心发展理念，开启创业征程。",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2006",
            "events": [
                {
                "month": '',
                "title": "迁上海曹杨路二级水果市场",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2008",
            "events": [
                {
                "month": 3,
                "title": "迁上海龙吴路一级水果市场",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2013",
            "events": [
                {
                "month": "",
                "title": "迁上海辉展市场，成立国际采购团队锐芙国际",
                "description": "",
                "icon": "",
                "image": ""
                },
            ]
        },
        {
            "year": "2014",
            "events": [
                {
                "month": '',
                "title": "设立南美、澳新、北美、泰国办事处，推进全球布局",
                "description": "。",
                "icon": "",
                "image": ""
                }
            ]
        },
        // 其他年份数据...
        {
            "year": "2017",
            "events": [
                {
                "month": "",
                "title": "开设广州、嘉兴、成都分公司，推进全国布局",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2018",
            "events": [
                {
                "month": "",
                "title": "设立渠道部，开设北京、青岛分公司，组建智利樱桃包装厂",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2019",
            "events": [
                {
                "month": "",
                "title": "组建泰国椰青包装厂、泰国榴莲包装厂、云南石榴包装厂",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2020",
            "events": [
                {
                "month": "",
                "title": " 开设武汉、长沙分公司",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2021",
            "events": [
                {
                "month": "",
                "title": "开设广州、嘉兴、成都分公司，推进全国布局",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2022",
            "events": [
                {
                "month": "",
                "title": "煜谦集团总部乔迁新址",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },
        {
            "year": "2025",
            "events": [
                {
                "month": "",
                "title": "成立品牌事业部和出口事业部，开设昆明、滁州分公司",
                "description": "",
                "icon": "",
                "image": ""
                }
            ]
        },

    ];
    
    // 设置初始激活年份为2021（如果存在）
    const initialYearIndex = timelineData.findIndex(item => item.year === "2021");
    activeIndex = initialYearIndex !== -1 ? initialYearIndex : 0;
    
    // 渲染页面
    renderYearNavigation();
    renderTimelineEvents();
    updateYearListPosition();
    
    } catch (error) {
    console.error('加载时间轴数据失败:', error);
    // 可以在这里添加错误处理，如显示错误提示
    }
}

// 左右按钮点击事件
leftBtn.addEventListener("click", () => {
    if (activeIndex > 0) {
    switchYear(activeIndex - 1);
    }
});

rightBtn.addEventListener("click", () => {
    if (activeIndex < totalItems - 1) {
    switchYear(activeIndex + 1);
    }
});

// 窗口大小变化时重新调整位置
window.addEventListener("resize", updateYearListPosition);

// 页面加载完成后加载数据
window.addEventListener('DOMContentLoaded', loadTimelineData);