const menu=document.querySelector('.menu'),nav=document.querySelector('.header nav');
// Compress the header into a centered glass dock as soon as the page scrolls.
const header=document.querySelector('.header');
function updateHeader(){header.classList.toggle('is-scrolled',scrollY>12)}
addEventListener('scroll',updateHeader,{passive:true});
addEventListener('pageshow',updateHeader);
updateHeader();
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav.addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}});
const track=document.querySelector('.case-track');let position=0;
function move(delta){const max=Math.max(0,track.scrollWidth-innerWidth+40);position=Math.max(0,Math.min(max,position+delta*347));track.style.transform=`translateX(-${position}px)`;}
document.querySelector('.previous').addEventListener('click',()=>move(-1));
document.querySelector('.next').addEventListener('click',()=>move(1));
addEventListener('resize',()=>move(0));

// Repeat the original logo sequence so the animation can wrap without a jump.
const logos=document.querySelector('.logos');
const logoTrack=logos.querySelector('.logo-track');
const logoGroup=document.createElement('div');
logoGroup.className='logo-group';
while(logoTrack.firstChild) logoGroup.append(logoTrack.firstChild);
logoTrack.append(logoGroup);
for(let i=0;i<2;i++){
  const copy=logoGroup.cloneNode(true);
  copy.setAttribute('aria-hidden','true');
  logoTrack.append(copy);
}
logos.tabIndex=0;
logos.setAttribute('aria-label','Our clients. Focus or hover to pause automatic scrolling.');
logoTrack.classList.add('autoplay');
const heroVideo=document.querySelector('.hero-video');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function updateHeroPlayback(){if(reducedMotion.matches){heroVideo.pause()}else{heroVideo.play().catch(()=>{})}}
reducedMotion.addEventListener('change',updateHeroPlayback);
updateHeroPlayback();
