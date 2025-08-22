// Test file with intentional bugs for Bugbot to detect

class UserManager {
    constructor() {
        this.users = [];
    }

    // Bug 1: Missing null check
    addUser(user) {
        // Should check if user is null/undefined
        this.users.push(user);
        return this.users.length;
    }

    // Bug 2: Potential infinite loop
    findUserById(id) {
        let i = 0;
        while (true) { // This will run forever if user not found
            if (this.users[i] && this.users[i].id === id) {
                return this.users[i];
            }
            i++;
            // Missing break condition for when i >= users.length
        }
    }

    // Bug 3: Memory leak - event listener never removed
    setupUserNotifications(user) {
        const button = document.getElementById('notify-btn');
        button.addEventListener('click', () => {
            console.log(`Notifying user: ${user.name}`);
        });
        // No cleanup/removeEventListener
    }

    // Bug 4: Race condition
    async updateUserAsync(id, newData) {
        const user = this.findUserById(id);
        // Potential race condition - user could be modified between find and update
        await this.delay(100); // Simulate async operation
        user.data = newData; // Could fail if user is null
        return user;
    }

    // Bug 5: Incorrect comparison
    isValidUser(user) {
        return user.age > 0 && user.name = ""; // Assignment instead of comparison
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Bug 6: Unused variable
const unusedVariable = "This will never be used";

// Bug 7: Missing error handling
function parseUserData(jsonString) {
    return JSON.parse(jsonString); // Will throw if jsonString is invalid
}

// Export the class
module.exports = UserManager;