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
// import Swiper JS
import Swiper, { Navigation, Pagination } from 'swiper'





const popoverBtn = document.querySelectorAll('.nav-btn');
const popoverPanel = document.querySelectorAll('.popover-panel');

function openPanel(index) {
  popoverPanel.forEach( function(item , idx){
    item.classList.add('hidden');
    // 防止觸發到 window 事件 , 避免點擊 內容區塊關閉
    item.addEventListener('click' , function(e) {
      // console.log(`popoverPanel`);
      e.stopPropagation();
    })
    if(index === idx + 1) {
      item.classList.remove('hidden');
    }
  })
};
function clickPopoverFn(e){
  // console.log('popoverBtn');
  e.stopPropagation();
  let id = Number(e.currentTarget.getAttribute('id').substr(3));
  openPanel(id);
};

window.addEventListener('click' , function(e){
  // console.log('windows');
  openPanel(-1);
});
popoverBtn.forEach( function(item){
  item.addEventListener('click', clickPopoverFn)
});

//  ------------- 左側相關 -------------
const leftBlockList = document.querySelector("#left-block-list");
const leftMoreBtn = document.querySelector('#left-more-btn');
const leftFoldBtn = document.querySelector('#left-fold-btn');
const leftArr = [
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
  {
    name: "廣告管理員",
    img: "https://i.ibb.co/6bFz3s2/C949oxkze-S.png",
  },
  {
    name: "動態回顧",
    img: "https://i.ibb.co/zZWnQnf/lqym-E2i-RETE.png",
  },
  {
    name: "最新資訊",
    img: "https://i.ibb.co/b6jWqqx/k-Y1-UFd6n2-O.png",
  },
  {
    name: "我的珍藏",
    img: "https://i.ibb.co/BLYFmxv/oc-BBGg-g-Rd5.png",
  },
];
function renderLeftItem(name, imageUrl) {
  const item = `
    <li class="flex items-center w-full p-2 mb-6 rounded hover:bg-fb-input cursor-pointer">
      <div class="w-[32px] overflow-hidden rounded-full mr-4">
        <img class="object-cover" src="${imageUrl}" alt="" />
      </div>
      <p class="text-white text-2xl">${name}</p>
    </li>
  `;
  return item;
}
function renderLeftList() {
  const elDiv = document.createElement('div');
  let height = '';
  // open
  leftMoreBtn.addEventListener('click',function(e){
    height = `${ leftArr.length * 57 }`;
    // console.log(height);
    elDiv.classList.add('list','invisible', 'duration-700' , 'h-0' , 'opacity-0' , 'overflow-hidden' , 'transition-all');
    let htmlStr = "";
    leftArr.forEach((item) => {
      htmlStr += renderLeftItem(item.name , item.img);
    });
    elDiv.innerHTML = htmlStr;
    leftBlockList.appendChild(elDiv);

    setTimeout(() => {
      elDiv.classList.remove('invisible',  'opacity-0' ,'h-0');
      elDiv.classList.add(`h-[${height}px]`);
      leftMoreBtn.classList.add('hidden');
      leftFoldBtn.classList.remove('hidden');
    },700);
  });
  // close
  leftFoldBtn.addEventListener('click',function(e){
    elDiv.classList.remove(`h-[${height}px]` , 'list');
    elDiv.classList.add('invisible',  'opacity-0' ,'h-0');
    leftFoldBtn.classList.add('hidden');
    leftMoreBtn.classList.remove('hidden');
    elDiv.innerHTML = "";
  });
}
renderLeftList();

//  ------------- 右側相關 -------------
const contactPerson = document.querySelector("#contactPerson");
let rightAry = [];
axios.get('https://randomuser.me/api/?results=50')
  .then((res)=>{
    rightAry = res.data.results;
    renderRightList();
  })
  .catch((err) => {
    console.log(err);
  })
