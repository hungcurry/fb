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


//  ------------- 右側相關 -------------
const rightBlock = document.querySelector("#right-block");
let rightAry = [];
axios.get('https://randomuser.me/api/?results=15')
  .then((res)=>{
    rightAry = res.data.results;
    renderRightList();
  })
  .catch((err) => {
    console.log(err);
  })
function renderRightItem( firstName, lastName ,imageUrl) {
  const item = `
  <div class="flex items-center justify-items-center w-full py-2 px-1 mb-6 rounded hover:bg-fb-input cursor-pointer">
    <div class="relative w-[32px] cursor-pointer mr-6">
      <div class="overflow-hidden rounded-full">
        <img class="object-cover" src="${imageUrl}" alt="" />
      </div>
      <div class="w-[8px] h-[8px] rounded-full bg-green-500 absolute bottom-0 right-0 ring-gray-900 ring"></div>
    </div>
    <p class="text-white text-2xl">${firstName} ${lastName}</p>
  </div>
  `
  return item;
}
function renderRightList() {
  let htmlStr = `<p class="text-2xl text-gray-400 mb-6">聯絡人</p>`;
  rightAry.forEach((item) => {
    htmlStr += renderRightItem( item.name.first , item.name.last , item.picture.medium);
  });
  rightBlock.innerHTML = htmlStr;
}

//  ------------- 限時動態相關 -------------
const storyList = document.querySelector('#story-list');
function renderStoryItem() {
  for (let i = 0; i < 8; i++) {
    const elDiv = document.createElement('div');
    elDiv.classList.add('flex-1' , 'px-[4px]' , 'min-w-[120px]' ,'cursor-pointer');
    const item = `
    <div class="relative overflow-hidden" id="story-${i}">
      <div id="story-mask-${i}" class="hidden absolute w-full h-full top-0 left-0 bg-orange/30 z-20"></div>
      <div class="w-[32px] h-[32px] absolute top-4 left-4 ring-4 ring-fb bg-fb-card rounded-full flex justify-center items-center z-10">
        <p class="text-white text-sm">阿貓</p>
      </div>
      <div class="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-orange-600/30 to-transparent"></div>
      <img class="w-full h-full duration-500" src="https://i.ibb.co/9sPFqKz/cat2.jpg"/>
      <p class="absolute bottom-2 left-2 text-white">白爛貓</p>
    </div>
    `
    elDiv.innerHTML = item;

    // mask move
    elDiv.addEventListener("mouseenter", function(e) {
      const img = document.querySelector(`#story-${i} > img`);
      const mask = document.querySelector(`#story-mask-${i}`);
      img.classList.add('scale-105');
      mask.classList.remove('hidden');
    });
    elDiv.addEventListener("mouseleave", function(e) {
      const img = document.querySelector(`#story-${i} > img`);
      const mask = document.querySelector(`#story-mask-${i}`);
      img.classList.remove('scale-105');
      mask.classList.add('hidden');
    });
    storyList.appendChild(elDiv);
  }
}
renderStoryItem();

//  ------------- 包廂輪播相關 -------------
function renderLiveItem() {
  const swiperWrapperLive = document.querySelector("#swiper-wrapper-live");
  for (let i = 0; i < 20; i++) {
    const elDiv = document.createElement("div");
    elDiv.classList.add('swiper-slide');
    const item = `
      <div class="w-[55px]">
        <div class="relative w-[40px] cursor-pointer">
          <div class="overflow-hidden rounded-full">
            <img src="https://i.ibb.co/G2jbbtS/cat1.jpg"/>
          </div>
          <div class="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-0 right-0 ring-gray-900 ring"></div>
        </div>
      </div>
    `
    elDiv.innerHTML = item;
    swiperWrapperLive.appendChild(elDiv);
  }
    new Swiper(".fb-live", {
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: "auto",
    });
}
renderLiveItem();
