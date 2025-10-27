// ===== SYSTÈME DE TRADUCTION SIMPLE =====

// Langue actuelle
let currentLanguage = 'fr';

// Meta tags pour SEO multilingue
const metaTags = {
    fr: {
        title: 'EURL Trans Global Express - Transport, Fret, Logistique & Entreposage en Algérie',
        description: 'EURL Trans Global Express - Leader du transport, fret, logistique et entreposage en Algérie. Solutions professionnelles pour tous types de marchandises. Entrepôt sécurisé et transport fiable.',
        keywords: 'transport algérie, fret algérie, logistique algérie, entreposage algérie, entrepôt algérie, transport marchandises, livraison algérie, stockage, distribution',
        ogTitle: 'EURL Trans Global Express - Transport, Fret, Logistique & Entreposage',
        ogDescription: 'Leader du transport, fret, logistique et entreposage en Algérie. Solutions professionnelles et fiables.'
    },
    ar: {
        title: 'شركة ترانس جلوبال إكسبريس - النقل والشحن واللوجستيات والتخزين في الجزائر',
        description: 'شركة ترانس جلوبال إكسبريس - رائدة في النقل والشحن واللوجستيات والتخزين في الجزائر. حلول مهنية لجميع أنواع البضائع. مستودع آمن ونقل موثوق.',
        keywords: 'نقل الجزائر, شحن الجزائر, لوجستيات الجزائر, تخزين الجزائر, مستودع الجزائر, نقل البضائع, توصيل الجزائر, تخزين, توزيع',
        ogTitle: 'شركة ترانس جلوبال إكسبريس - النقل والشحن واللوجستيات والتخزين',
        ogDescription: 'رائدة في النقل والشحن واللوجستيات والتخزين في الجزائر. حلول مهنية وموثوقة.'
    },
    en: {
        title: 'EURL Trans Global Express - Transport, Freight, Logistics & Warehousing in Algeria',
        description: 'EURL Trans Global Express - Leader in transport, freight, logistics and warehousing in Algeria. Professional solutions for all types of goods. Secure warehouse and reliable transport.',
        keywords: 'transport algeria, freight algeria, logistics algeria, warehousing algeria, warehouse algeria, goods transport, delivery algeria, storage, distribution',
        ogTitle: 'EURL Trans Global Express - Transport, Freight, Logistics & Warehousing',
        ogDescription: 'Leader in transport, freight, logistics and warehousing in Algeria. Professional and reliable solutions.'
    }
};

