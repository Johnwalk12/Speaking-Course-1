// Hostinger Embed Handler
window.addEventListener('message', function(event) {
    // Security check
    if (event.origin !== "https://myspeakcoach.com") return;

    try {
        if (event.data && event.data.type === 'setHeight') {
            // Calculate height with all possible measurements
            const receivedHeight = parseInt(event.data.height);
            const calculatedHeight = Math.max(
                receivedHeight + 200, // Buffer space
                window.innerHeight * 0.8, // At least 80% of viewport
                800 // Minimum height
            );

            const iframes = document.querySelectorAll('iframe[src*="myspeakcoach.com"]');

            iframes.forEach(iframe => {
                // Update iframe height with smooth transition
                iframe.style.transition = 'all 0.3s ease-in-out';
                iframe.style.height = calculatedHeight + 'px';
                iframe.style.maxHeight = 'none';
                iframe.style.display = 'block';
                iframe.style.width = '100%';
                iframe.style.minHeight = '800px';

                // Update parent container if needed
                const container = iframe.closest('.grid-embed, [class*="grid-embed"]');
                if (container) {
                    container.style.transition = 'all 0.3s ease-in-out';
                    container.style.height = calculatedHeight + 'px';
                    container.style.maxHeight = 'none';
                    container.style.display = 'block';
                    container.style.width = '100%';
                    container.style.position = 'relative';
                    container.style.overflow = 'visible';

                    // Force layout recalculation
                    container.style.minHeight = calculatedHeight + 'px';
                }
            });
        }
    } catch (error) {
        console.error('Error handling iframe message:', error);
    }
});

// Enhanced initial setup
document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('iframe[src*="myspeakcoach.com"]');
    iframes.forEach(iframe => {
        // Set comprehensive initial styles
        const initialStyles = {
            width: '100%',
            minHeight: '800px',
            height: 'auto',
            border: 'none',
            overflow: 'visible',
            display: 'block',
            margin: '0 auto',
            transition: 'all 0.3s ease-in-out'
        };

        Object.assign(iframe.style, initialStyles);

        // Enhanced container setup
        const container = iframe.closest('.grid-embed, [class*="grid-embed"]');
        if (container) {
            const containerStyles = {
                width: '100%',
                minHeight: '800px',
                height: 'auto',
                overflow: 'visible',
                maxHeight: 'none',
                position: 'relative',
                display: 'block',
                margin: '0 auto',
                transition: 'all 0.3s ease-in-out'
            };

            Object.assign(container.style, containerStyles);
        }
    });
});

// Enhanced height calculation
function getMaxHeight() {
    return Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.body.offsetHeight
    );
}

// Improved height monitoring
function sendHeightToParent() {
    const height = getMaxHeight();
    window.parent.postMessage({
        type: 'setHeight',
        height: height
    }, '*');
}

// Enhanced monitoring for myspeakcoach.com content
if (window.location.href.includes('myspeakcoach.com')) {
    // Initial height calculation after load
    window.addEventListener('load', () => {
        setTimeout(sendHeightToParent, 100); // Delay to ensure content is rendered
    });

    // Monitor window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(sendHeightToParent, 100);
    });

    // Monitor content changes with ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
        sendHeightToParent();
    });

    resizeObserver.observe(document.body);

    // Monitor DOM changes
    const mutationObserver = new MutationObserver(() => {
        setTimeout(sendHeightToParent, 50);
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });

    // Monitor image loads
    document.addEventListener('load', function(e) {
        if (e.target.tagName === 'IMG') {
            sendHeightToParent();
        }
    }, true);
}