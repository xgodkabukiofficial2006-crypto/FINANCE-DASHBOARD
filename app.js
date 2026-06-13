// ===================================
// PREMIUM FINANCE DASHBOARD - APP.JS
// ===================================

// Chart.js Configuration
Chart.defaults.color = '#a0a0a0';
Chart.defaults.borderColor = '#1e3a5f';
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

// ===================================
// GENERATE MOCK DATA
// ===================================

function generateChartData(startPrice, volatility = 0.02) {
    const data = [];
    let price = startPrice;
    
    for (let i = 0; i < 30; i++) {
        const change = (Math.random() - 0.5) * startPrice * volatility;
        price += change;
        data.push(Math.max(price, startPrice * 0.8).toFixed(2));
    }
    
    return data;
}

function generateLabels() {
    const labels = [];
    const now = new Date();
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    return labels;
}

// ===================================
// STOCK CHARTS
// ===================================

const chartConfig = {
    type: 'line',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: 'rgba(0, 212, 255, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    color: '#a0a0a0',
                    callback: function(value) {
                        return '$' + value.toFixed(0);
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#a0a0a0',
                    maxRotation: 45,
                    minRotation: 0
                }
            }
        }
    }
};

// Stock Chart Data
const stocks = [
    { name: 'Apple', ticker: 'AAPL', startPrice: 185.32, element: 'appleChart', color: '#00d4ff' },
    { name: 'Microsoft', ticker: 'MSFT', startPrice: 428.67, element: 'msftChart', color: '#00d4ff' },
    { name: 'Tesla', ticker: 'TSLA', startPrice: 242.84, element: 'tslaChart', color: '#00d4ff' },
    { name: 'Alphabet', ticker: 'GOOGL', startPrice: 195.42, element: 'googChart', color: '#00d4ff' },
    { name: 'Amazon', ticker: 'AMZN', startPrice: 189.56, element: 'amznChart', color: '#00d4ff' },
    { name: 'Meta', ticker: 'META', startPrice: 516.23, element: 'metaChart', color: '#00d4ff' }
];

const labels = generateLabels();
let stockCharts = {};

stocks.forEach(stock => {
    const ctx = document.getElementById(stock.element);
    if (ctx) {
        const chartData = generateChartData(stock.startPrice);
        
        stockCharts[stock.ticker] = new Chart(ctx, {
            ...chartConfig,
            data: {
                labels: labels,
                datasets: [{
                    label: stock.name,
                    data: chartData,
                    borderColor: stock.color,
                    backgroundColor: 'rgba(0, 212, 255, 0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: stock.color,
                    pointBorderColor: '#16213e',
                    pointBorderWidth: 2
                }]
            }
        });
    }
});

// ===================================
// CRYPTO CHARTS
// ===================================

const cryptos = [
    { name: 'Bitcoin', ticker: 'BTC', startPrice: 67234, element: 'btcChart' },
    { name: 'Ethereum', ticker: 'ETH', startPrice: 3521, element: 'ethChart' },
    { name: 'Solana', ticker: 'SOL', startPrice: 178.45, element: 'solChart' },
    { name: 'Cardano', ticker: 'ADA', startPrice: 0.98, element: 'adaChart' },
    { name: 'Ripple', ticker: 'XRP', startPrice: 2.45, element: 'xrpChart' },
    { name: 'Polygon', ticker: 'MATIC', startPrice: 0.74, element: 'maticChart' }
];

let cryptoCharts = {};

cryptos.forEach(crypto => {
    const ctx = document.getElementById(crypto.element);
    if (ctx) {
        const chartData = generateChartData(crypto.startPrice, 0.03);
        
        cryptoCharts[crypto.ticker] = new Chart(ctx, {
            ...chartConfig,
            data: {
                labels: labels,
                datasets: [{
                    label: crypto.name,
                    data: chartData,
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#00d4ff',
                    pointBorderColor: '#16213e',
                    pointBorderWidth: 2
                }]
            }
        });
    }
});

// ===================================
// PORTFOLIO CHART
// ===================================

