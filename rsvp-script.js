document.addEventListener("DOMContentLoaded", function () {
    const formElement = document.getElementById('wedding-rsvp-form');
    const buttonElement = document.getElementById('submit-btn');

    // Make sure the code only executes if the form elements exist
    if (formElement && buttonElement) {
        formElement.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop page from reloading/refreshing

            // Update button text to give instant feedback to guests
            buttonElement.innerText = "Sending Options...";
            buttonElement.style.opacity = "0.6";
            buttonElement.disabled = true;

            // ⚠️ PASTE YOUR RECENTLY DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE:
            const databaseEndpoint = 'https://script.google.com/macros/s/AKfycbzvHBKQsPGQ59iPGGnyEgJcBZ_5O7C9QZ16njZgb0a4oIITxx5KTo6ByE1t8KP9XOVIIw/exec';

            // Send data cleanly behind the scenes using a POST request
            fetch(databaseEndpoint, {
                method: 'POST',
                body: new FormData(formElement)
            })
            .then(res => {
                // Injects a smooth success message seamlessly into your card frame design
                formElement.innerHTML = `
                    <div style="text-align:center; padding:40px 10px; animation: fadeIn 0.8s ease forwards;">
                        <span style="font-size:3.5rem; color:#C5A880; display:block; margin-bottom:10px;">♡</span>
                        <h3 style="font-family:'Playfair Display', serif; font-style:italic; font-size:1.8rem; margin:0 0 10px 0; color:#2B2A28;">Response Received</h3>
                        <p style="font-family:'Montserrat', sans-serif; font-size:0.85rem; color:#7A7975; line-height:1.6; max-width:280px; margin:0 auto;">
                            Thank you! Your information has been safely saved into our attendance tracking sheet.
                        </p>
                    </div>`;
            })
            .catch(error => {
                console.error('Submission Error:', error);
                
                // Reset the button so guests can retry if their network drops
                buttonElement.innerText = "Error, Try Again";
                buttonElement.disabled = false;
                buttonElement.style.opacity = "1";
            });
        });
    }
});