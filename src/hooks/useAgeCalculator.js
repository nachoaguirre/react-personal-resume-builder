export const useAgeCalculator = () => {
    const calculateAge = (birthdate) => {
        if (typeof birthdate !== 'string') return '';

        const birthDate = new Date(birthdate);

        if (isNaN(birthDate.getTime())) return '';

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    return {
        calculateAge
    }
}