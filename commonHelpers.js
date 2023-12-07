import{S as h,i as n,a as g}from"./assets/vendor-aa7a424a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const r={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};let c=1;r.loadMoreBtn.style.display="none";const d=new h(".gallery a",{captionData:"alt",captionPosition:"bottom",captionDelay:250});n.settings({position:"topRight"});r.searchForm.addEventListener("submit",p);r.loadMoreBtn.addEventListener("click",f);async function f(){try{const a=r.searchForm.elements.searchQuery.value,t=await u(a,c+1);r.gallery.insertAdjacentHTML("beforeend",m(t.hits)),c*40>=t.totalHits?(r.loadMoreBtn.style.display="none",n.show({message:"We're sorry, but you've reached the end of search results."})):(r.loadMoreBtn.style.display="block",d.refresh()),c+=1}catch(a){console.error("Error loading more images:",a),n.error({message:"Error fetching more images. Please try again."})}}async function p(a){a.preventDefault(),c=1,r.gallery.innerHTML="",r.loadMoreBtn.style.display="none";const t=a.currentTarget.elements.searchQuery.value.trim();if(!t){n.show({message:"Sorry, there are no images matching your search query. Please try again."});return}try{const s=await u(t);if(s.hits.length===0){n.show({message:"Sorry, there are no images matching your search query. Please try again."}),r.loadMoreBtn.style.display="none";return}else c*40>=s.totalHits?(r.gallery.insertAdjacentHTML("afterbegin",m(s.hits)),d.refresh(),r.loadMoreBtn.style.display="none",n.show({message:"We're sorry, but you've reached the end of search results."})):(r.gallery.insertAdjacentHTML("afterbegin",m(s.hits)),d.refresh(),r.loadMoreBtn.style.display="block")}catch(s){console.error("Error fetching images:",s),n.error({message:"Error fetching images. Please try again."})}}async function u(a,t=1){const s="https://pixabay.com/api/",i="35840272-25b71e9b06347bf3cb03a4874";try{const e=await g.get(s,{params:{key:i,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40}});return e.data.hits.length===0?{hits:[],totalHits:0}:e.data}catch(e){throw new Error(e.message||"Error fetching images")}}function m(a){return a.map(({webformatURL:t,largeImageURL:s,tags:i,likes:e,views:o,comments:l,downloads:y})=>`
    <div class="photo-card"><a class="img-link" href="${s}">
    <img class="photo-card-img"src="${t}" alt="${i}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes ${e}</b>
        </p>
            <p class="info-item">
        <b>Views ${o}</b>
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
