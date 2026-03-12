const clearAds = () => {
    const video = document.querySelector('video');
    const adContainer = document.querySelector('.ad-showing, .ad-interrupting');
    
    // 1. Reklam Yönetimi
    if (adContainer && video) {
        video.muted = true;
        video.playbackRate = 16.0; 
        
        if (isFinite(video.duration)) {
            video.currentTime = video.duration - 0.1;
        }

        const skipBtn = document.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button');
        if (skipBtn) skipBtn.click();
    }

    // 2. Engelleyici Uyarılarını Temizle
    const enforcementMessage = document.querySelector('ytd-enforcement-message-view-model');
    const overlay = document.querySelector('tp-yt-paper-dialog');
    
    if (enforcementMessage || overlay) {
        if (enforcementMessage) enforcementMessage.remove();
        if (overlay) overlay.remove();
        
        if (video && video.paused && !adContainer) {
            video.play();
        }
    }
};

// 3. GÜVENLİ BAŞLATMA (Hata bu kısımda düzeltildi)
const init = () => {
    if (document.body) {
        // Döngüyü başlat
        setInterval(clearAds, 200);

        // Değişimleri izle
        const observer = new MutationObserver(clearAds);
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        // Sayfa henüz hazır değilse 100ms sonra tekrar dene
        setTimeout(init, 100);
    }
};

init();