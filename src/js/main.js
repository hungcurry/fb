//-------------------
// 檔案
//-------------------
import scss from "all.scss";



//-------------------
// 插件
//-------------------
// tailwind css
import tailwind from "tailwind.css";


//---js---
import axios from "axios";
// babel/polyfill 主要檔案
import "core-js/stable";
import "regenerator-runtime/runtime";



const popoverBtn = document.querySelectorAll('.nav-btn');
const popoverPanel = document.querySelectorAll('.popover-panel');

function openPanel(index) {
  popoverPanel.forEach( function(item , idx){
    item.classList.add('hidden');
    // 防止觸發到 window 事件 , 避免點擊 內容區塊關閉
    item.addEventListener('click' , function(e) {
      console.log(`popoverPanel`);
      e.stopPropagation();
    })
    if(index === idx + 1) {
      item.classList.remove('hidden');
    }
  })
};
function clickPopoverFn(e){
  console.log('popoverBtn');
  e.stopPropagation();
  let id = Number(e.currentTarget.getAttribute('id').substr(3));
  openPanel(id);
};

window.addEventListener('click' , function(e){
  console.log('windows');
  openPanel(-1);
});
popoverBtn.forEach( function(item){
  item.addEventListener('click', clickPopoverFn)
});
