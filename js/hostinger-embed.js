// Hostinger Embed Handler
window.addEventListener('message', function(event) {
    // Security check
    if (event.origin !== "https://myspeakcoach.com") return;

    try {
        if (event.data && event.data.type === 'setHeight') {
            const height = Math.max(parseInt(event.data.height) + 100, 800); // 100px buffer
            const iframes = document.querySelectorAll('iframe[src*="myspeakcoach.com"]');

            iframes.forEach(iframe => {
                // Update iframe height
                iframe.style.height = height + 'px';

                // Update parent container if needed
                const container = iframe.closest('.grid-embed, [class*="grid-embed"]');
                if (container) {
                    container.style.height = height + 'px';
                }
            });
        }
    } catch (error) {
        console.error('Error handling iframe message:', error);
    }
});

// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('iframe[src*="myspeakcoach.com"]');
    iframes.forEach(iframe => {
        // Set initial styles
        iframe.style.width = '100%';
        iframe.style.minHeight = '800px';
        iframe.style.height = '800px';
        iframe.style.border = 'none';
        iframe.style.overflow = 'auto';

        // Force parent container to proper dimensions
        const container = iframe.closest('.grid-embed, [class*="grid-embed"]');
        if (container) {
            container.style.width = '100%';
            container.style.minHeight = '800px';
            container.style.height = '800px';
            container.style.overflow = 'visible';
        }
    });
});

// Send height to parent window
function sendHeightToParent() {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({
        type: 'setHeight',
        height: height
    }, '*');
}

// Monitor height changes
if (window.location.href.includes('myspeakcoach.com')) {
    // Send height on load and after any content changes
    window.addEventListener('load', sendHeightToParent);
    window.addEventListener('resize', sendHeightToParent);

    // Monitor for dynamic content changes
    const observer = new MutationObserver(sendHeightToParent);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}