window.addEventListener('message', function(event) {
    // Verify the message origin for security
    if (event.origin !== 'https://myspeakcoach.com') {
        return;
    }

    try {
        const data = event.data;
        if (typeof data === 'object' && data.type === 'setHeight') {
            // Add more buffer space (100px instead of 50px)
            const height = Math.max(parseInt(data.height) + 100, 800);
            const iframes = document.querySelectorAll('iframe');

            iframes.forEach(function(iframe) {
                if (iframe.src.includes('myspeakcoach.com')) {
                    iframe.style.height = height + 'px';
                    // Also update the parent container if it exists
                    const parent = iframe.closest('.grid-embed');
                    if (parent) {
                        parent.style.height = height + 'px';
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error processing message:', error);
    }
});

// Initial iframe setup
document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe) {
        if (iframe.src.includes('myspeakcoach.com')) {
            iframe.style.width = '100%';
            iframe.style.minHeight = '800px';
            iframe.style.border = 'none';
            iframe.style.overflow = 'auto';

            // Set initial height
            iframe.style.height = '800px';

            // Update parent container
            const parent = iframe.closest('.grid-embed');
            if (parent) {
                parent.style.height = '800px';
            }
        }
    });
});