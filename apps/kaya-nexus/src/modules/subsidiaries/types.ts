/**
 * Types communs pour les filiales de KK Holding.
 * @module Modules/Subsidiaries/Types
 */

/**
 * Identifiants des filiales de KK Holding.
 */
export enum SubsidiaryId {
  // Gestion de carrière musicale 360°
  SEVEN_K = 'seven_k',
  
  // Hub business management
  KEOPS = 'keops',
  
  // IA & SaaS pour créateurs
  KOPILOT = 'kopilot',
  
  // Incubateur + lieu physique
  KLHUB = 'klhub',
  
  // Édition, droits, structuration
  KAPITAL = 'kapital',
  
  // Média & agence de com
  KIOSQUE = 'kiosque',
  
  // Label textile éthique & créatif
  LIFEY = 'lifey',
  
  // Bien-être & transformation personnelle
  OLYNEA = 'olynea',
  
  // Séjours immersifs culturels
  EVARY = 'evary',
  
  // Mobilité douce en Guadeloupe
  NEW_WAY = 'new_way',
  
  // Onglerie créative & formation
  BY_JADE = 'by_jade',
  
  // Danse & expression corporelle
  BIG_ART = 'big_art',
}

/**
 * Interface de base pour une filiale.
 */
export interface Subsidiary {
  /**
   * Identifiant unique de la filiale
   */
  id: SubsidiaryId;
  
  /**
   * Nom complet de la filiale
   */
  name: string;
  
  /**
   * Description courte de la filiale
   */
  shortDescription: string;
  
  /**
   * Description détaillée de la filiale
   */
  description: string;
  
  /**
   * Nom du CEO/Responsable de la filiale
   */
  leader: string;
  
  /**
   * URL du logo de la filiale
   */
  logoUrl: string;
  
  /**
   * Couleur principale de la filiale (code hexadécimal)
   */
  primaryColor: string;
  
  /**
   * Couleur secondaire de la filiale (code hexadécimal)
   */
  secondaryColor: string;
  
  /**
   * Couleur d'accent de la filiale (code hexadécimal)
   */
  accentColor: string;
  
  /**
   * Icône représentative de la filiale
   */
  icon: string;
  
  /**
   * Tags/mots-clés associés à la filiale
   */
  tags: string[];
  
  /**
   * Date de création de la filiale
   */
  createdAt: Date;
  
  /**
   * Statut de la filiale (actif, en développement, etc.)
   */
  status: SubsidiaryStatus;
  
  /**
   * Permissions requises pour accéder à cette filiale
   */
  requiredPermissions: string[];
}

/**
 * Statuts possibles pour une filiale.
 */
export enum SubsidiaryStatus {
  ACTIVE = 'active',
  DEVELOPMENT = 'development',
  PLANNING = 'planning',
  INACTIVE = 'inactive',
}

/**
 * Interface pour les métriques de performance d'une filiale.
 */
export interface SubsidiaryMetrics {
  /**
   * Identifiant de la filiale
   */
  subsidiaryId: SubsidiaryId;
  
  /**
   * Revenus mensuels
   */
  monthlyRevenue: number;
  
  /**
   * Nombre de clients actifs
   */
  activeClients: number;
  
  /**
   * Nombre de projets en cours
   */
  activeProjects: number;
  
  /**
   * Taux de satisfaction client (0-100)
   */
  satisfactionRate: number;
  
  /**
   * Taux de croissance mensuel (%)
   */
  growthRate: number;
  
  /**
   * Coûts opérationnels mensuels
   */
  monthlyCosts: number;
  
  /**
   * Marge brute (%)
   */
  grossMargin: number;
  
  /**
   * Période de la métrique (mois/année)
   */
  period: string;
}

/**
 * Interface pour un projet au sein d'une filiale.
 */
export interface SubsidiaryProject {
  /**
   * Identifiant unique du projet
   */
  id: string;
  
  /**
   * Identifiant de la filiale
   */
  subsidiaryId: SubsidiaryId;
  
  /**
   * Nom du projet
   */
  name: string;
  
  /**
   * Description du projet
   */
  description: string;
  
  /**
   * Statut du projet
   */
  status: ProjectStatus;
  
  /**
   * Date de début du projet
   */
  startDate: Date;
  
  /**
   * Date de fin prévue du projet
   */
  endDate: Date | null;
  
  /**
   * Budget alloué au projet
   */
  budget: number;
  
  /**
   * Dépenses actuelles du projet
   */
  expenses: number;
  
  /**
   * Responsable du projet
   */
  manager: string;
  
  /**
   * Membres de l'équipe du projet
   */
  teamMembers: string[];
  
  /**
   * Tâches associées au projet
   */
  tasks: ProjectTask[];
  
  /**
   * Jalons du projet
   */
  milestones: ProjectMilestone[];
}

/**
 * Statuts possibles pour un projet.
 */
export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

/**
 * Interface pour une tâche de projet.
 */
export interface ProjectTask {
  /**
   * Identifiant unique de la tâche
   */
  id: string;
  
  /**
   * Nom de la tâche
   */
  name: string;
  
  /**
   * Description de la tâche
   */
  description: string;
  
  /**
   * Statut de la tâche
   */
  status: TaskStatus;
  
  /**
   * Assigné à
   */
  assignee: string;
  
  /**
   * Date d'échéance
   */
  dueDate: Date | null;
  
  /**
   * Priorité de la tâche
   */
  priority: TaskPriority;
}

/**
 * Statuts possibles pour une tâche.
 */
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done',
  BLOCKED = 'blocked',
}

/**
 * Priorités possibles pour une tâche.
 */
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

/**
 * Interface pour un jalon de projet.
 */
export interface ProjectMilestone {
  /**
   * Identifiant unique du jalon
   */
  id: string;
  
  /**
   * Nom du jalon
   */
  name: string;
  
  /**
   * Description du jalon
   */
  description: string;
  
  /**
   * Date d'échéance
   */
  dueDate: Date;
  
  /**
   * Statut du jalon
   */
  status: MilestoneStatus;
}

/**
 * Statuts possibles pour un jalon.
 */
export enum MilestoneStatus {
  UPCOMING = 'upcoming',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  MISSED = 'missed',
}

/**
 * Interface pour les paramètres de filtrage des filiales.
 */
export interface SubsidiaryFilterParams {
  /**
   * Filtre par statut
   */
  status?: SubsidiaryStatus;
  
  /**
   * Filtre par tag
   */
  tag?: string;
  
  /**
   * Recherche textuelle
   */
  search?: string;
  
  /**
   * Trier par champ
   */
  sortBy?: 'name' | 'createdAt' | 'status';
  
  /**
   * Ordre de tri
   */
  sortOrder?: 'asc' | 'desc';
}
