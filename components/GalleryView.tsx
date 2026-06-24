import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const catalog = [
    { id: "PeQn0uR7eso", title: "Red Bull Track Takeover", yr: "2026", slug: "/red-bull-track-takeover", meta: "4 EPISODES", thumbnail: "https://serkanarslan.me/media/thumbnails/thumb_tracktakeover.webp" },
    { id: "D6HiDIH9kFM", title: "Red Bull Rap Trivia", yr: "2024", slug: "/red-bull-rap-trivia", episodes: [
        { id: "WuLPNvPWXF0", title: "Khontkar vs Lil Zey" },
        { id: "UGhQtMcnjg8", title: "Motive vs Uzi" }
    ] },
    { id: "jcx04qqIjQk", title: "Red Bull 64 Bars", yr: "2021", slug: "/red-bull-64-bars", episodes: [
        { id: "jcx04qqIjQk", title: "Khontkar" },
        { id: "puulT0hK9Vo", title: "Ceza" },
        { id: "YNesJIR5WbM", title: "Baneva" },
        { id: "dRGvfB-g8tU", title: "Motive" },
        { id: "Sq245blpXDA", title: "Cevik" },
        { id: "R9slYkKkU3Q", title: "Riot" },
        { id: "3e3tmSQ9Qog", title: "Uzi" },
        { id: "BbNIIWRuy2Q", title: "Lil Zey" }
    ] },
    { id: "rrn:content:trailer-videos:f7fecf11-3736-4441-958a-e0f61dabb0ec:tr-TR", title: "Red Bull SoundClash 2026", yr: "2026", slug: "/red-bull-soundclash-2026" },
    { id: "hgd-CuzV24w", title: "Red Bull SoundClash 2024 Live", yr: "2024", slug: "/red-bull-soundclash-2024-live" },
    { id: "rrn:content:videos:1864170c-99b0-487e-9cb8-4fb460572408:tr-TR", title: "Red Bull SoundClash 2024 Trailer", yr: "2024", slug: "/red-bull-soundclash-2024-trailer" },
    { id: "DYM96Y0oEGY", title: "Red Bull 60 Seconds", yr: "2026", slug: "/red-bull-60-sec", isInstagram: true }
];

