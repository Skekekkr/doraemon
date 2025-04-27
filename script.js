document.addEventListener('DOMContentLoaded', function() {
    // Check if we should show the application based on timemachine.md access
    checkTimeMachineAccess();

    // Set up event listeners
    setupEventListeners();

    // Initialize demo data (remove in production)
    initializeDemoData();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize the timeline carousel
    initializeTimelineCarousel();
});

// Function to check if user has accessed timemachine.md
function checkTimeMachineAccess() {
    // In a real application, this would be a server-side check
    // For this demo, we'll use localStorage to simulate the check
    const hasAccessedTimeMachine = localStorage.getItem('accessedTimeMachine');
    
    if (!hasAccessedTimeMachine) {
        // Redirect to timemachine.md if not accessed
        window.location.href = 'timemachine.html';
    }
}

// Initialize the timeline carousel for years 0-18
function initializeTimelineCarousel() {
    const carouselTrack = document.querySelector('.timeline-carousel-track');
    const dotsContainer = document.querySelector('.timeline-carousel-dots');
    const yearIndicator = document.getElementById('currentCarouselYear');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const totalYears = 19; // 0-18
    const slidesVisible = 3;
    const totalSlides = Math.ceil(totalYears / slidesVisible);
    let currentPage = 0;
    
    // Create slides for years 0-18
    if (carouselTrack) {
        // Clear existing content
        carouselTrack.innerHTML = '';
        
        // Create slides for each year
        for (let year = 0; year <= 18; year++) {
            const slide = document.createElement('div');
            slide.className = 'timeline-slide';
            slide.setAttribute('data-year', year);
            
            // Set different styling for birth year vs other years
            const isBirthYear = year === 0;
            const title = isBirthYear ? 'Birth Year' : `Age ${year}`;
            const description = isBirthYear 
                ? 'Add the first memories and letter for your child!' 
                : year <= 3 
                    ? `Document precious milestones from your child's age ${year}!` 
                    : `Capture memories from age ${year} to preserve for the future!`;
            const bgClass = isBirthYear ? 'bg-doraemon-light-blue' : 'bg-gray-100';
            
            slide.innerHTML = `
                <div class="${bgClass} rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 class="font-bold text-xl mb-2">${title}</h3>
                    <p class="text-gray-600 mb-4">${description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">Age ${year}</span>
                        <button class="px-4 py-2 bg-doraemon-blue text-white rounded-md text-sm hover:bg-doraemon-blue-dark add-entry-btn" data-year="${year}">
                            Add Entry
                        </button>
                    </div>
                </div>
            `;
            
            carouselTrack.appendChild(slide);
        }
        
        // Create navigation dots for page groups
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            
            for (let page = 0; page < totalSlides; page++) {
                const dot = document.createElement('button');
                dot.className = `w-3 h-3 rounded-full ${page === 0 ? 'bg-doraemon-blue' : 'bg-gray-300'} transition-all duration-300`;
                dot.setAttribute('data-page', page);
                
                // Calculate which years this dot represents
                const startYear = page * slidesVisible;
                const endYear = Math.min(startYear + slidesVisible - 1, 18);
                dot.setAttribute('aria-label', `Ages ${startYear}-${endYear}`);
                
                dot.addEventListener('click', () => {
                    goToPage(page);
                });
                
                dotsContainer.appendChild(dot);
            }
        }
        
        // Set up event listeners for carousel controls
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentPage > 0) {
                    goToPage(currentPage - 1);
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentPage < totalSlides - 1) {
                    goToPage(currentPage + 1);
                }
            });
        }
        
        // Update Add Entry buttons to show the entry form
        const addEntryButtons = document.querySelectorAll('.timeline-carousel .add-entry-btn');
        addEntryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const year = this.getAttribute('data-year');
                showEntryForm(year);
            });
        });
        
        // Initialize carousel to first page
        goToPage(0);
    }
    
    // Function to go to a specific page in the carousel
    function goToPage(page) {
        if (carouselTrack && yearIndicator) {
            currentPage = page;
            
            // Update transform to show the current page of slides
            const slideWidth = 100 / slidesVisible;
            const translateValue = page * (slideWidth * slidesVisible);
            carouselTrack.style.transform = `translateX(-${translateValue}%)`;
            
            // Update year indicator
            const startYear = page * slidesVisible;
            const endYear = Math.min(startYear + slidesVisible - 1, 18);
            yearIndicator.textContent = `${startYear}-${endYear}`;
            
            // Update dots
            const dots = document.querySelectorAll('.timeline-carousel-dots button');
            dots.forEach(dot => {
                const dotPage = parseInt(dot.getAttribute('data-page'));
                if (dotPage === page) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-doraemon-blue');
                } else {
                    dot.classList.remove('bg-doraemon-blue');
                    dot.classList.add('bg-gray-300');
                }
            });
            
            // Update button states
            if (prevButton) {
                prevButton.disabled = page === 0;
                prevButton.style.opacity = page === 0 ? '0.5' : '1';
            }
            
            if (nextButton) {
                nextButton.disabled = page === totalSlides - 1;
                nextButton.style.opacity = page === totalSlides - 1 ? '0.5' : '1';
            }
        }
    }
}

