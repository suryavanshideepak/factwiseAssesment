export function getAgeOfCelebrities(dob: string): string {
    const birthDate = new Date(dob);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  }

export function capitalizeFLetter(letter:string) {
    let data = letter[0].toUpperCase() + letter.slice(1);
    return data
}