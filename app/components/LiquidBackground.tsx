'use client';
import { motion } from 'framer-motion';

// BẢNG MÀU CHUẨN - KHÔNG PHA TẠP
// Tôi đã chỉnh lại độ tương phản (Contrast) để nhìn phát biết ngay mood gì
const THEMES: Record<string, string> = {
    // Mặc định: Tím mộng mơ (Huyền bí)
    default: 'from-indigo-950 via-purple-950 to-black',

    // Vui: Vàng Cam rực rỡ (Năng lượng dương)
    happy: 'from-orange-500 via-amber-500 to-yellow-500',

    // Buồn: Xanh biển sâu thẳm + Xám (Trầm lắng)
    sad: 'from-blue-950 via-slate-900 to-black',

    // Tức giận: Đỏ lựu + Tím than (Bùng nổ)
    angry: 'from-red-700 via-rose-900 to-purple-950',

    // Chill: Xanh ngọc + Đen (Thư giãn)
    chill: 'from-emerald-800 via-teal-900 to-black',
};

export default function LiquidBackground({ mood = 'default' }: { mood?: string }) {
    const bgClass = THEMES[mood] || THEMES.default;

    return (
        <div className={`fixed inset-0 -z-10 transition-colors duration-[1500ms] ease-in-out bg-gradient-to-br ${bgClass} overflow-hidden`}>

            {/* 1. Lớp nhiễu hạt (Noise) - Giữ lại vì nó tạo chất "Phim ảnh" rất đẹp */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

            {/* 2. Đốm sáng LỚN - Chỉ trôi nhẹ nhàng, không bám chuột */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 20, // Trôi rất chậm (20 giây)
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-white/10 rounded-full blur-[120px] mix-blend-overlay"
            />

            {/* 3. Đốm sáng NHỎ - Tạo chiều sâu */}
            <motion.div
                animate={{
                    x: [0, -30, 30, 0],
                    y: [0, 30, -30, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[90px] mix-blend-overlay"
            />
        </div>
    );
}