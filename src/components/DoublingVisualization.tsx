import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DoublingVisualizationProps {
    totalUnits: number;
    filledUnits: number;
}

const DoublingVisualization: React.FC<DoublingVisualizationProps> = ({ totalUnits, filledUnits }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (ref.current) {
            const svg = d3.select(ref.current);  // select the current ref
            const unitWidth = 5;
            const totalWidth = totalUnits * unitWidth;
            const filledWidth = filledUnits * unitWidth;

            // Clear the previous contents of the svg
            svg.selectAll("*").remove();

            // total capacity
            svg.append("rect")
                .attr("width", totalWidth)
                .attr("height", 30)
                .attr("fill", "#ccc");

            // filled portion
            svg.append("rect")
                .attr("width", filledWidth)
                .attr("height", 30)
                .attr("fill", "steelblue");

                if (filledUnits > 0) {
                    svg.append("text")
                        .attr("x", filledWidth > 10 ? 5 : filledWidth + 5)
                        .attr("y", 20)
                        .text(`${filledUnits}/${totalUnits}`)
                        .attr("fill", "white")
                        .attr("font-size", "12px")
                        .attr("font-family", "Arial, sans-serif");
                }
        }
    }, [totalUnits, filledUnits]);

    return <svg ref={ref} width={totalUnits * 5} height={30}></svg>;
};

export default DoublingVisualization;
