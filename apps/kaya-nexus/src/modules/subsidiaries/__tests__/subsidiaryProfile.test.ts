/**
 * Tests pour le module subsidiaryProfile
 */
import { describe, it, expect } from '@jest/globals';
import { subsidiaryProfileSchema, isSubsidiaryProfile, SubsidiaryProfile } from '../subsidiaryProfile';

describe('Module subsidiaries - SubsidiaryProfile', () => {
  describe('subsidiaryProfileSchema', () => {
    it('valide un profil de filiale valide', () => {
      const validProfile = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Format UUID valide
        name: 'Filiale Test',
        country: 'FR',
        siret: '12345678901234', // Exactement 14 caractères
        createdAt: '2023-04-21T14:30:00Z', // Format date-time valide
        active: true
      };
      
      const result = subsidiaryProfileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('rejette un profil de filiale avec un ID invalide', () => {
      const invalidProfile = {
        id: 'not-a-uuid', // Pas un UUID valide
        name: 'Filiale Test',
        country: 'FR',
        siret: '12345678901234',
        createdAt: '2023-04-21T14:30:00Z',
        active: true
      };
      
      const result = subsidiaryProfileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it('rejette un profil de filiale avec un SIRET incorrect', () => {
      const invalidProfile = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Filiale Test',
        country: 'FR',
        siret: '123456', // Moins de 14 caractères
        createdAt: '2023-04-21T14:30:00Z',
        active: true
      };
      
      const result = subsidiaryProfileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it('rejette un profil de filiale avec un format de date invalide', () => {
      const invalidProfile = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Filiale Test',
        country: 'FR',
        siret: '12345678901234',
        createdAt: '2023-04-21', // Format date invalide (pas de partie heure)
        active: true
      };
      
      const result = subsidiaryProfileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
    });

    it('applique la valeur par défaut pour active si non fournie', () => {
      const profileWithoutActive = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Filiale Test',
        country: 'FR',
        siret: '12345678901234',
        createdAt: '2023-04-21T14:30:00Z'
        // active non fourni
      };
      
      const result = subsidiaryProfileSchema.parse(profileWithoutActive);
      expect(result.active).toBe(true); // Devrait utiliser la valeur par défaut
    });
  });

  describe('isSubsidiaryProfile', () => {
    it('retourne true pour un profil de filiale valide', () => {
      const validProfile = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Filiale Test',
        country: 'FR',
        siret: '12345678901234',
        createdAt: '2023-04-21T14:30:00Z',
        active: true
      };
      
      expect(isSubsidiaryProfile(validProfile)).toBe(true);
    });

    it('retourne false pour un profil de filiale invalide', () => {
      const invalidProfile = {
        name: 'Filiale Test'
        // Manque des champs obligatoires
      };
      
      expect(isSubsidiaryProfile(invalidProfile)).toBe(false);
    });

    it('retourne false pour des valeurs non-objet', () => {
      expect(isSubsidiaryProfile(null)).toBe(false);
      expect(isSubsidiaryProfile(undefined)).toBe(false);
      expect(isSubsidiaryProfile('not an object')).toBe(false);
      expect(isSubsidiaryProfile(123)).toBe(false);
    });
  });

  describe('Type SubsidiaryProfile', () => {
    it('a le bon type inféré depuis le schéma Zod', () => {
      // Test de vérification de type, pas d'assertions runtime
      const profile: SubsidiaryProfile = {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Filiale Test',
        country: 'FR',
        siret: '12345678901234',
        createdAt: '2023-04-21T14:30:00Z',
        active: true
      };
      
      // Si ce code compile, le type est correct
      expect(typeof profile).toBe('object');
      expect(profile.id).toBeDefined();
      expect(profile.name).toBeDefined();
      expect(profile.country).toBeDefined();
      expect(profile.siret).toBeDefined();
      expect(profile.createdAt).toBeDefined();
      expect(profile.active).toBeDefined();
    });
  });
});
