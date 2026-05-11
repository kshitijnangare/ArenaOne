export const retailProducts = [
    {
        id: 'r1',
        name: 'Pro Performance Cricket Bat',
        category: 'Cricket',
        price: 450,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        description: 'Grade 1 English Willow, handcrafted for extreme power and balance.'
    },
    {
        id: 'r2',
        name: 'Signature Surf Wax - Tropical',
        category: 'Surfing',
        price: 15,
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
        description: 'Eco-friendly, long-lasting grip for warm water surfing.'
    },
    {
        id: 'r3',
        name: 'Alpine Explorer Tent',
        category: 'Camping',
        price: 320,
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800',
        description: 'Ultra-lightweight 4-season tent with advanced ventilation.'
    },
    {
        id: 'r4',
        name: 'Precision Climbing Harness',
        category: 'Climbing',
        price: 120,
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=800',
        description: 'Ergonomic design for maximum comfort during long climbs.'
    }
];

export const loopProducts = [
    {
        id: 'l1',
        name: 'Vintage Leather Cricket Ball',
        originalPrice: 40,
        depreciatedPrice: 15,
        condition: 'Good',
        sellerName: 'Alex J.',
        trustScore: 4.8,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        description: 'Slightly used in one match. Excellent seam.'
    },
    {
        id: 'l2',
        name: 'Carbon Fiber Road Bike',
        originalPrice: 2500,
        depreciatedPrice: 1800,
        condition: 'Mint',
        sellerName: 'Sarah K.',
        trustScore: 5.0,
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
        description: 'Only ridden twice. Lightweight and incredibly fast.'
    },
    {
        id: 'l3',
        name: 'Premium Yoga Mat',
        originalPrice: 80,
        depreciatedPrice: 35,
        condition: 'Fair',
        sellerName: 'Mike T.',
        trustScore: 4.2,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
        description: 'Visible wear but still provides great grip and cushioning.'
    }
];

export const rentalProducts = [
    {
        id: 'rt1',
        name: 'GoPro Hero 11 Black',
        dailyRate: 25,
        securityDeposit: 200,
        features: ['5.3K Video', 'HyperSmooth 5.0', 'Waterproof'],
        image: 'https://images.unsplash.com/photo-1526170315873-3a56162824cf?auto=format&fit=crop&q=80&w=800',
        description: 'The ultimate action camera for your adventures.'
    },
    {
        id: 'rt2',
        name: 'Heavy Duty Expedition Pack',
        dailyRate: 15,
        securityDeposit: 100,
        features: ['75L Capacity', 'Weather Resistant', 'Adjustable Frame'],
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
        description: 'Ideal for multi-day treks and high-volume gear.'
    },
    {
        id: 'rt3',
        name: 'Portable Solar Power Station',
        dailyRate: 40,
        securityDeposit: 300,
        features: ['500Wh Capacity', 'Multiple Ports', 'Fast Charging'],
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800',
        description: 'Keep your devices charged anywhere in the wild.'
    }
];

export const bundleProducts = [
    {
        id: 'b1',
        name: 'The "Sahyadri Weekend" Bundle',
        targetAudience: 'College groups heading out for a 2-day fort trek.',
        description: 'Buying this setup costs upwards of ₹8,000. Renting the bundle for a weekend makes impulse trips highly affordable.',
        coverImage: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800',
        discountPercentage: 15,
        originalTotal: 400,
        bundlePrice: 340,
        items: [
            { id: 'rt2', name: '50L Rucksack', quantity: 1, dailyRate: 100 },
            { id: 'rt3', name: '2-Person Pop-up Tent', quantity: 1, dailyRate: 150 },
            { id: 'rt4', name: 'Sleeping Bag', quantity: 2, dailyRate: 50 },
            { id: 'rt5', name: 'LED Headlamp', quantity: 1, dailyRate: 50 }
        ]
    },
    {
        id: 'b2',
        name: 'The "Turf Crusher" Pack',
        targetAudience: 'Corporate teams or college friends booking local turf slots.',
        description: 'Premium bats are expensive to own but highly desired for weekend matches.',
        coverImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        discountPercentage: 20,
        originalTotal: 500,
        bundlePrice: 400,
        items: [
            { id: 'rt6', name: 'Premium English Willow Bat', quantity: 2, dailyRate: 150 },
            { id: 'rt7', name: 'Batting Gloves', quantity: 1, dailyRate: 100 },
            { id: 'rt8', name: 'Set of Spring Stumps', quantity: 1, dailyRate: 100 }
        ]
    },
    {
        id: 'b3',
        name: 'The "Doubles Match" Kit',
        targetAudience: 'Casual players hitting the indoor courts.',
        description: 'Reduces the excuse of "I don\'t have a racket" when trying to organize a group game.',
        coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800',
        discountPercentage: 10,
        originalTotal: 300,
        bundlePrice: 270,
        items: [
            { id: 'rt9', name: 'Pro Racquets (Astrox)', quantity: 4, dailyRate: 50 },
            { id: 'rt10', name: 'Nylon Shuttlecocks (Keep)', quantity: 1, dailyRate: 50 },
            { id: 'rt11', name: 'Racquet Bag', quantity: 1, dailyRate: 50 }
        ]
    },
    {
        id: 'b4',
        name: 'The "Content Creator" Action Pack',
        targetAudience: 'Adventure vloggers and motorcycle riders.',
        description: 'High-barrier entry cost. People only need action cameras for specific trips, making them the ultimate rental item.',
        coverImage: 'https://images.unsplash.com/photo-1526170315873-3a56162824cf?auto=format&fit=crop&q=80&w=800',
        discountPercentage: 25,
        originalTotal: 200,
        bundlePrice: 150,
        items: [
            { id: 'rt1', name: 'GoPro Hero 11 Black', quantity: 1, dailyRate: 100 },
            { id: 'rt12', name: 'Chest + Helmet Mount', quantity: 1, dailyRate: 40 },
            { id: 'rt13', name: 'Floating Handle', quantity: 1, dailyRate: 20 },
            { id: 'rt14', name: 'Extra Battery', quantity: 1, dailyRate: 40 }
        ]
    }
];

