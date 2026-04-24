// Bike Shop Manager Application
class BikeShopManager {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'overview';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e));
        });

        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    switchTab(e) {
        const tabBtn = e.target.closest('.tab-btn');
        const tabType = tabBtn.dataset.tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        tabBtn.classList.add('active');

        // Update credentials display
        document.querySelectorAll('.credentials-info').forEach(info => {
            info.classList.remove('active');
        });

        if (tabType === 'admin') {
            document.getElementById('admin-credentials').classList.add('active');
            document.getElementById('email').placeholder = 'admin@bikeshop.com';
        } else {
            document.getElementById('employee-credentials').classList.add('active');
            document.getElementById('email').placeholder = 'employee@bikeshop.com';
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        const loginBtn = e.target.querySelector('.login-btn');
        
        // Show loading state
        loginBtn.classList.add('loading');
        
        // Simulate authentication delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Authentication logic
        let authenticated = false;
        let userRole = null;
        let userName = '';
        
        if (activeTab === 'admin') {
            if (email === 'admin@bikeshop.com' && password === 'admin123') {
                authenticated = true;
                userRole = 'Admin';
                userName = 'Admin User (Owner)';
            }
        } else {
            if (email === 'employee@bikeshop.com' && password === 'employee123') {
                authenticated = true;
                userRole = 'Employee';
                userName = 'Mike Johnson';
            } else if (email === 'mechanic@bikeshop.com' && password === 'mechanic123') {
                authenticated = true;
                userRole = 'Employee';
                userName = 'Tom Anderson';
            }
        }
        
        loginBtn.classList.remove('loading');
        
        if (authenticated) {
            this.currentUser = {
                id: Date.now().toString(),
                name: userName,
                email: email,
                role: userRole
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showDashboard();
            this.showNotification(`Welcome back, ${userName}!`, 'success');
        } else {
            this.showNotification('Invalid credentials for selected role', 'error');
        }
    }

    showDashboard() {
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('dashboard-page').classList.add('active');
        
        // Update user info
        document.getElementById('user-name').textContent = this.currentUser.name;
        document.getElementById('user-role').textContent = this.currentUser.role;
        
        // Show/hide admin-only features
        const adminElements = document.querySelectorAll('.admin-only');
        if (this.currentUser.role === 'Admin') {
            adminElements.forEach(el => el.classList.add('show'));
        } else {
            adminElements.forEach(el => el.classList.remove('show'));
        }
        
        // Load overview page by default
        this.navigateToPage('overview');
    }

    handleNavigation(e) {
        e.preventDefault();
        const link = e.target.closest('.nav-link');
        const page = link.dataset.page;
        this.navigateToPage(page);
    }

    navigateToPage(page) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
        
        // Update page content
        document.querySelectorAll('.page-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${page}-content`).classList.add('active');
        
        // Update page title
        const titles = {
            overview: 'Overview',
            sales: 'Sales & Inventory',
            repairs: 'Repair Management',
            customers: 'Customer Management',
            appointments: 'Appointment Management',
            reports: 'Reports & Analytics',
            admin: 'Admin Settings'
        };
        document.getElementById('page-title').textContent = titles[page];
        
        this.currentPage = page;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        document.getElementById('dashboard-page').classList.remove('active');
        document.getElementById('login-page').classList.add('active');
        
        // Reset form
        document.getElementById('login-form').reset();
        
        this.showNotification('Logged out successfully', 'info');
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        }
    }

    updateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const timeString = now.toLocaleDateString('en-US', options);
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: '9999',
            minWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            animation: 'slideIn 0.3s ease-out'
        });
        
        // Set colors based on type
        const colors = {
            success: { bg: '#10b981', text: 'white' },
            error: { bg: '#ef4444', text: 'white' },
            warning: { bg: '#f59e0b', text: 'white' },
            info: { bg: '#3b82f6', text: 'white' }
        };
        
        const color = colors[type] || colors.info;
        notification.style.backgroundColor = color.bg;
        notification.style.color = color.text;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Data management methods
    getRepairs() {
        return [
            {
                id: 1,
                customer: 'John Smith',
                bikeModel: 'Trek Marlin 7',
                issue: 'Brake Adjustment',
                status: 'in-progress',
                dueDate: 'Today'
            },
            {
                id: 2,
                customer: 'Sarah Johnson',
                bikeModel: 'Giant Escape 3',
                issue: 'Tune-up',
                status: 'pending',
                dueDate: 'Tomorrow'
            },
            {
                id: 3,
                customer: 'Mike Davis',
                bikeModel: 'Specialized Allez',
                issue: 'Chain Replacement',
                status: 'completed',
                dueDate: 'Yesterday'
            }
        ];
    }

    getAppointments() {
        return [
            {
                id: 1,
                time: '9:00 AM',
                customer: 'Emily Chen',
                service: 'Annual Tune-up',
                status: 'confirmed'
            },
            {
                id: 2,
                time: '11:30 AM',
                customer: 'Robert Wilson',
                service: 'Brake Repair',
                status: 'confirmed'
            },
            {
                id: 3,
                time: '2:00 PM',
                customer: 'Lisa Thompson',
                service: 'Flat Tire Fix',
                status: 'pending'
            }
        ];
    }

    getInventory() {
        return [
            {
                id: 1,
                product: 'Trek Marlin 7',
                category: 'Mountain Bike',
                stock: 3,
                price: 899,
                status: 'low-stock'
            },
            {
                id: 2,
                product: 'Shimano Deore XT',
                category: 'Groupset',
                stock: 12,
                price: 450,
                status: 'in-stock'
            },
            {
                id: 3,
                product: 'Continental GP5000',
                category: 'Tires',
                stock: 45,
                price: 75,
                status: 'in-stock'
            }
        ];
    }

    getStats() {
        return {
            monthlyRevenue: 12450,
            activeRepairs: 47,
            totalCustomers: 234,
            todayAppointments: 18,
            itemsSold: 156,
            lowStockItems: 89
        };
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new BikeShopManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BikeShopManager;
}
