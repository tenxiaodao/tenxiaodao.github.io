var posts=["/loic-gong-ju-de-jie-shao-yu-shi-yong/","/scrapy-an-zhuang-yu-bu-shu-xiang-xi-jiao-cheng/","/zai-windows11-xia-yong-wsl2-an-zhuang-ubuntu-zi-xi-tong-an-zhuang-kvm-yun-xing-macos/","/linux-ji-chu-ming-ling-su-cha-ru-men/","/sticky-note-wall/","/openeuler-chang-yong-ming-ling-yu-guan-li-zhi-nan/","/wan-ke-yun-zuo-qing-nas-di-cheng-ben-kan-fan/","/openeuler-de-an-zhuang-jiao-cheng/","/jiao-huan-ji-de-gong-zuo-yuan-li/","/ru-he-zai-wei-xin-li-bu-shu-ai-nv-you-kourichat-jiao-cheng/","/office-wps-xia-zai/","/diy-dian-zi-nv-you-xiao-zhi/","/tcp-yu-udp-de-qu-bie/","/linux-ming-ling-da-quan/","/ru-he-pei-zhi-duan-kou-ju-he/","/windows-xi-tong-xia-zai-cang-chu-zhan/","/my-2025-review/","/data-center-internship/","/oneclip-kai-fa-jing-yan-fen-xiang-cong-ling-dao-yi-de-macos-ying-yong-kai-fa/","/ru-he-zhu-ce-chatgpt/","/hexo-bo-ke-xing-neng-you-hua-zhi-nan/","/opcloud-usage/","/living-in-datong/","/ci-cd-auto-deploy-guide/","/hei-ping-guo-ji-chu/","/surfacepro4/","/anime-that-accompanied-me/","/github-actions-guide/","/my-homelab-setup/","/codex-shiyong-zhinan/","/macbook-air-m4-unboxing/","/deploy-openclaw-on-oect-with-wechat/","/mineradio-macos-port/","/batch-convert-images-to-webp/","/cowagent-fnnas-deploy/","/strike-force-shoot-em-up/","/synergy-kvm-share/","/headroom-fnnas-deploy/","/codex-cli-disk-write-fix/","/headroom-cc-switch-glm/","/vm-xu-ni-ji-an-zhuang-jiao-cheng/","/guan-yu-wang-zhan/","/scrapy-an-zhuang-yu-bu-shu-xiang-xi-jiao-cheng/","2026/09/19/26-9-19infosec-competition/","/hexo-yi-nan-jie-da/","/hexo-zhu-ti-pei-zhi-jiao-cheng/","/zou-jin-markdown-de-shi-jie/","/quan-guo-shu-xue-jian-mo-da-sai-e-ti-zhuan-ke-zu-jie-ti-si-lu-fu-dai-ma/","/shi-yong-hexo-github-pages-da-jian-ge-ren-wang-zhan/","/hexo-ru-he-xie-wen-zhang/","2026/09/19/ctf/"];function toRandomPost(){
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