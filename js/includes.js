/* ========================================
   HTML INCLUDES LOADER
   Load navbar and footer from external files
   ======================================== */

// Start fetching immediately (Prefetch) to minimize loading delay
const navbarFetch = fetch("includes/navbar.html").then((res) => res.text());
const footerFetch = fetch("includes/footer.html").then((res) => res.text());

// Function to load HTML includes into the DOM
function loadIncludes() {
  // Load Navbar
  navbarFetch
    .then((data) => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) {
        placeholder.innerHTML = data;
        // Remove skeleton styling after load to avoid double backdrop-filter
        placeholder.style.background = "transparent";
        placeholder.style.backdropFilter = "none";
        placeholder.style.boxShadow = "none";
        placeholder.style.height = "auto";
      }
      
      // Set active menu after navbar is loaded
      setActiveMenu();
      // Initialize navigation after navbar is loaded
      if (typeof NavigationModule !== "undefined") {
        NavigationModule.init();
      }
    })
    .catch((error) => console.error("Error loading navbar:", error));

  // Load Footer
  footerFetch
    .then((data) => {
      const placeholder = document.getElementById("footer-placeholder");
      if (placeholder) {
        placeholder.innerHTML = data;
      }
      // Initialize scroll to top button after footer is loaded
      if (typeof ScrollToTopModule !== "undefined") {
        ScrollToTopModule.init();
      }
    })
    .catch((error) => console.error("Error loading footer:", error));
}

// Function to set active menu based on current page
function setActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const menuLinks = document.querySelectorAll(".nav-menu a");

  menuLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// Load includes when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadIncludes);
} else {
  loadIncludes();
}

