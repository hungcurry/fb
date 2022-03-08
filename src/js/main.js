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

//  ------------- 左側相關 -------------
const leftBlock = document.querySelector("#left-block");
const leftArr = [
  {
    name: "白爛貓",
    img: "https://media1.giphy.com/media/H1eshAZvAfiofm870b/giphy.webp",
  },
  {
    name: "活動",
    img: "https://bruce-fe-fb.web.app/image/left/activity.svg",
  },
  {
    name: "天氣",
    img: "https://bruce-fe-fb.web.app/image/left/cloudy.png",
  },
  {
    name: "災害應變中心",
    img: "https://bruce-fe-fb.web.app/image/left/dynamic.svg",
  },
  {
    name: "新冠病毒資訊中心",
    img: "https://bruce-fe-fb.web.app/image/left/facemask.svg",
  },
  {
    name: "社團",
    img: "https://bruce-fe-fb.web.app/image/left/friend.svg",
  },
  {
    name: "企業管理平台",
    img: "https://bruce-fe-fb.web.app/image/left/job.png",
  },
  {
    name: "Messenger",
    img: "https://bruce-fe-fb.web.app/image/left/messenger.svg",
  },
  {
    name: "近期廣告動態",
    img: "https://bruce-fe-fb.web.app/image/left/pay.png",
  },
  {
    name: "朋友名單",
    img: "https://bruce-fe-fb.web.app/image/left/sale.png",
  },
  {
    name: "最愛",
    img: "https://bruce-fe-fb.web.app/image/left/star.svg",
  },
  {
    name: "Marketplace",
    img: "https://bruce-fe-fb.web.app/image/left/store.svg",
  },
  {
    name: "Watch",
    img: "https://bruce-fe-fb.web.app/image/left/watchingTv.svg",
  },
];
function renderLeftItem(name, imageUrl) {
  const item = `
    <div class="flex items-center justify-items-center w-full p-2 mb-6 rounded hover:bg-fb-input cursor-pointer">
      <div class="w-[32px] overflow-hidden rounded-full mr-4">
        <img class="object-cover" src="${imageUrl}" alt="" />
      </div>
      <p class="text-white text-2xl">${name}</p>
    </div>
  `;
  return item;
}
function renderLeftList() {
  let htmlStr = "";
  leftArr.forEach((item) => {
    htmlStr += renderLeftItem(item.name , item.img);
  });
  leftBlock.innerHTML = htmlStr;
}
renderLeftList();
