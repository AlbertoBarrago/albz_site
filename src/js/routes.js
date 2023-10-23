const home = `
 <div id="albz-wrapper">
     <albz-fold  title="alBz"
                     subtitle="A bug a day keeps the doctor away"
                     description="Welcome to my space, be nice ☺️"
                     linkedin-user="albertobarrago"
                     github-user="AlbertoBarrago"
     ></albz-fold>
     <albz-footer copyright="💀"
                  description="alBz's footer">
     </albz-footer>
 </div>
`;

const about = `
    Ciao sono la pagina about
`;

const pages = {
  home,
  about,
};

/**
 * @description This variable represents different routes and their corresponding functions.
 * @type {Object}
 * @property {Function} '/' Renders the home page.
 * @property {Function} '/about' Renders the about page.
 */
const routes = {
  '/': () => {
    // Render the home page
    const appContainer = document.querySelector('#app');
    appContainer.innerHTML = pages.home;
  },
  '/about': () => {
    const appContainer = document.querySelector('#app');
    appContainer.innerHTML = pages.about;
  },
};

/**
 * Handle the base path for a given path.
 *
 * @param {string} path - The path to handle.
 * @return {string} - The updated path.
 */
function handleBasePath(path) {
  console.log('path: ' + path);
  if (path.includes('/albz/dist/index.html')) {
    return path.replace('/albz/dist/index.html', '/');
  }
  console.log('path-revised', path);
  return path.replace('/albz/dist', '');
}

/**
 * Handles routing based on the current path.
 *
 * @returns {void}
 */
function router() {
  let path = handleBasePath(window.location.pathname);
  const routeHandler = routes[path] || notFound;

  routeHandler();
}

/**
 * Displays a "Page not found" message in the app container.
 *
 * @return {void}
 */
function notFound() {
  const appContainer = document.querySelector('#app');
  appContainer.innerHTML = '<p>Page not found</p>';
}

(function initRoute() {
  document.addEventListener('DOMContentLoaded', router);
})();
