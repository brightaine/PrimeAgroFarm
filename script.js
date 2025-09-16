// Smooth scroll for navigation links (if any internal anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form validation for newsletter
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing!');
            this.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Form validation for contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const message = this.querySelector('#message').value;
        if (name && email && message) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Image zoom effect (enhancement)
document.querySelectorAll('.card img, .news-card img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCounter();
    });
}

// Run animation when stats section is in view
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(statsSection);
}

// News data
const defaultNews = [
    { id: 1, title: 'Sustainable Farming Practices Implemented', description: 'We have implemented advanced irrigation systems and organic pest control methods to ensure our crops are grown sustainably, reducing environmental impact while maintaining high yields. This initiative supports our commitment to eco-friendly agriculture in Zirobwe.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    { id: 2, title: 'New Community Outreach Program', description: 'Our new community outreach program focuses on educating local farmers about modern dairy techniques and sustainable practices. Through workshops and training sessions, we\'re empowering the Zirobwe community to improve their agricultural productivity and livelihoods.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    { id: 3, title: 'Milking Technology Upgrades', description: 'We\'ve upgraded our milking parlors with state-of-the-art automated systems that ensure hygienic milk collection and improve cow comfort. This technology enhances milk quality and increases efficiency in our daily operations at Prime Agro Farm.', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    { id: 4, title: 'Annual Harvest Festival Announced', description: 'Join us for our annual harvest festival celebrating the bountiful yields from our sustainable farming efforts. The event will feature local produce displays, dairy product tastings, and educational sessions on modern agricultural practices in Zirobwe.', image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    { id: 5, title: 'Partnership with Local Schools', description: 'Prime Agro Farm has partnered with local schools in Zirobwe to provide hands-on agricultural education. Students will learn about dairy farming, crop cultivation, and sustainable practices through field trips and interactive workshops at our facility.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    { id: 6, title: 'Environmental Impact Report', description: 'Our latest environmental impact report shows significant improvements in water conservation and reduced carbon footprint through our sustainable farming initiatives. We\'re proud to contribute to a greener Zirobwe while maintaining agricultural productivity.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
];

// News engagement functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize example data if not exists
    if (!localStorage.getItem('newsLikes')) {
        localStorage.setItem('newsLikes', JSON.stringify({}));
    }
    if (!localStorage.getItem('newsComments')) {
        const exampleComments = {
            '1': [
                { name: 'John Farmer', email: 'john.farmer@example.com', comment: 'Great initiative! Sustainable farming is the future.', date: new Date().toISOString() },
                { name: 'Mary Community', email: 'mary.community@example.com', comment: 'Looking forward to seeing the results in our local environment.', date: new Date().toISOString() }
            ],
            '2': [
                { name: 'David Educator', email: 'david.educator@example.com', comment: 'This outreach program will be very beneficial for our students.', date: new Date().toISOString() }
            ],
            '3': [
                { name: 'Sarah Tech', email: 'sarah.tech@example.com', comment: 'Modern technology in farming is impressive. Keep up the good work!', date: new Date().toISOString() },
                { name: 'Robert Dairy', email: 'robert.dairy@example.com', comment: 'As a fellow dairy farmer, I appreciate the focus on cow comfort.', date: new Date().toISOString() }
            ],
            '4': [
                { name: 'Anna Local', email: 'anna.local@example.com', comment: 'The harvest festival sounds amazing! Will there be family activities?', date: new Date().toISOString() }
            ],
            '5': [
                { name: 'Peter School', email: 'peter.school@example.com', comment: 'Partnerships like this are crucial for educating the next generation.', date: new Date().toISOString() },
                { name: 'Linda Parent', email: 'linda.parent@example.com', comment: 'My children will love learning about farming hands-on.', date: new Date().toISOString() }
            ],
            '6': [
                { name: 'Michael Green', email: 'michael.green@example.com', comment: 'Environmental responsibility is key. Proud of your efforts!', date: new Date().toISOString() }
            ]
        };
        localStorage.setItem('newsComments', JSON.stringify(exampleComments));
    }

    loadNews();
    loadEngagementData();
});

// Load news
function loadNews() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    const adminNews = JSON.parse(localStorage.getItem('adminNews') || '[]');
    const allNews = [...defaultNews, ...adminNews.map((item, index) => ({ ...item, id: 7 + index }))];

    newsGrid.innerHTML = '';
    allNews.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.setAttribute('data-news-id', news.id);
        newsCard.innerHTML = `
            <img src="${news.image}" alt="Farm News">
            <h3>${news.title}</h3>
            <p>${news.description}</p>
            <a href="#" class="btn">Read More</a>
            <div class="engagement">
                <button class="like-btn" data-news-id="${news.id}">👍 Like (<span class="like-count">0</span>)</button>
                <button class="show-comments-btn" data-news-id="${news.id}">💬 Show Comments</button>
                <div class="comments-section" id="comments-${news.id}">
                    <h4>Comments</h4>
                    <div class="comments-list"></div>
                    <form class="comment-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <textarea placeholder="Your Comment" required></textarea>
                        <button type="submit">Post Comment</button>
                    </form>
                </div>
            </div>
        `;
        newsGrid.appendChild(newsCard);
    });
}

