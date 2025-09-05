# 🌤️ Smart Weather & Alert Dashboard

A modern, responsive weather dashboard that provides real-time weather information, 5-day forecasts, automated alerts, and interactive maps with city search suggestions.

## 🚀 Live Demo

Visit the live demo: [Weather Dashboard](https://your-username.github.io/smart-weather-dashboard)

## ✨ Features

### Core Features
- 🔍 **Smart City Search** - Type-ahead suggestions with popular cities
- 🌡️ **Current Weather** - Real-time temperature, humidity, wind speed, and conditions
- 📅 **5-Day Forecast** - Extended weather predictions
- 🚨 **Smart Alerts** - Automated weather warnings:
  - 🌧️ Rain alert → "Carry umbrella"
  - 🥵 Heat warning → "Stay hydrated" (>35°C)
  - 🌪️ Wind alert → "High winds warning" (>50 km/h)
- 🗺️ **Interactive Map** - Location visualization with Leaflet.js

### Advanced Features
- 🌙 **Dark/Light Theme** - Toggle between themes
- 📱 **Responsive Design** - Works on all devices
- 🏙️ **City Comparison** - Compare weather across multiple cities
- ⚡ **Fast Search** - Instant city suggestions as you type

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Maps**: Leaflet.js with OpenStreetMap
- **API**: OpenWeatherMap API
- **Storage**: LocalStorage for theme preferences
- **Design**: Custom CSS with animations and gradients

## � Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-weather-dashboard.git
cd smart-weather-dashboard
```

### 2. Get API Key
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Replace `YOUR_API_KEY` in `script.js` with your actual key:
```javascript
const apiKey = 'your_actual_api_key_here';
```

### 3. Run Locally
Simply open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"
```

## 📁 Project Structure

```
smart-weather-dashboard/
├── index.html          # Main HTML structure
├── style.css          # Styling and responsive design
├── script.js          # JavaScript functionality
├── README.md          # Project documentation
└── .gitignore         # Git ignore rules
```

## 🔧 Configuration

### API Key Setup
```javascript
// In script.js, line 2
const apiKey = 'your_openweathermap_api_key';
```

### Customization Options
- **Units**: Change between metric/imperial in `script.js`
- **City List**: Modify `popularCities` array for different suggestions
- **Theme Colors**: Update CSS variables in `style.css`
- **Alert Thresholds**: Adjust temperature/wind limits in `displayAlerts()`

## 🌐 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source: Deploy from branch `main`
4. Your site will be available at: `https://username.github.io/repository-name`

### Other Platforms
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **Firebase Hosting**: Use Firebase CLI

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🔒 Privacy & Security

- API key is exposed in frontend (for demo purposes)
- For production, consider using a backend proxy
- No personal data is stored or transmitted
- Only city names are cached locally for theme preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Leaflet.js](https://leafletjs.com/) for interactive maps
- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles
- Icons and emojis for enhanced UX

## � Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-username/smart-weather-dashboard/issues) page
2. Create a new issue with detailed description
3. Contact: your-email@example.com

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added dark theme and city comparison
- **v1.2.0** - Implemented search suggestions and improved UX

---

Made with ❤️ for weather enthusiasts worldwide 🌍