function renderRightItem(obj) {
  let state = "";
  let online = ""
  if(obj.dob.age >= 15){
    state = `ring-2 ring-fb ring-offset-2 ring-offset-fb-input`;
    online = `text-white`;
  }
  const item = `
  <div class="flex items-center w-full py-4 px-2 mb-6 rounded hover:bg-fb-input cursor-pointer relative text-gray-600 js-contactPerson">

    <div class="w-[32px] cursor-pointer mr-6 rounded-full ${state}">
      <div class="overflow-hidden rounded-full">
        <img class="object-cover" src="${obj.picture.large}" alt="" />
      </div>
    </div>
    <p class="text-2xl ${online}">${obj.name.first} ${obj.name.last}</p>

    <!-- message-->
    <div class="message absolute  w-[400px] top-[50%] left-[-410px] translate-y-[-50%] 
    items-center p-6 rounded-xl bg-fb-input cursor-pointer border border-gray-400 z-50">
      <div class="w-full flex">
        <div class="w-[80px] h-[80px] cursor-pointer mr-6 rounded-full shrink-0 ${state}">
          <div class="overflow-hidden rounded-full">
            <img class="object-cover" src="${obj.picture.large}" alt=""/>
          </div>
        </div>
        <div class="flex-1 text-2xl text-white">
          <h4 class="text-4xl mb-6">${obj.name.first} ${obj.name.last}</h4>
          <div class="flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[24px] h-[24px] mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <p>${obj.gender}</p>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-[24px] h-[24px] mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p class="break-all">${obj.email}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
  `
  return item;
}
function renderRightList() {
  let htmlStr = `<p class="text-2xl text-gray-400 mb-6 border-t border-gray-700 pt-6">聯絡人</p>`;
  rightAry.forEach((item) => {
    htmlStr += renderRightItem(item);
  });
  contactPerson.innerHTML = htmlStr;
};

//  ------------- 右側相關-AD區塊 -------------
const adBlock = document.querySelectorAll('.ad-block');
const adBtn = document.querySelectorAll('.js-adBtn');
const adPanel = document.querySelectorAll('.ad-panel');

adBlock.forEach( function(item){
  // 防止觸發到 window 事件 , 避免點擊 內容區塊關閉
  item.addEventListener('click' , function(e) {
    e.stopPropagation();
  })
  item.addEventListener('mouseenter', mouseenterFn);
  item.addEventListener('mouseleave', mouseLeaveFn);
});
function mouseenterFn(){
  let ary = Array.from(this.children);
  ary.find(function(item){
    if(item.classList.contains('js-adBtn') ){
      item.classList.remove('hidden');
      item.addEventListener("click" ,clickADFn);
    };
  });
};
function mouseLeaveFn(){
  let ary = Array.from(this.children);
  ary.find(function(item){
    if(item.classList.contains('js-adBtn') ){
      item.classList.add('hidden');
    }
  })
};

function clickADFn(e){
  e.stopPropagation();
  let elBtn = e.currentTarget;
  let id = Number(elBtn.getAttribute('id').substr(6));

  // 再次點擊關閉
  elBtn.classList.add('active');
  if(elBtn.classList.contains('active')){
    elBtn.addEventListener('click', doubleClickCloseFn);
  }

  elBtn.parentNode.removeEventListener('mouseleave', mouseLeaveFn);
  openADPanel(id);
};
function doubleClickCloseFn(){
  closeFn();
};

function openADPanel(index) {
  adPanel.forEach( function(item , idx){
    item.classList.add('hidden');
    // 防止觸發到 window 事件 , 避免點擊 內容區塊關閉
    item.addEventListener('click' , function(e) {
      e.stopPropagation();
    })
    if(index === idx + 1) {
      item.classList.remove('hidden');
    }
  })
};
function closeFn(){
  openADPanel(-1);
  adBtn.forEach((btn) => {
    btn.classList.add('hidden');
    btn.classList.remove('active');
    btn.removeEventListener('click' , doubleClickCloseFn);
  })
  adBlock.forEach((item)=>{
    item.addEventListener('mouseleave', mouseLeaveFn);
  })
};
window.addEventListener('click' , closeFn);

