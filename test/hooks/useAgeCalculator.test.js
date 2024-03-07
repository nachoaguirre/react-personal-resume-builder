import { describe, expect, it, afterEach, beforeEach, vi } from 'vitest';
import { useAgeCalculator } from '../../src/hooks/useAgeCalculator';

describe('useAgeCalculator tests', () => {

    const { calculateAge } = useAgeCalculator();

    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns correct age', () => {
        const date = new Date(2024, 3, 1);
        vi.setSystemTime(date)

        const age = calculateAge('1990-01-01');
        expect(age).toBe(34);
    });

    it('returns empty if birthday is not set', () => {
        const age = calculateAge();
        expect(age).toBe('');
    });

    it('returns empty if birthday is not a string', () => {
        const age = calculateAge(1900);
        expect(age).toBe('');
    });

    it('returns empty if any part is not a number', () => {
        const age = calculateAge('1900-text-01');
        expect(age).toBe('');
    });

    it('it returns empty if date is invalid', () => {
        const age = calculateAge('1900-14-40');
        expect(age).toBe('');
    });

    it('decreases age if current month is before birth month', () => {
        const currentDate = new Date(2024, 2, 1);
        vi.setSystemTime(currentDate);

        const birthdate = '2000-04-01';
        const age = calculateAge(birthdate);

        const expectedAge = (currentDate.getFullYear() - 2000) - 1;
        expect(age).toBe(expectedAge);
    });

    it('decreases age if current month is the same as birth month but current day is before birth day', () => {
        const currentDate = new Date(2024, 3, 1);
        vi.setSystemTime(currentDate);

        const birthdate = '2000-04-15';
        const age = calculateAge(birthdate);

        const expectedAge = (currentDate.getFullYear() - 2000) - 1;
        expect(age).toBe(expectedAge);
    });
})
