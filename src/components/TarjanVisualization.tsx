import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TarjanVisualizationProps {
    data: ((number | null)[] | null)[][];
}

const TarjanVisualization: React.FC<TarjanVisualizationProps> = ({ data }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (ref.current) {
            const svg = d3.select(ref.current)
                .attr('width', 200)
                .attr('height', data.length * 40 * (data[0]?.length || 1));

            svg.selectAll("*").remove();

            data.forEach((blocks, index) => {
                blocks?.forEach((block, subIndex) => {
                    const unitWidth = 15;
                    const totalUnits = block ? block.length : 0;
                    const filledUnits = block ? block.filter(x => x !== null).length : 0;
                    const totalWidth = totalUnits * unitWidth;
                    const filledWidth = filledUnits * unitWidth;
                    const yOffset = (index * data[0].length + subIndex) * 40;

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
                        .text(`${index}-${subIndex}`)
                        .attr("fill", "black");

                    if (filledUnits > 0) {
                        svg.append("text")
                            .attr("x", 65)
                            .attr("y", yOffset + 20)
                            .text(`${filledUnits}/${totalUnits}`)
                            .attr("fill", "white");
                    }
                });
            });
        }
    }, [data]);

    return <svg ref={ref}></svg>;
};

export default TarjanVisualization;
