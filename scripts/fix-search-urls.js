// 修复 hexo-generator-search 在 content:false 时 URL 生成的双斜杠问题
hexo.extend.filter.register('after_generate', function() {
  const fs = require('fs');
  const path = require('path');
  const searchXmlPath = path.join(hexo.public_dir, 'search.xml');

  if (fs.existsSync(searchXmlPath)) {
    let content = fs.readFileSync(searchXmlPath, 'utf8');
    // 修复 <link href="//...  →  <link href="/...
    content = content.replace(/href="\/\//g, 'href="/');
    // 修复 <url>//...  →  <url>/...
    content = content.replace(/<url>\/\//g, '<url>/');
    fs.writeFileSync(searchXmlPath, content);
  }
});
