var posts=["2024/09/03/Hexo主题配置教程/","2024/09/04/Hexo如何写文章/","2024/09/03/hexo疑难解答/","2024/09/03/GitHub搭建个人网站/","2024/09/06/全国数学建模大赛E题专科组解题思路/","2024/09/09/走进 Markdown 的世界/","2024/09/02/关于网站/","2024/09/02/日本无条件投降79周年/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };