// Funkcija kas aprēķina ceļa izmaksas
function calculateCost() {
    const destination = document.getElementById('destination').value.trim();

    if (!destination) {
        alert('Lūdzu, ievadiet galamērķi!');
        return;
    }

    //OpenStreetMap
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${destination}&addressdetails=1&limit=1`;

    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Rīgas koordinātes
                const rigaLat = 56.946, rigaLon = 24.105;
                const destinationLat = parseFloat(data[0].lat);
                const destinationLon = parseFloat(data[0].lon);

                
                const distance = calculateDistance(rigaLat, rigaLon, destinationLat, destinationLon);

                
                const cost = Math.ceil((distance * 0.55)*2);

                
                document.getElementById('result').textContent = `Brauciena aptuvenās izmaksas: €${cost}`;
                document.getElementById('distance').textContent = `Attālums: ${distance.toFixed(2)} km`;

                
                document.getElementById('resultBox').style.display = 'block';
            } else {
                alert('Neizdevās atrast galamērķi.');
            }
        })
        .catch(error => {
            console.error('Kļūda:', error);
            alert('Notikusi kļūda, mēģiniet vēlreiz.');
        });
}

// aprēķina attālumu starp diviem punktiem
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Zemes rādiuss kilometros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Attālums kilometros
}

// Pievienot kalkulatora pogu
document.getElementById('calculateBtn').addEventListener('click', calculateCost);
