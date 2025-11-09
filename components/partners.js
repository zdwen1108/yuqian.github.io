// OverseasPartners.js
class OverseasPartners {
    constructor(containerId, options = {}) {
        // 默认配置
        this.defaultOptions = {
            title: '国外合作商',
            titleEn: 'overseas partners',
            noteText: '更多品牌合作商 持续加入中...<br>以上排名不分先后',
            noteTextEn: 'Expecting cooperation with more partners...<br>The above rankings are not in any particular order.',
            partners: [
                {imageUrl: './sources/imgs/partners/partners01.png',text: 'Agrokasa'},
                
            ],
            // 占位图配置
            placeholder: {
                width: 100,
                height: 60
            }
        };

        // 合并配置
        this.options = { ...this.defaultOptions, ...options };
        this.container = document.getElementById(containerId);

        if (!this.container) {
            console.error('容器元素不存在');
            return;
        }

        this.init();
    }

    // 初始化组件
    init() {
        this.renderStyles();
        this.renderHTML();
    }

    // 渲染样式
    renderStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .overseas-partners * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Microsoft Yahei", sans-serif;
      }
      .overseas-partners .section-partners-title {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
      }
      .overseas-partners .title-cn {
        background-color: #008080;
        color: white;
        padding: 8px 15px;
        border-radius: 5px;
        font-size: 18px;
        margin-right: 10px;
      }
      .overseas-partners .title-en {
        color: #008080;
        font-size: 16px;
        font-weight: 500;
      }
      .overseas-partners .partners-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 20px;
      }
      .overseas-partners .partner-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: white;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 10px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .overseas-partners .partner-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      .overseas-partners .partner-item img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .overseas-partners .cooperation-note {
        margin-top: 30px;
        color: #666;
        font-size: 14px;
        line-height: 1.5;
      }
      @media (max-width: 1768px) {
        .overseas-partners .partners-grid {
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        }
        .overseas-partners .partner-item {
          height: 80px;
        }
      }
    `;
        document.head.appendChild(style);
    }

    // 渲染HTML结构
    renderHTML() {
        // 创建主容器
        const mainContainer = document.createElement('div');
        mainContainer.className = 'overseas-partners ';

        // 渲染标题
        mainContainer.innerHTML = `
      <div class="section-partners-title">
        <div class="title-cn"> 
            <span class="zh">${this.options.title}</span>
            <span class="en hidden">${this.options.titleEn}</span>
        </div>
      </div>
      <div class="partners-grid">
        ${this.renderPartners()}
      </div>
      <div class="cooperation-note">
        <span class="en hidden">${this.options.noteTextEn}</span>
        <span class="zh">${this.options.noteText}</span>
      </div>
    `;

        this.container.appendChild(mainContainer);
    }

    // 渲染合作商列表
    renderPartners() {
        return this.options.partners.map(partner => {
            return `
        <div class="partner-item">
          <img 
            src="${partner.imageUrl}" 
            alt="${partner.text}"
          >
        </div>
      `;
        }).join('');
    }

    // 更新合作商列表
    updatePartners(newPartners) {
        if (Array.isArray(newPartners)) {
            this.options.partners = newPartners;
            const grid = this.container.querySelector('.partners-grid');
            if (grid) {
                grid.innerHTML = this.renderPartners();
            }
        }
    }
}