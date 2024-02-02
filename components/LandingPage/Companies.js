import React, { useEffect } from 'react';

const Companies = () => {
    useEffect(() => {
        const scrollers = document.querySelectorAll('.scroller');

        // If a user hasn't opted in for reduced motion, then we add the animation
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            addAnimation(scrollers);
        }

        function addAnimation(scrollers) {
            scrollers.forEach((scroller) => {
                // add data-animated="true" to every `.scroller` on the page
                scroller.setAttribute('data-animated', true);

                // Make an array from the elements within `.scroller-inner`
                const scrollerInner = scroller.querySelector('.scroller__inner');
                const scrollerContent = Array.from(scrollerInner.children);

                // For each item in the array, clone it
                // add aria-hidden to it
                // add it into the `.scroller-inner`
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute('aria-hidden', true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }
    }, []); // Run the effect only once on component mount

    return (
        <section id='companies-section' className='items-center mt-20'>
            <h3 className='text-4xl text-center'>Companies that trust <strong>Smart Recruiter</strong> for hiring</h3>
            <div className="scroller" data-speed="slow">
                <div className="scroller__inner items-center">
                    <img src="Amd_logo_PNG1.png" height={150} width={150} alt="" />
                    <img src="Amazon.png" height={150} width={150} alt="" />
                    <img src="10Pearls.png" height={200} width={200} alt="" />
                    
                    <img src="hp.png" height={70} width={70} alt="" />
                    <img src="IBM.png" height={100} width={100} alt="" />
                    <img src="MSI.png" height={100} width={150} alt="" />

                </div>
            </div>
        </section>
    );
}

export default Companies;
