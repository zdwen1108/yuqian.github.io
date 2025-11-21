// 公司介绍页顶部图片
new MediaCarousel({
    containerId: 'companyProductsTopImage',
    width: '100vw',
    autoPlay: false,
    interval: 4000,
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

const ipPath = "http://180.76.192.210";

// 1. 模拟接口返回的数组数据（实际替换为真实接口请求结果）
const productList = [
    {
        "id": 1,
        "imageUrl": ipPath + "/sources/products/cherry.png",
        "title_zh": "车厘子",
        "title_en": "cherry",
        "contentTitle_zh": "四季淬炼·终成甜蜜|陕西铜川基地车厘子成长日记",
        "contentTitle_en": "Tempered by the Four Seasons · Finally Turning into Sweetness | Growth Diary of Cherries at the Tongchuan Base in Shaanxi",
        "description_zh": "作为车厘子中国市场的领先者，煜谦专注于全球优质厘子的种植、甄选、进口与分销。凭借强大的全球采购网络、成熟的供应链体系和严格的质量管控，成为链接海外顶级产区与中国庞大消费市场的重要桥梁，持续为零售商、批发商及消费者提供稳定、高品质的车厘子供应。",
        "description_en": "As a leader in China's cherry market, Yuqian specializes in the cultivation, selection, import, and distribution of high-quality cherries worldwide. With a strong global procurement network, a mature supply chain system, and strict quality control, it has become an important bridge connecting top overseas producing regions with China's huge consumer market, continuously providing stable and high-quality cherry supplies to retailers, wholesalers, and consumers.",
        "contentList": [
            {
                "type": "h2",
                "text_zh": "四季淬炼，终成甜蜜",
                "text_en": "Tempered by the Four Seasons · Finally Turning into Sweetness",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "全程记录：2025.1 - 2025.6",
                "text_en": "Full record: 2025.1 - 2025.6",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "2025 年 1 月 24 日 星期五 雪",
                "text_en": "Friday, January 24, 2025 Snowy",
                "textAlign": 'center'
            },
            {
                "type": "h2",
                "text_zh": "冬日蛰伏：在冻土下埋下甜蜜的梦",
                "text_en": "Winter Hibernation: Burying Sweet Dreams Under the Frozen Soil",
                "textAlign": 'center'
            },
            {
                "type": "image",
                "imageUrl": "./sources//imgs/productsDetail/cherry01.png",
                "width": "80%"
            },
            {
                "type": "p",
                "text_zh": "今天基地又落雪了，整片园子像盖了白棉被。拨开雪层摸了摸树干，底下的根系正憋着劲往下钻 -- 零下 15℃的冻土下，这些「沉睡的勇士」正把寒冷化作养分，每一道根须的伸展，都是在为春天储能量～",
                "text_en": "It snowed again at the base today, and the entire garden looked like it was covered with a white quilt. I pushed aside the snow to feel the tree trunk, and the roots underneath were struggling to drill downward—under the frozen soil at minus 15℃, these 'sleeping warriors' are turning the cold into nutrients. Every stretch of a root is storing energy for spring.",
            },
            {
                "type": "p",
                "text_zh": "冷知识：车厘子根系冬季深度可达 50cm，低温休眠是为了积蓄更多糖分！",
                "text_en": "Fun fact: The root system of cherries can reach a depth of 50cm in winter, and dormancy in low temperatures is to accumulate more sugar!",
            },
            {
                "type": "p",
                "text_zh": "2025 年 3 月 28 日 星期五 晴",
                "text_en": "Friday, January 24, 2025 Snowy",
                "textAlign": 'center'
            },
            {
                "type": "h2",
                "text_zh": "春日抗争：寒风中守护希望的花蕊",
                "text_en": "Winter Hibernation: Burying Sweet Dreams Under the Frozen Soil",
                "textAlign": 'center'
            },
            {
                "type": "image",
                "imageUrl": "./sources//imgs/productsDetail/cherry02.png",
                "width": "80%"
            },
            {
                "type": "p",
                "text_zh": "猝不及防的倒春寒！昨天还暖阳高照，今早风就卷着寒气来了。本以为花苞会被吹蔫，凑近一看，花蕊竟冻得发红还昂着头 -- 和农科院专家蹲在田里看了半小时，越看越感慨：植物的生命力真像「小战士」, 寒风里硬扛着也要护住果胎～",
                "text_en": "A sudden late-spring cold snap! Yesterday, the sun was shining brightly, but this morning, the wind is blowing with a chill. I thought the flower buds would be wilted by the wind, but when I leaned in for a closer look, the stamens, though frozen red, were still holding their heads high. I squatted in the field with experts from the Academy of Agricultural Sciences for half an hour, and the more I watched, the more I marveled: the vitality of plants is really like 'little soldiers,'' stubbornly enduring the cold wind just to protect the fruit embryos.",
            },
            {
                "type": "p",
                "text_zh": "小插曲：我们给树点了篝火取暖，还喷了防冻剂，希望这批花能多留些！",
                "text_en": "A little interlude: We lit a bonfire for the trees to keep them warm and sprayed antifreeze, hoping that more of these flowers will last!",
            },
        ],
        "link": ""
    },
    {
        "id": 2,
        "imageUrl": ipPath + "/sources/products/tblueberry.png",
        "title_zh": "蓝莓",
        "title_en": "Tblueberry",
        "contentTitle_zh": "【营养密码：为什么蓝莓被称为 “超级水果”？】",
        "contentTitle_en": "Nutrition Code: Why are blueberries called 'superfruits'?",
        "description_zh": "煜谦作为蓝莓品类国内头部的经销商，依托自身庞大的销售体系，专注种、产、研、销全面发展，已成功落地国外新品种在国内规模化发展，同时培养了强大的技术生产力量，形成对种植户的赋能，从而推动产业化高质量发展。",
        "description_en": "As a leading domestic distributor in the blueberry category, Yuqian, relying on its own massive sales system, focuses on the comprehensive development of cultivation, production, research, and sales. It has successfully achieved the large-scale domestic development of foreign new varieties, while cultivating a strong technical production force to empower growers, thereby promoting the high-quality development of the industry.",
        "contentList": [
            {
                "type": "p",
                "text_zh": "抗氧化之王",
                "text_en": "King of Antioxidants",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "蓝莓的花青素含量居果蔬之首，清除自由基，延缓衰老。",
                "text_en": "Blueberries have the highest anthocyanin content among fruits and vegetables, which can scavenge free radicals and delay aging.",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "护眼明星",
                "text_en": "Eye-protecting star",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "花青素可促进视紫质再生，缓解眼疲劳。",
                "text_en": "Anthocyanins can promote the regeneration of rhodopsin and relieve eye fatigue.",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "多维健康助手",
                "text_en": "Multidimensional Health Assistant",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "富含维生素 C、K、膳食纤维及钾、镁等矿物质，可增强免疫力、改善肠道健康、辅助调节血压。",
                "text_en": "It is rich in vitamins C and K, dietary fiber, and minerals such as potassium and magnesium, which can enhance immunity, improve intestinal health, and help regulate blood pressure.",
                "textAlign": 'center'
            },
            {
                "type": "image",
                "imageUrl": "./sources/imgs/productsDetail/tblueberry01.png",
                "width": "80%",
            },
            {
                "type": "h2",
                "text_zh": "让我们走进煜谦云南蓝莓基地，是什么样的魔法，造就了煜谦高品质蓝莓",
                "text_en": "Let's step into Yuqian Yunnan Blueberry Base. What kind of magic has created Yuqian's high-quality blueberries?",
                "textAlign": 'center'
            },
            {
                "type": "h2",
                "text_zh": "一、大自然的馈赠：",
                "text_en": "I. Gifts from Nature:",
            },
            {
                "type": "p",
                "text_zh": "黄金纬度与生态宝库：",
                "text_en": "Golden Latitude and Ecological Treasure House:",
            },
            {
                "type": "p",
                "text_zh": "云南红河州地处北回归线黄金纬度带，坐拥温润的亚热带季风气候与立体多元的生态资源，是全球最适宜蓝莓种植的区域之一。",
                "text_en": "GHonghe Prefecture in Yunnan Province is located in the golden latitude zone of the Tropic of Cancer, enjoying a mild subtropical monsoon climate and diverse three-dimensional ecological resources. It is one of the most suitable regions in the world for blueberry cultivation.",
            },
            {
                "type": "p",
                "text_zh": "光照充沛，年均日照时长超 2000 小时，昼夜温差显著，为蓝莓糖分积累与果香形成提供了天然 “催化剂”。",
                "text_en": "There is abundant sunlight, with an average annual sunshine duration of over 2000 hours, and a significant temperature difference between day and night, which provides a natural 'catalyst' for the accumulation of sugar and the formation of fruity aroma in blueberries.",
            },
            {
                "type": "p",
                "text_zh": "高原洁净的空气、无污染的土壤与高山雪水，更让每一颗蓝莓在纯净环境中自然生长，果肉细腻、果实糖度稳定在 14-18Brix，果霜浓郁、风味醇厚，品质远超其它产区。",
                "text_en": "The clean air, unpolluted soil, and alpine snowmelt on the plateau allow every blueberry to grow naturally in a pure environment. They have delicate flesh, with a stable sugar content of 14-18 Brix, rich bloom, and a mellow flavor, whose quality far exceeds that of blueberries from other producing areas.",
            },
            {
                "type": "h2",
                "text_zh": "二、科技赋能精细化种植",
                "text_en": "II. Technology Empowers Refined Cultivation",
            },
            {
                "type": "p",
                "text_zh": "1. 智能灌溉系统 —— 精准控水，高效节能",
                "text_en": "Intelligent Irrigation System —— Precise water control, high efficiency and energy saving",
            },
            {
                "type": "p",
                "text_zh": "实时监测土壤湿度、光照强度及蓝莓生长阶段需水量，通过设置自动调节灌溉频率与水量，实现 “按需供水”。",
                "text_en": "Real-time monitoring of soil moisture, light intensity, and water requirements of blueberries at different growth stages, and automatic adjustment of irrigation frequency and water volume through settings to achieve 'water supply on demand'.",
            },
            {
                "type": "p",
                "text_zh": "2. 温湿度控系统 —— 仿生环境，四季优产",
                "text_en": "Temperature and Humidity Control System —— Bionic Environment for Optimal Production Throughout the Four Seasons",
            },
            {
                "type": "p",
                "text_zh": "采用温室环境智能调控系统，集成温度、湿度、CO₂浓度监测模块，联动自动通风天窗、遮阳幕布及加热设备，模拟蓝莓最佳生长气候。",
                "text_en": " 'A greenhouse environment intelligent control system is adopted, integrating temperature, humidity, and CO₂ concentration monitoring modules, and linking with automatic ventilation skylights, sunshade curtains, and heating equipment to simulate the optimal growth climate for blueberries.",
            },
            {
                "type": "h2",
                "text_zh": "三、从枝头到舌尖，最快 72 小时抵达餐桌",
                "text_en": "III. from the branch to the tip of the tongue, it reaches the dining table in as fast as 72 hours.",
            },
            {
                "type": "p",
                "text_zh": "智能灌溉系统 —— 精准控水，高效节能",
                "text_en": "Intelligent Irrigation System —— Precise Water Control, High Efficiency and Energy Saving",
            },
            {
                "type": "p",
                "text_zh": "实时监测土壤湿度、光照强度及蓝莓生长阶段需水量，通过设置自动调节灌溉频率与水量，实现 “按需供水”。",
                "text_en": "Real-time monitoring of soil moisture, light intensity, and water requirements during the blueberry growth stages, and automatic adjustment of irrigation frequency and water volume through settings to achieve 'water supply on demand'.",
            },
        ],
        "time": "2025-11-4",
        "link": "/products/detail/2"
    },
    {
        "id": 3,
        "imageUrl": ipPath + "/sources/products/grape.png",
        "title_zh": "葡萄",
        "title_en": "grape",
        "description_zh": "煜谦已正式获得Sun World与Bloomfresh两家专利提子品种公司的授权，成为其在中国本土的一级经销商和授权种植户，并依托国产与进口专利品种，构建覆盖全年的葡萄供应链体系。",
        "description_en": "",
        "time": "2025-9-20",
        "link": "/products/detail/3"
    },
    {
        "id": 4,
        "imageUrl": ipPath + "/sources/products/pineapple.png",
        "title_zh": "凤梨",
        "title_en": "pineapple",
        "description_zh": "与菲律宾最大凤梨出口商S&W联合推出的蓝孔雀S&W凤梨，产品包括了有冠凤梨、无冠凤梨、蜂蜜凤梨。产品持续供应商超、茶饮品牌等渠道。产自棉兰老岛北部高地行省，火山灰土质与热带气候造就其香甜可口全年品质稳定。",
        "description_en": "The Blue Peacock S&W pineapples, jointly launched with S&W, the largest pineapple exporter in the Philippines, include crowned pineapples, crownless pineapples, and honey pineapples. The products are continuously supplied to channels such as supermarkets and tea beverage brands. Originating from the highland provinces in northern Mindanao, they are grown in volcanic ash soil and under a tropical climate, which gives them a sweet and delicious taste with stable quality throughout the year.",
        "time": "2025-9-9",
        "link": "/products/detail/4"
    },
    {
        "id": 5,
        "imageUrl": ipPath + "/sources/products/Icepersimmon.png",
        "title_zh": "冰柿",
        "title_en": "Ice persimmon",
        "contentTitle_zh": "煜谦出品|传柿富平冰柿",
        "contentTitle_en": "Produced by Yuqian | Chuanshi Fuping Ice Persimmon",
        "description_zh": "富平流心冰柿，既有鲜柿子的柔美，又有柿饼的韧性，果肉均匀又流心，莹润软糯有蜜香。这是来自大自然沉淀的美味，也是富平代代相传的美食智慧。",
        "description_en": "Fuping L 流心冰柿 (Liuxin Bing Shi, flowing-heart iced persimmon), has both the tenderness of fresh persimmons and the resilience of dried persimmon cakes. Its flesh is even and has a flowing core, with a glossy, soft, glutinous texture and a honey-like fragrance. This is a delicious taste accumulated by nature, and also the culinary wisdom passed down from generation to generation in Fuping.",
        "time": "2025-9-1",
        "link": "/products/detail/5",
        "contentList": [
            {
                "type": "p",
                "text_zh": "富平流心冰柿，既有鲜柿子的柔美，又有柿饼的韧性，果肉均匀又流心，莹润软糯有蜜香。这是来自大自然沉淀的美味，也是富平代代相传的美食智慧。",
                "text_en": "Fuping L 流心冰柿 (Liuxin Bing Shi, flowing-heart iced persimmon), has both the tenderness of fresh persimmons and the resilience of dried persimmon cakes. Its flesh is even and has a flowing core, with a glossy, soft, glutinous texture and a honey-like fragrance. This is a delicious taste accumulated by nature, and also the culinary wisdom passed down from generation to generation in Fuping.",
            },
            {
                "type": "image",
                "imageUrl": "./sources/products/Icepersimmon.png",
                "width": "80%"
            },
            {
                "type": "h2",
                "text_zh": "从柿子到冰柿",
                "text_en": "From persimmons to iced persimmons",
            },
            {
                "type": "p",
                "text_zh": "每一个柿子都要经历，",
                "text_en": "Every persimmon has to go through,",
            },
            {
                "type": "p",
                "text_zh": "选果分级→清洗→削皮→智能温控→洁净包装→低温储存",
                "text_en": "Fruit selection and grading → cleaning → peeling → intelligent temperature control → clean packaging → low-temperature storage",
            },
            {
                "type": "image",
                "imageUrl": "./sources//imgs/productsDetail/icepersiommon02.png",
                "width": "80%"
            },
        ]
    },
    {
        "id": 6,
        "imageUrl": ipPath + "/sources/products/avocado.png",
        "title_zh": "牛油果",
        "title_en": "avocado",
        "description_zh": "全球超20余家供应商提供全年稳定供应，全国多个催熟仓库及档口，具有统配统销的实力。",
        "description_en": "More than 20 suppliers worldwide provide stable supply throughout the year. There are multiple ripening warehouses and stalls across the country, with the capability of unified distribution and unified sales.",
        "time": "2025-8-11",
        "link": "/products/detail/6"
    },
    {
        "id": 7,
        "imageUrl": ipPath + "/sources/products/citrusfruit.png",
        "title_zh": "柑橘",
        "title_en": "citrus",
        "description_zh": "深耕全球产区优质资源，保证高品质柑橘全年供应。",
        "description_en": "We deeply cultivate high-quality resources in global production areas to ensure the year-round supply of high-quality citrus fruits.",
        "time": "2025-8-9",
        "link": "/products/detail/7"
    },
    {
        "id": 8,
        "imageUrl": ipPath + "/sources/products/durian.png",
        "title_zh": "榴莲",
        "title_en": "durian",
        "description_zh": "稳定的物流供应链保障下，凭借与多优质产区达成产地直采合作，实现源头直发。",
        "description_en": "Under the guarantee of a stable logistics supply chain, and by establishing direct procurement cooperation with multiple high-quality producing areas, we achieve direct shipment from the source.",
        "link": "/products/detail/8"
    },
    {
        "id": 9,
        "imageUrl": ipPath + "/sources/products/apple.png",
        "title_zh": "苹果",
        "title_en": "apple",
        "description_zh": "全球核心产区优质苹果，链接中国市场，为消费者提供新鲜、健康的世界风味。",
        "description_en": "High-quality apples from core producing regions around the world are connected to the Chinese market, providing consumers with fresh, healthy flavors from around the world.",
        "link": "/products/detail/9"
    }
];

const lang = localStorage.getItem('language');
// 2. 分页核心配置
let producPageConfig = {
    currentPage: 1, // 当前页码
    rowsPerPage: 2, // 每页显示"行数"（不是卡片数）
    cardsPerRow: 3, // 每行卡片数（默认3个，响应式时会动态调整）
    totalData: productList.length // 总数据量
};

// 3. 计算每行卡片数（适配响应式）
function getProductCardsPerRow() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) return 1; // 小屏幕每行1个
    if (screenWidth <= 1200) return 2; // 中等屏幕每行2个
    return 3; // 大屏幕每行3个
}

