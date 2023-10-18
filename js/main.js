document.addEventListener("DOMContentLoaded", function () {
    // Function to toggle blog content visibility
    function toggleBlogContent(postNumber) {
        // Hide all blog content sections
        var blogContentSections = document.querySelectorAll(".blog-content");
        blogContentSections.forEach(function (section) {
            section.style.display = "none";
        });

        // Show the selected blog content section
        var selectedBlogContent = document.getElementById("blog-content-" + postNumber);
        if (selectedBlogContent) {
            selectedBlogContent.style.display = "block";
        }
    }

    // Event listener for service containers hover effect
    const serviceContainers = document.querySelectorAll(".service-container");

    serviceContainers.forEach(function (container) {
        container.addEventListener("mouseenter", function () {
            this.classList.add("hovered");
        });

        container.addEventListener("mouseleave", function () {
            this.classList.remove("hovered");
        });
    });

    // Function to load content from a file and insert it into a specified element
    function loadContent(file, elementId) {
        fetch(file)
            .then(response => response.text())
            .then(content => {
                document.getElementById(elementId).innerHTML = content;
            })
            .catch(error => {
                console.error("Error loading content:", error);
            });
    }

    // Load content for each section
    loadContent("/main/sections/header.html", "header");
    loadContent("/main/sections/hero.html", "hero");
    loadContent("/main/sections/aboutus.html", "aboutus");
    loadContent("/main/sections/services.html", "services");
    loadContent("/main/sections/blog.html", "blog");
    loadContent("/main/sections/gallery.html", "gallery");
    loadContent("/main/sections/contactus.html", "contactus");
    loadContent("/main/sections/footer.html", "footer");
    loadContent("/main/sections/estimating.html", "estimate");
    loadContent("/main/sections/signups.html", "signup");
});

var activePost = 1; // Track the active blog post
    
function toggleCarouselContent(postNumber) {
    if (postNumber !== activePost) {
        $('#carousel-content-' + activePost).slideUp();
        $('#carousel-content-' + postNumber).slideDown();
        activePost = postNumber;
    }
}

function toggleServiceDetails() {
    const pressureWashingSelected = document.getElementById("pressureWashing").checked;
    const houseCleaningSelected = document.getElementById("houseCleaning").checked;
    const bothServicesSelected = document.getElementById("bothServices").checked;

    const pressureWashingDetails = document.getElementById("pressureWashingDetails");
    const houseCleaningDetails = document.getElementById("houseCleaningDetails");

    if (pressureWashingSelected || bothServicesSelected) {
        pressureWashingDetails.style.display = "block";
    } else {
        pressureWashingDetails.style.display = "none";
    }

    if (houseCleaningSelected || bothServicesSelected) {
        houseCleaningDetails.style.display = "block";
    } else {
        houseCleaningDetails.style.display = "none";
    }
}

