function generateStrongPassword(length: number = 12): string {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allChars =
        upperCaseChars + lowerCaseChars + numberChars + specialChars;

    // Ensure the password includes at least one character from each category
    const getRandomChar = (chars: string) =>
        chars[Math.floor(Math.random() * chars.length)];
    let password =
        getRandomChar(upperCaseChars) +
        getRandomChar(lowerCaseChars) +
        getRandomChar(numberChars) +
        getRandomChar(specialChars);

    // Fill the remaining length with random characters from all categories
    for (let i = password.length; i < length; i++) {
        password += getRandomChar(allChars);
    }

    // Shuffle the password to ensure randomness
    password = password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');

    return password;
}

export default generateStrongPassword;
