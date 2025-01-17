import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";

// Limiter les requêtes
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
  message: "Trop de requêtes, veuillez réessayer plus tard !", // Message d'erreur
  standardHeaders: true, // Retourne les headers standard de ratelimit
  legacyHeaders: false, // Désactive les headers de ratelimit hérités
});

//Limiter spécifquement les requêtes d'authentification

export const authlimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives de connexion
  message: "Trop de tentative de connexion, veuillez réessayer plus tard !", // Message d'erreur
  standardHeaders: true, // Retourne les headers standard de rateLimit
  legacyHeaders: false, // Désactive les headers de rateLimit hérités
});

//Configuration helmet (sécurité des headers HTTP)
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], //Autorise uniquement les sources de la même origine
      scriptSrc: ["'self'", "'unsafe-inline'"], //Autorise les scripts inline
      styleSrc: ["'self'", "'unsafe-inline'"], //Autorise les styles inline
      imgSrc: ["'self'", "data", "https"], //Autorise les images
    },
  },
  crossOriginEmbedderPolicy: true, //Autorise les polices
  crossOriginResourcePolicy: true, //Autorise les ressources cross-origin
  crossOriginOpenerPolicy: true, //Autorise les fenêtres d'ouverture
  dnsPrefetchControl: true, //Autorise les préchargements de DNS
  expectCt: true, //Autorise les contrôles d'attente
  frameguard: true, //Autorise les frames
  noSniff: true, //Autorise les sniffing
  hidePoweredBy: true, //Masque les informations de la version de l'application
  hsts: true, //Autorise les HSTS
  ieNoOpen: true, //Autorise les fichiers
  originAgentCluster: true, //Autorise les clusters d'origine
  permittedCrossDomainPolicies: true, //Autorise les politiques de domaine
  referrerPolicy: true, //Autorise les politiques de référence
  xssFilter: true, //Autorise les filtres XSS
});

export const xssProtection = xss();

export const preventParamPollution = hpp();
