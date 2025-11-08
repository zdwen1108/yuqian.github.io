class FooterComponent {
  constructor(containerId, options = {}) {
    // 默认配置
    this.defaults = {
      // 整体样式
      backgroundColor: '#000000',
      textColor: '#a2a2a2',
      maxWidth: '1200px',
      padding: '0 20px',
      
      // 上部样式
      upperPadding: '40px 0',
      
      // 左侧标题样式
      titleFontSize: '18px',
      titleFontWeight: 'bold',
      titleColor: '#a2a2a2',
      titleGap: '80px', // 大标题之间的间距
      
      // 标题分隔线样式
      titleDividerColor: '#666666',
      titleDividerWidth: '24px',
      titleDividerHeight: '2px',
      titleDividerMargin: '13px 0 22px 0',
      
      // 小标题样式
      subtitleFontSize: '14px',
      subtitleColor: '#a2a2a2',
      subtitleHoverColor: '#ffffff',
      subtitleMarginBottom: '13px',
      
      // 社交媒体样式
      socialGap: '30px',
      socialIconSize: '24px',
      socialTextSize: '16px',
      socialHighlightEffect: 'brightness(1.5)', // 高亮效果
      
      // 二维码气泡样式 (方向向下展示)
      qrcodeBubblePadding: '8px',
      qrcodeBubbleBgColor: '#000000',
      qrcodeBubbleShadow: '0 2px 10px rgba(0,0,0,0.3)',
      qrcodeSize: '120px', // 二维码图片大小
      bubbleArrowSize: '8px', // 气泡箭头大小
      bubbleTopDistance: '10px', // 气泡与logo的距离
      
      // 分隔线样式
      sectionDividerColor: '#333333',
      sectionDividerHeight: '1px',
      sectionDividerMargin: '0 0',
      
      // 底部备案信息样式
      lowerPadding: '20px 0',
      recordFontSize: '12px',
      recordColor: '#999999',
      recordItemSpacing: '15px', // item之间的间隔
      recordImageSize: '16px', // 备案图片大小
      
      // 左侧标题数据
      titles: [
        {
          name_zh: '关于我们',
          name_en: 'About Us',
          subtitles: [
            { text_zh: '公司介绍', text_en: 'Company Introduction', url: '', clickable: true },
            { text_zh: '企业大事记', text_en: 'Corporate Chronology of Events', url: '', clickable: true },
            { text_zh: '企业文化', text_en: 'Corporate culture', url: '', clickable: true },
            { text_zh: '工厂介绍', text_en: 'Factory Introduction', url: '#', clickable: true },
          ]
        },
        {
          name_zh: '新闻公告',
          name_en: 'News Announcement',
          subtitles: [
            { text_zh: '公司新闻', text_en: 'Company News', url: '#', clickable: true },
            { text_zh: '媒体资源库', text_en: 'Media Resource Library', url: '#', clickable: true }
          ]
        },
        {
          name_zh: '联系我们',
          name_en: 'Contact us',
          subtitles: [
            { text_zh: '400-818-0032', text_en: '400-818-0032', url: 'tel:4008180032', clickable: false }
          ]
        }
      ],
      
      // 社交媒体数据
      socials: [
        { 
          type: 'icon',
          icon: '',
          qrcode: '',
          url: '#'
        },
        { 
          type: 'text',
          text_zh: '',
          text_en: '',
          qrcode: '',
          url: '#'
        }
      ],
      
      // 备案信息 (每个item是图片+文字的组合)
      records: [
        { 
          image: null, // 可以不传图片
          text_zh: '京ICP备17027549号-4',
          text_en: '京ICP备17027549号-4',
          url: 'https://beian.miit.gov.cn/#/Integrated/index' 
        },
        { 
          image: '',
          text_zh: '京公网安备11010502052391号',
          text_en: '京公网安备11010502052391号',
          url: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502052391' 
        }
      ]
    };

    // 合并用户配置
    this.options = { ...this.defaults, ...options };
    
    this.container = document.getElementById(containerId);
    
    if (!this.container) {
      console.error('Footer container not found!');
      return;
    }
    
    this.init();
  }
  
  // 初始化组件
  init() {
    this.render();
    this.applyStyles();
    this.bindEvents();
  }
  

  // 更新内容（用于语言切换）
  updateContent(newContent) {
    // 只更新文本内容相关配置，保留样式配置
    this.options = {
      ...this.options,
      titles: newContent.titles || this.options.titles,
      socials: newContent.socials || this.options.socials,
      records: newContent.records || this.options.records
    };
    
    // 重新渲染内容
    this.renderLeftSection();
    this.renderRightSection();
    this.renderLowerSection();
    // 重新绑定事件（因为DOM元素已更新）
    this.bindEvents();
  }

  // 渲染HTML结构
  render() {
    this.container.innerHTML = `
      <div class="footer-inner">
        <!-- 上部区域 -->
        <div class="footer-upper">
          <!-- 左侧标题区域 -->
          <div class="footer-left"></div>
          
          <!-- 右侧社交媒体区域 -->
          <div class="footer-right"></div>
        </div>
        
        <!-- 分隔线 -->
        <div class="footer-divider"></div>
        
        <!-- 下部备案信息区域 -->
        <div class="footer-lower"></div>
      </div>
    `;
    
    this.renderLeftSection();
    this.renderRightSection();
    this.renderLowerSection();
  }
  
  // 渲染左侧标题区域
  renderLeftSection() {
    const leftContainer = this.container.querySelector('.footer-left');
    let html = '';
    
    this.options.titles.forEach(title => {
      html += `
        <div class="footer-title-group">
          <h3 class="footer-main-title">
            <span class="en hidden">${title.name_en}</span>
            <span class="zh">${title.name_zh}</span>
          </h3>
          <div class="title-divider"></div>
          <div class="footer-subtitles">
            ${title.subtitles.map(sub => {
              if (sub.clickable) {
                return `<button class="footer-subtitle" id="footer_button" data-id="${sub.url}">
                    <span class="en hidden">${sub.text_en}</span>
                    <span class="zh">${sub.text_zh}</span>
                </button>`;
              } else {
                return `<span class="footer-subtitle">
                    <span class="en hidden">${sub.text_en}</span>
                    <span class="zh">${sub.text_zh}</span>
                </span>`;
              }
            }).join('')}
          </div>
        </div>
      `;
    });
    
    leftContainer.innerHTML = html;

    // 给标签添加跳转事件
    leftContainer.querySelectorAll("#footer_button").forEach(item => {
      const dataId = item.getAttribute("data-id");
      item.addEventListener("click", ()=>{
        switchPage(dataId, { id: '' }, true)
      })
    })
  }
  
  // 渲染右侧社交媒体区域
  renderRightSection() {
    const rightContainer = this.container.querySelector('.footer-right');
    let html = '';
    
    this.options.socials.forEach((social, index) => {
      let socialContent = '';
      
      // 社交媒体可以是图标或文字
      if (social.type === 'icon' && social.icon) {
        socialContent = `<img src="${social.icon}" alt="social icon" class="social-icon">`;
      } else if (social.type === 'text' && (social.text_zh || social.text_en)) {
        socialContent = `<p class="social-text">
          <span class="en hidden">${social.text_en}</span>
          <span class="zh">${social.text_zh}</span>
        </p>`;
      }
      
      html += `
        <div class="social-item" data-index="${index}">
          <a href="${social.url || '#'}" class="social-link" target="_blank" rel="noopener noreferrer">
            ${socialContent}
          </a>
          <!-- 二维码气泡 (方向向下展示) -->
          <div class="qrcode-bubble">
            <div class="bubble-arrow"></div>
            <img src="${social.qrcode}" alt="" class="qrcode-img">
          </div>
        </div>
      `;
    });
    
    rightContainer.innerHTML = html;
  }
  
  // 渲染底部备案信息区域
  renderLowerSection() {
    const lowerContainer = this.container.querySelector('.footer-lower');
    let html = '<div class="records-container">';
    
    this.options.records.forEach((record, index) => {
      // 添加间隔符（最后一个item不需要）
      if (index > 0) {
        html += `<span class="record-separator"></span>`;
      }
      
      html += `<div class="record-item">`;
      
      // 图片（可选）
      if (record.image) {
        html += `<img src="${record.image}" alt="record icon" class="record-image">`;
      }
      
      // 文字
      if (record.text_zh || record.text_en) {
        html += `<a class="record-text" href="${record.url}">
        <span class="en hidden">${record.text_en}</span>
        <span class="zh">${record.text_zh}</span>
        </a>`;
      }
      
      html += `</div>`;
    });
    
    html += '</div>';
    lowerContainer.innerHTML = html;
  }
  
  // 应用样式
  applyStyles() {
    // 容器样式
    Object.assign(this.container.style, {
      backgroundColor: this.options.backgroundColor,
      color: this.options.textColor,
      width: '100%',
    });
    
    // 内部容器
    const inner = this.container.querySelector('.footer-inner');
    Object.assign(inner.style, {
      maxWidth: this.options.maxWidth,
      margin: '0 auto',
      padding: this.options.padding,
    });
    
    // 上部区域
    const upper = this.container.querySelector('.footer-upper');
    Object.assign(upper.style, {
      display: 'flex',
      justifyContent: 'space-between',
      padding: this.options.upperPadding,
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    });
    
    // 左侧标题区域
    const left = this.container.querySelector('.footer-left');
    Object.assign(left.style, {
      display: 'flex',
      gap: this.options.titleGap,
      flexWrap: 'wrap',
    });
    
    // 标题组
    document.querySelectorAll('.footer-title-group').forEach(group => {
      Object.assign(group.style, {
        minWidth: '120px',
      });
    });
    
    // 大标题
    document.querySelectorAll('.footer-main-title').forEach(title => {
      Object.assign(title.style, {
        fontSize: this.options.titleFontSize,
        fontWeight: this.options.titleFontWeight,
        color: this.options.titleColor,
        margin: '0',
        padding: '0',
      });
    });
    
    // 标题分隔线（大标题与小标题之间）
    document.querySelectorAll('.title-divider').forEach(divider => {
      Object.assign(divider.style, {
        width: this.options.titleDividerWidth,
        height: this.options.titleDividerHeight,
        backgroundColor: this.options.titleDividerColor,
        margin: this.options.titleDividerMargin,
      });
    });
    
    // 小标题容器
    document.querySelectorAll('.footer-subtitles').forEach(container => {
      Object.assign(container.style, {
        display: 'flex',
        flexDirection: 'column',
      });
    });
    
    // 小标题
    document.querySelectorAll('.footer-subtitle').forEach(subtitle => {
      Object.assign(subtitle.style, {
        fontSize: this.options.subtitleFontSize,
        color: this.options.subtitleColor,
        marginBottom: this.options.subtitleMarginBottom,
        textDecoration: 'none',
        transition: 'color 0.3s ease',
        width: 'fit-content',
      });
    });
    
    // 右侧社交媒体区域
    const right = this.container.querySelector('.footer-right');
    Object.assign(right.style, {
      display: 'flex',
      gap: this.options.socialGap,
      alignItems: 'center',
    });
    
    // 社交媒体项
    document.querySelectorAll('.social-item').forEach(item => {
      Object.assign(item.style, {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      });
    });
    
    // 社交媒体链接
    document.querySelectorAll('.social-link').forEach(link => {
      Object.assign(link.style, {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
      });
    });
    
    // 社交媒体图标
    document.querySelectorAll('.social-icon').forEach(icon => {
      Object.assign(icon.style, {
        width: this.options.socialIconSize,
        height: this.options.socialIconSize,
        transition: 'all 0.3s ease',
      });
    });
    
    // 社交媒体文字
    document.querySelectorAll('.social-text').forEach(text => {
      Object.assign(text.style, {
        fontSize: this.options.socialTextSize,
        color: this.options.textColor,
        transition: 'all 0.3s ease',
      });
    });
    
    // 二维码气泡（重点：方向向下展示）
    document.querySelectorAll('.qrcode-bubble').forEach(bubble => {
      Object.assign(bubble.style, {
        position: 'absolute',
        top: `calc(100% + ${this.options.bubbleTopDistance})`, // 从logo下方展示
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: this.options.qrcodeBubbleBgColor,
        padding: this.options.qrcodeBubblePadding,
        borderRadius: '4px',
        boxShadow: this.options.qrcodeBubbleShadow,
        display: 'none',
        zIndex: '10',
      });
    });
    
    // 气泡箭头（向下展示的箭头方向）
    document.querySelectorAll('.bubble-arrow').forEach(arrow => {
      const size = this.options.bubbleArrowSize;
      Object.assign(arrow.style, {
        position: 'absolute',
        top: `-${size}`, // 箭头在气泡顶部
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: `${size} solid transparent`,
        borderRight: `${size} solid transparent`,
        borderBottom: `${size} solid ${this.options.qrcodeBubbleBgColor}`, // 箭头向下
      });
    });
    
    // 二维码图片
    document.querySelectorAll('.qrcode-img').forEach(img => {
      Object.assign(img.style, {
        width: this.options.qrcodeSize,
        height: this.options.qrcodeSize,
      });
    });
    
    // 分隔线（上下部分之间）
    const divider = this.container.querySelector('.footer-divider');
    Object.assign(divider.style, {
      height: this.options.sectionDividerHeight,
      backgroundColor: this.options.sectionDividerColor,
      margin: this.options.sectionDividerMargin,
      width: '100%',
    });
    
    // 下部区域
    const lower = this.container.querySelector('.footer-lower');
    Object.assign(lower.style, {
      padding: this.options.lowerPadding,
    });
    
    // 备案信息容器
    const recordsContainer = this.container.querySelector('.records-container');
    Object.assign(recordsContainer.style, {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: this.options.recordFontSize,
      color: this.options.recordColor,
    });
    
    // 备案项（图片+文字组合）
    document.querySelectorAll('.record-item').forEach(item => {
      Object.assign(item.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '5px', // 图片和文字之间的间隔
      });
    });
    
    // 备案项间隔符
    document.querySelectorAll('.record-separator').forEach(sep => {
      Object.assign(sep.style, {
        width: '20px',
        height: '12px',
        backgroundColor: this.options.backgroundColor,
        margin: `0 ${this.options.recordItemSpacing}px`,
      });
    });
    
    // 备案图片
    document.querySelectorAll('.record-image').forEach(img => {
      Object.assign(img.style, {
        width: this.options.recordImageSize,
        height: this.options.recordImageSize,
        verticalAlign: 'middle',
      });
    });

    // 备案图片
    document.querySelectorAll('.record-text').forEach(text => {
      Object.assign(text.style, {
        color: '#909c9c',
        textDecoration: 'none'
      });
    });
    
    // 响应式样式
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .footer-upper {
          flex-direction: column;
        }
        
        .footer-left {
          margin-bottom: 30px;
          gap: 40px;
        }
        
        .footer-right {
          justify-content: center;
          flex-wrap: wrap;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // 绑定交互事件
  bindEvents() {
    // 小标题悬停效果
    document.querySelectorAll('.footer-subtitle').forEach(subtitle => {
      subtitle.addEventListener('mouseenter', () => {
        subtitle.style.color = this.options.subtitleHoverColor;
      });
      
      subtitle.addEventListener('mouseleave', () => {
        subtitle.style.color = this.options.subtitleColor;
      });
    });
    
    // 社交媒体悬停效果（高亮+显示二维码）
    document.querySelectorAll('.social-item').forEach(item => {
      const icon = item.querySelector('.social-icon');
      const text = item.querySelector('.social-text');
      const bubble = item.querySelector('.qrcode-bubble');
      
      item.addEventListener('mouseenter', () => {
        // 高亮效果
        if (icon) {
          icon.style.filter = this.options.socialHighlightEffect;
        }
        if (text) {
          text.style.filter = this.options.socialHighlightEffect;
        }
        
        // 显示二维码气泡（向下方向）
        if (bubble) {
          bubble.style.display = 'block';
        }
      });
      
      item.addEventListener('mouseleave', () => {
        // 取消高亮
        if (icon) {
          icon.style.filter = 'none';
        }
        if (text) {
          text.style.filter = 'none';
        }
        
        // 隐藏二维码气泡
        if (bubble) {
          bubble.style.display = 'none';
        }
      });
    });
  }
}