// NEW: Initial Inventory data (for ERP, with stock)
export const initialInventory = [
    // Retail
    { id: 'r1', name: 'Pro Performance Cricket Bat', category: 'Cricket', price: 450, stock_count: 55, low_threshold: 5 },
    { id: 'r2', name: 'Signature Surf Wax - Tropical', category: 'Surfing', price: 15, stock_count: 42, low_threshold: 5 },
    { id: 'r3', name: 'Alpine Explorer Tent', category: 'Camping', price: 320, stock_count: 12, low_threshold: 3 },
    { id: 'r4', name: 'Precision Climbing Harness', category: 'Climbing', price: 120, stock_count: 18, low_threshold: 4 },
    // Loop (depreciatedPrice)
    { id: 'l1', name: 'Vintage Leather Cricket Ball', category: 'Cricket/Used', price: 15, stock_count: 35, low_threshold: 5 },
    { id: 'l2', name: 'Carbon Fiber Road Bike', category: 'Cycling/Used', price: 1800, stock_count: 3, low_threshold: 1 },
    { id: 'l3', name: 'Premium Yoga Mat', category: 'Fitness/Used', price: 35, stock_count: 28, low_threshold: 5 },
    // Rental (dailyRate as price)
    { id: 'rt1', name: 'GoPro Hero 11 Black', category: 'Rental/Electronics', price: 25, stock_count: 8, low_threshold: 2 },
    { id: 'rt2', name: 'Heavy Duty Expedition Pack', category: 'Rental/Backpack', price: 15, stock_count: 15, low_threshold: 3 },
    { id: 'rt3', name: 'Portable Solar Power Station', category: 'Rental/Power', price: 40, stock_count: 6, low_threshold: 2 },
    // More samples
    { id: 'extra1', name: 'Mountain Boots', category: 'Trekking', price: 250, stock_count: 20, low_threshold: 5 },
    { id: 'extra2', name: 'Climbing Rope 50m', category: 'Climbing', price: 1800, stock_count: 4, low_threshold: 1 },
    { id: 'extra3', name: 'Surfboard - Beginner', category: 'Surfing', price: 120, stock_count: 10, low_threshold: 2 }
];

// NEW: Initial Users (with pw plain for dummy, arenaCredits, totalSpent)
export const initialUsers = [
    { id: 'admin1', name: 'Admin System', email: 'admin@arena.com', password: 'admin123', arenaCredits: 0, totalSpent: 0, role: 'admin' },
    { id: 'user1', name: 'User System', email: 'user@arena.com', password: 'user123', arenaCredits: 50, totalSpent: 1250, role: 'user' },
    { id: 'u2', name: 'Alice Smith', email: 'alice@example.com', password: 'pass123', arenaCredits: 120, totalSpent: 1200, role: 'user' },
    { id: 'u3', name: 'Bob Johnson', email: 'bob@example.com', password: 'pass456', arenaCredits: 45, totalSpent: 450, role: 'user' },
    { id: 'u4', name: 'Diana Prince', email: 'diana@example.com', password: 'pass789', arenaCredits: 89, totalSpent: 890, role: 'user' },
    { id: 'u5', name: 'John Doe', email: 'john@arena.com', password: 'user999', arenaCredits: 30, totalSpent: 300, role: 'user' }
];

// NEW: Initial Orders/Transactions
export const initialOrders = [
    { id: 'o1', timestamp: '2024-10-01 10:30', user: 'Alice Smith', product: '2x Cricket Bat', amount: 900, action: 'Purchase' },
    { id: 'o2', timestamp: '2024-10-02 14:15', user: 'Bob Johnson', product: 'Surf Wax', amount: 15, action: 'Purchase' },
    { id: 'o3', timestamp: '2024-10-03 09:45', user: 'Diana Prince', product: 'Tent + Harness', amount: 440, action: 'Purchase' },
    { id: 'o4', timestamp: '2024-10-04 16:20', user: 'John Doe', product: 'GoPro Rental', amount: 25, action: 'Rental' }
];

