var posts=["2024/10/05/10-5LOIC工具的介绍与使用/","2024/10/05/10-5linux下安装scrapy/","2025/01/18/25-3-18交换机的工作原理/","2025/03/20/25-3-20玩客云做轻NAS低成本看番/","2024/10/05/10-5在windows11下用wsl2安装Ubuntu子系统安装kvm运行macos/","2025/03/31/25-3-31TCL和UDP的区别/","2025/04/03/25-4-3如何在 Hexo 中优化博客性能/","2025/04/03/25-4-3如何配置端口聚合/","2025/04/07/25-4-7Office-WPS下载/","2024/09/11/9-11-1vm虚拟机安装/","2025/04/07/25-4-7Windows系统下载仓储站/","2024/09/12/9-12scrapy安装与部署详细教程/","2024/09/04/9-3-2Hexo如何写文章/","2024/09/03/9-3-1GitHub搭建个人网站/","2024/09/02/9-2-1关于网站/","2024/09/03/9-3-3Hexo主题配置教程/","2024/09/03/9-3-4hexo疑难解答/","2024/09/09/9-9走进 Markdown 的世界/","2024/09/06/9-6全国数学建模大赛E题专科组解题思路/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };