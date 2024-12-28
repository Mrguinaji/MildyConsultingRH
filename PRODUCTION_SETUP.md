# Guide de Mise en Production - Mildy Consulting RH

## 1. Configuration de Stripe

### 1.1 Clés API Stripe
- [ ] Remplacer les clés de test Stripe par les clés de production dans `.env.local` :
  ```
  STRIPE_SECRET_KEY=sk_live_votre_cle_secrete
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_votre_cle_publique
  ```

### 1.2 Webhooks Stripe
- [ ] Configurer le webhook Stripe en production :
  1. Aller sur https://dashboard.stripe.com/webhooks
  2. Cliquer sur "Ajouter un endpoint"
  3. Entrer l'URL : `https://mildyconsulting.com/api/webhook`
  4. Sélectionner les événements :
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.failed`
  5. Copier la clé de signature webhook
  6. Ajouter la clé dans `.env.local` :
     ```
     STRIPE_WEBHOOK_SECRET=whsec_votre_cle_webhook
     ```

## 2. Configuration des Emails (Resend)

### 2.1 Configuration du Domaine
- [ ] Configurer le domaine sur Resend :
  1. Aller sur https://dashboard.resend.com
  2. Ajouter le domaine `mildyconsulting.com`
  3. Configurer les enregistrements DNS selon les instructions
  4. Vérifier le domaine

### 2.2 Mise à jour des Emails
- [ ] Mettre à jour l'adresse d'expédition dans `lib/email.ts` :
  ```typescript
  from: 'Mildy Consulting RH <reservation@mildyconsulting.com>'
  ```
- [ ] Remplacer la clé API Resend de test par celle de production dans `.env.local` :
  ```
  RESEND_API_KEY=re_votre_cle_production
  ```

## 3. Configuration de l'Application

### 3.1 Variables d'Environnement
- [ ] Mettre à jour l'URL de base dans `.env.local` :
  ```
  NEXT_PUBLIC_BASE_URL=https://mildyconsulting.com
  ```

### 3.2 Vérifications de Sécurité
- [ ] Vérifier que toutes les clés API sont sécurisées
- [ ] S'assurer que les clés de test ne sont pas présentes dans le code
- [ ] Vérifier que les webhooks sont correctement sécurisés

## 4. Déploiement

### 4.1 Build et Déploiement
- [ ] Exécuter un build de production :
  ```bash
  npm run build
  ```
- [ ] Vérifier qu'il n'y a pas d'erreurs de build
- [ ] Déployer sur votre hébergeur (Vercel recommandé)

### 4.2 Configuration DNS
- [ ] Configurer les enregistrements DNS pour votre domaine
- [ ] Activer et configurer SSL/HTTPS

## 5. Tests en Production

### 5.1 Tests Fonctionnels
- [ ] Tester le processus de réservation complet
- [ ] Vérifier la réception des emails
- [ ] Tester les paiements avec une vraie carte
- [ ] Vérifier les webhooks Stripe
- [ ] Tester les pages de succès et d'échec

### 5.2 Vérifications de Performance
- [ ] Vérifier les temps de chargement
- [ ] Tester sur différents appareils et navigateurs
- [ ] Vérifier la réactivité du site

## 6. Monitoring et Maintenance

### 6.1 Mise en Place du Monitoring
- [ ] Configurer les alertes Stripe pour les paiements échoués
- [ ] Mettre en place la surveillance des erreurs (ex: Sentry)
- [ ] Configurer le monitoring des performances

### 6.2 Sauvegarde et Sécurité
- [ ] Mettre en place une stratégie de sauvegarde
- [ ] Documenter les procédures de récupération
- [ ] Planifier les mises à jour régulières

## 7. Documentation

### 7.1 Documentation Technique
- [ ] Documenter les endpoints API
- [ ] Documenter les webhooks
- [ ] Documenter les procédures de déploiement

### 7.2 Documentation Utilisateur
- [ ] Créer un guide d'utilisation pour l'équipe
- [ ] Documenter les procédures de support
- [ ] Créer des FAQ pour les clients

## 8. Support et Contact

### 8.1 Mise en Place du Support
- [ ] Configurer les emails de support
- [ ] Établir les procédures de support
- [ ] Former l'équipe sur les outils

### 8.2 Communication
- [ ] Préparer les modèles d'email pour différentes situations
- [ ] Établir les procédures de communication en cas de problème
- [ ] Documenter les contacts d'urgence

## Notes Importantes

1. **Sécurité** : Ne jamais exposer les clés API ou secrets dans le code public
2. **Tests** : Toujours tester en production avec de petites transactions avant le lancement complet
3. **Backups** : Maintenir des sauvegardes régulières des configurations
4. **Monitoring** : Surveiller activement les transactions et les erreurs
5. **Support** : Avoir un plan de support clair pour les problèmes courants 