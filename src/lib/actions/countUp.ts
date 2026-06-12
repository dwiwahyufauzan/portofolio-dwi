export function countUp(node: HTMLElement, targetValue: string) {
  const end = parseInt(targetValue.replace(/[^0-9]/g, ''));
  if (isNaN(end)) {
    node.innerText = targetValue;
    return;
  }
  const suffix = targetValue.replace(/[0-9]/g, '');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let startTimestamp: number | null = null;
        const duration = 1200; // Count up duration in ms
        
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // Easing out quadratic
          const easeProgress = progress * (2 - progress);
          const val = Math.floor(easeProgress * end);
          node.innerText = String(val) + suffix;
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
        observer.unobserve(node);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(node);
  return {
    destroy() {
      observer.disconnect();
    }
  };
}