function calculateCost() {
    const pressureWashingSelected = document.getElementById("pressureWashing").checked;
    const houseCleaningSelected = document.getElementById("houseCleaning").checked;
    const bothServicesSelected = document.getElementById("bothServices").checked;
    const drivewayArea = parseInt(document.getElementById("driveway").value);
    const sidingArea = parseInt(document.getElementById("siding").value);
    const roofArea = parseInt(document.getElementById("roof").value);
    const fenceArea = parseInt(document.getElementById("fence").value);
    const patioArea = parseInt(document.getElementById("patio").value);
    const windowsCount = parseInt(document.getElementById("windows").value);
    const cleaningType = document.getElementById("cleaningType").value;
    const bedroomsCount = parseInt(document.getElementById("bedrooms").value);
    const bathroomsCount = parseInt(document.getElementById("bathrooms").value);

    const squareFootage = parseInt(document.getElementById("squareFootage").value);

    const drivewayCostPerSqFt = 0.1;
    const sidingCostPerSqFt = 0.12;
    const roofCostPerSqFt = 0.20;
    const fenceCostPerSqFt = 0.1;
    const patioCostPerSqFt = 0.1;
    const windowsCostPerWindow = 10;

    const regularCleaningCostPerSqFt = 0.01;
    const deepCleaningCostPerSqFt = 0.015;
    const moveInMoveOutCleaningCostPerSqFt = 0.02;

    const minimumRegularCleaningCost = 100;
    const minimumDeepCleaningCost = 150;
    const minimumMoveInMoveOutCleaningCost = 200;

    let pressureWashingCost = 0;
    if (pressureWashingSelected || bothServicesSelected) {
        if (!isNaN(drivewayArea) && drivewayArea > 0) {
            pressureWashingCost += drivewayArea * drivewayCostPerSqFt;
        }
        if (!isNaN(sidingArea) && sidingArea > 0) {
            pressureWashingCost += sidingArea * sidingCostPerSqFt;
        }
        if (!isNaN(roofArea) && roofArea > 0) {
            pressureWashingCost += roofArea * roofCostPerSqFt;
        }
        if (!isNaN(fenceArea) && fenceArea > 0) {
            pressureWashingCost += fenceArea * fenceCostPerSqFt;
        }
        if (!isNaN(patioArea) && patioArea > 0) {
            pressureWashingCost += patioArea * patioCostPerSqFt;
        }
        if (!isNaN(windowsCount) && windowsCount > 0) {
            pressureWashingCost += windowsCount * windowsCostPerWindow;
        }
    }

    let houseCleaningCost = 0;
    if (houseCleaningSelected || bothServicesSelected) {
        if (cleaningType === "RegularCleaning") {
            houseCleaningCost = squareFootage * regularCleaningCostPerSqFt;
            if (houseCleaningCost < minimumRegularCleaningCost) {
                houseCleaningCost = minimumRegularCleaningCost;
            }
        } else if (cleaningType === "DeepCleaning") {
            houseCleaningCost = squareFootage * deepCleaningCostPerSqFt;
            if (houseCleaningCost < minimumDeepCleaningCost) {
                houseCleaningCost = minimumDeepCleaningCost;
            }
        } else if (cleaningType === "MoveInMoveOutCleaning") {
            houseCleaningCost = squareFootage * moveInMoveOutCleaningCostPerSqFt;
            if (houseCleaningCost < minimumMoveInMoveOutCleaningCost) {
                houseCleaningCost = minimumMoveInMoveOutCleaningCost;
            }
        }
        if (!isNaN(bedroomsCount) && bedroomsCount > 0) {
            houseCleaningCost += bedroomsCount * 20;
        }
        if (!isNaN(bathroomsCount) && bathroomsCount > 0) {
            houseCleaningCost += bathroomsCount * 15;
        }
    }

    const bundlingSavings = (pressureWashingSelected && houseCleaningSelected) || bothServicesSelected ? pressureWashingCost * 0.10 : 0;
    const totalCost = pressureWashingCost + houseCleaningCost - bundlingSavings;

    const pressureWashingResultElement = document.getElementById("pressureWashingResult");
    const houseCleaningResultElement = document.getElementById("houseCleaningResult");
    const totalCostElement = document.getElementById("totalCost");
    const bundlingSavingsElement = document.getElementById("bundlingSavings");

    pressureWashingResultElement.textContent = "Pressure Washing Cost: $" + pressureWashingCost.toFixed(2);
    houseCleaningResultElement.textContent = "House Cleaning Cost: $" + houseCleaningCost.toFixed(2);
    bundlingSavingsElement.textContent = "Bundling Savings (10% discount): $" + bundlingSavings.toFixed(2);
    totalCostElement.textContent = "Total Cost: $" + totalCost.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phoneNumber = document.getElementById('phoneNumber').value;

        // Client-side validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const phoneRegex = /^\d{10}$/;

        if (!emailRegex.test(email)) {
            alert('Invalid email format');
            return;
        }

        if (!passwordRegex.test(password)) {
            alert('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit');
            return;
        }

        if (!phoneRegex.test(phoneNumber)) {
            alert('Invalid phone number format (e.g., 1234567890)');
            return;
        }

        // If all validation passes, submit the form
        signupForm.submit();
    });
});
