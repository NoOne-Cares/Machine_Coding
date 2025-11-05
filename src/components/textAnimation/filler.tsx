import React, { useEffect, useRef } from 'react';
import opentype from 'opentype.js';
import gsap from 'gsap';
import {
    findMats,
    getPathsFromStr,
    toScaleAxis,
    traverseEdges,
    getCurveToNext,
    isTerminating,
    Mat,
} from 'flo-mat';

const NS = 'http://www.w3.org/2000/svg';

type Props = {
    text: string;
    fontUrl: string;
};

const TextSkeleton: React.FC<Props> = ({ text, fontUrl }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        async function run() {
            const font = await opentype.load(fontUrl);
            if (!svgRef.current) return;
            svgRef.current.innerHTML = '';

            const letters = text.split('');
            let offsetX = 0;
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            for (const [i, letter] of letters.entries()) {
                const glyph = font.charToGlyph(letter);
                const path = glyph.getPath(offsetX, 150, 150);
                const svgPathStr = path.toPathData(3);

                // Unique mask ID for each letter
                const maskId = `mask-${i}-${Date.now()}`;

                // Create a <mask> for this glyph
                const mask = document.createElementNS(NS, 'mask');
                mask.setAttribute('id', maskId);

                // Mask shape (white = visible)
                const maskShape = document.createElementNS(NS, 'path');
                maskShape.setAttribute('d', svgPathStr);
                maskShape.setAttribute('fill', 'white');
                mask.appendChild(maskShape);
                svgRef.current.appendChild(mask);

                // Draw gray text outline behind
                const outline = document.createElementNS(NS, 'path');
                outline.setAttribute('d', svgPathStr);
                outline.setAttribute('fill', 'none');
                outline.setAttribute('stroke', '#000000');
                outline.setAttribute('stroke-width', '0');
                svgRef.current.appendChild(outline);

                // Skeleton (mats)
                const bezierLoops = getPathsFromStr(svgPathStr);
                const mats = findMats(bezierLoops, 3);
                const sats = mats.map((mat) => toScaleAxis(mat, 1.5));

                // Group for skeleton lines (masked)
                const group = document.createElementNS(NS, 'g');
                group.setAttribute('mask', `url(#${maskId})`);
                svgRef.current.appendChild(group);

                sats.forEach((sat) => {
                    drawAndAnimateMats(sat, group, tl);
                });

                offsetX += glyph.advanceWidth * (150 / font.unitsPerEm);
            }

            // Optionally repeat animation
            // tl.repeat(-1).yoyo(true);
        }

        run();
    }, [text, fontUrl]);

    function drawAndAnimateMats(mat: Mat, svgGroup: SVGGElement, timeline: gsap.core.Timeline) {
        const fs = [
            undefined,
            undefined,
            getLinePathStr,
            getQuadBezierPathStr,
            getCubicBezierPathStr,
        ];

        let cpNode = mat.cpNode;
        if (!cpNode) return;

        traverseEdges(cpNode, (cp) => {
            if (isTerminating(cp)) return;
            const bezier = getCurveToNext(cp);
            if (!bezier) return;

            const path = document.createElementNS(NS, 'path');
            path.setAttribute('d', fs[bezier.length]!(bezier));
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'black'); // red
            path.setAttribute('stroke-width', '15'); // THICK LINE
            path.setAttribute('stroke-linecap', 'round');
            path.style.strokeDasharray = '400';
            path.style.strokeDashoffset = '400';
            svgGroup.appendChild(path);

            // Animate
            timeline.to(
                path,
                {
                    strokeDashoffset: 0,
                    duration: 0.0005,
                },
                '+=0.0001'
            );
        });
    }

    // Path helpers
    function getLinePathStr(ps: number[][]) {
        const [[x0, y0], [x1, y1]] = ps;
        return `M${x0} ${y0} L${x1} ${y1}`;
    }

    function getQuadBezierPathStr(ps: number[][]) {
        const [[x0, y0], [x1, y1], [x2, y2]] = ps;
        return `M${x0} ${y0} Q${x1} ${y1} ${x2} ${y2}`;
    }

    function getCubicBezierPathStr(ps: number[][]) {
        const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        return `M${x0} ${y0} C${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`;
    }

    return (
        <div className="flex justify-center items-center min-h-screen pl-60">
            <svg
                ref={svgRef}
                viewBox="0 0 1000 200"
                className="w-[1000px] h-[200px]  mx-auto"
            />
        </div>
    );
};

export default TextSkeleton;