const portfolioCtx = document.getElementById('portfolioChart');
if (portfolioCtx) {
    new Chart(portfolioCtx, {
        type: 'doughnut',
        data: {
            labels: ['Stocks (60%)', 'Cryptocurrency (40%)'],
            datasets: [{
                data: [60, 40],
                backgroundColor: [
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(127, 90, 240, 0.8)'
                ],
                borderColor: ['#00d4ff', '#7f5af0'],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e0e0',
                        padding: 20,
                        font: {
                            size: 12,
                            weight: 600
                        }
                    }
                }
            }
        }
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stock cards, crypto cards, and stat boxes
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.stock-card, .crypto-card, .stat-box, .section-header');
    elementsToObserve.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================

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

// ===================================
// REAL-TIME DATA SIMULATION
// ===================================

function updateChartData() {
    // Update stock charts
    stocks.forEach(stock => {
        if (stockCharts[stock.ticker]) {
            const chart = stockCharts[stock.ticker];
            const lastValue = parseFloat(chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1]);
            const change = (Math.random() - 0.5) * stock.startPrice * 0.01;
            const newValue = Math.max(lastValue + change, stock.startPrice * 0.8).toFixed(2);
            
            chart.data.datasets[0].data.shift();
            chart.data.datasets[0].data.push(newValue);
            chart.data.labels.shift();
            chart.data.labels.push(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            chart.update('none');
        }
    });

    // Update crypto charts
    cryptos.forEach(crypto => {
        if (cryptoCharts[crypto.ticker]) {
            const chart = cryptoCharts[crypto.ticker];
            const lastValue = parseFloat(chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1]);
            const change = (Math.random() - 0.5) * crypto.startPrice * 0.015;
            const newValue = Math.max(lastValue + change, crypto.startPrice * 0.8).toFixed(2);
            
            chart.data.datasets[0].data.shift();
            chart.data.datasets[0].data.push(newValue);
            chart.data.labels.shift();
            chart.data.labels.push(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            chart.update('none');
        }
    });
}

// Update data every 5 seconds
setInterval(updateChartData, 5000);

// ===================================
// ALERT MANAGEMENT
// ===================================

const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const alertItem = this.closest('.alert-item');
        alertItem.style.animation = 'fade-in 0.3s ease-out reverse';
        setTimeout(() => {
            alertItem.remove();
        }, 300);
    });
});

// ===================================
// FORM SUBMISSION
// ===================================

const alertForm = document.querySelector('.alert-form form');
if (alertForm) {
    alertForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const assetSelect = document.getElementById('assetSelect');
        const alertType = document.getElementById('alertType');
        const alertValue = document.getElementById('alertValue');
        
        if (alertValue.value) {
            const activeAlerts = document.querySelector('.active-alerts');
            const newAlert = document.createElement('div');
            newAlert.className = 'alert-item';
            newAlert.innerHTML = `
                <div class="alert-content">
                    <p class="alert-title">${assetSelect.value} - ${alertType.value}</p>
                    <p class="alert-subtitle">Alert threshold: ${alertValue.value}</p>
                </div>
                <button class="delete-btn">✕</button>
            `;
            
            activeAlerts.appendChild(newAlert);
            
            // Add delete functionality to new alert
            newAlert.querySelector('.delete-btn').addEventListener('click', function() {
                newAlert.style.animation = 'fade-in 0.3s ease-out reverse';
                setTimeout(() => {
                    newAlert.remove();
                }, 300);
            });
            
            // Reset form
            alertForm.reset();
            
            // Show success message
            showNotification('Alert created successfully!');
        }
    });
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff, #7f5af0);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
        z-index: 2000;
        animation: slide-in 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slide-in 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// MOBILE MENU
// ===================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'rgba(10, 14, 39, 0.98)';
        navMenu.style.padding = '1rem';
        navMenu.style.gap = '1rem';
        navMenu.style.borderBottom = '1px solid #1e3a5f';
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    });
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================

window.addEventListener('load', () => {
    // Add staggered animation to summary cards
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach((card, index) => {
        card.style.animation = `slide-in 0.8s ease-out ${index * 0.2}s both`;
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Throttle scroll events
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

// Lazy load effect on scroll
const scrollHandler = throttle(() => {
    const elements = document.querySelectorAll('.stock-card, .crypto-card');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
}, 100);

window.addEventListener('scroll', scrollHandler);

// ===================================
// KEYBOARD SHORTCUTS
// ===================================

document.addEventListener('keydown', (e) => {
    // Press 'S' to scroll to stocks
    if (e.key === 's' || e.key === 'S') {
        document.getElementById('stocks')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'C' to scroll to crypto
    if (e.key === 'c' || e.key === 'C') {
        document.getElementById('crypto')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'P' to scroll to portfolio
    if (e.key === 'p' || e.key === 'P') {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    }
});

console.log('Premium Finance Dashboard loaded successfully!');
console.log('Press S for Stocks, C for Crypto, P for Portfolio');