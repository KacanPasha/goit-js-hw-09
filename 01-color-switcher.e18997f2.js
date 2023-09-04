const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.body;let o;t.addEventListener("click",(()=>{o||(o=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;a.style.backgroundColor=t}),1e3))})),e.addEventListener("click",(()=>{clearInterval(o),o=null}));
//# sourceMappingURL=01-color-switcher.e18997f2.js.map
