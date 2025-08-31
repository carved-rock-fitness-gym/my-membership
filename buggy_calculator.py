def divide(a, b):
    # BUG: No division by zero check
    return a / b

def calculate_average(numbers):
    # BUG: No empty list check
    return sum(numbers) / len(numbers)

def get_user_input():
    # BUG: No input validation
    return int(input("Enter a number: "))

def main():
    # BUG: No error handling
    x = get_user_input()
    y = get_user_input()
    
    result = divide(x, y)
    print(f"Result: {result}")
    
    numbers = [1, 2, 3, x, y]
    avg = calculate_average(numbers)
    print(f"Average: {avg}")

if __name__ == "__main__":
    main()