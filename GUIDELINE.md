# LUGO — Hướng dẫn sử dụng thương hiệu

Bộ nhận diện LUGO chỉ có vài chi tiết, và mỗi chi tiết đều mang một ý nghĩa.
Giữ đúng vài quy tắc dưới đây là đủ để thương hiệu luôn nhất quán trên mọi bề mặt
— web, app, thiết bị, mạng xã hội hay tài liệu in.

Tài liệu này là nguồn tham chiếu duy nhất. Token màu sống trong
[`src/theme.css`](src/theme.css); logo động sống trong
[`src/components/LugoMark.tsx`](src/components/LugoMark.tsx); file xuất sẵn nằm
trong [`public/brand/`](public/brand).

---

## 1. Logo mang ý nghĩa gì

Logo là một **vòng tròn hở**, một **chấm nhỏ** và **khoảng hở** giữa chúng.

| Chi tiết | Ý nghĩa |
| --- | --- |
| **Vòng tròn mở** | LUGO — lắng nghe, học hỏi liên tục, không khép lại. |
| **Chấm nhỏ** | Bạn — trung tâm của mọi kết nối; AI luôn ở bên cạnh. |
| **Khoảng hở** | Cánh cửa nối AI với thế giới thực: app, thiết bị, con người. |
| **Màu cam** | Năng lượng, ấm áp, tích cực — mời gọi hành động. |

Chấm luôn ngồi **chính giữa khoảng hở**, nằm trên chính đường tròn của vòng
(cùng tâm, cùng bán kính). Đây là quan hệ hình học bất biến — đừng tách chấm ra
khỏi khe hay cho nó trôi ra ngoài vòng.

---

## 2. Bảng màu

Sao chép từ `src/theme.css`. Đây là toàn bộ bảng màu — không thêm màu mới.

| Tên | Hex | Token | Vai trò |
| --- | --- | --- | --- |
| Mực (Ink) | `#111111` | `--lugo-ink` | Chữ chính, nền tối, nét vòng trên nền sáng |
| Than (Graphite) | `#2A2A2A` | `--lugo-ink-soft` | Chữ phụ, sắc thái tối |
| Kem (Cream) | `#F7F4EE` | `--lugo-cream` | Nền sáng chủ đạo, chữ/nét vòng trên nền tối |
| Cát (Sand) | `#E8E1D6` | `--lugo-cream-deep` | Viền, thẻ, đường phân cách |
| Cam (Accent) | `#FF8A00` | `--lugo-accent` | Trạng thái hoạt động + hành động chính |
| Vàng ấm (Warm) | `#FFC857` | `--lugo-accent-warm` | Cực sáng của gradient cam, viền focus |

Gradient chính: `linear-gradient(135deg, #ff8a00, #ffc857)` (`--lugo-accent-gradient`).

### Màu semantic (phản hồi hệ thống)

Chỉ dùng cho trạng thái phản hồi (thông báo, toast, form) — **không** trang trí,
cùng kỷ luật với cam. Xem icon ở §8.

| Nghĩa | Hex | Token |
| --- | --- | --- |
| Info | `#2F6DF0` | `--lugo-info` |
| Success | `#1F9D55` | `--lugo-success` |
| Warning | `#E8A317` | `--lugo-warning` |
| Error | `#C9372C` | `--lugo-danger` |

### Kỷ luật màu cam — quy tắc quan trọng nhất

> **Cam CHỈ dùng cho trạng thái hoạt động và hành động chính.**

Chấm "bạn", nút primary, trạng thái đang nói/đang nghĩ, eyebrow của section — đó
là nơi cam được xuất hiện. Nếu tô cam cho mọi thứ, cam không còn báo hiệu gì. Khi
phân vân, **để mặc định là mực/kem, dành cam cho điểm cần nhấn**.

---

## 3. Nền và biến thể tương ứng

Vòng luôn **đặc** theo màu chữ — đen trên nền sáng, kem/trắng trên nền tối.
Không hạ opacity vòng thành xám để "làm nhẹ"; muốn nhấn thì đổi màu hoặc chuyển
động.

| Nền | Vòng | Chấm | File dùng |
| --- | --- | --- | --- |
| Sáng (kem/trắng) | Mực `#111111` | Cam | `logo-mark-ink.svg`, `logo-icon-cream.svg` |
| Tối (mực) | Kem `#F7F4EE` | Cam | `logo-mark-light.svg`, `logo-icon-ink.svg` |
| Cam (gradient) | Trắng | Trắng | `logo-icon-accent.svg` |

