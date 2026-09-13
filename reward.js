const rewardsContainer =
    document.getElementById("rewardsContainer");

let rewards = JSON.parse(
    localStorage.getItem("rewards")
) || [
    {
        id: 1,
        title: "₹150 OFF Coupon",
        description: "Get ₹150 OFF on orders above ₹799",
        discount: 150,
        expiry: Date.now() + 2 * 24 * 60 * 60 * 1000
    },

    {
        id: 2,
        title: "20% OFF Coupon",
        description: "Get 20% OFF on selected products",
        discount: 200,
        expiry: Date.now() + 5 * 24 * 60 * 60 * 1000
    },

    {
        id: 3,
        title: "Free Delivery",
        description: "Free delivery on your next order",
        discount: 80,
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000
    }
];

localStorage.setItem(
    "rewards",
    JSON.stringify(rewards)
);


function displayRewards() {

    rewardsContainer.innerHTML = "";

    let active = 0;
    let expiring = 0;
    let savings = 0;

    rewards.forEach(reward => {

        const remaining =
            reward.expiry - Date.now();

        if (remaining <= 0) {

            rewardsContainer.innerHTML += `

            <div class="reward-card expired">

                <h2>❌ ${reward.title}</h2>

                <p>${reward.description}</p>

                <h3>Expired</h3>

            </div>

            `;

            return;
        }

        active++;

        if (remaining <
            3 * 24 * 60 * 60 * 1000) {

            expiring++;
        }

        savings += reward.discount;

        const days =
            Math.floor(
                remaining / (1000 * 60 * 60 * 24)
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

                <p>${reward.description}</p>

                <h3 class="countdown">

                    ⏳ Expires in:

                    ${days}d
                    ${hours}h
                    ${minutes}m
                    ${seconds}s

                </h3>

                <button onclick="useReward(${reward.id})">

                    🛒 Use Reward

                </button>

            </div>

        </div>

        `;
    });


    document.getElementById(
        "activeRewards"
    ).textContent = active;


    document.getElementById(
        "expiringRewards"
    ).textContent = expiring;


    document.getElementById(
        "totalSavings"
    ).textContent = "₹" + savings;
}


function useReward(id) {

    const reward =
        rewards.find(r => r.id === id);

    alert(
        "🎉 " +
        reward.title +
        " applied to your next order!"
    );
}


displayRewards();

setInterval(displayRewards, 1000);