// Traductions complètes pour tous les éléments
const translations = {
    fr: {
        // Navigation
        'nav-home': 'Accueil',
        'nav-about': 'À Propos', 
        'nav-services': 'Services',
        'nav-gallery': 'Galerie',
        'nav-reviews': 'Avis',
        'nav-quote': 'Devis',
        'nav-contact': 'Contact',

        // Hero Section
        'hero-title': 'Transport & Logistique',
        'hero-subtitle': 'Professionnels',
        'hero-description': 'Votre partenaire de confiance pour tous vos besoins en transport, fret, logistique et entreposage à travers l\'Algérie. Solutions complètes pour tous types de marchandises.',
        'hero-cta-services': 'Découvrir nos services',
        'hero-cta-contact': 'Nous contacter',

        // About Section
        'about-tag': 'À Propos',
        'about-title': 'Excellence en Transport depuis 2010',
        'about-description': 'Une expertise reconnue au service de vos besoins logistiques',
        'about-mission-title': 'Notre Mission',
        'about-mission-text': 'Fournir des solutions de transport et de logistique innovantes, fiables et adaptées aux besoins spécifiques de chaque client en Algérie.',
        'about-vision-title': 'Notre Vision',
        'about-vision-text': 'Devenir le leader incontournable du transport et de la logistique en Algérie, reconnu pour notre excellence et notre innovation.',
        'about-values-title': 'Nos Valeurs',
        'about-values-text': 'Fiabilité, professionnalisme, innovation et respect de l\'environnement guident chacune de nos actions au quotidien.',
        'about-commitment-title': 'Notre Engagement',
        'about-commitment-text': 'Garantir la satisfaction client à 100% avec des délais respectés et une sécurité maximale de vos marchandises.',
        'about-timeline-title': 'Notre Histoire',
        'about-timeline-2010-title': 'Création de l\'entreprise',
        'about-timeline-2010-text': 'Lancement avec 3 véhicules et une équipe de 5 personnes',
        'about-timeline-2015-title': 'Expansion régionale',
        'about-timeline-2015-text': 'Ouverture de 3 nouveaux entrepôts et extension de la flotte',
        'about-timeline-2020-title': 'Digitalisation',
        'about-timeline-2020-text': 'Mise en place du système de suivi en temps réel',
        'about-timeline-2024-title': 'Leader du marché',
        'about-timeline-2024-text': 'Plus de 500 clients et 50 véhicules à travers l\'Algérie',
        'about-stats-clients': 'Clients Satisfaits',
        'about-stats-experience': 'Années d\'Expérience',
        'about-stats-vehicles': 'Véhicules',
        'about-stats-warehouses': 'Entrepôts',

        // Services Section
        'services-tag': 'Services',
        'services-title': 'Nos Solutions Logistiques Complètes',
        'services-description': 'Transport, fret, logistique et entreposage - Des solutions complètes et personnalisées pour tous vos besoins de transport et stockage de marchandises',
        'services-road-title': 'Transport Routier',
        'services-road-description': 'Transport de marchandises sur tout le territoire algérien avec notre flotte moderne et sécurisée.',
        'services-road-feature1': 'Livraison express',
        'services-road-feature2': 'Suivi en temps réel',
        'services-road-feature3': 'Assurance complète',
        'services-warehouse-title': 'Entreposage & Stockage',
        'services-warehouse-description': 'Solutions d\'entreposage et stockage sécurisées avec gestion informatisée des stocks et préparation de commandes. Entrepôts modernes pour tous types de marchandises.',
        'services-warehouse-feature1': 'Stockage sécurisé',
        'services-warehouse-feature2': 'Gestion des stocks',
        'services-warehouse-feature3': 'Préparation commandes',
        'services-air-title': 'Fret Aérien International',
        'services-air-description': 'Services de fret aérien rapide pour vos envois urgents vers l\'international. Transport aérien sécurisé avec suivi complet de vos marchandises.',
        'services-air-feature1': 'Livraison rapide',
        'services-air-feature2': 'International',
        'services-air-feature3': 'Suivi complet',
        'services-sea-title': 'Fret Maritime & Logistique',
        'services-sea-description': 'Solutions de fret maritime économiques pour vos expéditions avec gestion complète des formalités logistiques. Transport maritime pour gros volumes de marchandises.',
        'services-sea-feature1': 'Solution économique',
        'services-sea-feature2': 'Gros volumes',
        'services-sea-feature3': 'Formalités incluses',

        // Gallery Section
        'gallery-tag': 'Galerie',
        'gallery-title': 'Notre Flotte & Installations',
        'gallery-description': 'Découvrez notre équipement moderne et nos installations de pointe',
        'gallery-filters-all': 'Tout Voir',
        'gallery-filters-trucks': 'Véhicules',
        'gallery-filters-warehouses': 'Entrepôts',
        'gallery-filters-logistics': 'Logistique',
        'gallery-filters-projects': 'Projets',

        // Testimonials Section
        'testimonials-tag': 'Témoignages',
        'testimonials-title': 'Ce que disent nos clients',
        'testimonials-description': 'La satisfaction de nos clients est notre priorité absolue',
        'testimonials-stats-satisfaction': '% Satisfaction',
        'testimonials-stats-rating': 'Note Moyenne',
        'testimonials-stats-reviews': 'Avis Clients',
        'testimonials-stats-loyalty': '% Clients Fidèles',
        'testimonials-add-review-title': 'Partagez votre expérience',
        'testimonials-add-review-description': 'Vous avez utilisé nos services ? Laissez-nous votre avis !',
        'testimonials-add-review-button': 'Laisser un Avis',

        // Quote Section
        'quote-tag': 'Devis Gratuit',
        'quote-title': 'Obtenez votre devis personnalisé',
        'quote-subtitle': 'Remplissez notre formulaire pour recevoir une estimation rapide et précise',
        'quote-features-fast-response-title': 'Réponse Rapide',
        'quote-features-fast-response-description': 'Devis sous 24h maximum',
        'quote-features-competitive-rates-title': 'Tarifs Compétitifs',
        'quote-features-competitive-rates-description': 'Les meilleurs prix du marché',
        'quote-features-no-commitment-title': 'Sans Engagement',
        'quote-features-no-commitment-description': 'Devis gratuit et sans obligation',

        // Contact Section
        'contact-tag': 'Contact',
        'contact-title': 'Contactez-nous',
        'contact-subtitle': 'Notre équipe est à votre disposition pour répondre à toutes vos questions',
        'contact-address-title': 'Adresse Principale',
        'contact-address-line1': 'Zone Industrielle Rouiba<br>16012 Alger, Algérie',
        'contact-address-copy': 'Copier l\'adresse',
        'contact-phone-title': 'Téléphone',
        'contact-phone-call': 'Appeler maintenant',
        'contact-email-title': 'Email',
        'contact-email-send': 'Envoyer un email',
        'contact-whatsapp-title': 'WhatsApp Business',
        'contact-whatsapp-status': 'En ligne',
        'contact-whatsapp-chat': 'Chatter sur WhatsApp',
        'contact-hours-title': 'Horaires d\'Ouverture',
        'contact-hours-weekdays': 'Lundi - Vendredi',
        'contact-hours-saturday': 'Samedi',
        'contact-hours-sunday': 'Dimanche',
        'contact-hours-open': 'Ouvert',
        'contact-hours-closed': 'Fermé',
        'contact-hours-current': 'Actuellement ouvert - Fermeture à 18h00',
        'contact-form-title': 'Contact Rapide',
        'contact-form-description': 'Une question urgente ? Contactez-nous directement !',
        'contact-form-submit': 'Envoyer le Message',
        'contact-social-title': 'Suivez-nous',
        'contact-social-description': 'Restez connectés pour nos dernières actualités',
        'contact-social-facebook-followers': '2.5K abonnés',
        'contact-social-linkedin-connections': '1.2K connexions',
        'contact-social-instagram-followers': '800 abonnés',
        'contact-social-youtube-subscribers': '500 abonnés',
        'contact-info-express-title': 'Livraison Express',
        'contact-info-express-description': 'Service 24h/24 pour vos urgences',
        'contact-info-support-title': 'Support Client',
        'contact-info-support-description': 'Équipe dédiée à votre service',
        'contact-info-coverage-title': 'Couverture Nationale',
        'contact-info-coverage-description': 'Présents dans toute l\'Algérie',

        // Footer
        'footer-description': 'Leader du transport et de la logistique en Algérie, nous offrons des solutions complètes et fiables pour tous vos besoins.',
        'footer-services-title': 'Services',
        'footer-services-road': 'Transport Routier',
        'footer-services-warehouse': 'Entreposage',
        'footer-services-air': 'Fret Aérien',
        'footer-services-sea': 'Fret Maritime',
        'footer-company-title': 'Entreprise',
        'footer-company-about': 'À Propos',
        'footer-company-gallery': 'Galerie',
        'footer-company-testimonials': 'Témoignages',
        'footer-company-contact': 'Contact',
        'footer-contact-title': 'Contact',
        'footer-contact-address': 'Zone Industrielle Rouiba, Alger',
        'footer-contact-phone': '+213 550 96 80 92',
        'footer-contact-email': 'contact@transglobalexpress-dz.com'
    },

    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-services': 'Services',
        'nav-gallery': 'Gallery',
        'nav-reviews': 'Reviews',
        'nav-quote': 'Quote',
        'nav-contact': 'Contact',

        // Hero Section
        'hero-title': 'Transport & Logistics',
        'hero-subtitle': 'Professionals',
        'hero-description': 'Your trusted partner for all your transport, freight and warehousing needs across Algeria',
        'hero-cta-services': 'Discover our services',
        'hero-cta-contact': 'Contact us',

        // About Section
        'about-tag': 'About',
        'about-title': 'Excellence in Transport since 2010',
        'about-description': 'Recognized expertise serving your logistics needs',
        'about-mission-title': 'Our Mission',
        'about-mission-text': 'Provide innovative, reliable transport and logistics solutions tailored to each client\'s specific needs in Algeria.',
        'about-vision-title': 'Our Vision',
        'about-vision-text': 'Become the undisputed leader in transport and logistics in Algeria, recognized for our excellence and innovation.',
        'about-values-title': 'Our Values',
        'about-values-text': 'Reliability, professionalism, innovation and environmental respect guide each of our daily actions.',
        'about-commitment-title': 'Our Commitment',
        'about-commitment-text': 'Guarantee 100% customer satisfaction with respected deadlines and maximum security for your goods.',
        'about-timeline-title': 'Our History',
        'about-timeline-2010-title': 'Company Creation',
        'about-timeline-2010-text': 'Launch with 3 vehicles and a team of 5 people',
        'about-timeline-2015-title': 'Regional Expansion',
        'about-timeline-2015-text': 'Opening of 3 new warehouses and fleet extension',
        'about-timeline-2020-title': 'Digitalization',
        'about-timeline-2020-text': 'Implementation of real-time tracking system',
        'about-timeline-2024-title': 'Market Leader',
        'about-timeline-2024-text': 'Over 500 clients and 50 vehicles across Algeria',
        'about-stats-clients': 'Satisfied Clients',
        'about-stats-experience': 'Years of Experience',
        'about-stats-vehicles': 'Vehicles',
        'about-stats-warehouses': 'Warehouses',

        // Services Section
        'services-tag': 'Services',
        'services-title': 'Our Logistics Solutions',
        'services-description': 'Complete and personalized solutions for all your transport and logistics needs',
        'services-road-title': 'Road Transport',
        'services-road-description': 'Goods transport throughout Algeria with our modern and secure fleet.',
        'services-road-feature1': 'Express delivery',
        'services-road-feature2': 'Real-time tracking',
        'services-road-feature3': 'Complete insurance',
        'services-warehouse-title': 'Warehousing',
        'services-warehouse-description': 'Secure storage solutions with computerized stock management and order preparation.',
        'services-warehouse-feature1': 'Secure storage',
        'services-warehouse-feature2': 'Stock management',
        'services-warehouse-feature3': 'Order preparation',
        'services-air-title': 'Air Freight',
        'services-air-description': 'Fast air transport for your urgent international shipments with complete tracking.',
        'services-air-feature1': 'Fast delivery',
        'services-air-feature2': 'International',
        'services-air-feature3': 'Complete tracking',
        'services-sea-title': 'Sea Freight',
        'services-sea-description': 'Economic solutions for your maritime shipments with complete formalities management.',
        'services-sea-feature1': 'Economic solution',
        'services-sea-feature2': 'Large volumes',
        'services-sea-feature3': 'Formalities included',

        // Gallery Section
        'gallery-tag': 'Gallery',
        'gallery-title': 'Our Fleet & Facilities',
        'gallery-description': 'Discover our modern equipment and cutting-edge facilities',
        'gallery-filters-all': 'View All',
        'gallery-filters-trucks': 'Vehicles',
        'gallery-filters-warehouses': 'Warehouses',
        'gallery-filters-logistics': 'Logistics',
        'gallery-filters-projects': 'Projects',

        // Testimonials Section
        'testimonials-tag': 'Testimonials',
        'testimonials-title': 'What our clients say',
        'testimonials-description': 'Our clients\' satisfaction is our absolute priority',
        'testimonials-stats-satisfaction': '% Satisfaction',
        'testimonials-stats-rating': 'Average Rating',
        'testimonials-stats-reviews': 'Client Reviews',
        'testimonials-stats-loyalty': '% Loyal Clients',
        'testimonials-add-review-title': 'Share your experience',
        'testimonials-add-review-description': 'Have you used our services? Leave us your review!',
        'testimonials-add-review-button': 'Leave a Review',

        // Quote Section
        'quote-tag': 'Free Quote',
        'quote-title': 'Get your personalized quote',
        'quote-subtitle': 'Fill out our form to receive a fast and accurate estimate',
        'quote-features-fast-response-title': 'Fast Response',
        'quote-features-fast-response-description': 'Quote within 24h maximum',
        'quote-features-competitive-rates-title': 'Competitive Rates',
        'quote-features-competitive-rates-description': 'Best market prices',
        'quote-features-no-commitment-title': 'No Commitment',
        'quote-features-no-commitment-description': 'Free quote with no obligation',

        // Contact Section
        'contact-tag': 'Contact',
        'contact-title': 'Contact us',
        'contact-subtitle': 'Our team is at your disposal to answer all your questions',
        'contact-address-title': 'Main Address',
        'contact-address-line1': 'Rouiba Industrial Zone<br>16012 Algiers, Algeria',
        'contact-address-copy': 'Copy address',
        'contact-phone-title': 'Phone',
        'contact-phone-call': 'Call now',
        'contact-email-title': 'Email',
        'contact-email-send': 'Send email',
        'contact-whatsapp-title': 'WhatsApp Business',
        'contact-whatsapp-status': 'Online',
        'contact-whatsapp-chat': 'Chat on WhatsApp',
        'contact-hours-title': 'Opening Hours',
        'contact-hours-weekdays': 'Monday - Friday',
        'contact-hours-saturday': 'Saturday',
        'contact-hours-sunday': 'Sunday',
        'contact-hours-open': 'Open',
        'contact-hours-closed': 'Closed',
        'contact-hours-current': 'Currently open - Closing at 6:00 PM',
        'contact-form-title': 'Quick Contact',
        'contact-form-description': 'Urgent question? Contact us directly!',
        'contact-form-submit': 'Send Message',
        'contact-social-title': 'Follow us',
        'contact-social-description': 'Stay connected for our latest news',
        'contact-social-facebook-followers': '2.5K followers',
        'contact-social-linkedin-connections': '1.2K connections',
        'contact-social-instagram-followers': '800 followers',
        'contact-social-youtube-subscribers': '500 subscribers',
        'contact-info-express-title': 'Express Delivery',
        'contact-info-express-description': '24/7 service for your emergencies',
        'contact-info-support-title': 'Customer Support',
        'contact-info-support-description': 'Dedicated team at your service',
        'contact-info-coverage-title': 'National Coverage',
        'contact-info-coverage-description': 'Present throughout Algeria',

        // Footer
        'footer-description': 'Leader in transport and logistics in Algeria, we offer complete and reliable solutions for all your needs.',
        'footer-services-title': 'Services',
        'footer-services-road': 'Road Transport',
        'footer-services-warehouse': 'Warehousing',
        'footer-services-air': 'Air Freight',
        'footer-services-sea': 'Sea Freight',
        'footer-company-title': 'Company',
        'footer-company-about': 'About',
        'footer-company-gallery': 'Gallery',
        'footer-company-testimonials': 'Testimonials',
        'footer-company-contact': 'Contact',
        'footer-contact-title': 'Contact',
        'footer-contact-address': 'Rouiba Industrial Zone, Algiers',
        'footer-contact-phone': '+213 550 96 80 92',
        'footer-contact-email': 'contact@transglobalexpress-dz.com'
    },

    ar: {
        // Navigation
        'nav-home': 'الرئيسية',
        'nav-about': 'حولنا',
        'nav-services': 'الخدمات',
        'nav-gallery': 'المعرض',
        'nav-reviews': 'التقييمات',
        'nav-quote': 'عرض سعر',
        'nav-contact': 'اتصل بنا',

        // Hero Section
        'hero-title': 'النقل واللوجستيات',
        'hero-subtitle': 'المحترفون',
        'hero-description': 'شريكك الموثوق لجميع احتياجاتك في النقل والشحن واللوجستيات والتخزين عبر الجزائر. حلول شاملة لجميع أنواع البضائع والسلع.',
        'hero-cta-services': 'اكتشف خدماتنا',
        'hero-cta-contact': 'اتصل بنا',

        // About Section
        'about-tag': 'حولنا',
        'about-title': 'التميز في النقل منذ 2010',
        'about-description': 'خبرة معترف بها في خدمة احتياجاتك اللوجستية',
        'about-mission-title': 'مهمتنا',
        'about-mission-text': 'تقديم حلول نقل ولوجستية مبتكرة وموثوقة ومصممة خصيصاً لاحتياجات كل عميل في الجزائر.',
        'about-vision-title': 'رؤيتنا',
        'about-vision-text': 'أن نصبح الرائد الذي لا جدال فيه في النقل واللوجستيات في الجزائر، معترف بنا لتميزنا وابتكارنا.',
        'about-values-title': 'قيمنا',
        'about-values-text': 'الموثوقية والمهنية والابتكار واحترام البيئة توجه كل أعمالنا اليومية.',
        'about-commitment-title': 'التزامنا',
        'about-commitment-text': 'ضمان رضا العملاء بنسبة 100% مع احترام المواعيد والحد الأقصى من الأمان لبضائعك.',
        'about-timeline-title': 'تاريخنا',
        'about-timeline-2010-title': 'إنشاء الشركة',
        'about-timeline-2010-text': 'البداية بـ 3 مركبات وفريق من 5 أشخاص',
        'about-timeline-2015-title': 'التوسع الإقليمي',
        'about-timeline-2015-text': 'افتتاح 3 مستودعات جديدة وتوسيع الأسطول',
        'about-timeline-2020-title': 'الرقمنة',
        'about-timeline-2020-text': 'تنفيذ نظام التتبع في الوقت الفعلي',
        'about-timeline-2024-title': 'رائد السوق',
        'about-timeline-2024-text': 'أكثر من 500 عميل و 50 مركبة عبر الجزائر',
        'about-stats-clients': 'عملاء راضون',
        'about-stats-experience': 'سنوات الخبرة',
        'about-stats-vehicles': 'المركبات',
        'about-stats-warehouses': 'المستودعات',

        // Services Section
        'services-tag': 'الخدمات',
        'services-title': 'حلولنا اللوجستية الشاملة',
        'services-description': 'النقل والشحن واللوجستيات والتخزين - حلول شاملة ومخصصة لجميع احتياجاتك في النقل وتخزين البضائع',
        'services-road-title': 'النقل البري',
        'services-road-description': 'نقل البضائع في جميع أنحاء الجزائر بأسطولنا الحديث والآمن.',
        'services-road-feature1': 'التسليم السريع',
        'services-road-feature2': 'التتبع في الوقت الفعلي',
        'services-road-feature3': 'التأمين الشامل',
        'services-warehouse-title': 'التخزين والمستودعات',
        'services-warehouse-description': 'حلول تخزين ومستودعات آمنة مع إدارة المخزون المحوسبة وتحضير الطلبات. مستودعات حديثة لجميع أنواع البضائع والسلع.',
        'services-warehouse-feature1': 'تخزين آمن',
        'services-warehouse-feature2': 'إدارة المخزون',
        'services-warehouse-feature3': 'تحضير الطلبات',
        'services-air-title': 'الشحن الجوي',
        'services-air-description': 'النقل الجوي السريع لشحناتك العاجلة الدولية مع التتبع الكامل.',
        'services-air-feature1': 'التسليم السريع',
        'services-air-feature2': 'دولي',
        'services-air-feature3': 'التتبع الكامل',
        'services-sea-title': 'الشحن البحري',
        'services-sea-description': 'حلول اقتصادية لشحناتك البحرية مع إدارة كاملة للإجراءات.',
        'services-sea-feature1': 'حل اقتصادي',
        'services-sea-feature2': 'أحجام كبيرة',
        'services-sea-feature3': 'الإجراءات مشمولة',

        // Gallery Section
        'gallery-tag': 'المعرض',
        'gallery-title': 'أسطولنا ومرافقنا',
        'gallery-description': 'اكتشف معداتنا الحديثة ومرافقنا المتطورة',
        'gallery-filters-all': 'عرض الكل',
        'gallery-filters-trucks': 'المركبات',
        'gallery-filters-warehouses': 'المستودعات',
        'gallery-filters-logistics': 'اللوجستيات',
        'gallery-filters-projects': 'المشاريع',

        // Testimonials Section
        'testimonials-tag': 'الشهادات',
        'testimonials-title': 'ما يقوله عملاؤنا',
        'testimonials-description': 'رضا عملائنا هو أولويتنا المطلقة',
        'testimonials-stats-satisfaction': '% الرضا',
        'testimonials-stats-rating': 'التقييم المتوسط',
        'testimonials-stats-reviews': 'تقييمات العملاء',
        'testimonials-stats-loyalty': '% العملاء المخلصين',
        'testimonials-add-review-title': 'شارك تجربتك',
        'testimonials-add-review-description': 'هل استخدمت خدماتنا؟ اترك لنا تقييمك!',
        'testimonials-add-review-button': 'اترك تقييماً',

        // Quote Section
        'quote-tag': 'عرض سعر مجاني',
        'quote-title': 'احصل على عرض السعر المخصص',
        'quote-subtitle': 'املأ نموذجنا للحصول على تقدير سريع ودقيق',
        'quote-features-fast-response-title': 'استجابة سريعة',
        'quote-features-fast-response-description': 'عرض سعر خلال 24 ساعة كحد أقصى',
        'quote-features-competitive-rates-title': 'أسعار تنافسية',
        'quote-features-competitive-rates-description': 'أفضل أسعار السوق',
        'quote-features-no-commitment-title': 'بدون التزام',
        'quote-features-no-commitment-description': 'عرض سعر مجاني بدون التزام',

        // Contact Section
        'contact-tag': 'اتصل بنا',
        'contact-title': 'اتصل بنا',
        'contact-subtitle': 'فريقنا في خدمتك للإجابة على جميع أسئلتك',
        'contact-address-title': 'العنوان الرئيسي',
        'contact-address-line1': 'المنطقة الصناعية الرويبة<br>16012 الجزائر العاصمة، الجزائر',
        'contact-address-copy': 'نسخ العنوان',
        'contact-phone-title': 'الهاتف',
        'contact-phone-call': 'اتصل الآن',
        'contact-email-title': 'البريد الإلكتروني',
        'contact-email-send': 'إرسال بريد إلكتروني',
        'contact-whatsapp-title': 'واتساب الأعمال',
        'contact-whatsapp-status': 'متصل',
        'contact-whatsapp-chat': 'دردشة على واتساب',
        'contact-hours-title': 'ساعات العمل',
        'contact-hours-weekdays': 'الاثنين - الجمعة',
        'contact-hours-saturday': 'السبت',
        'contact-hours-sunday': 'الأحد',
        'contact-hours-open': 'مفتوح',
        'contact-hours-closed': 'مغلق',
        'contact-hours-current': 'مفتوح حالياً - الإغلاق في 6:00 مساءً',
        'contact-form-title': 'اتصال سريع',
        'contact-form-description': 'سؤال عاجل؟ اتصل بنا مباشرة!',
        'contact-form-submit': 'إرسال الرسالة',
        'contact-social-title': 'تابعنا',
        'contact-social-description': 'ابق على اتصال لآخر أخبارنا',
        'contact-social-facebook-followers': '2.5 ألف متابع',
        'contact-social-linkedin-connections': '1.2 ألف اتصال',
        'contact-social-instagram-followers': '800 متابع',
        'contact-social-youtube-subscribers': '500 مشترك',
        'contact-info-express-title': 'التسليم السريع',
        'contact-info-express-description': 'خدمة 24/7 لحالات الطوارئ',
        'contact-info-support-title': 'دعم العملاء',
        'contact-info-support-description': 'فريق مخصص في خدمتك',
        'contact-info-coverage-title': 'التغطية الوطنية',
        'contact-info-coverage-description': 'موجودون في جميع أنحاء الجزائر',

        // Footer
        'footer-description': 'رائد في النقل واللوجستيات في الجزائر، نقدم حلولاً كاملة وموثوقة لجميع احتياجاتك.',
        'footer-services-title': 'الخدمات',
        'footer-services-road': 'النقل البري',
        'footer-services-warehouse': 'التخزين',
        'footer-services-air': 'الشحن الجوي',
        'footer-services-sea': 'الشحن البحري',
        'footer-company-title': 'الشركة',
        'footer-company-about': 'حولنا',
        'footer-company-gallery': 'المعرض',
        'footer-company-testimonials': 'الشهادات',
        'footer-company-contact': 'اتصل بنا',
        'footer-contact-title': 'اتصل بنا',
        'footer-contact-address': 'المنطقة الصناعية الرويبة، الجزائر',
        'footer-contact-phone': '+213 550 96 80 92',
        'footer-contact-email': 'contact@transglobalexpress-dz.com'
    }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language ${lang} not supported`);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('preferred-language', lang);
    
    // Mettre à jour tous les éléments avec des IDs de traduction
    Object.keys(translations[lang]).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Mettre à jour les boutons de langue
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Mettre à jour la direction du texte pour l'arabe
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
        
        // Forcer les numéros à rester en LTR (français)
        const numberElements = document.querySelectorAll('span, p, div, a, h1, h2, h3, h4, h5, h6');
        numberElements.forEach(element => {
            if (element.textContent && /\d/.test(element.textContent)) {
                element.style.direction = 'ltr';
                element.style.unicodeBidi = 'embed';
            }
        });
        
        // Appliquer spécifiquement aux numéros de téléphone et emails
        const phoneElements = document.querySelectorAll('#footer-contact-phone, #contact-phone-number, [id*="phone"]');
        phoneElements.forEach(element => {
            element.style.direction = 'ltr';
            element.style.unicodeBidi = 'embed';
            element.style.textAlign = 'left';
        });
        
        const emailElements = document.querySelectorAll('#footer-contact-email, [id*="email"], a[href^="mailto:"]');
        emailElements.forEach(element => {
            element.style.direction = 'ltr';
            element.style.unicodeBidi = 'embed';
            element.style.textAlign = 'left';
        });
        
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl');
        
        // Réinitialiser les styles pour les autres langues
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.direction = '';
            element.style.unicodeBidi = '';
            element.style.textAlign = '';
        });
    }
    
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.setAttribute('lang', lang);
    
    // Mettre à jour les meta tags dynamiquement
    updateMetaTags(lang);
    
    console.log(`Language changed to: ${lang}`);
}

// Fonction pour obtenir une traduction
function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}

// Fonction pour mettre à jour les meta tags dynamiquement
function updateMetaTags(lang) {
    if (!metaTags[lang]) {
        console.warn(`Meta tags for language ${lang} not found`);
        return;
    }
    
    const langMetaTags = metaTags[lang];
    
    // Mettre à jour le titre de la page
    document.title = langMetaTags.title;
    
    // Mettre à jour la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', langMetaTags.description);
    }
    
    // Mettre à jour les meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
        metaKeywords.setAttribute('content', langMetaTags.keywords);
    }
    
    // Mettre à jour les Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', langMetaTags.ogTitle);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.setAttribute('content', langMetaTags.ogDescription);
    }
    
    console.log(`Meta tags updated for language: ${lang}`);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple Translation System initialized');
    
    // Détecter la langue sauvegardée
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && translations[savedLang]) {
        currentLanguage = savedLang;
    }
    
    // Ajouter les événements aux boutons de langue
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang) {
                changeLanguage(lang);
            }
        });
    });
    
    // Appliquer la langue initiale
    changeLanguage(currentLanguage);
});