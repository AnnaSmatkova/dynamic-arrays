import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SitarskiVisualizationProps {
    hat: ((number | null)[] | null)[];
}

const SitarskiVisualization: React.FC<SitarskiVisualizationProps> = ({ hat }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (ref.current) {
            const svg = d3.select(ref.current);

            svg.selectAll("*").remove();

            let maxTotalWidth = 0;

            hat.forEach((block, index) => {
                const unitWidth = 15;
                const totalUnits = block ? block.length : 0;
                const filledUnits = block ? block.filter(x => x !== null).length : 0;
                const totalWidth = totalUnits * unitWidth;
                const filledWidth = filledUnits * unitWidth;
                const yOffset = index * 40;

                if (totalWidth > maxTotalWidth) {
                    maxTotalWidth = totalWidth;
                }

                svg.append("rect")
                    .attr("x", 60)
                    .attr("y", yOffset)
                    .attr("width", totalWidth)
                    .attr("height", 30)
                    .attr("fill", "#ccc");

                svg.append("rect")
                    .attr("x", 60)
                    .attr("y", yOffset)
                    .attr("width", filledWidth)
                    .attr("height", 30)
                    .attr("fill", "steelblue");

                svg.append("text")
                    .attr("x", 0)
                    .attr("y", yOffset + 20)
                    .text(`${index}`)
                    .attr("fill", "black");

                if (filledUnits > 0) {
                    svg.append("text")
                        .attr("x", 65)
                        .attr("y", yOffset + 20)
                        .text(`${filledUnits}/${totalUnits}`)
                        .attr("fill", "white");
                }
            });

            svg.attr('width', maxTotalWidth + 70)
               .attr('height', hat.length * 40);
        }
    }, [hat]);

    return <svg ref={ref}></svg>;
};

export default SitarskiVisualization;
