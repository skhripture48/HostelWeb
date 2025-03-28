document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle (for all pages)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Login state management
    const loginLink = document.querySelector('.login-link');
    const logoutLink = document.querySelector('.logout-link');
    const viewBookingLink = document.querySelector('.view-booking-link');
    const isLoggedIn = () => localStorage.getItem('isLoggedIn') === 'true';
    const hasBooking = () => localStorage.getItem('lastBooking') !== null;

    // Debug: Log the state of isLoggedIn and hasBooking
    console.log('isLoggedIn:', isLoggedIn());
    console.log('hasBooking:', hasBooking());

    // Show/hide login link based on login state
    if (loginLink) {
        if (isLoggedIn()) {
            loginLink.style.display = 'none';
        } else {
            loginLink.style.display = 'block';
        }
    }

    // Show/hide logout link based on login state
    if (logoutLink) {
        if (isLoggedIn()) {
            logoutLink.style.display = 'block';
        } else {
            logoutLink.style.display = 'none';
        }
    }

    // Show/hide view booking link based on login state and booking status
    if (viewBookingLink) {
        if (isLoggedIn() && hasBooking()) {
            console.log('Showing View Booking Slip link');
            viewBookingLink.style.display = 'block';
        } else {
            console.log('Hiding View Booking Slip link');
            viewBookingLink.style.display = 'none';
        }
    }

    // Handle logout
    const logoutButton = document.querySelector('#logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            // Optionally, keep the booking data in localStorage even after logout
            window.location.href = 'index.html';
        });
    }

    // Login form submission (for login.html)
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');

            // Hardcoded credentials for demo (replace with back-end authentication in production)
            if (username === 'student' && password === 'password123') {
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password. Please try again.');
            }
        });
    }

    // Slideshow functionality (for index.html)
    const slideshow = document.querySelector('.hero-slideshow');
    if (slideshow) {
        const images = [
            'https://blog.getrooms.co/wp-content/uploads/2019/04/wagyingo-hostel-3.jpg', // Hostel 1
            'https://lh3.googleusercontent.com/p/AF1QipP6fq2ByhXtjou6KoZw-80kaLPiSSf_5gAyfAgy=s1360-w1360-h1020', // Hostel 2
            'https://lh3.googleusercontent.com/p/AF1QipPKgcEyjxP9mEzFmmukO3WVcWC91tFhiWLXasZi=s1360-w1360-h1020'  // Hostel 3
        ];

        // Dynamically create slides
        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.style.backgroundImage = `url(${image})`;
            if (index === 0) slide.classList.add('active'); // Make the first slide active
            slideshow.appendChild(slide);
        });

        // Cycle through slides every 3 seconds
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        function showNextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
            slides[currentSlide].classList.add('active');
        }

        setInterval(showNextSlide, 3000); // Change slide every 3 seconds
    }

    // Search bar dropdown functionality (for index.html)
    const searchButton = document.querySelector('.search-button');
    const hostelDropdown = document.querySelector('#hostel-dropdown');
    const hostelOptions = document.querySelectorAll('.hostel-option');
    const searchInput = document.querySelector('.search-bar input');

    if (searchInput && hostelDropdown) {
        // Show dropdown when user starts typing
        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim().length > 0) {
                hostelDropdown.classList.add('active'); // Show dropdown if input is not empty
            } else {
                hostelDropdown.classList.remove('active'); // Hide dropdown if input is empty
            }
        });

        // Handle search button click to redirect to a new page
        searchButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            const searchQuery = searchInput.value.trim().toLowerCase();
            
            // Map the search query to the corresponding hostel page
            let redirectPage = '';
            if (searchQuery === 'wagyingo main hostel') {
                redirectPage = 'wagyingo-main.html';
            } else if (searchQuery === 'wagyingo onyx hostel') {
                redirectPage = 'wagyingo-onyx.html';
            } else if (searchQuery === 'wagyingo opal hostel') {
                redirectPage = 'wagyingo-opal.html';
            } else {
                alert('Please select a valid hostel from the dropdown.');
                return;
            }

            // Redirect to the corresponding page
            window.location.href = redirectPage;
        });

        // Handle hostel selection (mouse click)
        hostelOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedHostel = option.getAttribute('data-value');
                const hostelName = option.textContent; // Get the text content (e.g., "Wagyingo Main Hostel")
                searchInput.value = hostelName; // Fill the search input with the selected hostel name
                console.log('Selected Hostel:', selectedHostel);
                console.log('Search Query:', hostelName);
                hostelDropdown.classList.remove('active'); // Hide dropdown after selection
                searchInput.focus(); // Return focus to the input after selection
            });
        });

        // Keyboard navigation for accessibility
        let focusedOptionIndex = -1;

        searchInput.addEventListener('keydown', (e) => {
            if (!hostelDropdown.classList.contains('active')) return; // Only handle if dropdown is visible

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                focusedOptionIndex = (focusedOptionIndex + 1) % hostelOptions.length; // Move down
                hostelOptions[focusedOptionIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                focusedOptionIndex = (focusedOptionIndex - 1 + hostelOptions.length) % hostelOptions.length; // Move up
                hostelOptions[focusedOptionIndex].focus();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (focusedOptionIndex >= 0) {
                    hostelOptions[focusedOptionIndex].click(); // Trigger click on the focused option
                }
            } else if (e.key === 'Escape') {
                hostelDropdown.classList.remove('active'); // Hide dropdown on Escape
                focusedOptionIndex = -1; // Reset focus index
                searchInput.focus(); // Return focus to the input
            }
        });

        // Update focusedOptionIndex when an option is focused
        hostelOptions.forEach((option, index) => {
            option.addEventListener('focus', () => {
                focusedOptionIndex = index;
            });
        });

        // Close dropdown if clicking outside
        document.addEventListener('click', (e) => {
            if (!hostelDropdown.contains(e.target) && !searchInput.contains(e.target) && !searchButton.contains(e.target)) {
                hostelDropdown.classList.remove('active');
                focusedOptionIndex = -1; // Reset focus index
            }
        });
    }

    // Room search handling (for hostel pages)
    const searchForms = [
        { form: document.querySelector('#search-form-main'), hostel: 'wagyingo-main', roomList: document.querySelector('#room-list-main'), availableRoomsSection: document.querySelector('#available-rooms-main') },
        { form: document.querySelector('#search-form-onyx'), hostel: 'wagyingo-onyx', roomList: document.querySelector('#room-list-onyx'), availableRoomsSection: document.querySelector('#available-rooms-onyx') },
        { form: document.querySelector('#search-form-opal'), hostel: 'wagyingo-opal', roomList: document.querySelector('#room-list-opal'), availableRoomsSection: document.querySelector('#available-rooms-opal') }
    ];

    searchForms.forEach(({ form, hostel, roomList, availableRoomsSection }) => {
        if (form) {
            const searchButton = form.querySelector('.search-rooms');
            if (searchButton) {
                searchButton.addEventListener('click', async () => {
                    // Check if user is logged in
                    if (!isLoggedIn()) {
                        alert('Please login to search for rooms.');
                        window.location.href = 'login.html';
                        return;
                    }

                    // Get form data
                    const formData = new FormData(form);
                    const roomType = formData.get('room-type');

                    // Validate form input
                    if (!roomType) {
                        alert('Please select a room type.');
                        return;
                    }

                    try {
                        // Fetch available rooms from the backend
                        const response = await fetch(`http://localhost:5000/api/rooms/available?hostel=${hostel}&roomType=${roomType}`);
                        const availableRooms = await response.json();

                        if (!response.ok) {
                            throw new Error(availableRooms.error || 'Error fetching available rooms');
                        }

                        // Display available rooms
                        roomList.innerHTML = '';
                        if (availableRooms.length === 0) {
                            roomList.innerHTML = '<li class="no-rooms">No rooms available for this type.</li>';
                        } else {
                            availableRooms.forEach(room => {
                                const li = document.createElement('li');
                                li.classList.add('room-card');
                                li.innerHTML = `
                                    <h4>${room.roomId}</h4>
                                    <p class="room-type">${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</p>
                                    <p class="room-price">$${room.price} per night</p>
                                    <button class="cta-button book-now" data-room-id="${room.roomId}" data-hostel="${room.hostel}" data-type="${room.type}" data-price="${room.price}">Book Now</button>
                                `;
                                roomList.appendChild(li);
                            });

                            // Add event listeners to "Book Now" buttons
                            const bookNowButtons = roomList.querySelectorAll('.book-now');
                            bookNowButtons.forEach(button => {
                                button.addEventListener('click', () => {
                                    const roomId = button.getAttribute('data-room-id');
                                    const hostel = button.getAttribute('data-hostel');
                                    const type = button.getAttribute('data-type');
                                    const price = button.getAttribute('data-price');
                                    // Redirect to booking.html with room details as query parameters
                                    window.location.href = `booking.html?roomId=${roomId}&hostel=${hostel}&type=${type}&price=${price}`;
                                });
                            });
                        }
                        availableRoomsSection.style.display = 'block';
                    } catch (err) {
                        alert(err.message);
                    }
                });
            }
        }
    });

    // Booking form handling (for booking.html)
    const bookingForm = document.querySelector('#booking-form');
    if (bookingForm) {
        // Populate room details from query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('roomId') || 'Unknown';
        const hostel = urlParams.get('hostel') || 'Unknown';
        const type = urlParams.get('type') || 'Unknown';
        const price = urlParams.get('price') || '0.00';

        // Display room details with fallback values
        const hostelNameElement = document.querySelector('#hostel-name');
        const roomIdElement = document.querySelector('#room-id');
        const roomTypeElement = document.querySelector('#room-type');
        const roomPriceElement = document.querySelector('#room-price');

        if (hostelNameElement) {
            hostelNameElement.textContent = hostel ? hostel.replace('wagyingo-', '').replace('-', ' ').toUpperCase() : 'Unknown Hostel';
        }
        if (roomIdElement) {
            roomIdElement.textContent = roomId;
        }
        if (roomTypeElement) {
            roomTypeElement.textContent = type ? type.charAt(0).toUpperCase() + type.slice(1) + ' Room' : 'Unknown Type';
        }
        if (roomPriceElement) {
            roomPriceElement.textContent = `$${price}`;
        }

        // Handle form submission
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Check if user is logged in
            if (!isLoggedIn()) {
                alert('Please login to book a room.');
                window.location.href = 'login.html';
                return;
            }

            // Validate room details before submitting
            if (!roomId || !hostel || !type || !price || roomId === 'Unknown' || hostel === 'Unknown' || type === 'Unknown') {
                alert('Invalid room details. Please select a room again.');
                window.location.href = 'index.html';
                return;
            }

            const formData = new FormData(bookingForm);
            const bookingData = {
                roomId: roomId,
                hostel: hostel,
                bookedByName: formData.get('full-name'), // Changed from fullName to bookedByName
                academicLevel: formData.get('academic-level'),
                program: formData.get('program'),
                phone: formData.get('phone'),
                nationality: formData.get('nationality'),
                gender: formData.get('gender'),
                guardianName: formData.get('guardian-name'),
                relationship: formData.get('relationship'),
                guardianPhone: formData.get('guardian-phone'),
            };

            try {
                const response = await fetch('http://localhost:5000/api/rooms/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Error booking room');
                }

                // Store booking details in localStorage
                const bookingDetails = {
                    roomId: roomId,
                    hostel: hostel,
                    type: type,
                    price: price,
                    bookedByName: bookingData.bookedByName, // Changed from fullName to bookedByName
                    academicLevel: bookingData.academicLevel,
                    program: bookingData.program,
                    phone: bookingData.phone,
                    nationality: bookingData.nationality,
                    gender: bookingData.gender,
                    guardianName: bookingData.guardianName,
                    relationship: bookingData.relationship,
                    guardianPhone: bookingData.guardianPhone,
                };
                localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));
                console.log('Booking stored in localStorage:', bookingDetails);

                alert(`Room ${roomId} booked successfully!`);
                // Redirect to confirmation.html with all booking details as query parameters
                const queryParams = new URLSearchParams(bookingDetails).toString();
                window.location.href = `confirmation.html?${queryParams}`;
            } catch (err) {
                alert(err.message);
            }
        });
    }

    // Confirmation page handling (for confirmation.html)
    const confirmationDetails = document.querySelector('#confirmation-details');
    if (confirmationDetails) {
        // Check if user is logged in
        if (!isLoggedIn()) {
            alert('Please login to view your booking confirmation.');
            window.location.href = 'login.html';
            return;
        }

        // Try to get booking details from query parameters first
        const urlParams = new URLSearchParams(window.location.search);
        let roomId = urlParams.get('roomId') || 'Unknown';
        let hostel = urlParams.get('hostel') || 'Unknown';
        let type = urlParams.get('type') || 'Unknown';
        let price = urlParams.get('price') || '0.00';
        let bookedByName = urlParams.get('bookedByName') || 'Unknown'; // Changed from fullName to bookedByName
        let academicLevel = urlParams.get('academicLevel') || 'Unknown';
        let program = urlParams.get('program') || 'Unknown';
        let phone = urlParams.get('phone') || 'Unknown';
        let nationality = urlParams.get('nationality') || 'Unknown';
        let gender = urlParams.get('gender') || 'Unknown';
        let guardianName = urlParams.get('guardianName') || 'Unknown';
        let relationship = urlParams.get('relationship') || 'Unknown';
        let guardianPhone = urlParams.get('guardianPhone') || 'Unknown';

        // If query parameters are not available, try to get details from localStorage
        if (roomId === 'Unknown' && hostel === 'Unknown') {
            const lastBooking = localStorage.getItem('lastBooking');
            if (lastBooking) {
                const bookingDetails = JSON.parse(lastBooking);
                roomId = bookingDetails.roomId || 'Unknown';
                hostel = bookingDetails.hostel || 'Unknown';
                type = bookingDetails.type || 'Unknown';
                price = bookingDetails.price || '0.00';
                bookedByName = bookingDetails.bookedByName || 'Unknown'; // Changed from fullName to bookedByName
                academicLevel = bookingDetails.academicLevel || 'Unknown';
                program = bookingDetails.program || 'Unknown';
                phone = bookingDetails.phone || 'Unknown';
                nationality = bookingDetails.nationality || 'Unknown';
                gender = bookingDetails.gender || 'Unknown';
                guardianName = bookingDetails.guardianName || 'Unknown';
                relationship = bookingDetails.relationship || 'Unknown';
                guardianPhone = bookingDetails.guardianPhone || 'Unknown';
            } else {
                // No booking details available
                alert('No booking found. Please book a room to view your confirmation.');
                window.location.href = 'index.html';
                return;
            }
        }

        // Store the current booking details in a variable for use in the edit button
        const currentBookingDetails = {
            roomId,
            hostel,
            type,
            price,
            bookedByName, // Changed from fullName to bookedByName
            academicLevel,
            program,
            phone,
            nationality,
            gender,
            guardianName,
            relationship,
            guardianPhone,
        };

        // Display booking details on the page
        document.querySelector('#hostel-name').textContent = hostel ? hostel.replace('wagyingo-', '').replace('-', ' ').toUpperCase() : 'Unknown Hostel';
        document.querySelector('#room-id').textContent = roomId;
        document.querySelector('#room-type').textContent = type ? type.charAt(0).toUpperCase() + type.slice(1) + ' Room' : 'Unknown Type';
        document.querySelector('#room-price').textContent = `$${price}`;
        document.querySelector('#full-name').textContent = bookedByName; // Changed from fullName to bookedByName
        document.querySelector('#academic-level').textContent = academicLevel ? academicLevel.replace('level ', 'Level ').replace('masters student', 'Masters Student').replace('service personnel', 'Service Personnel') : 'Unknown';
        document.querySelector('#program').textContent = program;
        document.querySelector('#phone').textContent = phone;
        document.querySelector('#nationality').textContent = nationality;
        document.querySelector('#gender').textContent = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : 'Unknown';
        document.querySelector('#guardian-name').textContent = guardianName;
        document.querySelector('#relationship').textContent = relationship;
        document.querySelector('#guardian-phone').textContent = guardianPhone;

        // Handle "Edit Booking" button click
        const editBookingButton = document.querySelector('#edit-booking');
        if (editBookingButton) {
            editBookingButton.addEventListener('click', () => {
                // Redirect to edit-booking.html with the current booking details as query parameters
                const queryParams = new URLSearchParams(currentBookingDetails).toString();
                window.location.href = `edit-booking.html?${queryParams}`;
            });
        }

        // Handle PDF generation
        const printButton = document.querySelector('#print-pdf');
        if (printButton) {
            printButton.addEventListener('click', () => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Set font to Times for a professional look
                doc.setFont("times", "normal");

                // Add Watermark (on every page)
                const addWatermark = () => {
                    doc.setTextColor(200, 200, 200); // Light gray color for watermark
                    doc.setFontSize(40); // Reduced size to be less intrusive
                    doc.setFont("times", "italic");
                    doc.text("Wagyingo Hostel", 105, 200, { align: "center", angle: 45 }); // Moved lower to avoid overlap with tables
                    doc.setTextColor(0, 0, 0); // Reset text color
                    doc.setFont("times", "normal");
                };

                // Add watermark to the first page
                addWatermark();

                // Enhanced Header Section with Logo
                // Load the logo image
                const logoUrl = '/images/logo.png'; // Path to the logo
                const logoWidth = 30; // Width in mm
                const logoHeight = 10; // Height in mm
                const pageWidth = doc.internal.pageSize.getWidth(); // Get page width (210mm for A4)
                const logoX = (pageWidth - logoWidth) / 10; // Center the logo horizontally
                const logoY = 10; // Position at the top with some margin

                // Add the logo to the PDF
                try {
                    doc.addImage(logoUrl, 'PNG', logoX, logoY, logoWidth, logoHeight);
                } catch (error) {
                    console.error('Error loading logo:', error);
                    // Fallback: Add placeholder text if the logo fails to load
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100); // Gray color for placeholder text
                    doc.text("[Failed to Load Logo]", 105, logoY + 15, { align: "center" });
                    doc.setTextColor(0, 0, 0); // Reset text color
                }

                // Hostel Name (Bold and Larger, adjusted for logo)
                doc.setFontSize(22); // Slightly larger for prominence
                doc.setFont("times", "bold"); // Bold for emphasis
                doc.setTextColor(26, 60, 52); //rgb(244, 52, 9) (hostel primary color)
                doc.text("WAGYINGO HOSTEL", 105, logoY + logoHeight + 10, { align: "center" });

                // Subheader (Contact Details, adjusted for logo)
                doc.setFontSize(11); // Slightly smaller for hierarchy
                doc.setFont("times", "normal"); // Normal style for subheader
                doc.setTextColor(0, 0, 0);
                doc.text("KNUST Ayeduase", 105, logoY + logoHeight + 20, { align: "center" });
                doc.text("Phone: 0203652247", 105, logoY + logoHeight + 28, { align: "center" });
                doc.text("Email: students.wagyingo@gmail.com", 105, logoY + logoHeight + 36, { align: "center" });

                // Horizontal Line to Separate Header (adjusted for logo)
                const lineY = logoY + logoHeight + 42; // Position below the contact details
                doc.setLineWidth(0.5);
                doc.setDrawColor(26, 60, 52); // Match hostel primary color
                doc.line(20, lineY, 190, lineY); // Horizontal line from x=20 to x=190
                doc.setDrawColor(0, 0, 0); // Reset draw color

                // Account Details (in a Table, adjusted for logo)
                doc.setFontSize(10);
                doc.autoTable({
                    startY: lineY + 6, // Start below the horizontal line
                    head: [['Account Details', '']],
                    body: [
                        ['Account Number:', '1441004849656'],
                        ['Account Name:', 'Wagyingo Hostel'],
                        ['Bank:', 'ECOBANK(GH) Kantamanto Branch'],
                    ],
                    theme: 'plain', // No borders for a cleaner look
                    headStyles: { 
                        fillColor: [26, 60, 52], 
                        textColor: [255, 255, 255], 
                        fontSize: 10, 
                        fontStyle: 'bold', 
                        halign: 'left' 
                    },
                    bodyStyles: { 
                        font: "times", 
                        fontSize: 10, 
                        textColor: [0, 0, 0], 
                        halign: 'left', 
                        cellPadding: 1 
                    },
                    columnStyles: { 
                        0: { cellWidth: 40, fontStyle: 'normal', textColor: [0, 0, 0] }, // Label column (not bold, black text)
                        1: { cellWidth: 130, fontStyle: 'bold', textColor: [0, 0, 0] }  // Value column (bold, black text)
                    },
                    margin: { left: 20 }, // Align with the left margin
                });

                // Date (Aligned to the Right, adjusted for logo)
                const currentDate = new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }); // Format: DD Month YYYY (e.g., 27 March 2025)
                doc.setFontSize(10);
                doc.text(`Date: ${currentDate}`, 190, lineY + 6, { align: "right" });

                // Student Details Section
                let finalY = doc.lastAutoTable.finalY + 10;
                doc.setFontSize(14);
                doc.setTextColor(26, 60, 52);
                doc.text("STUDENT DETAILS", 20, finalY);
                doc.setTextColor(0, 0, 0);
                doc.autoTable({
                    startY: finalY + 5,
                    head: [['Field', 'Details']],
                    body: [
                        ['Name', bookedByName], // Changed from fullName to bookedByName
                        ['Programme', program],
                        ['Academic Level', academicLevel.replace('level ', 'Level ').replace('masters student', 'Masters Student').replace('service personnel', 'Service Personnel')],
                        ['Phone Number', phone],
                    ],
                    theme: 'striped',
                    headStyles: { 
                        fillColor: [26, 60, 52], 
                        textColor: [255, 255, 255],
                        fontSize: 10,
                        fontStyle: 'bold'
                    },
                    styles: { 
                        font: "times", 
                        fontSize: 10, 
                        cellPadding: 2 
                    },
                    columnStyles: { 
                        0: { cellWidth: 60, fontStyle: 'normal' }, // Field column (not bold)
                        1: { cellWidth: 110, fontStyle: 'bold' }  // Details column (bold)
                    },
                    tableLineColor: [0, 0, 0], // Black border
                    tableLineWidth: 0.1, // Thin border
                });

                // Booking Details Section
                finalY = doc.lastAutoTable.finalY + 10;
                doc.setFontSize(14);
                doc.setTextColor(26, 60, 52);
                doc.text("BOOKING DETAILS", 20, finalY);
                doc.setTextColor(0, 0, 0);
                doc.autoTable({
                    startY: finalY + 5,
                    head: [['Field', 'Details']],
                    body: [
                        ['Room Booked', `${hostel.replace('wagyingo-', '').replace('-', ' ').toUpperCase()} ${roomId}`],
                        ['Date Booked', currentDate],
                        ['Price', `GHS${parseFloat(price).toFixed(2)}`],
                    ],
                    theme: 'striped',
                    headStyles: { 
                        fillColor: [26, 60, 52], 
                        textColor: [255, 255, 255],
                        fontSize: 10,
                        fontStyle: 'bold'
                    },
                    styles: { 
                        font: "times", 
                        fontSize: 10, 
                        cellPadding: 2 
                    },
                    columnStyles: { 
                        0: { cellWidth: 60, fontStyle: 'normal' }, // Field column (not bold)
                        1: { cellWidth: 110, fontStyle: 'bold' }  // Details column (bold)
                    },
                    tableLineColor: [0, 0, 0], // Black border
                    tableLineWidth: 0.1, // Thin border
                });

                // Guardian Details Section
                finalY = doc.lastAutoTable.finalY + 10;
                doc.setFontSize(14);
                doc.setTextColor(26, 60, 52);
                doc.text("GUARDIAN DETAILS", 20, finalY);
                doc.setTextColor(0, 0, 0);
                doc.autoTable({
                    startY: finalY + 5,
                    head: [['Field', 'Details']],
                    body: [
                        ['Guardian Name', guardianName],
                        ['Relationship', relationship],
                        ['Guardian Phone Number', guardianPhone],
                        ['Guardian Email', 'N/A'], // Email not provided in form, set as N/A
                    ],
                    theme: 'striped',
                    headStyles: { 
                        fillColor: [26, 60, 52], 
                        textColor: [255, 255, 255],
                        fontSize: 10,
                        fontStyle: 'bold'
                    },
                    styles: { 
                        font: "times", 
                        fontSize: 10, 
                        cellPadding: 2 
                    },
                    columnStyles: { 
                        0: { cellWidth: 60, fontStyle: 'normal' }, // Field column (not bold)
                        1: { cellWidth: 110, fontStyle: 'bold' }  // Details column (bold)
                    },
                    tableLineColor: [0, 0, 0], // Black border
                    tableLineWidth: 0.1, // Thin border
                });

                // Contractual Agreement Section (Start on a New Page)
                doc.addPage(); // Force a new page
                addWatermark(); // Add watermark to the new page
                finalY = 20; // Reset Y position to the top of the new page
                doc.setFontSize(14);
                doc.setTextColor(26, 60, 52);
                doc.text("CONTRACTUAL AGREEMENT BETWEEN RESIDENTS/STUDENTS AND WAGYINGO HOSTEL", 20, finalY, { maxWidth: 170 });
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(10);
                doc.setFont("times", "normal"); // Explicitly set font to normal to avoid bold
                const agreementText = [
                    "1. Admission to hostel is offered for an academic year and is subject to renewal every academic year.",
                    "2. Only full payment of fees would be made before students are admitted into residence.",
                    "3. Full fees are not refundable after 24 hours of occupancy.",
                    "4. Students are provided with contractual forms to be signed by both parties.",
                    "5. Places offered are not transferrable and not allowed for perching.",
                    "6. Students are expected to quit their rooms one week after the end of the academic year."
                ];
                finalY += 10;
                let lineCounter = 0;
                agreementText.forEach((line, index) => {
                    const splitText = doc.splitTextToSize(line, 170); // Split text to fit within maxWidth
                    splitText.forEach((textLine, textIndex) => {
                        if (finalY + (lineCounter * 6) > 270) {
                            doc.addPage();
                            addWatermark();
                            finalY = 20;
                            lineCounter = 0;
                        }
                        doc.text(textLine, 20, finalY + (lineCounter * 6));
                        lineCounter++;
                    });
                });
                finalY = finalY + (lineCounter * 6); // Update finalY based on total lines

                // Check if we need a new page for the regulations
                finalY += 10;
                if (finalY > 250) {
                    doc.addPage();
                    addWatermark(); // Add watermark to the new page
                    finalY = 20;
                }

                // Hostel Regulations Section
                doc.setFontSize(14);
                doc.setTextColor(26, 60, 52);
                doc.text("REGULATIONS FOR THE HOSTEL", 20, finalY);
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(10);
                doc.setFont("times", "normal"); // Reset font for consistency
                const regulationsText = [
                    "1. Visitors are not allowed on hostel premises beyond 11pm.",
                    "2. Residents leaving the hostel for lectures or church for more than forty-eight hours (48hrs) should keep the management informed. All regulations shall continue to be in force during vacations, and infringement of any such regulations shall render a student liable to verbal reprimand/expulsion or disciplinary action.",
                    "3. All students must leave their rooms tidy before leaving for vacation. Residents leaving personal belongings in their rooms do so at their own risk. No space will be available for keeping belongings.",
                    "4. Property left in residence without permission during vacations is liable to be disposed of at the discretion of hostel management.",
                    "5. Damages to hostel properties will be charged against the offender. Students who consciously destroy hostel property would be reported to the Dean of students for sanctions.",
                    "6. Smoking and alcoholic drinks are not permitted on hostel premises. Smoking in your rooms or on the compound or anywhere around the hostel will attract an instant expulsion.",
                    "7. Cooking is not permitted in rooms. Kitchen is provided for cooking.",
                    "8. No candles are allowed. Students are entreated to use rechargeable lamps.",
                    "9. Noise must be kept at acceptable levels so that other inmates are not unduly inconvenienced.",
                    "10. All theft cases should be reported to management for appropriate actions.",
                    "11. Students will be handed over to the appropriate authority for any illegal connection.",
                    "12. Students who misbehave in this hostel of residence would be blacklisted with all the hostel operators.",
                    "13. Students should be able to draw management's attention to lapses in the management of the hostel.",
                    "14. Students shall not bring and/or keep any pets in the premises including fish, cats, dogs, and so on. Students should desist from pampering stray dogs by offering food, petting them, etc.",
                    "15. Various offences will attract varied sanctions including:",
                    "   - Verbal reprimand",
                    "   - Fines",
                    "   - Expulsion or disciplinary action"
                ];
                finalY += 10;
                lineCounter = 0;
                regulationsText.forEach((line, index) => {
                    const splitText = doc.splitTextToSize(line, 170); // Split text to fit within maxWidth
                    splitText.forEach((textLine, textIndex) => {
                        if (finalY + (lineCounter * 6) > 270) {
                            doc.addPage();
                            addWatermark(); // Add watermark to the new page
                            finalY = 20;
                            lineCounter = 0;
                        }
                        doc.text(textLine, 20, finalY + (lineCounter * 6));
                        lineCounter++;
                    });
                });
                finalY = finalY + (lineCounter * 6); // Update finalY based on total lines

                // Signature Section
                finalY += 20;
                if (finalY > 220) {
                    doc.addPage();
                    addWatermark(); // Add watermark to the new page
                    finalY = 20;
                }
                doc.setFontSize(14);
                doc.setTextColor(26, 60, 52);
                doc.text("SIGNATURES", 20, finalY);
                doc.setTextColor(0, 0, 0);
                finalY += 10;

                // Manager's Signature (Left Column)
                doc.setFontSize(12);
                doc.text("Manager", 20, finalY);
                doc.setFontSize(10);
                doc.text("Name: ______________________________", 20, finalY + 8);
                doc.text(`Date: ${currentDate}`, 20, finalY + 16);
                doc.text("Signature: _________________________", 20, finalY + 24);

                // Student's Signature (Right Column)
                doc.setFontSize(12);
                doc.text("Student", 105, finalY);
                doc.setFontSize(10);
                doc.text("Name: ______________________________", 105, finalY + 8);
                doc.text(`Date: ${currentDate}`, 105, finalY + 16);
                doc.text("Signature: _________________________", 105, finalY + 24);

                // Save the PDF
                doc.save(`Wagyingo_Booking_Confirmation_${roomId}.pdf`);
            });
        }
    }

    // Edit booking form handling (for edit-booking.html)
    const editBookingForm = document.querySelector('#edit-booking-form');
    if (editBookingForm) {
        // Check if user is logged in
        if (!isLoggedIn()) {
            alert('Please login to edit your booking.');
            window.location.href = 'login.html';
            return;
        }

        // Get booking details from query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('roomId') || 'Unknown';
        const hostel = urlParams.get('hostel') || 'Unknown';
        const type = urlParams.get('type') || 'Unknown';
        const price = urlParams.get('price') || '0.00';
        const bookedByName = urlParams.get('bookedByName') || ''; // Changed from fullName to bookedByName
        const academicLevel = urlParams.get('academicLevel') || '';
        const program = urlParams.get('program') || '';
        const phone = urlParams.get('phone') || '';
        const nationality = urlParams.get('nationality') || '';
        const gender = urlParams.get('gender') || '';
        const guardianName = urlParams.get('guardianName') || '';
        const relationship = urlParams.get('relationship') || '';
        const guardianPhone = urlParams.get('guardianPhone') || '';

        // Display non-editable room details
        const hostelNameElement = document.querySelector('#hostel-name');
        const roomIdElement = document.querySelector('#room-id');
        const roomTypeElement = document.querySelector('#room-type');
        const roomPriceElement = document.querySelector('#room-price');

        if (hostelNameElement) {
            hostelNameElement.textContent = hostel ? hostel.replace('wagyingo-', '').replace('-', ' ').toUpperCase() : 'Unknown Hostel';
        }
        if (roomIdElement) {
            roomIdElement.textContent = roomId;
        }
        if (roomTypeElement) {
            roomTypeElement.textContent = type ? type.charAt(0).toUpperCase() + type.slice(1) + ' Room' : 'Unknown Type';
        }
        if (roomPriceElement) {
            roomPriceElement.textContent = `$${price}`;
        }

        // Pre-fill the form with existing booking details
        document.querySelector('#full-name').value = bookedByName; // Changed from fullName to bookedByName
        document.querySelector('#academic-level').value = academicLevel;
        document.querySelector('#program').value = program;
        document.querySelector('#phone').value = phone;
        document.querySelector('#nationality').value = nationality;
        document.querySelector('#gender').value = gender;
        document.querySelector('#guardian-name').value = guardianName;
        document.querySelector('#relationship').value = relationship;
        document.querySelector('#guardian-phone').value = guardianPhone;

        // Handle form submission
        editBookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate room details
            if (!roomId || !hostel || !type || !price || roomId === 'Unknown' || hostel === 'Unknown' || type === 'Unknown') {
                alert('Invalid room details. Please start the booking process again.');
                window.location.href = 'index.html';
                return;
            }

            const formData = new FormData(editBookingForm);
            const updatedBookingData = {
                roomId: roomId,
                hostel: hostel,
                bookedByName: formData.get('full-name'), // Changed from fullName to bookedByName
                academicLevel: formData.get('academic-level'),
                program: formData.get('program'),
                phone: formData.get('phone'),
                nationality: formData.get('nationality'),
                gender: formData.get('gender'),
                guardianName: formData.get('guardian-name'),
                relationship: formData.get('relationship'),
                guardianPhone: formData.get('guardian-phone'),
            };

            try {
                // Send the updated booking details to the backend
                const response = await fetch('http://localhost:5000/api/bookings/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedBookingData),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Error updating booking');
                }

                // Update the booking details in localStorage
                const updatedBookingDetails = {
                    roomId: roomId,
                    hostel: hostel,
                    type: type,
                    price: price,
                    bookedByName: updatedBookingData.bookedByName, // Changed from fullName to bookedByName
                    academicLevel: updatedBookingData.academicLevel,
                    program: updatedBookingData.program,
                    phone: updatedBookingData.phone,
                    nationality: updatedBookingData.nationality,
                    gender: updatedBookingData.gender,
                    guardianName: updatedBookingData.guardianName,
                    relationship: updatedBookingData.relationship,
                    guardianPhone: updatedBookingData.guardianPhone,
                };
                localStorage.setItem('lastBooking', JSON.stringify(updatedBookingDetails));
                console.log('Updated booking stored in localStorage:', updatedBookingDetails);

                alert('Booking updated successfully!');
                // Redirect back to confirmation.html with the updated details
                const queryParams = new URLSearchParams(updatedBookingDetails).toString();
                window.location.href = `confirmation.html?${queryParams}`;
            } catch (err) {
                alert(err.message);
            }
        });
    }
});