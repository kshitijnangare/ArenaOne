# ArenaOne Inventory & CRM Enhancement TODO

## Approved Plan Steps (Frontend-only, dummyData.js central)

### 1. [x] Update src/data/dummyData.js
   - Add initialInventory[] (merge products + stock)
   - Add initialUsers[] (with pw, arenaCredits, totalSpent)
   - Add initialOrders[]

**Progress: Step 1 ✅ → Step 2**

### 2. [x] Update src/context/ErpCrmContext.jsx
   - Init from dummyData + localStorage merge
   - Add addInventoryItem(), deleteInventoryItem(), updateInventoryStock()
   - Sync arenaCredits in crmUsers

### 4. [x] Update src/pages/admin/AdminInventory.jsx
   - Connect to useErpCrm()
   - Use erpProducts, add/delete/update funcs

**Progress: Step 4 ✅ → Step 3**

### 3. [ ] Update src/context/AuthContext.jsx
   - Use global users from ErpCrm
   - login/register check/add to dummy/global users
   - Persist credits globally

### 4. [ ] Update src/pages/admin/AdminInventory.jsx
   - Connect to useErpCrm()
   - Use erpProducts, add/delete/update funcs

### 5. [ ] Minor updates
   - AdminDashboard.jsx, AdminOrders.jsx if needed (use transactions/crmUsers)

### 6. [ ] Test & Complete
   - Login/buy: inventory--, credits++, orders++
   - Admin: add/delete inventory
   - `npm run dev`
   - attempt_completion

**Progress: Starting Step 1**