Nền tối là bản **mạnh nhất** của bộ nhận diện (dùng cho hero, màn Talk). Ưu tiên
nền tối khi cần tạo ấn tượng.

---

## 4. Wordmark & lockup

- Chữ **LUGO** viết **HOA toàn bộ**, font **Be Vietnam Pro**, weight **800**,
  letter-spacing nhẹ (~0.02–0.04em).
- Lockup ngang: mark bên trái, chữ LUGO bên phải, canh giữa theo chiều dọc.
- File: `logo-lockup-ink.svg` (nền sáng), `logo-lockup-light.svg` (nền tối).
  Chữ trong các file này đã được **outline sẵn** (vector path) từ Be Vietnam Pro
  800 — hiển thị đúng ở mọi nơi kể cả máy không cài font. Khi set chữ mới trong
  UI/tài liệu thì vẫn dùng font sống Be Vietnam Pro 800.
- Bản đơn sắc (khi không in được màu): chữ + vòng cùng một màu mực/kem, **chấm cam
  giữ nguyên** là điểm màu duy nhất. Nếu buộc phải 1 màu tuyệt đối, dùng
  `logo-mark-accent.svg` (toàn cam) hoặc bản mực đặc.

---

## 5. Khoảng trống & kích thước tối thiểu

- **Khoảng trống:** chừa quanh logo tối thiểu bằng **chiều cao của chấm** (bán
  kính chấm ×2). Không để chữ/hình khác lấn vào vùng này.
- **Kích thước tối thiểu:** mark ≥ **24px**, lockup ≥ **96px** chiều ngang. Nhỏ
  hơn thì khoảng hở và chấm không còn đọc được.
- App icon dùng bo góc `rx=22` trên khung 100 (tức ~22%), giống `logo-icon-*`.

---

## 6. Trạng thái động (chữ ký của LUGO)

Logo không chỉ tĩnh — nó phản ánh cuộc hội thoại. Bốn trạng thái trong
`LugoMark.tsx`:

| State | Ý nghĩa | Biểu hiện |
| --- | --- | --- |
| `idle` | Sống, chưa làm gì | Nhịp thở chậm (~5.5s), chấm cam |
| `listening` | Bạn đang nói | Chấm cam phồng/xẹp theo giọng |
| `thinking` | LUGO đang nghĩ | Đường cam→trắng tự vẽ quanh vòng |
| `speaking` | LUGO trả lời | Vòng cam, khoảng hở mấp máy như mở miệng |

Chuyển động phải **phục vụ, không ép**. Mọi trạng thái vẫn phải đọc được qua màu
và độ đậm khi tắt chuyển động — bộ nhận diện đã tôn trọng
`prefers-reduced-motion`.

Bản động xuất sẵn (khớp đúng keyframe của web): `public/brand/logo-anim-*.gif`
cho từng trạng thái, và `logo-anim-cycle.gif` là kịch bản đầy đủ
*idle → listening → thinking → speaking* (dùng khi cần "kể chuyện" một cuộc hội
thoại). Nền mực — đặt trên nền tối. Trên web ưu tiên dùng component `LugoMark`
trực tiếp; GIF/WebP dành cho README, social, chat, slide.

---

## 7. Nên & Không

**Nên**
- Giữ hình học vòng+chấm+khe đúng tỉ lệ (dùng file gốc, đừng vẽ lại bằng tay).
- Đặt logo trên nền có tương phản đủ; ưu tiên nền tối cho ấn tượng.
- Dành cam cho điểm nhấn thật sự.

**Không**
- ❌ Đổi màu vòng thành xám để "làm nhẹ".
- ❌ Tô cam cho toàn trang / nhiều nút cùng lúc.
- ❌ Tách chấm khỏi khe, xoay lệch, hay bóp méo tỉ lệ.
- ❌ Thêm viền, đổ bóng nặng, hay gradient lạ ngoài gradient cam chính.
- ❌ Thay Be Vietnam Pro bằng font khác cho wordmark.

---

## 8. Icon phản hồi (info · error · success)

Icon phản hồi **mang nhận diện LUGO**: dùng đúng **vòng hở + chấm cam "bạn"**
trong khe (chữ ký của mark, §1), đặt ký hiệu status ở giữa. Nhờ đó mỗi icon vẫn
là một mark LUGO. Quy ước màu:

