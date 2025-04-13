// Hostinger Embed Handler
window.addEventListener('message', function(event) {
    // Security check
    if (event.origin !== "https://myspeakcoach.com") return;

    try {
        if (event.data && event.data.type === 'setHeight') {
            const iframes = document.querySelectorAll('iframe[src*="myspeakcoach.com"]');
            iframes.forEach(iframe => {
                // Add some buffer to prevent scrolling
                iframe.style.height = (event.data.height + 50) + 'px';

                // Update parent container if needed
                const container = iframe.closest('[class*="grid-embed"]');
                if (container) {
                    container.style.height = (event.data.height + 50) + 'px';
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
        iframe.style.border = 'none';
        iframe.style.overflow = 'auto';

        // Force parent container to proper dimensions
        const container = iframe.closest('[class*="grid-embed"]');
        if (container) {
            container.style.width = '100%';
            container.style.minHeight = '800px';
            container.style.overflow = 'visible';
        }
    });
});