//  ------------- 限時動態相關 -------------
const storyList = document.querySelector('#story-list');
function renderStoryItem() {
  for (let i = 0; i < 6; i++) {
    const elDiv = document.createElement('div');
    elDiv.classList.add('flex-1' , 'px-[4px]' , 'min-w-[120px]' ,'cursor-pointer');
    const item = `
    <div class="relative overflow-hidden" id="story-${i}">
      <div id="story-mask-${i}" class="hidden absolute w-full h-full top-0 left-0 bg-orange/30 z-20"></div>
      <div class="w-[32px] h-[32px] absolute top-4 left-4 ring-4 ring-fb bg-fb-card rounded-full flex justify-center items-center z-10">
        <p class="text-white text-sm">阿貓</p>
      </div>
      <div class="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-orange-600/30 to-transparent"></div>
      <img class="w-full h-full duration-500 select-none" src="https://i.ibb.co/9sPFqKz/cat2.jpg"/>
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
}
renderLiveItem();

const swiper = new Swiper(".fb-live", {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  slidesPerView: 'auto',
  spaceBetween: 0,
  loop: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: "auto",
});
//  ------------- 貼文牆相關 -------------
const postWall = document.querySelectorAll(".postWall");
const loadAll = document.querySelectorAll(".loadBlock");
function renderPostWall(){
  setTimeout(() => {
    postWall.forEach((item) => {
      item.classList.remove('hidden');
    })
    loadAll.forEach((item) => {
      item.classList.add('hidden');
    })
  },1500);
};
renderPostWall();

//  ------------- modal-------------
const modal = document.querySelector('#modal');
const loginBtn = document.querySelector('#login');
const closeBtnAll = document.querySelectorAll('.js-close');
const body = document.querySelector('body');

loginBtn.addEventListener('click', function(){
  modal.classList.remove("opacity-0" , "pointer-events-none");
  body.classList.add('overflow-y-hidden');
});
closeBtnAll.forEach((item)=>{
  item.addEventListener('click', function(){
    modal.classList.add("opacity-0" , "pointer-events-none");
    body.classList.remove('overflow-y-hidden');
  })
});

//  ------------- 你的捷徑／modal捷徑選單 -------------
let shortcutAry = [
  '白爛貓家族俱樂部' , 
  '漫漫人生' ,
  'Front-End Taiwan' , 
  'Costco好市多',
  'MASS FOR THE DEAD' , 
  'JavaScript.tw' ,
  '白爛貓家族俱樂部' , 
  '漫漫人生' ,
  'Front-End Taiwan' , 
  'Costco好市多',
  'MASS FOR THE DEAD' , 
];
// 你的捷徑
const shortcutList = document.querySelector("#shortcutList");
function renderShortcutItem( name , i ) {
  const item = `
  <li class="flex items-center  w-full p-2 mb-6 rounded hover:bg-fb-input cursor-pointer">
    <div class="w-[32px] overflow-hidden rounded-xl mr-4">
      <img class="object-cover" src="https://picsum.photos/800/800/?random=${ i }" alt="" />
    </div>
    <p class="text-white text-2xl">${name}</p>
  </li>
  `
  return item;
}
function renderShortcutList() {
  let htmlStr = '';
  shortcutAry.forEach((item , i) => {
    htmlStr += renderShortcutItem( item , i+1 );
  });
  shortcutList.innerHTML = htmlStr;
}
renderShortcutList();
// modal捷徑
const editShortcutList = document.querySelector("#edit-shortcutList");
function renderEditShortcutItem( name , i ) {
  const item = `
  <li class="flex items-center justify-between w-full p-2 mb-6 rounded">
    <div class="flex items-center w-full ">
      <div class="w-[32px] overflow-hidden rounded-xl mr-4">
        <img class="object-cover" src="https://picsum.photos/800/800/?random=${ i }" alt="" />
      </div>
      <p class="text-white text-2xl">${name}</p>
    </div>
    <select name="select" class="px-16 py-2.5 rounded-lg text-2xl text-center focus:border-fb-input focus:ring-fb-input">
      <option value="" selected disable hidden>請選擇</option>
      <option value="自動排序">自動排序</option>
      <option value="置頂">置頂</option>
      <option value="隱藏">隱藏</option>
    </select>
  </li>
  `
  return item;
}
function renderEditShortcutList() {
  let htmlStr = '';
  shortcutAry.forEach((item , i) => {
    htmlStr += renderEditShortcutItem( item , i+1 );
  });
  editShortcutList.innerHTML = htmlStr;
}
renderEditShortcutList();