// 导航到产品详情页
function navigateToProductsDetail(productsId) {
    // 更新URL，使用history API添加历史记录
    switchPage('/products/detail', { id: productsId }, true)
}

// 加载产品详情内容
function loadProductsDetail(productsId) {
    let newDetail;
    productList.forEach(item => {
        if (item.id == productsId)
            newDetail = item;
    });
    if (!newDetail)
        return;
    renderProductsDetail(newDetail);
}

// 渲染产品详情
function renderProductsDetail(products) {
    const detailPage = document.getElementById('company_products_detail');
    const allChildElements = [...detailPage.children];
    allChildElements.forEach((child, index) => {
        if (index !== 0) { // 非第一个子元素
            detailPage.removeChild(child); // 删除子元素
        }
    });
    const newDetailContainer = document.createElement('div');
    newDetailContainer.className = 'new_detail_container'
    let newDetailHTML = `
        <div class="new_title-container">
            <h1 class="new_main-title">
                <span class="en ${lang == 'zh' | !lang ? 'hidden' : ''}">${products.contentTitle_en ? products.contentTitle_en : products.title_en}</span>
                <span class="zh ${lang == 'en' ? 'hidden' : ''}">${products.contentTitle_zh ? products.contentTitle_zh : products.title_zh}</span>
            </h1>
            <div class="new_title-line"></div>
        </div>`;
    if (!products["contentList"] || products["contentList"].length == 0) {
        newDetailHTML += `
            <p>
                <span class="en ${lang == 'zh' | !lang ? 'hidden' : ''}">${products.description_en}</span>
                <span class="zh ${lang == 'en' ? 'hidden' : ''}">${products.description_zh}</span>
            </p>
            <img src="${products.imageUrl}" 
                alt="" class="new_content-img">
        `;
    }
    if (products["contentList"] && products["contentList"].length > 0) {
        products["contentList"].forEach(item => {
            switch (item['type']) {
                case 'p':
                    newDetailHTML += `
                        <p style='text-align: ${item.textAlign ? item.textAlign : ''}'>
                            <span class="en ${lang == 'zh' | !lang ? 'hidden' : ''}">${item.text_en}</span>
                            <span class="zh ${lang == 'en' ? 'hidden' : ''}">${item.text_zh}</span>
                        </p>`;
                    break;
                case 'h2':
                    newDetailHTML += `
                        <h2 class="new_section-title" style='text-align: ${item.textAlign ? item.textAlign : ''};font-weight: 600;'>
                            <span class="en ${lang == 'zh' | !lang ? 'hidden' : ''}">${item.text_en}</span>
                            <span class="zh ${lang == 'en' ? 'hidden' : ''}">${item.text_zh}</span>
                        </h2>`;
                    break;
                case 'image':
                    newDetailHTML += `<img src="${item['imageUrl']}" alt="" class="new_content-img" style="width: ${item['width']};height: ${item['height']};">`;
                    break;
                default:
                    break;
            }
        });
    }

    newDetailContainer.innerHTML = newDetailHTML;
    detailPage.appendChild(newDetailContainer);
    productScrollToTop();
}

