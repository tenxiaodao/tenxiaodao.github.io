var posts=["/loic-gong-ju-de-jie-shao-yu-shi-yong/","/zai-windows11-xia-yong-wsl2-an-zhuang-ubuntu-zi-xi-tong-an-zhuang-kvm-yun-xing-macos/","/scrapy-an-zhuang-yu-bu-shu-xiang-xi-jiao-cheng/","/linux-ji-chu-ming-ling-su-cha-ru-men/","/openeuler-chang-yong-ming-ling-yu-guan-li-zhi-nan/","/sticky-note-wall/","/linux-ming-ling-da-quan/","/ru-he-zai-wei-xin-li-bu-shu-ai-nv-you-kourichat-jiao-cheng/","/openeuler-de-an-zhuang-jiao-cheng/","/jiao-huan-ji-de-gong-zuo-yuan-li/","/wan-ke-yun-zuo-qing-nas-di-cheng-ben-kan-fan/","/tcp-yu-udp-de-qu-bie/","/diy-dian-zi-nv-you-xiao-zhi/","/ru-he-pei-zhi-duan-kou-ju-he/","/office-wps-xia-zai/","/windows-xi-tong-xia-zai-cang-chu-zhan/","/hexo-bo-ke-xing-neng-you-hua-zhi-nan/","/claude-codex-install/","/cong-mo-zi-dao-ling-yi-bing-qi-tui-yan-xi-tong-xue-xi-zhi-nan/","/data-center-internship/","/my-2025-review/","/oneclip-kai-fa-jing-yan-fen-xiang-cong-ling-dao-yi-de-macos-ying-yong-kai-fa/","/ru-he-zhu-ce-chatgpt/","/opcloud-usage/","/surfacepro4/","/living-in-datong/","/hei-ping-guo-ji-chu/","/codex-shiyong-zhinan/","/ci-cd-auto-deploy-guide/","/anime-that-accompanied-me/","/github-actions-guide/","/my-homelab-setup/","/macbook-air-m4-unboxing/","/batch-convert-images-to-webp/","/codex-cli-disk-write-fix/","/deploy-openclaw-on-oect-with-wechat/","/strike-force-shoot-em-up/","/mineradio-macos-port/","/cowagent-fnnas-deploy/","/synergy-kvm-share/","/headroom-cc-switch-glm/","/headroom-fnnas-deploy/","/ctf/","/xin-xi-an-quan-guan-li-yu-ping-gu-sheng-sai-bei-kao-zi-liao/","/vm-xu-ni-ji-an-zhuang-jiao-cheng/","/guan-yu-wang-zhan/","/shi-yong-hexo-github-pages-da-jian-ge-ren-wang-zhan/","/hexo-ru-he-xie-wen-zhang/","/hexo-zhu-ti-pei-zhi-jiao-cheng/","/scrapy-an-zhuang-yu-bu-shu-xiang-xi-jiao-cheng/","/hexo-yi-nan-jie-da/","/zou-jin-markdown-de-shi-jie/","/quan-guo-shu-xue-jian-mo-da-sai-e-ti-zhuan-ke-zu-jie-ti-si-lu-fu-dai-ma/"];function toRandomPost(){
    var path = posts[Math.floor(Math.random() * posts.length)];
    if (typeof path === 'string' && path.charAt(0) !== '/') path = '/' + path;
    try {
      if (typeof pjax !== 'undefined' && pjax && typeof pjax.loadUrl === 'function') {
        pjax.loadUrl(path);
      } else {
        window.location.href = path;
      }
    } catch (e) {
      window.location.href = path;
    }
  };
  window.toRandomPost = toRandomPost;