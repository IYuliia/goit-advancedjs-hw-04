import{S as g,N as l,a as h}from"./assets/vendor-f7c584b2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const a={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=1;a.loadMoreBtn.style.display="none";const f=new g(".gallery a",{captionData:"alt",captionPosition:"bottom",captionDelay:250});a.searchForm.addEventListener("submit",p);a.loadMoreBtn.addEventListener("click",d);async function d(){try{const o=a.searchForm.elements.searchQuery.value,r=await u(o,c);if(r.hits.length===0){l.Notify.warning("Sorry, there are no images matching your search query. Please try again.");return}a.gallery.insertAdjacentHTML("beforeend",y(r.hits)),c*40>=r.totalHits?(a.loadMoreBtn.style.display="none",l.Notify.info("We're sorry, but you've reached the end of search results.")):(a.loadMoreBtn.style.display="block",f.refresh()),c+=1}catch(o){console.error("Error loading more images:",o),l.Notify.failure("Error fetching more images. Please try again.")}}async function p(o){o.preventDefault();const r=o.currentTarget.elements.searchQuery.value;try{const n=await u(r);c=1,a.gallery.innerHTML="",a.gallery.insertAdjacentHTML("afterbegin",y(n.hits)),a.loadMoreBtn.style.display="block",f.refresh(),await d()}catch(n){console.error("Error fetching images:",n),l.Notify.failure("Error fetching images. Please try again.")}}async function u(o,r=1){const n="https://pixabay.com/api/",i="35840272-25b71e9b06347bf3cb03a4874";try{const e=await h.get(n,{params:{key:i,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}});return e.data.hits.length===0?(l.Notify.warning("Sorry, no images found. Please try again."),{hits:[],totalHits:0}):e.data}catch(e){throw new Error(e.message||"Error fetching images")}}function y(o){return o.map(({webformatURL:r,largeImageURL:n,tags:i,likes:e,views:t,comments:s,downloads:m})=>`
    <div class="photo-card"><a class="img-link" href="${n}">
    <img class="photo-card-img"src="${r}" alt="${i}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes ${e}</b>
        </p>
            <p class="info-item">
        <b>Views ${t}</b>
        </p>
        <p class="info-item">
            <b>Comments ${s}</b>
        </p>
        <p class="info-item">
            <b>Downloads ${m}</b>
        </p>
    </div>
</div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
