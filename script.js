// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close Mobile Menu
function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// Handle Form Submission
function handleSubmit(e) {
    e.preventDefault();
    const modal = document.getElementById('successModal');
    modal.style.display = 'flex';
    e.target.reset();
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Close Modal When Clicking Outside
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    const orderModal = document.getElementById('orderModal');
    if (event.target === orderModal) {
        closeOrderModal();
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button Functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Search Function
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('Please enter a search term');
        return;
    }
    
    // Searchable content
    const searchableContent = {
        'printing': '#services',
        'document': '#services',
        'photo': '#services',
        'photocopy': '#services',
        'lamination': '#services',
        'design': '#services',
        'custom': '#services',
        'school': '#products',
        'supplies': '#products',
        'office': '#products',
        'home': '#products',
        'gift': '#products',
        'crafts': '#products',
        'snacks': '#products',
        'about': '#about',
        'contact': '#contact',
        'help': '.help-section',


    };
    
    // Search for matching section
    let found = false;
    for (let keyword in searchableContent) {
        if (searchTerm.includes(keyword)) {
            const targetSection = document.querySelector(searchableContent[keyword]);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                found = true;
                break;
            }
        }
    }
    
    if (!found) {
        alert('No results found for "' + searchTerm + '". Try searching for: printing, products, services, contact, or about.');
    }
    
    searchInput.value = '';
}

// Allow Enter key to trigger search
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
// Order Modal Functions
function openOrderModal(serviceType) {
    const modal = document.getElementById('orderModal');
    const serviceInput = document.getElementById('order-service-type');
    serviceInput.value = serviceType;
    
    // Show/hide relevant fields based on service type
    const paperSizeGroup = document.getElementById('paper-size-group');
    const printTypeGroup = document.getElementById('print-type-group');
    const copiesGroup = document.getElementById('copies-group');
    const fileUploadGroup = document.getElementById('file-upload-group');
    
    const paperSizeSelect = document.getElementById('paper-size');
    const printTypeSelect = document.getElementById('print-type');
    const copiesInput = document.getElementById('copies');
    
    // Reset required attributes
    paperSizeSelect.required = false;
    printTypeSelect.required = false;
    copiesInput.required = false;
    
    if (serviceType === 'Photo Printing' || serviceType === 'Photocopying') {
        paperSizeGroup.style.display = 'block';
        printTypeGroup.style.display = 'block';
        copiesGroup.style.display = 'block';
        fileUploadGroup.style.display = 'block';
        
        paperSizeSelect.required = true;
        printTypeSelect.required = true;
        copiesInput.required = true;
    } else if (serviceType === 'Lamination') {
        paperSizeGroup.style.display = 'block';
        printTypeGroup.style.display = 'none';
        copiesGroup.style.display = 'block';
        fileUploadGroup.style.display = 'none';
        
        paperSizeSelect.required = true;
        copiesInput.required = true;
    } else {
        paperSizeGroup.style.display = 'none';
        printTypeGroup.style.display = 'none';
        copiesGroup.style.display = 'none';
        fileUploadGroup.style.display = 'block';
    }
    
    modal.style.display = 'flex';
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'none';
    document.querySelector('.order-form').reset();
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    const serviceType = document.getElementById('order-service-type').value;
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerEmail = document.getElementById('customer-email').value;
    const paperSize = document.getElementById('paper-size').value;
    const printType = document.getElementById('print-type').value;
    const copies = document.getElementById('copies').value;
    const fileUpload = document.getElementById('file-upload').files;
    const notes = document.getElementById('order-notes').value;
    
    // Create order summary
    let orderSummary = `Thank you ${customerName}!\n\n`;
    orderSummary += `Order Details:\n`;
    orderSummary += `Service: ${serviceType}\n`;
    orderSummary += `Phone: ${customerPhone}\n`;
    orderSummary += `Email: ${customerEmail}\n`;
    
    if (paperSize) orderSummary += `Paper Size: ${paperSize}\n`;
    if (printType) orderSummary += `Print Type: ${printType}\n`;
    if (copies) orderSummary += `Copies: ${copies}\n`;
    if (fileUpload.length > 0) {
        orderSummary += `Files attached: ${fileUpload.length} file(s)\n`;
        for (let i = 0; i < fileUpload.length; i++) {
            orderSummary += `  - ${fileUpload[i].name}\n`;
        }
    }
    if (notes) orderSummary += `Notes: ${notes}\n`;
    
    orderSummary += `\nWe will contact you shortly at ${customerPhone} or ${customerEmail} to confirm your order!`;
    
    alert(orderSummary);
    
    closeOrderModal();
    
    // Show success modal
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'flex';
}

// Selected files
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');
    
    if (fileInput && fileList) {
        fileInput.addEventListener('change', function() {
            fileList.innerHTML = '';
            
            if (this.files.length > 0) {
                fileList.innerHTML = '<strong>Selected files:</strong><br>';
                for (let i = 0; i < this.files.length; i++) {
                    const fileSize = (this.files[i].size / 1024 / 1024).toFixed(2);
                    fileList.innerHTML += `✓ ${this.files[i].name} (${fileSize} MB)<br>`;
                }
            }
        });
    }
});