/*
 Carousel - optional progressive enhancement.

 Without this file the carousel is still a native scroll-snap strip that can be
 swiped and scrolled. This script adds the previous/next buttons and the
 position indicator, and keeps them in sync with the visible slide.

 It deliberately uses no dependencies and no framework.
*/
(() => {
    const CAROUSEL_SELECTOR = '.carousel';
    const VIEWPORT_SELECTOR = '.carousel__viewport';
    const SLIDE_SELECTOR = '.carousel__slide';
    const INDICATOR_SELECTOR = '.carousel__indicator';
    const COUNTER_SELECTOR = '.carousel__counter';
    const PREVIOUS_SELECTOR = '.carousel__button--previous';
    const NEXT_SELECTOR = '.carousel__button--next';

    const enhance = (carousel) => {
        // The viewport is the element that scrolls - the track inside it is
        // what moves. The scroll event doesn't bubble, so it has to be
        // listened for on the viewport itself.
        const viewport = carousel.querySelector(VIEWPORT_SELECTOR);
        if (!viewport) {
            return;
        }

        const slides = Array.from(viewport.querySelectorAll(SLIDE_SELECTOR));
        if (slides.length < 2) {
            return;
        }

        const indicators = Array.from(carousel.querySelectorAll(INDICATOR_SELECTOR));
        const counter = carousel.querySelector(COUNTER_SELECTOR);
        const previous = carousel.querySelector(PREVIOUS_SELECTOR);
        const next = carousel.querySelector(NEXT_SELECTOR);
        let index = 0;

        const goTo = (target) => {
            index = Math.max(0, Math.min(slides.length - 1, target));
            slides[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        };

        // Finds the slide that is snapped to the start of the viewport. The
        // start position is offset by the viewport's scroll padding, which is
        // what keeps the slides aligned with the track's own padding.
        const sync = () => {
            const styles = getComputedStyle(viewport);
            const padding = parseFloat(styles.scrollPaddingInlineStart) || 0;
            const origin = viewport.getBoundingClientRect().left + padding;
            let closest = 0;
            let shortest = Infinity;

            slides.forEach((slide, position) => {
                const distance = Math.abs(slide.getBoundingClientRect().left - origin);
                if (distance < shortest) {
                    shortest = distance;
                    closest = position;
                }
            });

            index = closest;
            indicators.forEach((indicator, position) => {
                indicator.setAttribute('aria-current', position === index ? 'true' : 'false');
            });
            if (counter) {
                counter.textContent = (index + 1) + ' of ' + slides.length;
            }
            if (previous) {
                previous.disabled = index === 0;
            }
            if (next) {
                next.disabled = index === slides.length - 1;
            }
        };

        if (previous) {
            previous.addEventListener('click', () => goTo(index - 1));
        }
        if (next) {
            next.addEventListener('click', () => goTo(index + 1));
        }
        indicators.forEach((indicator, position) => {
            indicator.addEventListener('click', () => goTo(position));
        });

        carousel.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goTo(index - 1);
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                goTo(index + 1);
            }
        });

        viewport.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });

        // Reveal the controls now that they are wired up.
        carousel.setAttribute('data-enhanced', 'true');
        sync();
    };

    document.querySelectorAll(CAROUSEL_SELECTOR).forEach(enhance);
})();