// Load likes and comments from localStorage
function loadEngagementData() {
    const likes = JSON.parse(localStorage.getItem('newsLikes') || '{}');
    const comments = JSON.parse(localStorage.getItem('newsComments') || '{}');

    // Update like counts
    document.querySelectorAll('.like-btn').forEach(btn => {
        const newsId = btn.dataset.newsId;
        const count = likes[newsId] || 0;
        btn.querySelector('.like-count').textContent = count;
    });

    // Display comments
    document.querySelectorAll('.comments-list').forEach(list => {
        const newsCard = list.closest('.news-card');
        const newsId = newsCard.dataset.newsId;
        const newsComments = comments[newsId] || [];
        list.innerHTML = '';
        newsComments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `
                <strong>${comment.name}</strong> (${comment.email})<br>
                ${comment.comment}<br>
                <small>${new Date(comment.date).toLocaleDateString()}</small>
            `;
            list.appendChild(commentDiv);
        });
    });
}

// Handle like button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('like-btn') || e.target.closest('.like-btn')) {
        const btn = e.target.closest('.like-btn');
        const newsId = btn.dataset.newsId;
        const likes = JSON.parse(localStorage.getItem('newsLikes') || '{}');
        likes[newsId] = (likes[newsId] || 0) + 1;
        localStorage.setItem('newsLikes', JSON.stringify(likes));
        btn.querySelector('.like-count').textContent = likes[newsId];
    }
});

// Handle show comments button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('show-comments-btn')) {
        const newsId = e.target.dataset.newsId;
        showCommentsModal(newsId);
    }
});

// Handle comment form submissions
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('comment-form')) {
        e.preventDefault();
        const form = e.target;
        const newsCard = form.closest('.news-card');
        const newsId = newsCard ? newsCard.dataset.newsId : null;

        // Handle modal form submission
        if (form.id === 'modal-comment-form') {
            const modal = document.getElementById('comments-modal');
            newsId = modal.dataset.newsId;
        }

        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const comment = form.querySelector('textarea').value;

        const comments = JSON.parse(localStorage.getItem('newsComments') || '{}');
        if (!comments[newsId]) comments[newsId] = [];
        comments[newsId].push({
            name: name,
            email: email,
            comment: comment,
            date: new Date().toISOString()
        });
        localStorage.setItem('newsComments', JSON.stringify(comments));

        form.reset();
        loadEngagementData();

        // If modal is open, update modal comments
        if (form.id === 'modal-comment-form') {
            const modal = document.getElementById('comments-modal');
            const modalNewsId = modal.dataset.newsId;
            updateModalComments(modalNewsId);
        }
    }
});


// Show comments modal
function showCommentsModal(newsId) {
    const modal = document.getElementById('comments-modal');
    const modalCommentsList = document.getElementById('modal-comments-list');
    const closeBtn = modal.querySelector('.close-btn');

    // Store newsId in modal for form submission
    modal.dataset.newsId = newsId;

    // Populate modal with comments
    updateModalComments(newsId);

    // Show modal
    modal.style.display = 'block';

    // Close modal when clicking close button
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Update modal comments
function updateModalComments(newsId) {
    const modalCommentsList = document.getElementById('modal-comments-list');
    const comments = JSON.parse(localStorage.getItem('newsComments') || '{}');
    const newsComments = comments[newsId] || [];

    modalCommentsList.innerHTML = '';
    newsComments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <strong>${comment.name}</strong> (${comment.email})<br>
            ${comment.comment}<br>
            <small>${new Date(comment.date).toLocaleDateString()}</small>
        `;
        modalCommentsList.appendChild(commentDiv);
    });
}