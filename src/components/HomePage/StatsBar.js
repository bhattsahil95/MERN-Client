import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function useCountUp(target, duration = 1800, start = false) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;

        let frame;
        const startTime = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, duration, start]);

    return value;
}

const stats = [
    { label: "Live projects", value: 5, suffix: "" },
    { label: "Technologies", value: 20, suffix: "+" },
    { label: "Years building", value: 4, suffix: "+" },
    { label: "Stack layers", value: 3, suffix: "" },
];

function StatItem({ stat, inView }) {
    const count = useCountUp(stat.value, 1600, inView);

    return (
        <div className="stats-bar__item">
            <span className="stats-bar__value">
                {count}
                {stat.suffix}
            </span>
            <span className="stats-bar__label">{stat.label}</span>
        </div>
    );
}

function StatsBar() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            className="stats-bar"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
        >
            {stats.map((stat) => (
                <StatItem key={stat.label} stat={stat} inView={inView} />
            ))}
        </motion.div>
    );
}

export default StatsBar;
