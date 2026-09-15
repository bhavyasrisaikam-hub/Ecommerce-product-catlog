const giftCards = [
    {
        id: 1,
        name: "Amazon Gift Card",
        value: 500,
        balance: 500,
        expiryDays: 30
    },
    {
        id: 2,
        name: "Flipkart Gift Card",
        value: 1000,
        balance: 1000,
        expiryDays: 45
    },
    {
        id: 3,
        name: "Myntra Gift Card",
        value: 750,
        balance: 750,
        expiryDays: 60
    }
];

let giftCardHistory =
    JSON.parse(localStorage.getItem("giftCardHistory")) || [];


/* Display Gift Cards */
function displayGiftCards() {

    const container =
        document.getElementById("giftCardContainer");

    container.innerHTML = "";

    let active = 0;
    let expiring = 0;
    let totalBalance = 0;

    giftCards.forEach(card => {

        if (card.balance > 0) {
            active++;
            totalBalance += card.balance;
        }

        if (card.expiryDays <= 7 && card.balance > 0) {
            expiring++;
        }

        const cardElement =
            document.createElement("div");

        cardElement.className = "gift-card";

        cardElement.innerHTML = `
            <div class="gift-icon">🎁</div>

            <h2>${card.name}</h2>

            <p>Gift Card Value: ₹${card.value}</p>

            <p class="balance">
                Current Balance: ₹${card.balance}
            </p>

            <p class="expiry">
                ⏳ Expires in: ${card.expiryDays} days
            </p>

            <button
                class="use-btn"
                onclick="useGiftCard(${card.id})">
                🛒 Use Gift Card
            </button>

            <button
                onclick="remindGiftCard(${card.id})">
                🔔 Remind Me
            </button>
        `;

        container.appendChild(cardElement);
    });


    /* Update Summary */

    document.getElementById("activeGiftCards")
        .textContent = active;

    document.getElementById("expiringGiftCards")
        .textContent = expiring;

    document.getElementById("totalGiftBalance")
        .textContent = "₹" + totalBalance;
}


/* Use Gift Card */

function useGiftCard(id) {

    const card =
        giftCards.find(card => card.id === id);

    if (!card) {
        return;
    }

    if (card.balance <= 0) {
        alert("This gift card has no balance left.");
        return;
    }

    const amount =
        prompt(
            `Enter amount to use from ${card.name}:\nAvailable balance: ₹${card.balance}`
        );

    if (amount === null) {
        return;
    }

    const useAmount =
        Number(amount);

    if (
        isNaN(useAmount) ||
        useAmount <= 0
    ) {
        alert("Please enter a valid amount.");
        return;
    }

    if (useAmount > card.balance) {
        alert("Amount cannot exceed the available balance.");
        return;
    }


    /* Deduct amount */

    card.balance -= useAmount;


    /* Add to History */

    giftCardHistory.push({

        name: card.name,

        amount: useAmount,

        date: new Date().toLocaleString(),

        status: "Used"

    });


    localStorage.setItem(
        "giftCardHistory",
        JSON.stringify(giftCardHistory)
    );


    alert(
        `₹${useAmount} used successfully!\nRemaining balance: ₹${card.balance}`
    );


    displayGiftCards();
    displayGiftCardHistory();
}


/* Reminder */

function remindGiftCard(id) {

    const card =
        giftCards.find(card => card.id === id);

    if (!card) {
        return;
    }

    alert(
        `🔔 Reminder set for ${card.name}.\n\n`
        + `It expires in ${card.expiryDays} days.`
    );
}


/* Display History */

function displayGiftCardHistory() {

    const historyElement =
        document.getElementById("giftCardHistory");

    if (giftCardHistory.length === 0) {

        historyElement.innerHTML = `
            <p class="empty-history">
                No gift cards have been used yet.
            </p>
        `;

        return;
    }


    historyElement.innerHTML = "";


    giftCardHistory.forEach(item => {

        const historyItem =
            document.createElement("div");

        historyItem.innerHTML = `
            <p>🎁 <strong>${item.name}</strong></p>
            <p>💰 Amount Used: ₹${item.amount}</p>
            <p>📅 Used on: ${item.date}</p>
            <p>✅ Status: ${item.status}</p>
            <hr>
        `;

        historyElement.appendChild(historyItem);
    });
}


/* Start */

displayGiftCards();
displayGiftCardHistory();
