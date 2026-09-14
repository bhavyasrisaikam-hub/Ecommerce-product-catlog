const rewardsContainer =
    document.getElementById("rewardsContainer");


// Get saved rewards
let rewards =
    JSON.parse(localStorage.getItem("rewards"));


// If there are no rewards, create demo rewards
if (!rewards || rewards.length === 0) {

    rewards = [

        {
            id: 1,
            title: "₹150 OFF Coupon",
            description: "Get ₹150 OFF on orders above ₹799",
            discount: 150,
            expiry: Date.now() + (2 * 24 * 60 * 60 * 1000)
        },

        {
            id: 2,
            title: "20% OFF Coupon",
            description: "20% OFF on selected products",
            discount: 200,
            expiry: Date.now() + (5 * 24 * 60 * 60 * 1000)
        },

        {
            id: 3,
            title: "Free Delivery",
            description: "Free delivery on your next order",
            discount: 80,
            expiry: Date.now() + (7 * 24 * 60 * 60 * 1000)
        }

    ];

    localStorage.setItem(
        "rewards",
        JSON.stringify(rewards)
    );
}


// Display rewards
function displayRewards() {

    rewardsContainer.innerHTML = "";

    let active = 0;
    let expiring = 0;
    let savings = 0;


    rewards.forEach(reward => {

        const remaining =
            reward.expiry - Date.now();


        // Expired reward
        if (remaining <= 0) {

            rewardsContainer.innerHTML += `

                <div class="reward-card expired">

                    <div class="reward-icon">
                        ❌
                    </div>

                    <div class="reward-content">

                        <h2>${reward.title}</h2>

                        <p>${reward.description}</p>

                        <h3>Expired</h3>

                    </div>

                </div>

            `;

            return;
        }


        active++;


        // Expiring within 3 days
        if (
            remaining <
            3 * 24 * 60 * 60 * 1000
        ) {

            expiring++;

        }


        savings += reward.discount;


        // Calculate countdown
        const days =
            Math.floor(
                remaining /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (remaining /
                (1000 * 60 * 60)) % 24
            );


        const minutes =
            Math.floor(
                (remaining /
                (1000 * 60)) % 60
            );


        const seconds =
            Math.floor(
                (remaining / 1000) % 60
            );


        rewardsContainer.innerHTML += `

            <div class="reward-card">

                <div class="reward-icon">
                    🎁
                </div>

                <div class="reward-content">

                    <h2>${reward.title}</h2>

                    <p>
                        ${reward.description}
                    </p>

                    <h3 class="countdown">

                        ⏳ Expires in:

                        ${days}d
                        ${hours}h
                        ${minutes}m
                        ${seconds}s

                    </h3>

                    <div clas"reward-actions">
                    166  <button onclick="useReward(${reward.id})">
      🛒 Use Reward
  </button>

  <button onclick="setReminder(${reward.id})">
      🔔 Remind Me
  </button>
                    
</div>

                </div>

            </div>

        `;

    });


    // Update dashboard
    document.getElementById(
        "activeRewards"
    ).textContent = active;


    document.getElementById(
        "expiringRewards"
    ).textContent = expiring;


    document.getElementById(
        "totalSavings"
    ).textContent =
        "₹" + savings;

}


function useReward(id) {

    const reward = rewards.find(
        reward => reward.id === id
    );

    if (reward) {

        // Save selected reward
        localStorage.setItem(
            "selectedReward",
            JSON.stringify(reward)
        );

        // Save reward to history
        let rewardHistory =
            JSON.parse(localStorage.getItem("rewardHistory")) || [];

        rewardHistory.push({
            id: reward.id,
            title: reward.title,
            savings: reward.savings,
            usedAt: new Date().toLocaleString(),
            status: "Used"
        });

        localStorage.setItem(
            "rewardHistory",
            JSON.stringify(rewardHistory)
        );

        alert("🎉 " + reward.title + " selected!");

        window.location.href = "cart.html";
    }
}
function setReminder(id) {

    const reward = rewards.find(
        reward => reward.id === id
    );

    if (!reward) return;

    const choice = prompt(
        "When should we remind you?\n\n" +
        "1 = 3 days before\n" +
        "2 = 1 day before\n" +
        "3 = 1 hour before"
    );

    let reminderTime;

    if (choice === "1") {

        reminderTime =
            reward.expiry -
            (3 * 24 * 60 * 60 * 1000);

    } else if (choice === "2") {

        reminderTime =
            reward.expiry -
            (24 * 60 * 60 * 1000);

    } else if (choice === "3") {

        reminderTime =
            date.now() + (10 * 1000);

    } else {

        alert("Please select 1, 2, or 3.");
        return;

    }

    const reminders =
        JSON.parse(
            localStorage.getItem("rewardReminders")
        ) || [];

    const existing =
        reminders.find(
            reminder => reminder.rewardId === id
        );

    if (existing) {

        existing.reminderTime = reminderTime;
        existing.notified = false;

    } else {

        reminders.push({
            rewardId: id,
            reminderTime: reminderTime,
            notified: false
        });

    }

    localStorage.setItem(
        "rewardReminders",
        JSON.stringify(reminders)
    );

    alert(
        "🔔 Reminder set for " +
        reward.title
    );
}


// Run immediately
displayRewards();


// Update countdown every second
setInterval(
    displayRewards,
    1000
);

// Check saved reward reminders
function checkReminders() {

    const reminders =
        JSON.parse(
            localStorage.getItem("rewardReminders")
        ) || [];

    const now = Date.now();

    reminders.forEach(reminder => {

        if (
            !reminder.notified &&
            now >= reminder.reminderTime
        ) {

            const reward = rewards.find(
                reward => reward.id === reminder.rewardId
            );

            if (reward) {

                alert(
                    "🔔 Reward Reminder!\n\n" +
                    reward.title +
                    " is expiring soon!"
                );

                reminder.notified = true;
            }
        }
    });

    localStorage.setItem(
        "rewardReminders",
        JSON.stringify(reminders)
    );
}


// Check reminders every second
setInterval(
    checkReminders,
    1000
);
function displayRewardHistory() {

    const container =
        document.getElementById("rewardHistoryContainer");

    if (!container) return;

    const history =
        JSON.parse(localStorage.getItem("rewardHistory")) || [];

    if (history.length === 0) {
        container.innerHTML =
            "<p>No rewards used yet.</p>";
        return;
    }

    container.innerHTML = "";

    history.forEach(item => {

        container.innerHTML += `
            <div class="history-card">

                <h3>🎁 ${item.title}</h3>

                <p>
                    💰 Savings: ₹${item.discount}
                </p>

                <p>
                    📅 Used on: ${item.usedAt}
                </p>

                <p>
                    ✅ Status: ${item.status}
                </p>

            </div>
        `;
    });
}

displayRewardHistory();
