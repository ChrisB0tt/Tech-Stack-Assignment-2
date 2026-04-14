/**
 * ============================================================================
 * TRANSLATIONS MODULE
 * ============================================================================
 * 
 * This module provides multi-language support for the application.
 * 
 * SUPPORTED LANGUAGES (9 total):
 * - en: English (default)
 * - es: Spanish (Español)
 * - fr: French (Français)
 * - de: German (Deutsch)
 * - it: Italian (Italiano)
 * - pt: Portuguese (Português)
 * - zh: Chinese (中文)
 * - ja: Japanese (日本語)
 * - ar: Arabic (العربية)
 * 
 * USAGE:
 * import { translate } from './translations';
 * const welcomeText = translate('welcome', 'es'); // Returns Spanish translation
 * 
 * STRUCTURE:
 * Each language code contains a dictionary of key-value pairs.
 * Keys are consistent across all languages.
 * If a key is missing in a language, it falls back to English.
 * 
 * ============================================================================
 */

// Main translations object - maps language codes to translation dictionaries
export const translations: Record<string, any> = {
  // ============================================================================
  // ENGLISH (DEFAULT)
  // ============================================================================
  en: {
    welcome: 'Welcome to Community Skill Swap Hub',
    tagline: 'Connect with your community, share your expertise, and discover new skills.',
    createProfile: 'Create Profile',
    shareResource: 'Share Resource',
    browseAsGuest: 'Browse as Guest',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    settings: 'Settings',
    profile: 'Profile',
    home: 'Home',
    about: 'About Us',
    contact: 'Contact Us',
    browseResources: 'Browse Resources',
  },

  // ============================================================================
  // SPANISH (ESPAÑOL)
  // ============================================================================
  es: {
    welcome: 'Bienvenido al Centro de Intercambio de Habilidades Comunitarias',
    tagline: 'Conéctate con tu comunidad, comparte tu experiencia y descubre nuevas habilidades.',
    createProfile: 'Crear Perfil',
    shareResource: 'Compartir Recurso',
    browseAsGuest: 'Navegar como Invitado',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    logout: 'Cerrar Sesión',
    settings: 'Configuración',
    profile: 'Perfil',
    home: 'Inicio',
    about: 'Sobre Nosotros',
    contact: 'Contacto',
    browseResources: 'Explorar Recursos',
  },

  // ============================================================================
  // FRENCH (FRANÇAIS)
  // ============================================================================
  fr: {
    welcome: 'Bienvenue au Centre d\'Échange de Compétences Communautaire',
    tagline: 'Connectez-vous avec votre communauté, partagez votre expertise et découvrez de nouvelles compétences.',
    createProfile: 'Créer un Profil',
    shareResource: 'Partager une Ressource',
    browseAsGuest: 'Parcourir en tant qu\'Invité',
    login: 'Connexion',
    signup: 'S\'inscrire',
    logout: 'Déconnexion',
    settings: 'Paramètres',
    profile: 'Profil',
    home: 'Accueil',
    about: 'À Propos',
    contact: 'Contact',
    browseResources: 'Parcourir les Ressources',
  },

  // ============================================================================
  // GERMAN (DEUTSCH)
  // ============================================================================
  de: {
    welcome: 'Willkommen beim Community Skill Swap Hub',
    tagline: 'Vernetzen Sie sich mit Ihrer Community, teilen Sie Ihr Fachwissen und entdecken Sie neue Fähigkeiten.',
    createProfile: 'Profil Erstellen',
    shareResource: 'Ressource Teilen',
    browseAsGuest: 'Als Gast Durchsuchen',
    login: 'Anmelden',
    signup: 'Registrieren',
    logout: 'Abmelden',
    settings: 'Einstellungen',
    profile: 'Profil',
    home: 'Startseite',
    about: 'Über Uns',
    contact: 'Kontakt',
    browseResources: 'Ressourcen Durchsuchen',
  },

  // ============================================================================
  // ITALIAN (ITALIANO)
  // ============================================================================
  it: {
    welcome: 'Benvenuto al Centro di Scambio di Competenze della Comunità',
    tagline: 'Connettiti con la tua comunità, condividi la tua esperienza e scopri nuove competenze.',
    createProfile: 'Crea Profilo',
    shareResource: 'Condividi Risorsa',
    browseAsGuest: 'Naviga come Ospite',
    login: 'Accedi',
    signup: 'Registrati',
    logout: 'Esci',
    settings: 'Impostazioni',
    profile: 'Profilo',
    home: 'Home',
    about: 'Chi Siamo',
    contact: 'Contatti',
    browseResources: 'Esplora Risorse',
  },

  // ============================================================================
  // PORTUGUESE (PORTUGUÊS)
  // ============================================================================
  pt: {
    welcome: 'Bem-vindo ao Centro de Troca de Habilidades Comunitárias',
    tagline: 'Conecte-se com sua comunidade, compartilhe sua experiência e descubra novas habilidades.',
    createProfile: 'Criar Perfil',
    shareResource: 'Compartilhar Recurso',
    browseAsGuest: 'Navegar como Convidado',
    login: 'Entrar',
    signup: 'Cadastrar',
    logout: 'Sair',
    settings: 'Configurações',
    profile: 'Perfil',
    home: 'Início',
    about: 'Sobre Nós',
    contact: 'Contato',
    browseResources: 'Explorar Recursos',
  },

  // ============================================================================
  // CHINESE (中文)
  // ============================================================================
  zh: {
    welcome: '欢迎来到社区技能交换中心',
    tagline: '与您的社区联系，分享您的专业知识，发现新技能。',
    createProfile: '创建个人资料',
    shareResource: '分享资源',
    browseAsGuest: '以访客身份浏览',
    login: '登录',
    signup: '注册',
    logout: '登出',
    settings: '设置',
    profile: '个人资料',
    home: '首页',
    about: '关于我们',
    contact: '联系我们',
    browseResources: '浏览资源',
  },

  // ============================================================================
  // JAPANESE (日本語)
  // ============================================================================
  ja: {
    welcome: 'コミュニティスキル交換ハブへようこそ',
    tagline: 'コミュニティとつながり、専門知識を共有し、新しいスキルを発見しましょう。',
    createProfile: 'プロフィール作成',
    shareResource: 'リソース共有',
    browseAsGuest: 'ゲストとして閲覧',
    login: 'ログイン',
    signup: '登録',
    logout: 'ログアウト',
    settings: '設定',
    profile: 'プロフィール',
    home: 'ホーム',
    about: '私たちについて',
    contact: 'お問い合わせ',
    browseResources: 'リソースを閲覧',
  },

  // ============================================================================
  // ARABIC (العربية)
  // ============================================================================
  ar: {
    welcome: 'مرحباً بك في مركز تبادل المهارات المجتمعية',
    tagline: 'تواصل مع مجتمعك، شارك خبرتك، واكتشف مهارات جديدة.',
    createProfile: 'إنشاء ملف شخصي',
    shareResource: 'مشاركة مورد',
    browseAsGuest: 'تصفح كضيف',
    login: 'تسجيل الدخول',
    signup: 'التسجيل',
    logout: 'تسجيل الخروج',
    settings: 'الإعدادات',
    profile: 'الملف الشخصي',
    home: 'الرئيسية',
    about: 'معلومات عنا',
    contact: 'اتصل بنا',
    browseResources: 'تصفح الموارد',
  }
};

/**
 * Translation Helper Function
 * 
 * Retrieves a translated string for a given key and language.
 * Falls back to English if the translation is not found.
 * 
 * @param key - The translation key (e.g., 'welcome', 'login')
 * @param lang - The language code (default: 'en')
 * @returns The translated string, or the original key if not found
 * 
 * @example
 * translate('welcome', 'es') // Returns: "Bienvenido al Centro..."
 * translate('login', 'fr')   // Returns: "Connexion"
 * translate('unknown')       // Returns: "unknown" (fallback to key)
 */
export function translate(key: string, lang: string = 'en'): string {
  // Try to get translation for specified language
  // If not found, fall back to English
  // If still not found, return the key itself
  return translations[lang]?.[key] || translations['en'][key] || key;
}