// Initialize animations for timeline and other elements
function initializeAnimations() {
    // Animate header elements
    animateElement(document.querySelector('header h1'), 'slide-in-up');
    animateElement(document.querySelector('header p'), 'slide-in-up', 200);
    
    // Animate child profile section
    animateElement(document.querySelector('#childProfileForm'), 'slide-in-right', 400);
    
    // Add form control animations
    const formControls = document.querySelectorAll('input, textarea');
    formControls.forEach(control => {
        control.classList.add('form-control');
    });
    
    // Add animation to the carousel
    animateElement(document.querySelector('.timeline-carousel-container'), 'fade-in', 600);
}

// Helper function to animate elements
function animateElement(element, animationClass, delay = 0) {
    if (!element) return;
    
    setTimeout(() => {
        element.classList.add(animationClass);
    }, delay);
}

// Set up event listeners for the application
function setupEventListeners() {
    // Child profile form submission
    const profileForm = document.getElementById('childProfileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('childName').value;
            const birthdate = document.getElementById('birthdate').value;
            
            if (name && birthdate) {
                // Save profile data (in a real app, this would go to a database)
                localStorage.setItem('childProfile', JSON.stringify({
                    name,
                    birthdate
                }));
                
                // Show success message with animation
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 slide-in-up';
                successMessage.innerHTML = `<strong>Success!</strong> Profile created for ${name}!`;
                profileForm.appendChild(successMessage);
                
                // Update UI to show timeline
                updateUIAfterProfileCreation(name);
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 3000);
            }
        });
    }

    // Timeline year click event
    const addEntryButtons = document.querySelectorAll('.bg-doraemon-blue.text-white.text-sm');
    addEntryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const yearElement = this.closest('.relative').querySelector('.rounded-full');
            const year = yearElement.textContent.trim();
            showEntryForm(year);
        });
    });

    // File upload handling
    const fileUpload = document.getElementById('fileUpload');
    if (fileUpload) {
        fileUpload.addEventListener('change', handleFileUpload);
    }
}

// Function to update UI after profile creation
function updateUIAfterProfileCreation(childName) {
    // Replace placeholders with child's name
    document.querySelectorAll('[data-placeholder="childName"]').forEach(el => {
        el.textContent = childName;
    });
    
    // You could also update the UI to show the timeline more prominently
    // or hide the profile form
    
    // Animate the timeline section
    const timelineSection = document.querySelector('.bg-white.rounded-lg.shadow-md:nth-child(2)');
    if (timelineSection) {
        timelineSection.classList.add('pulse-animation');
        setTimeout(() => {
            timelineSection.classList.remove('pulse-animation');
        }, 2000);
    }
}

// Function to show the entry form for a specific year
function showEntryForm(year) {
    const entryForm = document.getElementById('entryForm');
    const currentYearSpan = document.getElementById('currentYear');
    
    if (entryForm && currentYearSpan) {
        // Update the year in the form
        currentYearSpan.textContent = year;
        
        // Show the form with animation
        entryForm.classList.remove('hidden');
        entryForm.classList.add('slide-in-up');
        
        // Scroll to the form with smooth animation
        entryForm.scrollIntoView({ behavior: 'smooth' });
        
        // Clear any previous animation classes after animation completes
        setTimeout(() => {
            entryForm.classList.remove('slide-in-up');
        }, 1000);
    }
}

// Function to handle file uploads
function handleFileUpload(e) {
    const files = e.target.files;
    const previewContainer = document.getElementById('mediaPreview');
    
    if (!previewContainer) return;
    
    // Clear previous previews
    // previewContainer.innerHTML = '';
    
    // Process each file
    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        const previewItem = document.createElement('div');
        previewItem.className = 'media-preview-item';
        
        reader.onload = function(e) {
            const fileType = file.type.split('/')[0];
            
            if (fileType === 'image') {
                const img = document.createElement('img');
                img.src = e.target.result;
                previewItem.appendChild(img);
            } else if (fileType === 'video') {
                const video = document.createElement('video');
                video.src = e.target.result;
                video.controls = true;
                previewItem.appendChild(video);
            }
            
            // Add remove button
            const removeBtn = document.createElement('div');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', function() {
                // Remove with animation
                previewItem.style.opacity = '0';
                previewItem.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    previewItem.remove();
                }, 300);
            });
            
            previewItem.appendChild(removeBtn);
            previewContainer.appendChild(previewItem);
            
            // Animate the preview item with staggered delay
            setTimeout(() => {
                previewItem.classList.add('active');
            }, 100 * index);
        };
        
        reader.readAsDataURL(file);
    });
}

// Initialize demo data (for development purposes)
function initializeDemoData() {
    // Check if we already have demo data
    if (!localStorage.getItem('demoDataInitialized')) {
        // Create sample timeline data
        const timelineData = [
            { year: 0, title: 'Birth Year', completed: false },
            { year: 1, title: 'First Birthday', completed: false },
            { year: 2, title: 'Second Birthday', completed: false },
            // Add more years as needed
        ];
        
        localStorage.setItem('timelineData', JSON.stringify(timelineData));
        localStorage.setItem('demoDataInitialized', 'true');
    }
} 