const GalleryView: React.FC = () => {
  const currentIdx = useRef(0);
  const isPanelOpen = useRef(false);
  const activeSlot = useRef('slotA');

  // We use effect to bind everything like vanilla js so it matches perfectly
  useEffect(() => {
    const train = document.getElementById('trainInner');
    if (train && train.children.length === 0) {
      for(let i=0; i<6; i++) {
          const cell = document.createElement('div');
          cell.className = 'grid-cell';
          train.appendChild(cell);
      }
    }

    const videoTarget = document.getElementById('videoTarget');
    let resizeObserver: ResizeObserver | null = null;

    if (videoTarget) {
      const syncSizes = () => {
          const rect = videoTarget.getBoundingClientRect();
          document.documentElement.style.setProperty('--cell-w', `${rect.width}px`);
          document.documentElement.style.setProperty('--cell-h', `${rect.height}px`);
      };
      // Observe
      resizeObserver = new ResizeObserver(syncSizes);
      resizeObserver.observe(videoTarget);
      
      // Cleanup
      return () => resizeObserver?.disconnect();
    }
  }, []);

  const resetAutoHoverTimers = () => {};

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const scrollProgress = document.getElementById('csProgress');
      if (scrollProgress) {
          const maxScroll = target.scrollHeight - target.clientHeight;
          const percentage = maxScroll > 0 ? (target.scrollTop / maxScroll) * 100 : 0;
          scrollProgress.style.height = `${percentage}%`;
      }
  };

  const updatePreloads = (idx: number) => {
      const preloadContainer = document.getElementById('preloadContainer');
      if (!preloadContainer) return;
      preloadContainer.innerHTML = '';
      const toLoad = [-2, -1, 1, 2].map(offset => (idx + offset + catalog.length) % catalog.length);
      toLoad.forEach(loadIdx => {
          const p = catalog[loadIdx];
          const iframe = document.createElement('iframe');
          if ((p as any).isInstagram) {
              iframe.src = `https://www.instagram.com/p/${p.id}/embed`;
          } else {
              iframe.src = p.id.includes('rrn') ? `https://www.redbull.com/embed/${p.id}?autoplay=false&muted=true` : `https://www.youtube.com/embed/${p.id}?autoplay=0&mute=1`;
          }
          iframe.style.width = '1px';
          iframe.style.height = '1px';
          iframe.style.position = 'absolute';
          iframe.style.opacity = '0';
          preloadContainer.appendChild(iframe);
      });
  };

  const openConsole = (i: number) => {
      currentIdx.current = i;
      updatePreloads(i);
      const p = catalog[currentIdx.current];
      const slot = document.getElementById(activeSlot.current) as HTMLIFrameElement;
      
      const inactiveSlot = activeSlot.current === 'slotA' ? 'slotB' : 'slotA';
      const slotOther = document.getElementById(inactiveSlot) as HTMLIFrameElement;
      if (slotOther) { slotOther.classList.remove('active', 'slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left', 'exit-left', 'exit-right'); slotOther.src = ""; }
      
      if (slot) {
        slot.classList.remove('hidden', 'slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left', 'exit-left', 'exit-right');
        slot.classList.add('active');
        if ((p as any).isInstagram) {
            slot.src = `https://www.instagram.com/p/${p.id}/embed`;
        } else {
            slot.src = p.id.includes('rrn') ? `https://www.redbull.com/embed/${p.id}?autoplay=true&muted=true` : `https://www.youtube.com/embed/${p.id}?autoplay=1&mute=1&enablejsapi=1`;
        }
        slot.onload = () => {
            setTimeout(() => {
                slot.contentWindow?.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
                slot.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            }, 500);
            setTimeout(() => {
                slot.contentWindow?.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
                slot.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            }, 1000);
        };
      }
      syncData();
      
      const videoTarget = document.getElementById('videoTarget');
      if (videoTarget) {
         const rect = videoTarget.getBoundingClientRect();
         document.documentElement.style.setProperty('--cell-w', `${rect.width}px`);
         document.documentElement.style.setProperty('--cell-h', `${rect.height}px`);
      }

      const modal = document.getElementById('videoModal');
      if (modal) {
        document.body.style.overflow = 'hidden';
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
            isPanelOpen.current = false;
            switchTab('fullscreen');
        }, 10);
      }
  };

  const syncData = () => {
      const p = catalog[currentIdx.current];
      const elLink = document.getElementById('caseStudyLink') as HTMLAnchorElement;
      
      const modal = document.getElementById('videoModal');
      if (modal) {
          if ((p as any).isInstagram) {
              modal.classList.add('instagram-active');
          } else {
              modal.classList.remove('instagram-active');
          }
          
          if (!(p as any).episodes && modal.classList.contains('episodes-active')) {
              switchTab('fullscreen');
          }
      }

      const episodesTab = document.querySelectorAll('[data-mode="episodes"]');
      episodesTab.forEach((t: any) => {
          if ((p as any).episodes) {
              t.style.display = 'inline-block';
          } else {
              t.style.display = 'none';
          }
      });

      const masterTitles = document.querySelectorAll('.mh-title');
      masterTitles.forEach(t => t.innerHTML = p.title);

      const mhYrs = document.querySelectorAll('.mh-yr');
      mhYrs.forEach(y => y.innerHTML = p.yr || '2026');

      const mhRoles = document.querySelectorAll('.mh-role');
      mhRoles.forEach(r => r.innerHTML = `ROLE <span class="text-[#00e58c]">${(p as any).role || 'PRODUCER'}</span>`);

      const mhClients = document.querySelectorAll('.mh-client');
      mhClients.forEach(c => c.innerHTML = `CLIENT <span class="text-[#00e58c]">${(p as any).client || 'RED BULL'}</span>`);

      const infoMeta = document.getElementById('infoMeta');
      const infoDesc = document.getElementById('infoDesc');

      if (infoMeta) infoMeta.innerText = ((p as any).meta ? (p as any).meta + " • " : "") + p.yr + " // Red Bull";
      if (infoDesc) infoDesc.innerText = "Production analysis and creative direction overview for " + p.title + ".";
      
      const csTitleEl = document.getElementById('csTitleOuter');
      if (csTitleEl) csTitleEl.style.display = 'none';
      
      const epTitleEl = document.getElementById('epTitleOuter');
      if (epTitleEl) epTitleEl.style.display = 'none';
      
      const csContentData = `
        <div class="flex gap-12 mb-12 border-b border-white/10 pb-8 mt-4">
            <div>
                <div class="text-4xl lg:text-5xl font-sans font-bold text-white mb-2 tracking-tight">7</div>
                <div class="text-[10px] text-gray-500 font-sans tracking-widest uppercase">EPISODES</div>
            </div>
            <div>
                <div class="text-4xl lg:text-5xl font-sans font-bold text-white mb-2 tracking-tight">4 wk</div>
                <div class="text-[10px] text-gray-500 font-sans tracking-widest uppercase">TURNAROUND</div>
            </div>
        </div>
        <div class="mb-10">
            <h3 class="text-[#00e58c] text-xs font-sans tracking-widest uppercase mb-4 md:mb-6">THE CHALLENGE</h3>
            <p class="text-lg lg:text-xl text-gray-300 font-sans leading-relaxed">Translate a global Red Bull format into a local edition that felt premium on broadcast and native on social, on a tight production window.</p>
        </div>
        <div class="mb-10">
            <h3 class="text-[#00e58c] text-xs font-sans tracking-widest uppercase mb-4 md:mb-6">THE APPROACH</h3>
            <p class="text-lg lg:text-xl text-gray-300 font-sans leading-relaxed">Built a repeatable shoot system — modular set, locked camera language and a finishing template — so every episode shared a look while each artist kept their own energy.</p>
        </div>
        <div class="mb-10">
            <h3 class="text-[#00e58c] text-xs font-sans tracking-widest uppercase mb-4 md:mb-6">RESULT</h3>
            <p class="text-lg lg:text-xl text-gray-300 font-sans leading-relaxed">Delivered on schedule with a consistent visual identity across the run, carrying strong reach well past the initial broadcast window.</p>
        </div>
      `;
      
      const csElements = document.querySelectorAll('.case-study-content');
      csElements.forEach(el => el.innerHTML = csContentData);

      const epGrid = document.getElementById('episodesGrid');
      if (epGrid) {
          epGrid.innerHTML = '';
          if ((p as any).episodes) {
              const episodes = (p as any).episodes;
              epGrid.className = "grid grid-cols-2 gap-4 mt-8 w-full mr-12 pr-4";
              
              episodes.forEach((ep: any, i: number) => {
                  const card = document.createElement('div');
                  card.className = 'project-card';
                  
                  card.onclick = (e) => {
                      const activeSlotID = document.querySelector('.video-slot.active')?.id || 'slotA';
                      const slot = document.getElementById(activeSlotID) as HTMLIFrameElement;
                      if (slot) slot.src = `https://www.youtube.com/embed/${ep.id}?autoplay=1&enablejsapi=1`;
                  };
                  card.innerHTML = `
                      <div class="card-img" style="background-image: url('https://img.youtube.com/vi/${ep.id}/maxresdefault.jpg')"></div>
                      <div class="card-label">EPISODE 0${i + 1}</div>
                  `;
                  epGrid.appendChild(card);
              });
          }
      }
      
      const csPanel = document.getElementById('caseStudyPanel');
      if (csPanel) csPanel.scrollTop = 0;
  };

  const triggerGridTrain = () => {
      const overlay = document.getElementById('trainOverlay');
      const vWin = document.getElementById('vWin');
      const rows = document.querySelectorAll('#infoPanel .reveal-row');
      const inactiveSlotId = activeSlot.current === 'slotA' ? 'slotB' : 'slotA';
      const p = catalog[0]; // first catalog item
      
      const train = document.getElementById('trainInner');
      if (train) {
          const cells = train.children;
          const ytItems = catalog.filter(item => !item.id.includes('rrn'));
          // loop over the cells and repeat ytItems if needed
          for (let i = 0; i < cells.length; i++) {
              const item = ytItems[i % ytItems.length];
              const bgUrl = (item as any).thumbnail || `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`;
              (cells[i] as HTMLElement).style.backgroundImage = `url('${bgUrl}')`;
              (cells[i] as HTMLElement).style.backgroundSize = 'cover';
              (cells[i] as HTMLElement).style.backgroundPosition = 'center';
              (cells[i] as HTMLElement).style.filter = 'grayscale(100%)';
          }
      }

      const inSlotEl = document.getElementById(inactiveSlotId) as HTMLIFrameElement;
      if (inSlotEl) {
        inSlotEl.style.transition = 'none';
        inSlotEl.classList.remove('active', 'slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left', 'exit-left', 'exit-right');
        inSlotEl.classList.add('active');
        inSlotEl.src = p.id.includes('rrn') ? `https://www.redbull.com/embed/${p.id}?autoplay=true&muted=true` : `https://www.youtube.com/embed/${p.id}?autoplay=1&mute=1&enablejsapi=1`;
        inSlotEl.onload = () => {
            setTimeout(() => {
                inSlotEl.contentWindow?.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
                inSlotEl.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            }, 500);
            setTimeout(() => {
                inSlotEl.contentWindow?.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
                inSlotEl.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            }, 1000);
        };
      }
      
      const currentSlotEl = document.getElementById(activeSlot.current) as HTMLIFrameElement;

      setTimeout(() => {
          rows.forEach((r: any) => { r.style.transition = 'opacity 0.6s ease, transform 1.6s var(--ease-loop)'; r.classList.add('loop-out'); });
          if (vWin) {
            vWin.style.transition = 'transform 1.6s var(--ease-loop)';
            vWin.style.opacity = '1';
            vWin.style.transform = 'translateX(150vw)';
          }
      }, 200);

      if (overlay) overlay.classList.add('active');
      
      setTimeout(() => {
          currentIdx.current = 0;
          syncData();
          
          if (currentSlotEl) {
             currentSlotEl.classList.remove('active');
             if (currentSlotEl.src.includes('youtube')) {
                 currentSlotEl.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
             }
             currentSlotEl.src = "";
          }
          activeSlot.current = inactiveSlotId;
          
          rows.forEach((r: any) => { r.style.transition = 'none'; r.classList.remove('loop-out'); r.classList.add('loop-in'); });
          if (vWin) {
            vWin.style.transition = 'none';
            vWin.style.transform = 'translateX(-100vw)';
          }
      }, 1600);

      setTimeout(() => {
          const maxCurveCSS = 'opacity 1.4s var(--ease-max-snap), transform 1.4s var(--ease-max-snap)';
          rows.forEach((r: any) => { r.style.transition = maxCurveCSS; r.classList.remove('loop-in'); });
          if (vWin) {
            vWin.style.transition = 'transform 1.4s var(--ease-max-snap)';
            vWin.style.transform = 'translateX(0)';
            vWin.style.opacity = '1';
          }
          setTimeout(() => overlay?.classList.remove('active'), 1400);
      }, 1950); 
  };

  const navStep = (dir: number) => {
      resetAutoHoverTimers();
      if(dir > 0 && currentIdx.current === catalog.length - 1) { triggerGridTrain(); return; }
      const rows = document.querySelectorAll('#infoPanel .reveal-row');
      
      const nextIdx = (currentIdx.current + dir + catalog.length) % catalog.length;
      const pNext = catalog[nextIdx];
      const inactiveSlotId = activeSlot.current === 'slotA' ? 'slotB' : 'slotA';
      
      const currentSlotEl = document.getElementById(activeSlot.current) as HTMLIFrameElement;
      const inSlotEl = document.getElementById(inactiveSlotId) as HTMLIFrameElement;
      
      if (inSlotEl) {
        inSlotEl.classList.remove('active', 'slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left', 'exit-left', 'exit-right');
        if ((pNext as any).isInstagram) {
            inSlotEl.src = `https://www.instagram.com/p/${pNext.id}/embed`;
        } else {
            inSlotEl.src = pNext.id.includes('rrn') ? `https://www.redbull.com/embed/${pNext.id}?autoplay=true&muted=true` : `https://www.youtube.com/embed/${pNext.id}?autoplay=1&mute=1&enablejsapi=1`;
        }
        inSlotEl.onload = () => {
            setTimeout(() => {
                inSlotEl.contentWindow?.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
                inSlotEl.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            }, 500);
            setTimeout(() => {
                inSlotEl.contentWindow?.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
                inSlotEl.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
            }, 1000);
        };
      }

      rows.forEach((r: any) => { r.style.transition = 'opacity 0.2s ease, transform 0.3s ease'; r.classList.add(dir > 0 ? 'text-exit-left' : 'text-exit-right'); });
      
      requestAnimationFrame(() => {
          requestAnimationFrame(() => {
              if (inSlotEl) {
                  inSlotEl.classList.remove('slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left', 'active');
                  // Trigger reflow to restart animation
                  void inSlotEl.offsetWidth;
                  inSlotEl.classList.add(dir > 0 ? 'slide-in-right' : 'slide-in-left');
                  inSlotEl.classList.add('active');
              }
              if (currentSlotEl) {
                  currentSlotEl.classList.remove('active', 'slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
                  void currentSlotEl.offsetWidth;
                  currentSlotEl.classList.add(dir > 0 ? 'slide-out-left' : 'slide-out-right');
              }
              
              setTimeout(() => {
                 if (currentSlotEl && currentSlotEl.src !== "") {
                     if (currentSlotEl.src.includes('youtube')) {
                         currentSlotEl.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                     }
                     currentSlotEl.src = ""; 
                 }
              }, 700);

              activeSlot.current = inactiveSlotId;
              
              setTimeout(() => {
                  currentIdx.current = nextIdx;
                  updatePreloads(nextIdx);
                  syncData();
                  
                  rows.forEach((r: any) => { r.style.transition = 'none'; r.classList.remove('text-exit-left', 'text-exit-right'); r.classList.add(dir > 0 ? 'text-exit-right' : 'text-exit-left'); });
                  setTimeout(() => {
                      rows.forEach((r: any) => { r.style.transition = 'opacity 0.4s ease, transform 0.6s var(--transition-kinetic)'; r.classList.remove('text-exit-left', 'text-exit-right'); });
                  }, 50);
              }, 400);
          });
      });
  };

  const switchTab = (tab: 'fullscreen' | 'details' | 'casestudy' | 'episodes') => {
      const modal = document.getElementById('videoModal');
      const panel = document.getElementById('infoPanel');
      const rows = document.querySelectorAll('#infoPanel .reveal-row');
      
      resetAutoHoverTimers();
      
      document.querySelectorAll('.video-tab').forEach(el => {
          if (el.getAttribute('data-mode') === tab) {
              el.classList.add('text-white', 'border-[#00e58c]');
              el.classList.remove('text-gray-500', 'border-transparent');
          } else {
              el.classList.remove('text-white', 'border-[#00e58c]');
              el.classList.add('text-gray-500', 'border-transparent');
          }
      });

      if (modal) {
          modal.classList.remove('casestudy-active', 'episodes-active');
      }

      if (tab === 'fullscreen') {
          if (isPanelOpen.current) {
              rows.forEach((r: any) => { r.style.transition = 'opacity 0.2s ease, transform 0.3s ease'; r.classList.add('text-exit-left'); });
              setTimeout(() => { 
                if (panel) panel.classList.remove('active'); 
                setTimeout(() => { rows.forEach((r: any) => { r.style.transition = 'none'; r.classList.remove('text-exit-left'); }); }, 700); 
              }, 100);
              isPanelOpen.current = false;
          }
      } else if (tab === 'details') {
          if (!isPanelOpen.current) {
              rows.forEach((r: any) => { r.style.transition = 'none'; r.classList.add('text-exit-left'); });
              if (panel) panel.classList.add('active');
              setTimeout(() => { rows.forEach((r: any) => { r.style.transition = 'opacity 0.4s ease, transform 0.6s var(--transition-kinetic)'; r.classList.remove('text-exit-left'); }); }, 50);
              isPanelOpen.current = true;
          }
      } else if (tab === 'casestudy') {
          if (!isPanelOpen.current) {
              rows.forEach((r: any) => { r.style.transition = 'none'; r.classList.add('text-exit-left'); });
              if (panel) panel.classList.add('active');
              setTimeout(() => { rows.forEach((r: any) => { r.style.transition = 'opacity 0.4s ease, transform 0.6s var(--transition-kinetic)'; r.classList.remove('text-exit-left'); }); }, 50);
              isPanelOpen.current = true;
          }
          if (modal) modal.classList.add('casestudy-active');
      } else if (tab === 'episodes') {
          if (!isPanelOpen.current) {
              rows.forEach((r: any) => { r.style.transition = 'none'; r.classList.add('text-exit-left'); });
              if (panel) panel.classList.add('active');
              setTimeout(() => { rows.forEach((r: any) => { r.style.transition = 'opacity 0.4s ease, transform 0.6s var(--transition-kinetic)'; r.classList.remove('text-exit-left'); }); }, 50);
              isPanelOpen.current = true;
          }
          if (modal) modal.classList.add('episodes-active');
      }
  };

  const closeConsole = () => {
      const modal = document.getElementById('videoModal');
      document.body.style.overflow = '';
      if (modal) modal.classList.remove('active', 'casestudy-active', 'episodes-active');
      const panel = document.getElementById('infoPanel');
      if (panel) panel.classList.remove('active');
      isPanelOpen.current = false;
      setTimeout(() => { 
        if (modal) modal.style.display = 'none'; 
        const a = document.getElementById('slotA') as HTMLIFrameElement;
        const b = document.getElementById('slotB') as HTMLIFrameElement;
        if (a) a.src = ""; 
        if (b) b.src = ""; 
      }, 500);
  };

  const renderMasterHeader = () => (
    <div className="master-header w-full pointer-events-none">
        <div className="flex gap-6 md:gap-10 mb-5">
            <button className="video-tab text-white border-b-[3px] border-[#00e58c] pb-2 font-bold uppercase text-xs tracking-[0.2em] transition-colors hover:text-white pointer-events-auto" data-mode="fullscreen" onClick={() => switchTab('fullscreen')}>Fullscreen</button>
            <button className="video-tab text-gray-500 border-b-[3px] border-transparent hover:text-white pb-2 font-bold uppercase text-xs tracking-[0.2em] transition-colors pointer-events-auto" data-mode="casestudy" onClick={() => switchTab('casestudy')}>Case Study</button>
            <button className="video-tab text-gray-500 border-b-[3px] border-transparent hover:text-white pb-2 font-bold uppercase text-xs tracking-[0.2em] transition-colors pointer-events-auto" data-mode="episodes" data-tab-type="episodes" onClick={() => switchTab('episodes')}>Episodes</button>
        </div>
        <div className="mh-title text-4xl md:text-[3.5rem] leading-none font-sans font-bold tracking-tight text-white mb-4 whitespace-nowrap" style={{textShadow: '0 4px 20px rgba(0,0,0,0.8)'}}>
            Title
        </div>
        <div className="flex flex-wrap gap-6 text-[10px] md:text-xs text-gray-400 font-sans tracking-widest uppercase font-semibold">
            <span className="mh-yr">2026</span>
            <span className="mh-client">CLIENT <span className="text-[#00e58c]">RED BULL</span></span>
            <span className="mh-role">ROLE <span className="text-[#00e58c]">PRODUCER</span></span>
        </div>
    </div>
  );

  return (
    <>
      <div id="preloadContainer" style={{display: 'none'}}></div>
      {document.body ? createPortal(
        <div className="train-overlay" id="trainOverlay"><div className="grid-train" id="trainInner"></div></div>, document.body
      ) : null}
      
      <div className="grid-container" id="galleryGrid">
        {catalog.map((p, i) => {
          const bgUrl = (p as any).thumbnail || ((p as any).isInstagram || p.id.includes('rrn') 
            ? `https://picsum.photos/seed/${p.title.replace(/\s/g, '')}/1280/720` 
            : `https://img.youtube.com/vi/${p.id}/maxresdefault.jpg`);
          return (
            <div key={p.id} className="project-card" onClick={() => openConsole(i)}>
              <div className="card-img" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
              <div className="card-label">{p.title}</div>
            </div>
          );
        })}
      </div>

      {document.body ? createPortal(
        <div id="videoModal" className="video-modal" onClick={closeConsole}>
            <div className="absolute top-[88px] right-6 md:right-10 z-[200] pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <button className="text-white/80 hover:text-[#00e58c] hover:bg-black/60 transition-colors p-2 bg-black/20 rounded-full backdrop-blur-md" onClick={closeConsole}>
                    <svg viewBox="0 0 24 24" width="28" height="28"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round"/></svg>
                </button>
            </div>

            <div className="console-stage" id="mainStage" onClick={(e) => e.stopPropagation()}>
                <div className="case-study-wrapper">
                    {renderMasterHeader()}
                    <div className="cs-inner flex flex-col w-full h-full relative" style={{ display: 'flex' }}>
                        <div id="csTitleOuter" className="cs-title uppercase tracking-tight text-3xl flex items-center gap-2">
                        </div>
                        <div className="flex w-full h-full relative" style={{ flex: 1, minHeight: 0 }}>
                            <div className="cs-scroll-indicator">
                                <div className="cs-scroll-cap-top"></div>
                                <div className="cs-scroll-progress" id="csProgress"></div>
                                <div className="cs-scroll-cap-bottom"></div>
                            </div>
                            <div id="caseStudyPanel" className="case-study-panel" onScroll={handleScroll}>
                            <div className="case-study-content">
                                <img className="cs-img" src="https://picsum.photos/seed/cs1/800/400" alt="Behind the scenes 1" />
                            <p className="cs-text">We brought together the top technical producers and directors to orchestrate an unforgettable experience. The setup required massive rigging, custom-built staging, and high-performance audio synchronization.</p>
                            <img className="cs-img" src="https://picsum.photos/seed/cs2/800/400" alt="Behind the scenes 2" />
                            <p className="cs-text">Camera operators were positioned at specific dynamic angles, capturing every raw emotion and fast-paced transition. The lighting design evolved to reflect the energy of the track.</p>
                            <p className="cs-text">Post-production involved rigorous color grading and audio mastering to ensure the final output resonated with intensity on all platforms.</p>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="episodes-wrapper" id="episodesWrapper">
                    {renderMasterHeader()}
                    <div className="ep-inner flex flex-col w-full h-full relative" style={{ display: 'flex' }}>
                        <div id="epTitleOuter" className="cs-title uppercase tracking-tight text-3xl flex items-center gap-2">
                        </div>
                        <div className="flex w-full h-full relative" style={{ flex: 1, minHeight: 0 }}>
                            <div className="episodes-panel">
                                <div className="episodes-content grid grid-cols-2 md:grid-cols-4 gap-4" id="episodesGrid">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="video-window" id="vWin">
                    {renderMasterHeader()}
                    <div className="video-container" id="videoTarget">
                        <iframe id="slotA" className="video-slot active" src={undefined} allow="autoplay; fullscreen"></iframe>
                        <iframe id="slotB" className="video-slot" src={undefined} allow="autoplay; fullscreen"></iframe>
                    </div>
                </div>
                <div className="nav-zone prev-zone" onClick={() => navStep(-1)}><div className="nav-arrow">&#10094;</div></div>
                <div className="nav-zone next-zone" onClick={() => navStep(1)}><div className="nav-arrow">&#10095;</div></div>
            </div>
        </div>, document.body
      ) : null}
    </>
  );
};

export default GalleryView;
