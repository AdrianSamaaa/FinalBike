# Bike Shop Manager

A simple, deployable bike shop management system built with vanilla HTML, CSS, and JavaScript.

## Features

- **Authentication System**: Role-based login (Admin/Employee)
- **Dashboard Overview**: Real-time stats and metrics
- **Sales & Inventory Management**: Track products and stock levels
- **Repair Management**: Monitor repair status and assignments
- **Customer Management**: Manage customer information
- **Appointment Scheduling**: Book and track appointments
- **Reports & Analytics**: Business insights (Admin only)
- **Responsive Design**: Works on desktop and mobile devices

## Login Credentials

### Admin Access
- **Email**: admin@bikeshop.com
- **Password**: admin123
- **Access**: Full system access including reports and admin settings

### Employee Access
- **Email**: employee@bikeshop.com
- **Password**: employee123
- **Access**: Limited access (no financial reports or admin settings)

## Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Login** using the credentials above

## Deployment

### Manual Deployment

Simply upload the entire project folder to any web server or hosting service:

- **GitHub Pages**: Enable in repository settings
- **Vercel**: Import repository and deploy
- **Any web server**: Upload files to public directory
- **Local server**: Run `python -m http.server 8080`

## Project Structure

```
bike-shop-manager/
├── index.html          # Main application file
├── css/
│   └── styles.css      # Complete styling
├── js/
│   └── app.js          # Application logic
└── README.md           # This file
```

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS variables and Grid/Flexbox
- **Vanilla JavaScript**: No frameworks required
- **Font Awesome**: Icon library
- **LocalStorage**: User session persistence

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Features Breakdown

### Authentication
- Role-based access control
- Session persistence
- Secure credential validation

### Dashboard
- Real-time statistics
- Interactive charts and graphs
- Recent activities feed
- Quick action buttons

### Management Modules
- **Sales**: Track sales performance and inventory
- **Repairs**: Monitor repair jobs and technician assignments
- **Customers**: Customer database and history
- **Appointments**: Scheduling and calendar management

### Admin Features
- User management
- System settings
- Financial reports
- Export functionality

## Customization

### Colors and Themes
Edit the CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #64748b;
    --accent-color: #10b981;
    /* ... more variables */
}
```

### Adding New Pages
1. Add new page content to `index.html`
2. Add navigation link to the sidebar
3. Update the JavaScript routing logic
4. Add corresponding CSS styles

## Security Notes

- This is a demo application with hardcoded credentials
- In production, implement proper backend authentication
- Add HTTPS for secure data transmission
- Implement proper input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the GitHub repository.

---

**© 2026 Bike Shop Manager. All rights reserved.**
