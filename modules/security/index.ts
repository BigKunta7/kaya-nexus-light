/**
 * Module Sécurité Kaya Nexus
 * Auth, permissions, audit, chiffrement.
 * @module security
 */
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function encryptData(data: string, secret = 'kaya-secret') {
  const cipher = crypto.createCipher('aes-256-cbc', secret);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function checkPermission(user: { role: string }, action: string) {
  // TODO: Vérifier selon la matrice de permissions
  return user.role === 'admin';
}