- **Vòng + ký hiệu** = màu semantic (báo nghĩa).
- **Chấm** luôn giữ **cam `#FF8A00`** — điểm neo thương hiệu xuyên suốt cả ba.

Nét tròn (round cap/join) khớp mark, nền trong suốt.

| Icon | Ký hiệu | Màu vòng/ký hiệu | File |
| --- | --- | --- | --- |
| Info | chấm + nét dọc "i" | `#2F6DF0` | `icon-info.svg` · `.png` |
| Success | dấu ✓ | `#1F9D55` | `icon-success.svg` · `.png` |
| Warning | dấu "!" | `#E8A317` | `icon-warning.svg` · `.png` |
| Error | dấu ✕ | `#C9372C` | `icon-error.svg` · `.png` |

Đọc rõ trên cả nền sáng và tối. Sinh lại: `bash scripts/gen-status-icons.sh`.

## 9. Bộ file xuất — `public/brand/`

Mỗi biến thể có SVG (vector, ưu tiên dùng). Bản có nền đặc kèm PNG + JPEG @1024px;
bản nền trong suốt kèm PNG @1024px.

| File | Nền | Định dạng | Dùng cho |
| --- | --- | --- | --- |
| `logo-icon-ink` | Mực, bo góc | svg · png · jpg | App icon / favicon / social (mặc định) |
| `logo-icon-cream` | Kem, bo góc | svg · png · jpg | App icon trên bề mặt sáng |
| `logo-icon-accent` | Cam gradient, bo góc | svg · png · jpg | App icon nhấn mạnh |
| `logo-mark-ink` | Trong suốt | svg · png | Mark trên nền sáng |
| `logo-mark-light` | Trong suốt | svg · png | Mark trên nền tối |
| `logo-mark-accent` | Trong suốt | svg · png | Mark đơn sắc cam |
| `logo-lockup-ink` | Trong suốt | svg · png | Mark + chữ, nền sáng |
| `logo-lockup-light` | Trong suốt | svg · png | Mark + chữ, nền tối |
| `logo-anim-idle/listening/thinking/speaking` | Trong suốt (svg) · Mực (gif) | svg · gif | Từng trạng thái động |
| `logo-anim-cycle` | Mực | gif | Cả cuộc hội thoại (hero động) |
| `icon-info/success/warning/error` | Trong suốt | svg · png | Icon phản hồi (§8) |

> **SVG động = nền trong suốt thật** (viền mượt, scalable, <1 KB) — dùng cho web.
> GIF chỉ có trong suốt 1-bit (viền răng cưa) nên để nền mực. SVG động dùng
> `currentColor` cho vòng (mặc định mực cho nền sáng; thêm `style="color:#f7f4ee"`
> khi đặt trên nền tối). Riêng *thinking* và *speaking* thiết kế cho **nền tối**
> (đường cam→trắng / vòng cam đọc rõ nhất trên mực). GitHub README không chạy
> animation trong SVG → dùng GIF ở đó; SVG động để nhúng vào web/app.

> **Ưu tiên SVG** ở mọi nơi có thể (web, in vector). Dùng PNG khi cần nền trong
> suốt dạng bitmap; dùng JPEG chỉ cho nơi không hỗ trợ trong suốt (một số nền
> tảng social). JPEG không có kênh alpha nên chỉ xuất cho bản có nền đặc.

Sinh lại toàn bộ bộ file (SVG + PNG + JPEG):

```bash
bash scripts/gen-logo.sh
```

Script rasterize bằng `sips` (có sẵn trên macOS) từ SVG nguồn — không cần cài
thêm công cụ. Sửa màu/hình học ở đầu script rồi chạy lại để cập nhật cả bộ.

Sinh lại bản động (GIF) — cần `ffmpeg`:

```bash
bash scripts/gen-logo-anim.sh
```

Script sinh frame SVG (`scripts/gen-logo-anim.mjs`, khớp keyframe
`LugoMark.css`), rasterize bằng `sips`, rồi ghép GIF bằng `ffmpeg`.

Sinh lại SVG động nền trong suốt (không cần công cụ ngoài):

```bash
node scripts/gen-logo-anim-svg.mjs
```

Sinh lại icon phản hồi (SVG + PNG):

```bash
bash scripts/gen-status-icons.sh
```
