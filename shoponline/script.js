// Warenkorb-Daten im Local Storage speichern
let warenkorb = JSON.parse(localStorage.getItem('warenkorb')) || [];

// Funktion, um Produkte zum Warenkorb hinzuzufügen
document.querySelectorAll('.warenkorb-button').forEach(button => {
  button.addEventListener('click', function() {
    const produkt = {
      name: this.getAttribute('data-name'),
      price: parseFloat(this.getAttribute('data-price'))
    };
    
    // Produkt zum Warenkorb hinzufügen
    warenkorb.push(produkt);
    localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
    alert(`${produkt.name} wurde zum Warenkorb hinzugefügt!`);
  });
});

// Funktion zum Anzeigen der Warenkorb-Inhalte (für die Warenkorb-Seite)
function renderWarenkorb() {
  const warenkorbContainer = document.getElementById('warenkorb-inhalt');
  warenkorbContainer.innerHTML = '';

  if (warenkorb.length === 0) {
    warenkorbContainer.innerHTML = '<p>Der Warenkorb ist leer.</p>';
  } else {
    let total = 0;
    warenkorb.forEach((produkt, index) => {
      total += produkt.price;
      warenkorbContainer.innerHTML += `
        <div class="warenkorb-produkt">
          <p>${produkt.name} - ${produkt.price} €</p>
          <button onclick="removeFromWarenkorb(${index})">Entfernen</button>
        </div>
      `;
    });
    warenkorbContainer.innerHTML += `<p>Gesamt: ${total.toFixed(2)} €</p>`;
  }
}

// Funktion zum Entfernen eines Produkts aus dem Warenkorb
function removeFromWarenkorb(index) {
  warenkorb.splice(index, 1);
  localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
  renderWarenkorb();
}

// Funktion für den Checkout-Prozess (wird aufgerufen, wenn man auf "Zur Kasse" klickt)
document.getElementById('checkout')?.addEventListener('click', function() {
  if (warenkorb.length === 0) {
    alert("Ihr Warenkorb ist leer. Bitte fügen Sie Artikel hinzu.");
  } else {
    // Logik für den Checkout-Prozess hier hinzufügen
    // Zum Beispiel könnte hier eine Anfrage an den Server gesendet werden
    alert('Vielen Dank für Ihren Kauf!');
    // Nach dem Kauf kann der Warenkorb zurückgesetzt werden
    localStorage.removeItem('warenkorb');
    renderWarenkorb();
  }
});

// Wenn die Warenkorb-Seite geladen wird, rendern wir den Inhalt
if (document.getElementById('warenkorb-inhalt')) {
  renderWarenkorb();
}
