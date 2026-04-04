import { createContext, useContext, useState, useEffect } from 'react';
import { initialInventory, initialUsers, initialOrders } from '../data/dummyData';
import { useAuth } from './AuthContext';

const ErpCrmContext = createContext();

export const useErpCrm = () => {
    const context = useContext(ErpCrmContext);
    if (!context) throw new Error("useErpCrm must be used within ErpCrmProvider");
    return context;
};

export const ErpCrmProvider = ({ children }) => {
const { user, earnCredits } = useAuth();
    
    const [erpProducts, setErpProducts] = useState(() => {
        const saved = localStorage.getItem('arena_erp_products');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Ensure all initial items exist in saved
            return [...initialInventory.filter(init => !parsed.find(s => s.id === init.id)), ...parsed];
        }
        return initialInventory;
    });

    const [crmUsers, setCrmUsers] = useState(() => {
        const saved = localStorage.getItem('arena_crm_users');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge with initials (add arenaCredits if missing)
            return initialUsers.map(init => {
                const savedUser = parsed.find(u => u.id === init.id || u.email === init.email);
                return savedUser ? { ...init, ...savedUser, arenaCredits: savedUser.arenaCredits ?? init.arenaCredits } : init;
            }).filter((u, index, arr) => arr.findIndex(v => v.id === u.id) === index); // unique by id
        }
        return initialUsers.map(u => ({ ...u, arenaCredits: u.arenaCredits || 0 }));
    });

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('arena_transactions');
        if (saved) return JSON.parse(saved);
        return initialOrders;
    });

    const [crmComplaints, setCrmComplaints] = useState(() => {
        const saved = localStorage.getItem('arena_crm_complaints');
        if (saved) return JSON.parse(saved);
        return [
            { id: 't1', user: 'Alice Smith', email: 'alice@example.com', issue: 'Package arrived entirely damaged. Need replacement ASAP.', status: 'Open', date: new Date(Date.now() - 86400000 * 2).toLocaleDateString() },
            { id: 't2', user: 'Bob Johnson', email: 'bob@example.com', issue: 'I ordered a size M, but I received XL.', status: 'In Progress', date: new Date(Date.now() - 86400000).toLocaleDateString() },
            { id: 't3', user: 'Diana Prince', email: 'diana@example.com', issue: 'Payment was deducted twice from my account.', status: 'Resolved', date: new Date().toLocaleDateString() },
        ];
    });

    const resolveComplaint = (id) => {
        setCrmComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
    };

    useEffect(() => {
        localStorage.setItem('arena_erp_products', JSON.stringify(erpProducts));
        localStorage.setItem('arena_crm_users', JSON.stringify(crmUsers));
        localStorage.setItem('arena_transactions', JSON.stringify(transactions));
        localStorage.setItem('arena_crm_complaints', JSON.stringify(crmComplaints));
    }, [erpProducts, crmUsers, transactions, crmComplaints]);

    // Make sure logged in user exists in CRM + sync arenaCredits
    useEffect(() => {
        if (user && user.email) {
            setCrmUsers(prev => {
                const userIndex = prev.findIndex(u => u.email === user.email);
                if (userIndex >= 0) {
                    const updatedUser = { ...prev[userIndex], arenaCredits: user.arenaCredits || 0 };
                    const next = [...prev];
                    next[userIndex] = updatedUser;
                    return next;
                } else {
                    return [...prev, { 
                        id: `u_${Date.now()}`, 
                        name: user.name || 'User', 
                        email: user.email, 
                        total_spent: 0,
                        arenaCredits: user.arenaCredits || 0,
                        role: user.role || 'user'
                    }];
                }
            });
        }
    }, [user]);

    // Used by internal Dashboard
    const executeManualOrder = (userId, productId, quantity = 1) => {
        const userIndex = crmUsers.findIndex(u => u.id === userId);
        const productIndex = erpProducts.findIndex(p => p.id === productId);
        
        if (userIndex === -1 || productIndex === -1) return false;
        
        const customer = crmUsers[userIndex];
        const product = erpProducts[productIndex];
        
        if (product.stock_count < quantity) return false;

        setErpProducts(prev => {
            const next = [...prev];
            next[productIndex] = { ...product, stock_count: product.stock_count - quantity };
            return next;
        });

        const totalAmount = product.price * quantity;

        setCrmUsers(prev => {
            const next = [...prev];
            next[userIndex] = { ...customer, total_spent: customer.total_spent + totalAmount };
            return next;
        });

        setTransactions(prev => [{
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            timestamp: new Date().toLocaleTimeString(),
            user: customer.name,
            product: `${quantity}x ${product.name}`,
            amount: totalAmount,
            action: 'Manual Integrated Order Execution'
        }, ...prev]);

        return true;
    };

    const restockProduct = (productId, amount = 10) => {
        const productIndex = erpProducts.findIndex(p => p.id === productId);
        if (productIndex === -1) return false;
        
        const product = erpProducts[productIndex];

        setErpProducts(prev => {
            const next = [...prev];
            next[productIndex] = { ...product, stock_count: product.stock_count + amount };
            return next;
        });

        setTransactions(prev => [{
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            timestamp: new Date().toLocaleTimeString(),
            user: 'System Auto-Procurement',
            product: `${amount}x ${product.name}`,
            amount: 0,
            action: 'ERP Inventory Restock'
        }, ...prev]);

        return true;
    };

    // NEW: Admin inventory management
    const addInventoryItem = (newItem) => {
        const item = {
            ...newItem,
            id: `inv_${Date.now()}`,
            low_threshold: newItem.low_threshold || 5,
            stock_count: newItem.stock_count || 0
        };
        setErpProducts(prev => {
            const next = [...prev, item];
            localStorage.setItem('arena_erp_products', JSON.stringify(next));
            return next;
        });
        setTransactions(prev => [{
            id: `add_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            user: 'Admin',
            product: newItem.name,
            amount: 0,
            action: 'Added New Inventory Item'
        }, ...prev]);
        return true;
    };

    const deleteInventoryItem = (id) => {
        setErpProducts(prev => {
            const next = prev.filter(p => p.id !== id);
            localStorage.setItem('arena_erp_products', JSON.stringify(next));
            return next;
        });
        setTransactions(prev => [{
            id: `del_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            user: 'Admin',
            product: 'Inventory Item',
            amount: 0,
            action: `Deleted Inventory ID: ${id}`
        }, ...prev]);
        return true;
    };

    const updateInventoryStock = (id, newStock) => {
        const productIndex = erpProducts.findIndex(p => p.id === id);
        if (productIndex === -1) return false;
        setErpProducts(prev => {
            const next = [...prev];
            next[productIndex].stock_count = Math.max(0, newStock);
            localStorage.setItem('arena_erp_products', JSON.stringify(next));
            return next;
        });
        return true;
    };

    // Used by Checkout Flow
    const processCartCheckout = (userEmail, userName, cartItems, cartTotal) => {
        let crmUser = crmUsers.find(u => u.email === userEmail);
        
        setCrmUsers(prev => {
            let next = [...prev];
            const userIndex = next.findIndex(u => u.email === userEmail);
            
            if (userIndex >= 0) {
                next[userIndex].total_spent += cartTotal;
                crmUser = next[userIndex];
            } else {
                crmUser = { 
                    id: `u_${Date.now()}`, 
                    name: userName || 'Guest User', 
                    email: userEmail, 
                    total_spent: cartTotal 
                };
                next.push(crmUser);
            }
            earnCredits?.(cartTotal);
            return next;
        });

        setErpProducts(prev => {
            const next = [...prev];
            cartItems.forEach(cartItem => {
                const pIndex = next.findIndex(p => p.id === cartItem.id);
                if (pIndex >= 0) {
                    next[pIndex].stock_count = Math.max(0, next[pIndex].stock_count - cartItem.quantity);
                }
            });
            return next;
        });

        setTransactions(prev => [{
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            timestamp: new Date().toLocaleTimeString(),
            user: crmUser?.name || userName || 'Guest User',
            product: `${cartItems.length} items from Cart`,
            amount: cartTotal,
            action: 'Store Cart Checkout'
        }, ...prev]);
    };

    return (
        <ErpCrmContext.Provider value={{ 
            erpProducts, 
            crmUsers, 
            transactions, 
            crmComplaints,
            executeManualOrder, 
            processCartCheckout,
            restockProduct,
            addInventoryItem,
            deleteInventoryItem,
            updateInventoryStock,
            resolveComplaint 
        }}>
            {children}
        </ErpCrmContext.Provider>
    );
};
