import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface TextEncryptedProps {
    text: string;
    duration?: number;
    scrambleSpeed?: number;
    className?: string;
    chars?: string;
}

export const TextEncrypted: React.FC<TextEncryptedProps> = ({
    text,
    duration = 5,
    scrambleSpeed = 0.05,
    className = "text-white",
    chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?"
}) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;
        const el = textRef.current;
        let revealed = 0;

        el.textContent = text
            .split("")
            .map(() => randomChar())
            .join("");

        const scrambleInterval = setInterval(() => {
            const scrambled = text.split("").map((char, i) =>
                i < revealed ? char : randomChar()
            );
            el.textContent = scrambled.join("");
        }, scrambleSpeed * 1000);

        const tl = gsap.timeline({
            onComplete: () => {
                clearInterval(scrambleInterval);
                el.textContent = text;
            },
        });

        const interval = duration / text.length;
        for (let i = 0; i < text.length; i++) {
            tl.to(
                {},
                {
                    duration: interval,
                    onUpdate: () => {
                        revealed = i + 1;
                    },
                }
            );
        }

        return () => clearInterval(scrambleInterval);
    }, [text, duration, scrambleSpeed]);

    function randomChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    return (
        <span
            ref={textRef}
            className={`font-mono  ${className}`}
            style={{
                whiteSpace: "pre-line",
                display: "inline-block",
                fontFamily: "monospace",
            }}
        ></span>
    );
};
