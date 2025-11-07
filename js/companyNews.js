// 公司介绍页顶部图片
new MediaCarousel({
    containerId: 'companyNewsTopImage',
    width: '100vw',
    autoPlay: false,
    interval: 4000,
    showIndicators: false,
    showControls: false,
    items: [
        {
            type: 'image',
            url: './sources/imgs/yuqian04.png',
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

// 1. 模拟接口返回的数组数据（实际替换为真实接口请求结果）
//   {
//        "type" : "p",
//        "text_zh" : "",
//        "text_en" : ""
//   },
const apiData = [
    {
        "id": 1,
        "imageUrl": "./sources/imgs/companyNews/PrizeKing.png",
        "title_zh": "PrizeKing合作共赢，开启中智企业合作新模式！",
        "title_en": "PrizeKing cooperates for mutual benefit, initiating a new model of China-Chile enterprise cooperation!",
        "description_zh": "10 月 24 日，智利周首天，我们和现场观众一起见证了 “Prizeking 云南蓝莓上市启动仪式”。煜谦从种植到产销全链深耕，通过引进优质 SEKOYA POP 蓝莓品种，结合云南种植基地的区位优势，成功实现了全年稳定供应。始终秉持着 “将最好最新鲜的水果输送至全世界” 的理念。煜谦和智利公司 Prize 的合作，成功实现 “反季补位”，不仅让中国消费者能享受到更长时间的蓝莓供应，更是成为中智经贸合作的典范。",
        "description_en": "On October 24th, the first day of Chile Week, we witnessed the 'Prizeking Yunnan Blueberry Launch Ceremony' together with the on-site audience. Yuqian has been deeply engaged in the entire chain from cultivation to production and sales. By introducing the high-quality SEKOYA POP blueberry variety and leveraging the geographical advantages of its Yunnan planting base, it has successfully achieved a stable year-round supply. It has always adhered to the philosophy of 'delivering the best and freshest fruits to the whole world'. The cooperation between Yuqian and the Chilean company Prize has successfully achieved 'off-season supplementation'. This not only allows Chinese consumers to enjoy a longer supply of blueberries, but also sets an example for China-Chile economic and trade cooperation.",
        "contentList": [
            {
                "type": "p",
                "text_zh": "煜谦引进优质 SEKOYA POP 蓝莓品种。",
                "text_en": "Yuqian introduces high-quality SEKOYA POP blueberry varieties.",
            },
            {
                "type": "image",
                "imageUrl": "./sources/imgs/newsDetail/pk01.png",
            },
            {
                "type": "p",
                "text_zh": "10月24日，智利周首天，我们和现场观众一起见证了“Prizeking云南蓝莓上市启动仪式”煜谦从种植到产销全链深耕，通过引进优质SEKOYAPOP蓝莓品种，结合云南种植基地的区位优势，成功实现了全年稳定供应。始终秉持着“将最好最新鲜的水果输送至全世界”的理念。",
                "text_en": "On October 24th, the first day of Chile Week, we witnessed the 'Prizeking Yunnan Blueberry Launch Ceremony' together with the on-site audience. Yuqian has been deeply engaged in the entire chain from planting to production and sales. By introducing the high-quality SEKOYAPOP blueberry variety and leveraging the geographical advantages of the Yunnan planting base, it has successfully achieved a stable annual supply. It has always adhered to the concept of 'delivering the best and freshest fruits to the whole world'."
            },
            {
                "type": "p",
                "text_zh": "煜谦和智利公司Prize的合作，成功实现反季补位”，不仅让中国消费者能享受到更长时间的蓝莓供应，更是成为中智经贸合作的典范。",
                "text_en": "Yu Qian's cooperation with the Chilean company Prize has successfully achieved 'off-season supplementation'. This not only allows Chinese consumers to enjoy a longer supply of blueberries, but also sets a model for China-Chile economic and trade cooperation."
            },
            {
                "type": "image",
                "imageUrl": "./sources/imgs/newsDetail/pk02.png",
            },
            {
                "type": "p",
                "text_zh": "活动现场，煜谦和Prize代表与智利领事及大使共同在智利周开幕式亮灯，亮灯仪式结束后，主持人介绍Prizeking项目，更有来自2000公里外云南Prizeking基地的惊喜礼盒-蓝莓鲜枝，双方企业代表和大使共同采下蓝莓果实并把鲜枝分发给现场观众，活动现场热闹非凡。",
                "text_en": "At the event site, Yuqian and representatives from Prize, together with the Chilean Consul and Ambassador, lit the lights at the opening ceremony of Chile Week. After the lighting ceremony, the host introduced the Prizeking project. There was also a surprise gift box from the Prizeking base in Yunnan, 2,000 kilometers away - fresh blueberry branches. Representatives from both companies and the Ambassador picked blueberries together and distributed the fresh branches to the audience on site. The event was lively and extraordinary."
            },
            {
                "type": "image",
                "imageUrl": "./sources/imgs/newsDetail/pk03.png",
            },
            {
                "type": "p",
                "text_zh": "这些裹着厚重果粉的蓝色果实",
                "text_en": "These blue fruits covered with a thick layer of bloom",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "凝聚着中智两国农业合作的智慧与汗水",
                "text_en": "It embodies the wisdom and sweat of agricultural cooperation between China and Chile.",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "也承载着两地农民对美好生活的共同向往",
                "text_en": "Embodies the wisdom and sweat of agricultural cooperation between China and Chile",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "最后，让我们一起期待",
                "text_en": "Finally, let's look forward to it together",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "并预祝 Prizeking 云南蓝莓大卖！",
                "text_en": "And we wish Prizeking Yunnan blueberries a great sale!",
                "textAlign": 'center'
            }
        ],
        "time": "2025-10-24",
        "link": "/news/detail/1"
    },
    {
        "id": 2,
        "imageUrl": "./sources/imgs/companyNews/lanbaoshi.jpg",
        "title_zh": "IFG六品种合法化项目申请已正式截止",
        "title_en": "The application for the IFG six-variety legalization project has officially closed.",
        "description_zh": "IFG 六品种 (以商标 SWEET SAPPHIRE™、甜蜜蓝宝石™销售) 合法化计划的申请窗口现已关闭。BLOOM FRESH 感谢所有在此期间提出合法化申请的种植者，以及我们的合作伙伴百果种业、好果云和煜谦农业，为支持合法、安全、高品质和繁荣的中国鲜食葡萄行业所做的不懈努力。我们将随后发布关于我们努力保护和支持该品种、品牌的进一步信息。",
        "description_en": "The application window for the legalization plan of the six IFG varieties (sold under the trademarks SWEET SAPPHIRE™ and 甜蜜蓝宝石™) is now closed. BLOOM FRESH would like to thank all growers who submitted legalization applications during this period, as well as our partners Baiguo Seed Industry, Haoguo Cloud, and Yuqian Agriculture, for their unremitting efforts in supporting a legal, safe, high-quality, and prosperous Chinese fresh table grape industry. We will subsequently release further information on our efforts to protect and support these varieties and brands.",
        "contentList": [
            {
                "type": "p",
                "text_zh": "IFG 六品种 (以商标 SWEET SAPPHIRE™、甜蜜蓝宝石™销售) 合法化计划的申请窗口现已关闭。",
                "text_en": "The application window for the legalization plan of the six IFG varieties (sold under the trademarks SWEET SAPPHIRE™ and 甜蜜蓝宝石™) is now closed.",
            },
            {
                "type": "p",
                "text_zh": "BLOOM FRESH 感谢所有在此期间提出合法化申请的种植者，以及我们的合作伙伴百果种业、好果云和煜谦农业，为支持合法、安全、高品质和繁荣的中国鲜食葡萄行业所做的不懈努力。",
                "text_en": "BLOOM FRESH would like to thank all growers who have submitted legalization applications during this period, as well as our partners Baiguo Seed Industry, Haoguoyun, and Yuqian Agriculture, for their unremitting efforts in supporting a legal, safe, high-quality, and prosperous Chinese fresh table grape industry.",
            },
            {
                "type": "p",
                "text_zh": "我们将随后发布关于我们努力保护和支持该品种、品牌的进一步信息。",
                "text_en": "We will subsequently release further information about our efforts to protect and support this breed and brand.",
            },
            {
                "type": "h2",
                "text_zh": "BLOOM FRESH的IFG六品种合法化项目申请已正式截止",
                "text_en": "The application for BLOOM FRESH's IFG six-variety legalization project has officially closed.",
                "textAlign": 'center'
            },
            {
                "type": "p",
                "text_zh": "中国上海 ，2025年11月3日",
                "text_en": "Shanghai, China, November 3, 2025",
            },
            {
                "type": "p",
                "text_zh": "BLOOM FRESH International Ltd.宣布，IFG 六品种在中国为期六个月的合法化项目申请窗口于2025年10月31日已正式关闭。",
                "text_en": "BLOOM FRESH International Ltd. announced that the application window for the six-variety legalization project of IFG in China, which lasts for six months, was officially closed on October 31, 2025.",
            },
            {
                "type": "p",
                "text_zh": "这标志着全球最具标志性、最有特色的鲜食葡萄品种之一，IFG六品种迎来了一个重要的里程碑，该品种以“SWEET SAPPHIRE™和“甜蜜蓝宝石™”商标进行销售。",
                "text_en": "This marks an important milestone for one of the world's most iconic and distinctive fresh-eating grape varieties, the IFG Six, which is sold under the trademarks 'SWEET SAPPHIRE™' and '甜蜜蓝宝石™'.",
            },
            {
                "type": "p",
                "text_zh": "该项目的第一阶段由BLOOM FRESH与行业领军企业百果种业、好果云和煜谦农业合作，为非法种植者提供机会，通过主动申请加入特赦计划而避免被起诉，同时获得BLOOM FRESH世界一流的技术、质量和市场营销支持。该项目致力于打造“SWEET SAPPHIRE™”和“甜蜜蓝宝石™”的品牌影响力，拉动消费需求，为各方创造更高价值。",
                "text_en": "The first phase of this project is a collaboration between BLOOM FRESH and leading industry enterprises such as Baiguo Seed Industry, Haoguo Cloud, and Yuqian Agriculture. It provides opportunities for illegal growers to avoid prosecution by proactively applying to join the amnesty program, while also gaining access to BLOOM FRESH's world-class technical, quality, and marketing support. This project is committed to building the brand influence of 'SWEET SAPPHIRE™' and '甜蜜蓝宝石™', stimulating consumer demand, and creating greater value for all parties involved.",
            },
            {
                "type": "p",
                "text_zh": "在为期六个月的申请期内，BLOOM FRESH在中国多个省份开展了广泛的巡回宣讲活动。我们与合作伙伴一起，与种植户、地方政府和利益相关者会面，分享成为IFG 六授权种植户和参与该项目的好处，并说明合法化流程和申请方法。",
                "text_en": "During the six-month application period, BLOOM FRESH conducted extensive roadshow activities in multiple provinces across China. Together with our partners, we met with growers, local governments, and stakeholders to share the benefits of becoming an IFG-authorized grower and participating in the project, as well as to explain the legalization process and application methods.",
            },
            {
                "type": "p",
                "text_zh": "BLOOM FRESH还与批发商、零售商和出口商等供应链相关方沟通，敦促他们停止销售未经授权的水果，并鼓励其供应商申请参与合法化项目。",
                "text_en": "BLOOM FRESH also communicates with supply chain stakeholders such as wholesalers, retailers, and exporters, urging them to stop selling unauthorized fruits and encouraging their suppliers to apply for participation in the legalization project.",
            },
            {
                "type": "p",
                "text_zh": "随着合法化项目第一阶段结束并关闭申请窗口，BLOOM FRESH将继续审核和评估收到的申请，尽快审批所有已提交完整申请的种植户。",
                "text_en": "With the conclusion of the first phase of the legalization project and the closure of the application window, BLOOM FRESH will continue to review and evaluate the received applications, and approve all growers who have submitted complete applications as soon as possible.",
            },
            {
                "type": "p",
                "text_zh": "鉴于项目的成功，BLOOM FRESH将增加对“SWEET SAPPHIRE™”和“甜蜜蓝宝石™”的营销和推广力度，并倾力支持参与合法种植、采购和零售的产业链合作伙伴。",
                "text_en": "In view of the project's success, BLOOM FRESH will increase its marketing and promotion efforts for 'SWEET SAPPHIRE™' and '甜蜜蓝宝石™', and will fully support industrial chain partners engaged in legal planting, purchasing and retailing.",
            },
            {
                "type": "p",
                "text_zh": "BLOOM FRESH 特别感谢本项目的合作伙伴百果种业、好果云和煜谦农业，感谢他们为本项目带来的远见卓识、满腔热情和专业知识。BLOOM FRESH 期待继续与他们携手合作，在中国推广这一独特的品种。",
                "text_en": "BLOOM FRESH would like to express special thanks to the project partners, Baiguo Seed Industry, Haoguoyun, and Yuqian Agriculture, for bringing their vision, enthusiasm, and expertise to this project. BLOOM FRESH looks forward to continuing to work hand in hand with them to promote this unique variety in China.",
            },
            {
                "type": "p",
                "text_zh": "未来几个月，BLOOM FRESH 将发布更多关于保护与支持 IFG 六品种和 “SWEET SAPPHIRE™” 、“甜蜜蓝宝石™”品牌的最新进展。",
                "text_en": "In the coming months, BLOOM FRESH will release more updates on the protection and support of the six IFG varieties, as well as the 'SWEET SAPPHIRE™' and '甜蜜蓝宝石™' brands.",
            },
        ],
        "time": "2025-11-4",
        "link": "/news/detail/2"
    },
    {
        "id": 3,
        "imageUrl": "./sources/imgs/companyNews/SweetEarth.png",
        "title_zh": "甜蜜地球™上市发布会在安徽滁州成功举办",
        "title_en": "The Sweet Earth™ Launch Conference was successfully held in Chuzhou, Anhui Province.",
        "description_zh": "9 月 9 日，一场超燃的 “甜蜜地球™” 上市发布会暨国际经销商大会在“醉美滁州”火热开启！来自国内外共100多位行业同仁齐聚一堂，共同见证这一甜蜜时刻！当天上午，嘉宾们一头扎进 BLOOM FRESH™ 的甜蜜地球™葡萄园参观游园，圆嘟嘟的葡萄吸引着众人上手摸一摸，感受着这份甜蜜蜜的丰收喜悦。",
        "description_en": "On September 9th, a thrilling 'Sweet Earth™' launch conference and international distributors' conference kicked off in 'Charming Chuzhou'! Over 100 industry colleagues from home and abroad gathered together to witness this sweet moment! On the morning of that day, the guests dived into BLOOM FRESH™'s Sweet Earth™ vineyard for a visit. The plump grapes attracted everyone to reach out and touch them, feeling the sweet joy of harvest.",
        "time": "2025-9-20",
        "link": "/news/detail/3"
    },
    {
        "id": 4,
        "imageUrl": "./sources/imgs/companyNews/avocado_port.png",
        "title_zh": "新季2025-2026年度第一柜智利牛油果靠港",
        "title_en": "The first container of Chilean avocados for the new 2025-2026 season has arrived at the port.",
        "description_zh": "9 月 8 日，煜谦集团 2025-2026 产季第一柜智利牛油果靠上海港。这也是新产季到达中国市场的第一柜智利牛油果。作为中国主要的牛油果进口商和分销商，目前，煜谦集团在全国十二个城市设有档口及分仓，并在北京，上海，广州等主要城市拥有自建的牛油果催熟库。形成了批发，零售，餐饮，电商等多渠道体系齐头并进的全国牛油果产业布局。",
        "description_en": "On September 8th, Yuqian Group's first container of Chilean avocados for the 2025-2026 season arrived at Shanghai Port. This is also the first container of Chilean avocados to reach the Chinese market in the new season. As a major avocado importer and distributor in China, Yuqian Group currently has stalls and warehouses in twelve cities across the country, and owns self-built avocado ripening facilities in major cities such as Beijing, Shanghai, and Guangzhou. It has formed a nationwide avocado industry layout with multiple channels including wholesale, retail, catering, and e-commerce advancing in parallel.",
        "time": "2025-9-9",
        "link": "/news/detail/4"
    },
    {
        "id": 5,
        "imageUrl": "./sources/imgs/companyNews/OZBLU.png",
        "title_zh": "三曜共聚·鲜启蓝莓新势力",
        "title_en": "Three Suns Converge · Freshly Launching the New Force of Blueberries",
        "description_zh": "2025 年 8 月 30 日，全球高端蓝莓品牌 OZBLU 携手永辉超市与煜谦集团，于龙湖・上海奉贤天街隆重举办 “三曜共聚・鲜启蓝莓新势力” 蓝莓开季盛典。秘鲁驻中国上海总领事馆经济商务处商务参赞 Bernardo Muñoz 先生亲临现场并致辞，三方企业高层代表共同出席，标志着 OZBLU 蓝莓新产季在中国市场的正式启动。",
        "description_en": "On August 30, 2025, the global high-end blueberry brand OZBLU, together with Yonghui Supermarket and Yuqian Group, grandly held the 'Tripartite Gathering · Freshly Launching the New Force of Blueberries' blueberry season-opening ceremony at Longfor · Shanghai Fengxian Tianjie. Mr. Bernardo Muñoz, Commercial Counselor of the Economic and Commercial Office of the Consulate General of Peru in Shanghai, China, attended the event and delivered a speech. Senior representatives of the three enterprises attended the event, marking the official launch of OZBLU blueberries in the new season in the Chinese market.",
        "time": "2025-9-1",
        "link": "/news/detail/5"
    },
    {
        "id": 6,
        "imageUrl": "./sources/imgs/companyNews/BLOOM_FRESH.jpg",
        "title_zh": "BLOOM FRESH 宣布在中国取得知识产权保护重大胜利",
        "title_en": "BLOOM FRESH announces a major victory in obtaining intellectual property protection in China",
        "description_zh": "2025 年 7 月，上海。经过数月的调查和维权行动，全球最大的鲜食葡萄、樱桃和蓝莓育种公司之一，BLOOM FRESH International Limited（BLOOM FRESH）成功地销毁了一批非法种植的 IFG 十品种的苗木。在此案中，IFG 十品种（BLOOM FRESH 的注册商标为 SWEET GLOBE™和甜蜜地球™）的苗木和果品被侵权方以 “玲珑星光” 的名义进行销售，严重侵犯了 BLOOM FRESH 的植物新品种权 ®。",
        "description_en": "July 2025, Shanghai. After several months of investigation and rights protection actions, BLOOM FRESH International Limited (BLOOM FRESH), one of the world's largest breeding companies for fresh table grapes, cherries, and blueberries, successfully destroyed a batch of illegally planted seedlings of the ten IFG varieties. In this case, the seedlings and fruits of the ten IFG varieties (BLOOM FRESH's registered trademarks are SWEET GLOBE™ and 甜蜜地球™) were sold by the infringing party under the name '玲珑星光', which seriously infringed upon BLOOM FRESH's plant variety rights ®.",
        "time": "2025-8-11",
        "link": "/news/detail/6"
    },
    {
        "id": 7,
        "imageUrl": "./sources/imgs/companyNews/IFG.jpg",
        "title_zh": "BLOOM FRESH 声明：维护IFG 六品种合法权益，支持产业健康发展",
        "title_en": "BLOOM FRESH Statement: Safeguard the legitimate rights and interests of the six IFG varieties and support the healthy development of the industry",
        "description_zh": "我们谨此致函，发布有关 IFG 六品种的重要声明。该葡萄品种果实的注册商标为甜蜜蓝宝石™、 Sweet Sapphire™ 和Oriental Sapphire™，市场上也常被称为蓝宝石葡萄、金手指葡萄或黑手指葡萄等等。BLOOM FRESH International Limited（“BLOOM FRESH”） 是 IFG 六品种的唯一品种权人，也是甜蜜蓝宝石™、Sweet Sapphire™ 和Oriental Sapphire™等注册商标在中国的所有权人。未经授权种植 IFG 六品种、销售其果实以及使用相关注册商标将构成知识产权侵权行为。BLOOM FRESH 正在积极监控和收集侵犯其知识产权的证据，并将对任何侵权行为采取坚决行动。",
        "description_en": "We are writing to issue an important statement regarding the IFG Six varieties. The registered trademarks for the fruits of this grape variety are Sweet Sapphire™, Sweet Sapphire™, and Oriental Sapphire™, and they are also commonly known in the market as sapphire grapes, golden finger grapes, or black finger grapes, among others. BLOOM FRESH International Limited ('BLOOM FRESH') is the sole variety rights holder of the IFG Six varieties and the owner of registered trademarks such as Sweet Sapphire™, Sweet Sapphire™, and Oriental Sapphire™ in China. Unauthorized cultivation of the IFG Six varieties, sale of their fruits, and use of the relevant registered trademarks will constitute intellectual property infringement. BLOOM FRESH is actively monitoring and collecting evidence of intellectual property infringement and will take firm action against any infringing activities.",
        "time": "2025-8-9",
        "link": "/news/detail/7"
    },
    {
        "id": 8,
        "imageUrl": "./sources/imgs/companyNews/cherry.png",
        "title_zh": "四季淬炼·终成甜蜜|陕西铜川基地车厘子成长日记",
        "title_en": "Tempered by the Four Seasons · Finally Blossoming into Sweetness | Growth Diary of Cherries at the Tongchuan Base in Shaanxi",
        "description_zh": "2025 年1月 24 日 星期五 雪,冬日垫伏:在冻土下埋下甜蜜的梦 今天基地又落雪了,整片园子像盖了白棉被,拨开雪层摸了摸树干,底下的根系正憋着劲往下钻 -- 零下 15℃的冻土下,这些「沉睡的勇士,正把寒冷化作养分,每一道根须的伸展,都是在为春天储能量~",
        "description_en": "Friday, January 24, 2025, Snowy. Winter Hibernation: Burying Sweet Dreams Under Frozen Soil. It snowed again at the base today. The entire garden is like being covered with a white quilt. I pushed aside the snow and touched the tree trunk; the roots underneath are struggling to drill downwards. Under the frozen soil at minus 15℃, these 'sleeping warriors' are turning the cold into nutrients. Every stretch of a root is storing energy for spring~",
        "time": "2025-6-11",
        "link": "/news/detail/8"
    }
];

// 2. 分页核心配置
let pageConfig = {
    currentPage: 1, // 当前页码
    rowsPerPage: 2, // 每页显示"行数"（不是卡片数）
    cardsPerRow: 3, // 每行卡片数（默认3个，响应式时会动态调整）
    totalData: apiData.length // 总数据量
};

// 3. 计算每行卡片数（适配响应式）
function getCardsPerRow() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) return 1; // 小屏幕每行1个
    if (screenWidth <= 1200) return 2; // 中等屏幕每行2个
    return 3; // 大屏幕每行3个
}

// 导航到新闻详情页
function navigateToNewsDetail(newsId) {
    // 隐藏所有页面
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    // 显示新闻详情页
    const detailPage = document.getElementById('company_news_detail');
    detailPage.classList.add('active');
    detailPage.style.display = 'block';

    // 更新URL，使用history API添加历史记录
    history.pushState({ page: 'news-detail', id: newsId }, `新闻详情`, `/news/detail?id=${newsId}`);

    // 加载新闻详情内容
    loadNewsDetail(newsId);
}

// 加载新闻详情内容
function loadNewsDetail(newsId) {
    let newDetail;
    apiData.forEach(item => {
        if (item.id == newsId)
            newDetail = item;
    });
    if (!newDetail)
        return;
    renderNewsDetail(newDetail);
}

// 渲染新闻详情
function renderNewsDetail(news) {
    const detailPage = document.getElementById('company_news_detail');
    const newDetailContainer = document.createElement('div');
    newDetailContainer.className = 'new_detail_container'
    let newDetailHTML = `
        <div class="new_title-container">
            <h1 class="new_main-title">
                <span class="en hidden">${news.title_en}</span>
                <span class="zh">${news.title_zh}</span>
            </h1>
            <div class="new_title-line"></div>
            <div class="new_date">${news.time}</div>
        </div>`;
    if (!news["contentList"] || news["contentList"].length == 0) {
        newDetailHTML += `
            <p>
                <span class="en hidden">${news.description_en}</span>
                <span class="zh">${news.description_zh}</span>
            </p>
            <img src="${news.imageUrl}" 
                alt="" class="new_content-img">
            <p>
                <span class="en hidden">${news.description_en}</span>
                <span class="zh">${news.description_zh}</span>
            </p>
        `;
    }
    if (news["contentList"] && news["contentList"].length > 0) {
        news["contentList"].forEach(item => {
            switch (item['type']) {
                case 'p':
                    newDetailHTML += `
                        <p style='text-align: ${item.textAlign ? item.textAlign : ''}'>
                            <span class="en hidden">${item.text_en}</span>
                            <span class="zh">${item.text_zh}</span>
                        </p>`;
                    break;
                case 'h2':
                    newDetailHTML += `
                        <h2 class="new_section-title" style='text-align: ${item.textAlign ? item.textAlign : ''}'>
                            <span class="en hidden">${item.text_en}</span>
                            <span class="zh">${item.text_zh}</span>
                        </h2>`;
                    break;
                case 'image':
                    newDetailHTML += `<img src="${item['imageUrl']}" alt="" class="new_content-img">`;
                    break;
                default:
                    break;
            }
        });
    }

    newDetailContainer.innerHTML = newDetailHTML;
    detailPage.appendChild(newDetailContainer);
    scrollToTop();
}

// 滚动到顶部的工具函数
function scrollToTop() {
    // 方案1：直接滚动（大部分浏览器支持）
    window.scrollTo({
        top: 0,
        behavior: 'auto' // 直接跳转，无动画（如需动画可改为 'smooth'）
    });

    // 兼容老旧浏览器
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// 返回新闻列表页
function goBackToNewsList() {
    // 隐藏详情页，显示列表页
    document.getElementById('company_news_detail').classList.remove('active');
    document.getElementById('company_news_detail').style.display = 'none';
    document.getElementById('company_news').classList.add('active');
    document.getElementById('company_news').style.display = 'block';

    // 更新URL
    history.pushState({ page: 'news' }, '公司新闻', '/news');
}

// 4. 渲染卡片（根据当前页码和行数计算要显示的卡片）
function renderCards() {
    const companyNewsContainer = document.getElementById("companyNewsContainer");
    const companyNewsloadMoreBtn = document.getElementById("companyNewsloadMoreBtn");
    const companyNewsnoMoreText = document.getElementById("companyNewsnoMoreText");

    // 初始化每行卡片数（响应式适配）
    pageConfig.cardsPerRow = getCardsPerRow();

    // 计算当前页要显示的卡片范围
    const startIndex = (pageConfig.currentPage - 1) * pageConfig.rowsPerPage * pageConfig.cardsPerRow;
    const endIndex = Math.min(
        pageConfig.currentPage * pageConfig.rowsPerPage * pageConfig.cardsPerRow,
        pageConfig.totalData
    );
    const currentData = apiData.slice(startIndex, endIndex);

    // 情况1：数组为空时显示无数据提示
    if (pageConfig.totalData === 0) {
        companyNewsContainer.innerHTML = '<div class="empty-tip">暂无相关数据</div>';
        companyNewsloadMoreBtn.style.display = "none";
        companyNewsnoMoreText.style.display = "none";
        return;
    }

    const lang = localStorage.getItem('language');
    // 情况2：渲染当前页卡片（追加模式，不是替换）
    currentData.forEach(item => {
        const card = document.createElement("div");
        card.className = "interactive-card";
        card.dataset.id = item.id;
        card.addEventListener('click', () => {
            navigateToNewsDetail(item.id);
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
          <p class="card-time">${item.time}</p>
        </div>
      `;
        companyNewsContainer.appendChild(card);
    });

    // 情况3：判断是否还有更多数据，控制按钮和文本显示
    const hasMore = endIndex < pageConfig.totalData;
    companyNewsloadMoreBtn.style.display = hasMore ? "inline-block" : "none";
    companyNewsnoMoreText.style.display = hasMore ? "none" : "block";
}

// 5. 查看更多按钮事件（加载下两行）
document.getElementById("companyNewsloadMoreBtn").addEventListener("click", () => {
    pageConfig.currentPage++; // 页码+1（对应加载下两行）
    renderCards(); // 追加渲染下两行卡片
});

// 6. 窗口大小变化时重新计算每行卡片数，并重绘（响应式适配）
window.addEventListener("resize", () => {
    // 保存当前已显示的卡片总数
    const displayedCount = (pageConfig.currentPage - 1) * pageConfig.rowsPerPage * pageConfig.cardsPerRow;
    // 重新计算每行卡片数
    const newCardsPerRow = getCardsPerRow();
    // 如果每行卡片数变化，重新计算页码并刷新
    if (newCardsPerRow !== pageConfig.cardsPerRow) {
        pageConfig.cardsPerRow = newCardsPerRow;
        // 重新计算当前页码（保证已显示的卡片总数不变）
        pageConfig.currentPage = Math.ceil(displayedCount / (pageConfig.rowsPerPage * pageConfig.cardsPerRow)) || 1;
        // 清空容器重新渲染
        document.getElementById("companyNewsContainer").innerHTML = "";
        renderCards();
    }
});

// 7. 页面加载完成后渲染初始两行数据
window.onload = function () {
    renderCards();
};