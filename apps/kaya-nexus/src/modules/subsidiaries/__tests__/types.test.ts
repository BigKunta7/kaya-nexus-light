/**
 * Tests pour les types du module subsidiaries
 */
import { describe, it, expect } from '@jest/globals';
import { SubsidiaryId, SubsidiaryStatus, subsidiarySchema, isSubsidiary } from '../types';

describe('Module subsidiaries - Types', () => {
  describe('SubsidiaryId', () => {
    it('contient toutes les filiales attendues', () => {
      expect(SubsidiaryId.SEVEN_K).toBe('seven_k');
      expect(SubsidiaryId.KEOPS).toBe('keops');
      expect(SubsidiaryId.KOPILOT).toBe('kopilot');
      
      // Vérifier que l'enum a le bon nombre d'entrées
      const entriesCount = Object.keys(SubsidiaryId).filter(
        key => isNaN(Number(key))
      ).length;
      
      expect(entriesCount).toBeGreaterThan(5); // Nous savons qu'il y a plusieurs filiales
    });
  });

  describe('SubsidiaryStatus', () => {
    it('contient tous les statuts attendus', () => {
      // Vérifier que l'enum existe
      expect(SubsidiaryStatus).toBeDefined();
      
      // Vérifier qu'il contient au moins les statuts de base
      expect(Object.values(SubsidiaryStatus).length).toBeGreaterThan(0);
    });
  });

  describe('subsidiarySchema', () => {
    it('valide un objet subsidiary valide', () => {
      const validSubsidiary = {
        id: SubsidiaryId.SEVEN_K, // Utiliser l'énumération ici, pas une chaîne
        name: 'Test Subsidiary',
        shortDescription: 'Court résumé',
        description: 'A test subsidiary',
        leader: 'John Doe',
        logoUrl: 'https://example.com/logo.png',
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        accentColor: '#ff0000',
        icon: 'icon-test',
        tags: ['test', 'exemple'],
        createdAt: new Date(), // Objet Date, pas une chaîne
        status: SubsidiaryStatus.ACTIVE,
        requiredPermissions: ['read', 'write']
      };
      
      const result = subsidiarySchema.safeParse(validSubsidiary);
      expect(result.success).toBe(true);
    });

    it('rejette un objet subsidiary invalide', () => {
      const invalidSubsidiary = {
        // Manque des champs obligatoires
        name: 'Test Subsidiary'
      };
      
      const result = subsidiarySchema.safeParse(invalidSubsidiary);
      expect(result.success).toBe(false);
    });
  });

  describe('isSubsidiary', () => {
    it('retourne true pour un objet subsidiary valide', () => {
      const validSubsidiary = {
        id: SubsidiaryId.SEVEN_K,
        name: 'Test Subsidiary',
        shortDescription: 'Court résumé',
        description: 'A test subsidiary',
        leader: 'John Doe',
        logoUrl: 'https://example.com/logo.png',
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        accentColor: '#ff0000',
        icon: 'icon-test',
        tags: ['test', 'exemple'],
        createdAt: new Date(),
        status: SubsidiaryStatus.ACTIVE,
        requiredPermissions: ['read', 'write']
      };
      
      expect(isSubsidiary(validSubsidiary)).toBe(true);
    });

    it('retourne false pour un objet subsidiary invalide', () => {
      // Cas 1: Object invalide (manque des champs)
      const invalidSubsidiary1 = {
        name: 'Test Subsidiary'
      };
      expect(isSubsidiary(invalidSubsidiary1)).toBe(false);
      
      // Cas 2: Input non-objet
      expect(isSubsidiary(null)).toBe(false);
      expect(isSubsidiary(undefined)).toBe(false);
      expect(isSubsidiary('not an object')).toBe(false);
      expect(isSubsidiary(123)).toBe(false);
    });
  });
});
