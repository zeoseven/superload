/**
 * Superload v1.0.1 (https://github.com/zeoseven/superload/)
 * © 2024 ZeoSeven
 * Licensed under MIT (https://github.com/zeoseven/superload/blob/main/LICENSE)
 */


(function () {

  const c = '[Superload]';
  var firstHead = document.getElementsByTagName('head')[0];





  const loadScripts = (jsGroups) => {
    const loadjs = (
      jsUrl,
      jsSha,
      jsDefer,
      jsType,
      jsAsync,
      jsCors,
      jsId
    ) => {
      const jsScript = document.createElement('script');

      jsScript.src = jsUrl;

      if (typeof jsSha === 'string' && jsSha !== '') {
        jsScript.integrity = jsSha;
      }

      if (jsDefer === 'on') {
        jsScript.defer = true;
      }

      if (typeof jsType === 'string') {
        jsScript.type = jsType;
      } else {
        jsScript.type = "text/javascript";
      }

      if (jsAsync === 'on') {
        jsScript.async = true;
      }

      if (typeof jsCors === 'string') {
        jsScript.crossOrigin = jsCors === 'use-credentials' ? 'use-credentials' : 'anonymous';
      }

      jsScript.onload = () => {
        console.log(`${c} jsObj: jsId = ${jsId} Is No Problem.`);
      };
      jsScript.onerror = () => {
        document.head.removeChild(jsScript);
        if (jsGroups[jsId].jsUrls.length > 0) {
          console.log(`${c} jsObj: jsUrls With In jsId = ${jsId} Is Error, Use The Next One.`);
          loadjs(
            jsGroups[jsId].jsUrls.shift(),
            jsGroups[jsId].jsSha,
            jsGroups[jsId].jsDefer,
            jsGroups[jsId].jsType,
            jsGroups[jsId].jsAsync,
            jsGroups[jsId].jsCors,
            jsId
          );
        } else {
          console.log(`${c} jsObj: jsUrls With In Id = ${jsId} All Is Error, ${jsId} Not Loaded.`);
        }
      };
      document.head.appendChild(jsScript);
    };
    for (const jsId in jsGroups) {
      if (jsGroups.hasOwnProperty(jsId) && jsGroups[jsId].jsUrls.length > 0) {
        loadjs(
          jsGroups[jsId].jsUrls.shift(),
          jsGroups[jsId].jsSha,
          jsGroups[jsId].jsDefer,
          jsGroups[jsId].jsType,
          jsGroups[jsId].jsAsync,
          jsGroups[jsId].jsCors,
          jsId
        );
      }
    }
  };
  if (window.zeoseven_Superload_JsObj) {
    loadScripts(zeoseven_Superload_JsObj);
  }





  window.addEventListener('load', function () {
    const loadStyles = (cssGroup) => {
      const loadcss = (
        cssUrl,
        cssSha,
        cssCors,
        cssId
      ) => {
        const cssLink = document.createElement('link');
        cssLink.href = cssUrl;
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';

        if (typeof cssCors === 'string') {
          cssLink.crossOrigin = cssCors === 'use-credentials' ? 'use-credentials' : 'anonymous';
        }

        if (typeof cssSha === 'string' && cssSha !== '') {
          cssLink.integrity = cssSha;
        }

        cssLink.onload = () => {
          console.log(`${c} cssObj, id = ${cssGroup.id} Is No Problem.`);
        };
        cssLink.onerror = () => {
          console.log(`${c} cssObj: cssUrls With In id = ${cssGroup.id} Is Error, Use The Next One.`);
          document.head.removeChild(cssLink);
          if (cssGroup.cssUrls.length > 0) {
            loadcss(
              cssGroup.cssUrls.shift(),
              cssGroup.cssSha,
              cssGroup.cssCors,
              cssId
            );
          } else {
            console.log(`${c} cssObj: cssUrls With In id =${cssId} All Is Error, ${cssId} Not Loaded.`);
          }
        };
        if (typeof cssGroup.cssHead === 'string' && cssGroup.cssHead === 'last') {
          document.head.appendChild(cssLink)
        } else {
          firstHead.insertBefore(cssLink, firstHead.firstChild);
        }
      };
      const rootVariable = cssGroup.rootVariable;
      const rootStyle = window.getComputedStyle(document.documentElement).getPropertyValue(rootVariable);
      if (rootStyle) {
        console.log(`${c} cssObj: CSS Var Is Found, id = ${cssGroup.id} Is No Problem.`);
      } else {
        console.log(`${c} cssObj: CSS Var: '${rootVariable}' Is Not Found, Start The Backup URL.`);
        loadcss(
          cssGroup.cssUrls.shift(),
          cssGroup.cssSha,
          cssGroup.cssCors,
          cssGroup.id
        );
      }
    };
    if (window.zeoseven_Superload_CssObj) {
      const cssGroups = window.zeoseven_Superload_CssObj.cssGroups;
      for (const cssGroup of cssGroups) {
        loadStyles(cssGroup);
      }
    }
  });






})();
