import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'vi' | 'en'

// Copy song ngữ. Mỗi khoá là một đoạn text thật trên trang — không phải nhãn kỹ
// thuật. Giữ hai ngôn ngữ cạnh nhau để sửa là thấy cả cặp, khó lệch nghĩa.
// Định vị theo brand brief: LUGO là AI Companion Platform, nằm giữa mô hình nền
// tảng và ứng dụng cuối. Mô hình cho trí tuệ — LUGO cho trải nghiệm.
export const STRINGS = {
  vi: {
    'nav.what': 'Companion',
    'nav.ecosystem': 'Hệ sinh thái',
    'nav.devices': 'Thiết bị',
    'nav.brand': 'Nhận diện',
    'nav.cta': 'Bắt đầu',
    'lang.toggle': 'EN',
    'lang.toggle.aria': 'Chuyển sang tiếng Anh',

    'hero.eyebrow': 'Nền tảng AI Companion',
    'hero.title': 'AI Companion của riêng mỗi người.',
    'hero.sub':
      'LUGO biến các mô hình AI thành những người đồng hành biết ghi nhớ, giao tiếp, hành động và lớn lên cùng bạn — trên mọi thiết bị. Mô hình cung cấp trí tuệ. LUGO cung cấp trải nghiệm.',
    'hero.cta': 'Bắt đầu',
    'hero.secondary': 'Xem trên GitHub',
    'hero.legend.you': 'Chấm là bạn',
    'hero.legend.lugo': 'Vòng là Lugo',

    'pos.eyebrow': 'Định vị',
    'pos.title': 'Giữa mô hình và trải nghiệm.',
    'pos.sub':
      'LUGO không phải một chatbot, cũng không phải một mô hình. Đó là lớp nền biến trí tuệ thô thành người đồng hành thật.',
    'pos.layer1.label': 'Mô hình nền tảng',
    'pos.layer1.items': 'GPT · Gemini · Claude · DeepSeek · GLM · Kimi',
    'pos.layer2.label': 'LUGO — lớp đồng hành',
    'pos.layer2.items': 'Trí nhớ · Giọng nói · Hành động · Kết nối',
    'pos.layer3.label': 'Companion trong đời thực',
    'pos.layer3.items': 'Giáo dục · CSKH · Nhà thông minh · Robot · Y tế · Doanh nghiệp',
    'pos.caption': 'Các mô hình cung cấp trí tuệ. LUGO cung cấp trải nghiệm.',

    'cap.eyebrow': 'Một companion làm được gì',
    'cap.title': 'Không phải cửa sổ chat. Một người đồng hành.',
    'cap.understand.title': 'Hiểu bạn',
    'cap.understand.body': 'Nắm ý bạn, không chỉ câu chữ, và thích nghi với cách từng người làm việc.',
    'cap.remember.title': 'Ghi nhớ',
    'cap.remember.body': 'Giữ lại điều quan trọng qua từng buổi, khoanh riêng theo từng người và hồ sơ.',
    'cap.communicate.title': 'Giao tiếp',
    'cap.communicate.body': 'Gặp bạn bằng giọng nói, văn bản hay hình ảnh — tuỳ tình huống cần.',
    'cap.act.title': 'Hành động',
    'cap.act.body': 'Chạy kỹ năng và hoàn thành việc, không chỉ trả lời về nó.',
    'cap.connect.title': 'Kết nối',
    'cap.connect.body': 'Nối với ứng dụng, dịch vụ và thiết bị trong cùng một hệ sinh thái.',
    'cap.everywhere.title': 'Ở khắp nơi',
    'cap.everywhere.body': 'Xuất hiện ở bất cứ đâu bạn cần — trình duyệt, robot hay một con chip bé xíu.',

    'how.eyebrow': 'Khi trò chuyện',
    'how.title': 'Chấm là bạn. Vòng là Lugo.',
    'how.sub':
      'Cùng một dấu hiệu companion hiện lên khi bạn nói — nghe, nghĩ, trả lời. Không phải hình minh hoạ, mà là thứ thiết bị thật hiển thị.',
    'how.1.title': 'Bạn nói',
    'how.1.body': 'Chấm sáng cam và nở ra theo giọng bạn. Lugo đang nghe.',
    'how.2.title': 'Lugo nghĩ',
    'how.2.body': 'Một đường sáng chạy quanh vòng khi Lugo biến lời bạn thành ý và soạn câu trả lời.',
    'how.3.title': 'Lugo trả lời',
    'how.3.body': 'Vòng chuyển cam, khoảng hở khép–mở như đang nói. Rồi tới lượt bạn.',

    'eco.eyebrow': 'Hệ sinh thái',
    'eco.title': 'Mười mảnh, một nền tảng.',
    'eco.sub': 'Mỗi mảnh tự đứng được và lớn dần theo thời gian — mà vẫn giữ nhất quán với tổng thể.',
    'eco.companion': 'Chính người đồng hành',
    'eco.studio': 'Dựng và nắn companion',
    'eco.cloud': 'Host và mở rộng',
    'eco.voice': 'Nói và nghe',
    'eco.vision': 'Nhìn và hiểu',
    'eco.memory': 'Ghi nhớ theo thời gian',
    'eco.connect': 'Nối ứng dụng & thiết bị',
    'eco.skills': 'Những việc làm được',
    'eco.devices': 'Chạy trên phần cứng thật',
    'eco.console': 'Quản lý và theo dõi',

    'who.eyebrow': 'Dành cho ai',
    'who.title': 'Một nền tảng, nhiều người dựng.',
    'who.individual.title': 'Cá nhân',
    'who.individual.body': 'Một AI hỗ trợ công việc và cuộc sống hằng ngày.',
    'who.developers.title': 'Lập trình viên',
    'who.developers.body': 'Dựng companion trên một nền tảng, không phải từ số không.',
    'who.businesses.title': 'Doanh nghiệp',
    'who.businesses.body': 'Triển khai AI cho khách hàng và cho nhân sự.',
    'who.makers.title': 'Nhà sản xuất thiết bị',
    'who.makers.body': 'Đưa companion vào robot, IoT và nhà thông minh.',

    'devices.eyebrow': 'Chạy trên đâu',
    'devices.title': 'Từ con chip bé xíu tới trình duyệt.',
    'dev.esp32.title': 'ESP32-C3 / S3',
    'dev.esp32.tag': 'Firmware',
    'dev.esp32.body':
      'Máy khách mỏng trên ESP-IDF: mic, loa và một mắt robot nhỏ. Song công 16 kHz qua WebSocket tới gateway.',
    'dev.rpi.title': 'Raspberry Pi',
    'dev.rpi.tag': 'Trạm đầy đủ',
    'dev.rpi.body':
      'Song công đầy đủ với màn hình và cảm biến. Đủ sức chạy mô hình cục bộ ngay tại chỗ.',
    'dev.web.title': 'Trình duyệt',
    'dev.web.tag': 'Không cài đặt',
    'dev.web.body':
      'Web client mở là nói. Talk, Lịch sử, Thiết bị, Công cụ — không cần cài gì.',

    'brand.eyebrow': 'Bộ nhận diện',
    'brand.title': 'Logo, và ý nghĩa của nó.',
    'brand.sub': 'Một vòng tròn mở, một chấm nhỏ và một khoảng hở — ba chi tiết mang trọn câu chuyện của LUGO.',
    'brand.meaning.label': 'Ý nghĩa logo',
    'brand.ring.title': 'Vòng tròn mở',
    'brand.ring.body': 'Biểu tượng cho sự lắng nghe, học hỏi liên tục và không giới hạn.',
    'brand.dot.title': 'Chấm nhỏ',
    'brand.dot.body': 'Bạn — trung tâm của mọi kết nối. AI luôn đồng hành cùng bạn.',
    'brand.gap.title': 'Khoảng hở',
    'brand.gap.body': 'Cánh cửa kết nối AI với thế giới thực, ứng dụng, thiết bị và con người.',
    'brand.color.title': 'Màu sắc',
    'brand.color.body': 'Năng lượng — ấm áp — tích cực — truyền cảm hứng hành động.',
    'brand.icons.label': 'Ứng dụng app icon',
    'brand.mono.label': 'Phiên bản đơn sắc',
    'brand.palette.label': 'Bảng màu chủ đạo',
    'brand.swatch.ink': 'Mực',
    'brand.swatch.graphite': 'Than',
    'brand.swatch.cream': 'Kem',
    'brand.swatch.sand': 'Cát',
    'brand.swatch.accent': 'Cam',
    'brand.swatch.warm': 'Vàng ấm',
    'brand.status.label': 'Icon phản hồi',
    'brand.status.note': 'Vẫn là mark LUGO — vòng hở và chấm cam — chỉ đổi màu theo nghĩa.',
    'brand.status.info': 'Thông tin',
    'brand.status.success': 'Thành công',
    'brand.status.warning': 'Cảnh báo',
    'brand.status.error': 'Lỗi',

    'cta.title': 'Một nền tảng. Vô số AI Companion.',
    'cta.sub': 'Sẵn sàng khi bạn sẵn sàng.',
    'cta.primary': 'Bắt đầu',
    'cta.secondary': 'Đọc mã nguồn',

    'footer.tagline': 'Nền tảng AI Companion.',
    'footer.rights': 'Một dự án của lugondev.',
  },
  en: {
    'nav.what': 'Companion',
    'nav.ecosystem': 'Ecosystem',
    'nav.devices': 'Devices',
    'nav.brand': 'Brand',
    'nav.cta': 'Get started',
    'lang.toggle': 'VI',
    'lang.toggle.aria': 'Switch to Vietnamese',

    'hero.eyebrow': 'The AI Companion Platform',
    'hero.title': 'A personal AI companion for everyone.',
    'hero.sub':
      'LUGO turns AI models into companions that remember, communicate, act and grow with you — across every device. Models provide the intelligence. LUGO provides the experience.',
    'hero.cta': 'Get started',
    'hero.secondary': 'View on GitHub',
    'hero.legend.you': 'The dot is you',
    'hero.legend.lugo': 'The ring is Lugo',

    'pos.eyebrow': 'Positioning',
    'pos.title': 'Between the model and the moment.',
    'pos.sub':
      'LUGO isn’t a chatbot, and it isn’t a model. It’s the layer that turns raw intelligence into a companion that’s actually there.',
    'pos.layer1.label': 'Foundation models',
    'pos.layer1.items': 'GPT · Gemini · Claude · DeepSeek · GLM · Kimi',
    'pos.layer2.label': 'LUGO — the companion layer',
    'pos.layer2.items': 'Memory · Voice · Actions · Connections',
    'pos.layer3.label': 'Companions in the real world',
    'pos.layer3.items': 'Education · Support · Smart home · Robotics · Healthcare · Enterprise',
    'pos.caption': 'Models provide the intelligence. LUGO provides the experience.',

    'cap.eyebrow': 'What a companion can do',
    'cap.title': 'Not a chat window. A companion.',
    'cap.understand.title': 'Understand',
    'cap.understand.body': 'Reads your intent, not just your words, and adapts to how each person works.',
    'cap.remember.title': 'Remember',
    'cap.remember.body': 'Keeps what matters across sessions, scoped to each person and profile.',
    'cap.communicate.title': 'Communicate',
    'cap.communicate.body': 'Meets you by voice, text or vision — whichever the moment calls for.',
    'cap.act.title': 'Act',
    'cap.act.body': 'Runs skills and finishes tasks, instead of only answering about them.',
    'cap.connect.title': 'Connect',
    'cap.connect.body': 'Links to your apps, services and devices in one ecosystem.',
    'cap.everywhere.title': 'Everywhere',
    'cap.everywhere.body': 'Shows up wherever you need it — the browser, a robot, or a tiny chip.',

    'how.eyebrow': 'In conversation',
    'how.title': 'The dot is you. The ring is Lugo.',
    'how.sub':
      'The same signal your companion shows while you talk — listening, thinking, replying. Not an illustration, but what a real device puts on screen.',
    'how.1.title': 'You speak',
    'how.1.body': 'The dot lights orange and swells with your voice. Lugo is listening.',
    'how.2.title': 'Lugo thinks',
    'how.2.body': 'A line runs around the ring as Lugo turns your words into intent and drafts a reply.',
    'how.3.title': 'Lugo replies',
    'how.3.body': 'The ring turns orange and its gap opens and closes as it speaks. Then it’s your turn.',

    'eco.eyebrow': 'The ecosystem',
    'eco.title': 'Ten parts, one platform.',
    'eco.sub': 'Each piece stands on its own and grows over time — while staying consistent with the whole.',
    'eco.companion': 'The companion itself',
    'eco.studio': 'Build & shape companions',
    'eco.cloud': 'Host and scale',
    'eco.voice': 'Speak and listen',
    'eco.vision': 'See and understand',
    'eco.memory': 'Remember over time',
    'eco.connect': 'Link apps & devices',
    'eco.skills': 'Actions it can take',
    'eco.devices': 'Run on real hardware',
    'eco.console': 'Manage and observe',

    'who.eyebrow': 'Who it’s for',
    'who.title': 'One platform, many makers.',
    'who.individual.title': 'Individuals',
    'who.individual.body': 'An AI that helps with work and daily life.',
    'who.developers.title': 'Developers',
    'who.developers.body': 'Build companions on a platform, not from scratch.',
    'who.businesses.title': 'Businesses',
    'who.businesses.body': 'Deploy AI for your customers and your teams.',
    'who.makers.title': 'Device makers',
    'who.makers.body': 'Put a companion inside robots, IoT and smart home.',

    'devices.eyebrow': 'Where it runs',
    'devices.title': 'From a tiny chip to the browser.',
    'dev.esp32.title': 'ESP32-C3 / S3',
    'dev.esp32.tag': 'Firmware',
    'dev.esp32.body':
      'A thin ESP-IDF client: mic, speaker and a small robot eye. 16 kHz full duplex over WebSocket to the gateway.',
    'dev.rpi.title': 'Raspberry Pi',
    'dev.rpi.tag': 'Full station',
    'dev.rpi.body':
      'Full duplex with a display and sensors. Powerful enough to run local models right on the spot.',
    'dev.web.title': 'Browser',
    'dev.web.tag': 'No install',
    'dev.web.body':
      'Open the web client and talk. Talk, History, Devices, Tools — nothing to install.',

    'brand.eyebrow': 'Brand',
    'brand.title': 'The logo, and what it means.',
    'brand.sub': 'An open ring, a small dot and a gap — three details that carry the whole LUGO story.',
    'brand.meaning.label': 'Logo meaning',
    'brand.ring.title': 'Open ring',
    'brand.ring.body': 'A symbol of listening, and of learning that keeps going and never closes.',
    'brand.dot.title': 'The dot',
    'brand.dot.body': 'You — the center of every connection. The AI is always beside you.',
    'brand.gap.title': 'The gap',
    'brand.gap.body': 'The door that connects the AI to the real world — apps, devices and people.',
    'brand.color.title': 'Color',
    'brand.color.body': 'Energy, warmth, optimism — a color that invites action.',
    'brand.icons.label': 'App icon',
    'brand.mono.label': 'Monochrome',
    'brand.palette.label': 'Primary palette',
    'brand.swatch.ink': 'Ink',
    'brand.swatch.graphite': 'Graphite',
    'brand.swatch.cream': 'Cream',
    'brand.swatch.sand': 'Sand',
    'brand.swatch.accent': 'Accent',
    'brand.swatch.warm': 'Warm',
    'brand.status.label': 'Feedback icons',
    'brand.status.note': 'Still the LUGO mark — open ring and orange dot — recoloured by meaning.',
    'brand.status.info': 'Info',
    'brand.status.success': 'Success',
    'brand.status.warning': 'Warning',
    'brand.status.error': 'Error',

    'cta.title': 'One platform. Infinite companions.',
    'cta.sub': 'I’m ready when you are.',
    'cta.primary': 'Get started',
    'cta.secondary': 'Read the source',

    'footer.tagline': 'The AI Companion Platform.',
    'footer.rights': 'A project by lugondev.',
  },
} as const

export type StringKey = keyof (typeof STRINGS)['en']

type I18n = { lang: Lang; setLang: (l: Lang) => void; t: (k: StringKey) => string }
const I18nContext = createContext<I18n | null>(null)

const STORAGE_KEY = 'lugo.lang'

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'vi'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'vi' || saved === 'en') return saved
  // Mặc định theo trình duyệt, nhưng dự án là tiếng Việt trước nên VI là fallback.
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'vi'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang: setLangState,
      t: (k) => STRINGS[lang][k],
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
