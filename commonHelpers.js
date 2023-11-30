import{S as g,i,a as h}from"./assets/vendor-aa7a424a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const o={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=1;o.loadMoreBtn.style.display="none";const d=new g(".gallery a",{captionData:"alt",captionPosition:"bottom",captionDelay:250});i.settings({position:"topRight"});o.searchForm.addEventListener("submit",p);o.loadMoreBtn.addEventListener("click",f);async function f(){try{const a=o.searchForm.elements.searchQuery.value,r=await m(a,c);o.gallery.insertAdjacentHTML("beforeend",u(r.hits)),c*40>=r.totalHits?(o.loadMoreBtn.style.display="none",i.show({message:"We're sorry, but you've reached the end of search results."})):(o.loadMoreBtn.style.display="block",d.refresh()),c+=1}catch(a){console.error("Error loading more images:",a),i.error({message:"Error fetching more images. Please try again."})}}async function p(a){a.preventDefault(),c=1,o.gallery.innerHTML="";const r=a.currentTarget.elements.searchQuery.value.trim();if(!r){i.show({message:"Sorry, there are no images matching your search query. Please try again."}),o.loadMoreBtn.style.display="none";return}try{const s=await m(r);if(s.hits.length===0){i.show({message:"Sorry, there are no images matching your search query. Please try again."}),o.loadMoreBtn.style.display="none";return}o.gallery.insertAdjacentHTML("afterbegin",u(s.hits)),d.refresh(),o.loadMoreBtn.style.display="block"}catch(s){console.error("Error fetching images:",s),i.error({message:"Error fetching images. Please try again."})}}async function m(a,r=1){const s="https://pixabay.com/api/",n="35840272-25b71e9b06347bf3cb03a4874";try{const e=await h.get(s,{params:{key:n,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}});return e.data.hits.length===0?{hits:[],totalHits:0}:e.data}catch(e){throw new Error(e.message||"Error fetching images")}}function u(a){return a.map(({webformatURL:r,largeImageURL:s,tags:n,likes:e,views:t,comments:l,downloads:y})=>`
    <div class="photo-card"><a class="img-link" href="${s}">
    <img class="photo-card-img"src="${r}" alt="${n}" loading="lazy" /></a>
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
            <b>Downloads ${y}</b>
        </p>
    </div>
</div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
