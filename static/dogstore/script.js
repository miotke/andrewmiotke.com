// Dog Toy Products Database
const products = [
    // Small Dog Toys
    {
        id: 1,
        name: "Squeaky Squeakerson",
        price: 12.99,
        size: "small",
        description: "A tiny plush squirrel that squeaks with every chomp. Perfect for tiny jaws and big attitudes.",
        emoji: "🐿️"
    },
    {
        id: 2,
        name: "The Mini Mauler",
        price: 9.99,
        size: "small",
        description: "A pocket-sized rope toy that's surprisingly durable. Great for tug-of-war with your chihuahua.",
        emoji: "🧶"
    },
    {
        id: 3,
        name: "Bitty Ball Bonanza",
        price: 15.99,
        size: "small",
        description: "Set of 5 tennis balls perfectly sized for small mouths. Warning: may cause excessive zoom behavior.",
        emoji: "🎾"
    },

    // Medium Dog Toys
    {
        id: 4,
        name: "The Bacon Blaster",
        price: 19.99,
        size: "medium",
        description: "Bacon-scented rubber bone that's virtually indestructible. Your beagle's new best friend.",
        emoji: "🥓"
    },
    {
        id: 5,
        name: "Frisbee McFloaty",
        price: 14.99,
        size: "medium",
        description: "A soft flying disc perfect for border collies and other medium-energy pups. Floats in water!",
        emoji: "🥏"
    },
    {
        id: 6,
        name: "The Tug Champion",
        price: 22.99,
        size: "medium",
        description: "Heavy-duty rope toy with knotted ends. Tested by professional tuggers. You will lose.",
        emoji: "🪢"
    },
    {
        id: 7,
        name: "Puzzle Brain Buster",
        price: 29.99,
        size: "medium",
        description: "Interactive treat puzzle to keep smart dogs busy. May cause frustrated barking.",
        emoji: "🧩"
    },

    // Large Dog Toys
    {
        id: 8,
        name: "Kong-Sized Kong",
        price: 24.99,
        size: "large",
        description: "Massive rubber toy that can be stuffed with treats. Survives even the most determined labs.",
        emoji: "🔨"
    },
    {
        id: 9,
        name: "The Destroyer",
        price: 34.99,
        size: "large",
        description: "For dogs who destroy everything. This toy fights back. Reinforced triple-stitched seams.",
        emoji: "💪"
    },
    {
        id: 10,
        name: "Mega Rope Tornado",
        price: 28.99,
        size: "large",
        description: "3-foot rope toy for serious tug sessions. Doubles as a dog seatbelt in emergencies.",
        emoji: "🌪️"
    },
    {
        id: 11,
        name: "The Jolly Ball",
        price: 32.99,
        size: "large",
        description: "Giant ball that your retriever can push but not pick up. Hours of confused entertainment.",
        emoji: "⚽"
    },

    // Extra Large Dog Toys
    {
        id: 12,
        name: "The Titan Tire",
        price: 45.99,
        size: "xlarge",
        description: "Actual tire from a real tractor. For mastiffs, great danes, and other gentle giants.",
        emoji: "🛞"
    },
    {
        id: 13,
        name: "Hercules Rope",
        price: 39.99,
        size: "xlarge",
        description: "Made from marine-grade rope used in actual harbors. Your dog won't destroy this. Probably.",
        emoji: "⚓"
    },
    {
        id: 14,
        name: "The Log",
        price: 49.99,
        size: "xlarge",
        description: "It's literally just a big rubber log. Giant dogs love it. We don't know why either.",
        emoji: "🪵"
    },
    {
        id: 15,
        name: "Ultimate Frisbee Deluxe",
        price: 29.99,
        size: "xlarge",
        description: "Extra-large heavy-duty frisbee. Requires two hands to throw. May achieve flight.",
        emoji: "🛸"
    },

    // Multi-size options
    {
        id: 16,
        name: "The Plush Duck Dynasty",
        price: 18.99,
        size: "small",
        description: "Adorable plush duck with a satisfying quack. Perfect for gentle retrieval practice.",
        emoji: "🦆"
    },
    {
        id: 17,
        name: "Snuggle Sloth",
        price: 21.99,
        size: "medium",
        description: "A cuddly sloth toy for naptime. Contains zero squeakers for peaceful sleep.",
        emoji: "🦥"
    },
    {
        id: 18,
        name: "The Tennis Ball Launcher",
        price: 16.99,
        size: "medium",
        description: "Because your arm gets tired. Set of 3 balls included. Your dog will never tire.",
        emoji: "🎯"
    },
];

// State management
let currentFilter = 'all';

// Initialize the store
function init() {
    renderProducts();
    setupFilterButtons();
}

// Render products based on current filter
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const filteredProducts = currentFilter === 'all'
        ? products
        : products.filter(p => p.size === currentFilter);

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p class="no-products">No toys found for this size. Try another filter!</p>';
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-size="${product.size}">
            <div class="product-emoji">${product.emoji}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-size-badge">${getSizeBadge(product.size)}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="buy-btn" onclick="buyProduct(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Get human-readable size badge
function getSizeBadge(size) {
    const badges = {
        'small': 'Small Dogs',
        'medium': 'Medium Dogs',
        'large': 'Large Dogs',
        'xlarge': 'XL Dogs'
    };
    return badges[size] || size;
}

// Setup filter button click handlers
function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update filter and re-render
            currentFilter = button.dataset.size;
            renderProducts();
        });
    });
}

// Buy product (just shows an alert since this is fake)
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`🎉 Added "${product.name}" to your cart!\n\nJust kidding, this is a fake store. But your dog would love this $${product.price.toFixed(2)} toy!`);
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
