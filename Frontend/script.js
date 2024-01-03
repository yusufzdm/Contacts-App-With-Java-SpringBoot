let allPersons = [];
//POST İSTEĞİ!!!
const form = document.getElementById('rehberForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const yeniKisi = {
        fName: document.getElementById('firstName').value,
        lName: document.getElementById('lastName').value,
        number: document.getElementById('phoneNumber').value,
        // Diğer kişi özellikleri
    };

    fetch('http://localhost:8080/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(yeniKisi),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP hatası! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(eklenenKisi => {
            console.log('Yeni kişi eklendi:', eklenenKisi);
        })
        .catch(error => {
            console.error('Hata:', error.message);
        });
});

// ...

//GET İSTEĞİ!!!
document.getElementById('getButton').addEventListener('click', function () {
    // GET isteği gönderme
    fetch('http://localhost:8080/contact')
        .then(response => {
            // Yanıtın başarı durumunu kontrol etme
            if (!response.ok) {
                throw new Error(`HTTP hatası! Status: ${response.status}`);
            }
            // JSON formatında yanıtı çözümleme
            return response.json();
        })
        .then(data => {
            // Elde edilen verileri tabloya ekleme
            const tableBody = document.querySelector('#dataTable tbody');
            tableBody.innerHTML = ''; // Önceki verileri temizleme

            const allPersons = data; // allPersons'u güncelle

            data.forEach(person => {
                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>${person.id}</td>
                        <td>${person.fName}</td>
                        <td>${person.lName}</td>
                        <td>${person.number}</td>
                        <td><button class="editButton" data-id="${person.id}">Düzenle</button></td>
                        <td><button class="deleteButton" data-id="${person.id}">Sil</button></td>
                    `;
                tableBody.appendChild(row);
            });

            // Silme ve düzenleme butonlarına tıklama olaylarını ekleme
            document.querySelectorAll('.deleteButton').forEach(button => {
                button.addEventListener('click', function () {
                    const personId = this.getAttribute('data-id');
                    handleDeletePerson(personId);
                });
            });
            document.querySelectorAll('.editButton').forEach(button => {
                button.addEventListener('click', function (event) {
                    event.preventDefault(); // Form gönderimini engelle
                    const personId = this.getAttribute('data-id');
                    console.log('Düzenle butonuna basıldı. Kişi ID:', personId);
                    handleEditPerson(personId, allPersons);
                });
            });
        })
        .catch(error => {
            // Hata durumunda hata mesajını görüntüleme
            console.error('Hata:', error.message);
        });
    //Düzenle butonunu yakalama
});

// ...


function handleEditPerson(personId, dataList) {
    // Kişiyi bul
    const selectedPerson = dataList.find(person => person.id === personId);

    // Form alanlarına kişi bilgilerini yerleştir
    document.getElementById('firstName').value = selectedPerson.fName;
    document.getElementById('lastName').value = selectedPerson.lName;
    document.getElementById('phoneNumber').value = selectedPerson.number;
    document.getElementById('personId').value = selectedPerson.id;

    // Düzenleme formunu göster
    
    handleDeletePerson(personId);
}



//DELETE İSTEĞİ!!!!!
function handleDeletePerson(personId) {
    // DELETE isteği gönderme
    fetch(`http://localhost:8080/contact/${personId}`, {
        method: 'DELETE',
    })
        .then(response => {
            // Yanıtın başarı durumunu kontrol etme
            if (!response.ok) {
                throw new Error(`HTTP hatası! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(result => {
            // Silme işlemi başarılıysa
            console.log('Silme işlemi başarılı:', result);
            // Yeniden GET isteği göndererek tabloyu güncelleme
            document.getElementById('getButton').click();
        })
        .catch(error => {
            // Hata durumunda hata mesajını görüntüleme
            console.error('Hata:', error.message);
        });
}

