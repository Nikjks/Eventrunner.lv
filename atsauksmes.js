// Funkcija, lai maskētu e-pastu
function maskEmail(email) {
    const atIndex = email.indexOf('@'); // Atrodam "@" zīmi
    if (atIndex <= 1) {
        return '*'.repeat(atIndex) + email.slice(atIndex); // Maskē, ja epasts ir īss
    }
    return email[0] + '*'.repeat(atIndex - 1) + email.slice(atIndex); // Maskē epasta daļu
}

// Funkcija, lai pārbaudītu, vai ir pagājušas 24 stundas
function is24HoursPassed(lastTime) {
    const now = new Date().getTime();
    return now - lastTime >= 24 * 60 * 60 * 1000; // 24 stundas konvertētas uz milisekundēm
}

// Funkcija, lai saglabātu atsauksmes datus vietējā krātuvē
function saveReviewData(email) {
    const currentTime = new Date().getTime();
    localStorage.setItem('lastEmail', email);
    localStorage.setItem('lastReviewTime', currentTime);
}

// Funkcija, lai iegūtu pēdējās atsauksmes laiku un e-pastu no krātuvē
function getStoredReviewData() {
    return {
        email: localStorage.getItem('lastEmail'),
        time: parseInt(localStorage.getItem('lastReviewTime')) || 0
    };
}

// Apstrādā jaunas atsauksmes pievienošanu
document.getElementById('atsauksmesForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Neļauj atsvaidzināt lapu

    const epasts = document.getElementById('epasts').value.trim();
    const atsauksme = document.getElementById('atsauksme').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (epasts && atsauksme) {
        // Pārbauda, vai ir pagājušas 24 stundas kopš pēdējās atsauksmes
        const storedData = getStoredReviewData();
        if (storedData.email === epasts && !is24HoursPassed(storedData.time)) {
            // Ja epasts ir tas pats un nav pagājušas 24 stundas
            errorMessage.style.display = 'block'; // Parāda kļūdas ziņojumu
            return;
        }

        // Maskē e-pastu un pievieno atsauksmi
        const maskedEmail = maskEmail(epasts);
        const atsauksmesContainer = document.getElementById('atsauksmes');
        const newAtsauksme = document.createElement('div');
        newAtsauksme.classList.add('atsauksme');
        newAtsauksme.innerHTML = `
            <p>"${atsauksme}"</p>
            <span>- ${maskedEmail}</span>
        `;
        atsauksmesContainer.prepend(newAtsauksme);

        // Saglabā atsauksmes datus vietējā krātuvē
        saveReviewData(epasts);

        // Notīra formu un slēpj kļūdas ziņojumu
        document.getElementById('epasts').value = '';
        document.getElementById('atsauksme').value = '';
        errorMessage.style.display = 'none';
    }
});