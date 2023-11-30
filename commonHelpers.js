import{S as y,i as n,a as h}from"./assets/vendor-aa7a424a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const a={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=1;a.loadMoreBtn.style.display="none";const m=new y(".gallery a",{captionData:"alt",captionPosition:"bottom",captionDelay:250});n.settings({position:"topRight"});a.searchForm.addEventListener("submit",p);a.loadMoreBtn.addEventListener("click",f);async function f(){try{const o=a.searchForm.elements.searchQuery.value,r=await d(o,c);a.gallery.insertAdjacentHTML("beforeend",u(r.hits)),c*40>=r.totalHits?(a.loadMoreBtn.style.display="none",n.show({message:"We're sorry, but you've reached the end of search results."})):(a.loadMoreBtn.style.display="block",m.refresh()),c+=1}catch(o){console.error("Error loading more images:",o),n.error({message:"Error fetching more images. Please try again."})}}async function p(o){o.preventDefault(),c=1,a.gallery.innerHTML="";const r=o.currentTarget.elements.searchQuery.value.trim();if(!r){n.show({message:"Sorry, there are no images matching your search query. Please try again."});return}try{const s=await d(r);if(s.hits.length===0){n.show({message:"Sorry, there are no images matching your search query. Please try again."}),a.loadMoreBtn.style.display="none";return}a.gallery.insertAdjacentHTML("afterbegin",u(s.hits)),m.refresh(),a.loadMoreBtn.style.display="block"}catch(s){console.error("Error fetching images:",s),n.error({message:"Error fetching images. Please try again."})}}async function d(o,r=1){const s="https://pixabay.com/api/",i="35840272-25b71e9b06347bf3cb03a4874";try{const e=await h.get(s,{params:{key:i,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}});return e.data.hits.length===0?(n.show({message:"Sorry, no images found. Please try again."}),{hits:[],totalHits:0}):e.data}catch(e){throw new Error(e.message||"Error fetching images")}}function u(o){return o.map(({webformatURL:r,largeImageURL:s,tags:i,likes:e,views:t,comments:l,downloads:g})=>`
    <div class="photo-card"><a class="img-link" href="${s}">
    <img class="photo-card-img"src="${r}" alt="${i}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes ${e}</b>
        </p>
            <p class="info-item">
        <b>Views ${t}</b>
        </p>
        <p class="info-item">
            <b>Comments ${l}</b>
        </p>
        <p class="info-item">
            <b>Downloads ${g}</b>
        </p>
    </div>
</div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
