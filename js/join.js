// 简单的滚动动画（可选）
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });
});

// 初始设置透明度，实现滚动渐显效果
document.querySelectorAll('section').forEach((section, index) => {
    if(index > 1){
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s, transform 0.5s';
    }
});