export const validationUtils = {
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  
    isValidCreditCard(number) {
      // Basic Luhn algorithm implementation
      const digits = number.replace(/\D/g, '');
      if (digits.length !== 16) return false;
      
      let sum = 0;
      let isEven = false;
      
      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);
        
        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        
        sum += digit;
        isEven = !isEven;
      }
      
      return sum % 10 === 0;
    },
  
    isValidPhone(phone) {
      const phoneRegex = /^\+?1?\d{10}$/;
      return phoneRegex.test(phone.replace(/\D/g, ''));
    }
  };