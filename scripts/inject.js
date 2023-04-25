hexo.extend.filter.register('theme_inject', function (injects) {
 injects.bodyEnd.raw('adsense', '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1018224004040493" crossorigin="anonymous"></script>')
 injects.head.raw('adsense', '<style>ins.adsbygoogle[data-ad-status="unfilled"] { display: none !important; }</style>')
 injects.postCopyright.raw('adsense', '<div style="width:100%;display:flex;justify-content:center;margin-bottom:1.5rem"><ins class="adsbygoogle" style="display:flex;justify-content:center;max-width:845px;width:100%;height:90px" data-ad-client="ca-pub-1018224004040493" data-ad-slot="yyyyyy"></ins><script> (adsbygoogle = window.adsbygoogle || []).push({}); </script></div>')
})
