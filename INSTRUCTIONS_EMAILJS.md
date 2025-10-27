# Configuration EmailJS pour le Formulaire de Contact

## Étapes à suivre pour activer l'envoi d'emails

### 1. Créer un compte EmailJS (GRATUIT)
- Aller sur https://www.emailjs.com/
- Créer un compte gratuit (100 emails/mois inclus)
- Se connecter au tableau de bord

### 2. Configurer le service email
- Dans le tableau de bord, aller dans "Email Services"
- Cliquer sur "Add New Service"
- Choisir votre fournisseur email (Gmail, Outlook, etc.)
- Suivre les instructions pour connecter votre compte email

### 3. Créer un template d'email
- Aller dans "Email Templates"
- Cliquer sur "Create New Template"
- Utiliser ce contenu pour le template :

**Sujet :** Nouveau message de contact - {{subject}}

**Corps du message :**
```
Nouveau message reçu depuis le site web Trans Global Express

Nom: {{from_name}}
Téléphone: {{from_phone}}
Sujet: {{subject}}

Message:
{{message}}

---
Ce message a été envoyé automatiquement depuis le formulaire de contact du site web.
```

### 4. Récupérer les identifiants
Après configuration, vous aurez besoin de :
- **Service ID** : Trouvé dans "Email Services"
- **Template ID** : Trouvé dans "Email Templates"  
- **Public Key** : Trouvé dans "Account" > "General"

### 5. Mettre à jour le code
Dans le fichier `js/main.js`, remplacer :
- `YOUR_PUBLIC_KEY` par votre clé publique
- `YOUR_SERVICE_ID` par votre ID de service
- `YOUR_TEMPLATE_ID` par votre ID de template

### 6. Variables du template
Assurez-vous que votre template EmailJS utilise ces variables :
- `{{from_name}}` - Nom du contact
- `{{from_phone}}` - Téléphone du contact
- `{{subject}}` - Sujet du message
- `{{message}}` - Message du contact
- `{{to_email}}` - Email de destination (contact@transglobalexpress-dz.com)

## Coût et limitations

### Plan Gratuit EmailJS :
- ✅ 100 emails par mois
- ✅ Parfait pour un site vitrine
- ✅ Pas de carte de crédit requise
- ✅ Support de base

### Si vous dépassez 100 emails/mois :
- Plan Personal : 5$/mois (1000 emails)
- Plan Professional : 15$/mois (10000 emails)

## Test du formulaire
Une fois configuré :
1. Remplir le formulaire sur le site
2. Vérifier que l'email arrive dans contact@transglobalexpress-dz.com
3. Vérifier les logs dans la console du navigateur

## Support
En cas de problème :
- Documentation EmailJS : https://www.emailjs.com/docs/
- Support EmailJS : support@emailjs.com