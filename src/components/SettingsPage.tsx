import { Palette } from 'lucide-react';

type SettingsPageProps = {
  themeColor: string;
  onColorChange: (color: string) => void;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
  fontSize: string;
  onFontSizeChange: (fontSize: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  dyslexiaFont: boolean;
  onDyslexiaFontChange: (dyslexiaFont: boolean) => void;
  highContrast: boolean;
  onHighContrastChange: (highContrast: boolean) => void;
  reduceMotion: boolean;
  onReduceMotionChange: (reduceMotion: boolean) => void;
};

export function SettingsPage({ themeColor, onColorChange, darkMode, onDarkModeChange, fontSize, onFontSizeChange, language, onLanguageChange, dyslexiaFont, onDyslexiaFontChange, highContrast, onHighContrastChange, reduceMotion, onReduceMotionChange }: SettingsPageProps) {
  const colorPresets = [
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Indigo', value: '#6366f1' }
  ];

  const fontSizes = [
    { name: 'Small', value: 'small' },
    { name: 'Medium', value: 'medium' },
    { name: 'Large', value: 'large' },
    { name: 'Extra Large', value: 'extra-large' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <div className={`min-h-[calc(100vh-4rem)] py-12 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-cyan-50/30'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 border transition-colors duration-300 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/50'}`}>
          <h1 className={`mb-4 text-4xl transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          <p className={`mb-8 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Customize your experience with appearance and accessibility options
          </p>

          <div className="space-y-8">
            {/* Accessibility Section Header */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md shadow-cyan-500/20" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
                  <span className="text-2xl">♿</span>
                </div>
                <div>
                  <h2 className={`transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Accessibility</h2>
                  <p className={`text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Make the app easier to use</p>
                </div>
              </div>

              {/* Font Size */}
              <div className="mb-6">
                <label className={`block mb-3 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Font Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {fontSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => onFontSizeChange(size.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        fontSize === size.value
                          ? darkMode
                            ? 'border-white shadow-lg scale-105 bg-gray-700'
                            : 'border-gray-900 shadow-lg scale-105'
                          : darkMode
                            ? 'border-gray-600 hover:border-gray-500 hover:scale-105'
                            : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                      }`}
                    >
                      <span className={`block mb-1 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontSize: size.value === 'small' ? '14px' : size.value === 'medium' ? '16px' : size.value === 'large' ? '18px' : '20px' }}>
                        Aa
                      </span>
                      <span className={`text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{size.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div className="mb-6">
                <label className={`block mb-3 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Language / لغة / 语言
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => onLanguageChange(lang.code)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        language === lang.code
                          ? darkMode
                            ? 'border-white shadow-lg scale-105 bg-gray-700'
                            : 'border-gray-900 shadow-lg scale-105'
                          : darkMode
                            ? 'border-gray-600 hover:border-gray-500 hover:scale-105'
                            : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{lang.flag}</span>
                      <span className={`text-sm transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility Toggles */}
              <div className="space-y-4">
                {/* Dyslexia-Friendly Font */}
                <div className={`p-4 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`mb-1 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dyslexia-Friendly Font</h3>
                      <p className={`text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Use a font optimized for readability with increased letter and word spacing
                      </p>
                    </div>
                    <button
                      onClick={() => onDyslexiaFontChange(!dyslexiaFont)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        dyslexiaFont ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={dyslexiaFont}
                      aria-label="Toggle dyslexia-friendly font"
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          dyslexiaFont ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* High Contrast */}
                <div className={`p-4 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`mb-1 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>High Contrast</h3>
                      <p className={`text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Increase contrast between text and background for better visibility
                      </p>
                    </div>
                    <button
                      onClick={() => onHighContrastChange(!highContrast)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        highContrast ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={highContrast}
                      aria-label="Toggle high contrast mode"
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          highContrast ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Reduce Motion */}
                <div className={`p-4 rounded-xl border transition-colors ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`mb-1 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Reduce Motion</h3>
                      <p className={`text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Minimize animations and transitions to reduce motion sensitivity
                      </p>
                    </div>
                    <button
                      onClick={() => onReduceMotionChange(!reduceMotion)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        reduceMotion ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={reduceMotion}
                      aria-label="Toggle reduce motion"
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          reduceMotion ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Dark Mode Section */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md shadow-cyan-500/20" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
                  {darkMode ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <h2 className={`transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h2>
              </div>
              <p className={`mb-6 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Choose between light and dark mode for a comfortable viewing experience.
              </p>

              {/* Theme Toggle Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => onDarkModeChange(false)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    !darkMode
                      ? 'border-gray-900 shadow-lg scale-105 bg-white'
                      : darkMode
                        ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center shadow-md">
                      <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span className={`transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Light Mode</span>
                  </div>
                </button>

                <button
                  onClick={() => onDarkModeChange(true)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    darkMode
                      ? 'border-gray-900 shadow-lg scale-105 bg-gray-700'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <span className={`transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Dark Mode</span>
                  </div>
                </button>
              </div>
            </section>

            {/* Theme Color Section */}
            <section className={`border-t pt-8 transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md shadow-cyan-500/20" style={{ background: 'linear-gradient(135deg, var(--theme-color) 0%, #0891b2 100%)' }}>
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h2 className={`transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Theme Color</h2>
              </div>
              <p className={`mb-6 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Customize the appearance of the application by selecting your preferred theme color.
              </p>

              {/* Color Presets */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {colorPresets.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onColorChange(color.value)}
                    className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all duration-300 ${
                      themeColor === color.value
                        ? darkMode
                          ? 'border-white shadow-lg scale-105'
                          : 'border-gray-900 shadow-lg scale-105'
                        : darkMode
                          ? 'border-gray-600 hover:border-gray-500 hover:scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                    }`}
                  >
                    <div
                      className="w-14 h-14 rounded-xl shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${color.value} 0%, ${color.value}dd 100%)` }}
                    />
                    <span className={`text-sm transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{color.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom Color Picker */}
              <div className={`border-t pt-6 transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <label htmlFor="custom-color" className={`block mb-4 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Custom Color
                </label>
                <div className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${darkMode ? 'bg-gray-700/50' : 'bg-gradient-to-br from-gray-50 to-cyan-50/30'}`}>
                  <input
                    id="custom-color"
                    type="color"
                    value={themeColor}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="w-20 h-20 rounded-xl border-2 border-gray-300 cursor-pointer shadow-lg"
                  />
                  <div>
                    <p className={`transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>{themeColor.toUpperCase()}</p>
                    <p className={`text-sm transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Click to choose a custom color</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Preview Section */}
            <section className={`border-t pt-8 transition-colors ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`mb-6 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Preview</h3>
              <div className={`space-y-4 p-6 rounded-xl transition-colors ${darkMode ? 'bg-gray-700/50' : 'bg-gradient-to-br from-gray-50 to-cyan-50/30'}`}>
                <div className="flex gap-3">
                  <button
                    className="px-6 py-3 rounded-xl text-white shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
                    style={{ background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` }}
                  >
                    Primary Button
                  </button>
                  <button className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-600' : 'border-gray-200 text-gray-700 hover:bg-white'}`}>
                    Secondary Button
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-lg shadow-md"
                    style={{ background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` }}
                  />
                  <span className={`transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Theme accent color</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}