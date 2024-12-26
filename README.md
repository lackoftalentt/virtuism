# Virtuism 🎥  
A modern and sleek platform to explore movies and TV shows, built to provide a smooth user experience with pagination, search functionality, and dynamic content updates.  

Check it out here: [Virtuism Live](https://lackoftalentt.github.io/virtuism/)  

---

## 🛠️ Technologies Used  
- **React**: For building dynamic and reusable components.  
- **Redux Toolkit**: To manage the application state efficiently, including pagination and active categories.
- **RTK Query**: For fetching and caching data from the TMDB API with minimal boilerplate code.    
- **TypeScript**: For strong typing and ensuring code reliability.  
- **React Router**: For implementing seamless navigation between pages.  
- **Firebase**: Used to handle comments under movies.  
- **TMDB API**: To fetch and display real-time data about movies and TV shows.  
- **CSS Modules**: To create modular, maintainable, and scoped styles.  
- **React Toastify**: For beautiful and responsive notifications.  

---

## 🌟 Key Features  
1. **Pagination and Category State**  
   - Each category has its own pagination state, allowing users to pick up right where they left off when switching categories.  
   - Active page states are managed using Redux Toolkit, ensuring consistent behavior across the app.  

2. **Dynamic Movie and TV Show Details**  
   - Using `useParams` from React Router, the app fetches and displays detailed information about movies or TV shows dynamically without storing extra data in Redux.  

3. **Search Functionality**  
   - Integrated with the TMDB API to allow users to search for their favorite movies or TV shows.  

4. **Favorite Movies**  
   - Favorites are managed with local state, keeping things simple and lightweight.  

5. **Comment Section**  
   - Users can leave comments on movie pages, powered by Firebase.  
 

---

## 🚀 How to Run Locally  
1. Clone the repository:  
   ```bash
   git clone https://github.com/lackoftalentt/virtuism.git
   cd virtuism
