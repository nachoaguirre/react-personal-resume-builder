import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAnimations } from '../../src/hooks/useAnimations';

describe('useAnimations tests', () => {
    const { result } = renderHook(() => useAnimations());

    it('should create circles style', () => {
        const { createCirclesStyle } = result.current;
        const element = document.createElement('div');
        createCirclesStyle(element, 5);
        expect(element.children.length).toBe(5);
    });

    it('should not create circles if itemsCount is less than or equal to element children length', () => {
        const { createCirclesStyle } = result.current;

        const element = document.createElement('div');
        const child = document.createElement('div');
        element.appendChild(child);

        createCirclesStyle(element, 1);
        expect(element.children.length).toBe(1);
    });

    it('should not create circles if element is not provided', () => {
        const { createCirclesStyle } = result.current;
        createCirclesStyle(null, 5);

    });
})
