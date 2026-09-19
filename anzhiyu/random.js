var posts=["/loic-gong-ju-de-jie-shao-yu-shi-yong/","/zai-windows11-xia-yong-wsl2-an-zhuang-ubuntu-zi-xi-tong-an-zhuang-kvm-yun-xing-macos/","/scrapy-an-zhuang-yu-bu-shu-xiang-xi-jiao-cheng/","/linux-ji-chu-ming-ling-su-cha-ru-men/","/openeuler-chang-yong-ming-ling-yu-guan-li-zhi-nan/","/sticky-note-wall/","/linux-ming-ling-da-quan/","/ru-he-zai-wei-xin-li-bu-shu-ai-nv-you-kourichat-jiao-cheng/","/openeuler-de-an-zhuang-jiao-cheng/","/jiao-huan-ji-de-gong-zuo-yuan-li/","/wan-ke-yun-zuo-qing-nas-di-cheng-ben-kan-fan/","/tcp-yu-udp-de-qu-bie/","/ru-he-pei-zhi-duan-kou-ju-he/","/office-wps-xia-zai/","/diy-dian-zi-nv-you-xiao-zhi/","/windows-xi-tong-xia-zai-cang-chu-zhan/","/hexo-bo-ke-xing-neng-you-hua-zhi-nan/","/my-2025-review/","/data-center-internship/","/oneclip-kai-fa-jing-yan-fen-xiang-cong-ling-dao-yi-de-macos-ying-yong-kai-fa/","/opcloud-usage/","/ru-he-zhu-ce-chatgpt/","/surfacepro4/","/hei-ping-guo-ji-chu/","/codex-shiyong-zhinan/","/ci-cd-auto-deploy-guide/","/github-actions-guide/","/anime-that-accompanied-me/","/living-in-datong/","/batch-convert-images-to-webp/","/my-homelab-setup/","/macbook-air-m4-unboxing/","/strike-force-shoot-em-up/","/codex-cli-disk-write-fix/","/mineradio-macos-port/","/headroom-fnnas-deploy/","/deploy-openclaw-on-oect-with-wechat/","/headroom-cc-switch-glm/","/cowagent-fnnas-deploy/","2026/09/19/26-9-19infosec-competition/","/synergy-kvm-share/","/vm-xu-ni-ji-an-zhuang-jiao-cheng/","/guan-yu-wang-zhan/","/hexo-ru-he-xie-wen-zhang/","/scrapy-an-zhuang-yu-bu-shu-xiang-xi-jiao-cheng/","/hexo-zhu-ti-pei-zhi-jiao-cheng/","/shi-yong-hexo-github-pages-da-jian-ge-ren-wang-zhan/","/zou-jin-markdown-de-shi-jie/","/hexo-yi-nan-jie-da/","/quan-guo-shu-xue-jian-mo-da-sai-e-ti-zhuan-ke-zu-jie-ti-si-lu-fu-dai-ma/","2026/09/19/ctf/"];function toRandomPost(){
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