// 滚动到顶部的工具函数
function productScrollToTop() {
    // 方案1：直接滚动（大部分浏览器支持）
    window.scrollTo({
        top: 0,
        behavior: 'auto' // 直接跳转，无动画（如需动画可改为 'smooth'）
    });

    // 兼容老旧浏览器
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// 返回产品列表页
function goBackToProductsList() {
    // 隐藏详情页，显示列表页
    document.getElementById('company_products_detail').classList.remove('active');
    document.getElementById('company_products_detail').style.display = 'none';
    document.getElementById('company_products').classList.add('active');
    document.getElementById('company_products').style.display = 'block';

    // 更新URL
    history.pushState({ page: 'products' }, '公司产品', '/products');
}

// 4. 渲染卡片（根据当前页码和行数计算要显示的卡片）
function productRenderCards() {
    const companyProductsContainer = document.getElementById("companyProductsContainer");
    const companyProductsloadMoreBtn = document.getElementById("companyProductsloadMoreBtn");
    const companyProductsnoMoreText = document.getElementById("companyProductsnoMoreText");

    // 初始化每行卡片数（响应式适配）
    producPageConfig.cardsPerRow = getProductCardsPerRow();

    // 计算当前页要显示的卡片范围
    const startIndex = (producPageConfig.currentPage - 1) * producPageConfig.rowsPerPage * producPageConfig.cardsPerRow;
    const endIndex = Math.min(
        producPageConfig.currentPage * producPageConfig.rowsPerPage * producPageConfig.cardsPerRow,
        producPageConfig.totalData
    );
    const currentData = productList.slice(startIndex, endIndex);

    // 情况1：数组为空时显示无数据提示
    if (producPageConfig.totalData === 0) {
        companyProductsContainer.innerHTML = '<div class="empty-tip">暂无相关数据</div>';
        companyProductsloadMoreBtn.style.display = "none";
        companyProductsnoMoreText.style.display = "none";
        return;
    }

    
    // 情况2：渲染当前页卡片（追加模式，不是替换）
    currentData.forEach(item => {
        const card = document.createElement("div");
        card.className = "interactive-card";
        card.dataset.id = item.id;
        card.addEventListener('click', () => {
            navigateToProductsDetail(item.id);
        });
        card.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${item.imageUrl}" alt="" class="card-image">
        </div>
        <div class="card-content">
          <h3 class="card-title">
            <span class="en ${lang == 'zh' | !lang ? 'hidden' : ''}">${item.title_en}</span>
            <span class="zh ${lang == 'en' ? 'hidden' : ''}">${item.title_zh}</span>
          </h3>
          <p class="card-description">
            <span class="en ${lang == 'zh' | !lang ? 'hidden' : ''}">${item.description_en}</span>
            <span class="zh ${lang == 'en' ? 'hidden' : ''}">${item.description_zh}</span>
          </p>
        </div>
      `;
        companyProductsContainer.appendChild(card);
    });

    // 情况3：判断是否还有更多数据，控制按钮和文本显示
    const hasMore = endIndex < producPageConfig.totalData;
    companyProductsloadMoreBtn.style.display = hasMore ? "inline-block" : "none";
    // companyProductsnoMoreText.style.display = hasMore ? "none" : "block";
    // 隐藏没有更多数据了文字
    companyProductsnoMoreText.style.display = "none";
}

// 5. 查看更多按钮事件（加载下两行）
document.getElementById("companyProductsloadMoreBtn").addEventListener("click", () => {
    producPageConfig.currentPage++; // 页码+1（对应加载下两行）
    productRenderCards(); // 追加渲染下两行卡片
});

// 6. 窗口大小变化时重新计算每行卡片数，并重绘（响应式适配）
window.addEventListener("resize", () => {
    // 保存当前已显示的卡片总数
    const displayedCount = (producPageConfig.currentPage - 1) * producPageConfig.rowsPerPage * producPageConfig.cardsPerRow;
    // 重新计算每行卡片数
    const newCardsPerRow = getProductCardsPerRow();
    // 如果每行卡片数变化，重新计算页码并刷新
    if (newCardsPerRow !== producPageConfig.cardsPerRow) {
        producPageConfig.cardsPerRow = newCardsPerRow;
        // 重新计算当前页码（保证已显示的卡片总数不变）
        producPageConfig.currentPage = Math.ceil(displayedCount / (producPageConfig.rowsPerPage * producPageConfig.cardsPerRow)) || 1;
        // 清空容器重新渲染
        document.getElementById("companyProductsContainer").innerHTML = "";
        productRenderCards();
    }
});

// 7. 页面加载完成后渲染初始两行数据
window.addEventListener('load', function() {
    productRenderCards();
});